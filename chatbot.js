// Maddula Ajay Rathna - Portfolio AI Assistant (Inspired by sreestats.in)

(function() {
  const KNOWLEDGE_BASE = {
    about: {
      answer: "I'm Maddula Ajay Rathna, a detail-oriented Data Analyst with hands-on experience in gathering, wrangling, and analyzing large datasets to produce actionable business insights. I specialize in Python, SQL, Tableau, and Excel, with a strong foundation in statistics, data visualization, and predictive modeling.",
      sources: [{ title: "About Ajay", url: "#about" }]
    },
    skills: {
      answer: "Ajay's core technical stack includes:\n• Languages & Databases: Python, SQL, MySQL, ETL & Data Extraction\n• Analysis & Visualization: Excel, Pandas, NumPy, Matplotlib, Seaborn, Tableau Dashboards\n• Machine Learning: Scikit-learn, Ensemble Methods, NLP, Jupyter, Git\n• Core Competencies: Data Cleansing, EDA, Trend Analysis, Business Intelligence",
      sources: [{ title: "Technical Skills", url: "#skills" }]
    },
    experience: {
      answer: "Ajay worked as a Data Analyst Intern at SkillForge (2024–2025 in Bangalore). During this time, he performed exploratory data analysis (EDA) to uncover trends and anomalies, wrote scalable SQL queries for relational databases, built interactive Tableau dashboards for non-technical stakeholders, and applied Python-based statistical analysis to drive business recommendations.",
      sources: [{ title: "SkillForge Experience", url: "#experience" }]
    },
    projects: {
      answer: "Ajay has built 3 key analytics and ML projects:\n1. Movie Box Office Revenue Analysis & Forecasting: Multi-source dataset collection, EDA for revenue drivers, and ensemble learning models.\n2. Content Moderation & Sentiment Analysis System: NLP-driven text classification and sentiment analytics.\n3. Social Media Content Analysis: Uncovered engagement patterns and built executive reporting dashboards.",
      sources: [{ title: "View Projects", url: "#projects" }]
    },
    boxoffice: {
      answer: "In the Movie Box Office Revenue Analysis & Forecasting project, Ajay collected, cleaned, and preprocessed multi-source movie data. He conducted deep EDA to discover key revenue drivers (budget, release season, marketing), engineered predictive features, and trained ensemble learning models to forecast box office earnings with high accuracy.",
      sources: [{ title: "Movie Box Office Project", url: "#projects" }, { title: "Interactive Simulator", url: "#simulator" }]
    },
    sentiment: {
      answer: "In the Content Moderation & Sentiment Analysis System, Ajay analyzed large-scale textual datasets utilizing Natural Language Processing (NLP) to classify user content, determine sentiment intensity, and produce automated intelligence reports supporting moderation safety decisions.",
      sources: [{ title: "Sentiment Analysis Project", url: "#projects" }]
    },
    socialmedia: {
      answer: "For the Social Media Content Analysis project, Ajay evaluated social platform engagement metrics across different media formats and posting schedules, producing interactive dashboards that translated raw data into clear growth strategies.",
      sources: [{ title: "Social Media Analysis", url: "#projects" }]
    },
    education: {
      answer: "Ajay is pursuing his B.Tech in Computer Science and Engineering at SRM Institute of Science and Technology, Ramapuram (2022–2026) with a CGPA of 7.9/10. His coursework includes Data Science, DBMS, Machine Learning, AI, DSA, Software Engineering, and NLP.",
      sources: [{ title: "Education & Degrees", url: "#education" }]
    },
    certificates: {
      answer: "Ajay holds recognized certifications in:\n1. Python Programming & MySQL\n2. Data Science with Python\n3. Generative AI — ChatGPT",
      sources: [{ title: "Certificates", url: "#education" }]
    },
    contact: {
      answer: "You can reach Ajay directly via:\n• Email: maddulaajayrathna@gmail.com\n• Phone: +91-9642177022\n• LinkedIn: linkedin.com/in/maddulaajay-rathna-287b451b1\n• GitHub: github.com/Ajay7919/Ajay-Rathna-M",
      sources: [{ title: "Contact Ajay", url: "#contact" }]
    },
    resume: {
      answer: "You can download Ajay's comprehensive resume directly using the 'Download Resume' button on the portfolio navbar, or check the Education & Experience sections.",
      sources: [{ title: "Download Resume", url: "resume.html" }]
    },
    hire: {
      answer: "Ajay is actively seeking full-time Data Analyst, Business Intelligence, or Data Science Associate positions and internships. He brings hands-on experience in SQL, Python, Tableau, and predictive analytics.",
      sources: [{ title: "Let's Connect", url: "#contact" }]
    }
  };

  window.toggleChatbot = function() {
    const widget = document.getElementById('chat-widget');
    if (!widget) return;
    widget.classList.toggle('hidden');
    if (!widget.classList.contains('hidden')) {
      const inputEl = document.getElementById('chat-input');
      if (inputEl) inputEl.focus();
    }
  };

  window.closeChatbot = function() {
    const widget = document.getElementById('chat-widget');
    if (widget) widget.classList.add('hidden');
  };

  window.sendQuickChat = function(question) {
    const widget = document.getElementById('chat-widget');
    if (widget) widget.classList.remove('hidden');
    if (window.handleChatQuery) {
      window.handleChatQuery(question);
    }
  };

  function addMessage(text, role) {
    const messagesEl = document.getElementById('chat-messages');
    if (!messagesEl) return null;
    const msg = document.createElement('div');
    msg.className = 'message ' + role;
    msg.innerHTML = text.replace(/\n/g, '<br/>');
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  function addSources(sources) {
    const messagesEl = document.getElementById('chat-messages');
    if (!messagesEl || !sources || !sources.length) return;
    const container = document.createElement('div');
    container.className = 'chat-sources';
    container.innerHTML = '<span style="color:#888;">Sources:</span> ';
    sources.forEach(s => {
      const a = document.createElement('a');
      a.href = s.url;
      a.textContent = s.title;
      a.onclick = function(e) {
        if (s.url.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(s.url);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth < 768) {
              window.closeChatbot();
            }
          }
        }
      };
      container.appendChild(a);
    });
    messagesEl.appendChild(container);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function resolveLocalIntent(query) {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('stack') || q.includes('python') || q.includes('sql') || q.includes('tableau') || q.includes('tool')) {
      return KNOWLEDGE_BASE.skills;
    }
    if (q.includes('skillforge') || q.includes('experience') || q.includes('intern') || q.includes('work') || q.includes('job')) {
      return KNOWLEDGE_BASE.experience;
    }
    if (q.includes('box office') || q.includes('movie') || q.includes('revenue') || q.includes('forecasting')) {
      return KNOWLEDGE_BASE.boxoffice;
    }
    if (q.includes('sentiment') || q.includes('moderation') || q.includes('nlp')) {
      return KNOWLEDGE_BASE.sentiment;
    }
    if (q.includes('social media') || q.includes('engagement') || q.includes('content analysis')) {
      return KNOWLEDGE_BASE.socialmedia;
    }
    if (q.includes('project')) {
      return KNOWLEDGE_BASE.projects;
    }
    if (q.includes('education') || q.includes('college') || q.includes('srm') || q.includes('btech') || q.includes('degree') || q.includes('cgpa')) {
      return KNOWLEDGE_BASE.education;
    }
    if (q.includes('certificat') || q.includes('course') || q.includes('chatgpt')) {
      return KNOWLEDGE_BASE.certificates;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('linkedin') || q.includes('github')) {
      return KNOWLEDGE_BASE.contact;
    }
    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return KNOWLEDGE_BASE.resume;
    }
    if (q.includes('hire') || q.includes('available') || q.includes('opportunity') || q.includes('relocate') || q.includes('role')) {
      return KNOWLEDGE_BASE.hire;
    }
    if (q.includes('who are you') || q.includes('about') || q.includes('ajay') || q.includes('bio') || q.includes('profile')) {
      return KNOWLEDGE_BASE.about;
    }
    return {
      answer: "I can help you explore Ajay's background as a Data Analyst! Feel free to ask about his Skills, Internship at SkillForge, Projects (Box Office, Sentiment, Social Media), SRM Education, or Contact Details.",
      sources: [
        { title: "About Ajay", url: "#about" },
        { title: "Projects", url: "#projects" },
        { title: "Contact", url: "#contact" }
      ]
    };
  }

  window.handleChatQuery = function(text) {
    const clean = (text || '').trim();
    if (!clean) return;

    const inputEl = document.getElementById('chat-input');
    if (inputEl) inputEl.value = '';

    addMessage(clean, 'user');
    const loading = addMessage('Thinking…', 'assistant loading');

    setTimeout(() => {
      if (loading && loading.parentNode) {
        loading.parentNode.removeChild(loading);
      }
      const match = resolveLocalIntent(clean);
      addMessage(match.answer, 'assistant');
      addSources(match.sources);
    }, 300);
  };

  function initChatbot() {
    const toggleBtn = document.getElementById('chat-toggle');
    const closeBtn = document.getElementById('chat-close');
    const formEl = document.getElementById('chat-form');
    const messagesEl = document.getElementById('chat-messages');

    if (toggleBtn) {
      toggleBtn.onclick = function(e) {
        e.preventDefault();
        window.toggleChatbot();
      };
    }

    if (closeBtn) {
      closeBtn.onclick = function(e) {
        e.preventDefault();
        window.closeChatbot();
      };
    }

    if (formEl) {
      formEl.onsubmit = function(e) {
        e.preventDefault();
        const inputEl = document.getElementById('chat-input');
        if (inputEl) {
          window.handleChatQuery(inputEl.value);
        }
      };
    }

    document.querySelectorAll('[data-chat-question]').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        const q = btn.getAttribute('data-chat-question');
        window.sendQuickChat(q);
      };
    });

    if (messagesEl && messagesEl.children.length === 0) {
      addMessage("Hi! I'm Ajay's AI Portfolio Assistant. Ask me about his data analytics skills, projects, internship at SkillForge, or how to contact him!", 'assistant');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
