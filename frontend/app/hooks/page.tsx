import Link from "next/link";
import UseCounterExample from "@/components/hooks/UseCounterExample";
import UseLocalStorageExample from "@/components/hooks/UseLocalStorageExample";
import RulesOfHooksExample from "@/components/hooks/RulesOfHooksExample";
import CustomHookPatternsExample from "@/components/hooks/CustomHookPatternsExample";

export default function HooksPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hooks: Custom Hooks & Rules
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn how to create custom hooks and understand the rules of hooks.
              Master reusable stateful logic and avoid common pitfalls.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <UseCounterExample />
          <UseLocalStorageExample />
          <RulesOfHooksExample />
          <CustomHookPatternsExample />
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            💡 Interview Tips
          </h2>
          <div className="space-y-4 text-gray-900">
            <div>
              <p className="font-semibold mb-2">Common Questions:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>&quot;What are custom hooks?&quot;</li>
                <li>&quot;What are the rules of hooks?&quot;</li>
                <li>&quot;Why can&apos;t you call hooks conditionally?&quot;</li>
                <li>&quot;Can you create a custom hook?&quot;</li>
                <li>&quot;What&apos;s the difference between a custom hook and a regular function?&quot;</li>
                <li>&quot;When should you create a custom hook?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Custom Hooks:</strong> JavaScript functions that start with &quot;use&quot; and can call other hooks.
                  They allow you to extract component logic into reusable functions. Share stateful logic between components
                  without duplicating code.
                </li>
                <li>
                  <strong>Rules of Hooks:</strong> (1) Only call hooks at the top level - don&apos;t call them inside loops,
                  conditions, or nested functions. (2) Only call hooks from React function components or custom hooks.
                  These rules ensure React can correctly preserve state between renders by relying on call order.
                </li>
                <li>
                  <strong>Why rules matter:</strong> React uses the order in which hooks are called to track state. If hooks
                  are called conditionally, the order changes between renders, breaking React&apos;s internal tracking and
                  causing bugs.
                </li>
                <li>
                  <strong>Custom hook vs regular function:</strong> Custom hooks can call other hooks (useState, useEffect, etc.).
                  Regular functions cannot. Custom hooks follow the &quot;use&quot; naming convention.
                </li>
                <li>
                  <strong>When to create custom hooks:</strong> When you find yourself duplicating logic across components,
                  want to extract complex logic for readability, or need to share stateful logic. Common examples: useLocalStorage,
                  useFetch, useTimer, useToggle, useDebounce.
                </li>
                <li>
                  <strong>Return patterns:</strong> Custom hooks can return arrays (like useState) or objects (more readable
                  for multiple values). Use arrays for 1-2 values, objects for multiple related values.
                </li>
                <li>
                  <strong>Best practices:</strong> Start with &quot;use&quot; prefix, include proper dependencies in useEffect,
                  always clean up side effects, make hooks reusable and testable.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Common Custom Hook Patterns:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Pattern</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Use Case</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        State + Actions
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Toggle, counter, form state</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        useToggle(), useCounter()
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Side Effects
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Window size, scroll position, API calls</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        useWindowSize(), useFetch()
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Persistence
                      </td>
                      <td className="border border-gray-300 px-4 py-2">LocalStorage, sessionStorage</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        useLocalStorage(), useSessionStorage()
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Performance
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Debounce, throttle, memoization</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        useDebounce(), useThrottle()
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

