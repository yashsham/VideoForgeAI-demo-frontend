const TOKEN_KEY = 'auth_token';

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeStoredToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getAuthHeader = (): { Authorization: string } | undefined => {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};