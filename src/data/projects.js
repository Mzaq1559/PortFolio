/**
 * Real projects — GitHub: https://github.com/Mzaq1559
 */
export const projects = [
  {
    id: "siteflowai",
    title: "SiteFlowAI",
    description:
      "A full-stack cloud application deployed to Azure App Service: FastAPI (Uvicorn) backend and Vite/React frontend served from the same container, containerized with Docker and pushed through Azure Container Registry.",
    image: "https://picsum.photos/seed/siteflowai/800/600",
    category: "Web App",
    technologies: ["React", "Vite", "FastAPI", "Docker", "Azure App Service", "Azure Container Registry"],
    date: "2026",
    liveUrl: "https://siteflowai.azurewebsites.net",
    githubUrl: "https://github.com/SidraPervaiz1122/SiteFlowAI",
    featured: true
  },
  {
    id: "vehicle-vision",
    title: "Vehicle Vision",
    description:
      "Real-time vehicle detection, multi-object tracking, and speed estimation using YOLOv8 and ByteTrack, applied across two implementations: general vehicle intelligence (AutoVision) and live traffic monitoring (TrafficVision).",
    image: "https://picsum.photos/seed/vehiclevision/800/600",
    category: "AI/ML",
    technologies: ["Python", "YOLOv8", "ByteTrack", "Streamlit"],
    date: "2026",
    liveUrl: null,
    githubUrl: "https://github.com/Mzaq1559/autovision-vehicle-intelligence",
    featured: true
  },
  {
    id: "docvision-ai",
    title: "DocVision AI",
    description:
      "CV-based document scanner and intelligence app — document scanning, perspective correction, and text extraction using OpenCV and OCR, with a clean Streamlit interface.",
    image: "https://picsum.photos/seed/docvision-ai/800/600",
    category: "AI/ML",
    technologies: ["Python", "OpenCV", "OCR", "Streamlit"],
    date: "2026",
    liveUrl: "https://docvision-ai-hyzsm6qrsrdpap4ptkw4ga.streamlit.app/",
    githubUrl: "https://github.com/Mzaq1559/docvision-ai",
    featured: true
  },
  {
    id: "medibook-ai",
    title: "MediBook AI",
    description:
      "An AI-powered virtual receptionist for small and medium clinics in Pakistan. Patients describe symptoms in natural language; the system triages urgency via Groq LLM, recommends a specialist, checks live doctor availability, and books appointments with conflict validation. Built as project lead for a 4-person team at the Alibaba Cloud AI Hackathon Pakistan 2026, with a full-stack architecture spanning React frontend, FastAPI backend, and a dedicated AI microservice, all orchestrated via Docker Compose.",
    image: "https://picsum.photos/seed/medibook-ai/800/600",
    category: "AI/ML",
    technologies: [
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Groq LLM",
      "SQLAlchemy",
      "JWT"
    ],
    date: "2026",
    liveUrl: null,
    githubUrl: "https://github.com/Mzaq1559/MEDIBOOK_AI",
    featured: true
  },
  {
    id: "blog-website",
    title: "My Learning Diary",
    description:
      "A personal dev blog documenting my learning journey through backend engineering, system design, and software concepts. Articles cover topics like distributed systems, async Python, DSA, and architecture patterns.",
    image: "https://picsum.photos/seed/blog-mzaq/800/600",
    category: "Web App",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    date: "2026",
    liveUrl: "https://mzaq1559.github.io/My-Learning-Diary/",
    githubUrl: "https://github.com/Mzaq1559/My-Learning-Diary",
    featured: true
  },
  {
    id: 2,
    title: "Predictive Financial Dashboard",
    description:
      "Stock analytics in pure Python: indicators from scratch (MA, Bollinger, RSI), manual OLS regression, 10k Monte Carlo runs for portfolio optimisation, and 10 auto-generated charts — NumPy/Pandas only.",
    image: "https://picsum.photos/seed/fin-dash-mzaq/800/600",
    category: "Data Science",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "yfinance"],
    date: "2026",
    liveUrl: null,
    githubUrl: "https://github.com/Mzaq1559/financial_dashboard_Python",
    featured: true
  },
  {
    id: 3,
    title: "E-Shop",
    description:
      "Fully responsive e-commerce app with React & Vite: product browsing, cart, simulated auth (localStorage), and an admin dashboard — React Router v6 + Context API.",
    image: "https://picsum.photos/seed/eshop-mzaq/800/600",
    category: "Web App",
    technologies: ["React 18", "Vite", "Bootstrap 5", "React Router v6", "Context API"],
    date: "2026",
    liveUrl: null,
    githubUrl: "https://github.com/Mzaq1559/E-Shop",
    featured: false
  },
  {
    id: 4,
    title: "TextUtils React",
    description:
      "Minimal React text toolkit: case transforms, whitespace cleanup, word/character counts, reading time, clipboard copy, and dark/light mode — hooks only, no Redux.",
    image: "https://picsum.photos/seed/textutils-mzaq/800/600",
    category: "Web App",
    technologies: ["React", "JavaScript", "Bootstrap"],
    date: "2026",
    liveUrl: "https://mzaq1559.github.io/TextUtils-React/",
    githubUrl: "https://github.com/Mzaq1559/TextUtils-React",
    featured: false
  },
  {
    id: 5,
    title: "Titanic Visualisation Project",
    description:
      "EDA on the Titanic dataset: survival by class and gender, age groups, embarkation ports, fare heatmaps, and family-size effects — reproducible Jupyter workflow.",
    image: "https://picsum.photos/seed/titanic-mzaq/800/600",
    category: "Data Science",
    technologies: ["Python", "Jupyter", "Pandas", "Matplotlib", "Seaborn"],
    date: "2026",
    liveUrl: null,
    githubUrl: "https://github.com/Mzaq1559/Titanic_Visualization_Project",
    featured: false
  },
  {
    id: 6,
    title: "AutoSolver",
    description:
      "An AI-powered delivery dispatch optimization system built for the Meituan 2026 International AI Hackathon. Combines a real-time map interface with a FastAPI backend to solve courier-task assignment problems.",
    image: "https://picsum.photos/seed/autosolver/800/600",
    category: "Web App",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Leaflet", "FastAPI", "SQLite", "SQLAlchemy"],
    date: "2026",
    liveUrl: null,
    githubUrl: "https://github.com/Mzaq1559/Autosolver-dispatch",
    featured: true
  },
  {
    id: 7,
    title: "RCMS — Rental Car Management System",
    description:
      "A full-stack car rental management system built as a DBMS coursework project. Handles bookings, inventory, and transactions with a relational backend.",
    image: "https://picsum.photos/seed/rcms/800/600",
    category: "Web App",
    technologies: ["FastAPI", "pyodbc", "SQL Server", "Docker", "Vanilla JS", "HTML"],
    date: "2026",
    liveUrl: null,
    githubUrl: "https://github.com/Mzaq1559/IDBS-Lab_Project",
    featured: true
  },
  {
    id: "student-management-api",
    title: "Student Management REST API",
    description:
      "A clean RESTful API for managing student information built with .NET 10 and C#. Demonstrates modern ASP.NET Core practices, complete CRUD operations, and includes interactive Swagger/OpenAPI documentation.",
    image: "https://picsum.photos/seed/student-api/800/600",
    category: "Backend",
    technologies: ["C#", ".NET 10", "ASP.NET Core", "Swagger"],
    date: "2026",
    liveUrl: "#",
    githubUrl: "https://github.com/Mzaq1559/Student-Management-REST-API",
    featured: false
  },
  {
    id: "ecommerce-hadoop",
    title: "E-Commerce Behavior Analysis",
    description:
      "An end-to-end big data ETL pipeline processing ~100,000 user behavior records. Leverages the Hadoop ecosystem with Hive external tables for distributed storage and Python for generating conversion funnel and promotional effect insights.",
    image: "https://picsum.photos/seed/ecommerce-hadoop/800/600",
    category: "Data Engineering",
    technologies: ["Hadoop", "Hive", "Python", "Pandas", "Matplotlib", "Seaborn"],
    date: "2026",
    liveUrl: "#",
    githubUrl: "https://github.com/Mzaq1559/ecommerce-behavior-hadoop-analysis",
    featured: false
  },
  {
    id: "go-assistant",
    title: "Go Assistant",
    description:
      "A floating screen overlay app for WeChat that captures live Go board states and queries Claude AI to recommend the best next move. Built with Flutter, featuring a responsive UI and custom floating bubble interaction.",
    image: "https://picsum.photos/seed/go-assistant/800/600",
    category: "Mobile App",
    technologies: ["Flutter", "Dart", "Claude AI API"],
    date: "2026",
    liveUrl: "#",
    githubUrl: "https://github.com/Mzaq1559/Go_Assistant",
    featured: false
  },
  {
    id: "airline-reservation",
    title: "Airline Reservation System",
    description:
      "A console-based CLI application to manage flight bookings across multiple destinations. Built as a Data Structures & Algorithms coursework project implementing manual singly linked lists and arrays.",
    image: "https://picsum.photos/seed/airline-reservation/800/600",
    category: "Software",
    technologies: ["C++", "Data Structures", "Linked Lists"],
    date: "2026",
    liveUrl: "#",
    githubUrl: "https://github.com/Mzaq1559/DSA-Lab_Project",
    featured: false
  },
  {
    id: "atm-simulation",
    title: "Enhanced ATM Simulation",
    description:
      "An interactive command-line application simulating a full ATM machine to demonstrate core OOP principles (encapsulation, inheritance, polymorphism). Features secure authentication, multi-threaded logging, and a dedicated admin mode.",
    image: "https://picsum.photos/seed/atm-simulation/800/600",
    category: "Software",
    technologies: ["C++11", "OOP", "Multithreading"],
    date: "2026",
    liveUrl: "#",
    githubUrl: "https://github.com/Mzaq1559/OOP-Lab_Project",
    featured: false
  }
];
