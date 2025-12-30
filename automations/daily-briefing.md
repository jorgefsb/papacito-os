# DAILY BRIEFING - Automatización de Inicio del Día

> **Trigger:** Jorge dice "¿Qué sigue?" o "Daily briefing" o inicia sesión
> **Propósito:** Optimizar cada día con claridad absoluta de prioridades
> **Valor:** 10-15 minutos ahorrados cada mañana + mejor toma de decisiones
> **Frecuencia:** Diario (idealmente al inicio del día)

---

## 🎯 Qué Hace el Daily Briefing

El Daily Briefing analiza automáticamente:

1. **Estado actual** de los 12 proyectos estratégicos
2. **Bloqueadores** que impiden progreso
3. **Oportunidades** de alto leverage disponibles HOY
4. **Siguiente acción** más rentable basada en Leverage/Speed/Energy

**Resultado:** Jorge sabe EXACTAMENTE qué hacer primero cada día.

---

## 🔄 Proceso Automático

### Paso 1: Leer Estado Actual

**Fuentes de información:**
```
1. Leer: /Users/jorgesuarez/.claude/spark-dashboard.md
   → Estado general de los 12 proyectos

2. Leer: /Users/jorgesuarez/.claude/projects/*.md
   → Detalles de proyectos activos

3. Leer: /Users/jorgesuarez/Desktop/PapacitoOS/core/priorities.md
   → Confirmar prioridades 80/20
```

### Paso 2: Activar Life Coach + Agentes Relevantes

**Colaboración automática:**
```
[ROUTER] detecta: Daily briefing request

Activa:
- [LIFE COACH] → Lidera el briefing (visión general)
- [GM CO-PILOT] → Input sobre Amber (si proyectos Amber activos)
- [PM BRANDCADE] → Input sobre Brandcade (si bloqueado o priority)
- [BD HUNTER] → Input sobre pipeline BD (si deals pendientes)
- [COO DIGITAL] → Input sobre Sparkplug (si proyectos Sparkplug activos)
- [SALES MACHINE] → Input sobre outreach (si pipeline Sparkplug)

Colaboración: CONSULTIVA
→ Life Coach lidera, consulta agentes específicos según proyectos activos
```

### Paso 3: Analizar con Métricas de Decisión

**Framework aplicado:**
```
Para cada proyecto activo:
1. ¿Está bloqueado? → Identify blocker
2. ¿Tiene siguiente acción clara? → Identify action
3. Score de Leverage/Speed/Energy → Prioritize
4. ¿Es el mejor uso del tiempo de Jorge HOY? → Recommend

Resultado: Lista priorizada de acciones
```

### Paso 4: Generar Briefing

**Formato de output →** (ver templates abajo)

---

## 📋 Templates de Daily Briefing

### Template 1: Día Normal (3-4 proyectos activos)

