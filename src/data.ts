import type { Project, Experience } from "./types";
import contentAiShot from "./assets/images/content-ai.webp";
import talkativeShot from "./assets/images/talkative.webp";

export const projectsData: Project[] = [
  {
    id: "talkative",
    title: "Talkative",
    tagline: "Real-Time WebSocket Chat Platform",
    description: "Engineered a room-based realtime chat backend on raw WebSockets with JWT handshake auth, replacing polling with persist-then-broadcast delivery.",
    detailedDescription: "A real-time chat application built on a raw WebSocket transport rather than a managed realtime service, so every part of the connection lifecycle — upgrade, authentication, room membership and fan-out — is handled explicitly in the backend.",
    highlights: [
      "Engineered a WebSocket RTC backend on HTTP upgrade with JWT handshake auth, fanning out send/edit/delete events to room members instead of all connected clients.",
      "Built a socket registry mapping connections to users and rooms, removing join/leave race conditions and improving live-state accuracy by 30% across multi-device sessions.",
      "Replaced chat polling with persist-then-broadcast over WebSockets, cutting redundant REST traffic by ~90% and collapsing inbox last-message lookups into a single query."
    ],
    image: talkativeShot,
    tags: ["Node.js", "Express.js", "TypeScript", "WebSocket (ws)", "PostgreSQL", "JWT"],
    metrics: { label: "REST Traffic Cut", value: "~90%" },
    demoLink: "https://for-talkatives.vercel.app/",
    repos: [
      { label: "Backend", url: "https://github.com/anmoltriv/chat-app-backend" },
      { label: "Frontend", url: "https://github.com/anmoltriv/chat-app-frontend" }
    ],
    featured: true
  },
  {
    id: "contentai",
    title: "Content.ai",
    tagline: "Full-Stack AI Content SaaS Engine",
    description: "Built a smart article writing and text-to-image pipeline integrating Gemini API and FLUX models with Clerk, serverless PostgreSQL, and optimized asset delivery.",
    detailedDescription: "A full-stack SaaS content engine using the Gemini API and the open-source FLUX model to automate long-form article writing and high-fidelity text-to-image synthesis pipelines.",
    highlights: [
      "Integrated Clerk Auth via an asynchronous webhook architecture, maintaining sub-120ms dashboard synchronization latency across multi-tier billing-enabled user profiles.",
      "Optimized serverless PostgreSQL schemas via Neon DB connection pooling, handling complex concurrent dashboard data requests with consistent sub-100ms database latency.",
      "Designed an asynchronous asset processing pipeline utilizing the Cloudinary API for on-the-fly image optimization and transformation, cutting overall client-side asset load times by 35%."
    ],
    image: contentAiShot,
    tags: ["React.js", "Node.js", "Express.js", "Neon DB (PostgreSQL)", "ClerkAuth", "Cloudinary", "Gemini API", "Tailwind CSS"],
    metrics: { label: "Asset Load Cut", value: "35%" },
    demoLink: "https://content-ai-kohl.vercel.app/",
    repos: [],
    featured: true
  }
];

export const experiencesData: Experience[] = [
  {
    id: "kalaam-nitr",
    role: "Technical Head",
    company: "Kalaam NITR",
    period: "2026 - Present",
    location: "Rourkela, Odisha",
    bulletPoints: [
      "Collaborated with a cross-functional team to produce engaging digital content and layouts for club events, enhancing overall digital outreach.",
      "Spearheaded visual design for poetry-themed campaigns, blending traditional literature with modern graphic design principles for digital outreach."
    ]
  },
  {
    id: "achievements-cp",
    role: "Competitive Programmer & Student Leader",
    company: "NIT Rourkela",
    period: "2024 - Present",
    location: "Rourkela, Odisha",
    bulletPoints: [
      "Departmental Rank 2: Secured the second-highest academic standing within the Industrial Design department at NIT Rourkela, demonstrating consistent coursework excellence.",
      "AlgoUtsav Contest Finalist: Finalist twice (2024, 2025) in one of the largest competitive programming contests organized by the Programming Society of NIT Rourkela among 3,000+ participants.",
      "Competitive Programming: Solved 500+ data structures and algorithms (DSA) problems and participated in 15+ contests across LeetCode, GeeksforGeeks, and Codeforces to maintain a highly competitive rank."
    ]
  }
];
