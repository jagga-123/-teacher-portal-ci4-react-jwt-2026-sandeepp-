import client from "./client";

export function fetchTeachers() {
  return client.get("/teachers");
}

export function createTeacherWithUser(payload) {
  return client.post("/teachers", payload);
}
