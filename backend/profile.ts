
export const ANMOL_PROFILE = {
  name: "Anmol Trivedi",
  education: {
    college: "NIT Rourkela",
    degree: "B.Tech Industrial Design",
    minor: "Computer Science",
    cgpa: 8.75,
    graduation: 2028
  },

  skills: {
    frontend: ["React", "Redux Toolkit", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "TypeScript", "WebSocket (ws)", "PostgreSQL", "MongoDB"],
    languages: ["C++", "JavaScript", "Python", "C"]
  },

  projects: [
    {
      name: "Talkative",
      summary:
        "Real-time room-based chat platform on a raw WebSocket transport. JWT handshake auth on HTTP upgrade, a socket registry mapping connections to users and rooms, and persist-then-broadcast delivery that replaced polling and cut redundant REST traffic by around 90%.",
      stack: ["Node.js", "Express.js", "TypeScript", "WebSocket (ws)", "PostgreSQL", "JWT"],
      live: "https://for-talkatives.vercel.app/",
      repos: {
        backend: "https://github.com/anmoltriv/chat-app-backend",
        frontend: "https://github.com/anmoltriv/chat-app-frontend"
      }
    },
    {
      name: "Content.ai",
      summary:
        "AI SaaS content engine using the Gemini API and the FLUX model for article writing and text-to-image generation, with Clerk webhook auth, Neon serverless PostgreSQL and a Cloudinary asset pipeline that cut client-side asset load times by 35%.",
      stack: ["React.js", "Node.js", "Express.js", "Neon DB (PostgreSQL)", "ClerkAuth", "Cloudinary", "Gemini API"],
      live: "https://content-ai-kohl.vercel.app/"
    }
  ]
};
