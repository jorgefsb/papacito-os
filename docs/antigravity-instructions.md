# INSTRUCCIONES PARA ANTI-GRAVITY - Cómo Continuar con Fase 1

> **Fecha:** 2025-12-30
> **Para:** Anti-Gravity (Google AI IDE)
> **Tarea:** Completar Fase 1 de PapacitoOS
> **Tiempo estimado:** 2-3 horas
> **Resultado:** 8 agentes + 3 automatizaciones

---

## 🎯 TU MISIÓN

Crear 11 archivos nuevos para completar el sistema de agentes de PapacitoOS v1.0.

**Ya existe (Fase 0):**
- 3 agentes de Amber (GM Co-Pilot, BD Hunter, PM Brandcade)
- 2 automatizaciones (Daily Briefing, Project Sync)
- Core system (Router, Collaboration Protocol, Identity, Priorities)

**Tú crearás (Fase 1):**
- 8 agentes adicionales (Sparkplug, Personal, Support)
- 3 automatizaciones adicionales (Content Pipeline, BD Outreach, Metrics Tracker)

---

## 📖 PASO 1: LEER CONTEXTO (15-20 min)

**Lee estos archivos EN ESTE ORDEN:**

### Archivos Críticos (MUST READ):

1. **`~/Desktop/PapacitoOS/docs/phase-1-handoff.md`**
   - Estado actual completo
   - Lista de archivos a crear
   - Formato estándar
   - Criterios de calidad

2. **`~/Desktop/PapacitoOS/core/identity.md`**
   - Quién es Jorge
   - Sus negocios (Amber 80%, Sparkplug 20%)
   - Su equipo
   - **CRÍTICO:** Entender separación Amber vs Sparkplug

3. **`~/Desktop/PapacitoOS/core/priorities.md`**
   - **REGLA #1:** Amber y Sparkplug NUNCA se mezclan
   - **REGLA #2:** Raúl Ruiz = SOLO Sparkplug
   - Equipos separados
   - Contextos que NO cruzan

4. **`~/Desktop/PapacitoOS/agents/_COLLABORATION-PROTOCOL.md`**
   - 3 tipos de colaboración (Secuencial, Paralela, Consultiva)
   - Cómo agentes trabajan juntos
   - Templates de colaboración

### Archivos de Referencia (EJEMPLOS):

5. **`~/Desktop/PapacitoOS/agents/amber-agents/gm-copilot.md`**
   - EJEMPLO COMPLETO de cómo debe verse un agente
   - Estructura, largo, profundidad
   - **USA ESTO COMO TEMPLATE**

6. **`~/Desktop/PapacitoOS/agents/amber-agents/bd-hunter.md`**
   - Otro ejemplo completo
   - Nota los Outputs detallados
   - Nota los Examples de colaboración

7. **`~/Desktop/PapacitoOS/agents/amber-agents/pm-brandcade.md`**
   - Tercer ejemplo
   - Nota la sección de Notes
   - Nota criterios de éxito/fallo

---

## 🛠️ PASO 2: CREAR AGENTES (2-2.5 horas)

### Orden Sugerido de Creación:

**BLOQUE 1: Support Agents (crear primero - los necesitan todos)**

**1. `~/Desktop/PapacitoOS/agents/support-agents/research-analyst.md`**

```markdown
Contexto clave:
- Rol: Analista de investigación y competitive intelligence
- Neutro: Apoya AMBOS Amber Y Sparkplug
- Colabora con: TODOS (es consultado frecuentemente)
- Expertise: Benchmarks, competitive analysis, data research, insights
- Outputs: Research reports, competitor analysis, benchmarks

Inspiración:
- Consulta cómo BD Hunter y PM Brandcade lo usan en sus ejemplos
- Es como un "Google experto" que siempre tiene data relevante

Largo esperado: 600-800 líneas
```

**2. `~/Desktop/PapacitoOS/agents/support-agents/learning-facilitator.md`**

```markdown
Contexto clave:
- Rol: Facilitador de aprendizaje continuo
- Neutro: Apoya ambos contextos
- Proyecto: #11 (Aprendizaje Continuo)
- Expertise: Cursos, skills, frameworks educativos, learning paths
- Outputs: Course recommendations, skill frameworks, learning roadmaps

Inspiración:
- Cuando Jorge quiere aprender algo nuevo (Roblox, AI, ventas)
- Este agente estructura el aprendizaje

Largo esperado: 600-800 líneas
```

---

**BLOQUE 2: Personal Agents**

**3. `~/Desktop/PapacitoOS/agents/personal-agents/life-coach.md`**

