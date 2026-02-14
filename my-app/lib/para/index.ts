/**
 * 🏷️ PARA Method - Auto-classification Service
 * Basado en Tiago Forte: Projects, Areas, Resources, Archives
 */

import { Note } from '@/lib/db';

// Keywords para clasificación automática
const PARA_KEYWORDS = {
  projects: [
    'proyecto', 'project', 'entrega', 'deadline', 'fecha límite',
    'lanzamiento', 'launch', 'mvp', 'beta', 'versión', 'release',
    'sprint', 'milestone', 'objetivo', 'meta', 'goal'
  ],
  areas: [
    'área', 'area', 'responsabilidad', 'rol', 'liderazgo', 'leadership',
    'gestión', 'management', 'equipo', 'team', 'proceso', 'process',
    'mejora continua', 'continuous improvement', 'habilidad', 'skill'
  ],
  archives: [
    'archivado', 'archived', 'completado', 'completed', 'finalizado',
    'done', 'terminado', 'pasado', 'past', 'histórico', 'historical',
    'referencia', 'reference', 'template', 'plantilla'
  ]
};

export interface PARAClassification {
  category: 'projects' | 'areas' | 'resources' | 'archives';
  confidence: number;
  suggestedProject?: string;
  suggestedArea?: string;
  reason: string;
}

/**
 * Auto-clasifica contenido usando PARA method
 */
export function classifyPARA(content: string, title?: string): PARAClassification {
  const textToAnalyze = `${title || ''} ${content}`.toLowerCase();
  
  // Count keyword matches
  const scores = {
    projects: 0,
    areas: 0,
    archives: 0,
    resources: 0 // Default, no keywords
  };
  
  // Check project keywords
  PARA_KEYWORDS.projects.forEach(keyword => {
    if (textToAnalyze.includes(keyword.toLowerCase())) {
      scores.projects += 1;
    }
  });
  
  // Check area keywords
  PARA_KEYWORDS.areas.forEach(keyword => {
    if (textToAnalyze.includes(keyword.toLowerCase())) {
      scores.areas += 1;
    }
  });
  
  // Check archive keywords
  PARA_KEYWORDS.archives.forEach(keyword => {
    if (textToAnalyze.includes(keyword.toLowerCase())) {
      scores.archives += 1;
    }
  });
  
  // Determine category
  const maxScore = Math.max(scores.projects, scores.areas, scores.archives);
  
  if (maxScore === 0) {
    return {
      category: 'resources',
      confidence: 0.5,
      reason: 'No keywords detected, defaulting to resources'
    };
  }
  
  const totalScore = scores.projects + scores.areas + scores.archives;
  const confidence = maxScore / totalScore;
  
  if (scores.projects === maxScore) {
    return {
      category: 'projects',
      confidence,
      reason: `Detected project keywords (${scores.projects} matches)`
    };
  }
  
  if (scores.areas === maxScore) {
    return {
      category: 'areas',
      confidence,
      reason: `Detected area keywords (${scores.areas} matches)`
    };
  }
  
  return {
    category: 'archives',
    confidence,
    reason: `Detected archive keywords (${scores.archives} matches)`
  };
}

/**
 * Sugiere título basado en contenido
 */
export function suggestTitle(content: string): string {
  // Tomar primera oración o primeros 50 caracteres
  const firstSentence = content.split(/[.!?\n]/)[0].trim();
  if (firstSentence.length <= 60) {
    return firstSentence;
  }
  return firstSentence.substring(0, 57) + '...';
}

/**
 * Genera resumen del contenido
 */
export function generateSummary(content: string): string {
  // Simple: primeros 200 caracteres
  if (content.length <= 200) return content;
  return content.substring(0, 197) + '...';
}

/**
 * Extrae insights clave (placeholder para IA más avanzada)
 */
export function extractInsights(content: string): string[] {
  const insights: string[] = [];
  
  // Detectar action items
  const actionMatches = content.match(/(?:TODO|FIXME|ACTION|@)\s*:?\s*(.+)/gi);
  if (actionMatches) {
    insights.push(`Action items: ${actionMatches.length}`);
  }
  
  // Detectar fechas
  const dateMatches = content.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/g);
  if (dateMatches) {
    insights.push(`Dates mentioned: ${dateMatches.join(', ')}`);
  }
  
  // Detectar URLs
  const urlMatches = content.match(/https?:\/\/[^\s]+/g);
  if (urlMatches) {
    insights.push(`Links: ${urlMatches.length} URLs`);
  }
  
  return insights.length > 0 ? insights : ['No specific insights detected'];
}

/**
 * Procesa una nota completa con metadata PARA
 */
export interface ProcessedNote {
  title: string;
  summary: string;
  paraClassification: PARAClassification;
  insights: string[];
}

export function processNote(content: string): ProcessedNote {
  const title = suggestTitle(content);
  const summary = generateSummary(content);
  const paraClassification = classifyPARA(content, title);
  const insights = extractInsights(content);
  
  return {
    title,
    summary,
    paraClassification,
    insights
  };
}
