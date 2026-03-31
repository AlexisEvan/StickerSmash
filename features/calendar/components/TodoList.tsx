import type { Todo } from "@/features/calendar/models/todo";
import { FlatList, StyleSheet, Text } from "react-native";
import TodoCard from "@/features/calendar/components/TodoCard";

type Props = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  emptyText?: string;
};

export default function TodoList({
  todos,
  onEdit,
  onDelete,
  onToggleComplete,
  emptyText = "No todos yet",
}: Props) {
  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TodoCard
          todo={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      )}
      contentContainerStyle={[
        styles.list,
        todos.length === 0 && styles.emptyList,
      ]}
      ListEmptyComponent={<Text style={styles.emptyText}>{emptyText}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#2a2f36",
    opacity: 0.7,
  },
});
