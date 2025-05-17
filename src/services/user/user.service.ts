import * as userApi from '../../api/user/user.api';
import type { CreateUserResponse, LoginPayload, User } from '../../types/user.types';

export const createUserService = async (user: User): Promise<CreateUserResponse> => {
  try {
    return await userApi.createUser(user);
  } catch (error: any) {
    if (error.status === 409) {
      return {
        message: "El usuario ya existe",
        ok: false
      };
    }

    return {
      message: error.message || "Error inesperado",
      ok: false
    };
  }
};

export const createLoginService = async (payload: LoginPayload) => {
  const RESPONSE = await userApi.loginUser(payload);

  if (RESPONSE.access_token) {
    localStorage.setItem('access_token', RESPONSE.access_token);
  }

  return RESPONSE;
};

export const getUserService = async () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return null;
  }

  const response = await userApi.getUser(token);

  if (response.status === 401) {
    localStorage.removeItem('access_token');
    return null;
  }

  return response;
}

export const getUsersByRoleService = async () => {
  return await userApi.getUsersByRole();
}
