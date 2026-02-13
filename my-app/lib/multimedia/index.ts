// 🎙️📸 Procesamiento multimedia - whisper.cpp + Tesseract
// 100% local, 100% privado

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

// Paths
const WHISPER_PATH = path.join(process.cwd(), 'whisper-cpp');
const MODEL_PATH = path.join(process.cwd(), '..', 'models', 'ggml-base.bin');
const UPLOADS_DIR = path.join(process.cwd(), 'data', 'uploads');

// Interfaces
export interface AudioTranscription {
  text: string;
  language: string;
  duration: number;
}

export interface OCRResult {
  text: string;
  confidence: number;
}

// ==================== AUDIO (whisper.cpp) ====================

/**
 * Transcribe audio a texto usando whisper.cpp local
 * Soporta: mp3, wav, ogg, flac, m4a (se convierte automáticamente)
 */
export async function transcribeAudio(audioPath: string): Promise<AudioTranscription> {
  // Verificar que existe whisper
  if (!existsSync(WHISPER_PATH)) {
    throw new Error('whisper-cpp no encontrado. Ejecuta setup-local.sh primero.');
  }

  // Verificar que existe el modelo
  if (!existsSync(MODEL_PATH)) {
    throw new Error('Modelo whisper no encontrado. Descargando...');
  }

  // Convertir a wav si es necesario (whisper.cpp prefiere wav)
  const wavPath = audioPath.replace(/\.[^.]+$/, '.wav');
  if (!audioPath.endsWith('.wav')) {
    try {
      execSync(`ffmpeg -i "${audioPath}" -ar 16000 -ac 1 -c:a pcm_s16le "${wavPath}" -y`, {
        stdio: 'pipe',
        timeout: 30000,
      });
    } catch (error) {
      console.warn('No se pudo convertir audio, intentando con archivo original');
    }
  }

  const inputPath = existsSync(wavPath) ? wavPath : audioPath;

  // Transcribir
  try {
    const result = execSync(
      `"${WHISPER_PATH}" -m "${MODEL_PATH}" -f "${inputPath}" -l auto --output-txt --no-timestamps`,
      {
        stdio: 'pipe',
        timeout: 60000,
        encoding: 'utf-8',
      }
    );

    // whisper.cpp genera un archivo .txt
    const txtPath = inputPath + '.txt';
    let text = '';
    
    if (existsSync(txtPath)) {
      text = execSync(`cat "${txtPath}"`, { encoding: 'utf-8' }).trim();
      // Limpiar archivo temporal
      execSync(`rm "${txtPath}"`);
    } else {
      // Fallback: parsear output
      text = result.split('\n').filter(line => line.trim() && !line.startsWith('[')).join(' ').trim();
    }

    // Detectar idioma (simple heuristic)
    const language = detectLanguage(text);

    return {
      text: text || '[No se detectó texto en el audio]',
      language,
      duration: 0, // Podemos calcularlo con ffprobe si es necesario
    };
  } catch (error) {
    console.error('Error transcribiendo audio:', error);
    return {
      text: '[Error al transcribir audio]',
      language: 'unknown',
      duration: 0,
    };
  }
}

// ==================== IMÁGENES (Tesseract) ====================

/**
 * Extrae texto de imagen usando Tesseract OCR
 * Soporta: jpg, png, gif, bmp, tiff
 */
export async function extractTextFromImage(imagePath: string): Promise<OCRResult> {
  try {
    // Verificar tesseract
    execSync('which tesseract', { stdio: 'pipe' });

    // Ejecutar OCR
    const outputPath = imagePath + '_ocr';
    execSync(
      `tesseract "${imagePath}" "${outputPath}" -l spa+eng --psm 6`,
      {
        stdio: 'pipe',
        timeout: 30000,
      }
    );

    // Leer resultado
    const txtPath = outputPath + '.txt';
    if (existsSync(txtPath)) {
      const text = execSync(`cat "${txtPath}"`, { encoding: 'utf-8' }).trim();
      execSync(`rm "${txtPath}"`); // Limpiar

      return {
        text: text || '[No se detectó texto en la imagen]',
        confidence: estimateConfidence(text),
      };
    }

    return {
      text: '[No se pudo procesar la imagen]',
      confidence: 0,
    };
  } catch (error) {
    console.error('Error en OCR:', error);
    return {
      text: '[Error al procesar imagen - Tesseract no disponible]',
      confidence: 0,
    };
  }
}

// ==================== PROCESAMIENTO GENERAL ====================

/**
 * Procesa cualquier archivo multimedia y devuelve texto
 */
export async function processMedia(filePath: string, mimeType: string): Promise<string> {
  // Audio
  if (mimeType.startsWith('audio/')) {
    const result = await transcribeAudio(filePath);
    return `[🎙️ Audio transcrito]\n\n${result.text}`;
  }

  // Imagen
  if (mimeType.startsWith('image/')) {
    const result = await extractTextFromImage(filePath);
    return `[📸 Imagen procesada]\n\n${result.text}`;
  }

  // Video (extraer audio y transcribir)
  if (mimeType.startsWith('video/')) {
    try {
      const audioPath = filePath + '.wav';
      execSync(
        `ffmpeg -i "${filePath}" -ar 16000 -ac 1 -c:a pcm_s16le "${audioPath}" -y`,
        { stdio: 'pipe', timeout: 60000 }
      );
      const result = await transcribeAudio(audioPath);
      execSync(`rm "${audioPath}"`); // Limpiar
      return `[🎬 Video transcrito]\n\n${result.text}`;
    } catch (error) {
      return '[Error al procesar video]';
    }
  }

  return '[Tipo de archivo no soportado]';
}

// ==================== UTILIDADES ====================

function detectLanguage(text: string): string {
  // Heurística simple
  const spanishWords = ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'ser', 'se', 'no'];
  const englishWords = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i'];
  
  const words = text.toLowerCase().split(/\s+/);
  let spanishCount = 0;
  let englishCount = 0;
  
  for (const word of words) {
    if (spanishWords.includes(word)) spanishCount++;
    if (englishWords.includes(word)) englishCount++;
  }
  
  if (spanishCount > englishCount) return 'es';
  if (englishCount > spanishCount) return 'en';
  return 'unknown';
}

function estimateConfidence(text: string): number {
  // Heurística simple basada en longitud y caracteres válidos
  if (!text || text.length < 5) return 0;
  
  const validChars = text.match(/[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g) || [];
  const ratio = validChars.length / text.length;
  
  return Math.min(Math.round(ratio * 100), 95);
}

// ==================== HEALTH CHECK ====================

export async function checkMultimediaStatus(): Promise<{
  whisper: boolean;
  tesseract: boolean;
  model: boolean;
}> {
  const status = {
    whisper: existsSync(WHISPER_PATH),
    tesseract: false,
    model: existsSync(MODEL_PATH),
  };

  try {
    execSync('which tesseract', { stdio: 'pipe' });
    status.tesseract = true;
  } catch {
    status.tesseract = false;
  }

  return status;
}