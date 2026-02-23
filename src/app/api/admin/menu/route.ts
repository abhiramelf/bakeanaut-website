import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readJson, writeJson } from '@/lib/storage'
import type { MenuData } from '@/types/content'
import defaultMenu from '@/data/menu.json'

export async function GET() {
  try {
    const menu = await readJson<MenuData>('menu.json')
    return NextResponse.json(menu ?? defaultMenu)
  } catch {
    return NextResponse.json(defaultMenu)
  }
}

export async function PUT(request: Request) {
  try {
    const menu = (await request.json()) as MenuData
    await writeJson('menu.json', menu)
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
