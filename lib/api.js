// Lightweight API helper for Emil AI frontend
// We always call paths starting with '/api/...'.
// If NEXT_PUBLIC_API_URL is set (e.g. http://localhost:8080 or http://localhost:8080/api), we normalize it.

function normalizeBaseUrl(raw) {
  if (!raw) return '';
  let base = raw.trim();
  // drop trailing slashes
  while (base.endsWith('/')) base = base.slice(0, -1);
  // drop trailing '/api' to avoid double-prefix
  if (base.toLowerCase().endsWith('/api')) base = base.slice(0, -4);
  return base; // e.g. '', 'http://localhost:8080'
}

export const getApiBaseUrl = () => {
  // In development, prefer using Next.js rewrites (same-origin) to avoid CORS.
  // Set NEXT_PUBLIC_API_DIRECT=1 to force direct backend usage in dev.
  const forceDirect = process.env.NEXT_PUBLIC_API_DIRECT === '1';
  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev && !forceDirect) return '';
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);
};

export async function apiFetch(path, options = {}) {
  const base = getApiBaseUrl();
  const finalPath = path.startsWith('/api') ? path : `/api${path}`;
  const url = `${base}${finalPath}`; // '' + '/api/...' will go through Next.js rewrites

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  let response;
  try {
    response = await fetch(url, { ...options, headers, mode: 'cors' });
  } catch (err) {
    const error = new Error('Failed to fetch. Is the backend running and CORS/proxy configured?');
    error.cause = err;
    throw error;
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// Jobs
export async function getPublicJobs() {
  return apiFetch('/api/jobs/public', { method: 'GET' });
}

export async function createJob(jobPayload) {
  return apiFetch('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(jobPayload),
  });
}


