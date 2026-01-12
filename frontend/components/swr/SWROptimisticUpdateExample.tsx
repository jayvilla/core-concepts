"use client";

import { useState } from "react";
import useSWR from "swr";

/**
 * SWR OPTIMISTIC UPDATE EXAMPLE
 *
 * Demonstrates optimistic updates:
 * - Update UI immediately before API call completes
 * - Rollback on error
 * - Better user experience
 */

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// Simulated like/unlike API
const toggleLike = async (postId: number, currentLikes: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  // Simulate random failure (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Network error");
  }
  return { likes: currentLikes + 1 };
};

export default function SWROptimisticUpdateExample() {
  const { data, mutate } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/1",
    fetcher
  );

  const [isUpdating, setIsUpdating] = useState(false);

  const handleLike = async () => {
    if (!data || isUpdating) return;

    const currentLikes = (data as any).likes || 0;
    const newLikes = currentLikes + 1;

    // Optimistic update: update UI immediately
    await mutate(
      { ...data, likes: newLikes },
      {
        optimisticData: { ...data, likes: newLikes },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false, // Don't revalidate immediately
      }
    );

    setIsUpdating(true);

    try {
      // Simulate API call
      await toggleLike((data as any).id, currentLikes);
      // Revalidate to get server state
      mutate();
    } catch (error) {
      // Error will automatically rollback due to rollbackOnError: true
      console.error("Failed to like:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="border-2 border-green-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Optimistic Updates with SWR
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">
            What are Optimistic Updates?
          </h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Update UI <strong>immediately</strong> before API call completes
            </li>
            <li>Provides instant feedback - feels faster to users</li>
            <li>Automatically rolls back if API call fails</li>
            <li>Common use cases: likes, follows, toggles, simple updates</li>
          </ul>
        </div>

        {/* Post Display */}
        {data && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">Post:</h3>
            <div className="p-4 bg-white border border-gray-200 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">
                {(data as any).title || "Sample Post Title"}
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                {(data as any).body || "This is a sample post body content."}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "❤️ Like"}
                </button>
                <span className="text-lg font-bold text-gray-900">
                  {(data as any).likes || 0} likes
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                💡 Click like to see optimistic update. UI updates instantly,
                then syncs with server. There&apos;s a 10% chance of error to
                demonstrate rollback.
              </p>
            </div>
          </div>
        )}

        {/* Comparison */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-900">
            Optimistic vs Normal Update:
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-red-900 mb-1">
                ❌ Normal Update:
              </p>
              <div className="text-xs text-gray-700 bg-red-50 p-2 rounded border border-red-200">
                1. User clicks → 2. Show loading → 3. Wait for API → 4. Update
                UI
                <br />
                <strong>User waits ~1-2 seconds</strong>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-900 mb-1">
                ✅ Optimistic Update:
              </p>
              <div className="text-xs text-gray-700 bg-green-50 p-2 rounded border border-green-200">
                1. User clicks → 2. Update UI immediately → 3. API call in
                background
                <br />
                <strong>User sees instant feedback</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Code Example:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
              {`const handleLike = async () => {
  // Optimistic update
  await mutate(
    { ...data, likes: data.likes + 1 },
    {
      optimisticData: { ...data, likes: data.likes + 1 },
      rollbackOnError: true,  // Rollback if API fails
      populateCache: true,     // Update cache
      revalidate: false,       // Don't revalidate yet
    }
  );

  try {
    await api.like(postId);
    mutate(); // Revalidate to sync with server
  } catch (error) {
    // Automatically rolls back on error
  }
};`}
            </code>
          </pre>
        </div>

        {/* When to Use */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">
            When to Use Optimistic Updates:
          </h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <strong>Good for:</strong> Likes, follows, simple toggles,
              non-critical updates
            </li>
            <li>
              <strong>Avoid for:</strong> Financial transactions, critical data,
              complex operations
            </li>
            <li>Always implement rollback for error cases</li>
            <li>Consider showing a subtle indicator that update is pending</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
