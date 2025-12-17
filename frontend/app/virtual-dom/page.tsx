import Link from "next/link";
import VirtualDOMExplanation from "@/components/virtual-dom/VirtualDOMExplanation";
import ReconciliationExample from "@/components/virtual-dom/ReconciliationExample";
import DiffingAlgorithmExample from "@/components/virtual-dom/DiffingAlgorithmExample";
import BatchingExample from "@/components/virtual-dom/BatchingExample";

export default function VirtualDOMPage() {
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
              Virtual DOM & Reconciliation
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Understand how React works under the hood. Learn about Virtual DOM,
              reconciliation, diffing algorithms, and batching for optimal performance.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <VirtualDOMExplanation />
          <ReconciliationExample />
          <DiffingAlgorithmExample />
          <BatchingExample />
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
                <li>&quot;What is Virtual DOM?&quot;</li>
                <li>&quot;How does React&apos;s reconciliation work?&quot;</li>
                <li>&quot;What is the diffing algorithm?&quot;</li>
                <li>&quot;Why is React fast if it re-renders everything?&quot;</li>
                <li>&quot;How does React batch updates?&quot;</li>
                <li>&quot;What happens when state changes in React?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Virtual DOM:</strong> JavaScript object representation of the real DOM.
                  React uses Virtual DOM as an intermediate layer. It&apos;s faster to compare and
                  update Virtual DOM than real DOM. React then efficiently updates only changed
                  parts of real DOM.
                </li>
                <li>
                  <strong>Reconciliation:</strong> Process of comparing old Virtual DOM tree with
                  new one and determining how to update real DOM. React uses diffing algorithm to
                  find minimal set of changes needed. React tries to reuse DOM nodes when possible.
                </li>
                <li>
                  <strong>Diffing Algorithm:</strong> React uses heuristics: (1) Elements of
                  different types → replace entire tree, (2) Elements of same type → update props
                  only, (3) Component elements → update props, keep instance, (4) Keys in lists →
                  match by key to identify moved/changed elements. React does breadth-first
                  comparison for efficiency.
                </li>
                <li>
                  <strong>Why React is fast:</strong> React doesn&apos;t re-render everything.
                  Virtual DOM diffing finds only what changed. React batches updates (single
                  re-render for multiple setState calls). React updates DOM minimally (only changed
                  attributes/nodes). Virtual DOM operations are fast (just JavaScript objects).
                </li>
                <li>
                  <strong>Batching:</strong> React batches multiple state updates into single
                  re-render. In React 18+, automatic batching works everywhere (event handlers,
                  promises, timeouts). This reduces unnecessary re-renders and improves performance.
                </li>
                <li>
                  <strong>Keys importance:</strong> Keys help React identify which items changed,
                  were added, or removed. Without keys, React can&apos;t efficiently match
                  elements, causing unnecessary re-renders/recreations. Keys enable efficient list
                  reconciliation.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">The Complete Flow:</p>
              <ol className="text-sm text-gray-900 space-y-1 list-decimal list-inside">
                <li>State/props change triggers re-render</li>
                <li>React creates new Virtual DOM tree</li>
                <li>React compares (diffs) old vs new Virtual DOM</li>
                <li>React calculates minimal set of DOM changes needed</li>
                <li>React batches updates and applies changes to real DOM</li>
                <li>Browser repaints/reflows only changed parts</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Concepts Summary:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Concept</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Virtual DOM
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        JavaScript representation of DOM
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Fast comparison and updates
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Reconciliation
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Compare old vs new Virtual DOM
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Find minimal changes needed
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Diffing
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Algorithm to find differences
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Efficient change detection
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Batching
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Group multiple updates
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Fewer re-renders
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

