import React from 'react';
import TodoItem from './TodoItem';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { FaGripVertical } from 'react-icons/fa'; // ドラッグ用のアイコンをインポート

// 要素全体でドラッグ&ドロップした際に子要素のクリックイベント発生させる方法あるか確認
type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
};

type TodoListProps = {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
  onDragEnd: (event: any) => void;
};
const GripIcon = FaGripVertical as React.FC<React.SVGProps<SVGSVGElement>>;

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleCompletion,
  editTodo,
  deleteTodo,
  onDragEnd,
}) => {
  return (
    <DndContext onDragEnd={onDragEnd} modifiers={[restrictToVerticalAxis]}>
      <SortableContext items={todos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
        <ul style={{ padding: 0 }}>
          {todos.map((todo) => (
            <SortableTodoItem
              key={todo.id}
              todo={todo}
              toggleCompletion={toggleCompletion}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

type SortableTodoItemProps = {
  todo: Todo;
  toggleCompletion: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  deleteTodo: (id: number) => void;
};

// SortableItemとしてラップ
const SortableTodoItem: React.FC<SortableTodoItemProps> = ({
  todo,
  toggleCompletion,
  editTodo,
  deleteTodo,
}) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: todo.id,
  });

  return (
    <li
      ref={setNodeRef}
      style={{
        display: 'flex',
        listStyleType: 'none',
        marginBottom: '8px',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#fff',
        zIndex: isDragging ? 1 : 'auto',
        position: isDragging ? 'relative' : 'static',
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
      }}
    >
      <div>
        <span
          {...attributes}
          {...listeners}
          style={{
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            width: '16px',
            height: '16px',
          }}
        >
          <GripIcon style={{ marginRight: '8px' }} />
        </span>
      </div>
      <TodoItem
        todo={todo}
        toggleCompletion={toggleCompletion}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    </li>
  );
};

export default TodoList;
