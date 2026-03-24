import { getSession } from './session';

export async function verifySession() {
  const session = await getSession();
  if (!session || !session.authenticated) return null;

  // Opcional: comprobar si la sesión ha expirado por fecha
  if (new Date(session.expiresAt) < new Date()) return null;

  return session;
}