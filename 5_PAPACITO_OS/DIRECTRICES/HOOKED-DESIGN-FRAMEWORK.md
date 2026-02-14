# 🪝 HOOKED DESIGN FRAMEWORK
## Directriz de Diseño de Productos - Sparkplug Tech

**Versión:** 1.0  
**Autor:** YOSHI 🦖 (CTO)  
**Basado en:** "Hooked" de Nir Eyal  
**Aplicación:** Todos los productos Sparkplug (SaaS, bots, juegos, VR)

---

## 📋 RESUMEN EJECUTIVO

El modelo HOOKED convierte productos en **hábitos** mediante un ciclo de 4 pasos.  
Todo producto Sparkplug DEBE implementar mínimo 2 elementos del ciclo.

---

## 🔁 EL CICLO HOOKED

```
    ┌─────────────┐
    │   TRIGGER   │  ← Estímulo para actuar
    │  (Gatillo)  │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
│    ACTION     │  ← Comportamiento simple
│    (Acción)   │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
│ VARIABLE REWARD│  ← Recompensa impredecible
│  (Recompensa)  │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
│  INVESTMENT   │  ← Contribución del usuario
│  (Inversión)  │
    └──────┬──────┘
           │
           └────────→ Vuelve a TRIGGER
```

---

## 1️⃣ TRIGGER (Gatillo)

### **¿Qué es?**
Estímulo que incita al usuario a actuar. Puede ser:
- **Externo:** Notificación, email, anuncio, botón
- **Interno:** Emoción, aburrimiento, necesidad, FOMO

### **Checklist de Implementación**
- [ ] ¿Hay un trigger externo visible? (notificación, email, UI element)
- [ ] ¿El usuario desarrolla triggers internos? ("necesito checar esto")
- [ ] ¿El trigger está conectado a una emoción? (ansiedad, curiosidad, alegría)

### **Ejemplos Sparkplug**
| Producto | Trigger Externo | Trigger Interno |
|----------|-----------------|-----------------|
| Second Brain | Badge "✨ Conexiones Descubiertas" | Curiosidad por qué conectó esas notas |
| SparkChatbots | Notificación "Nuevo mensaje" | Necesidad de respuesta rápida |
| VR Game | "Nuevo nivel desbloqueado" | Competitividad, progreso |

---

## 2️⃣ ACTION (Acción)

### **¿Qué es?**
Comportamiento que el usuario realiza en anticipación de la recompensa.

### **Fórmula de Fogg**
```
Behavior = Motivation × Ability × Trigger
```

**Para que ocurra la acción:**
- Motivación alta
- Facilidad máxima (menos fricción = más acción)
- Trigger presente

### **Checklist de Implementación**
- [ ] ¿La acción toma menos de 3 segundos?
- [ ] ¿Es más fácil hacerla que NO hacerla?
- [ ] ¿Hay un "call to action" claro?
- [ ] ¿Se eliminan distracciones?

### **Anti-Patrón: Fricción**
❌ Formularios largos  
❌ Múltiples pasos para valor  
❌ Registro obligatorio antes de probar  
❌ Loading screens sin feedback

### **Ejemplos Sparkplug**
| Producto | Acción Principal | Tiempo Objetivo |
|----------|------------------|-----------------|
| Second Brain | Escribir nota | < 5 segundos |
| SparkChatbots | Responder mensaje | 1 click |
| VR Game | Jugar nivel | Inmediato |

---

## 3️⃣ VARIABLE REWARD (Recompensa Variable)

### **¿Qué es?**
Recompensa que varía en tipo, timing o magnitud. Crea **adicción** porque el cerebro busca predecir lo impredecible.

### **Tipos de Recompensas**

#### **🏆 Recompensa de TRIBU** (Social)
- Likes, shares, comentarios
- Validación de la comunidad
- Reconocimiento, status

