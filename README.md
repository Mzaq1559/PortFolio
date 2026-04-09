# Interactive Personal Portfolio Website
A modern, high-performance personal portfolio showcasing technical expertise and professional work.

[![Live Demo](https://img.shields.io/badge/demo-live-teal?style=for-the-badge)](https://mzaq1559.github.io/PortFolio/)
[![GitHub](https://img.shields.io/badge/github-repo-black?style=for-the-badge&logo=github)](https://github.com/Mzaq1559/PersonalPortfolio)

![Portfolio Preview](./public/preview.png)

## About the Project
This project is an interactive, premium personal portfolio designed and built by **Muhammad Zulqarnain Abdullah**. It serves as a central hub to showcase expertise in backend systems, distributed architecture, and scalable software engineering. The site emphasizes performant UI/UX with a focus on technical depth and clean aesthetics.

## Features
- **Animated Hero Section**: Dynamic entry animations with typewriter effects and smooth transitions.
- **Bento Widget Layout**: Modern grid-based interactive widgets for social links and status.
- **Custom Cursor**: Clean, high-performance dot cursor with smooth movement tracking.
- **Skills Section**: Categorized technical stack with animated progress bars.
- **Filtered Projects**: Portfolio showcase with real-time category filtering (Web, Data Science, etc.).
- **Experience Timeline**: Detailed professional and educational history in a structured vertical layout.
- **Contact Form**: Functional, validated communication gateway with integration for EmailJS.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewports.
- **Reduced Motion Support**: Respects system-level accessibility settings for animations.

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Core UI library for component-based architecture. |
| **Vite** | Modern frontend build tool for fast development and bundling. |
| **TypeScript** | Static typing for improved developer experience and code reliability. |
| **Tailwind CSS** | Utility-first styling for high-fidelity responsive design. |
| **Framer Motion** | Advanced physics-based animations and transitions. |
| **Lucide React** | Clean, consistent iconography throughout the site. |

## Project Structure
```bash
src/
├── app/
│   ├── components/
│   │   ├── layout/       # Navigation, Custom Cursor, Scroll Progress
│   │   ├── sections/     # Hero, About, Skills, Projects, Experience, Contact
│   │   └── widgets/      # Interactive Bento widgets
│   └── App.tsx           # Main application shell
├── data/                 # JSON data for projects, skills, and experience
├── hooks/                # Custom React hooks (useCountUp, useScrollSpy, etc.)
├── main.tsx              # Application entry point
└── index.css             # Global styles and tailwind directives
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Mzaq1559/PersonalPortfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd PersonalPortfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```

## Deployment
The project is configured for automated deployment to **GitHub Pages**. Simply push changes to the `main` branch, and the GitHub Action will automatically build and deploy the production bundle to the target URL.

## Connect
- **Portfolio**: [mzaq1559.github.io/PersonalPortfolio/](https://mzaq1559.github.io/PersonalPortfolio/)
- **Blog**: [My Learning Diary](https://mzaq1559.github.io/Blog_Website-My-Learning-Diary-/)
- **LinkedIn**: [muhammad-zulqarnain-26276b319](https://www.linkedin.com/in/muhammad-zulqarnain-26276b319)
- **GitHub**: [@Mzaq1559](https://github.com/Mzaq1559)
- **Email**: [zulqarnain.dev@gmail.com](mailto:zulqarnain.dev@gmail.com)
