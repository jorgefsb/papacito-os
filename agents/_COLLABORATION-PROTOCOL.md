# COLLABORATION PROTOCOL - Cómo Trabajan los Agentes Entre Sí

> **Propósito:** Definir cómo los agentes colaboran como empleados reales
> **Principio:** Los agentes son un EQUIPO, no herramientas aisladas
> **Resultado:** Outputs integrados, no fragmentados

---

## 🎯 Filosofía de Colaboración

**Los agentes NO son:**
- ❌ Comandos individuales que ejecutas uno por uno
- ❌ Herramientas aisladas sin conexión
- ❌ Procesos que requieren supervisión constante

**Los agentes SON:**
- ✅ Empleados virtuales con roles específicos
- ✅ Equipo que se pasa trabajo entre sí
- ✅ Sistema que trabaja automáticamente una vez activado

**Analogía:**
```
Como en empresa real:
- PM define producto → BD arma pitch → Marketing crea campaña

En PapacitoOS:
- [PM BRANDCADE] define features → [BD HUNTER] arma deck → [CONTENT] crea posts
```

---

## 🔄 Tres Tipos de Colaboración

### Tipo 1: SECUENCIAL (Pipeline)

**Definición:** Un agente trabaja → Output → Siguiente agente trabaja → Output final

**Cuándo usarla:**
- El output de un agente es INPUT para el siguiente
- Hay dependencias claras entre pasos
- Se necesita integración secuencial

**Estructura:**
```
[AGENTE A] → Genera Output A
     ↓
[AGENTE B] → Usa Output A → Genera Output B
     ↓
[AGENTE C] → Usa Output B → Genera Output Final
```

**Ejemplos:**

**Ejemplo 1: Preparar pitch para marca**
```
Request: "Necesito pitch completo para marca X"

Pipeline:
1. [RESEARCH ANALYST]
   - Investiga marca X
   - Output: Brief de marca (sector, audiencia, competencia)

2. [PM BRANDCADE]
   - Lee brief de marca
   - Output: Value prop customizado para marca X

3. [BD HUNTER]
   - Lee value prop
   - Output: Pitch deck de 10 slides

4. [CONTENT STRATEGIST]
   - Lee pitch deck
   - Output: Email de introducción + one-pager

Deliverable final: Paquete completo integrado
```

**Ejemplo 2: Crear contenido educativo**
```
Request: "Quiero contenido sobre cómo cerrar deals en videojuegos"

Pipeline:
1. [LEARNING FACILITATOR]
   - Estructura framework educativo
   - Output: Outline del contenido

2. [BD HUNTER]
   - Agrega expertise de ventas
   - Output: Casos de estudio y tactics

3. [CONTENT STRATEGIST]
   - Adapta para audiencia
   - Output: Estructura para LinkedIn, YouTube, Newsletter

4. [CREATIVE WRITER]
   - Escribe con estilo de Jorge
   - Output: Scripts y posts listos

Deliverable final: Serie de contenido multi-formato
```

**Formato de Handoff:**
```markdown
[AGENTE A]
[Mi trabajo aquí...]

→ Pasando a [AGENTE B] para [descripción del siguiente paso]

Output para AGENTE B:
- [Dato 1]
- [Dato 2]
- [Dato 3]

---

[AGENTE B]
Recibido de AGENTE A: [confirmación de qué recibió]

[Mi trabajo aquí usando el output de A...]

→ Pasando a [AGENTE C] para [siguiente paso]
```

---

### Tipo 2: PARALELA (División de Trabajo)

**Definición:** Múltiples agentes trabajan simultáneamente en partes diferentes

**Cuándo usarla:**
- Se necesitan múltiples outputs independientes
- Los trabajos NO dependen uno del otro
- Se quiere velocidad (todos trabajan a la vez)

**Estructura:**
```
                    [AGENTE A] → Output A
                   /
Request →  [ROUTER]  [AGENTE B] → Output B
                   \
                    [AGENTE C] → Output C

Resultado: A + B + C al mismo tiempo
```

