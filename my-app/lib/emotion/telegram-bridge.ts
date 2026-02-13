/**
 * Bridge para integrar detección de emociones con respuestas de Telegram
 */

import { detectEmotion, adaptResponse, saveEmotionalState, EmotionResult } from './index';

interface TelegramMessage {
  text: string;
  userId: string;
  chatId: string;
  timestamp: Date;
}

interface YoshiResponse {
  text: string;
  emotion: EmotionResult;
  useEmoji: boolean;
}

/**
 * Procesa mensaje entrante y genera respuesta con emoción
 */
export function processMessage(message: TelegramMessage, originalResponse: string): YoshiResponse {
  // Detectar emoción
  const emotion = detectEmotion(message.text);
  
  // Guardar estado emocional
  saveEmotionalState(message.userId, emotion, message.text);
  
  // Adaptar respuesta
  const adaptedText = adaptResponse(originalResponse, emotion);
  
  return {
    text: adaptedText,
    emotion,
    useEmoji: true
  };
}

/**
 * Genera respuesta rápida con emoción
 */
export function quickEmotionalResponse(userMessage: string, yoshiReply: string): string {
  const emotion = detectEmotion(userMessage);
  return adaptResponse(yoshiReply, emotion);
}

// Ejemplos de uso:
// 
// USUARIO: "Hoy fue un día pesado 😮‍💨"
// YOSHI (sin): "Entendido. ¿Qué necesitas?"
// YOSHI (con): "😮‍💨 Veo que es un momento intenso. ¿Qué necesitas?
//                💙 ¿Quieres que priorice algo liviano o prefieres pausar y retomar mañana?"
//
// USUARIO: "¡Listo el deploy! 🚀"
// YOSHI (sin): "Deploy exitoso."
// YOSHI (con): "🚀 ¡Esa energía! Deploy exitoso."
//
// USUARIO: "No puedo más con esto 😤"
// YOSHI (sin): "¿Qué pasó?"
// YOSHI (con): "💨 Respiro contigo. ¿Qué pasó?
//                🌊 Tomemos un momento."