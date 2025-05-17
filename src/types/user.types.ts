export interface User {
  name: string;
  email: string;
  password: string;
  role: 'BUYER' | 'SELLER';
}

export interface CreateUserResponse {
  message: string;
  ok?: boolean;
  statusCode?: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}