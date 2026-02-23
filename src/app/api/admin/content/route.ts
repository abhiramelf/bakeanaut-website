import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readJson, writeJson } from '@/lib/storage'
import type { SiteContent } from '@/types/content'
import defaultContent from '@/data/default-content.json'

export async function GET() {
  try {
    const content = await readJson<SiteContent>('content.json')
    return NextResponse.json(content ?? defaultContent)
  } catch {
    return NextResponse.json(defaultContent)
  }
}

export async function PUT(request: Request) {
  try {
    const content = (await request.json()) as SiteContent
    content._updatedAt = new Date().toISOString()
    content._version = (content._version || 0) + 1
    await writeJson('content.json', content)
    revalidatePath('/', 'layout')
    revalidatePath('/menu')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save' },
      { status: 500 }
    )
  }
}
