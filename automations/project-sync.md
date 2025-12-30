# PROJECT SYNC - Sincronización Bidireccional

> **Trigger:** Automático después de trabajo significativo de agentes
> **Propósito:** Mantener PapacitoOS y sistema de logs sincronizados
> **Valor:** Contexto nunca se pierde, ambos sistemas siempre actualizados
> **Frecuencia:** Automática (después de outputs) + Manual (bajo demanda)

---

## 🎯 Qué Hace Project Sync

Project Sync mantiene **sincronización bidireccional** entre:

**Sistema A: PapacitoOS** (~/Desktop/PapacitoOS/)
- `/projects/` - Archivos de proyectos estratégicos
- Estado, progreso, decisiones

**Sistema B: Logs** (~/.claude/)
- `/spark-dashboard.md` - Vista general
- `/projects/*.md` - Detalles por proyecto

**Resultado:** Un solo sistema, dos ubicaciones siempre sincronizadas.

---

## 🔄 Flujo de Sincronización

### Dirección 1: PapacitoOS → Logs

**Cuándo:**
- Agente completa trabajo significativo
- Jorge actualiza proyecto en PapacitoOS
- Decisión importante tomada

**Qué se sincroniza:**
```
~/Desktop/PapacitoOS/projects/amber/01-gm-strategy.md
→ SYNC →
~/.claude/projects/01-amber-gm.md

Contenido sincronizado:
- Estado actual del proyecto
- Últimas decisiones
- Bloqueadores identificados
- Next steps
```

### Dirección 2: Logs → PapacitoOS

**Cuándo:**
- Jorge trabajó en sesión anterior sin PapacitoOS
- Actualización manual en dashboard
- Nueva sesión empieza (pull latest state)

**Qué se sincroniza:**
```
~/.claude/projects/01-amber-gm.md
→ SYNC →
~/Desktop/PapacitoOS/projects/amber/01-gm-strategy.md

Contenido sincronizado:
- Estado actualizado de sesión anterior
- Progress desde última sync
```

---

## 📊 Mapeo de Archivos

### Proyectos Amber (80%)

| PapacitoOS | Logs | Proyecto |
|------------|------|----------|
| `projects/amber/01-gm-strategy.md` | `projects/01-amber-gm.md` | #1 GM Amber - Estrategia |
| `projects/amber/02-business-development.md` | `projects/02-business-development.md` | #2 BD Amber |
| `projects/amber/03-brandcade.md` | `projects/03-brandcade.md` | #3 Brandcade |

### Proyectos Sparkplug (20%)

| PapacitoOS | Logs | Proyecto |
|------------|------|----------|
| `projects/sparkplug/04-operations.md` | `projects/04-sparkplug-ops.md` | #4 Sparkplug Ops |
| `projects/sparkplug/05-sales-outreach.md` | `projects/05-sparkplug-sales.md` | #5 Sparkplug Sales |
| `projects/sparkplug/06-sparkchatbots.md` | `projects/06-sparkchatbots.md` | #6 SparkChatbots |

### Proyectos Personal

| PapacitoOS | Logs | Proyecto |
|------------|------|----------|
| `projects/personal-brand/07-jorgesuarez-com.md` | `projects/07-marca-personal.md` | #7 JorgeSuarez.com.mx |
| `projects/personal-brand/08-content-creation.md` | `projects/08-contenido.md` | #8 Contenido |
| `projects/personal-life/09-clarity-mental.md` | `projects/09-vida-personal.md` | #9 Claridad Mental |
| `projects/personal-life/10-dragon-relationship.md` | `projects/10-dragon.md` | #10 Relación Dragón |

### Proyectos Learning/Creative

| PapacitoOS | Logs | Proyecto |
|------------|------|----------|
| `projects/learning-creative/11-continuous-learning.md` | `projects/11-aprendizaje.md` | #11 Aprendizaje |
| `projects/learning-creative/12-creative.md` | `projects/12-creativo.md` | #12 Creativo |

### Dashboard

| PapacitoOS | Logs | Propósito |
|------------|------|-----------|
| N/A (distribuido en projects/) | `spark-dashboard.md` | Vista general de todos los proyectos |

---

## 🤖 Automatización

### Trigger Automático

**Después de output significativo de agente:**

```markdown
[AGENTE X] completa trabajo en Proyecto #Y

→ Automático:

1. Detectar qué proyecto fue afectado
2. Identificar archivos a sincronizar (mapeo arriba)
3. Actualizar ambos archivos con:
   - Timestamp de última actualización
   - Resumen de cambios
   - Estado nuevo del proyecto
4. Confirmar sync completada

Mensaje al usuario:
"✅ Proyecto #Y sincronizado: PapacitoOS ↔ Logs"
```

### Trigger Manual

**Jorge puede forzar sync:**

