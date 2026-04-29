import { useDispatch, useSelector } from 'react-redux';
import { Search, X } from 'lucide-react';
import { setSearchQuery } from '../store/uiSlice';

export default function SearchFilter() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((s) => s.ui);

  return (
    <div className="relative max-w-xl">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Search posts by title or author..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => dispatch(setSearchQuery(''))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
