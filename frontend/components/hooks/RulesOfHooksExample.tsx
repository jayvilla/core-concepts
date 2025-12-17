"use client";

import { useState, useEffect } from "react";

/**
 * RULES OF HOOKS EXAMPLE
 *
 * Demonstrates the Rules of Hooks:
 * 1. Only call hooks at the top level (not inside loops, conditions, or nested functions)
 * 2. Only call hooks from React functions (components or custom hooks)
 * 
 * Shows what happens when you break these rules
 */

export default function RulesOfHooksExample() {
  const [showExamples, setShowExamples] = useState(true);
  const [count, setCount] = useState(0);

  // ✅ CORRECT: Hooks at top level
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Rules of Hooks
      </h2>

      <div className="space-y-6">
        {/* Rule 1 */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">
            Rule 1: Only Call Hooks at the Top Level
          </h3>
          <p className="text-sm text-gray-900 mb-3">
            Don&apos;t call hooks inside loops, conditions, or nested functions. Always call them at the top level of your React function.
          </p>

          <div className="space-y-4">
            {/* Wrong Examples */}
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <h4 className="font-semibold text-red-900 mb-2">❌ Wrong:</h4>
              <pre className="text-xs bg-white p-2 rounded border border-red-300 overflow-x-auto">
                <code className="text-gray-800">
{`// ❌ Inside condition
if (condition) {
  const [state, setState] = useState(0);
}

// ❌ Inside loop
for (let i = 0; i < 10; i++) {
  const [state, setState] = useState(0);
}

// ❌ Inside nested function
function handleClick() {
  const [state, setState] = useState(0);
}`}
                </code>
              </pre>
            </div>

            {/* Correct Examples */}
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <h4 className="font-semibold text-green-900 mb-2">✅ Correct:</h4>
              <pre className="text-xs bg-white p-2 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`// ✅ At top level
function MyComponent() {
  const [state, setState] = useState(0); // ✅ Top level
  const [count, setCount] = useState(0); // ✅ Top level
  
  useEffect(() => { // ✅ Top level
    // ...
  }, []);
  
  if (condition) {
    // You can use state here, but don't call hooks here
    return <div>{state}</div>;
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Rule 2 */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">
            Rule 2: Only Call Hooks from React Functions
          </h3>
          <p className="text-sm text-gray-900 mb-3">
            Only call hooks from:
          </p>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside mb-3">
            <li>React function components</li>
            <li>Custom hooks (functions starting with &quot;use&quot;)</li>
          </ul>

          <div className="space-y-4">
            {/* Wrong Examples */}
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <h4 className="font-semibold text-red-900 mb-2">❌ Wrong:</h4>
              <pre className="text-xs bg-white p-2 rounded border border-red-300 overflow-x-auto">
                <code className="text-gray-800">
{`// ❌ Regular JavaScript function
function regularFunction() {
  const [state, setState] = useState(0); // Error!
}

// ❌ Event handler
const handleClick = () => {
  const [state, setState] = useState(0); // Error!
};

// ❌ Class component
class MyClass extends Component {
  render() {
    const [state, setState] = useState(0); // Error!
  }
}`}
                </code>
              </pre>
            </div>

            {/* Correct Examples */}
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <h4 className="font-semibold text-green-900 mb-2">✅ Correct:</h4>
              <pre className="text-xs bg-white p-2 rounded border border-green-300 overflow-x-auto">
                <code className="text-gray-800">
{`// ✅ React function component
function MyComponent() {
  const [state, setState] = useState(0); // ✅ OK
}

// ✅ Custom hook
function useCustomHook() {
  const [state, setState] = useState(0); // ✅ OK
  return state;
}

// ✅ Using hook inside component
function MyComponent() {
  const value = useCustomHook(); // ✅ OK
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Why These Rules Exist */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-3">
            Why These Rules Exist:
          </h3>
          <ul className="text-sm text-gray-900 space-y-2 list-disc list-inside">
            <li>
              <strong>React relies on call order:</strong> React uses the order in which hooks are called to track state between renders. If hooks are called conditionally, the order changes between renders, breaking React&apos;s internal tracking.
            </li>
            <li>
              <strong>State preservation:</strong> When you call hooks in the same order every render, React can correctly preserve state and effects.
            </li>
            <li>
              <strong>Performance:</strong> Consistent hook order allows React to optimize re-renders and effect cleanup.
            </li>
          </ul>
        </div>

        {/* Example with conditional logic */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">
            Handling Conditional Logic:
          </h3>
          <p className="text-sm text-gray-900 mb-3">
            Need conditional behavior? Call hooks unconditionally, then use conditionals in the logic:
          </p>
          <pre className="text-xs bg-white p-3 rounded border border-blue-300 overflow-x-auto">
            <code className="text-gray-800">
{`function MyComponent({ shouldTrack }) {
  // ✅ Always call hooks at top level
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  // ✅ Use conditionals in the effect, not to call the hook
  useEffect(() => {
    if (shouldTrack) {
      // Do tracking logic
    }
  }, [shouldTrack]);
  
  // ✅ Conditional rendering is fine
  return shouldTrack ? <div>{count}</div> : null;
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

