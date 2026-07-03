import { Trophy, BookOpen, Car, GraduationCap, LineChart, ShoppingCart, Type, BarChart } from 'lucide-react';
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
    role: "Web App",
    period: "2026",
    logo: <BookOpen className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />,
    responsibilities: [
      "Tech: HTML, CSS, JavaScript, GitHub Pages",
      "A personal dev blog documenting my learning journey through backend engineering, system design, and software concepts. Articles cover topics like distributed systems, async Python, DSA, and architecture patterns."
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
  },
  {
    id: 4,
    company: "Predictive Financial Dashboard",
    role: "Data Science",
    period: "2026",
    logo: <LineChart className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />,
    responsibilities: [
      "Tech: Python, Pandas, NumPy, Matplotlib, yfinance",
      "Stock analytics in pure Python: indicators from scratch (MA, Bollinger, RSI), manual OLS regression, 10k Monte Carlo runs for portfolio optimisation, and 10 auto-generated charts — NumPy/Pandas only."
    ],
    side: "right"
  },
  {
    id: 5,
    company: "E-Shop",
    role: "Web App",
    period: "2026",
    logo: <ShoppingCart className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />,
    responsibilities: [
      "Tech: React 18, Vite, Bootstrap 5, React Router v6, Context API",
      "Fully responsive e-commerce app with React & Vite: product browsing, cart, simulated auth (localStorage), and an admin dashboard — React Router v6 + Context API."
    ],
    side: "left"
  },
  {
    id: 6,
    company: "TextUtils React",
    role: "Web App",
    period: "2026",
    logo: <Type className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />,
    responsibilities: [
      "Tech: React, JavaScript, Bootstrap",
      "Minimal React text toolkit: case transforms, whitespace cleanup, word/character counts, reading time, clipboard copy, and dark/light mode — hooks only, no Redux."
    ],
    side: "right"
  },
  {
    id: 7,
    company: "Titanic Visualisation Project",
    role: "Data Science",
    period: "2026",
    logo: <BarChart className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />,
    responsibilities: [
      "Tech: Python, Jupyter, Pandas, Matplotlib, Seaborn",
      "EDA on the Titanic dataset: survival by class and gender, age groups, embarkation ports, fare heatmaps, and family-size effects — reproducible Jupyter workflow."
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
