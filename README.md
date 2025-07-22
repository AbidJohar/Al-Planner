# Next.js Fullstack Starter Template

A modern fullstack web app boilerplate built using:

- [Next.js 14+](https://nextjs.org/)
- [Clerk Authentication](https://clerk.dev/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [PNPM](https://pnpm.io/) (Fast, disk-efficient package manager)

## ✨ Features

- Out-of-the-box authentication with Clerk
- Beautiful UI components using shadcn/ui
- Scalable backend using Prisma and PostgreSQL
- Folder structure ready for production apps
- Strict TypeScript setup
- App Router support (Next.js 14+)

---

## 🚀 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/Vetrivel-VP/nextjs-prisma-postgresssql-shadcn-clerk-starter-template.git
```

### 2. Install Dependencies with PNPM

> This project uses [PNPM](https://pnpm.io/) for faster and more efficient package management.

#### Install PNPM globally (if not installed)

```
npm install -g pnpm
```

#### Then install dependencies:

```
pnpm install
```

---

## 🔐 Setup Clerk Authentication

1. Go to [Clerk.dev](https://clerk.dev/) and create a free account.
2. Create a new application.
3. In the `.env` file (rename `.env.example` to `.env`), add the following values from your Clerk dashboard:

```env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

## 🗃️ Configure PostgreSQL & Prisma

### 1. Setup PostgreSQL

You can use:

- Local PostgreSQL
- [Railway](https://railway.app/)
- [Supabase](https://supabase.com/)
- [Neon](https://neon.tech/) – Recommended free tier for dev

Update your `.env` with:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### 2. Run Prisma setup

```
pnpm prisma generate
pnpm prisma migrate dev --name init
```

This will create your database tables based on the Prisma schema.

---

## 🧪 Run the App

```
pnpm dev
```

Visit `http://localhost:3000` to view the app in the browser.

---

## 📁 Project Structure

```
.
├── app/              # App router structure
├── components/       # UI components (shadcn/ui)
├── lib/              # Utility functions
├── prisma/           # Prisma schema and DB access
├── public/           # Static files
├── styles/           # Global styles
├── .env              # Environment variables
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 🧩 Customization Tips

- Add more shadcn components by running:
  ```
  pnpm dlx shadcn-ui@latest add [component]
  ```
- Use Clerk hooks like `useUser()` for getting auth details.
- Extend Prisma schema as needed and run `pnpm prisma migrate dev`.

---

## 📦 Deployment

You can deploy this app to:

- [Vercel](https://vercel.com/) — seamless for Next.js
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Netlify](https://netlify.com/) (with some configuration)

---

## 🙌 Credits

Created by [Vetrivel Ravi](https://youtube.com/@vetrivelravi)  
YouTube: [Vetrivel Ravi](https://youtube.com/@vetrivelravi)

---

## 📄 License

MIT License
