export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export type TodoValues = Pick<Todo, "title" | "description">;
