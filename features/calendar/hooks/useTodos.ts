import type { Todo, TodoValues } from "@/features/calendar/models/todo";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  TODOS_QUERY_KEY,
  toggleTodo,
  updateTodo,
} from "@/features/calendar/services/todo-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodos() {
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

  const invalidateTodos = () => {
    queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
  };

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: invalidateTodos,
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: invalidateTodos,
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: invalidateTodos,
  });

  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: invalidateTodos,
  });

  const handleCreateTodo = (values: TodoValues) => {
    createTodoMutation.mutate(values);
  };

  const handleUpdateTodo = (id: number, values: TodoValues) => {
    updateTodoMutation.mutate({ id, values });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  const handleToggleTodo = (id: number) => {
    const todo = list.find((item: Todo) => item.id === id);
    if (!todo) return;
    toggleTodoMutation.mutate(todo);
  };

  return {
    list,
    isLoading,
    isError,
    error,
    createTodo: handleCreateTodo,
    updateTodo: handleUpdateTodo,
    deleteTodo: handleDeleteTodo,
    toggleTodo: handleToggleTodo,
  };
}
