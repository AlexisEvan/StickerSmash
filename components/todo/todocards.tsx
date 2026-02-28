import type { Todo } from "@/types/todo";
import { Pressable, StyleSheet, Text, View } from "react-native";
type Props = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

export default function TodoCard({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.titleRow}>
          <Pressable
            style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
            onPress={() => onToggleComplete(todo.id)}
          >
            <Text style={styles.checkboxMark}>{todo.completed ? "X" : ""}</Text>
          </Pressable>
          <Text style={[styles.title, todo.completed && styles.titleCompleted]}>
            {todo.title}
          </Text>
        </View>
        <Text style={styles.desc}>{todo.description}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.editBtn} onPress={() => onEdit(todo)}>
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>

        <Pressable style={styles.delBtn} onPress={() => onDelete(todo.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  titleCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  desc: { fontSize: 14, opacity: 0.7 },
  left: { flex: 1, paddingRight: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#1677ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  checkboxChecked: {
    backgroundColor: "#1677ff",
  },
  checkboxMark: {
    color: "white",
    fontWeight: "800",
    fontSize: 12,
  },
  actions: { flexDirection: "row", gap: 8, marginLeft: "auto" },
  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#1677ff",
  },
  delBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#ff4d4f",
  },
  actionText: { color: "white", fontWeight: "700" },
});
