import React, { useState, useEffect } from 'react';

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:5017/api/todo')
      .then((res) => res.json())
      .then((data) => setTodos(sortTodos(data)));
  }, []);

  const addTodo = async () => {
    const newTodo = { title, isCompleted: false };
    const res = await fetch('http://localhost:5017/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    const data = await res.json();
    setTodos([...todos, data]);
    setTitle('');
  };

  const toggleCompletion = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

    const res = await fetch(`http://localhost:5017/api/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    if (res.ok) {
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      setTodos(sortTodos(updatedTodos));
    }
  };

  const editTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    if (editMode === id) {
      const updatedTodo = { ...todo, title: editTitle };
      const res = await fetch(`http://localhost:5017/api/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      if (res.ok) {
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
        setEditMode(null);
      }
    } else {
      setEditTitle(todo.title);
      setEditMode(id);
    }
  };

  const showDeleteAlert = (id: number) => {
    if (window.confirm('Are you sure?')) {
      deleteTodo(id);
    }
  };

  const deleteTodo = async (id: number) => {
    const res = await fetch(`http://localhost:5017/api/todo/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setTodos(todos.filter((t) => t.id !== id));
    }
  };

  // ソート関数
  const sortTodos = (todos: Todo[]) => {
    return [...todos].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul style={{ padding: '16px' }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ listStyleType: 'none', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleCompletion(todo.id)}
            />
            {editMode === todo.id ? (
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            ) : (
              todo.title
            )}
            <div>作成日時： {new Date(todo.createdAt).toLocaleString()}</div>
            <div>
              <button onClick={() => editTodo(todo.id)}>
                {todo.id === editMode ? 'Update' : 'Edit'}
              </button>
              <button onClick={() => showDeleteAlert(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
