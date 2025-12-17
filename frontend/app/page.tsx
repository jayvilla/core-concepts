import Link from "next/link";

export default function Home() {
  const practiceTopics = [
    {
      title: "Controlled vs Uncontrolled Components",
      description:
        "Learn the difference between React controlled and uncontrolled components with interactive examples.",
      href: "/components",
      emoji: "🎛️",
      status: "ready",
    },
    {
      title: "Component Lifecycle",
      description:
        "Understand React component lifecycle with useEffect, cleanup functions, and dependency arrays.",
      href: "/lifecycle",
      emoji: "🔄",
      status: "ready",
    },
    // Add more topics here as you create them
    // {
    //   title: "Closures & Scope",
    //   description: "Practice understanding JavaScript closures and lexical scoping.",
    //   href: "/closures",
    //   emoji: "🔒",
    //   status: "coming-soon",
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Frontend Interview Practice
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive examples and demonstrations of core frontend concepts
            for interview preparation.
          </p>
        </div>

        {/* Practice Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceTopics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.status === "ready" ? topic.href : "#"}
              className={`block p-6 rounded-lg border-2 transition-all duration-200 ${
                topic.status === "ready"
                  ? "bg-white border-blue-300 hover:border-blue-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{topic.emoji}</span>
                {topic.status === "coming-soon" && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {topic.title}
              </h2>
              <p className="text-gray-600 text-sm">{topic.description}</p>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            📚 Practice Topics
          </h2>
          <p className="text-gray-700 mb-4">
            Each topic includes interactive examples, code explanations, and
            interview tips. Click on a topic to start practicing!
          </p>
          <div className="text-sm text-gray-600">
            <p className="font-semibold mb-2">Topics covered:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>React concepts (Components, Hooks, State Management)</li>
              <li>JavaScript fundamentals (Closures, Scope, this binding)</li>
              <li>Browser APIs & DOM manipulation</li>
              <li>Performance optimization techniques</li>
              <li>And more...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
