import Link from "next/link";
import DebounceExample from "@/components/debounce-throttle/DebounceExample";
import ThrottleExample from "@/components/debounce-throttle/ThrottleExample";
import DebounceThrottleComparison from "@/components/debounce-throttle/DebounceThrottleComparison";
import RealWorldExamples from "@/components/debounce-throttle/RealWorldExamples";

export default function DebounceThrottlePage() {
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
              Debounce vs Throttle
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn the difference between debounce and throttle. Understand when to use each
              technique to optimize performance and improve user experience.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <DebounceExample />
          <ThrottleExample />
          <DebounceThrottleComparison />
          <RealWorldExamples />
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
                <li>&quot;What is the difference between debounce and throttle?&quot;</li>
                <li>&quot;When would you use debounce vs throttle?&quot;</li>
                <li>&quot;Can you implement debounce from scratch?&quot;</li>
                <li>&quot;Can you implement throttle from scratch?&quot;</li>
                <li>&quot;What are real-world use cases for each?&quot;</li>
                <li>&quot;How do debounce and throttle improve performance?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Debounce:</strong> Delays function execution until after a period of
                  inactivity. Resets timer on each call. Only executes once after user stops
                  calling. Use for: search inputs, API calls, form validation, auto-save. Think:
                  &quot;Wait until done.&quot;
                </li>
                <li>
                  <strong>Throttle:</strong> Limits function execution to at most once per time
                  period. Executes immediately on first call, then ignores calls until period ends.
                  Guarantees execution at regular intervals. Use for: scroll events, mouse move,
                  resize, button clicks. Think: &quot;Execute periodically.&quot;
                </li>
                <li>
                  <strong>Key Difference:</strong> Debounce waits for inactivity (resets timer),
                  throttle limits execution rate (guarantees regular execution). Debounce = &quot;do
                  it when they&apos;re done&quot;, Throttle = &quot;do it regularly while
                  happening&quot;.
                </li>
                <li>
                  <strong>Implementation:</strong> Debounce uses setTimeout and clearTimeout to reset
                  timer. Throttle uses timestamp comparison to check if enough time has passed.
                  Both can be implemented as hooks or utility functions.
                </li>
                <li>
                  <strong>Performance Benefits:</strong> Both reduce function call frequency.
                  Debounce prevents unnecessary calls (e.g., API calls while typing). Throttle
                  ensures calls happen at manageable rate (e.g., scroll updates). Both improve
                  performance and user experience.
                </li>
                <li>
                  <strong>Real-World Examples:</strong> Debounce: search autocomplete, form
                  validation, auto-save. Throttle: scroll position tracking, resize handlers,
                  mouse move tracking, button click prevention, infinite scroll loading.
                </li>
                <li>
                  <strong>Decision Rule:</strong> Need to wait until user stops? → Debounce. Need
                  regular updates while event is happening? → Throttle. Final value matters? →
                  Debounce. Intermediate values matter? → Throttle.
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
                      <th className="border border-gray-300 px-4 py-2 text-left">Debounce</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Throttle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Execution
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        After inactivity period
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        At regular intervals
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Timer Behavior
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Resets on each call</td>
                      <td className="border border-gray-300 px-4 py-2">
                        Executes if enough time passed
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Guarantees Execution
                      </td>
                      <td className="border border-gray-300 px-4 py-2">No (only if stops)</td>
                      <td className="border border-gray-300 px-4 py-2">Yes (regular intervals)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Best For
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Search, API calls, validation
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Scroll, resize, mouse move
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

