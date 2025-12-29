"use client";

import { useState } from "react";
import { create } from "zustand";

/**
 * ZUSTAND EXAMPLE
 *
 * Demonstrates Zustand state management:
 * - Simple store creation
 * - Actions and state updates
 * - Selectors for optimized re-renders
 * - No Provider needed
 * - TypeScript support
 */

// Define the store interface
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

interface UserStore {
  user: { name: string; email: string; age: number };
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updateAge: (age: number) => void;
  resetUser: () => void;
}

interface TodoStore {
  todos: string[];
  addTodo: (todo: string) => void;
  removeTodo: (index: number) => void;
  clearTodos: () => void;
}

// Create stores
const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

const useUserStore = create<UserStore>((set) => ({
  user: { name: "", email: "", age: 0 },
  updateName: (name) =>
    set((state) => ({ user: { ...state.user, name } })),
  updateEmail: (email) =>
    set((state) => ({ user: { ...state.user, email } })),
  updateAge: (age) => set((state) => ({ user: { ...state.user, age } })),
  resetUser: () => set({ user: { name: "", email: "", age: 0 } }),
}));

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (todo) =>
    set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (index) =>
    set((state) => ({
      todos: state.todos.filter((_, i) => i !== index),
    })),
  clearTodos: () => set({ todos: [] }),
}));

// Components using Zustand stores
function CounterComponent() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-bold text-green-900 mb-3">
        1. Counter Store (Primitive State)
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-gray-900">Count: {count}</span>
          <button
            onClick={increment}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Increment
          </button>
          <button
            onClick={decrement}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Decrement
          </button>
          <button
            onClick={reset}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
            Reset
          </button>
        </div>
        <p className="text-xs text-gray-800">
          Using selectors: <code className="bg-gray-100 px-1 rounded">useCounterStore(state =&gt; state.count)</code>
        </p>
      </div>
    </div>
  );
}

function UserComponent() {
  const user = useUserStore((state) => state.user);
  const updateName = useUserStore((state) => state.updateName);
  const updateEmail = useUserStore((state) => state.updateEmail);
  const updateAge = useUserStore((state) => state.updateAge);
  const resetUser = useUserStore((state) => state.resetUser);

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-bold text-green-900 mb-3">2. User Store (Object State)</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Name:
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => updateName(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Email:
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => updateEmail(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Age:
          </label>
          <input
            type="number"
            value={user.age || ""}
            onChange={(e) => updateAge(Number(e.target.value))}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
          />
        </div>
        <div className="p-3 bg-white rounded border border-green-200">
          <p className="text-xs font-semibold text-gray-900 mb-1">Current User:</p>
          <pre className="text-xs text-gray-800 overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <button
          onClick={resetUser}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
        >
          Reset User
        </button>
      </div>
    </div>
  );
}

function TodoComponent() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearTodos = useTodoStore((state) => state.clearTodos);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-bold text-green-900 mb-3">3. Todo Store (Array State)</h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a todo..."
            className="flex-1 px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add
          </button>
          {todos.length > 0 && (
            <button
              onClick={clearTodos}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-sm text-gray-700">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white border border-green-200 rounded"
              >
                <span className="text-sm text-gray-900">{todo}</span>
                <button
                  onClick={() => removeTodo(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function ZustandExample() {
  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Zustand State Management Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">How It Works:</h3>
          <ol className="text-sm text-gray-900 space-y-2 list-decimal list-inside">
            <li>
              <strong>Create Store:</strong> Use{" "}
              <code className="bg-gray-100 px-1 rounded">create()</code> to define
              state and actions
            </li>
            <li>
              <strong>Use Selectors:</strong> Components subscribe to specific parts
              of state using selectors
            </li>
            <li>
              <strong>No Provider:</strong> No need to wrap components with Provider
              (unlike Context or Redux)
            </li>
            <li>
              <strong>Optimized Re-renders:</strong> Components only re-render when
              selected state changes
            </li>
            <li>
              <strong>TypeScript Support:</strong> Full type safety out of the box
            </li>
          </ol>
        </div>

        {/* Examples */}
        <CounterComponent />
        <UserComponent />
        <TodoComponent />

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Store Definition Example:</h4>
          <pre className="text-xs text-gray-800 bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));`}
          </pre>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Zustand Key Points:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>Minimal boilerplate - much simpler than Redux</li>
          <li>No Provider needed - can use stores anywhere</li>
          <li>Selective subscriptions - components only re-render when selected state changes</li>
          <li>Great TypeScript support</li>
          <li>Small bundle size (~1KB)</li>
          <li>Perfect for medium-sized applications</li>
          <li>Can use with middleware (persist, devtools, etc.)</li>
        </ul>
      </div>
    </div>
  );
}

