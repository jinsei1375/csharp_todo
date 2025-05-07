import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';

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
  const [showCompletedTodos, setShowCompletedTodos] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:5017/api/todo')
      .then((res) => res.json())
      .then((data) => setTodos(getVisibleTodos(data, hideCompleted, showCompletedTodos)));
  }, [hideCompleted, showCompletedTodos]);

  const getVisibleTodos = (todos: Todo[], hideCompleted: boolean, showCompletedTodos: boolean) => {
    if (showCompletedTodos) return todos.filter((todo) => todo.isCompleted);
    if (hideCompleted) {
      return todos.filter((todo) => !todo.isCompleted);
    }
    return todos;
  };

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
      const newTodos = getVisibleTodos(updatedTodos, hideCompleted, showCompletedTodos);
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

  // 完了したTodoを非表示にするチェックボックスのトグル
  const toggleHideCompleted = () => {
    const newValue = !hideCompleted;
    setHideCompleted(newValue);
    localStorage.setItem('hideCompleted', JSON.stringify(newValue));
    const newTodos = getVisibleTodos(todos, newValue, showCompletedTodos);
    setTodos(newTodos);
  };

  return (
    <>
      <div style={{ padding: '8px' }}>
        <h1>Todo App</h1>
        <label>
          <input type="checkbox" checked={hideCompleted} onChange={toggleHideCompleted} />
          完了したTodoを非表示にする
        </label>
        <button onClick={() => setShowCompletedTodos(!showCompletedTodos)}>
          {showCompletedTodos ? '非表示に戻す' : '完了済みのTodoを見る'}
        </button>
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
      <Router>
        <Routes>
          <Route path="/test" element={<Test />} /> {/* /test に Test コンポーネントを割り当て */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
