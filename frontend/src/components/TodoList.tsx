import React from 'react';
import TodoItem from './TodoItem';

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
};

type Props = {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
};

const TodoList: React.FC<Props> = ({ todos, toggleCompletion, editTodo, deleteTodo }) => {
  return (
    <ul style={{ padding: '16px' }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompletion={toggleCompletion}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
