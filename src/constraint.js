// =======================
// ⚡ ALL SKILLS SECTION
// =======================

// Importing skill logos — make sure folder name is exactly "assets"
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactLogo from './assets/tech_logo/reactjs.png';
import tailwindLogo from './assets/tech_logo/tailwindcss.png';
import nodeLogo from './assets/tech_logo/nodejs.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import cLogo from './assets/tech_logo/c.png';
import cppLogo from './assets/tech_logo/cpp.png';
import javaLogo from './assets/tech_logo/java.png';
import pythonLogo from './assets/tech_logo/python.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import mlLogo from './assets/tech_logo/ML.png';
import discordBotLogo from './assets/tech_logo/discordbot.png';
import gamezoLogo from './assets/work_logo/gamezoLogo.png';
import cricketLogo from './assets/work_logo/cricketLogo.png';
import cuntrexLogo from './assets/work_logo/cuntrexLogo.png';
import tictactoeLogo from './assets/work_logo/tictactoeLogo.png';
import whatsappLogo from './assets/work_logo/whatsappLogo.png';
import bookrecLogo from './assets/work_logo/bookrecLogo.png';
import salesforceLogo from './assets/work_logo/salesforceLogo.png';
import portfolioLogo from './assets/work_logo/portfolioLogo.png';
// =======================
// 🧠 SKILLS DATA
// =======================

export const SkillsData = [
  {
    category: 'All Skills',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React.js', logo: reactLogo },
      { name: 'Tailwind CSS', logo: tailwindLogo },
      { name: 'Node.js', logo: nodeLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'C', logo: cLogo },
      { name: 'C++', logo: cppLogo },
      { name: 'Java', logo: javaLogo },
      { name: 'Python', logo: pythonLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Machine Learning', logo: mlLogo },
      { name: 'Discord Bot Dev', logo: discordBotLogo },
    ],
  },
];
export const experiences = [
  {
    id: 0,
    role: "Web Development Intern",
    company: "Indavis LifeScience",
    date: "May 2025 - July 2025",
    desc: "Contributed to web application development, building responsive and interactive UI components. Assisted in implementing frontend features using React JS and Tailwind CSS, and collaborated with the team to optimize user experience.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React JS",
      "Tailwind CSS",
    ],
  },
];
export const projects = [
  {
    id: 0,
    title: "Gamezo Discord Bot",
    description:
      "A heavy backend Discord bot featuring multi-game system (Coin Flip, Rock-Paper-Scissors, Airplane Crash), live stock market simulation, and economy system with portfolio management. Built with async patterns, SQLite persistence, and comprehensive leaderboard tracking.",
    image: gamezoLogo,
    tags: ["Python", "Discord.py", "SQLite3", "Backend", "Game", "asyncio"],
    github: "https://github.com/armanphaugat/Gamezo-Bot",
    webapp: "",
  },
  {
    id: 1,
    title: "Cricket Score Predictor",
    description:
      "Machine learning-based IPL/T20/ODI score prediction using XGBoost models trained on real match data. Provides live predictions via Streamlit UI with format-specific feature engineering and CricAPI integration.",
    image: cricketLogo,
    tags: ["Python", "XGBoost", "Scikit-learn", "Streamlit", "ML", "API"],
    github: "https://github.com/armanphaugat/Cricket-Score-Predictor",
    webapp: "",
  },
  {
    id: 2,
    title: "IPL Win Predictor",
    description:
      "Real-time IPL match win probability predictor using Random Forest + Logistic Regression ensemble. Analyzes dynamic game state (CRR, RRR, wickets) and provides instant predictions via interactive Streamlit dashboard.",
    image: cricketLogo,
    tags: ["Python", "Machine Learning", "Streamlit", "Pandas", "NumPy", "Data Science"],
    github: "https://github.com/armanphaugat/IPL-Win-Predictor",
    webapp: "",
  },
  {
    id: 3,
    title: "Cuntrex - 2D Game",
    description:
      "A 2D shooter game built with Python and Pygame featuring realistic obstacle physics using Pymunk. The game includes smooth player movement, AI enemies, and collision detection for an immersive gameplay experience.",
    image: cuntrexLogo,
    tags: ["Python", "Pygame", "Game Dev", "OOP", "Physics Engine"],
    github: "https://github.com/armanphaugat/Cuntrex-2D-Game",
    webapp: "",
  },
  {
    id: 4,
    title: "Tic Tac Toe",
    description:
      "A simple yet elegant Tic Tac Toe web game developed using HTML, CSS, and JavaScript. The project focuses on clean design, responsive layout, and smooth gameplay logic for an enjoyable user experience.",
    image: tictactoeLogo,
    tags: ["HTML", "CSS", "JavaScript", "Frontend", "Game"],
    github: "https://github.com/armanphaugat/Tic-Tac-Toe",
    webapp: "https://arman-tictactoe.netlify.app/",
  },
  {
    id: 5,
    title: "WhatsApp Chat Analyzer",
    description:
      "Python-based data analysis tool for exported WhatsApp chats. Extracts message frequency, top contacts, word clouds, emoji breakdowns, and activity patterns with Matplotlib visualizations.",
    image: whatsappLogo,
    tags: ["Python", "Pandas", "Data Analysis", "Visualization", "Regex"],
    github: "https://github.com/armanphaugat/WhatsApp-Chat-Analyzer",
    webapp: "",
  },
  {
    id: 6,
    title: "RAG Discord Bot",
    description:
      "Full-stack AI bot combining FastAPI backend with Discord.py frontend. Ingests PDFs and web pages via LangChain, stores embeddings in FAISS per-guild, and delivers RAG responses via Groq Llama 3.3 with rate limiting and async handling.",
    image: bookrecLogo,
    tags: ["Python", "FastAPI", "LangChain", "RAG", "Backend+AI", "Discord"],
    github: "https://github.com/armanphaugat/Book-Recommendation-System",
    webapp: "",
  },
  {
    id: 7,
    title: "Salesforce UI Clone",
    description:
      "Modern UI clone of Salesforce built using React.js and Tailwind CSS, replicating the dashboard components, analytics visuals, and responsive layouts for a professional SaaS-like experience.",
    image: salesforceLogo,
    tags: ["React JS", "Tailwind CSS", "UI Design", "Frontend", "Responsive"],
    github: "https://github.com/armanphaugat/Salesforce-UI-Clone",
    webapp: "",
  },
  {
    id: 8,
    title: "Personal Portfolio Website",
    description:
      "A minimalist, responsive personal portfolio built using React and Tailwind CSS. It highlights projects, skills, and achievements, reflecting a journey as an aspiring full-stack developer with smooth animations and professional design.",
    image: portfolioLogo,
    tags: ["React JS", "Tailwind CSS", "Framer Motion", "Portfolio", "Frontend"],
    github: "https://github.com/armanphaugat/Portfolio",
    webapp: "https://armanphaugat.netlify.app/",
  },
];

export default {SkillsData,experiences,projects};
