"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

/**
 * REACT WITH TYPESCRIPT
 *
 * Demonstrates TypeScript with React:
 * - Typing props
 * - Typing state
 * - Typing refs
 * - Typing event handlers
 * - Typing children
 * - Common patterns
 */

// Typing component props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

function TypedButton({ label, onClick, disabled = false, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md ${
        variant === "primary"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-500 text-white hover:bg-gray-600"
      } disabled:bg-gray-300 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
}

// Typing component with children
interface CardProps {
  title: string;
  children: ReactNode;
}

function TypedCard({ title, children }: CardProps) {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg">
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      {children}
    </div>
  );
}

// Typing form component
interface FormData {
  name: string;
  email: string;
  age: number;
}

export default function ReactTypeScriptExample() {
  // Typing state
  const [count, setCount] = useState<number>(0);
  const [user, setUser] = useState<{ name: string; age: number } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: 0,
  });

  // Typing refs
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // Typing event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked:", e.currentTarget.textContent);
  };

  useEffect(() => {
    // Typed ref access
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="border-2 border-indigo-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        React with TypeScript
      </h2>

      <div className="space-y-6">
        {/* Typing Props */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Typing Component Props:</h3>
          <pre className="text-xs bg-white p-3 rounded border border-indigo-300 overflow-x-auto mb-3">
            <code className="text-gray-800">
{`interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

function Button({ label, onClick, disabled, variant }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}`}
            </code>
          </pre>
          <div className="flex gap-2">
            <TypedButton
              label="Primary Button"
              onClick={() => setCount((prev) => prev + 1)}
              variant="primary"
            />
            <TypedButton
              label="Secondary Button"
              onClick={() => setCount((prev) => prev - 1)}
              variant="secondary"
            />
          </div>
          <p className="text-sm text-gray-900 mt-2">Count: {count}</p>
        </div>

        {/* Typing State */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Typing State:</h3>
          <pre className="text-xs bg-white p-3 rounded border border-indigo-300 overflow-x-auto mb-3">
            <code className="text-gray-800">
{`// Primitive state
const [count, setCount] = useState<number>(0);

// Object state
const [user, setUser] = useState<{ name: string; age: number } | null>(null);

// With interface
interface FormData {
  name: string;
  email: string;
}
const [formData, setFormData] = useState<FormData>({ name: "", email: "" });`}
            </code>
          </pre>
          <div className="p-3 bg-white border border-indigo-200 rounded">
            <p className="text-sm text-gray-900">
              <strong>Count:</strong> {count} (type: number)
            </p>
            <p className="text-sm text-gray-900">
              <strong>User:</strong> {user ? `${user.name}, ${user.age}` : "null"}
            </p>
          </div>
        </div>

        {/* Typing Event Handlers */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Typing Event Handlers:</h3>
          <pre className="text-xs bg-white p-3 rounded border border-indigo-300 overflow-x-auto mb-3">
            <code className="text-gray-800">
{`// Input change
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// Form submit
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// Button click
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget);
};`}
            </code>
          </pre>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              ref={inputRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <button
              type="submit"
              onClick={handleClick}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Typing Refs */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Typing Refs:</h3>
          <pre className="text-xs bg-white p-3 rounded border border-indigo-300 overflow-x-auto">
            <code className="text-gray-800">
{`// HTML element ref
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);

// Access (TypeScript knows it might be null)
if (inputRef.current) {
  inputRef.current.focus(); // ✅ TypeScript knows .focus() exists
}`}
            </code>
          </pre>
        </div>

        {/* Typing Children */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-bold text-indigo-900 mb-3">Typing Children:</h3>
          <pre className="text-xs bg-white p-3 rounded border border-indigo-300 overflow-x-auto mb-3">
            <code className="text-gray-800">
{`import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode; // Can be any renderable content
}

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}`}
            </code>
          </pre>
          <TypedCard title="Example Card">
            <p className="text-sm text-gray-900">This is the card content (children prop)</p>
          </TypedCard>
        </div>

        {/* Common Patterns */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Common TypeScript + React Patterns:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <code className="bg-gray-100 px-1 rounded">React.FC</code> or function components with typed props
            </li>
            <li>
              <code className="bg-gray-100 px-1 rounded">useState&lt;Type&gt;</code> for typed state
            </li>
            <li>
              <code className="bg-gray-100 px-1 rounded">useRef&lt;HTMLElement&gt;</code> for typed refs
            </li>
            <li>
              <code className="bg-gray-100 px-1 rounded">React.ChangeEvent&lt;HTMLInputElement&gt;</code> for events
            </li>
            <li>
              <code className="bg-gray-100 px-1 rounded">ReactNode</code> for children prop
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