#### **🎯 Recompensa de CAZA** (Recursos)
- Información nueva
- Descubrimientos
- Nivel, puntos, items

#### **✨ Recompensa del YO** (Personal)
- Autonomía, maestría, propósito
- Progreso personal
- Logros, colecciones

### **Checklist de Implementación**
- [ ] ¿La recompensa es impredecible? (no siempre la misma)
- [ ] ¿Hay variedad de recompensas?
- [ ] ¿El usuario "caza" algo? (información, status, logros)
- [ ] ¿Hay elemento de sorpresa?

### **Ejemplos Sparkplug**
| Producto | Recompensa Variable | Tipo |
|----------|---------------------|------|
| Second Brain | "Conexiones Sorpresa" entre notas | Caza (información) |
| SparkChatbots | Respuestas AI impredecibles pero útiles | Caza (conocimiento) |
| VR Game | Loot aleatorio, niveles sorpresa | Caza + Yo |
| SaaS Analytics | Insights inesperados en los datos | Caza |

---

## 4️⃣ INVESTMENT (Inversión)

### **¿Qué es?**
Contribución del usuario que:
1. Mejora el producto para futuros ciclos
2. Aumenta el costo de cambio a competidores
3. Carga el próximo trigger

### **Tipos de Inversión**
- **Contenido:** Notas, fotos, datos
- **Datos:** Preferencias, historial, embeddings
- **Seguidores:** Red social construida
- **Reputación:** Puntos, niveles, logros
- **Personalización:** Configuraciones, ajustes

### **Checklist de Implementación**
- [ ] ¿El usuario "invierte" algo en cada ciclo?
- [ ] ¿La inversión mejora la próxima experiencia?
- [ ] ¿Hay "efecto IKEA"? (valoramos más lo que construimos)
- [ ] ¿La inversión carga el próximo trigger?

### **Ejemplos Sparkplug**
| Producto | Inversión del Usuario | Beneficio Futuro |
|----------|----------------------|------------------|
| Second Brain | Notas + embeddings | Búsqueda semántica más precisa |
| SparkChatbots | Historial de conversaciones | Respuestas más personalizadas |
| VR Game | Progreso, items, amigos | Mundo más rico, status |

---

## 🎯 MATRIZ DE APLICACIÓN POR TIPO DE PRODUCTO

### **SaaS / Productivity Tools**
| Elemento | Implementación Típica |
|----------|----------------------|
| Trigger | Email digest, badge de actividad, "nuevo desde tu última visita" |
| Action | Crear/Editar documento en 1 click |
| Variable Reward | Insights inesperados, sugerencias AI, "descubrimientos" |
| Investment | Contenido creado, configuraciones, datos entrenados |

### **Chatbots / AI Assistants**
| Elemento | Implementación Típica |
|----------|----------------------|
| Trigger | Notificación de mensaje, "@mention" |
| Action | Enviar mensaje (voz o texto) |
| Variable Reward | Respuesta AI creativa/impredecible, descubrimiento |
| Investment | Historial de conversación, preferencias aprendidas |

### **Videojuegos (Web/Mobile/VR)**
| Elemento | Implementación Típica |
|----------|----------------------|
| Trigger | Push notification, "amigo te superó", evento limitado |
| Action | Jugar nivel (matchmaking rápido) |
| Variable Reward | Loot boxes, niveles aleatorios, eventos sorpresa |
| Investment | Progreso, colección, amigos, habilidad desarrollada |

### **VR / Experiencias Inmersivas**
| Elemento | Implementación Típica |
|----------|----------------------|
| Trigger | "Nueva experiencia disponible", recordatorio de sesión |
| Action | Entrar al VR (inmediato) |
| Variable Reward | Mundo que cambia, interacciones sociales impredecibles |
| Investment | Avatar personalizado, logros, red de amigos VR |

---

## ⚠️ PRINCIPIOS ÉTICOS (NO NEGOCIABLES)

