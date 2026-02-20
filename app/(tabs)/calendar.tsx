import AddTodo from "@/components/addtodo";
import TodoCard from "@/components/TodoCards";
import { todos } from "@/data/todo";
import type { Todo } from "@/types/todo";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function CalendarScreen() {
  const [list, setList] = useState<Todo[]>(todos);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleDelete = (id: number) => {
    setList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  const handleAddPress = () => {
    setEditingTodo(null);
    setModalOpen(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar</Text>

      <Pressable style={styles.addBtn} onPress={handleAddPress}>
        <Text style={styles.addBtnText}>Add Todo</Text>
      </Pressable>

      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TodoCard todo={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.list}
      />

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
            setList((prev) =>
              prev.map((todo) =>
                todo.id === editingTodo.id ? { ...todo, ...values } : todo
              )
            );
          } else {
            const nextTodo: Todo = {
              id: Date.now(),
              title: values.title,
              description: values.description,
              completed: false,
            };
            setList((prev) => [nextTodo, ...prev]);
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
});
