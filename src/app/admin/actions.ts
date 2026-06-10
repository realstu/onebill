'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateClientStatus(clientId: string, status: string) {
  await supabaseAdmin
    .from('clients')
    .update({ status })
    .eq('id', clientId)

  revalidatePath('/admin')
}
