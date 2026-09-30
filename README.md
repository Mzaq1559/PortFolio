# Muhammad Zulqarnain Abdullah — Portfolio

A modern personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Motion. It presents my software-development work, AI/ML projects, technical skills, experience, and learning journey.

**Live site:** https://mzaq1559.github.io/PortFolio/

## What it includes

- Responsive desktop sidebar and mobile navigation
- Animated hero section with rotating roles and a lightweight spotlight/grid background
- Interactive status/bento widgets
- Skills grouped by category with proficiency labels
- Filterable project showcase with repository preview images
- Experience and education timeline
- EmailJS contact form
- Scroll progress and scroll-to-top controls
- Custom cursor on pointer devices
- Reduced-motion support
- Responsive layout for mobile, tablet, and desktop

## Tech stack

| Technology | Role |
| --- | --- |
| React 18 | UI and component architecture |
| TypeScript | Type-safe application code |
| Vite | Development and production build tooling |
| Tailwind CSS 4 | Styling and responsive layout |
| Motion | UI transitions and interaction animations |
| Lucide React | Icons |
| EmailJS | Contact form delivery |

The project intentionally avoids adding a large animation framework such as GSAP or Three.js. Motion is sufficient for the current interaction layer.

## Project structure

```text
src/
├── app/
│   ├── components/
│   │   ├── layout/       # Navbar, cursor, scroll controls
│   │   ├── sections/     # Hero, About, Skills, Projects, Experience, Contact
│   │   └── widgets/      # Interactive hero widgets
│   └── App.tsx
├── data/                 # Project and skill data
├── hooks/                # Reusable UI hooks
├── styles/               # Tailwind/theme/global styles
└── main.tsx
public/
└── cv/                   # Downloadable CV
```

## Run locally

Prerequisites: Node.js 18+.

```bash
git clone https://github.com/Mzaq1559/PortFolio.git
cd PortFolio
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Deployment

The portfolio is deployed to GitHub Pages at:

https://mzaq1559.github.io/PortFolio/

## Connect

- **GitHub:** https://github.com/Mzaq1559
- **LinkedIn:** https://www.linkedin.com/in/muhammad-zulqarnain-26276b319
- **Learning Diary:** https://mzaq1559.github.io/My-Learning-Diary/
- **Kaggle:** https://www.kaggle.com/mzaq1559

---

Built by **Muhammad Zulqarnain Abdullah**, UET Taxila · Computer Science.
