import Link from "next/link";
import UseStateExample from "@/components/state-management/UseStateExample";
import UseReducerExample from "@/components/state-management/UseReducerExample";
import ContextExample from "@/components/state-management/ContextExample";
import ZustandExample from "@/components/state-management/ZustandExample";
import ReduxExample from "@/components/state-management/ReduxExample";
import StateComparison from "@/components/state-management/StateComparison";

export default function StateManagementPage() {
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
              State Management
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Understanding useState, useReducer, Context API, Zustand, and Redux. Learn when to
              use each approach for effective state management in React.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <UseStateExample />
          <UseReducerExample />
          <ContextExample />
          <ZustandExample />
          <ReduxExample />
          <StateComparison />
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
                <li>&quot;What&apos;s the difference between useState and useReducer?&quot;</li>
                <li>&quot;When would you use Context API?&quot;</li>
                <li>&quot;How do you avoid prop drilling?&quot;</li>
                <li>&quot;When is useReducer better than useState?&quot;</li>
                <li>&quot;What are the drawbacks of Context API?&quot;</li>
                <li>&quot;Can you use useReducer with Context?&quot;</li>
                <li>&quot;When should I use Zustand vs Redux?&quot;</li>
                <li>&quot;What&apos;s the difference between Zustand and Redux?&quot;</li>
                <li>&quot;Do I need a Provider with Zustand?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>useState:</strong> Simple hook for local component state. Returns [state, setState].
                  Use for simple state values. Initial value only used on first render. Always use functional
                  updates when new state depends on previous state.
                </li>
                <li>
                  <strong>useReducer:</strong> Better for complex state logic. Follows reducer pattern (state,
                  action). All state updates in one place (reducer function). Easier to test and debug.
                  dispatch function is stable. Use when state has complex update logic or multiple related values.
                </li>
                <li>
                  <strong>Context API:</strong> Shares state across component tree without prop drilling. Create
                  context with createContext(), wrap with Provider, consume with useContext(). Best for rarely
                  changing global values. All consumers re-render when context value changes. Can combine with
                  useState or useReducer.
                </li>
                <li>
                  <strong>Zustand:</strong> Minimal boilerplate state management library. No Provider needed. Use
                  selectors to subscribe to specific state. Perfect for medium-sized apps. Great TypeScript support.
                  Smaller bundle than Redux. Use when you want simplicity without Context limitations.
                </li>
                <li>
                  <strong>Redux Toolkit:</strong> Industry standard for large applications. Requires Provider wrapper.
                  Excellent DevTools and time-travel debugging. Rich middleware ecosystem. More boilerplate than
                  Zustand but more powerful. Use for complex apps, large teams, or when you need advanced features.
                </li>
                <li>
                  <strong>Choosing the Right Tool:</strong> Simple local state → useState. Complex state logic →
                  useReducer. Sharing across many components → Context or Zustand. Large/complex apps → Redux Toolkit.
                  Medium apps wanting simplicity → Zustand.
                </li>
                <li>
                  <strong>Best Practices:</strong> Always create custom hooks for Context (with error handling).
                  Don&apos;t put frequently changing values in Context. Use functional updates for useState when
                  depending on previous state. Keep reducers pure (no side effects). Use selectors in Zustand/Redux
                  for optimized re-renders.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Comparison Table:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Aspect</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">useState</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">useReducer</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Context API</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Zustand</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Redux</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Use Case
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Simple local state</td>
                      <td className="border border-gray-300 px-4 py-2">Complex state logic</td>
                      <td className="border border-gray-300 px-4 py-2">Shared state across tree</td>
                      <td className="border border-gray-300 px-4 py-2">Medium apps, global state</td>
                      <td className="border border-gray-300 px-4 py-2">Large apps, complex state</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Complexity
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Low</td>
                      <td className="border border-gray-300 px-4 py-2">Medium</td>
                      <td className="border border-gray-300 px-4 py-2">Medium-High</td>
                      <td className="border border-gray-300 px-4 py-2">Low-Medium</td>
                      <td className="border border-gray-300 px-4 py-2">High</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Boilerplate
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Minimal</td>
                      <td className="border border-gray-300 px-4 py-2">Moderate</td>
                      <td className="border border-gray-300 px-4 py-2">Moderate</td>
                      <td className="border border-gray-300 px-4 py-2">Minimal</td>
                      <td className="border border-gray-300 px-4 py-2">Moderate-High</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Testing
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Easy</td>
                      <td className="border border-gray-300 px-4 py-2">Very Easy (pure reducer)</td>
                      <td className="border border-gray-300 px-4 py-2">Can be tricky</td>
                      <td className="border border-gray-300 px-4 py-2">Easy</td>
                      <td className="border border-gray-300 px-4 py-2">Very Easy</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Scope
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Component</td>
                      <td className="border border-gray-300 px-4 py-2">Component</td>
                      <td className="border border-gray-300 px-4 py-2">Component tree</td>
                      <td className="border border-gray-300 px-4 py-2">Global</td>
                      <td className="border border-gray-300 px-4 py-2">Global</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Provider Required
                      </td>
                      <td className="border border-gray-300 px-4 py-2">No</td>
                      <td className="border border-gray-300 px-4 py-2">No</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                      <td className="border border-gray-300 px-4 py-2">No</td>
                      <td className="border border-gray-300 px-4 py-2">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Bundle Size
                      </td>
                      <td className="border border-gray-300 px-4 py-2">0 (built-in)</td>
                      <td className="border border-gray-300 px-4 py-2">0 (built-in)</td>
                      <td className="border border-gray-300 px-4 py-2">0 (built-in)</td>
                      <td className="border border-gray-300 px-4 py-2">~1KB</td>
                      <td className="border border-gray-300 px-4 py-2">~15KB</td>
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

