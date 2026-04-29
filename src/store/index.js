import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    ui: uiReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('blogPosts', JSON.stringify(state.blog.posts));
    localStorage.setItem('likedPosts', JSON.stringify(state.blog.likedPosts));
  } catch {
    // Storage not available
  }
});
