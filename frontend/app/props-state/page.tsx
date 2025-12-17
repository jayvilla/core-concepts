import Link from "next/link";
import PropsExample from "@/components/props-state/PropsExample";
import StateExample from "@/components/props-state/StateExample";
import PropsStateComparison from "@/components/props-state/PropsStateComparison";
import PropsStateFlow from "@/components/props-state/PropsStateFlow";

export default function PropsStatePage() {
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
              Props vs State
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Understanding the fundamental difference between props and state in React.
              Learn when to use each, how data flows, and best practices.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <PropsExample />
          <StateExample />
          <PropsStateComparison />
          <PropsStateFlow />
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
                <li>"What's the difference between props and state?"</li>
                <li>"When should you use props vs state?"</li>
                <li>"Can you modify props in a child component?"</li>
                <li>"How does data flow in React?"</li>
                <li>"How do you update parent state from a child component?"</li>
                <li>"What happens when props change?"</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Props:</strong> Passed from parent to child, read-only (immutable),
                  changes cause child to re-render. Flow DOWN the component tree.
                </li>
                <li>
                  <strong>State:</strong> Managed internally in a component, mutable (can be
                  updated with setState), changes cause component to re-render. Private to
                  the component.
                </li>
                <li>
                  <strong>Cannot modify props:</strong> Props are immutable. If you need to
                  change data, it must be done in the parent component (the owner of the
                  data).
                </li>
                <li>
                  <strong>Lifting State Up:</strong> If multiple components need the same
                  data, lift state to their common parent and pass it down as props.
                </li>
                <li>
                  <strong>Callback Pattern:</strong> To update parent state from child, pass
                  a callback function as a prop. Child calls the callback, parent updates
                  state.
                </li>
                <li>
                  <strong>Unidirectional Data Flow:</strong> Data flows down (props), events
                  flow up (callbacks). This makes React predictable and easier to debug.
                </li>
                <li>
                  <strong>Props vs State Rule of Thumb:</strong> If data is passed from
                  parent → use props. If data is internal to component → use state.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Quick Comparison Table:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Aspect</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Props</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Mutable?
                      </td>
                      <td className="border border-gray-300 px-4 py-2">No (read-only)</td>
                      <td className="border border-gray-300 px-4 py-2">Yes (via setState)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Owner
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Parent component</td>
                      <td className="border border-gray-300 px-4 py-2">Component itself</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Initial Value
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Passed from parent
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        useState(defaultValue)
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Data Flow
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Down (parent → child)</td>
                      <td className="border border-gray-300 px-4 py-2">
                        Stays in component
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Use When
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Data comes from parent, needs to be shared
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Component-specific data, user interactions
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

