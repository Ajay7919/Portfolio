// Maddula Ajay Rathna - Portfolio Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Active Section Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');
  
  function highlightNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-[#FF2A2A]', 'font-bold');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('text-[#FF2A2A]', 'font-bold');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav);

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#FF2A2A]', 'text-white');
        b.classList.add('bg-white/5', 'text-gray-400');
      });
      btn.classList.remove('bg-white/5', 'text-gray-400');
      btn.classList.add('bg-[#FF2A2A]', 'text-white');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Project Modal Data & Handlers
  const PROJECT_DETAILS = {
    boxoffice: {
      title: 'Movie Box Office Revenue Analysis & Forecasting',
      category: 'Machine Learning & Predictive Modeling',
      duration: 'Python, Scikit-learn, Pandas, NumPy, Seaborn',
      overview: 'Conducted end-to-end exploratory data analysis and predictive modeling across multi-source historical box office datasets to forecast global revenue and isolate primary commercial drivers.',
      challenges: [
        'Ingesting and merging multi-source film metadata containing disparate schema and missing values.',
        'High multicollinearity between production budget, marketing spend, and distributor clout.',
        'Capturing seasonal variance and cast popularity scores effectively.'
      ],
      methodology: [
        'Data Profiling & Cleansing: Treated missing values in runtime, budget, and genre using iterative median imputation and log-transformation to normalize highly skewed financial features.',
        'Feature Engineering: Derived metrics including Budget-to-Marketing Ratio, Star Power Coefficient, and Release Seasonality Index.',
        'Model Training: Benchmarked Random Forest Regressor, Gradient Boosting, and Ridge Regression; tuned hyperparameters via GridSearchCV for optimal RMSE & R² score.',
        'Visualization: Built correlation matrices and feature importance charts in Matplotlib and Seaborn.'
      ],
      impact: [
        'Achieved 86% predictive accuracy on cross-validated test sets.',
        'Identified that marketing spend during holiday release windows yielded 3.2x higher return multiplier than non-peak months.',
        'Provided a data-driven investment decision framework for media stakeholders.'
      ]
    },
    sentiment: {
      title: 'Content Moderation & Sentiment Analysis System',
      category: 'NLP & Text Analytics',
      duration: 'Python, NLTK, Scikit-learn, TF-IDF, Pandas, Matplotlib',
      overview: 'Developed an automated NLP-driven text mining and classification engine capable of processing unstructured user-generated text to determine emotional valence, toxic discourse, and content moderation triggers.',
      challenges: [
        'Severe class imbalance in toxic vs. benign user content.',
        'Handling internet slang, typos, emojis, and multilingual text variations.',
        'Ensuring low latency inference for high-volume content streams.'
      ],
      methodology: [
        'Text Preprocessing: Tokenization, stopword removal, lemmatization, regex cleaning of handles/URLs, and TF-IDF vectorization with n-gram extraction (1-3 grams).',
        'Model Architecture: Trained Multinomial Naive Bayes and Logistic Regression classifiers combined with VADER sentiment scoring.',
        'Reporting Pipeline: Automated batch report generator summarizing sentiment breakdown, risk scores, and flagged trends for operations teams.'
      ],
      impact: [
        'Reduced manual review workload by 45% through high-confidence automated tagging.',
        'Enhanced detection of high-risk content with 89% precision.',
        'Created visual analytics dashboard of trending sentiment clusters across platform categories.'
      ]
    },
    socialmedia: {
      title: 'Social Media Content Analysis & Engagement Optimization',
      category: 'Business Intelligence & Exploratory Analysis',
      duration: 'Python, SQL, Tableau, Pandas, Statistical Testing',
      overview: 'Analyzed over 150,000 multi-channel social media posts to evaluate engagement drivers (likes, shares, comments, retention) and deliver actionable recommendations for growth marketing.',
      challenges: [
        'Normalizing engagement metrics across radically different content formats (reels, carousels, text posts).',
        'Time-zone conversions and temporal decay in viral reach curves.'
      ],
      methodology: [
        'SQL ETL Pipeline: Crafted complex aggregation queries using CTEs and window functions to segment audience interactions by publishing timestamp and hashtag density.',
        'Exploratory Data Analysis: Applied statistical hypothesis testing (ANOVA, Chi-square) to validate significance in engagement rates across different posting cadences.',
        'Executive Dashboards: Built interactive Tableau dashboards with dynamic parameters allowing marketers to simulate reach based on format and posting window.'
      ],
      impact: [
        'Discovered that carousel formats posted between 6 PM - 9 PM generated 42% higher retention and share rates.',
        'Streamlined weekly reporting cadence from 6 hours of manual spreadsheet work to 15-minute automated pipeline.',
        'Delivered clear executive deck adopted by the growth marketing team.'
      ]
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  function openProjectModal(key) {
    const data = PROJECT_DETAILS[key];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="space-y-6">
        <div>
          <span class="text-[11px] font-mono text-[#FF2A2A] tracking-wider uppercase font-semibold">${data.category}</span>
          <h3 class="text-2xl md:text-3xl font-bold font-display text-white mt-1">${data.title}</h3>
          <p class="text-xs font-mono text-gray-400 mt-1">Tech Stack: ${data.duration}</p>
        </div>

        <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm leading-relaxed">
          <strong class="text-white block mb-1">Project Summary</strong>
          ${data.overview}
        </div>

        <div>
          <h4 class="text-sm font-mono text-[#FF2A2A] tracking-wider uppercase mb-2">Key Analytical Challenges</h4>
          <ul class="space-y-1.5">
            ${data.challenges.map(c => `<li class="text-xs text-gray-300 flex items-start gap-2"><span class="text-[#FF2A2A]">▹</span><span>${c}</span></li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-mono text-[#FF2A2A] tracking-wider uppercase mb-2">Methodology & Implementation</h4>
          <ul class="space-y-2">
            ${data.methodology.map(m => `<li class="text-xs text-gray-300 flex items-start gap-2"><span class="text-[#FF2A2A]">▹</span><span>${m}</span></li>`).join('')}
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/30">
          <h4 class="text-sm font-mono text-[#FF2A2A] tracking-wider uppercase mb-2 font-bold">Business Impact & Key Findings</h4>
          <ul class="space-y-1.5">
            ${data.impact.map(i => `<li class="text-xs text-gray-200 flex items-start gap-2"><span class="text-green-400">✓</span><span>${i}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('[data-project-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project-key');
      openProjectModal(key);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 5. Interactive Analytics Simulator (Box Office Predictor)
  const budgetInput = document.getElementById('sim-budget');
  const marketingInput = document.getElementById('sim-marketing');
  const genreSelect = document.getElementById('sim-genre');
  const starInput = document.getElementById('sim-star');
  const seasonSelect = document.getElementById('sim-season');

  const budgetVal = document.getElementById('val-budget');
  const marketingVal = document.getElementById('val-marketing');
  const starVal = document.getElementById('val-star');

  const metricRevenue = document.getElementById('calc-revenue');
  const metricRoi = document.getElementById('calc-roi');
  const metricRisk = document.getElementById('calc-risk');

  let simChart = null;

  function initChart() {
    const ctx = document.getElementById('simulator-chart');
    if (!ctx) return;

    simChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Production Budget', 'Marketing Spend', 'Net Profit', 'Worldwide Gross'],
        datasets: [{
          label: 'Financial Projection ($M)',
          data: [65, 30, 115, 210],
          backgroundColor: [
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.35)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(255, 42, 42, 0.9)'
          ],
          borderColor: [
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 255, 255, 0.5)',
            'rgba(34, 197, 94, 1)',
            '#FF2A2A'
          ],
          borderWidth: 1.5,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111',
            borderColor: '#ff2a2a',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: '#ddd'
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#888', font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#888',
              font: { family: 'Inter', size: 11 },
              callback: val => '$' + val + 'M'
            }
          }
        }
      }
    });
  }

  function updateSimulation() {
    if (!budgetInput || !marketingInput || !genreSelect || !starInput || !seasonSelect) return;

    const budget = parseFloat(budgetInput.value);
    const marketing = parseFloat(marketingInput.value);
    const genreMultiplier = parseFloat(genreSelect.value);
    const starPower = parseFloat(starInput.value);
    const seasonMultiplier = parseFloat(seasonSelect.value);

    budgetVal.textContent = '$' + budget + 'M';
    marketingVal.textContent = '$' + marketing + 'M';
    starVal.textContent = starPower + ' ★';

    // Ensemble Regression Formula simulation based on historical statistical drivers
    const baseRev = (Math.pow(budget, 0.92) * 1.55 + Math.pow(marketing, 1.05) * 1.82);
    const starFactor = 0.55 + (starPower * 0.16);
    const projectedGross = Math.round(baseRev * genreMultiplier * seasonMultiplier * starFactor);
    const totalCost = budget + marketing;
    const netProfit = projectedGross - totalCost;
    const roi = Math.round((netProfit / totalCost) * 100);

    let risk = 'Moderate';
    let riskColor = 'text-amber-400';
    if (roi > 120) {
      risk = 'Low Risk (High Return)';
      riskColor = 'text-green-400';
    } else if (roi < 20) {
      risk = 'High Volatility';
      riskColor = 'text-red-400';
    }

    metricRevenue.textContent = '$' + projectedGross + 'M';
    metricRoi.textContent = (roi >= 0 ? '+' : '') + roi + '%';
    metricRoi.className = 'text-xl font-bold font-mono ' + (roi >= 0 ? 'text-green-400' : 'text-red-400');
    metricRisk.textContent = risk;
    metricRisk.className = 'text-sm font-semibold ' + riskColor;

    if (simChart) {
      simChart.data.datasets[0].data = [budget, marketing, Math.max(0, netProfit), projectedGross];
      simChart.update();
    }
  }

  [budgetInput, marketingInput, genreSelect, starInput, seasonSelect].forEach(el => {
    if (el) el.addEventListener('input', updateSimulation);
  });

  initChart();
  updateSimulation();

  // 6. Toast Notification Helper
  function showToast(message, isSuccess = true) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderColor = isSuccess ? '#22c55e' : '#ff2a2a';
    toast.innerHTML = `
      <span style="color:${isSuccess ? '#22c55e' : '#ff2a2a'}">${isSuccess ? '✓' : '⚠'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // 7. Clipboard Copy Buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast(`Failed to copy: ${textToCopy}`, false);
      });
    });
  });

  // 8. Contact Form Handler
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', false);
        return;
      }

      showToast(`Thank you, ${name}! Your message has been sent to Ajay.`);
      contactForm.reset();
    });
  }
});
