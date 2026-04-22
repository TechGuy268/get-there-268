"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-ocean-950 flex flex-col items-center justify-center px-6 text-white text-center">
      <p className="text-6xl mb-4">⚠️</p>
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-ocean-400 text-sm mb-8">An unexpected error occurred.</p>
      <button onClick={reset} className="px-6 py-3 bg-caribbean-500 hover:bg-caribbean-600 text-white font-semibold rounded-2xl transition-colors">
        Try again
      </button>
    </div>
  );
}
