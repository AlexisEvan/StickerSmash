import AddTodoModal from "@/features/calendar/components/AddTodoModal";
import CalendarHeader from "@/features/calendar/components/CalendarHeader";
import TodoList from "@/features/calendar/components/TodoList";
import TodoFilters, {
  type TodoFilter,
} from "@/features/calendar/components/TodoFilters";
import type { Todo, TodoValues } from "@/features/calendar/models/todo";
import { useTodos } from "@/features/calendar/hooks/useTodos";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CalendarScreen() {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { list, isLoading, isError, error, createTodo, updateTodo, deleteTodo, toggleTodo } =
    useTodos();

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  const handleAddPress = () => {
    setEditingTodo(null);
    setModalOpen(true);
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
      <CalendarHeader onAddPress={handleAddPress} />

      <TodoFilters
        value={filter}
        allCount={allCount}
        activeCount={activeCount}
        completedCount={completedCount}
        onChange={setFilter}
      />

      {isLoading ? (
        <Text style={styles.statusText}>Loading...</Text>
      ) : isError ? (
        <Text style={styles.statusText}>
          {(error as Error)?.message ?? "Failed to load todos"}
        </Text>
      ) : (
        <TodoList
          todos={filteredList}
          onEdit={handleEdit}
          onDelete={deleteTodo}
          onToggleComplete={toggleTodo}
          emptyText="No todos in this filter"
        />
      )}

      <AddTodoModal
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
        onSubmit={(values: TodoValues) => {
          if (editingTodo) {
            updateTodo(editingTodo.id, values);
          } else {
            createTodo(values);
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
  statusText: {
    textAlign: "center",
    fontSize: 16,
    color: "#2a2f36",
    marginTop: 12,
  },
});
