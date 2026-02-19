import AddTodo from "@/components/addtodo";
import TodoCard from "@/components/TodoCards";
import type { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const API_URL = "http://192.168.50.200:3001/todos";

export default function CalendarScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const res = await fetch(API_URL);
        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (e) {
        console.log("Fetch todos error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar</Text>

      <Pressable style={styles.addBtn} onPress={() => setModalOpen(true)}>
        <Text style={styles.addBtnText}>Add Todo</Text>
      </Pressable>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TodoCard todo={item} />}
          contentContainerStyle={styles.list}
        />
      )}

      <AddTodo
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(values) => {
          console.log("New todo:", values);
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
    paddingTop: 40,
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
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});
