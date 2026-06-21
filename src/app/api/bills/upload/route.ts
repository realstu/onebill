import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get('file') as File
  const clientId = form.get('clientId') as string
  const billId = form.get('billId') as string

  if (!file || !clientId) {
    return NextResponse.json({ error: 'Missing file or clientId' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const path = `bills/${clientId}/${billId ?? Date.now()}.${ext}`

  const { error } = await supabaseAdmin.storage
    .from('bill-uploads')
    .upload(path, file, { upsert: true, contentType: file.type })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('bill-uploads')
    .getPublicUrl(path)

  // Save reference to bill if billId provided
  if (billId) {
    await supabaseAdmin
      .from('bills')
      .update({ bill_image_url: publicUrl })
      .eq('id', billId)
  }

  return NextResponse.json({ url: publicUrl, path })
}
