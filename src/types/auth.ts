export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  verified: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ValidationError {
  field: string;
  message: string;
}