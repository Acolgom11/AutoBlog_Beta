'use server';

import { createSession, deleteSession } from '@/lib/session';

export async function login(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (username === adminUser && password === adminPass) {
    await createSession();
    return { success: true };
  } else {
    return { error: 'Credenciales inválidas' };
  }
}

export async function logout() {
  await deleteSession();
  return { success: true };
}