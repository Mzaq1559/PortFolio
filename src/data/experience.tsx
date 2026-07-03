import { Trophy, BookOpen, Car, GraduationCap } from 'lucide-react';
import React from 'react';

export const experience = [
  {
    id: 1,
    company: "Meituan 2026 International AI Hackathon",
    role: "Built AutoSolver",
    period: "2026",
    logo: <Trophy className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />,
    responsibilities: [
      "AI delivery dispatch optimization system",
      "Frontend: React, TypeScript, Vite, Tailwind, Leaflet",
      "Backend: FastAPI, SQLite, SQLAlchemy"
    ],
    side: "left"
  },
  {
    id: 2,
    company: "My Learning Diary",
    role: "Serverless CMS Blog",
    period: "In progress",
    logo: <BookOpen className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />,
    responsibilities: [
      "Ongoing personal project",
      "Built with React 18, TypeScript, Vite, Tailwind",
      "Uses GitHub's REST API (Octokit) to commit Markdown directly to GitHub"
    ],
    side: "right"
  },
  {
    id: 3,
    company: "RCMS — Rental Car Management System",
    role: "Full-Stack App",
    period: "Coursework",
    logo: <Car className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />,
    responsibilities: [
      "DBMS coursework project",
      "Backend: FastAPI, pyodbc, SQL Server (Docker)",
      "Frontend: Vanilla JS/HTML"
    ],
    side: "left"
  }
];

export const education = [
  {
    id: 1,
    degree: "BSc Computer Science",
    institution: "UET Taxila",
    year: "(2024 - 2028)",
    icon: <GraduationCap className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />
  }
];
