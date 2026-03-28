import client from "./client";

export function register(payload) {
  return client.post("/auth/register", payload);
}

export function login(payload) {
  return client.post("/auth/login", payload);
}
