import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PenSquare, BookOpen } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import SearchFilter from '../components/SearchFilter';

export default function Home() {
  const posts = useSelector((s) => s.blog.posts);
  const { searchQuery } = useSelector((s) => s.ui);

  const filteredPosts = posts
    .filter((post) => {
      const q = searchQuery.toLowerCase();
      return (
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            All Posts
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
          </p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 self-start sm:self-auto"
        >
          <PenSquare className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchFilter />
      </div>

      {/* Results hint */}
      {searchQuery && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Showing <strong className="text-gray-900 dark:text-white">{filteredPosts.length}</strong> result
          {filteredPosts.length !== 1 ? 's' : ''} for &ldquo;<span className="text-emerald-600 dark:text-emerald-400">{searchQuery}</span>&rdquo;
        </p>
      )}

      {/* Post grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-24 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">No posts found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
            {searchQuery ? 'Try different search terms.' : 'Be the first to write something!'}
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-emerald-500/25"
          >
            <PenSquare className="w-4 h-4" />
            Write a Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

