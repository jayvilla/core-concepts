"use client";

import { useReducer, useState } from "react";

/**
 * USEREDUCER EXAMPLE
 *
 * Demonstrates useReducer hook:
 * - Better for complex state logic
 * - State updates in one place (reducer function)
 * - Predictable state transitions
 * - Can handle multiple related state updates
 */

// Types
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoAction =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET_FILTER"; filter: "all" | "active" | "completed" };

type TodoState = {
  todos: Todo[];
  filter: "all" | "active" | "completed";
};

// Initial state
const initialState: TodoState = {
  todos: [],
  filter: "all",
};

// Reducer function - handles all state updates
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.text,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter,
      };

    default:
      return state;
  }
}

export default function UseReducerExample() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputText, setInputText] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      dispatch({ type: "ADD_TODO", text: inputText });
      setInputText("");
    }
  };

  const filteredTodos =
    state.filter === "all"
      ? state.todos
      : state.filter === "active"
      ? state.todos.filter((todo) => !todo.completed)
      : state.todos.filter((todo) => todo.completed);

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        useReducer Hook Example
      </h2>

      <div className="space-y-6">
        {/* Add Todo Form */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Add Todo</h3>
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder="Enter todo..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add
            </button>
          </form>
        </div>

        {/* Filter Buttons */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">Filter</h3>
          <div className="flex gap-2">
            {(["all", "active", "completed"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => dispatch({ type: "SET_FILTER", filter })}
                className={`px-4 py-2 rounded-md font-medium capitalize ${
                  state.filter === filter
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">
            Todos ({filteredTodos.length})
          </h3>
          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <p className="text-sm text-gray-700">No todos found.</p>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-white border border-green-200 rounded"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
                    className="w-4 h-4"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed ? "line-through text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Actions */}
        {state.todos.some((todo) => todo.completed) && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <button
              onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Clear Completed
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">useReducer Key Points:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>Better for complex state logic with multiple sub-values</li>
          <li>State updates happen through dispatched actions</li>
          <li>Reducer function is pure (no side effects)</li>
          <li>Easier to test and debug (all state logic in one place)</li>
          <li>Follows Redux pattern (state, action, reducer)</li>
          <li>dispatch function is stable (doesn&apos;t change between renders)</li>
        </ul>
      </div>
    </div>
  );
}

