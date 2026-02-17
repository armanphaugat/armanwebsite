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
    title: "Gamezo Bot",
    description:
      "A feature-rich Discord bot built using Python and SQLite that offers multiple interactive games such as Coin Flip, Rock-Paper-Scissors, and a PvP Cricket Game with reaction-based logic. It also includes a stock trading simulation with real-time dynamic price updates, making it an engaging experience for users.",
    image: gamezoLogo,
    tags: ["Python", "SQLite", "Discord API", "Game Logic", "Real-time Simulation"],
    github: "https://github.com/armanphaugat/Gamezo-Bot",
    webapp: "",
  },
  {
    id: 1,
    title: "Cricket Score Predictor",
    description:
      "A machine learning-based web application that predicts cricket scores using match data, pitch type, and player statistics. The model leverages regression algorithms to forecast first-innings scores, providing valuable insights for analysts and fans alike.",
    image: cricketLogo,
    tags: ["Python", "Scikit-learn", "Pandas", "React JS", "Flask"],
    github: "https://github.com/armanphaugat/Cricket-Score-Predictor",
    webapp: "",
  },
  {
    id: 2,
    title: "IPL Win Predictor",
    description:
      "A data-driven machine learning project that predicts the winning probability of IPL teams based on real match data, toss results, venue, and team performance metrics. Designed with Flask and React for interactive visualizations of prediction results.",
    image: cricketLogo,
    tags: ["Python", "Machine Learning", "Flask", "React JS", "Pandas", "NumPy"],
    github: "https://github.com/armanphaugat/IPL-Win-Predictor",
    webapp: "",
  },
  {
    id: 3,
    title: "Cuntrex - 2D Game",
    description:
      "A 2D shooter game built with Python and Pygame featuring realistic obstacle physics using Pymunk. The game includes smooth player movement, AI enemies, and collision detection for an immersive gameplay experience.",
    image: cuntrexLogo,
    tags: ["Python", "Pygame", "Pymunk", "Game Development"],
    github: "https://github.com/armanphaugat/Cuntrex-2D-Game",
    webapp: "",
  },
  {
    id: 4,
    title: "Tic Tac Toe",
    description:
      "A simple yet elegant Tic Tac Toe web game developed using HTML, CSS, and JavaScript. The project focuses on clean design, responsive layout, and smooth gameplay logic for an enjoyable experience.",
    image: tictactoeLogo,
    tags: ["HTML", "CSS", "JavaScript", "Game Logic"],
    github: "https://github.com/armanphaugat/Tic-Tac-Toe",
    webapp: "https://arman-tictactoe.netlify.app/",
  },
  {
    id: 5,
    title: "WhatsApp Chat Analyzer",
    description:
      "A Python-based tool that analyzes exported WhatsApp chats to extract key statistics like message frequency, top contacts, most used words, and time-based activity patterns. Ideal for visualizing communication trends.",
    image: whatsappLogo,
    tags: ["Python", "Pandas", "Matplotlib", "Data Visualization"],
    github: "https://github.com/armanphaugat/WhatsApp-Chat-Analyzer",
    webapp: "",
  },
  {
    id: 6,
    title: "Book Recommendation System",
    description:
      "A machine learning-based recommendation system that suggests books based on user preferences and similarity scores. Built with collaborative filtering and deployed via a simple React interface for easy interaction.",
    image: bookrecLogo,
    tags: ["Python", "Scikit-learn", "Flask", "React JS", "Machine Learning"],
    github: "https://github.com/armanphaugat/Book-Recommendation-System",
    webapp: "",
  },
  {
    id: 7,
    title: "Salesforce UI Clone",
    description:
      "A modern UI clone of Salesforce built using React.js and Tailwind CSS, replicating the dashboard components, analytics visuals, and responsive layouts for a professional SaaS-like experience.",
    image: salesforceLogo,
    tags: ["React JS", "Tailwind CSS", "UI Design", "Frontend Development"],
    github: "https://github.com/armanphaugat/Salesforce-UI-Clone",
    webapp: "",
  },
  {
    id: 8,
    title: "Personal Portfolio Website",
    description:
      "A minimalist, responsive personal portfolio built using React and Tailwind CSS. It highlights my projects, skills, and achievements, reflecting my journey as an aspiring Software Developer. The website includes smooth animations, a download resume feature, and a clean professional design.",
    image: portfolioLogo,
    tags: ["React JS", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    github: "https://github.com/armanphaugat/Portfolio",
    webapp: "https://armanphaugat.netlify.app/",
  },
];

export default {SkillsData,experiences,projects};
