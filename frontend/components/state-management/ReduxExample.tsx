"use client";

import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * REDUX EXAMPLE
 *
 * Demonstrates Redux Toolkit state management:
 * - Store configuration
 * - Slices (reducers + actions)
 * - Provider pattern
 * - useSelector and useDispatch hooks
 * - TypeScript support
 */

// Counter Slice
interface CounterState {
  count: number;
}

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 } as CounterState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});

// User Slice
interface UserState {
  user: { name: string; email: string; age: number };
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { name: "", email: "", age: 0 },
  } as UserState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    updateAge: (state, action: PayloadAction<number>) => {
      state.user.age = action.payload;
    },
    resetUser: (state) => {
      state.user = { name: "", email: "", age: 0 };
    },
  },
});

// Todo Slice
interface TodoState {
  todos: string[];
}

const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [] } as TodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },
    clearTodos: (state) => {
      state.todos = [];
    },
  },
});

// Configure Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
    todos: todoSlice.reducer,
  },
});

// Export actions
export const counterActions = counterSlice.actions;
export const userActions = userSlice.actions;
export const todoActions = todoSlice.actions;

// TypeScript types for hooks
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Typed hooks (using traditional approach for compatibility)
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector = <TSelected,>(selector: (state: RootState) => TSelected) =>
  useSelector<RootState, TSelected>(selector);

// Components using Redux
function CounterComponent() {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <h3 className="font-bold text-orange-900 mb-3">
        1. Counter Store (Primitive State)
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-gray-900">Count: {count}</span>
          <button
            onClick={() => dispatch(counterActions.increment())}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch(counterActions.decrement())}
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm"
          >
            Decrement
          </button>
          <button
            onClick={() => dispatch(counterActions.reset())}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
            Reset
          </button>
        </div>
        <p className="text-xs text-gray-800">
          Using actions: <code className="bg-gray-100 px-1 rounded">dispatch(counterActions.increment())</code>
        </p>
      </div>
    </div>
  );
}

function UserComponent() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <h3 className="font-bold text-orange-900 mb-3">2. User Store (Object State)</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Name:
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => dispatch(userActions.updateName(e.target.value))}
            className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Email:
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => dispatch(userActions.updateEmail(e.target.value))}
            className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Age:
          </label>
          <input
            type="number"
            value={user.age || ""}
            onChange={(e) => dispatch(userActions.updateAge(Number(e.target.value)))}
            className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
          />
        </div>
        <div className="p-3 bg-white rounded border border-orange-200">
          <p className="text-xs font-semibold text-gray-900 mb-1">Current User:</p>
          <pre className="text-xs text-gray-800 overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <button
          onClick={() => dispatch(userActions.resetUser())}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
        >
          Reset User
        </button>
      </div>
    </div>
  );
}

function TodoComponent() {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(todoActions.addTodo(input));
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <h3 className="font-bold text-orange-900 mb-3">3. Todo Store (Array State)</h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a todo..."
            className="flex-1 px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Add
          </button>
          {todos.length > 0 && (
            <button
              onClick={() => dispatch(todoActions.clearTodos())}
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
                className="flex items-center justify-between p-2 bg-white border border-orange-200 rounded"
              >
                <span className="text-sm text-gray-900">{todo}</span>
                <button
                  onClick={() => dispatch(todoActions.removeTodo(index))}
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

// App content wrapped in Provider
function ReduxAppContent() {
  return (
    <div className="space-y-6">
      <CounterComponent />
      <UserComponent />
      <TodoComponent />
    </div>
  );
}

export default function ReduxExample() {
  return (
    <div className="border-2 border-orange-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-orange-900">
        Redux Toolkit State Management Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-bold text-orange-900 mb-3">How It Works:</h3>
          <ol className="text-sm text-gray-900 space-y-2 list-decimal list-inside">
            <li>
              <strong>Create Slices:</strong> Use{" "}
              <code className="bg-gray-100 px-1 rounded">createSlice()</code> to
              define state and reducers
            </li>
            <li>
              <strong>Configure Store:</strong> Combine reducers with{" "}
              <code className="bg-gray-100 px-1 rounded">configureStore()</code>
            </li>
            <li>
              <strong>Wrap with Provider:</strong> Provide store to component tree
              using <code className="bg-gray-100 px-1 rounded">Provider</code>
            </li>
            <li>
              <strong>Use Hooks:</strong> Access state with{" "}
              <code className="bg-gray-100 px-1 rounded">useSelector</code> and
              dispatch actions with{" "}
              <code className="bg-gray-100 px-1 rounded">useDispatch</code>
            </li>
            <li>
              <strong>Actions:</strong> Redux Toolkit automatically generates action
              creators from reducers
            </li>
          </ol>
        </div>

        {/* Provider wraps the app */}
        <Provider store={store}>
          <ReduxAppContent />
        </Provider>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Slice Definition Example:</h4>
          <pre className="text-xs text-gray-800 bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; },
  },
});

// Actions are auto-generated:
// counterSlice.actions.increment()
// counterSlice.actions.decrement()`}
          </pre>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">Redux Toolkit Key Points:</h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>Industry standard for large applications</li>
          <li>Redux Toolkit reduces boilerplate significantly</li>
          <li>Immer built-in - can write "mutating" logic in reducers</li>
          <li>DevTools support for debugging</li>
          <li>Middleware support (thunks, sagas, etc.)</li>
          <li>Time-travel debugging</li>
          <li>Requires Provider wrapper (unlike Zustand)</li>
          <li>More boilerplate than Zustand, but more powerful for complex apps</li>
        </ul>
      </div>
    </div>
  );
}

