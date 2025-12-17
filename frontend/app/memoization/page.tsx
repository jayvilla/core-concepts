import Link from "next/link";
import UseMemoExample from "@/components/memoization/UseMemoExample";
import UseCallbackExample from "@/components/memoization/UseCallbackExample";
import ReactMemoExample from "@/components/memoization/ReactMemoExample";
import MemoizationComparison from "@/components/memoization/MemoizationComparison";

export default function MemoizationPage() {
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
              Memoization: useMemo, useCallback, React.memo
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn how to optimize React performance with memoization. Understand
              when and how to use useMemo, useCallback, and React.memo effectively.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <UseMemoExample />
          <UseCallbackExample />
          <ReactMemoExample />
          <MemoizationComparison />
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
                <li>&quot;What is useMemo and when would you use it?&quot;</li>
                <li>&quot;What&apos;s the difference between useMemo and useCallback?&quot;</li>
                <li>&quot;When should you use React.memo?&quot;</li>
                <li>&quot;How does memoization work in React?&quot;</li>
                <li>&quot;Can you overuse memoization?&quot;</li>
                <li>&quot;Why doesn&apos;t useCallback help without React.memo?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>useMemo:</strong> Memoizes computed values. Only recalculates when
                  dependencies change. Use for expensive calculations, derived values, or creating
                  stable object/array references. Returns the memoized value.
                </li>
                <li>
                  <strong>useCallback:</strong> Memoizes functions. Returns the same function
                  reference if dependencies haven&apos;t changed. Only useful when passing functions
                  to React.memo components or as dependencies to other hooks. Returns the memoized
                  function.
                </li>
                <li>
                  <strong>React.memo:</strong> Memoizes component rendering. Prevents re-render if
                  props haven&apos;t changed (shallow comparison). Only re-renders when props actually
                  change. Use for expensive components that receive stable props.
                </li>
                <li>
                  <strong>When to use:</strong> useMemo for expensive values, useCallback for functions
                  passed to memoized components, React.memo for expensive components. Don&apos;t
                  overuse - memoization has overhead and only helps when there&apos;s actual performance
                  benefit.
                </li>
                <li>
                  <strong>Dependencies:</strong> All three rely on dependency arrays. Missing
                  dependencies causes stale values/functions. Include all values from component scope
                  that are used inside the memoized code.
                </li>
                <li>
                  <strong>Working together:</strong> React.memo + useCallback work together - memoized
                  component won&apos;t re-render if function prop reference is stable (useCallback).
                  useMemo can create stable object/array props for React.memo components.
                </li>
                <li>
                  <strong>Shallow comparison:</strong> React.memo does shallow comparison of props.
                  For object/array props, ensure stable references (useMemo) or provide custom
                  comparison function.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Performance Considerations:</p>
              <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
                <li>
                  Memoization has overhead - only use when there&apos;s actual performance benefit
                </li>
                <li>
                  Profile first, optimize second - don&apos;t prematurely optimize
                </li>
                <li>
                  useCallback without React.memo provides no benefit
                </li>
                <li>
                  Creating new objects/arrays in render breaks memoization (use useMemo for these)
                </li>
                <li>
                  Simple calculations don&apos;t need useMemo - overhead isn&apos;t worth it
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

