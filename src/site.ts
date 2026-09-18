/**
 * Personal content copied from the original portfolio (copy, links, facts).
 * Visual system is new; this file is the source of truth for who Anmol is.
 */
export const SITE = {
  firstName: "Anmol",
  lastName: "Trivedi",
  monogram: "AT",
  fullName: "Anmol Trivedi",
  title: "Full Stack Dev & System Engineer",
  shortRole: "Fullstack Developer & Designer",
  availability: "Available for Work & Internships",
  email: "anmolop.works@gmail.com",
  phone: "(+91) 6387297103",
  location: "Rourkela, India",
  locationLine: "Rourkela, IN",
  timezone: "Asia/Kolkata",
  timezoneLabel: "UTC+5:30",
  college: "NIT Rourkela",
  degree: "Industrial Design & CS Minor '28",
  cgpa: "8.75 / 10",
  leetcode: "Solved 500+",
  extracurricular: "Kalaam's Technical Head",
  headline: "I bridge the gap between",
  taglines: [
    "complex system design and seamless execution.",
    "high-performance architecture and practical scalability.",
    "aesthetics and functionality."
  ],
  quote:
    "Structuring clean logical architecture in code, engineering pristine interfaces in design.",
  philosophyTitle: "Fullstack Logic.",
  philosophyAccent: "Systems that Scale",
  philosophyBody:
    "I do not simply construct isolated backend containers or write basic scripts. I sweat the system throughput, the database normalization, the relational schema index metrics, the edge-case algorithmic logic, and the end-to-end reliability. Code should be as optimized as it is architecturally sound.",
  socials: [
    { href: "https://github.com/anmoltriv", label: "GitHub", kind: "github" as const },
    {
      href: "https://www.linkedin.com/in/anmol-trivedi-op/",
      label: "LinkedIn",
      kind: "linkedin" as const
    },
    { href: "https://codolio.com/profile/anmolop", label: "Codolio", kind: "codolio" as const }
  ],
  footerFacts: [
    { label: "Location Coordinates", value: "NIT Rourkela, India" },
    { label: "Primary Affiliation", value: "Industrial Design & CS Minor '28" },
    { label: "Active Status", value: "Internship Openings" }
  ]
} as const;

export const MARQUEE_WORDS = [
  "USER-FRIENDLY",
  "ADAPTIVE",
  "FLUID",
  "FUTURE-PROOF",
  "SEO-READY",
  "IMMERSIVE",
  "DEPENDABLE",
  "CAPTIVATING",
  "SYSTEMS-FIRST",
  "PRECISE"
] as const;

export const NAV_LINKS = [
  { href: "#hero-screen", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#twin-assistant", label: "Twin" }
] as const;
