export const initialPosts = [
  {
    id: "1",
    title: "Getting Started with React 18",
    excerpt: "Explore the powerful new features in React 18 including concurrent rendering, automatic batching, and Suspense improvements that make apps faster.",
    content: `## Introduction\n\nReact 18 marks a major milestone in the React ecosystem. With concurrent rendering, React can work on multiple tasks simultaneously.\n\n## Automatic Batching\n\nBefore React 18, only updates inside React event handlers were batched. Now, all updates are automatically batched — including those in timeouts, promises, and native event handlers.\n\n\`\`\`javascript\n// React 18 — this causes only 1 render\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n}, 1000);\n\`\`\`\n\n## New Root API\n\n\`\`\`javascript\nimport { createRoot } from 'react-dom/client';\nconst root = createRoot(document.getElementById('root'));\nroot.render(<App />);\n\`\`\`\n\n## Conclusion\n\nReact 18 brings significant performance improvements. The concurrent renderer is the foundation for the next generation of React development.`,
    author: "Alex Johnson",
    authorAvatar: "AJ",
    tags: ["react", "javascript", "frontend"],
    date: "2024-01-15",
    readTime: 5,
    likes: 142,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "Mastering Redux Toolkit",
    excerpt: "Redux Toolkit simplifies Redux development with dramatically less boilerplate. Learn createSlice, createAsyncThunk, and the power of Immer.",
    content: `## Why Redux Toolkit?\n\nRedux Toolkit (RTK) is the official toolset for efficient Redux development. It solves the three most common complaints: too much boilerplate, too many packages, and too much configuration.\n\n## createSlice\n\n\`\`\`javascript\nimport { createSlice } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; },\n    decrement: (state) => { state.value -= 1; },\n  },\n});\n\nexport const { increment, decrement } = counterSlice.actions;\nexport default counterSlice.reducer;\n\`\`\`\n\n## Immer Integration\n\nRTK uses Immer under the hood, allowing you to write "mutating" logic in reducers that's actually immutable.\n\n## Conclusion\n\nRedux Toolkit makes working with Redux much more enjoyable. The reduced boilerplate and excellent TypeScript integration make it the go-to choice for state management.`,
    author: "Sarah Chen",
    authorAvatar: "SC",
    tags: ["redux", "state-management", "react"],
    date: "2024-01-22",
    readTime: 6,
    likes: 98,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "The Art of Minimal UI Design",
    excerpt: "Discover how minimalist design principles create more impactful user experiences by stripping away the unnecessary.",
    content: `## What is Minimal Design?\n\nMinimalism in UI design is not about removing elements until there is nothing left — it's about removing elements until there is nothing **unnecessary** left.\n\n## Core Principles\n\n### 1. White Space is Your Friend\n\nNegative space guides the eye, creates rhythm, and lets content breathe.\n\n### 2. Typography as Design\n\nIn minimal design, typography carries much of the visual weight. Limit your font families to 2–3 and use size, weight, and spacing to create hierarchy.\n\n### 3. Strategic Color Use\n\nMinimal design works with a limited color palette — often just 1–2 colors plus neutrals.\n\n## Conclusion\n\nMinimal design is not a style — it's a philosophy. It requires asking "why does this exist?" about every element in your design.`,
    author: "Maya Rodriguez",
    authorAvatar: "MR",
    tags: ["design", "ui", "ux"],
    date: "2024-02-03",
    readTime: 4,
    likes: 215,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "4",
    title: "Building Healthy Remote Work Habits",
    excerpt: "Remote work is here to stay. Learn the strategies and habits that help distributed teams thrive while maintaining genuine work-life balance.",
    content: `## The Remote Work Reality\n\nThe shift to remote work has fundamentally changed how we think about productivity and work-life integration.\n\n## Setting Up Your Environment\n\n### Dedicated Workspace\n\nEven in a small apartment, carving out a specific area for work helps your brain associate that space with focus mode.\n\n### Ergonomics Matter\n\nInvesting in a good chair and proper keyboard positioning is an investment in your long-term health.\n\n## Managing Your Time\n\n### Time Blocking\n\nSchedule specific blocks of time for different types of work — deep work for complex tasks, communication blocks for email.\n\n### The Pomodoro Technique\n\nWork in 25-minute focused sessions followed by 5-minute breaks to prevent burnout.\n\n## Conclusion\n\nRemote work success comes from intentional habits and clear boundaries. The freedom it offers is incredible — but it requires more self-discipline than office work.`,
    author: "James Park",
    authorAvatar: "JP",
    tags: ["remote-work", "productivity"],
    date: "2024-02-10",
    readTime: 5,
    likes: 176,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop&q=80"
  }
];
