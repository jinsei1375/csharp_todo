import React, { useState } from 'react';

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
};

type Props = {
  todo: Todo;
  toggleCompletion: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
};

const TodoItem: React.FC<Props> = ({ todo, toggleCompletion, editTodo, deleteTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEdit = () => {
    if (editMode) {
      editTodo(todo.id, editTitle);
    }
    setEditMode(!editMode);
  };

  return (
    <div style={{ listStyleType: 'none', marginBottom: '8px' }}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleCompletion(todo.id)}
      />
      {editMode ? (
        <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      ) : (
        todo.title
      )}
      <div>作成日時: {new Date(todo.createdAt).toLocaleString()}</div>
      <button onClick={handleEdit}>{editMode ? 'Update' : 'Edit'}</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
