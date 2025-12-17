import Link from "next/link";
import LifecycleLogger from "@/components/lifecycle/LifecycleLogger";
import CleanupExample from "@/components/lifecycle/CleanupExample";
import MountUnmountExample from "@/components/lifecycle/MountUnmountExample";
import DependencyArrayExample from "@/components/lifecycle/DependencyArrayExample";

export default function LifecyclePage() {
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
              Component Lifecycle
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Understanding React component lifecycle with useEffect hooks.
              Learn when effects run, cleanup functions, and dependency arrays.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <LifecycleLogger />
          <DependencyArrayExample />
          <CleanupExample />
          <MountUnmountExample />
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
                <li>
                  "What's the difference between componentDidMount and useEffect?"
                </li>
                <li>"When does useEffect run?"</li>
                <li>"What is a cleanup function and when is it called?"</li>
                <li>
                  "What happens if you forget to include a dependency in the
                  dependency array?"
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>useEffect with []:</strong> Runs once after mount
                  (componentDidMount). Cleanup runs on unmount
                  (componentWillUnmount)
                </li>
                <li>
                  <strong>useEffect with [dep]:</strong> Runs after mount and
                  whenever dependency changes (componentDidUpdate for that
                  dependency). Cleanup runs before the next effect AND on
                  unmount
                </li>
                <li>
                  <strong>Cleanup function:</strong> Return a function from
                  useEffect. It runs before the next effect execution and when
                  component unmounts. Critical for preventing memory leaks
                </li>
                <li>
                  <strong>Missing dependencies:</strong> Can cause stale
                  closures, bugs, and unexpected behavior. Always include all
                  values from component scope that change over time
                </li>
                <li>
                  <strong>Effect order:</strong> Effects run after render, in
                  the order they're defined. Cleanups run in reverse order
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Class Component Equivalents:</p>
              <div className="text-sm bg-gray-50 p-3 rounded-md font-mono space-y-1">
                <div>
                  componentDidMount →{" "}
                  <code>{"useEffect(() => {}, [])"}</code>
                </div>
                <div>
                  componentDidUpdate →{" "}
                  <code>{"useEffect(() => {}, [dependency])"}</code>
                </div>
                <div>
                  componentWillUnmount →{" "}
                  <code>{"useEffect(() => { return () => {} }, [])"}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

