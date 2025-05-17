import type { LoginPayload, User } from "../../types/user.types";

export const createUser = async (user: User) => {
  const RESPONSE = await fetch(`${import.meta.env.VITE_API_URL}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  
  return await RESPONSE.json();
}


export const loginUser = async (data: LoginPayload) => {
  const RESPONSE = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign-with-credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await RESPONSE.json();
};

export const getUser = async (token: string) => {
  const RESPONSE = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await RESPONSE.json();
}

export const getUsersByRole = async () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return null;
  }

  const RESPONSE = await fetch(`${import.meta.env.VITE_API_URL}/user/byRole/SELLER`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await RESPONSE.json();
}