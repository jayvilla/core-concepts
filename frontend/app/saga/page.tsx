import Link from "next/link";

export default function SagaPage() {
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
              Saga Pattern
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn the Saga pattern for managing distributed transactions. Understand orchestration vs choreography approaches for maintaining data consistency across microservices.
            </p>
          </div>
        </div>

        {/* API Information */}
        <div className="mb-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            📡 API Endpoints
          </h2>
          <p className="text-gray-900 mb-4">
            The backend API demonstrates Saga patterns. Try these endpoints:
          </p>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Orchestration Saga (Create Order):</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                POST http://localhost:8000/concepts/saga/orders/orchestration
              </code>
              <p className="text-gray-700 mt-2">Central orchestrator coordinates all steps</p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Choreography Saga (Create Order):</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                POST http://localhost:8000/concepts/saga/orders/choreography
              </code>
              <p className="text-gray-700 mt-2">Services coordinate through events</p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Get Saga Status:</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                GET http://localhost:8000/concepts/saga/orders/:orderId/status
              </code>
              <p className="text-gray-700 mt-2">Check the status of a saga transaction</p>
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
                <li>&quot;What is the Saga pattern?&quot;</li>
                <li>&quot;How does Saga handle distributed transactions?&quot;</li>
                <li>&quot;What&apos;s the difference between orchestration and choreography?&quot;</li>
                <li>&quot;How do you handle failures in a Saga?&quot;</li>
                <li>&quot;When would you use Saga vs two-phase commit?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Saga Pattern:</strong> Manages distributed transactions by breaking them into local transactions with compensating actions. Each step has a corresponding compensation if the saga fails.
                </li>
                <li>
                  <strong>Orchestration:</strong> Central coordinator (orchestrator) manages the saga flow. Makes decisions, calls services, handles compensations. Easier to understand and debug.
                </li>
                <li>
                  <strong>Choreography:</strong> Services coordinate through events. No central coordinator. More decentralized but harder to track and debug. Better for simple flows.
                </li>
                <li>
                  <strong>Compensating Actions:</strong> Reverse operations that undo the effects of completed steps. Must be idempotent. Example: refund payment, release inventory.
                </li>
                <li>
                  <strong>When to Use:</strong> Long-running transactions, microservices, when ACID transactions aren&apos;t feasible. Trade-off: eventual consistency instead of strong consistency.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

