import client from "./client";

export function fetchUsers() {
  return client.get("/users");
}
