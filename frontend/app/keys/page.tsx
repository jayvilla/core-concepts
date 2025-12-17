import Link from "next/link";
import WithoutKeysExample from "@/components/keys/WithoutKeysExample";
import WithKeysExample from "@/components/keys/WithKeysExample";
import IndexVsIdExample from "@/components/keys/IndexVsIdExample";
import KeysInteractiveExample from "@/components/keys/KeysInteractiveExample";

export default function KeysPage() {
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
              Keys in Lists
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Understanding why keys are important in React lists. Learn how keys
              help React efficiently update the DOM and avoid common bugs.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <WithoutKeysExample />
          <WithKeysExample />
          <IndexVsIdExample />
          <KeysInteractiveExample />
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
                <li>&quot;Why do we need keys in React lists?&quot;</li>
                <li>&quot;What happens if you don&apos;t provide a key?&quot;</li>
                <li>&quot;Can you use index as a key? When is it okay?&quot;</li>
                <li>&quot;What makes a good key?&quot;</li>
                <li>&quot;What happens if keys are not unique?&quot;</li>
                <li>&quot;How does React use keys for reconciliation?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Why keys matter:</strong> Keys help React identify which items
                  have changed, been added, or removed. They enable efficient DOM updates
                  through reconciliation. Without keys, React uses index (causes bugs when
                  list order changes).
                </li>
                <li>
                  <strong>What keys do:</strong> Keys are hints to React about element
                  identity. React uses them to match elements between renders. Same key =
                  same element (component instance is preserved).
                </li>
                <li>
                  <strong>Good keys:</strong> Unique, stable (don&apos;t change between
                  renders), predictable (not random). Best: database IDs, UUIDs. Good:
                  unique strings from data.
                </li>
                <li>
                  <strong>Bad keys:</strong> Index (when list can change), Math.random()
                  (changes every render), non-unique values (causes React warnings).
                </li>
                <li>
                  <strong>Index as key:</strong> Only okay if list is static (never
                  reordered), items have no state/refs, and items are never added/removed.
                  In practice, almost never the right choice.
                </li>
                <li>
                  <strong>Reconciliation:</strong> React compares old and new virtual DOM
                  trees. Keys help match elements. Without keys, React assumes element at
                  index 0 is the same element, even if data changed.
                </li>
                <li>
                  <strong>Common bugs without keys:</strong> Input values sticking to wrong
                  items, checkbox states mixing up, component state persisting incorrectly,
                  performance issues from unnecessary re-renders.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Quick Reference:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Key Type
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Good For
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Unique ID
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Most cases (best practice)
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        key={"{item.id}"}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Index
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Static lists only (rarely used)
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                        key={"{index}"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-red-600">
                        Random
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-red-600">
                        Never! (causes re-renders)
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-xs text-red-600">
                        key={"{Math.random()}"} ❌
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

