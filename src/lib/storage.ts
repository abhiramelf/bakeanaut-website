import { put, del, list } from '@vercel/blob'
import { readFile, writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const isVercel = process.env.VERCEL === '1'
const LOCAL_DATA_DIR = path.join(process.cwd(), '.data')

async function ensureLocalDir() {
  if (!existsSync(LOCAL_DATA_DIR)) {
    await mkdir(LOCAL_DATA_DIR, { recursive: true })
  }
}

export async function readJson<T>(key: string): Promise<T | null> {
  if (isVercel) {
    try {
      const blobs = await list({ prefix: key })
      const blob = blobs.blobs.find((b) => b.pathname === key)
      if (!blob) return null
      const res = await fetch(blob.url)
      if (!res.ok) return null
      return (await res.json()) as T
    } catch {
      return null
    }
  }

  // Local filesystem
  try {
    await ensureLocalDir()
    const filePath = path.join(LOCAL_DATA_DIR, key)
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data) as T
  } catch {
    return null
  }
}

export async function writeJson<T>(key: string, data: T): Promise<void> {
  const json = JSON.stringify(data, null, 2)

  if (isVercel) {
    await put(key, json, {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    return
  }

  // Local filesystem
  await ensureLocalDir()
  const filePath = path.join(LOCAL_DATA_DIR, key)
  const dir = path.dirname(filePath)
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
  await writeFile(filePath, json, 'utf-8')
}

export async function uploadImage(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  if (isVercel) {
    const blob = await put(`images/${filename}`, file, {
      access: 'private',
      contentType,
      addRandomSuffix: false,
    })
    return blob.url
  }

  // Local filesystem — save to public/uploads/
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }
  const filePath = path.join(uploadsDir, filename)
  await writeFile(filePath, file)
  return `/uploads/${filename}`
}

export async function deleteImage(url: string): Promise<void> {
  if (isVercel) {
    try {
      await del(url)
    } catch {
      // Ignore deletion errors
    }
    return
  }

  // Local filesystem
  if (url.startsWith('/uploads/')) {
    const filePath = path.join(process.cwd(), 'public', url)
    try {
      await unlink(filePath)
    } catch {
      // File may not exist
    }
  }
}
