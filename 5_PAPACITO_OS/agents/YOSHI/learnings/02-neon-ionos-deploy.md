# 🧠 LEARNING: NEON + IONOS Deploy Now

## Fecha: 2025-02-14
## Contexto: Papacito OS - Second Brain

---

## 📋 PATRÓN REUTILIZABLE

### 1. Inicializar NEON Database

```bash
# Crear script de inicialización
node scripts/init-db.mjs
```

**Template init-db.mjs:**
```javascript
import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://...'
const sql = neon(DATABASE_URL)

async function init() {
  // Crear tablas
  await sql`CREATE TABLE IF NOT EXISTS notes (...)`
  
  // Insertar datos de ejemplo
  await sql`INSERT INTO ...`
  
  console.log('✅ DB lista')
}

init()
```

### 2. Crear API Routes

**app/api/[resource]/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  const data = await sql`SELECT * FROM table`
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = await sql`
    INSERT INTO table (col) VALUES (${body.value})
    RETURNING *
  `
  return NextResponse.json(result[0])
}
```

### 3. Cliente Frontend

```typescript
// GET
const response = await fetch('/api/notes')
const { notes, stats } = await response.json()

// POST
await fetch('/api/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ content, tags })
})
```

### 4. Configurar IONOS Deploy Now

**package.json:**
```json
{
  "engines": { "node": ">=20.0.0" },
  "scripts": {
    "start": "next start -p ${PORT:-3000}"
  }
}
```

**next.config.ts:**
```typescript
// NO usar output: 'export' - necesitamos API routes
const nextConfig = {
  distDir: 'dist'
}
```

**Variables de entorno en IONOS:**
- `DATABASE_URL`
- `NODE_ENV=production`

---

## ⚠️ PITFALLS & SOLUCIONES

| Problema | Causa | Solución |
|----------|-------|----------|
| `Cannot find module` | Cache de .next | `rm -rf .next dist` |
| `output: 'export'` con API routes | Conflicto de modos | Quitar `output: 'export'` |
| `dotenv` injection logs | dotenv@17+ | Usar string directo o ignorar logs |
| Type error en sql(schema) | NEON espera template literal | No pasar string, usar tagged template |

---

## 🔄 FLUJO RÁPIDO (COPY-PASTE)

```bash
# 1. Instalar dependencia
npm install @neondatabase/serverless

# 2. Crear script de init
# (usar template de arriba)

# 3. Crear API route
# (usar template de arriba)

# 4. Actualizar frontend
# (usar fetch pattern de arriba)

# 5. Configurar para IONOS
# (usar configs de arriba)

# 6. Deploy
rm -rf .next dist && npm run build
```

---

## 📚 RECURSOS

- **NEON Docs:** https://neon.tech/docs
- **IONOS Deploy Now:** https://www.ionos.com/hosting/deploy-now
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## 🏷️ TAGS
`#neon` `#postgresql` `#ionos` `#deploy-now` `#nextjs` `#api-routes` `#serverless`
