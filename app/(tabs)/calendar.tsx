import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddTodo from "@/components/addtodo";
import TodoCard from "@/components/TodoCards";
import type { Todo } from "@/types/todo";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const API_URL = "http://192.168.50.200:3001/todos";
const TODOS_QUERY_KEY = ["todos"];

type TodoValues = {
  title: string;
  description: string;
};

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

async function createTodo(values: TodoValues): Promise<Todo> {
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

async function updateTodo({
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

async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
}

async function toggleTodo(todo: Todo): Promise<Todo> {
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

export default function CalendarScreen() {
  type Filter = "all" | "active" | "completed";
  const [filter, setFilter] = useState<Filter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const queryClient = useQueryClient();

  const {
    data: list = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: fetchTodos,
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });

  const handleDelete = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  const handleAddPress = () => {
    setEditingTodo(null);
    setModalOpen(true);
  };

  const handleToggleComplete = (id: number) => {
    const todo = list.find((item) => item.id === id);
    if (!todo) return;
    toggleTodoMutation.mutate(todo);
  };

  const allCount = list.length;
  const activeCount = list.filter((todo) => !todo.completed).length;
  const completedCount = list.filter((todo) => todo.completed).length;

  const filteredList = list.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar</Text>

      <Pressable style={styles.addBtn} onPress={handleAddPress}>
        <Text style={styles.addBtnText}>Add Todo</Text>
      </Pressable>

      <View style={styles.filtersRow}>
        <Pressable
          style={[styles.filterBtn, filter === "all" && styles.filterBtnActive]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.filterTextActive,
            ]}
          >
            All ({allCount})
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterBtn,
            filter === "active" && styles.filterBtnActive,
          ]}
          onPress={() => setFilter("active")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "active" && styles.filterTextActive,
            ]}
          >
            Active ({activeCount})
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterBtn,
            filter === "completed" && styles.filterBtnActive,
          ]}
          onPress={() => setFilter("completed")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "completed" && styles.filterTextActive,
            ]}
          >
            Completed ({completedCount})
          </Text>
        </Pressable>
      </View>

      {isLoading ? (
        <Text style={styles.statusText}>Loading...</Text>
      ) : isError ? (
        <Text style={styles.statusText}>
          {(error as Error)?.message ?? "Failed to load todos"}
        </Text>
      ) : (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TodoCard
              todo={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <AddTodo
        visible={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTodo(null);
        }}
        initialValues={
          editingTodo
            ? { title: editingTodo.title, description: editingTodo.description }
            : undefined
        }
        modalTitle={editingTodo ? "Edit Todo" : "Add New Todo"}
        submitLabel={editingTodo ? "Save Changes" : "Add Todo"}
        onSubmit={(values) => {
          if (editingTodo) {
            updateTodoMutation.mutate({
              id: editingTodo.id,
              values,
            });
          } else {
            createTodoMutation.mutate(values);
          }
          setEditingTodo(null);
          setModalOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingTop: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  addBtn: {
    alignSelf: "center",
    backgroundColor: "#1677ff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 12,
  },
  addBtnText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  statusText: {
    textAlign: "center",
    fontSize: 16,
    color: "#2a2f36",
    marginTop: 12,
  },
  filtersRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  filterBtn: {
    backgroundColor: "#e7e8ea",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  filterBtnActive: {
    backgroundColor: "#1677ff",
  },
  filterText: {
    color: "#2a2f36",
    fontWeight: "700",
    fontSize: 12,
  },
  filterTextActive: {
    color: "white",
  },
});
