// Lightweight API helper for Emil AI frontend
// Use same-origin '/api' so Next.js rewrites proxy to the backend
const DEFAULT_BASE_URL = '/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('emilai_token');
  } catch (_) {
    return null;
  }
}

export const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL;
};

export async function apiFetch(path, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path}`;

  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers });
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
  return apiFetch('/jobs/public', { method: 'GET' });
}

export async function getJobs() {
  return apiFetch('/jobs', { method: 'GET' });
}

export async function createJob(jobPayload) {
  return apiFetch('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobPayload),
  });
}

// Auth
export async function login({ email, password }) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  // The backend returns: { token, company: { id, name, email, ... } }
  if (data?.token) {
    return {
      token: data.token,
      user: {
        id: data.company?.id,
        email: data.company?.email,
        name: data.company?.name,
        companyName: data.company?.companyName,
        role: data.company?.role || 'HR_MANAGER',
        emailVerified: data.company?.emailVerified,
        profilePictureUrl: data.company?.profilePictureUrl
      }
    };
  }
  
  return data;
}

export async function register({ name, email, password }) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  
  if (data?.token) {
    return {
      token: data.token,
      user: {
        id: data.company?.id,
        email: data.company?.email,
        name: data.company?.name,
        role: data.company?.role || 'HR_MANAGER'
      }
    };
  }
  
  return data;
}

export async function registerCompany(companyData) {
  const data = await apiFetch('/auth/register-company', {
    method: 'POST',
    body: JSON.stringify(companyData),
  });
  
  if (data?.token) {
    return {
      token: data.token,
      user: {
        id: data.company?.id,
        email: data.company?.email,
        name: data.company?.name,
        companyName: data.company?.companyName,
        role: data.company?.role || 'HR_MANAGER',
        emailVerified: data.company?.emailVerified
      }
    };
  }
  
  return data;
}

export async function authenticateWithGoogle(googleData) {
  const data = await apiFetch('/auth/google', {
    method: 'POST',
    body: JSON.stringify(googleData),
  });
  
  if (data?.token) {
    return {
      token: data.token,
      user: {
        id: data.company?.id,
        email: data.company?.email,
        name: data.company?.name,
        companyName: data.company?.companyName,
        role: data.company?.role || 'HR_MANAGER',
        emailVerified: data.company?.emailVerified,
        profilePictureUrl: data.company?.profilePictureUrl
      }
    };
  }
  
  return data;
}

export async function getCurrentUser() {
  return apiFetch('/auth/me', { method: 'GET' });
}