```
Input: "Sync projects" o "Sincronizar"

→ Manual:

1. Comparar timestamps de todos los proyectos
2. Identificar cuál versión es más reciente (PapacitoOS vs Logs)
3. Sincronizar desde la más reciente
4. Reportar qué se sincronizó

Output:
"✅ Sincronización completa:
- Proyecto #1: Logs → PapacitoOS (más reciente)
- Proyecto #3: PapacitoOS → Logs (más reciente)
- Proyecto #7: No changes
Total: 2 proyectos sincronizados"
```

---

## 📋 Formato de Sincronización

### Sección de Metadata (En ambos archivos)

```markdown
---
**Sync Metadata:**
- Last Updated: [Timestamp]
- Last Sync: [Timestamp]
- Source of Truth: [PapacitoOS/Logs - cuál se actualizó último]
- Version: [Número incremental]
---
```

### Contenido Sincronizado

**Campos que SIEMPRE se sincronizan:**

1. **Estado** (🔴/🟡/🟢/⚪)
2. **Últimas decisiones**
3. **Bloqueadores actuales**
4. **Next steps**
5. **Progreso reciente**

**Campos que NO se sincronizan:**

1. Formato específico de cada sistema (headers, templates)
2. Notas internas de agentes (se quedan en PapacitoOS)
3. Contexto histórico completo (solo lo relevante)

---

## 🔧 Resolución de Conflictos

### Conflicto: Ambos archivos actualizados desde última sync

**Estrategia:**

```
Detectar conflicto:
- PapacitoOS timestamp: 2025-12-30 10:00
- Logs timestamp: 2025-12-30 10:30
- Last sync: 2025-12-30 09:00

→ Ambos fueron actualizados después de última sync

Resolución:
1. Usar versión MÁS RECIENTE (Logs en este caso: 10:30)
2. BACKUP versión más antigua antes de overwrite
3. Notificar a Jorge:

"⚠️ Conflicto detectado en Proyecto #X
Versión de Logs (10:30) es más reciente que PapacitoOS (10:00)
Acción: Logs → PapacitoOS
Backup de versión anterior: [ubicación]
¿Proceder? [Sí/No]"
```

### Conflicto: Archivos muy diferentes (>50% diferencia)

**Estrategia:**

```
Detectar diferencia mayor:
- Content diff: 60% diferente

Resolución:
1. NO sincronizar automáticamente
2. Preguntar a Jorge:

"⚠️ Proyecto #X tiene cambios mayores en ambos lados
¿Cuál versión es correcta?
A) PapacitoOS (actualizado [timestamp])
B) Logs (actualizado [timestamp])
C) Merge manual (mostrar diff)"

Esperar decisión de Jorge antes de proceder
```

---

## 📊 Dashboard Sync Especial

### Dashboard es Agregado, No Individual

**El dashboard NO tiene equivalente 1:1 en PapacitoOS.**

**Cómo funciona:**

```
spark-dashboard.md = Vista general de TODOS los proyectos

Sync:
1. Leer todos los archivos en PapacitoOS/projects/
2. Extraer estado de cada uno
3. Actualizar sección correspondiente en spark-dashboard.md
4. Mantener resto del dashboard intacto

Ejemplo:
PapacitoOS/projects/amber/03-brandcade.md tiene:
- Estado: 🟡 Bloqueado
- Blocker: Esperando data de Onix

→ Actualiza en spark-dashboard.md:
"3. Brandcade | 🟡 Bloqueado | Waiting: Onix data"
```

---

## 🧪 Casos de Prueba

### Test 1: Sync Simple (Un proyecto actualizado)

**Setup:**
- Proyecto #3 (Brandcade) actualizado en PapacitoOS
- Logs no actualizado

**Input:** Automático después de que PM Brandcade completa work

**Expected:**
```
1. Detectar: projects/amber/03-brandcade.md cambió
2. Identificar archivo sync: projects/03-brandcade.md
3. Copiar contenido actualizado: PapacitoOS → Logs
4. Actualizar metadata de sync
5. Actualizar dashboard con nuevo estado
6. Confirmar: "✅ Proyecto #3 (Brandcade) sincronizado"
```

### Test 2: Sync Múltiple (Varios proyectos)

**Setup:**
- Proyecto #1, #2, #3 actualizados (sesión de trabajo en Amber)

**Input:** "Sync projects"

**Expected:**
```
Sincronización de 3 proyectos:
- #1 (GM Amber): PapacitoOS → Logs ✅
- #2 (BD Amber): PapacitoOS → Logs ✅
- #3 (Brandcade): PapacitoOS → Logs ✅

Dashboard actualizado con 3 proyectos ✅
Sync completa en [X] segundos
```

### Test 3: Conflict Resolution

**Setup:**
- Proyecto #3 actualizado en ambos lados
- PapacitoOS: 10:00am
- Logs: 10:30am

**Input:** Automático al detectar conflicto

