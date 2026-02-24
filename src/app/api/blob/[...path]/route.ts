import { get } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathname = path.join('/')

  try {
    const result = await get(pathname, { access: 'private' })
    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return new Response(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType ?? 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error(`[blob-proxy] Failed to fetch "${pathname}":`, error)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
