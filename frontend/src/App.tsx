import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [hideCompleted, setHideCompleted] = useState<boolean>(() => {
    const stored = localStorage.getItem('hideCompleted');
    return stored ? JSON.parse(stored) : true; // 初期値は true（非表示）
  });

  useEffect(() => {
    fetch('http://localhost:5017/api/todo')
      .then((res) => res.json())
      .then((data) => setTodos(getVisibleTodos(data, hideCompleted)));
  }, []);

  const addTodo = async () => {
    const newTodo = { title, isCompleted: false };
    const res = await fetch('http://localhost:5017/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    const data = await res.json();
    setTodos([data, ...todos]);
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
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };

  const editTodo = async (id: number, newTitle: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updatedTodo = { ...todo, title: newTitle };

    const res = await fetch(`http://localhost:5017/api/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });

    if (res.ok) {
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
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

  // ドラッグ終了時にTodoの順番を更新
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;

    // activeとoverはidだけではなくtodo自体が渡ってくることを想定
    const activeTodo = todos.find((todo) => todo.id === active.id);
    const overTodo = todos.find((todo) => todo.id === over.id);

    if (!activeTodo || !overTodo) return;

    const reorderedTodos = [...todos];
    const activeIndex = todos.indexOf(activeTodo);
    const overIndex = todos.indexOf(overTodo);

    // 並べ替え処理
    const [movedTodo] = reorderedTodos.splice(activeIndex, 1);
    reorderedTodos.splice(overIndex, 0, movedTodo);

    setTodos(reorderedTodos);

    await fetch('http://localhost:5017/api/todo/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        reorderedTodos.map((todo, index) => ({
          id: todo.id,
          order: index,
        }))
      ),
    });
  };

  const toggleHideCompleted = () => {
    const newValue = !hideCompleted;
    setHideCompleted(newValue);
    localStorage.setItem('hideCompleted', JSON.stringify(newValue));
    const newTodos = getVisibleTodos(todos, newValue);
    setTodos(newTodos);
  };

  const getVisibleTodos = (todos: Todo[], hideCompleted: boolean) => {
    return hideCompleted ? todos.filter((todo) => !todo.isCompleted) : todos;
  };

  return (
    <div style={{ padding: '8px' }}>
      <h1>Todo App</h1>
      <label>
        <input type="checkbox" checked={hideCompleted} onChange={toggleHideCompleted} />
        完了したTodoを非表示にする
      </label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <TodoList
        todos={todos}
        toggleCompletion={toggleCompletion}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
};

export default App;