```markdown
# ☀️ Daily Briefing - [Fecha]

**Buenos días, Jorge!** 🌮

---

## 🎯 TOP 3 PRIORIDADES HOY

### 🔥 PRIORIDAD #1: [Acción específica] (30-60 min)
**Proyecto:** #[Número] - [Nombre del proyecto]
**Contexto:** [Por qué es #1 hoy]
**Next Step:** [Acción concreta y específica]

**Leverage Score:** [X]/10 - [Por qué]
**Speed:** [Y]/10 - [Por qué]
**Energy:** [Z]/10 - [Por qué]

**Outcome esperado:**
- [Resultado 1]
- [Resultado 2]

**Bloqueadores:** [Si aplica, o "Ninguno - Ready to go"]

---

### ⭐ PRIORIDAD #2: [Acción específica] (30-45 min)
**Proyecto:** #[Número] - [Nombre del proyecto]
**Contexto:** [Por qué es #2]
**Next Step:** [Acción concreta]

**Leverage Score:** [X]/10
**Speed:** [Y]/10
**Energy:** [Z]/10

**Outcome esperado:**
- [Resultado]

---

### 💡 PRIORIDAD #3: [Acción específica] (15-30 min)
**Proyecto:** #[Número] - [Nombre del proyecto]
**Contexto:** [Por qué es #3]
**Next Step:** [Acción concreta]

**Leverage Score:** [X]/10
**Speed:** [Y]/10
**Energy:** [Z]/10

**Outcome esperado:**
- [Resultado]

---

## 📊 ESTADO GENERAL

**Proyectos Activos:** [Número]
- 🟢 En progreso: [Lista]
- 🟡 Bloqueados: [Lista] (ver sección de bloqueadores)
- ⚪ En pausa: [Lista]

**Distribución tiempo estimado HOY:**
- Amber (80%): ~[X] horas
- Sparkplug (20%): ~[Y] horas
- Personal: ~[Z] horas

---

## 🚧 BLOQUEADORES (Requieren Atención)

**Proyecto #[X]:** [Nombre]
- **Bloqueador:** [Qué está deteniendo progreso]
- **Impact:** [Qué NO podemos hacer por esto]
- **Action:** [Cómo desbloquearlo]
- **Owner:** [Quién debe hacerlo - Jorge o delegar]
- **Urgencia:** [Alta/Media/Baja]

---

## 🎉 QUICK WINS (Opcional - Si hay tiempo)

**[Tarea rápida 1]** (5-10 min)
- Proyecto: [Número]
- Impact: [Pequeño pero vale la pena]

**[Tarea rápida 2]** (5-10 min)
- Proyecto: [Número]
- Impact: [Pequeño pero vale la pena]

---

## 📅 UPCOMING (Esta Semana)

**Meetings Importantes:**
- [Meeting 1] - [Día] - [Con quién] - [Prep needed?]

**Deadlines:**
- [Deadline 1] - [Proyecto] - [Días restantes]

---

## 💬 NOTAS ADICIONALES

[Cualquier contexto importante que Jorge deba saber hoy]
[Ejemplo: "Tudor tiene 1:1 mañana - considera preparar update de Brandcade"]

---

**ESTIMATED TIME:** [Total de horas para top 3 prioridades]
**BEST START:** [Cuál de las 3 prioridades es mejor empezar según energía/timing]

**¿Listo para arrancar?** 🚀

---

_Generado por: Life Coach + [Agentes consultados]_
_Basado en: spark-dashboard.md + projects/ + priorities.md_
```

---

### Template 2: Día con Bloqueador Crítico

```markdown
# ☀️ Daily Briefing - [Fecha]

**Buenos días, Jorge!** 🌮

---

## 🚨 ALERTA: BLOQUEADOR CRÍTICO

**Proyecto #[X]:** [Nombre]
**Bloqueador:** [Qué está deteniendo TODO]
**Impact:**
- ❌ [Proyecto Y] no puede avanzar
- ❌ [Proyecto Z] está en riesgo
- ❌ [Consecuencia business]

**ACCIÓN REQUERIDA HOY:**
[Paso específico para desbloquear]

**Si lo resuelves hoy:**
- ✅ [Benefit 1]
- ✅ [Benefit 2]
- ✅ Desbloqueamos [X] proyectos

**Tiempo estimado:** [X] minutos
**Leverage de desbloquearlo:** 🔥🔥🔥 (9-10/10)

---

## 🎯 DESPUÉS DE RESOLVER BLOQUEADOR

### Prioridad #1: [Lo que sigue después]
[Resto del template normal...]

---

_Generado por: Life Coach + [Agentes consultados]_
```

---

### Template 3: Día "Slow Day" (Pocos proyectos activos)

```markdown
# ☀️ Daily Briefing - [Fecha]

**Buenos días, Jorge!** 🌮

---

## 📊 ESTADO GENERAL

**Proyectos activos:** [Bajo número - 1-2]
**Situación:** Día relativamente tranquilo - oportunidad para LEVERAGE

---

## 🎯 RECOMENDACIÓN: DÍA DE LEVERAGE

Cuando hay pocos proyectos urgentes, es momento de construir sistemas que den leverage futuro.

### Opción A: Construir Assets (2-3 horas)
**Ejemplos:**
- [ ] Crear template de pitch reutilizable
- [ ] Documentar proceso de BD (para delegar después)
- [ ] Grabar contenido educativo (1 video = contenido para semanas)
- [ ] Actualizar caso de estudio (reutilizable en N pitches)

**Leverage:** 10/10 (se usa para siempre)

### Opción B: Learning Estratégico (1-2 horas)
**Ejemplos:**
- [ ] Curso sobre [skill que multiplica output]
- [ ] Research profundo de [competencia/industria]
- [ ] Networking con [persona de alto valor]

**Leverage:** 8/10 (invierte en capacidad futura)

### Opción C: Planear Próxima Semana/Mes (1 hora)
**Ejemplos:**
- [ ] Roadmap Brandcade próximo trimestre
- [ ] Pipeline BD: Identificar 10 prospectos nuevos
- [ ] Planear contenido próximo mes

**Leverage:** 9/10 (previene firefighting futuro)

---

## 🎉 O... DÍA DE DESCANSO

**Opción D:** Si energía está baja, es OK tomar tiempo para:
- Reflexionar (Life Coach session)
- Creativo sin KPIs (proyecto #12)
- Tiempo con Dragón 🐉 (proyecto #10)

**Energy Score:** 10/10 (recargas para días intensos)

---

**RECOMENDACIÓN FINAL:**
[Basado en contexto de Jorge, qué opción es mejor HOY]

---

_Generado por: Life Coach + Learning Facilitator_
```