```markdown
Contexto clave:
- Rol: Life Coach y estratega personal (YA LIDERA Daily Briefing)
- Proyectos: #9 (Claridad Mental), #10 (Dragón 🐉)
- Expertise: Balance, objetivos, energía, decisiones personales
- CRÍTICO: Este agente lidera la automatización Daily Briefing
- Colabora con: TODOS (consulta sobre impacto personal de decisiones)
- Outputs: Daily briefings, reflections, goal plans, balance checks

Inspiración:
- Ver automations/daily-briefing.md para entender su rol
- Es el agente que pregunta "¿Esto te da energía?"
- Valida decisiones con framework Leverage/Speed/Energy

Largo esperado: 700-900 líneas
```

**4. `~/Desktop/PapacitoOS/agents/personal-agents/content-strategist.md`**

```markdown
Contexto clave:
- Rol: Director de Contenido para Marca Personal
- Proyectos: #7 (JorgeSuarez.com.mx), #8 (Contenido)
- Expertise: Content calendar, LinkedIn/YouTube/TikTok, storytelling
- Focus: Ayudar a otros a vivir de hacer videojuegos
- Colabora con: Creative Writer, Learning Facilitator, BD Hunter (para content)
- Outputs: Content calendars, posts LinkedIn, scripts YouTube, newsletters

Inspiración:
- Jorge crea 2-3 posts diarios + podcast jueves
- Este agente planea y optimiza ese contenido
- Puede colaborar con BD Hunter para convertir pitches en posts

Largo esperado: 700-900 líneas
```

**5. `~/Desktop/PapacitoOS/agents/personal-agents/creative-writer.md`**

```markdown
Contexto clave:
- Rol: Escritor creativo SIN KPIs (puro por diversión)
- Proyecto: #12 (Creativo)
- Filosofía: Creatividad sin métricas, experimentos, diversión
- Colabora con: Content Strategist (a veces), Learning Facilitator
- Outputs: Creative writing, stories, experiments, fun projects

Inspiración:
- El proyecto #12 es para creatividad sin presión
- Este agente NO optimiza para resultados, optimiza para disfrute
- Puede hacer cosas "raras" o experimentales

Largo esperado: 600-800 líneas
```

---

**BLOQUE 3: Sparkplug Agents (CUIDADO: Contexto separado)**

**⚠️ REGLA CRÍTICA ANTES DE CREAR ESTOS 3:**
- Raúl Ruiz = SOLO Sparkplug (NUNCA Amber)
- Equipo Sparkplug: Raúl, Diego, Sergio, Cristian, Nat
- NUNCA mencionar: Mihai, Tudor, Andreea, Nena, Lunarcito (son Amber)
- NUNCA colaborar con: GM Co-Pilot, BD Hunter, PM Brandcade
- SÍ colaborar con: Research Analyst, Learning Facilitator (neutros)

**6. `~/Desktop/PapacitoOS/agents/sparkplug-agents/coo-digital.md`**

```markdown
Contexto clave:
- Rol: COO Digital virtual de Sparkplug
- Proyecto: #4 (Sparkplug - Operación)
- Expertise: Operaciones, sistemas, prioridades, meetings, people ops
- Team: Raúl Ruiz (socio), Cristian (People Ops), Nat (Finanzas)
- Colabora con: Sales Machine, PM Chatbots, Research Analyst
- Outputs: Process docs, systems, OKRs, meeting agendas

Inspiración:
- Similar a GM Co-Pilot pero para Sparkplug (20% del tiempo de Jorge)
- Focus: Operación eficiente, no estrategia grande
- Raúl es SOCIO, no empleado

Largo esperado: 700-900 líneas
```

**7. `~/Desktop/PapacitoOS/agents/sparkplug-agents/sales-machine.md`**

```markdown
Contexto clave:
- Rol: VP de Ventas virtual de Sparkplug
- Proyecto: #5 (Sparkplug - Ventas & Outreach)
- Expertise: Core 4 (Cold, Warm, Ads, Content), outreach sequences
- Team: Raúl, Diego, Sergio
- Colabora con: COO Digital, PM Chatbots, Content Strategist (para copy)
- Outputs: Cold email sequences, prospect lists, Core 4 strategies

Inspiración:
- Similar a BD Hunter pero para Sparkplug
- Focus: Volumen y eficiencia, no deals gigantes
- Core 4 framework es clave

Largo esperado: 700-900 líneas
```

**8. `~/Desktop/PapacitoOS/agents/sparkplug-agents/pm-chatbots.md`**

```markdown
Contexto clave:
- Rol: Product Manager de SparkChatbots
- Proyecto: #6 (SparkChatbots)
- Producto: Instagram/Facebook chatbots
- Pricing: $21,980 MXN/mes (primer mes gratis)
- Cliente actual: Gabriela Escoto (sistema educativo)
- Colabora con: Sales Machine, COO Digital, Content Strategist
- Outputs: Feature specs, roadmap, pricing, case studies

Inspiración:
- Similar a PM Brandcade pero para chatbots
- Producto más simple, B2B local
- Focus: Product-market fit

Largo esperado: 700-900 líneas
```

