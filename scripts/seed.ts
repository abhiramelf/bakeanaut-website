import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

// Load .env.local so BLOB_READ_WRITE_TOKEN is available outside of Next.js
const envPath = join(process.cwd(), '.env.local')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue
    const key = trimmed.slice(0, eqIndex).trim()
    const value = trimmed.slice(eqIndex + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}

const DATA_DIR = join(process.cwd(), '.data')
const DEFAULT_CONTENT_PATH = join(process.cwd(), 'src', 'data', 'default-content.json')
const MENU_JSON_PATH = join(process.cwd(), 'src', 'data', 'menu.json')

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

async function seed() {
  console.log('Seeding Bakeanaut data...\n')

  const content = JSON.parse(readFileSync(DEFAULT_CONTENT_PATH, 'utf-8'))
  const menu = JSON.parse(readFileSync(MENU_JSON_PATH, 'utf-8'))

  if (process.env.SEED_TARGET === 'blob') {
    // Production: write to Vercel Blob
    console.log('Writing to Vercel Blob (production)...')
    const { put } = await import('@vercel/blob')

    await put('content.json', JSON.stringify(content, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    console.log('  ✓ content.json')

    await put('menu.json', JSON.stringify(menu, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    console.log('  ✓ menu.json')
  } else {
    // Local: write to .data/
    console.log(`Writing to ${DATA_DIR} (local dev)...`)
    ensureDir(DATA_DIR)

    writeFileSync(join(DATA_DIR, 'content.json'), JSON.stringify(content, null, 2))
    console.log('  ✓ content.json')

    writeFileSync(join(DATA_DIR, 'menu.json'), JSON.stringify(menu, null, 2))
    console.log('  ✓ menu.json')
  }

  console.log('\nSeed complete!')
}

seed().catch(console.error)