**Ejemplos:**

**Ejemplo 1: Lanzamiento de producto**
```
Request: "Necesito TODO para lanzar SparkChatbots mañana"

Trabajo paralelo:
├─ [PM CHATBOTS]
│  └─ Output: Landing page copy + feature list
│
├─ [SALES MACHINE]
│  └─ Output: Email announcement para leads existentes
│
├─ [CONTENT STRATEGIST]
│  └─ Output: Posts LinkedIn + Instagram
│
└─ [BD HUNTER]
   └─ Output: Proposal template para prospectos

Todos trabajan simultáneamente → 4 deliverables listos
```

**Ejemplo 2: Contenido semanal**
```
Request: "Necesito contenido para esta semana"

Trabajo paralelo:
├─ [CONTENT STRATEGIST]
│  └─ Output: 3 posts LinkedIn sobre BD en videojuegos
│
├─ [CREATIVE WRITER]
│  └─ Output: Script YouTube sobre Brandcade
│
├─ [LEARNING FACILITATOR]
│  └─ Output: Newsletter educativo sobre Roblox marketing
│
└─ [LIFE COACH]
   └─ Output: Reflexión personal para Instagram

Todos trabajan simultáneamente → Semana cubierta
```

**Formato de Coordinación:**
```markdown
[ROUTER] Colaboración: PARALELA
Agentes activados: [A, B, C, D]

---

[AGENTE A]
[Mi trabajo independiente...]

DELIVERABLE A:
[Output]

---

[AGENTE B]
[Mi trabajo independiente...]

DELIVERABLE B:
[Output]

---

[AGENTE C]
[Mi trabajo independiente...]

DELIVERABLE C:
[Output]

---

RESUMEN DE DELIVERABLES:
1. De AGENTE A: [descripción]
2. De AGENTE B: [descripción]
3. De AGENTE C: [descripción]
```

---

### Tipo 3: CONSULTIVA (Uno Pide Ayuda)

**Definición:** Un agente lidera, pero consulta a otros para inputs específicos

**Cuándo usarla:**
- Un agente es el dueño del deliverable
- Necesita expertise o data de otro agente
- NO necesita que el otro agente genere output completo, solo info

**Estructura:**
```
[AGENTE LÍDER]
     ↓ (consulta)
[AGENTE EXPERTO] → Regresa info
     ↓
[AGENTE LÍDER] → Integra info → Output final
```

**Ejemplos:**

**Ejemplo 1: Estrategia GM Amber**
```
Request: "Necesito plan estratégico Q1 para Amber México"

Flujo:
1. [GM CO-PILOT] lidera la estrategia

2. GM CO-PILOT consulta agentes:

   → Pregunta a [RESEARCH ANALYST]:
   "Dame benchmark de crecimiento de estudios similares en LATAM"

   ← RESEARCH regresa:
   "Studios LATAM crecen 30-50% anual. Competidores: [lista]"

   → Pregunta a [BD HUNTER]:
   "¿Cuál es proyección de pipeline Q1?"

   ← BD HUNTER regresa:
   "Pipeline: $4.5M potencial, $2M probable"

   → Pregunta a [PM BRANDCADE]:
   "¿Brandcade puede lanzar en Q1?"

   ← PM BRANDCADE regresa:
   "Sí, si cerramos 1 marca en enero"

3. [GM CO-PILOT] integra todo:
   → Plan estratégico Q1 completo

Deliverable: Plan de GM CO-PILOT informado por 3 expertos
```

