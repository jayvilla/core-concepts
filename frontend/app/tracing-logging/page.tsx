import Link from "next/link";

export default function TracingLoggingPage() {
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
              Tracing & Logging
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn distributed tracing and structured logging patterns. Understand correlation IDs, request logging, error tracking, and how to debug distributed systems effectively.
            </p>
          </div>
        </div>

        {/* API Information */}
        <div className="mb-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            📡 API Endpoints
          </h2>
          <p className="text-gray-900 mb-4">
            The backend API demonstrates tracing and logging. Try these endpoints:
          </p>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Perform Operation (with logging):</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                GET http://localhost:8000/concepts/tracing-logging/operation/:name
              </code>
              <p className="text-gray-700 mt-2">Logs include correlation ID for tracing</p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Get Logs:</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                GET http://localhost:8000/concepts/tracing-logging/logs
              </code>
              <p className="text-gray-700 mt-2">Retrieve structured logs</p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Test Error Handling:</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                GET http://localhost:8000/concepts/tracing-logging/error
              </code>
              <p className="text-gray-700 mt-2">See how errors are logged and traced</p>
            </div>
          </div>
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
                <li>&quot;What is distributed tracing?&quot;</li>
                <li>&quot;What are correlation IDs and why are they important?&quot;</li>
                <li>&quot;How do you debug issues in microservices?&quot;</li>
                <li>&quot;What is structured logging?&quot;</li>
                <li>&quot;How do you trace a request across multiple services?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Distributed Tracing:</strong> Technique to track requests across multiple services. Uses trace IDs and span IDs to create a request flow graph. Essential for debugging microservices.
                </li>
                <li>
                  <strong>Correlation IDs:</strong> Unique identifier passed through all service calls. Allows tracking a single request across the entire system. Should be generated at entry point and propagated.
                </li>
                <li>
                  <strong>Structured Logging:</strong> Logs in structured format (JSON) instead of plain text. Enables better searching, filtering, and analysis. Includes context like correlation ID, timestamp, level, service name.
                </li>
                <li>
                  <strong>Log Levels:</strong> ERROR (critical issues), WARN (potential problems), INFO (general info), DEBUG (detailed debugging). Use appropriate levels for different scenarios.
                </li>
                <li>
                  <strong>Best Practices:</strong> Always include correlation IDs, use structured logging, log at service boundaries, include request/response data (sanitized), implement log aggregation, set up alerts for errors.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

