"use client";

import { useState } from "react";

/**
 * PROPS VS STATE DATA FLOW
 *
 * Demonstrates the unidirectional data flow:
 * - Props flow DOWN (parent → child)
 * - Callbacks flow UP (child → parent via props)
 * - State stays in the component that needs it
 */

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// Child component receives props (data) and callbacks (functions as props)
function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-md">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="w-4 h-4"
      />
      <span
        className={`flex-1 ${
          completed ? "line-through text-gray-700" : "text-gray-900"
        }`}
      >
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

export default function PropsStateFlow() {
  // State lives in the parent component
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Understand Props vs State", completed: false },
    { id: 3, text: "Build awesome apps", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Callback functions that update state
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAdd = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Data Flow: Props Down, Callbacks Up
      </h2>

      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h3 className="font-bold text-indigo-900 mb-3">
          Parent Component (State Owner)
        </h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-800">
            State lives here:{" "}
            <code className="bg-gray-100 px-1 rounded">todos</code> and{" "}
            <code className="bg-gray-100 px-1 rounded">newTodo</code>
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-3">
          Todo List (Receives Props)
        </h3>
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-700 text-center py-4">No todos yet!</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Data Flow Pattern:</h4>
        <div className="space-y-2 text-sm text-gray-900">
          <div className="flex items-start gap-2">
            <span className="font-bold text-blue-600">↓</span>
            <div>
              <strong>Props Flow Down:</strong> Parent passes data (todos) as
              props to child components
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-green-600">↑</span>
            <div>
              <strong>Callbacks Flow Up:</strong> Child calls parent functions (
              <code className="bg-gray-100 px-1 rounded">onToggle</code>,{" "}
              <code className="bg-gray-100 px-1 rounded">onDelete</code>) passed
              as props
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-purple-600">↔</span>
            <div>
              <strong>State Stays Put:</strong> State lives in the component
              that needs to control it (parent). Child components are
              &quot;dumb&quot; - they just display props and call callbacks
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs text-gray-800">
            <strong>Key Insight:</strong> When a child needs to update parent
            state, pass a callback function as a prop. The child calls the
            callback, and the parent updates its state. This maintains the
            unidirectional data flow.
          </p>
        </div>
      </div>
    </div>
  );
}