---

### Template 4: Día "Fuego" (Múltiples urgencias)

```markdown
# ☀️ Daily Briefing - [Fecha]

**Buenos días, Jorge!** 🌮

---

## 🔥 ALERTA: MÚLTIPLES URGENCIAS

**Situación:** [X] proyectos requieren atención HOY
**Riesgo:** Intentar hacer todo = no terminar nada

---

## 🎯 ESTRATEGIA: TRIAGE

### ✅ HACER HOY (No negociable)

**[Urgencia 1]** - [Proyecto #X]
- **Por qué no puede esperar:** [Razón]
- **Tiempo:** [X] min
- **Outcome:** [Resultado crítico]

**[Urgencia 2]** - [Proyecto #Y]
- **Por qué no puede esperar:** [Razón]
- **Tiempo:** [Y] min
- **Outcome:** [Resultado crítico]

**Total tiempo urgencias:** [Suma] - [Feasibility check]

---

### ⏸️ DELEGAR/POSTPONE (Puede esperar o alguien más puede)

**[Urgencia 3]** - [Proyecto #Z]
- **Por qué PUEDE esperar:** [Razón]
- **Alternativa:** [Delegar a X] o [Mover a mañana]

**[Urgencia 4]** - [Proyecto #W]
- **Por qué PUEDE esperar:** [Razón]
- **Alternativa:** [Delegar a Y] o [Mover a esta semana]

---

### 🚫 NO HACER HOY (Drop it)

**[Urgencia 5]** - [Proyecto #V]
- **Por qué NO hacerlo:** [Bajo leverage, o puede eliminarse]
- **Acción:** Decir NO o delegar permanentemente

---

## ⚡ EXECUTION PLAN

**Orden recomendado:**
1. [Urgencia con mayor leverage] - [Tiempo] - [Horario sugerido]
2. [Urgencia siguiente] - [Tiempo] - [Horario sugerido]

**Buffer time:** [X] min entre tareas (no back-to-back)

**Energía:** Si después de urgencias queda energía, [sugerencia]. Si no, DESCANSAR.

---

## 💬 MENSAJE DE LIFE COACH

"Días de fuego pasan. Lo importante es priorizar bien, no hacer todo mal. Estas 2 urgencias son las que realmente importan. Las demás pueden esperar o alguien más puede hacerlas."

---

_Generado por: Life Coach + [Agentes de proyectos urgentes]_
```

---

## 🧪 Casos de Prueba

### Test 1: Briefing Normal

**Input:** "¿Qué sigue?"

**Estado de proyectos (simulado):**
- Proyecto #3 (Brandcade): 🟡 Bloqueado (esperando data de Onix)
- Proyecto #2 (BD Amber): 🟢 Activo (2 deals en pipeline)
- Proyecto #8 (Contenido): 🟢 Activo (posts pendientes)

**Expected Output:**
```
Prioridad #1: Mensaje a Lunarcito pidiendo data Onix (30 min)
→ Desbloquea Brandcade + BD (caso de estudio)
→ Leverage: 10/10

Prioridad #2: Preparar pitch para Deal A (45 min)
→ Deal de $1.5M en pipeline
→ Leverage: 9/10

Prioridad #3: Crear 2 posts LinkedIn (20 min)
→ Contenido de la semana
→ Leverage: 6/10
```

