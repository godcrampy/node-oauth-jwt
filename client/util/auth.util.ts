import { UserDAO } from "../repository/Repository";

export const isLoggedIn = (): boolean => {
  return (
    localStorage.getItem("token") !== null &&
    localStorage.getItem("name") !== null &&
    localStorage.getItem("email") !== null &&
    localStorage.getItem("auth_provider") !== null
  );
};

export const logout = () => localStorage.clear();

export const login = (
  name: string,
  email: string,
  token: string,
  auth_provider: string
) => {
  localStorage.setItem("name", name);
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("auth_provider", auth_provider);
};

export const getUser = (): UserDAO => {
  return {
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    token: localStorage.getItem("token") || "",
    auth_provider: localStorage.getItem("auth_provider") || "",
  };
};
