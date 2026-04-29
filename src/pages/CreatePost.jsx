import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PenSquare } from 'lucide-react';
import { addPost } from '../store/blogSlice';
import { useNotification } from '../context/NotificationContext';
import BlogForm from '../components/BlogForm';

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleSubmit = (formData) => {
    const id = Date.now().toString();
    dispatch(addPost({ ...formData, id }));
    addNotification('🎉 Post published successfully!', 'success');
    navigate(`/posts/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <PenSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Create New Post</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Share your ideas with the world</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 sm:p-8">
        <BlogForm onSubmit={handleSubmit} submitLabel="Publish Post" />
      </div>
    </div>
  );
}