**Ejemplo 2: Email de ventas**
```
Request: "Necesito email para acercarme a marca de bebidas"

Flujo:
1. [BD HUNTER] lidera el outreach

2. BD HUNTER consulta:

   → Pregunta a [RESEARCH ANALYST]:
   "Dame insights sobre sector de bebidas en México"

   ← RESEARCH regresa:
   "Top marcas: [lista]. Pain points: [lista]"

   → Pregunta a [PM BRANDCADE]:
   "¿Qué features resonarían con marca de bebidas?"

   ← PM BRANDCADE regresa:
   "Sampling virtual, branded minigames, loyalty rewards"

   → Pregunta a [CONTENT STRATEGIST]:
   "Dame hook para email que llame atención"

   ← CONTENT regresa:
   "Hook: '¿Y si tu siguiente campaña alcanzara 50M de gamers sin producir comercial?'"

3. [BD HUNTER] integra:
   → Email completo con research + features + hook

Deliverable: Email de BD HUNTER potenciado por 3 expertos
```

**Formato de Consulta:**
```markdown
[AGENTE LÍDER]
Voy a crear [descripción del deliverable]

Necesito consultar a otros agentes:

→ Consultando [AGENTE EXPERTO 1]
Pregunta: [pregunta específica]

← Respuesta de AGENTE EXPERTO 1:
[Info que regresa]

→ Consultando [AGENTE EXPERTO 2]
Pregunta: [pregunta específica]

← Respuesta de AGENTE EXPERTO 2:
[Info que regresa]

---

Integrando inputs...

[Trabajo final del AGENTE LÍDER]

DELIVERABLE:
[Output final integrado]
```

---

## 🎯 Cuándo Usar Cada Tipo

### Árbol de Decisión

```
¿Se necesitan múltiples outputs independientes?
├─ SÍ → PARALELA
└─ NO ↓

¿Un agente es claramente el "dueño" del deliverable?
├─ SÍ → CONSULTIVA (ese agente lidera, consulta otros)
└─ NO ↓

¿El output de un agente es input del siguiente?
├─ SÍ → SECUENCIAL (pipeline)
└─ NO → Probablemente solo necesitas 1 agente
```

### Cheatsheet Rápido

| Situación | Tipo | Ejemplo |
|-----------|------|---------|
| Pitch completo (research → técnico → comercial → marketing) | SECUENCIAL | Research → PM → BD → Content |
| Lanzamiento producto (varios materiales a la vez) | PARALELA | PM + Sales + Content al mismo tiempo |
| Plan estratégico (líder necesita inputs) | CONSULTIVA | GM lidera, consulta Research + BD + PM |
| Contenido semanal (varios formatos) | PARALELA | Content + Creative + Learning simultáneos |
| Caso de estudio (historia integrada) | SECUENCIAL | PM (datos) → BD (story) → Content (formato) |
| Email de ventas potenciado | CONSULTIVA | BD lidera, consulta Research + PM + Content |

---

## ⚠️ Reglas de Colaboración

### Regla #1: Respeta la Separación Amber/Sparkplug

**NUNCA en la misma colaboración:**
```
❌ INCORRECTO:
[GM CO-PILOT (Amber)] → [COO DIGITAL (Sparkplug)]
Razón: Mezcla contextos de negocios separados

✅ CORRECTO:
[GM CO-PILOT (Amber)] → [BD HUNTER (Amber)] → [PM BRANDCADE (Amber)]
Todos en contexto Amber

✅ CORRECTO:
[COO DIGITAL (Sparkplug)] → [SALES MACHINE (Sparkplug)] → [PM CHATBOTS (Sparkplug)]
Todos en contexto Sparkplug
```

**Excepción: Agentes de Apoyo (Support)**
```
✅ OK:
[BD HUNTER (Amber)] consulta [RESEARCH ANALYST (Support)]
RESEARCH es neutral, puede apoyar ambos contextos

✅ OK:
[SALES MACHINE (Sparkplug)] consulta [LEARNING FACILITATOR (Support)]
LEARNING es neutral, puede apoyar ambos contextos
```

### Regla #2: Handoffs Claros

**Cuando un agente pasa trabajo a otro:**
- ✅ Menciona explícitamente: "→ Pasando a [AGENTE X]"
- ✅ Resume qué está pasando: "Output para AGENTE X: [lista]"
- ✅ Explica qué debe hacer el siguiente: "para [acción específica]"

