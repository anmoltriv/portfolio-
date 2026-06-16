import { Project, Experience, Skill } from "./types";

export const projectsData: Project[] = [
  {
    id: "contentai",
    title: "Content.ai",
    tagline: "Full-Stack AI Content SaaS Engine",
    description: "Built a smart article writing and text-to-image pipeline integrating Gemini API and FLUX models with Clerk, serverless PostgreSQL, and optimized asset delivery.",
    detailedDescription: "Built a full-stack SaaS content engine using Gemini API and the open-source FLUX model to automate long-form article writing and high-fidelity text-to-image synthesis pipelines. Integrated Clerk Auth via an asynchronous webhook architecture, maintaining sub-120ms dashboard synchronization latency across multi-tier billing-enabled user profiles. Optimized serverless PostgreSQL schemas via Neon DB connection pooling, handling complex concurrent dashboard data requests with consistent sub-100ms database latency. Designed an asynchronous asset processing pipeline utilizing Cloudinary API for on-the-fly image optimization and transformation, cutting overall client-side asset load times by 35%.",
    tags: ["React.js", "Node.js", "Express.js", "Neon DB (PostgreSQL)", "ClerkAuth", "Cloudinary", "Gemini API", "Tailwind CSS"],
    metrics: { label: "Asset Load Cut", value: "35%" },
    githubLink: "https://github.com",
    featured: true
  },
  {
    id: "shopsphere",
    title: "ShopSphere",
    tagline: "Full-Stack Marketplace Platform",
    description: "Engineered scalable e-commerce architecture with Redux central state, secure JWT Role-Based Access Control, and robust Mongoose transactional layer.",
    detailedDescription: "Engineered a scalable MERN-stack production architecture supporting 100+ concurrent products with secure JWT-based authentication and Role-Based Access Control (RBAC). Developed a centralized global state management system using Redux Toolkit, optimizing frontend data flow and reducing redundant API calls by 30% to maximize load speeds. Integrated a robust MongoDB relational mapping layer via Mongoose, validating complex transactional schemas, deep order histories, and responsive Tailwind CSS layout rendering.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux Toolkit", "Tailwind CSS"],
    metrics: { label: "Redundant Calls Cut", value: "30%" },
    githubLink: "https://github.com",
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

export const skillsData: Skill[] = [
  // Category 1: Core Programming & Scripting
  { name: "C++ Programming", category: "frontend", percentage: 95 },
  { name: "Python Scripting", category: "frontend", percentage: 88 },
  { name: "C Programming", category: "frontend", percentage: 82 },
  { name: "JavaScript / ES6+", category: "frontend", percentage: 90 },
  // Category 2: Web & Full-Stack Development
  { name: "React.js / Node.js", category: "backend", percentage: 93 },
  { name: "Express.js & MongoDB", category: "backend", percentage: 89 },
  { name: "Redux Toolkit & State", category: "backend", percentage: 90 },
  { name: "Tailwind CSS & HTML5/CSS3", category: "backend", percentage: 95 },
  { name: "Serverless PostgreSQL", category: "backend", percentage: 86 },
  // Category 3: Data Science, Design & Ops
  { name: "Scikit-learn / NLP", category: "design_tools", percentage: 80 },
  { name: "Pandas & NumPy & Seaborn", category: "design_tools", percentage: 87 },
  { name: "Git & GitHub Versioning", category: "design_tools", percentage: 90 },
  { name: "Figma (UI Design)", category: "design_tools", percentage: 85 },
  { name: "VS Code / PyCharm", category: "design_tools", percentage: 92 }
];
