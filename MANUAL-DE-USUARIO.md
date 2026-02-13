# 📘 MANUAL DE USUARIO - Papacito OS Second Brain

**Para: Jorge Suárez**  
**Creado por: YOSHI 🦖**

---

## 🚀 ¿CÓMO EMPEZAR? (3 pasos)

### Paso 1: Iniciar el sistema
```bash
# Abrir Terminal
# Ir al proyecto
cd ~/papacito-second-brain/my-app

# Iniciar
./start.sh
```

### Paso 2: Abrir en navegador
```
http://localhost:3000
```

### Paso 3: ¡Empezar a usar!

---

## 🎯 CASOS DE USO REALES

---

## 📝 TEXTO (El clásico que nunca falla)

### CASO 1: Idea rápida mientras trabajas
**Escenario:** Se te ocurre una idea para Sparkplug mientras estás en otra cosa

**Flujo:**
1. Abres http://localhost:3000
2. Click en "+ New Note"
3. **Escribes:** "Nuevo servicio de video para clientes de Sparkplug - hacer reels automáticos"
4. Guardas
5. **Automáticamente se taggea:** `sparkplug`, `idea`

**Resultado:** La idea queda guardada, taggeada, y conectada con otras notas de Sparkplug

---

### CASO 2: Notas de reunión con Amber
**Escenario:** Reunión con Tudor o el equipo de Amber

**Flujo:**
1. Creas nota con título: "Sync con Tudor - Feb 13"
2. **Escribes** los puntos importantes
3. Guardas
4. **Automáticamente se taggea:** `amber`, `strategy`, `meeting`

**Resultado:** Todas tus notas de Amber quedan agrupadas y buscables

---

### CASO 3: Recordatorio familiar
**Escenario:** Elena te pide algo o idea para hacer en familia

**Flujo:**
1. Nueva nota: "Cena con Elena viernes - reservar en XXXX"
2. **Escribes** los detalles
3. Guardas
4. **Automáticamente se taggea:** `family`, `urgent`

**Resultado:** No se te olvida porque está taggeado como `urgent`

---

## 🎙️ AUDIO (Brain dump hablando)

### CASO 4: Idea en el coche
**Escenario:** Manejando se te ocurre algo brillante

**Flujo:**
1. Grabas nota de voz en tu celular
2. Llegas a casa, abres http://localhost:3000
3. **Subes el audio** (drag & drop o click)
4. **whisper.cpp transcribe automáticamente:**
   > "Oye se me ocurrió que podemos hacer un servicio de thumbnails para YouTubers..."
5. Guardas
6. **Automáticamente se taggea:** `sparkplug`, `idea`

**Resultado:** Tu idea hablada se convierte en nota de texto buscable

---

### CASO 5: Nota de voz rápida
**Escenario:** Estás ocupado, no puedes escribir

**Flujo:**
1. Grabas 20 segundos de audio
2. **Subes el audio** a Papacito OS
3. **Transcripción automática:**
   > "Recordar llamar a Andrés mañana sobre el tema del servidor"
4. Guardas
5. **Automáticamente se taggea:** `urgent`, `meeting`

**Resultado:** Sin escribir ni una letra, tienes tu recordatorio guardado

---

### CASO 6: Reunión larga
**Escenario:** Reunión de 30 minutos, muchos puntos

**Flujo:**
1. Grabas toda la reunión en audio
2. **Subes el archivo** (puede ser grande)
3. **whisper.cpp transcribe todo** (toma unos segundos)
4. Revisas el texto, editas si necesario
5. Guardas
6. **Tags automáticos** según el contenido

**Resultado:** Minuta completa sin escribir durante la reunión

---

## 📸 IMÁGENES (Fotos a texto)

### CASO 7: Foto de pizarra
**Escenario:** Reunión en sala de juntas, pizarra llena de notas

**Flujo:**
1. Tomas **foto** con tu celular
2. **Subes la imagen** a Papacito OS
3. **Tesseract OCR extrae el texto:**
   > "Q1 Goals: Launch VR game, Hire 2 devs, Marketing campaign..."
4. Guardas
5. **Automáticamente se taggea** según el texto detectado

**Resultado:** El contenido de la pizarra ahora es una nota buscable

---

### CASO 8: Screenshot de documento importante
**Escenario:** Email importante, contrato, factura

