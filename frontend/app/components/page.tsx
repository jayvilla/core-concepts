import ControlledComponent from "@/components/ControlledComponent";
import UncontrolledComponent from "@/components/UncontrolledComponent";
import ComparisonExample from "@/components/ComparisonExample";
import Link from "next/link";

export default function ComponentsPage() {
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
              Controlled vs Uncontrolled Components
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              A practical demonstration of React controlled and uncontrolled
              components. Perfect for understanding this common interview
              concept!
            </p>
          </div>
        </div>

        {/* Main Examples */}
        <div className="space-y-8 mb-8">
          <ControlledComponent />
          <UncontrolledComponent />
        </div>

        {/* Comparison */}
        <ComparisonExample />

        {/* Interview Tips */}
        <div className="mt-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            💡 Interview Tips
          </h2>
          <div className="space-y-3 text-gray-900">
            <div>
              <p className="font-semibold mb-1">Common Question:</p>
              <p className="text-sm">
                "What's the difference between controlled and uncontrolled
                components?"
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Key Answer Points:</p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Controlled:</strong> React state controls the input
                  value via{" "}
                  <code className="bg-gray-100 px-1 rounded">value</code> prop
                </li>
                <li>
                  <strong>Uncontrolled:</strong> DOM manages the input value,
                  accessed via{" "}
                  <code className="bg-gray-100 px-1 rounded">ref</code>
                </li>
                <li>Controlled gives more control but more re-renders</li>
                <li>Uncontrolled is simpler but less flexible</li>
                <li>
                  Most React forms use controlled components (React best
                  practice)
                </li>
                <li>
                  File inputs (
                  <code className="bg-gray-100 px-1 rounded">
                    &lt;input type="file" /&gt;
                  </code>
                  ) are always uncontrolled
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

