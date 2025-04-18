import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  isDeleted: boolean;
  createdAt: string;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [hideCompleted, setHideCompleted] = useState<boolean>(() => {
    const stored = localStorage.getItem('hideCompleted');
    return stored ? JSON.parse(stored) : true; // 初期値は true（非表示）
  });
  const [showDeletedTodos, setShowDeletedTodos] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:5017/api/todo')
      .then((res) => res.json())
      .then((data) => setTodos(getVisibleTodos(data, hideCompleted, showDeletedTodos)));
  }, []);

  const getVisibleTodos = (todos: Todo[], hideCompleted: boolean, showDeletedTodos: boolean) => {
    if (showDeletedTodos) return todos.filter((todo) => todo.isDeleted);
    console.log(todos);
    if (hideCompleted) {
      return todos.filter((todo) => !todo.isCompleted);
    }
    return todos;
  };

  const visibleTodos = getVisibleTodos(todos, hideCompleted, showDeletedTodos);

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
    const isCompleted = !todo.isCompleted;
    const isDeleted = isCompleted && hideCompleted; // 完了した + 非表示設定ON なら削除扱い

    const updatedTodo = { ...todo, isCompleted, isDeleted };
    const res = await fetch(`http://localhost:5017/api/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });

    if (res.ok) {
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      const newTodos = getVisibleTodos(updatedTodos, hideCompleted, showDeletedTodos);
      setTodos(newTodos);
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
    const newTodos = getVisibleTodos(todos, newValue, showDeletedTodos);
    setTodos(newTodos);
  };

  return (
    <div style={{ padding: '8px' }}>
      <h1>Todo App</h1>
      <label>
        <input type="checkbox" checked={hideCompleted} onChange={toggleHideCompleted} />
        完了したTodoを非表示にする
      </label>
      {hideCompleted && (
        <button onClick={() => setShowDeletedTodos(!showDeletedTodos)}>
          {showDeletedTodos ? '非表示に戻す' : '完了済みのTodoを見る'}
        </button>
      )}
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <TodoList
        todos={visibleTodos}
        toggleCompletion={toggleCompletion}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
};

export default App;
