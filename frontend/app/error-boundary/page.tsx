import Link from "next/link";
import ErrorBoundaryExample from "@/components/error-boundary/ErrorBoundaryExample";
import ErrorBoundaryLimitationsExample from "@/components/error-boundary/ErrorBoundaryLimitationsExample";
import ErrorBoundaryBestPracticesExample from "@/components/error-boundary/ErrorBoundaryBestPracticesExample";

export default function ErrorBoundaryPage() {
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
              Error Boundaries
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn how to handle errors gracefully in React. Understand Error Boundaries,
              what they catch, their limitations, and best practices for error handling.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <ErrorBoundaryExample />
          <ErrorBoundaryLimitationsExample />
          <ErrorBoundaryBestPracticesExample />
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
                <li>&quot;What is an Error Boundary?&quot;</li>
                <li>&quot;How do you create an Error Boundary?&quot;</li>
                <li>&quot;What errors do Error Boundaries catch?&quot;</li>
                <li>&quot;What errors don&apos;t Error Boundaries catch?&quot;</li>
                <li>&quot;Why must Error Boundaries be class components?&quot;</li>
                <li>&quot;How do you handle errors in event handlers?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>What it is:</strong> React component that catches JavaScript errors
                  anywhere in child component tree. Displays fallback UI instead of crashing entire
                  app. Must be a class component (no hooks equivalent as of React 18).
                </li>
                <li>
                  <strong>How to create:</strong> Class component that implements
                  getDerivedStateFromError() and/or componentDidCatch(). getDerivedStateFromError()
                  updates state to show fallback UI. componentDidCatch() logs error information.
                </li>
                <li>
                  <strong>What they catch:</strong> Errors during rendering, errors in lifecycle
                  methods, errors in constructors. Basically, errors in the render phase of React.
                </li>
                <li>
                  <strong>What they don&apos;t catch:</strong> Errors in event handlers (use
                  try/catch), errors in async code like setTimeout/promises (use try/catch or
                  .catch()), errors during server-side rendering, errors thrown in the Error
                  Boundary itself.
                </li>
                <li>
                  <strong>Why class components:</strong> Error Boundaries use lifecycle methods
                  (getDerivedStateFromError, componentDidCatch) which are only available in class
                  components. React team is working on hooks equivalent but not available yet.
                </li>
                <li>
                  <strong>Best practices:</strong> Place at strategic points (route level, feature
                  level). Use multiple boundaries to isolate failures. Log errors to error
                  reporting service. Provide helpful fallback UI with recovery options. Don&apos;t
                  expose technical details to users.
                </li>
                <li>
                  <strong>Error handling strategy:</strong> Error Boundaries for render errors,
                  try/catch for event handlers and async code. Combine both for comprehensive error
                  handling.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Lifecycle Methods:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Method</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">When Called</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        getDerivedStateFromError
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Update state to show fallback UI
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        During render phase (synchronous)
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        componentDidCatch
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Log error, report to service
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        During commit phase (can have side effects)
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