**Flujo:**
1. Tomas **screenshot** o foto del documento
2. **Subes la imagen**
3. **OCR extrae todo el texto**
4. Guardas
5. **Buscable después** por cualquier palabra del documento

**Resultado:** Documentos físicos/digitalizados convertidos a texto editable

---

### CASO 9: Foto de nota escrita a mano
**Escenario:** Escribiste algo en papel, quieres digitalizarlo

**Flujo:**
1. **Foto** de tu nota manuscrita
2. **Subes la imagen**
3. **OCR intenta leer la escritura** (funciona mejor con letra clara)
4. Revisas y editas si el OCR no fue perfecto
5. Guardas

**Resultado:** Tus notas manuscritas ahora son digitales y buscables

---

## 🔍 BÚSQUEDA Y CONEXIONES

### CASO 10: Buscar en TODO (texto + audio + imágenes)
**Escenario:** "¿Dónde dejé lo de Tudor?"

**Flujo:**
1. En la barra de búsqueda escribes: "tudor"
2. **Aparecen TODAS las notas que mencionan "tudor":**
   - Notas de texto que escribiste
   - Audios que mencionan "Tudor" (transcritos)
   - Imágenes donde aparece "Tudor" (OCR)
3. Ordenadas por relevancia

**Resultado:** Encuentras todo en segundos, sin importar cómo lo capturaste

---

### CASO 11: Conexiones entre ideas de diferentes fuentes
**Escenario:** Dos notas separadas que están relacionadas

**Ejemplo:**
- **Nota 1 (texto):** "Idea para Sparkplug - hacer reels"
- **Nota 2 (audio transcrito):** "Curso de video editing que estoy tomando..."

**Automáticamente:** El sistema detecta que ambas mencionan "video" y las conecta

**Resultado:** Ves que tu curso de video puede servir para tu idea de Sparkplug

---

## 📱 INTEGRACIÓN CON TELEGRAM (Opcional)

### CASO 12: Brain dump desde el celular
**Escenario:** Estás fuera de casa, se te ocurre algo

**Flujo:**
1. Abres Telegram en tu celular
2. **Mandas audio** al bot de Papacito OS
3. **whisper.cpp transcribe** automáticamente
4. Nota creada con tags automáticos
5. Llegas a casa y ya está en tu sistema

**Resultado:** Capturas ideas en cualquier lado, sin abrir la laptop

---

## 📱 INTEGRACIÓN CON TELEGRAM (Opcional)

### Setup:
1. Crear bot con @BotFather en Telegram
2. Copiar el token
3. Agregar a `.env.local`:
```
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id
```

### Uso (tres tipos de entrada):

| Tipo | Qué pasa |
|------|----------|
| **Texto** | Se convierte en nota con tags automáticos |
| **Foto** | OCR automático → Texto → Nota con tags |
| **Audio/Voz** | whisper.cpp transcribe → Nota con tags |

**Ejemplo:**
- Mandas foto de un documento desde el celular
- Llega a casa y ya está transcrito y taggeado en tu sistema

---

## 🏷️ TAGS AUTOMÁTICOS

El sistema detecta estas palabras y taggea automáticamente:

| Tag | Palabras que lo activan |
|-----|------------------------|
| `sparkplug` | sparkplug, creative, subscription, cliente, marketing, getsparkplug |
| `amber` | amber, studio, game, juego, vr, unity, tudor |
| `strategy` | strategy, estrategia, plan, objetivo, meta, 2025, 2026 |
| `finance` | finance, finanzas, money, dinero, mercury, ingresos, gastos |
| `family` | family, familia, elena, hija, casa, dragón, meme, ana |
| `ai` | ai, ia, inteligencia artificial, gpt, modelo, embedding, yoshi, luna |
| `urgent` | urgent, urgente, ahora, inmediato, hoy, asap |
| `meeting` | meeting, reunión, llamada, zoom, teams, sync |
| `idea` | idea, concepto, brainstorm, creativo |
| `learning` | learning, aprendiendo, curso, libro, leer, estudiar |

---

## 🎨 DASHBOARD

### Stats que ves:
- **Total Notes:** Cuántas notas tienes
- **Total Tags:** Cuántos tags diferentes
- **Total Connections:** Cuántas conexiones entre notas

### Acciones rápidas:
- **+ New Note:** Crear nota nueva
- **Search:** Buscar en todas las notas
- **Tags:** Ver notas por tag

