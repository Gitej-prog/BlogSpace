import { Link } from 'react-router-dom';
import { BookOpen, Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-800 dark:text-gray-200">BlogSpace</span>
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            Built with
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            using React &amp; Redux Toolkit
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link to="/create" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Write
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
