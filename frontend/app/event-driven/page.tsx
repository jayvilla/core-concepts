import Link from "next/link";

export default function EventDrivenPage() {
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
              Event-Driven Architecture
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Learn event-driven architecture patterns with NestJS EventEmitter. Understand how to decouple components, handle asynchronous events, and build scalable systems.
            </p>
          </div>
        </div>

        {/* API Information */}
        <div className="mb-8 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            📡 API Endpoints
          </h2>
          <p className="text-gray-900 mb-4">
            The backend API demonstrates event-driven patterns. Try these endpoints:
          </p>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Create User (emits event):</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                POST http://localhost:8000/concepts/event-driven/users
              </code>
              <p className="text-gray-700 mt-2">Emits &quot;user.created&quot; event that triggers handlers</p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Create Order (emits event):</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                POST http://localhost:8000/concepts/event-driven/orders
              </code>
              <p className="text-gray-700 mt-2">Emits &quot;order.placed&quot; event</p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Process Payment (emits event):</p>
              <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
                POST http://localhost:8000/concepts/event-driven/payments
              </code>
              <p className="text-gray-700 mt-2">Emits &quot;payment.processed&quot; event</p>
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
                <li>&quot;What is event-driven architecture?&quot;</li>
                <li>&quot;What are the benefits of event-driven systems?&quot;</li>
                <li>&quot;How does event-driven differ from request-response?&quot;</li>
                <li>&quot;What is the difference between events and messages?&quot;</li>
                <li>&quot;How do you handle event ordering and idempotency?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Event-Driven Architecture:</strong> System design where components communicate through events. Producers emit events, consumers react to them. Decouples components and enables asynchronous processing.
                </li>
                <li>
                  <strong>Benefits:</strong> Loose coupling, scalability, flexibility, real-time processing, better error isolation. Components don&apos;t need to know about each other directly.
                </li>
                <li>
                  <strong>Event vs Request-Response:</strong> Events are fire-and-forget, asynchronous. Request-response is synchronous, requires immediate response. Events enable eventual consistency.
                </li>
                <li>
                  <strong>Event Handlers:</strong> Listen for specific events and perform actions. Can be multiple handlers for same event. Handlers should be idempotent when possible.
                </li>
                <li>
                  <strong>Best Practices:</strong> Use correlation IDs for tracing, handle failures gracefully, ensure idempotency, use event versioning, implement proper error handling and retries.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

