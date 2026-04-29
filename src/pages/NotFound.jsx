import { Link } from 'react-router-dom';
import { Home, PenSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <div className="text-[8rem] font-extrabold text-gray-100 dark:text-slate-800 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl">🔭</div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all"
          >
            <PenSquare className="w-4 h-4" />
            Write a Post
          </Link>
        </div>
      </div>
    </div>
  );
}
