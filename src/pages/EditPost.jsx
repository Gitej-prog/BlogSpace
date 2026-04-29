import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Edit2, ArrowLeft } from 'lucide-react';
import { updatePost } from '../store/blogSlice';
import { useNotification } from '../context/NotificationContext';
import BlogForm from '../components/BlogForm';

export default function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const post = useSelector((s) => s.blog.posts.find((p) => p.id === id));

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Post not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          We couldn't find the post you're trying to edit.
        </p>
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

  const handleSubmit = (formData) => {
    dispatch(updatePost({ ...formData, id: post.id, likes: post.likes }));
    addNotification('✅ Post updated successfully!', 'success');
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Edit2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Edit Post</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-sm">
              {post.title}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 sm:p-8">
        <BlogForm
          initialValues={post}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