---

## 🤖 PASO 3: CREAR AUTOMATIZACIONES (30-45 min)

**Orden sugerido:**

**9. `~/Desktop/PapacitoOS/automations/content-pipeline.md`**

```markdown
Estructura:
- Trigger: Jorge arrastra documento o dice "necesito contenido"
- Proceso: Content Strategist + Creative Writer + Learning Facilitator
- Output: Posts LinkedIn, script YouTube, newsletter

Inspiración:
- Ver automations/daily-briefing.md para formato
- Content Pipeline procesa docs y genera contenido multi-formato

Largo esperado: 400-600 líneas
```

**10. `~/Desktop/PapacitoOS/automations/bd-outreach-flow.md`**

```markdown
Estructura:
- Trigger: "necesito outreach para [tipo de cliente]"
- Proceso: Research → BD Hunter/Sales Machine → Content
- Output: Lista prospectos + emails + follow-up plan

Inspiración:
- Combina research + sales + copy
- Funciona para Amber (BD Hunter) Y Sparkplug (Sales Machine)

Largo esperado: 400-600 líneas
```

**11. `~/Desktop/PapacitoOS/automations/metrics-tracker.md`**

```markdown
Estructura:
- Trigger: Semanal automático o "track metrics"
- Proceso: Lee dashboard → Agentes reportan → Life Coach analiza
- Output: Weekly metrics report + alertas

Inspiración:
- Complementa Daily Briefing (diario vs semanal)
- Visibilidad de progreso en todos los proyectos

Largo esperado: 400-600 líneas
```

---

## ✅ PASO 4: VALIDAR CALIDAD (15-20 min)

**Checklist para CADA archivo:**

- [ ] Sigue estructura estándar (Identity, Activation, Collaboration, Outputs, Examples)
- [ ] Largo apropiado (600-1000 líneas agentes, 400-600 automatizaciones)
- [ ] Mínimo 3-4 Typical Outputs con templates detallados
- [ ] Mínimo 2 Example Interactions completos
- [ ] Sección Notes con filosofía y criterios éxito/fallo
- [ ] Contexto correcto (Amber/Sparkplug/Personal/Support)
- [ ] NO mezcla Amber y Sparkplug (si aplica)
- [ ] Collaboration partners definidos correctamente
- [ ] Keywords de activación claras

**Para agentes Sparkplug específicamente:**
- [ ] SOLO menciona equipo Sparkplug (Raúl, Diego, Sergio, Cristian, Nat)
- [ ] NUNCA menciona equipo Amber (Mihai, Tudor, Andreea, Nena, Lunarcito)
- [ ] NO colabora con agentes Amber (GM, BD, PM Brandcade)
- [ ] SÍ colabora con agentes Support (Research, Learning)

---

## 💾 PASO 5: GUARDAR EN UBICACIONES CORRECTAS

**Estructura de carpetas:**

```
~/Desktop/PapacitoOS/
├── agents/
│   ├── sparkplug-agents/
│   │   ├── coo-digital.md
│   │   ├── sales-machine.md
│   │   └── pm-chatbots.md
│   ├── personal-agents/
│   │   ├── content-strategist.md
│   │   ├── life-coach.md
│   │   └── creative-writer.md
│   └── support-agents/
│       ├── learning-facilitator.md
│       └── research-analyst.md
│
└── automations/
    ├── content-pipeline.md
    ├── bd-outreach-flow.md
    └── metrics-tracker.md
```

**IMPORTANTE:** Guardar en las carpetas correctas (sparkplug-agents/, personal-agents/, support-agents/)

---

## 🔄 PASO 6: DOCUMENTAR PROCESO (OPCIONAL)

**Si quieres generar Artifacts:**

Crea documento con:
- Task list de lo que hiciste
- Screenshots de archivos creados
- Implementation plan que seguiste
- Cualquier decisión importante que tomaste
- Dudas o sugerencias para mejorar

Guarda como: `~/Desktop/PapacitoOS/docs/phase-1-execution-log.md`

---

## 📤 PASO 7: HANDOFF A SPARK (GIT)

**SI tienes acceso a git:**

```bash
cd ~/Desktop/PapacitoOS
git add .
git commit -m "feat: Complete Phase 1 - Full agent system

- Added 8 agents: Sparkplug (3), Personal (3), Support (2)
- Added 3 automations: Content Pipeline, BD Outreach, Metrics Tracker
- All agents follow standard format
- Amber/Sparkplug separation maintained
- Total: 11 agents + 5 automations operational

🤖 Generated with Anti-Gravity
Co-Authored-By: Google Anti-Gravity <antigravity@google.com>"

git push origin main
```

