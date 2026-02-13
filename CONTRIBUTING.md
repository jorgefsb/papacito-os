# Contributing to Papacito OS

¡Gracias por querer contribuir! 🦖

## Cómo Contribuir

### 1. Reportar Bugs
- Usa [GitHub Issues](https://github.com/jorgefsb/papacito-os/issues)
- Describe el problema paso a paso
- Incluye tu sistema operativo y versión
- Agrega screenshots si aplica

### 2. Sugerir Features
- Abre un Issue con el label `enhancement`
- Explica el problema que resuelve
- Describe cómo funcionaría

### 3. Pull Requests
1. Fork el repo
2. Crea una rama: `git checkout -b feature/tu-feature`
3. Haz tus cambios
4. Testea localmente: `npm run build`
5. Commit: `git commit -m 'Add: descripción'`
6. Push: `git push origin feature/tu-feature`
7. Abre un PR

## Guías de Código

### Estilo
- TypeScript con tipos estrictos
- Componentes funcionales con hooks
- Tailwind para styling
- Nombres descriptivos en inglés

### Commits
```
Add: nueva funcionalidad
Fix: corrección de bug
Update: cambio a funcionalidad existente
Docs: documentación
Refactor: cambio de código sin cambiar funcionalidad
```

### Estructura de Carpetas
```
my-app/
├── app/              # Rutas de Next.js
├── components/       # Componentes React
│   ├── ui/          # Componentes base (shadcn)
│   └── features/    # Componentes de features
├── lib/             # Utilidades
│   ├── ai/          # Procesamiento multimedia
│   ├── db/          # Base de datos
│   └── utils.ts     # Helpers
└── public/          # Assets estáticos
```

## Áreas donde Necesitamos Ayuda

### 🎯 Prioridad Alta
- [ ] **Visual Graph**: Grafo visual de conexiones entre notas
- [ ] **Export**: Exportar a Markdown/PDF
- [ ] **Mobile App**: App nativa (React Native?)

### 🚀 Features Interesantes
- [ ] **Plugins**: Sistema de plugins
- [ ] **Themes**: Más temas visuales
- [ ] **Shortcuts**: Atajos de teclado
- [ ] **i18n**: Soporte multi-idioma
- [ ] **Backup**: Sistema de backups automáticos

### 🐛 Bugs Conocidos
- Ver [GitHub Issues](https://github.com/jorgefsb/papacito-os/issues)

## Setup de Desarrollo

```bash
# 1. Clonar
git clone https://github.com/jorgefsb/papacito-os.git
cd papacito-os/my-app

# 2. Instalar dependencias
npm install

# 3. Setup local
./setup-local.sh

# 4. Modo desarrollo
npm run dev

# 5. Build de producción
npm run build
```

## Código de Conducta

- Sé respetuoso
- Acepta feedback constructivo
- Enfócate en lo que es mejor para la comunidad
- Muestra empatía hacia otros

## Preguntas?

- Abre un Issue
- O pregunta en Discussions

¡Gracias por contribuir! 🦖🔥