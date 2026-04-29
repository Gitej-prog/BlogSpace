import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Clock, Edit2, Trash2 } from 'lucide-react';
import { toggleLike, deletePost } from '../store/blogSlice';
import { useNotification } from '../context/NotificationContext';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function BlogCard({ post }) {
  const dispatch = useDispatch();
  const { addNotification } = useNotification();
  const likedPosts = useSelector((state) => state.blog.likedPosts);
  const isLiked = likedPosts.includes(post.id);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(toggleLike(post.id));
    addNotification(isLiked ? 'Like removed' : 'Post liked!', isLiked ? 'info' : 'success');
  };

  const handleDeleteConfirm = () => {
    dispatch(deletePost(post.id));
    addNotification('Post deleted successfully', 'info');
    setConfirmOpen(false);
  };

  return (
    <>
      <article className="group bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1 animate-slide-up">
        {/* Cover image */}
        {post.image && (
          <div className="relative h-44 overflow-hidden flex-shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.parentElement.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">

          <Link to={`/posts/${post.id}`} className="flex-1 block">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </Link>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {post.authorAvatar}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate leading-none">
                  {post.author}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {post.readTime && (
                    <><span>·</span><Clock className="w-3 h-3" />{post.readTime}m</>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-0.5 flex-shrink-0">
              <button
                onClick={handleLike}
                title={isLiked ? 'Unlike' : 'Like'}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isLiked
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500' : ''}`} />
                {post.likes}
              </button>
              <Link
                to={`/edit/${post.id}`}
                title="Edit"
                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setConfirmOpen(true)}
                title="Delete"
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Post"
        message={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