**SI NO tienes acceso a git:**

Deja los archivos listos en `~/Desktop/PapacitoOS/` y crea nota:

`~/Desktop/PapacitoOS/docs/ready-for-git.md`:
```
Fase 1 completada por Anti-Gravity
Archivos creados: 11
Listos para que Spark haga git commit y push
```

---

## 🎯 OUTPUTS ESPERADOS

**Al terminar, Jorge debe tener:**

1. ✅ 11 archivos nuevos en ubicaciones correctas
2. ✅ Cada archivo 600-1000 líneas (agentes) o 400-600 (automatizaciones)
3. ✅ Estructura consistente con ejemplos de Fase 0
4. ✅ Separación Amber/Sparkplug respetada
5. ✅ Collaboration partners correctos
6. ✅ Examples detallados y útiles
7. ✅ (Opcional) Artifacts/screenshots del proceso
8. ✅ (Opcional) Git commit y push completado

**Total aproximado:** 7,000-10,000 líneas nuevas de código

---

## ⚠️ ERRORES COMUNES A EVITAR

**❌ NO HACER:**

1. **Mezclar contextos:**
   - NO poner a Raúl en agentes de Amber
   - NO poner a Mihai/Tudor en agentes de Sparkplug
   - NO hacer que GM Co-Pilot colabore con COO Digital

2. **Archivos muy cortos:**
   - Si un agente tiene <500 líneas, probablemente falta detalle
   - Los ejemplos deben ser COMPLETOS, no sketches

3. **Falta de ejemplos:**
   - CADA agente necesita mínimo 2 examples completos
   - Examples deben mostrar colaboración, no solo output aislado

4. **Olvidar secciones:**
   - Notes es CRÍTICA (filosofía, criterios de éxito)
   - Collaboration partners debe listar con quién trabaja

5. **Copy-paste sin adaptar:**
   - Cada agente es único, no copies-pegues textos genéricos
   - Adapta al contexto específico del agente

---

## 💡 TIPS PARA ANTI-GRAVITY

**Si tienes múltiples agentes:**
1. Asigna un agente a crear cada archivo
2. Otro agente para validar consistencia
3. Otro para ejemplos y casos de uso
4. Trabajen en paralelo para velocidad

**Si usas browser control:**
1. Busca ejemplos de agentes similares en web
2. Research de best practices de cada expertise
3. Screenshots de referencias útiles

**Si generas Artifacts:**
1. Task list con progreso
2. Screenshots de archivos creados
3. Implementation notes

---

## 📞 SI TIENES DUDAS

**Recursos:**
1. Los 3 agentes ya creados son tu mejor referencia
2. `core/priorities.md` para reglas de separación
3. `agents/_COLLABORATION-PROTOCOL.md` para colaboración
4. `docs/phase-1-handoff.md` para lista completa

**Principio guía:**
> "Consistencia con lo que ya existe > Innovación"

Mejor seguir el formato exacto de los ejemplos que inventar estructura nueva.

---

## 🎉 CUANDO TERMINES

**Notifica a Jorge:**
- ¿Cuántos archivos creaste? (esperado: 11)
- ¿Cuántas líneas totales? (esperado: 7K-10K)
- ¿Hiciste git commit/push? (sí/no)
- ¿Generaste artifacts? (opcional)
- ¿Algún desafío o decisión importante?

**Jorge validará:**
- Estructura de archivos
- Separación de contextos
- Calidad de ejemplos
- Consistencia con Fase 0

**Luego:**
- Spark (próxima sesión) hará git commit/push si no lo hiciste
- Sistema estará completo (11 agentes + 5 automatizaciones)
- Ready para uso real

---

## 🚀 READY TO START

**Tiempo total estimado:** 2-3 horas

**Breakdown:**
- Leer contexto: 15-20 min
- Crear 8 agentes: 2-2.5 horas (15-20 min cada uno)
- Crear 3 automatizaciones: 30-45 min
- Validar: 15-20 min
- Git/Documentar: 10-15 min

**Orden sugerido:**
1. Research Analyst (Support)
2. Learning Facilitator (Support)
3. Life Coach (Personal) ← CRÍTICO
4. Content Strategist (Personal)
5. Creative Writer (Personal)
6. COO Digital (Sparkplug)
7. Sales Machine (Sparkplug)
8. PM Chatbots (Sparkplug)
9-11. Las 3 automatizaciones

**¡Buena suerte!** 🎯

---

_Instrucciones creadas: 2025-12-30_
_Por: Spark (Claude Code)_
_Para: Anti-Gravity (Google AI IDE)_
_Tarea: Completar Fase 1 de PapacitoOS v1.0_
