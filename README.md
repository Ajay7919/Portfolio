# Maddula Ajay Rathna - Data Analyst Portfolio

A modern, high-performance personal portfolio website built for **Maddula Ajay Rathna**, inspired by the dark-mode aesthetic, card glow effects, and interactive features.

---

## 🌟 Key Highlights & Features

- **Deep Dark Aesthetic (`#050505`)**: Clean glassmorphism, crimson red accents (`#FF2A2A`), and multi-color gradient border glow (`card-glow`).
- **Typographic Impact**: Bold display typography (`Oswald`), crisp data labels (`Inter`), and monospace metrics (`JetBrains Mono`), complete with giant section watermark outlines (`DATA ANALYST`, `ABOUT`, `SKILLS`, `PROJECTS`).
- **Interactive Live Analytics Simulator**: An interactive **Box Office Revenue Predictor** powered by Chart.js where visitors can adjust production budget, marketing spend, genre, star rating, and release windows to see dynamic revenue forecasting and ROI projections in real time.
- **Ajay AI Assistant**: An embedded, interactive AI chatbot widget in the bottom-right corner that answers questions about Ajay's skills, projects, experience at SkillForge, education, and contact details with preset quick chips and portfolio section citations.
- **Projects Showcase & Modal Deep Dives**: Detailed cards for all 3 key analytics projects with live category filters (`All`, `Predictive ML`, `NLP & Sentiment`, `BI & Dashboards`) and detailed modal deep dives.
- **Experience Timeline**: Structured breakdown of Ajay's Data Analyst Internship at **SkillForge** (Bangalore, 2024–2025) highlighting EDA, scalable SQL ETL pipelines, Tableau dashboards, and statistical modeling.
- **Printable / Downloadable Resume**: A dedicated print-optimized resume view (`resume.html`) accessible via 1-click on the navigation bar.
- **Direct Contact & Copy Buttons**: 1-click clipboard copy for email (`maddulaajayrathna@gmail.com`) and phone (`+91-9642177022`), plus links to LinkedIn and GitHub.

---

## 📂 Project Structure

```
Portfolio/
├── index.html          # Main single-page application
├── resume.html         # Printable & downloadable resume
├── server.py           # Lightweight Python server with API endpoints
├── css/
│   └── styles.css      # Card glows, watermarks, glassmorphism, chatbot styles
├── js/
│   ├── app.js          # App interactions, Chart.js simulator, modals, filters
│   └── chatbot.js      # Ajay AI Assistant logic & knowledge base
└── README.md           # Documentation
```

---

## 🚀 Running the Portfolio Locally

Run the included server:

```bash
python3 server.py
```

Then open your browser at:
- **Portfolio Website**: [http://localhost:1910](http://localhost:1910) or [http://localhost:1910/ajaysprofile1910](http://localhost:1910/ajaysprofile1910)
- **Printable Resume**: [http://localhost:1910/resume.html](http://localhost:1910/resume.html)

---

## 🛠️ Tech Stack

- **HTML5 & CSS3**
- **Tailwind CSS** (Utility-first modern styling)
- **Vanilla JavaScript (ES6+)**
- **Chart.js** (Dynamic data visualizations)
- **Lucide Icons** (Clean modern UI icons)
- **Python HTTP Server** (Local hosting & API endpoints)
