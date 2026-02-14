/**
 * YOSHI Emotion Detection System
 * Detecta emociones en mensajes de Telegram y adapta respuestas
 */

export type Emotion = 'happy' | 'sad' | 'angry' | 'stressed' | 'tired' | 'excited' | 'neutral' | 'urgent';

export interface EmotionResult {
  emotion: Emotion;
  intensity: number; // 1-10
  emoji: string;
  responseStyle: 'supportive' | 'energetic' | 'calm' | 'urgent' | 'neutral';
}

// Keywords en español e inglés
const EMOTION_KEYWORDS: Record<Emotion, string[]> = {
  happy: ['feliz', 'contento', 'genial', 'awesome', 'excelente', 'perfecto', '😊', '😄', '🎉', '💪', '🔥', 'bien', 'me gusta', 'love', 'amazing'],
  sad: ['triste', 'mal', 'deprimido', '😢', '😭', '💔', 'no puedo', 'fracaso', 'perdí', 'sad'],
  angry: ['enojado', 'molesto', 'furioso', '😤', '😠', '🤬', 'odio', 'harta', 'harto', 'estúpido', 'inútil'],
  stressed: ['estresado', 'presionado', 'agobiado', '😰', '😥', '😮‍💨', 'mucho trabajo', 'no doy abasto', 'overwhelmed', 'cansado de'],
  tired: ['cansado', 'agotado', 'dormir', '😴', '🥱', 'sin energía', 'fatiga', 'exhausto', 'no duermo'],
  excited: ['emocionado', 'ansioso', 'nervioso bueno', '🤩', '✨', '🚀', 'increíble', 'wow', 'omg', 'vamos'],
  urgent: ['urgente', 'ya', 'ahora', 'inmediato', 'corre', '⚠️', '🔴', '🚨', 'crítico', 'emergencia'],
  neutral: []
};

// Emojis de respuesta según emoción
const RESPONSE_EMOJIS: Record<Emotion, string[]> = {
  happy: ['🎉', '🔥', '💪', '🚀', '✨'],
  sad: ['💙', '🫂', '🌱', '✨', '🦖'],
  angry: ['💨', '🌊', '🦖', '✨', '💪'],
  stressed: ['😮‍💨', '💆', '🌊', '🦖', '✨'],
  tired: ['☕', '🌙', '💤', '🦖', '💙'],
  excited: ['🚀', '🔥', '⚡', '🦖', '✨'],
  urgent: ['⚡', '🎯', '🔥', '🦖', '💪'],
  neutral: ['🦖', '✨', '💪']
};

// Estilo de respuesta
const RESPONSE_STYLES: Record<Emotion, EmotionResult['responseStyle']> = {
  happy: 'energetic',
  sad: 'supportive',
  angry: 'calm',
  stressed: 'supportive',
  tired: 'supportive',
  excited: 'energetic',
  urgent: 'urgent',
  neutral: 'neutral'
};

/**
 * Detecta emoción en un mensaje
 */
export function detectEmotion(text: string): EmotionResult {
  const lowerText = text.toLowerCase();
  let detectedEmotion: Emotion = 'neutral';
  let maxMatches = 0;
  let intensity = 5;

  // Contar matches por emoción
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    if (emotion === 'neutral') continue;
    
    const matches = keywords.filter(kw => lowerText.includes(kw.toLowerCase())).length;
    
    if (matches > maxMatches) {
      maxMatches = matches;
      detectedEmotion = emotion as Emotion;
      intensity = Math.min(5 + matches * 2, 10); // Más matches = más intensidad
    }
  }

  // Si hay múltiples emojis de estrés, subir intensidad
  const stressEmojis = ['😰', '😥', '😮‍💨', '😤', '😠'];
  const emojiCount = stressEmojis.filter(e => text.includes(e)).length;
  if (emojiCount > 0) {
    intensity = Math.min(intensity + emojiCount, 10);
  }

  // Seleccionar emoji de respuesta
  const emojis = RESPONSE_EMOJIS[detectedEmotion];
  const selectedEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return {
    emotion: detectedEmotion,
    intensity,
    emoji: selectedEmoji,
    responseStyle: RESPONSE_STYLES[detectedEmotion]
  };
}

/**
 * Adapta una respuesta según la emoción detectada
 */
export function adaptResponse(originalResponse: string, emotion: EmotionResult): string {
  const { responseStyle, emoji, intensity } = emotion;

  switch (responseStyle) {
    case 'supportive':
      if (intensity > 7) {
        return `${emoji} Veo que es un momento intenso. ${originalResponse}\n\n💙 ¿Quieres que priorice algo liviano o prefieres pausar y retomar mañana?`;
      }
      return `${emoji} Entendido. ${originalResponse}`;

    case 'energetic':
      return `${emoji} ¡Esa energía! ${originalResponse}`;

    case 'calm':
      return `${emoji} Respiro contigo. ${originalResponse}\n\n🌊 Tomemos un momento.`;

    case 'urgent':
      return `${emoji} ¡Ya voy! ${originalResponse}`;

    case 'neutral':
    default:
      return `${emoji} ${originalResponse}`;
  }
}

/**
 * Guarda estado emocional en memoria para detectar patrones
 */
export function saveEmotionalState(userId: string, emotion: EmotionResult, context?: string): void {
  const timestamp = new Date().toISOString();
  const dayOfWeek = new Date().getDay();
  const hour = new Date().getHours();
  
  // Esto se conectará con memu_memory
  const emotionalLog = {
    userId,
    timestamp,
    emotion: emotion.emotion,
    intensity: emotion.intensity,
    dayOfWeek,
    hour,
    context
  };

  // TODO: Integrar con memu_memory.save()
  console.log('[EMOTION LOG]', emotionalLog);
}

/**
 * Detecta patrones emocionales (ej: "estresado los lunes")
 */
export function detectEmotionalPatterns(logs: any[]): string[] {
  const patterns: string[] = [];
  
  // Patrón: Día de la semana
  const dayCounts: Record<number, number> = {};
  logs.forEach(log => {
    if (log.intensity > 6) {
      dayCounts[log.dayOfWeek] = (dayCounts[log.dayOfWeek] || 0) + 1;
    }
  });

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  for (const [day, count] of Object.entries(dayCounts)) {
    if (count >= 3) {
      patterns.push(`Alta intensidad emocional los ${days[parseInt(day)]}`);
    }
  }

  // Patrón: Hora del día
  const morningStress = logs.filter(l => l.hour < 12 && l.intensity > 6).length;
  if (morningStress >= 3) {
    patterns.push('Estrés matutino frecuente');
  }

  return patterns;
}