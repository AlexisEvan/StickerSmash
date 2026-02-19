import type { Todo } from "@/types/todo";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  todo: Todo;
};

export default function TodoCard({ todo }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.desc}>{todo.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  desc: { fontSize: 14, opacity: 0.7 },
});