### Test 2: Día con Bloqueador Crítico

**Input:** "Daily briefing"

**Estado:**
- Proyecto #3 (Brandcade): 🔴 Bloqueado CRÍTICO (cliente esperando response)

**Expected Output:**
```
🚨 ALERTA: Cliente Onix esperando update desde hace 3 días
ACCIÓN: Responder email + dar timeline (15 min)
Leverage de desbloquearlo: 10/10 (salva relación con cliente)
```

### Test 3: Día Tranquilo

**Input:** "¿Qué sigue?"

**Estado:**
- Todos los proyectos: 🟢 o ⚪ (nada urgente)

**Expected Output:**
```
Día tranquilo - Oportunidad de LEVERAGE

Opción A: Crear template de pitch Brandcade (reutilizable)
Opción B: Curso sobre Roblox economics
Opción C: Planear contenido próximo mes

Recomendación: Opción A (más leverage inmediato)
```

---

## 🔧 Configuración

### Personalización del Briefing

**Jorge puede ajustar:**

```markdown
# Configuración Daily Briefing

**Preferencias:**
- Longitud: [Corta/Media/Larga]
  - Corta: Solo top 3 prioridades
  - Media: Top 3 + bloqueadores + upcoming
  - Larga: Todo (incluye quick wins, notas)

- Tone: [Motivacional/Neutro/Directo]
  - Motivacional: "¡Vamos!" energy
  - Neutro: Facts only
  - Directo: Sin fluff, straight to action

- Timing sugerido: [Sí/No]
  - Sí: Briefing sugiere horarios ("9-10am: Prioridad #1")
  - No: Solo lista prioridades

- Incluir métricas L/S/E: [Sí/No]
  - Sí: Muestra scores de Leverage/Speed/Energy
  - No: Solo lista acciones

**Default:** Media, Motivacional, No timing, Sí métricas
```

### Frecuencia

**Opciones:**
- Diario (recomendado)
- Bajo demanda ("¿Qué sigue?")
- Automático al inicio de sesión

---

## 📝 Notas de Implementación

**Para que Daily Briefing funcione:**

1. ✅ **spark-dashboard.md** debe estar actualizado
   - Agentes actualizan después de cada trabajo
   - Jorge hace quick update al final del día (opcional)

2. ✅ **projects/*.md** deben reflejar estado real
   - Sincronización bidireccional con PapacitoOS

3. ✅ **Life Coach** lidera el briefing
   - Consulta agentes relevantes según proyectos activos
   - Aplica framework de Leverage/Speed/Energy

4. ✅ **Router** detecta automáticamente
   - "¿Qué sigue?", "Daily briefing", "Buenos días" → Trigger briefing

---

## 🎯 Valor del Daily Briefing

**Antes de Daily Briefing:**
- Jorge empieza día sin claridad
- Revisa emails/slack → modo reactivo
- 30-60 min "calentando motores"
- Trabaja en lo urgente, no lo importante

**Después de Daily Briefing:**
- Claridad absoluta en <2 minutos
- Sabe qué tiene mayor leverage HOY
- Empieza con acción de alto impacto
- Modo proactivo desde minuto 1

**ROI:**
- **Tiempo ahorrado:** 10-15 min/día de "¿qué hago?"
- **Mejor decisiones:** Focus en leverage, no urgencias
- **Menos burnout:** Sabe que está trabajando en lo correcto
- **Más output:** Optimiza cada día basado en métricas

---

## 🔄 Integración con Otros Sistemas

**Daily Briefing se integra con:**

1. **spark-dashboard.md** - Fuente de verdad de estado
2. **Router** - Detecta trigger automáticamente
3. **Life Coach** - Lidera el briefing
4. **Agentes de proyectos** - Consultados según estado
5. **Metrics Tracker** (futuro) - Alimenta con data de progreso

---

**NOTA FINAL:**

El Daily Briefing es la automatización de MAYOR valor inmediato. Sin él, Jorge empieza cada día en modo reactivo. Con él, cada día empieza optimizado.

---

**Last Updated:** 2025-12-30
**Version:** 1.0 (Fase 0)
**Trigger Keywords:** "¿Qué sigue?", "Daily briefing", "Buenos días", "What's next"
**Agent Lead:** Life Coach (consulta otros según proyectos)
