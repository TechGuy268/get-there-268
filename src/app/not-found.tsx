import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ocean-950 flex flex-col items-center justify-center px-6 text-white text-center">
      <p className="text-8xl font-black text-caribbean-400 mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-ocean-400 text-sm mb-8">The page you're looking for doesn't exist.</p>
      <Link href="/" className="px-6 py-3 bg-caribbean-500 hover:bg-caribbean-600 text-white font-semibold rounded-2xl transition-colors">
        Go home
      </Link>
    </div>
  );
}
