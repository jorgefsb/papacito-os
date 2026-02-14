# 🚀 Skill: NEON + IONOS Deploy Now

## Trigger
Cuando el usuario necesite:
- Conectar Next.js a base de datos PostgreSQL (NEON)
- Deployar app con API routes a IONOS
- Migrar de localStorage/SQLite a base de datos real

---

## Checklist Automático

### 1. Verificar/Instalar Dependencias
```bash
npm install @neondatabase/serverless
```

### 2. Crear Script de Inicialización
**Archivo:** `scripts/init-db.mjs`
```javascript
import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://...'
const sql = neon(DATABASE_URL)

async function init() {
  console.log('🧠 Inicializando base de datos...\n')
  
  // Crear tablas según necesidad del proyecto
  await sql`CREATE TABLE IF NOT EXISTS notes (...)`
  
  console.log('✅ Base de datos lista')
}

init()
```

### 3. Crear API Routes
**Archivo:** `app/api/[resource]/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET() { ... }
export async function POST(request: NextRequest) { ... }
```

### 4. Actualizar Frontend
- Reemplazar localStorage/SQLite por fetch a API routes
- Manejar loading states
- Manejar errores

### 5. Configurar Build
**next.config.ts:**
```typescript
// IMPORTANTE: NO usar output: 'export'
const nextConfig = {
  distDir: 'dist'
}
```

**package.json:**
```json
{
  "engines": { "node": ">=20.0.0" },
  "scripts": {
    "start": "next start -p ${PORT:-3000}"
  }
}
```

### 6. Configurar IONOS
Variables de entorno requeridas:
- `DATABASE_URL`
- `NODE_ENV=production`

---

## Templates Rápidos

### CRUD Completo
```typescript
// GET all
const data = await sql`SELECT * FROM table ORDER BY created_at DESC`

// GET by id
const data = await sql`SELECT * FROM table WHERE id = ${id}`

// CREATE
const result = await sql`
  INSERT INTO table (col1, col2) 
  VALUES (${val1}, ${val2}) 
  RETURNING *
`

// UPDATE
await sql`UPDATE table SET col = ${val} WHERE id = ${id}`

// DELETE
await sql`DELETE FROM table WHERE id = ${id}`
```

### Frontend Pattern
```typescript
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)

// Load
useEffect(() => {
  fetch('/api/resource')
    .then(r => r.json())
    .then(setData)
}, [])

// Create
const create = async (body) => {
  setLoading(true)
  const res = await fetch('/api/resource', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const newItem = await res.json()
  setData([newItem, ...data])
  setLoading(false)
}
```

---

## Errores Comunes

| Error | Solución |
|-------|----------|
| `Cannot find module` | `rm -rf .next dist && npm run build` |
| `output: 'export'` con API routes | Quitar `output: 'export'` de next.config |
| `sql(string)` no funciona | Usar `sql\`query\`` (template literal) |
| Build falla en IONOS | Verificar `engines.node >= 20` |

---

## Verificación Post-Deploy

```bash
# Test API
curl https://tu-dominio.com/api/notes

# Test crear
curl -X POST https://tu-dominio.com/api/notes \
  -H "Content-Type: application/json" \
  -d '{"content":"test"}'
```

---

## Ejemplos de Proyectos
- Papacito OS (Second Brain) - 2025-02-14
