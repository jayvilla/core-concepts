import Link from "next/link";
import BasicTypesExample from "@/components/typescript/BasicTypesExample";
import InterfacesVsTypesExample from "@/components/typescript/InterfacesVsTypesExample";
import GenericsExample from "@/components/typescript/GenericsExample";
import ReactTypeScriptExample from "@/components/typescript/ReactTypeScriptExample";

export default function TypeScriptPage() {
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
              TypeScript Concepts
            </h1>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Master TypeScript fundamentals for frontend development. Learn types, interfaces,
              generics, and how to use TypeScript effectively with React.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <BasicTypesExample />
          <InterfacesVsTypesExample />
          <GenericsExample />
          <ReactTypeScriptExample />
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
                <li>&quot;What is TypeScript and why use it?&quot;</li>
                <li>&quot;What&apos;s the difference between interface and type?&quot;</li>
                <li>&quot;What are generics and when would you use them?&quot;</li>
                <li>&quot;How do you type React component props?&quot;</li>
                <li>&quot;What is type inference?&quot;</li>
                <li>&quot;How do you handle optional properties?&quot;</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Key Answer Points:</p>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>TypeScript:</strong> Superset of JavaScript that adds static type checking.
                  Catches errors at compile time, provides better IDE support, improves code
                  documentation, enables refactoring with confidence. Compiles to JavaScript.
                </li>
                <li>
                  <strong>Basic Types:</strong> string, number, boolean, null, undefined, void,
                  any, unknown. Arrays: number[], Array&lt;number&gt;. Tuples: [string, number].
                  Union types: string | number. Optional: property?. Readonly: readonly property.
                </li>
                <li>
                  <strong>Interfaces vs Types:</strong> Interfaces are for object shapes, can be
                  extended, support declaration merging, used for public APIs. Types are more
                  flexible, support unions/intersections, can alias primitives, better for complex
                  type operations. In practice, often interchangeable - choose based on team
                  preference.
                </li>
                <li>
                  <strong>Generics:</strong> Allow writing reusable, type-safe code. &lt;T&gt; is a
                  type parameter. Constraints (extends) limit allowed types. TypeScript can infer
                  generic types. Essential for reusable React components and utility functions.
                </li>
                <li>
                  <strong>React + TypeScript:</strong> Type props with interfaces/types. Type state:
                  useState&lt;Type&gt;. Type refs: useRef&lt;HTMLElement&gt;. Type events:
                  React.ChangeEvent&lt;HTMLInputElement&gt;. Type children: ReactNode. Use React.FC
                  or function components with typed props.
                </li>
                <li>
                  <strong>Type Inference:</strong> TypeScript automatically infers types when you
                  don&apos;t provide explicit types. let x = &quot;hello&quot; infers string. Can
                  reduce verbosity while maintaining type safety. Explicit types are still useful
                  for clarity and documentation.
                </li>
                <li>
                  <strong>Best Practices:</strong> Avoid any (use unknown instead), use strict mode,
                  leverage type inference, use interfaces for object shapes, use types for unions,
                  type everything that&apos;s exported, use generic constraints appropriately.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">TypeScript Benefits:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Benefit</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Type Safety
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Catch errors at compile time, not runtime
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Better IDE Support
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Autocomplete, refactoring, navigation
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Documentation
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Types serve as inline documentation
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Refactoring
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Safe to refactor with type checking
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Team Collaboration
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Clear contracts between components
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

