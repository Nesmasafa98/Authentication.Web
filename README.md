# React Auth App

A modern, full-featured authentication app built with:

-   ⚛️ **React** + **TypeScript**
-   ⚡ **Vite** for fast dev builds
-   🎨 **Tailwind CSS** for styling

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nesmasafa98/Authentication.Web.git
cd Authentication.Web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

---

## 🔐 Authentication Flow

-   ✅ Sign Up and Login handled using `<Form method="post" />` from React Router.
-   🧠 `action()` functions process form submissions, call the backend, and return results.
-   🔁 Custom `AuthContext` manages user state and provides login/logout methods.
-   🔒 Protected routes are implemented using route guards (like Angular), redirecting unauthenticated users.
-   🚪 Logout sends a `POST` request to the backend and clears stored tokens.

---

---

And update your fetch URLs accordingly using `import.meta.env.VITE_API_URL`.

---

