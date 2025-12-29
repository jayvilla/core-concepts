import Link from "next/link";

export default function Home() {
  const frontendTopics = [
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
    {
      title: "Props vs State",
      description:
        "Learn the fundamental difference between props and state, when to use each, and how data flows in React.",
      href: "/props-state",
      emoji: "📊",
      status: "ready",
    },
    {
      title: "State Management",
      description:
        "Master useState, useReducer, Context API, Zustand, and Redux. Learn when to use each approach for effective state management.",
      href: "/state-management",
      emoji: "🗂️",
      status: "ready",
    },
    {
      title: "Keys in Lists",
      description:
        "Understand why keys are important in React lists. Learn how keys help React efficiently update the DOM and avoid bugs.",
      href: "/keys",
      emoji: "🔑",
      status: "ready",
    },
    {
      title: "Hooks: Custom Hooks & Rules",
      description:
        "Learn how to create custom hooks and understand the rules of hooks. Master reusable stateful logic and avoid common pitfalls.",
      href: "/hooks",
      emoji: "🪝",
      status: "ready",
    },
    {
      title: "Memoization: useMemo, useCallback, React.memo",
      description:
        "Learn how to optimize React performance with memoization. Understand when and how to use useMemo, useCallback, and React.memo effectively.",
      href: "/memoization",
      emoji: "⚡",
      status: "ready",
    },
    {
      title: "Virtual DOM & Reconciliation",
      description:
        "Understand how React works under the hood. Learn about Virtual DOM, reconciliation, diffing algorithms, and batching for optimal performance.",
      href: "/virtual-dom",
      emoji: "🌳",
      status: "ready",
    },
    {
      title: "Performance: Code Splitting & Lazy Loading",
      description:
        "Learn how to optimize React applications with code splitting and lazy loading. Reduce bundle sizes, improve load times, and enhance user experience.",
      href: "/performance",
      emoji: "🚀",
      status: "ready",
    },
    {
      title: "Error Boundaries",
      description:
        "Learn how to handle errors gracefully in React. Understand Error Boundaries, what they catch, their limitations, and best practices for error handling.",
      href: "/error-boundary",
      emoji: "🛡️",
      status: "ready",
    },
    {
      title: "TypeScript Concepts",
      description:
        "Master TypeScript fundamentals for frontend development. Learn types, interfaces, generics, and how to use TypeScript effectively with React.",
      href: "/typescript",
      emoji: "📘",
      status: "ready",
    },
    {
      title: "Debounce vs Throttle",
      description:
        "Learn the difference between debounce and throttle. Understand when to use each technique to optimize performance and improve user experience.",
      href: "/debounce-throttle",
      emoji: "⏱️",
      status: "ready",
    },
    {
      title: "Rendering Strategies",
      description:
        "Master different rendering strategies: CSR, SSR, SSG, ISR, and React Server Components. Learn when to use each approach for optimal performance.",
      href: "/rendering-strategies",
      emoji: "🎨",
      status: "ready",
    },
  ];

  const backendTopics = [
    {
      title: "PostgreSQL Concepts",
      description:
        "Master PostgreSQL fundamentals for backend development. Learn SQL basics, relationships, joins, indexes, pagination, transactions, and connecting with TypeORM.",
      href: "/postgresql",
      emoji: "🐘",
      status: "ready",
    },
    {
      title: "ORM Comparison",
      description:
        "Learn how to model database entities using Prisma, TypeORM, and Sequelize. Compare syntax, features, and use cases for each ORM with side-by-side examples.",
      href: "/orm",
      emoji: "🗄️",
      status: "ready",
    },
    {
      title: "Event-Driven Architecture",
      description:
        "Learn event-driven architecture patterns with NestJS EventEmitter. Understand how to decouple components, handle asynchronous events, and build scalable systems.",
      href: "/event-driven",
      emoji: "📡",
      status: "ready",
    },
    {
      title: "Saga Pattern",
      description:
        "Learn the Saga pattern for managing distributed transactions. Understand orchestration vs choreography approaches for maintaining data consistency across microservices.",
      href: "/saga",
      emoji: "🔄",
      status: "ready",
    },
    {
      title: "Tracing & Logging",
      description:
        "Learn distributed tracing and structured logging patterns. Understand correlation IDs, request logging, error tracking, and how to debug distributed systems effectively.",
      href: "/tracing-logging",
      emoji: "📊",
      status: "ready",
    },
  ];

  const TopicCard = ({ topic }: { topic: typeof frontendTopics[0] }) => (
    <Link
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
          <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
            Coming Soon
          </span>
        )}
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {topic.title}
      </h2>
      <p className="text-gray-800 text-sm">{topic.description}</p>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Core Concepts Practice
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Interactive examples and demonstrations of core frontend and backend concepts
            for interview preparation.
          </p>
        </div>

        {/* Frontend Concepts Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span>🎨</span>
            Frontend Concepts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontendTopics.map((topic) => (
              <TopicCard key={topic.href} topic={topic} />
            ))}
          </div>
        </div>

        {/* Backend Concepts Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span>⚙️</span>
            Backend Concepts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {backendTopics.map((topic) => (
              <TopicCard key={topic.href} topic={topic} />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            📚 Practice Topics
          </h2>
          <p className="text-gray-900 mb-4">
            Each topic includes interactive examples, code explanations, and
            interview tips. Click on a topic to start practicing!
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-800">
            <div>
              <p className="font-semibold mb-2">Frontend Topics:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>React concepts (Components, Hooks, State Management)</li>
                <li>JavaScript fundamentals</li>
                <li>Browser APIs & DOM manipulation</li>
                <li>Performance optimization techniques</li>
                <li>TypeScript for frontend</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Backend Topics:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>PostgreSQL database fundamentals</li>
                <li>ORM comparison (Prisma, TypeORM, Sequelize)</li>
                <li>Database relationships and modeling</li>
                <li>SQL queries and optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
