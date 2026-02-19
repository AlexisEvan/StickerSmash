import AddTodo from "@/components/addtodo";
import TodoCard from "@/components/TodoCards";
import { todos } from "@/data/todo";
import type { Todo } from "@/types/todo";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function CalendarScreen() {
  const [list, setList] = useState<Todo[]>(todos);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar</Text>

      <Pressable style={styles.addBtn} onPress={() => setModalOpen(true)}>
        <Text style={styles.addBtnText}>Add Todo</Text>
      </Pressable>

      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <TodoCard todo={item} />}
        contentContainerStyle={styles.list}
      />

      <AddTodo
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(values) => {
          const nextTodo: Todo = {
            id: Date.now(),
            title: values.title,
            description: values.description,
            completed: false,
          };
          setList((prev) => [nextTodo, ...prev]);
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
});
