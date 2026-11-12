
import { json, sessionCookie } from './_shared.mjs';
import { timingSafeEqual } from 'node:crypto';

export default async request => {
  if (request.method !== 'POST') {
    return json({ error: 'Méthode non permise' }, 405);
  }

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) {
    return json({ error: 'Configuration administrateur manquante.' }, 503);
  }

  // Limiter la taille des requêtes reçues.
  const maxBytes = 4096;
  const length = Number(request.headers.get('content-length'));

  if (Number.isFinite(length) && length > maxBytes) {
    return json({ error: 'Requête trop volumineuse.' }, 413);
  }

  let body;
  try {
    const buffer = await request.arrayBuffer();

    if (buffer.byteLength > maxBytes) {
      return json({ error: 'Requête trop volumineuse.' }, 413);
    }

    body = JSON.parse(new TextDecoder().decode(buffer));
  } catch {
    return json({ error: 'Requête invalide.' }, 400);
  }

  const password = body?.password;

  if (typeof password !== 'string' || password.length > 256) {
    return json({ error: 'Mot de passe incorrect.' }, 401);
  }

  const provided = Buffer.from(password);
  const expected = Buffer.from(process.env.ADMIN_PASSWORD);

  if (
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  ) {
    return json({ error: 'Mot de passe incorrect.' }, 401);
  }

  return json(
    { ok: true },
    200,
    { 'set-cookie': sessionCookie() }
  );
};