**Formato obligatorio:**
```markdown
→ Pasando a [AGENTE SIGUIENTE] para [acción específica]

Output que le paso:
- [Dato/Output 1]
- [Dato/Output 2]
```

### Regla #3: Confirmación de Recepción

**Cuando un agente recibe trabajo de otro:**
- ✅ Confirma: "Recibido de [AGENTE ANTERIOR]: [qué recibió]"
- ✅ Valida: Si algo falta, preguntar antes de continuar
- ✅ Conecta: Mostrar cómo usarás el output previo

**Formato obligatorio:**
```markdown
[AGENTE NUEVO]
Recibido de [AGENTE PREVIO]:
- [Confirmo que recibí X]
- [Confirmo que recibí Y]

Voy a usar esto para [mi trabajo específico]...
```

### Regla #4: Evitar Redundancia

**Si dos agentes harían lo mismo:**
- ❌ NO duplicar trabajo
- ✅ Elegir el agente MÁS experto en ese output específico
- ✅ El otro agente consulta o valida, no rehace

**Ejemplo:**
```
Request: "Necesito pitch y también contenido para redes"

❌ INCORRECTO:
[BD HUNTER] crea pitch
[CONTENT STRATEGIST] también crea pitch diferente
Resultado: 2 pitches, confusión

✅ CORRECTO:
[BD HUNTER] crea pitch (es su expertise)
[CONTENT STRATEGIST] adapta pitch a posts (es su expertise)
Resultado: 1 pitch + posts que lo amplifican
```

### Regla #5: Máximo 4 Agentes por Colaboración

**Por qué:**
- Más de 4 agentes = complejidad innecesaria
- Difícil de coordinar
- Probablemente hay redundancia

**Si necesitas más de 4:**
- Divide en 2 colaboraciones separadas
- O replantea: ¿De verdad se necesitan todos?

---

## 📋 Templates de Colaboración

### Template: Secuencial

```markdown
[ROUTER] 🎯 COLABORACIÓN SECUENCIAL

Pipeline:
[AGENTE A] → [AGENTE B] → [AGENTE C]

---

[AGENTE A]
[Trabajo de A...]

→ Pasando a [AGENTE B] para [acción]

Output:
- [Output 1]
- [Output 2]

---

[AGENTE B]
Recibido de AGENTE A: [confirmación]

[Trabajo de B usando output de A...]

→ Pasando a [AGENTE C] para [acción]

Output:
- [Output 3]
- [Output 4]

---

[AGENTE C]
Recibido de AGENTE B: [confirmación]

[Trabajo final de C...]

---

DELIVERABLE FINAL:
[Output integrado completo]
```

### Template: Paralela

```markdown
[ROUTER] ⚡ COLABORACIÓN PARALELA

Agentes trabajando simultáneamente:
- [AGENTE A]: [responsabilidad]
- [AGENTE B]: [responsabilidad]
- [AGENTE C]: [responsabilidad]

---

[AGENTE A]
[Trabajo independiente...]

DELIVERABLE A:
[Output]

---

[AGENTE B]
[Trabajo independiente...]

DELIVERABLE B:
[Output]

---

[AGENTE C]
[Trabajo independiente...]

DELIVERABLE C:
[Output]

---

RESUMEN:
1. [Descripción output A]
2. [Descripción output B]
3. [Descripción output C]

Todos listos para usar.
```

### Template: Consultiva

```markdown
[ROUTER] 💡 COLABORACIÓN CONSULTIVA

Agente líder: [AGENTE X]
Agentes consultados: [AGENTE Y, AGENTE Z]

---

[AGENTE X]
Liderando: [descripción del deliverable]

→ Consultando [AGENTE Y]
Pregunta: [pregunta específica]

---

[AGENTE Y]
← Respuesta para AGENTE X:
[Info/data que regreso]

---

[AGENTE X]
→ Consultando [AGENTE Z]
Pregunta: [pregunta específica]

---

[AGENTE Z]
← Respuesta para AGENTE X:
[Info/data que regreso]

---

[AGENTE X]
Integrando inputs de Y y Z...

[Trabajo final]

DELIVERABLE:
[Output completo informado por consultas]
```

