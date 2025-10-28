import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  profile: {
    name: "Your Name",
    title: "Cybersecurity Analyst | Full-Stack Developer",
    location: "City, Country",
    bio: "Passionate cybersecurity professional with a knack for developing secure and robust web applications. Eager to apply my skills to solve complex security challenges.",
    linkedin: "https://linkedin.com/in/your-username",
    github: "https://github.com/your-username",
    email: "your.email@example.com",
  },
  projects: [
    {
      title: "Secure Authentication System",
      description: "A full-stack web application featuring a robust, multi-factor authentication system using modern encryption standards.",
      tags: ["Next.js", "TypeScript", "Node.js", "Cryptography"],
      link: "https://github.com/your-username/secure-auth-system",
    },
    {
      title: "Network Vulnerability Scanner",
      description: "A Python-based tool that scans a local network for open ports and known vulnerabilities, generating a detailed security report.",
      tags: ["Python", "Networking", "Security"],
    },
    {
        title: "Portfolio Website",
        description: "This very website, built with Next.js and Tailwind CSS to be fast, modern, and fully responsive.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        link: "https://github.com/your-username/portfolio",
      },
  ],
  certificates: [
    {
      title: "Certified Ethical Hacker (CEH)",
      issuer: "EC-Council",
      date: "2023",
      link: "#",
    },
    {
      title: "CompTIA Security+",
      issuer: "CompTIA",
      date: "2022",
    },
  ],
  skills: [
    { name: "JavaScript", category: "language" },
    { name: "TypeScript", category: "language" },
    { name: "Python", category: "language" },
    { name: "Next.js", category: "framework" },
    { name: "React", category: "framework" },
    { name: "Node.js", category: "framework" },
    { name: "Git", category: "tool" },
    { name: "Docker", category: "tool" },
    { name: "Nmap", category: "tool" },
    { name: "AWS", category: "platform" },
    { name: "GCP", category: "platform" },
    { name: "PostgreSQL", category: "database" },
    { name: "MongoDB", category: "database" },
  ],
};
