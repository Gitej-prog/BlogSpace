# BlogSpace — React + Redux Blog Application

A modern, fully-featured blog platform built with **React 18**, **Redux Toolkit**, and **Context API**, styled with **Tailwind CSS**.

🌐 **Live Demo:** `https://<your-deployment-url>` *(replace after deployment)*

---

## Features

| Feature | Description |
|---|---|
| 📋 List Posts | Responsive grid/list view with search, filter, and sort |
| 🔍 View Post | Full post detail with markdown rendering |
| ✍️ Create Post | Rich form with validation and live preview |
| ✏️ Edit Post | Pre-filled edit form with all fields |
| 🗑️ Delete Post | Confirmation dialog before deletion |
| ❤️ Like/Unlike | Toggle likes with persistence to localStorage |
| 🌙 Dark Mode | System-aware dark/light theme toggle |
| 🔔 Notifications | Toast notifications for all user actions |
| 📱 Responsive | Mobile-first, fully responsive layout |

---

## Tech Stack

- **React 18** — UI framework with concurrent features
- **Redux Toolkit** — Global state management (posts, filters, view mode)
- **Context API** — Cross-cutting concerns (theme, notifications)
- **React Router v6** — Client-side routing
- **Tailwind CSS** — Utility-first responsive styling
- **react-markdown + remark-gfm** — Markdown content rendering
- **Lucide React** — Icon library
- **Vite** — Fast build tool

---

## Local Setup

### Prerequisites
- Node.js 18+ and npm 9+

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd blog-app

# 2. Install dependencies
npm install

# 3. Start development server (http://localhost:3000)
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## Redux vs Context API — Usage Explanation

### Redux (via Redux Toolkit)
Redux manages **application-wide state that needs to be shared broadly and modified by many components**:

| Slice | State Managed |
|---|---|
| `blogSlice` | Posts array (CRUD), liked post IDs |
| `uiSlice` | Search query, category filter, sort order, view mode (grid/list) |

**Why Redux here?** The posts are the core data of the application — read by the Home page, updated from the PostDetail and EditPost pages, and deleted from BlogCard components anywhere in the tree. Redux's predictable unidirectional data flow and DevTools support make this ideal.

**localStorage persistence** is implemented via `store.subscribe()`, so data survives page refreshes without a backend.

### Context API
Context manages **cross-cutting concerns that affect the entire app but don't need Redux's power**:

| Context | Responsibility |
|---|---|
| `ThemeContext` | Dark/light mode toggle, persists preference to localStorage |
| `NotificationContext` | Toast notification queue — add/dismiss toast messages |

**Why Context here?** These are "ambient" concerns — they wrap the entire app and are consumed rarely. Using Redux for theme would be over-engineering; Context is the right tool.

---

## Project Structure

```
blog-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BlogCard.jsx       # Post card (grid + list views)
│   │   ├── BlogForm.jsx       # Create/Edit form with validation
│   │   ├── ConfirmDialog.jsx  # Delete confirmation modal
│   │   ├── Footer.jsx
│   │   ├── Header.jsx         # Nav with theme toggle
│   │   └── SearchFilter.jsx   # Search, category, sort, view controls
│   ├── context/
│   │   ├── NotificationContext.jsx  # Toast notifications (Context API)
│   │   └── ThemeContext.jsx         # Dark/light theme (Context API)
│   ├── data/
│   │   └── initialPosts.js    # Sample blog posts seed data
│   ├── pages/
│   │   ├── CreatePost.jsx
│   │   ├── EditPost.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── PostDetail.jsx
│   ├── store/
│   │   ├── blogSlice.js       # Posts CRUD + likes (Redux)
│   │   ├── index.js           # Store config + localStorage persistence
│   │   └── uiSlice.js         # UI filters/search state (Redux)
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

---

## Deployment

### Azure Static Web Apps

1. Build the project: `npm run build`
2. Go to Azure Portal → Create Static Web App
3. Connect to your GitHub repository
4. Set **App location** to `/blog-app`, **Output location** to `dist`
5. Azure automatically deploys on every push to main

### Azure Storage Static Website (Alternative)

```bash
# Build first
npm run build

# Upload dist/ folder
az storage blob upload-batch \
  --account-name myStorageAccount \
  --source dist \
  --destination '$web'

# Enable static website hosting
az storage blob service-properties update \
  --account-name myStorageAccount \
  --static-website \
  --index-document index.html \
  --404-document index.html
```

---

## Assumptions

1. **No backend/authentication** — All data is stored in browser localStorage; posts persist across page refreshes but not across browsers or devices.
2. **No user accounts** — Anyone can create, edit, delete, and like posts. The "author" field is free text.
3. **Like toggle** — Users can like/unlike the same post (toggle behavior), tracked per browser session in localStorage.
4. **Markdown content** — Post content is stored and rendered as Markdown (via react-markdown + remark-gfm).
5. **Images** — Cover images are URL references (Unsplash links in sample data). Users can provide any public image URL.
6. **Sample data** — 6 pre-populated posts covering Technology, Design, Lifestyle, and Science categories are loaded on first visit.
7. **Tailwind CSS** — Used as the sole styling solution; no other CSS framework is used.

---

## License

MIT
