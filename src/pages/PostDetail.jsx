import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Heart, Clock, Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { toggleLike, deletePost } from '../store/blogSlice';
import { useNotification } from '../context/NotificationContext';
import ConfirmDialog from '../components/ConfirmDialog';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addNotification } = useNotification();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const post = useSelector((s) => s.blog.posts.find((p) => p.id === id));
  const likedPosts = useSelector((s) => s.blog.likedPosts);
  const isLiked = post ? likedPosts.includes(post.id) : false;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <p className="text-5xl mb-5">📭</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Post not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">This post may have been deleted.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    dispatch(toggleLike(post.id));
    addNotification(isLiked ? 'Like removed' : 'Post liked!', isLiked ? 'info' : 'success');
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id));
    addNotification('Post deleted', 'info');
    navigate('/');
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm">
          {/* Cover image */}
          {post.image && (
            <div className="h-64 sm:h-72 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.parentElement.style.display = 'none'; }}
              />
            </div>
          )}

          <div className="p-6 sm:p-10">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 pb-8 mb-8 border-b border-gray-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {post.authorAvatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{post.author}</p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
              </div>
            </div>

            {/* Content */}
            <div className="blog-content mb-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8 pb-8 border-b border-gray-100 dark:border-slate-800">
                <Tag className="w-4 h-4 text-gray-400" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isLiked
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
                <span className="font-bold">{post.likes}</span>
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/edit/${post.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={() => setConfirmOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Post"
        message={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

