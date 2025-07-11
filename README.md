# Meet.ai

**Meet.ai** is a fully featured AI-powered video call platform built with modern technologies like Next.js 15, React 19, and powerful integrations including OpenAI, Stream, Inngest, Polar, and more.

It supports real-time conversations with custom AI agents, automatic meeting summaries and transcripts, AI-powered Q&A, video playback, searchable history, and seamless authentication and subscriptions.

---

## ✨ Key Features

- 🤖 AI-powered video calls  
- 🧠 Custom real-time agents  
- 📞 Stream Video SDK  
- 💬 Stream Chat SDK  
- 📝 Summaries, transcripts, and recordings  
- 📂 Meeting history & statuses  
- 🔍 Transcript search  
- 📺 Video playback  
- 💬 AI meeting Q&A  
- 🧠 OpenAI integration  
- 💳 Polar subscriptions  
- 🔐 Better Auth login  
- 📱 Mobile responsive  
- 🌐 Next.js 15 + React 19  
- 🎨 Tailwind v4 + Shadcn/ui  
- ⚙️ Inngest background jobs  
- 🧑‍💻 CodeRabbit PR reviews  

---


## 🧱 Technologies Used

- **Next.js 15** – [https://nextjs.org](https://nextjs.org)  
- **React 19** – [https://react.dev](https://react.dev)  
- **Tailwind CSS v4** – [https://tailwindcss.com](https://tailwindcss.com)  
- **Shadcn/ui** – [https://ui.shadcn.com](https://ui.shadcn.com)  
- **Stream Video** – [https://getstream.io/video](https://getstream.io/video)  
- **Stream Chat** – [https://getstream.io/chat](https://getstream.io/chat)  
- **Inngest** – [https://www.inngest.com](https://www.inngest.com)  
- **OpenAI** – [https://platform.openai.com](https://platform.openai.com)  
- **CodeRabbit** – [https://coderabbit.ai](https://coderabbit.ai)  
- **Polar** – [https://polar.sh](https://polar.sh)  
- **Vercel** – [https://vercel.com](https://vercel.com)  
- **Neon PostgreSQL** – [https://neon.tech](https://neon.tech)  
- **Better Auth** – [https://betterstack.com/auth](https://betterstack.com/auth)


## 🔐 Environment Variables

Below is the list of required environment variable names:

```env
DATABASE_URL  
NEXT_PUBLIC_APP_URL

BETTER_AUTH_SECRET  
BETTER_AUTH_URL  
GITHUB_CLIENT_ID  
GITHUB_CLIENT_SECRET  
GOOGLE_CLIENT_ID  
GOOGLE_CLIENT_SECRET

NEXT_PUBLIC_STREAM_VIDEO_API_KEY  
STREAM_VIDEO_SECRET_KEY  
NEXT_PUBLIC_STREAM_CHAT_API_KEY  
STREAM_CHAT_SECRET_KEY

OPENAI_API_KEY  
POLAR_ACCESS_TOKEN
```

> ℹ️ Add these to your `.env.local` for development. Never commit sensitive keys to source control.

---

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/hha297/Meet.ai
   cd Meet.ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and fill in the required environment variables listed above.

4. Start the development server:

   ```bash
   npm dev
   ```

---
