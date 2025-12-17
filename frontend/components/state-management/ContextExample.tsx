"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * CONTEXT API EXAMPLE
 *
 * Demonstrates Context API:
 * - Sharing state across component tree without prop drilling
 * - Provider pattern
 * - useContext hook
 * - When to use Context vs Props
 */

// Step 1: Create Context
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Step 2: Create Provider Component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Custom hook to use context (with error handling)
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Components that consume the context
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        theme === "light"
          ? "bg-white border-gray-300 text-gray-900"
          : "bg-gray-800 border-gray-600 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Header Component</h3>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-md font-medium ${
            theme === "light"
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-gray-900 hover:bg-gray-100"
          }`}
        >
          Toggle Theme ({theme})
        </button>
      </div>
      <p className="text-sm mt-2 opacity-80">
        This component has access to theme without props!
      </p>
    </div>
  );
}

function Content() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        theme === "light"
          ? "bg-white border-gray-300 text-gray-900"
          : "bg-gray-800 border-gray-600 text-white"
      }`}
    >
      <h3 className="font-bold text-lg mb-2">Content Component</h3>
      <p className="text-sm opacity-80">
        Current theme: <strong>{theme}</strong>
      </p>
      <p className="text-sm opacity-80 mt-2">
        This component also has access to theme without props!
      </p>
    </div>
  );
}

function Sidebar() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        theme === "light"
          ? "bg-white border-gray-300 text-gray-900"
          : "bg-gray-800 border-gray-600 text-white"
      }`}
    >
      <h3 className="font-bold text-lg mb-2">Sidebar Component</h3>
      <p className="text-sm opacity-80">
        All components can access theme through Context!
      </p>
    </div>
  );
}

// Parent component (doesn't need to pass props)
function AppContent() {
  return (
    <div className="space-y-4">
      <Header />
      <div className="grid md:grid-cols-2 gap-4">
        <Content />
        <Sidebar />
      </div>
    </div>
  );
}

export default function ContextExample() {
  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Context API Example
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">How It Works:</h3>
          <ol className="text-sm text-gray-900 space-y-2 list-decimal list-inside">
            <li>
              <strong>Create Context:</strong>{" "}
              <code className="bg-gray-100 px-1 rounded">createContext()</code>
            </li>
            <li>
              <strong>Create Provider:</strong> Wrap components with Provider,
              pass value prop
            </li>
            <li>
              <strong>Consume Context:</strong> Use{" "}
              <code className="bg-gray-100 px-1 rounded">useContext()</code> or
              custom hook
            </li>
            <li>
              <strong>No Prop Drilling:</strong> Components can access context
              without props
            </li>
          </ol>
        </div>

        {/* Provider wraps the app */}
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>

        {/* Code Structure */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">
            Component Tree Structure:
          </h4>
          <div className="text-xs font-mono text-gray-800 bg-white p-3 rounded border border-gray-300">
            <div>ThemeProvider</div>
            <div className="ml-4">
              <div>└─ AppContent</div>
              <div className="ml-4">
                <div>├─ Header (uses useTheme)</div>
                <div>├─ Content (uses useTheme)</div>
                <div>└─ Sidebar (uses useTheme)</div>
              </div>
            </div>
            <div className="mt-2 text-purple-700">
              All child components can access theme without props!
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-900">
          Context API Key Points:
        </h4>
        <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
          <li>
            Solves &quot;prop drilling&quot; problem (passing props through many
            levels)
          </li>
          <li>Use for data that needs to be accessible by many components</li>
          <li>Context updates cause all consumers to re-render</li>
          <li>Best for rarely changing values (theme, user auth, language)</li>
          <li>
            Don&apos;t use Context for frequently changing values (use state
            management library)
          </li>
          <li>
            Always create custom hooks for better error handling and TypeScript
            support
          </li>
        </ul>
      </div>
    </div>
  );
}
