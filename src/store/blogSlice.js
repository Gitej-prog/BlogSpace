import { createSlice } from '@reduxjs/toolkit';
import { initialPosts } from '../data/initialPosts';

const loadPostsFromStorage = () => {
  try {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const loadLikedFromStorage = () => {
  try {
    const saved = localStorage.getItem('likedPosts');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: loadPostsFromStorage() ?? initialPosts,
    likedPosts: loadLikedFromStorage(),
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
      state.likedPosts = state.likedPosts.filter((id) => id !== action.payload);
    },
    toggleLike: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (!post) return;

      const alreadyLiked = state.likedPosts.includes(postId);
      if (alreadyLiked) {
        post.likes = Math.max(0, post.likes - 1);
        state.likedPosts = state.likedPosts.filter((id) => id !== postId);
      } else {
        post.likes += 1;
        state.likedPosts.push(postId);
      }
    },
  },
});

export const { addPost, updatePost, deletePost, toggleLike } = blogSlice.actions;
export default blogSlice.reducer;
