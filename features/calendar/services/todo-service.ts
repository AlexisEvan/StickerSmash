import type { Todo, TodoValues } from "@/features/calendar/models/todo";
import { Platform } from "react-native";

const USE_LAN_DEVICE = false;
const LAN_IP = "192.168.50.200";
const API_HOST = USE_LAN_DEVICE
  ? LAN_IP
  : (Platform.select({
      ios: "localhost",
      android: "10.0.2.2",
      default: "localhost",
    }) ?? "localhost");
const API_URL = `http://${API_HOST}:3001/todos`;

export const TODOS_QUERY_KEY = ["todos"];

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

export async function createTodo(values: TodoValues): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, completed: false }),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }
  return res.json();
}

export async function updateTodo({
  id,
  values,
}: {
  id: number;
  values: TodoValues;
}): Promise<Todo> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
}

export async function toggleTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`${API_URL}/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !todo.completed }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle todo");
  }
  return res.json();
}
