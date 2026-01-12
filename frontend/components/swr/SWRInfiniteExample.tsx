"use client";

import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

/**
 * SWR INFINITE EXAMPLE
 *
 * Demonstrates infinite loading with useSWRInfinite:
 * - Load more data on scroll/click
 * - Automatic pagination
 * - Cache management
 */

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// Get key for each page
const getKey = (pageIndex: number, previousPageData: any[]) => {
  // Reached the end
  if (previousPageData && !previousPageData.length) return null;
  
  // First page, no previous data
  return `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1}&_limit=5`;
};

export default function SWRInfiniteExample() {
  const {
    data,
    error,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
  });

  const posts = useMemo(() => {
    return data ? data.flat() : [];
  }, [data]);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < 5);

  return (
    <div className="border-2 border-pink-500 rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-pink-900">
        Infinite Loading with SWR
      </h2>

      <div className="space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
          <h3 className="font-bold text-pink-900 mb-3">useSWRInfinite</h3>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              Perfect for infinite scroll, "Load More" buttons
            </li>
            <li>
              Automatically manages multiple pages of data
            </li>
            <li>
              Returns array of pages, each page is cached separately
            </li>
            <li>
              Provides <code className="bg-pink-100 px-1 rounded">setSize()</code> to load more pages
            </li>
          </ul>
        </div>

        {/* Posts List */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">
            Posts ({posts.length} loaded):
          </h3>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-900">❌ Error: {error.message}</p>
            </div>
          )}

          {isEmpty ? (
            <p className="text-gray-600">No posts found</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {posts.map((post: any) => (
                <div
                  key={post.id}
                  className="p-3 bg-white border border-gray-200 rounded"
                >
                  <h4 className="font-semibold text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-700">{post.body}</p>
                  <p className="text-xs text-gray-600 mt-1">ID: {post.id}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Controls */}
        <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
          <h3 className="font-bold text-pink-900 mb-3">Controls:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSize(size + 1)}
                disabled={isLoadingMore || isReachingEnd}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore
                  ? "Loading..."
                  : isReachingEnd
                  ? "No More Posts"
                  : "Load More"}
              </button>
              <button
                onClick={() => mutate()}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Refresh
              </button>
            </div>
            <div className="text-sm text-gray-700">
              <p>Pages loaded: {size}</p>
              <p>Total posts: {posts.length}</p>
              {isValidating && <p className="text-yellow-600">⏳ Validating...</p>}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Code Example:</h4>
          <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
            <code className="text-gray-800">
{`import useSWRInfinite from 'swr/infinite';

// Key getter function
const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return \`/api/posts?page=\${pageIndex + 1}\`;
};

function InfinitePosts() {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  
  const posts = data ? data.flat() : [];
  const isLoadingMore = size > 0 && data && !data[size - 1];
  
  return (
    <>
      {posts.map(post => <Post key={post.id} {...post} />)}
      <button onClick={() => setSize(size + 1)}>
        Load More
      </button>
    </>
  );
}`}
            </code>
          </pre>
        </div>

        {/* Key Points */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-900">Key Points:</h4>
          <ul className="text-sm text-gray-900 space-y-1 list-disc list-inside">
            <li>
              <code className="bg-yellow-100 px-1 rounded">getKey</code> function determines when to stop loading
            </li>
            <li>
              Return <code className="bg-yellow-100 px-1 rounded">null</code> from getKey to stop fetching
            </li>
            <li>
              <code className="bg-yellow-100 px-1 rounded">data</code> is array of pages: <code className="bg-yellow-100 px-1 rounded">[page1, page2, page3]</code>
            </li>
            <li>
              Use <code className="bg-yellow-100 px-1 rounded">data.flat()</code> to flatten pages into single array
            </li>
            <li>
              <code className="bg-yellow-100 px-1 rounded">setSize(n)</code> loads n pages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
