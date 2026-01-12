"use client";

import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * SWR MUTATION EXAMPLE
 *
 * Demonstrates mutations with SWR:
 * - useSWRMutation for POST/PUT/DELETE operations
 * - Optimistic updates
 * - Cache invalidation after mutations
 */

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// Simulated API endpoint
const createPost = async (url: string, { arg }: { arg: { title: string; body: string } }) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: arg.title,
      body: arg.body,
      userId: 1,
    }),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};

export default function SWRMutationExample() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Fetch existing posts
  const { data: posts, mutate: mutatePosts } = useSWR(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    fetcher
  );

  // Mutation hook
  const { trigger, isMutating, error: mutationError } = useSWRMutation(
    "https://jsonplaceholder.typicode.com/posts",
    createPost
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPost = await trigger({ title, body });
      // Invalidate and refetch posts
      mutatePosts();
      setTitle("");
      setBody("");
      alert(`Post created! ID: ${newPost.id}`);
    } catch (err) {
      console.error("Mutation error:", err);
    }
  };

  return (
    <div className="border-2 border-purple-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        SWR Mutations
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">What are Mutations?</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>useSWRMutation:</strong> Hook for POST, PUT, DELETE operations
            </li>
            <li>
              Separate from useSWR - doesn&apos;t automatically fetch on mount
            </li>
            <li>
              Triggered manually with <code className="bg-purple-100 px-1 rounded">trigger()</code>
            </li>
            <li>
              Perfect for forms, buttons, and user-triggered actions
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">Create New Post:</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Title:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Body:
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isMutating}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isMutating ? "Creating..." : "Create Post"}
            </button>
          </form>
          {mutationError && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-900">Error: {mutationError.message}</p>
            </div>
          )}
        </div>

        {/* Posts List */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Recent Posts:</h3>
          {posts ? (
            <div className="space-y-2">
              {posts.map((post: any) => (
                <div
                  key={post.id}
                  className="p-3 bg-white border border-gray-200 rounded"
                >
                  <h4 className="font-semibold text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-700">{post.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Loading posts...</p>
          )}
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Code Example:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`// Mutation hook
const { trigger, isMutating } = useSWRMutation(
  '/api/posts',
  async (url, { arg }) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    });
    return res.json();
  }
);

// In component
const handleSubmit = async () => {
  const newPost = await trigger({ title, body });
  mutate(); // Invalidate cache
};`}
            </code>
          </pre>
        </div>

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>useSWRMutation</strong> doesn&apos;t fetch on mount - only when triggered
            </li>
            <li>
              Use <code className="bg-yellow-100 px-1 rounded">mutate()</code> to invalidate cache after mutations
            </li>
            <li>
              <code className="bg-yellow-100 px-1 rounded">isMutating</code> provides loading state
            </li>
            <li>
              Can combine with optimistic updates for better UX
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
