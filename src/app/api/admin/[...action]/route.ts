import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { verifyPassword, createSession, setSessionCookie, clearSessionCookie } from '@/lib/auth'
import { readJson, writeJson, uploadImage, deleteImage, getImageDisplayUrl } from '@/lib/storage'
import type { SiteContent, MenuData } from '@/types/content'
import defaultContent from '@/data/default-content.json'
import defaultMenu from '@/data/menu.json'

function action(params: { action: string[] }): string {
  return params.action.join('/')
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ action: string[] }> }
) {
  const route = action(await params)

  if (route === 'content') {
    try {
      const content = await readJson<SiteContent>('content.json')
      const data = content ?? defaultContent
      if (data.gallery?.images) {
        data.gallery.images = data.gallery.images.map((img: { url: string; alt: string }) => ({
          ...img,
          url: getImageDisplayUrl(img.url),
        }))
      }
      return NextResponse.json(data)
    } catch {
      return NextResponse.json(defaultContent)
    }
  }

  if (route === 'menu') {
    try {
      const menu = await readJson<MenuData>('menu.json')
      return NextResponse.json(menu ?? defaultMenu)
    } catch {
      return NextResponse.json(defaultMenu)
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ action: string[] }> }
) {
  const route = action(await params)

  if (route === 'auth/login') {
    try {
      const body = await request.json()
      const { password } = body
      if (!password || typeof password !== 'string') {
        return NextResponse.json({ error: 'Password is required' }, { status: 400 })
      }
      if (!verifyPassword(password)) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
      }
      const token = await createSession()
      await setSessionCookie(token)
      return NextResponse.json({ success: true })
    } catch {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  if (route === 'auth/logout') {
    await clearSessionCookie()
    return NextResponse.json({ success: true })
  }

  if (route === 'upload') {
    try {
      const formData = await request.formData()
      const file = formData.get('file') as File | null
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, AVIF' },
          { status: 400 }
        )
      }
      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        return NextResponse.json({ error: 'File too large. Max 10MB' }, { status: 400 })
      }
      const buffer = Buffer.from(await file.arrayBuffer())
      const ext = file.name.split('.').pop() || 'webp'
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const storedPath = await uploadImage(buffer, filename, file.type)
      const url = getImageDisplayUrl(storedPath)
      return NextResponse.json({ url })
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Upload failed' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ action: string[] }> }
) {
  const route = action(await params)

  if (route === 'content') {
    try {
      const content = (await request.json()) as SiteContent
      // Strip proxy prefix so we store raw blob pathnames, not display URLs
      if (content.gallery?.images) {
        content.gallery.images = content.gallery.images.map((img: { url: string; alt: string }) => ({
          ...img,
          url: img.url.startsWith('/api/blob/') ? img.url.replace('/api/blob/', '') : img.url,
        }))
      }
      content._updatedAt = new Date().toISOString()
      content._version = (content._version || 0) + 1
      await writeJson('content.json', content)
      revalidatePath('/', 'layout')
      revalidatePath('/menu')
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('[api] PUT /content failed:', error)
      const message = error instanceof Error
        ? `${error.constructor.name}: ${error.message}`
        : 'Failed to save'
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (route === 'menu') {
    try {
      const menu = (await request.json()) as MenuData
      await writeJson('menu.json', menu)
      revalidatePath('/', 'layout')
      revalidatePath('/menu')
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('[api] PUT /menu failed:', error)
      const message = error instanceof Error
        ? `${error.constructor.name}: ${error.message}`
        : 'Failed to save'
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ action: string[] }> }
) {
  const route = action(await params)

  if (route === 'upload') {
    try {
      const { url } = await request.json()
      if (!url || typeof url !== 'string') {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
      }
      await deleteImage(url)
      return NextResponse.json({ success: true })
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Delete failed' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