---

## 🔍 BÚSQUEDA

### Tipos de búsqueda:
1. **Por palabra:** Escribe cualquier palabra en la barra de búsqueda
2. **Por tag:** Click en cualquier tag para ver todas las notas con ese tag
3. **Por conexión:** En cada nota ves "Connected Notes" con notas relacionadas

---

## 💡 TIPS DE USO

### Tip 1: Escribe natural
No necesitas formato especial. El sistema detecta keywords automáticamente.

### Tip 2: Sé específico en el título
- ❌ "Reunión"
- ✅ "Sync con Tudor sobre roadmap Q1"

### Tip 3: Usa las palabras clave
Si quieres que se taggee automáticamente, usa las palabras del sistema:
- "sparkplug" → tag `sparkplug`
- "urgente" → tag `urgent`
- "familia" → tag `family`

### Tip 4: Revisa las conexiones
El sistema conecta notas automáticamente. Revisa "Connected Notes" para ver relaciones que no habías notado.

### Tip 5: Busca antes de crear
Antes de crear una nota nueva, busca si ya existe algo similar.

---

## 🛠️ MANTENIMIENTO

### Backup automático:
La base de datos está en:
```
~/papacito-second-brain/my-app/data/brain.db
```

Copiar este archivo = backup completo

### Si algo falla:
```bash
# Reiniciar
cd ~/papacito-second-brain/my-app
./start.sh
```

### Si no funciona:
```bash
# Reinstalar dependencias
cd ~/papacito-second-brain/my-app
rm -rf node_modules
npm install
npm run build
./start.sh
```

---

## 📊 EJEMPLOS DE NOTAS

### Ejemplo 1: Nota de estrategia
```
Título: Estrategia Sparkplug 2025

Queremos crecer 3x este año. Ideas:
- Nuevo tier de suscripción
- Partnerships con agencias
- Contenido en LinkedIn

Próximo paso: Hablar con Raúl sobre partnerships.
```
**Tags automáticos:** `sparkplug`, `strategy`

---

### Ejemplo 2: Nota personal
```
Título: Cumpleaños Elena

Ideas de regalo:
- Spa day
- Cena romántica
- Viaje sorpresa (averiguar fechas)

Fecha: Marzo 15
```
**Tags automáticos:** `family`, `idea`

---

### Ejemplo 3: Nota de aprendizaje
```
Título: Curso de embeddings

Aprendí que los embeddings son vectores que representan significado.
Utiles para:
- Búsqueda semántica
- Clustering de documentos
- Recomendaciones

Próximo: Implementar en proyecto personal.
```
**Tags automáticos:** `learning`, `ai`

---

## 🎯 RUTINA DIARIA SUGERIDA

### Mañana (5 min):
1. Abrir Papacito OS
2. Revisar notas taggeadas `urgent`
3. Ver si hay conexiones nuevas entre notas

### Durante el día:
- **Texto:** Ideas rápidas mientras trabajas
- **Audio:** Brain dump hablando (en el coche, caminando)
- **Imágenes:** Fotos de pizarras, documentos, notas manuscritas

### Noche (5 min):
1. Revisar notas del día (todas las fuentes)
2. Buscar conexiones que no habías notado
3. Planificar mañana

---

## 🦖 PALABRAS DE YOSHI

> "Este sistema es tuyo. No paga APIs, no depende de nadie, no te espía."
> 
> "Es simple pero poderoso. No tiene IA fancy, pero tiene TODO lo que necesitas."
>
> "La magia está en usarlo consistentemente. Una nota al día = 365 insights al año."

---

## ❓ FAQ

**¿Puedo usarlo desde el celular?**
Sí, si configuras Telegram. O abres el navegador en tu red local.

**¿Se puede compartir con Elena?**
Sí, puedes exportar notas o darle acceso al Mac Mini.

**¿Qué pasa si se rompe?**
La base de datos es un archivo SQLite. Es imposible de corromper y fácil de respaldar.

**¿Puedo migrar a Notion/Obsidian después?**
Sí, se puede exportar todo a Markdown.

**¿Necesito internet?**
NO. Todo funciona 100% offline.

---

**¿Listo para empezar, compa?** 🦖🔥

*"Tu segundo cerebro, hecho a tu medida, sin pagar un peso"* 💪