---

## 🧪 Casos de Prueba

### Test 1: Secuencial Básica

**Input:** "Necesito pitch para marca de ropa"

**Expected:**
```
Pipeline:
[RESEARCH] → Investiga sector moda
[PM BRANDCADE] → Value prop para moda
[BD HUNTER] → Pitch deck
```

### Test 2: Paralela Básica

**Input:** "Necesito contenido completo esta semana"

**Expected:**
```
Paralela:
[CONTENT] → Posts LinkedIn
[CREATIVE] → Script YouTube
[LEARNING] → Newsletter
```

### Test 3: Consultiva Básica

**Input:** "Plan estratégico Q1 Amber"

**Expected:**
```
Consultiva:
[GM CO-PILOT] lidera
Consulta: [RESEARCH, BD, PM]
Integra: Plan completo
```

### Test 4: Validación de Separación

**Input:** "Estrategia de producto para Brandcade y Chatbots"

**Expected:**
```
ERROR: Dos contextos (Amber + Sparkplug)
Router debe separar en 2 requests:
1. [PM BRANDCADE] para Brandcade (Amber)
2. [PM CHATBOTS] para Chatbots (Sparkplug)
NUNCA en la misma colaboración
```

---

## 📝 Notas para Agentes

**Si eres un agente:**

**Tu responsabilidad en colaboración:**
1. ✅ Leer el output del agente anterior (si es secuencial)
2. ✅ Confirmar qué recibiste
3. ✅ Hacer tu trabajo con tu expertise específico
4. ✅ Pasar trabajo claro al siguiente (si aplica)
5. ✅ NO duplicar trabajo de otros agentes

**Señales de problema:**
- ❌ "No entiendo qué debo hacer con el output de [AGENTE X]"
  → Pide clarificación antes de continuar
- ❌ "Estoy haciendo lo mismo que [AGENTE Y]"
  → Detente, hay redundancia, consulta Router
- ❌ "No tengo suficiente info para continuar"
  → Solicita al agente anterior o consulta otro agente

**Tu lenguaje de colaboración:**
- ✅ "Recibido de [X]: [confirmación]"
- ✅ "→ Pasando a [Y] para [acción]"
- ✅ "← Regresando a [Z] con [info]"
- ✅ "Consultando [W] sobre [tema]"

---

## 🔧 Debugging Colaboración

### Problema: Agentes duplican trabajo

**Diagnóstico:**
- Router activó agentes con expertise superpuesta
- No se definió quién hace qué

**Fix:**
```
En Router: Definir división clara
En Agentes: Checkear si otro ya hizo esto antes de duplicar
```

### Problema: Output fragmentado (no integrado)

**Diagnóstico:**
- Se usó PARALELA cuando debió ser SECUENCIAL
- Agentes no se pasaron outputs entre sí

**Fix:**
```
Cambiar a SECUENCIAL
O agregar agente final que integre outputs paralelos
```

### Problema: Falta información para continuar

**Diagnóstico:**
- Handoff incompleto
- Agente anterior no pasó todo lo necesario

**Fix:**
```
Agente actual debe pedir info antes de continuar
O consultar a otro agente (cambiar a CONSULTIVA)
```

---

**NOTA FINAL:**

La colaboración es lo que convierte agentes individuales en un EQUIPO. Sin colaboración, PapacitoOS es solo una colección de herramientas. Con colaboración, es un equipo de empleados virtuales trabajando juntos.

---

**Last Updated:** 2025-12-30
**Version:** 1.0 (Fase 0)
**Status:** Core component - DO NOT DELETE