### **El Test de la Manipulación**
```
1. ¿El usuario quiere usar el producto? (Deseo real)
2. ¿Me usaría YO a mí mismo? (Uso honesto)
3. ¿Mejora la vida del usuario? (Impacto positivo)
```

**Si falla alguno → NO implementar ese HOOK**

### **Anti-Patrones Prohibidos**
❌ Dark patterns (ocultar cancelación)  
❌ FOMO tóxico ("tus amigos te están esperando" falso)  
❌ Skinner boxes abusivas (loot boxes pagadas)  
❌ Adicción sin valor (scroll infinito sin propósito)

### **Sparkplug Promise**
> "Construimos hábitos que **empoderan**, no que esclavizan"

---

## 🛠️ PROCESO DE IMPLEMENTACIÓN

### **Fase 1: Auditoría HOOKED** (Día 1)
1. Identificar qué elementos HOOKED ya existen
2. Mapear el ciclo actual del usuario
3. Detectar "fugas" (dónde abandonan)

### **Fase 2: Diseño de Ciclo** (Día 2-3)
1. Definir trigger principal
2. Simplificar acción a < 3 segundos
3. Diseñar recompensa variable
4. Crear mecanismo de inversión

### **Fase 3: Validación** (Semana 1)
1. Medir tasa de completado del ciclo
2. A/B test de recompensas variables
3. Entrevistas: "¿Por qué volviste?"

### **Fase 4: Iteración** (Continuo)
1. Agregar variedad a recompensas
2. Refinar triggers internos
3. Aumentar valor de inversión

---

## 📊 MÉTRICAS CLAVE

| Métrica | Qué mide | Meta |
|---------|----------|------|
| Cycle Completion Rate | % que completan el ciclo HOOKED | > 40% |
| Trigger → Action Time | Tiempo desde trigger a acción | < 5 seg |
| Variable Reward Surprise | % de usuarios que reportan "sorpresa" | > 30% |
| Investment Depth | Datos/contenido generado por usuario | Crece semana a semana |
| Habit Formation | Frecuencia de uso sin prompt externo | > 3x/semana |

---

## 🧠 EJEMPLO COMPLETO: Second Brain

```
TRIGGER (Externo)
    ↓
Badge "✨ 3 Conexiones Descubiertas" en dashboard
    ↓
ACTION
    ↓
Click en conexión (1 segundo)
    ↓
VARIABLE REWARD
    ↓
Descubrimiento inesperado: "Tu nota de 2023 conecta con 
la de ayer porque ambas mencionan 'productividad'"
    ↓
INVESTMENT
    ↓
- Embedding guardado mejora futuras búsquedas
- Usuario agrega tag manualmente
- Sistema aprende preferencias
    ↓
TRIGGER (Interno - próxima vez)
    ↓
"¿Qué otra conexión descubrirá hoy?" (curiosidad)
```

---

## 🎯 CHECKLIST FINAL DE PRODUCTO

Antes de lanzar cualquier feature:

- [ ] ¿Identifiqué los 4 elementos HOOKED?
- [ ] ¿La acción toma menos de 3 segundos?
- [ ] ¿Hay recompensa variable real (no predecible)?
- [ ] ¿La inversión mejora la próxima experiencia?
- [ ] ¿Pasa el Test de la Manipulación?
- [ ] ¿Medimos las métricas clave?

---

## 📚 RECURSOS

- **Libro:** "Hooked" - Nir Eyal
- **Workshop:** NirAndFar.com
- **Templates:** Ver carpeta `/templates/hooked/`

---

**Guardado en:** `5_PAPACITO_OS/DIRECTRICES/HOOKED-DESIGN-FRAMEWORK.md`  
**Última actualización:** Febrero 2025  
**Próxima revisión:** Marzo 2025

---

*"Los productos que cambian comportamientos son los que cambian el mundo"*  
— Nir Eyal