**Expected:**
```
⚠️ Conflicto detectado: Proyecto #3
Logs más reciente (10:30) > PapacitoOS (10:00)

Acción: Usar versión de Logs
Backup: PapacitoOS versión guardada en [ubicación]

¿Proceder? [Default: Sí en 5 segundos]

→ Jorge dice "Sí" o timeout
→ Logs → PapacitoOS
→ "✅ Conflicto resuelto: Logs → PapacitoOS"
```

### Test 4: Primera Sincronización (New System)

**Setup:**
- PapacitoOS creado nuevo
- Logs ya existe con proyectos
- Need: Popular PapacitoOS desde Logs

**Input:** "Initial sync" o primera vez que se ejecuta

**Expected:**
```
Primera sincronización detectada

Origen: ~/.claude/ (sistema existente)
Destino: ~/Desktop/PapacitoOS/ (nuevo)

Sincronizando 12 proyectos:
[Progress bar]
1/12 ✅ GM Amber
2/12 ✅ BD Amber
...
12/12 ✅ Creativo

Sync inicial completa ✅
PapacitoOS poblado con estado actual de todos los proyectos
```

---

## 🔒 Seguridad y Backups

### Backup Antes de Sync

**Siempre backup antes de overwrite:**

```
Antes de sincronizar Proyecto #X:

1. Crear backup en:
   ~/Desktop/PapacitoOS/system/backups/[fecha]/[proyecto].md

2. Proceder con sync

3. Si algo falla:
   "❌ Sync falló para Proyecto #X
   Backup disponible en: [ubicación]
   ¿Restaurar backup? [Sí/No]"
```

### Frequency de Cleanup

**Backups se limpian:**
- Después de 30 días (auto-delete)
- O cuando Jorge ejecuta "Clean backups"

---

## 📝 Notas de Implementación

**Para que Project Sync funcione:**

1. ✅ **Ambos sistemas deben existir**
   - PapacitoOS: ~/Desktop/PapacitoOS/
   - Logs: ~/.claude/

2. ✅ **Mapeo 1:1 definido**
   - Cada proyecto PapacitoOS tiene equivalente en Logs
   - Tabla de mapeo arriba es source of truth

3. ✅ **Metadata en archivos**
   - Timestamp de última actualización
   - Timestamp de última sync
   - Version number

4. ✅ **Conflict resolution automática**
   - Usar timestamp para decidir cuál es más reciente
   - Backup antes de overwrite
   - Manual solo si diff >50%

5. ✅ **Dashboard update automático**
   - Después de cada sync, dashboard se actualiza
   - Dashboard refleja estado agregado de todos los proyectos

---

## 🎯 Valor de Project Sync

**Antes de Project Sync:**
- ❌ Dos sistemas separados
- ❌ Estado duplicado manualmente
- ❌ Contexto se pierde entre sesiones
- ❌ Confusión: ¿Cuál está actualizado?

**Después de Project Sync:**
- ✅ Un solo sistema, dos ubicaciones
- ✅ Sincronización automática
- ✅ Contexto siempre disponible
- ✅ Claridad: Ambos siempre sincronizados

**ROI:**
- **Tiempo ahorrado:** 5-10 min/día de actualización manual
- **Menos errores:** No hay desincronización
- **Mejor contexto:** Estado siempre current
- **Portabilidad:** PapacitoOS portable, Logs permanente

---

## 🔄 Comandos Manuales

**Jorge puede usar:**

```
"Sync projects" → Sincroniza todos los proyectos
"Sync project #3" → Sincroniza solo Brandcade
"Sync status" → Muestra qué está out of sync
"Force sync from PapacitoOS" → Overwrite Logs con PapacitoOS (todos)
"Force sync from Logs" → Overwrite PapacitoOS con Logs (todos)
"Show sync history" → Ver últimas 10 sincronizaciones
"Clean backups" → Elimina backups >30 días
```

---

## 🚀 Roadmap Futuro

**Fase 0 (Ahora):**
- ✅ Sync manual bajo demanda
- ✅ Sync automática después de agent work
- ✅ Conflict resolution básica

**Fase 1 (Mes 1):**
- [ ] Sync selectiva (solo campos específicos)
- [ ] Merge inteligente (no solo overwrite)
- [ ] Historial de cambios (git-like)

**Fase 2 (Mes 2-3):**
- [ ] Sync en tiempo real (inotify/fswatch)
- [ ] Sync remota (cloud backup)
- [ ] Sync colaborativa (si múltiples agentes trabajan simultáneamente)

---

**NOTA FINAL:**

Project Sync es el pegamento que mantiene PapacitoOS y el sistema de logs como un solo sistema coherente. Sin sync, tendrías dos versiones de la verdad. Con sync, tienes la mejor de ambas: portabilidad de PapacitoOS + permanencia de Logs.

---

**Last Updated:** 2025-12-30
**Version:** 1.0 (Fase 0)
**Trigger:** Automático (después de agent work) + Manual ("Sync projects")
**Dependencies:** Ambos sistemas (PapacitoOS + Logs) deben existir
