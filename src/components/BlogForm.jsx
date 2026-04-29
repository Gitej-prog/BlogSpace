import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Tag, User, FileText, Type, AlignLeft, ArrowLeft, Save } from 'lucide-react';

function FieldError({ error }) {
  if (!error) return null;
  return <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">{error}</p>;
}

export default function BlogForm({ initialValues = {}, onSubmit, submitLabel = 'Publish Post' }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: initialValues.title || '',
    excerpt: initialValues.excerpt || '',
    content: initialValues.content || '',
    author: initialValues.author || '',
    tags: initialValues.tags ? initialValues.tags.join(', ') : '',
    image: initialValues.image || '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim() || form.title.trim().length < 5)
      e.title = 'Title must be at least 5 characters.';
    if (form.title.trim().length > 120)
      e.title = 'Title must be 120 characters or less.';
    if (!form.excerpt.trim() || form.excerpt.trim().length < 20)
      e.excerpt = 'Excerpt must be at least 20 characters.';
    if (!form.content.trim() || form.content.trim().length < 50)
      e.content = 'Content must be at least 50 characters.';
    if (!form.author.trim())
      e.author = 'Author name is required.';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    onSubmit({
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      author: form.author.trim(),
      authorAvatar: form.author.trim().split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2),
      tags: form.tags.split(',').map((t) => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean),
      image: form.image.trim(),
      readTime: Math.ceil(form.content.trim().split(/\s+/).length / 200) || 5,
      date: initialValues.date || new Date().toISOString().split('T')[0],
      likes: initialValues.likes || 0,
    });
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
      errors[field]
        ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/10'
        : 'border-gray-200 dark:border-slate-600'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div id="field-title">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Type className="w-4 h-4 inline mr-1.5" />
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Write an engaging title..."
              value={form.title}
              onChange={handleChange('title')}
              className={inputClass('title')}
              required
            />
            <div className="flex justify-between mt-1">
              <FieldError error={errors.title} />
              <span className={`text-xs ml-auto ${form.title.length > 100 ? 'text-amber-500' : 'text-gray-400'}`}>
                {form.title.length}/120
              </span>
            </div>
          </div>

          {/* Excerpt */}
          <div id="field-excerpt">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <AlignLeft className="w-4 h-4 inline mr-1.5" />
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Write a short summary that hooks the reader..."
              value={form.excerpt}
              onChange={handleChange('excerpt')}
              rows={3}
              className={inputClass('excerpt')}
              required
            />
            <FieldError error={errors.excerpt} />
          </div>

          {/* Content */}
          <div id="field-content">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-1.5" />
              Content <span className="text-red-500">*</span>
              <span className="ml-2 text-xs font-normal text-gray-400">(Markdown supported)</span>
            </label>
            <textarea
              placeholder={`## Introduction\n\nStart with a compelling opening...\n\n## Main Section\n\nDevelop your ideas...\n\n## Conclusion\n\nWrap up your thoughts.`}
              value={form.content}
              onChange={handleChange('content')}
              rows={16}
              className={`${inputClass('content')} font-mono text-sm leading-relaxed`}
              required
            />
            <FieldError error={errors.content} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Author */}
          <div id="field-author">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-1.5" />
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={form.author}
              onChange={handleChange('author')}
              className={inputClass('author')}
              required
            />
            <FieldError error={errors.author} />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="w-4 h-4 inline mr-1.5" />
              Tags
              <span className="ml-1.5 text-xs font-normal text-gray-400">(comma-separated)</span>
            </label>
            <input
              type="text"
              placeholder="react, javascript, tutorial"
              value={form.tags}
              onChange={handleChange('tags')}
              className={inputClass('tags')}
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Image className="w-4 h-4 inline mr-1.5" />
              Cover Image URL
              <span className="ml-1.5 text-xs font-normal text-gray-400">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={handleChange('image')}
              className={inputClass('image')}
            />
            {form.image && (
              <div className="mt-2 rounded-lg overflow-hidden h-28 bg-gray-100 dark:bg-slate-800">
                <img
                  src={form.image}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25"
            >
              <Save className="w-4 h-4" />
              {submitLabel}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
