import { put, del, get } from '@vercel/blob'
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
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.error('[storage] readJson: BLOB_READ_WRITE_TOKEN is not set')
        return null
      }
      const result = await get(key, { access: 'private' })
      if (!result) return null
      const text = await new Response(result.stream).text()
      return JSON.parse(text) as T
    } catch (error) {
      console.error(`[storage] readJson("${key}") failed:`, error)
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
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN is not set in environment variables')
    }
    try {
      await put(key, json, {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      })
    } catch (error) {
      console.error(`[storage] writeJson("${key}") failed:`, error)
      throw error
    }
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
      allowOverwrite: true,
    })
    return blob.pathname
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
      // URLs stored as blob pathnames (e.g. "images/abc.webp")
      // or proxy URLs (e.g. "/api/blob/images/abc.webp")
      const pathname = url.startsWith('/api/blob/')
        ? url.replace('/api/blob/', '')
        : url
      await del(pathname)
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

/**
 * Convert a stored image path to a displayable URL.
 * - Local uploads ("/uploads/...") are served directly from public/
 * - Static images ("/images/...") are served directly from public/
 * - Blob pathnames ("images/...") are proxied via /api/blob/
 */
export function getImageDisplayUrl(storedUrl: string): string {
  if (storedUrl.startsWith('/')) {
    // Already a local path (e.g. /uploads/xxx or /images/gallery/xxx)
    return storedUrl
  }
  // Blob pathname — proxy through our API
  return `/api/blob/${storedUrl}`
}
