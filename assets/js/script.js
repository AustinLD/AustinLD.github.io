// Portfolio component logic (Austin Donovan data analyst portfolio).
// This file is the readable source of truth for the interactive logic:
// project data, the site chatbot, nav scroll-spy, and project modals.
//
// NOTE: the dc-runtime framework (assets/js/dc-runtime.js) reads this
// component's code from the inline <script type="text/x-dc"> tag in
// index.html at boot time (it reads the tag's textContent directly, it
// does not fetch external files for this piece). So this file and the
// inline copy in index.html must be kept in sync until the framework
// dependency is removed in the optimization pass.

class Component extends DCLogic {
  state = { query: "", messages: [], thinking: false, active: "", openProject: null, shotIndex: 0 };

  projects() {
    return {
      olist: {
        title: "E-Commerce Performance & Customer Segmentation",
        subtitle: "Olist · 100K+ orders · MySQL + Python + Power BI",
        question: "What actually drove a Brazilian marketplace's 20x revenue growth, and why were reviews suffering?",
        method: "Designed a 9-table MySQL database over the full order history; decomposed revenue into volume vs. AOV with window functions; RFM-segmented 93K+ customers in Python; shipped a Power BI dashboard with custom DAX.",
        findings: ["growth was volume-driven, AOV stayed flat", "late delivery → 1.72-pt review gap (4.29 vs 2.57)", "Champions: 6.6% of customers → R$1.72M"],
        tech: ["SQL", "Python", "Power BI", "DAX"],
        github: "https://github.com/AustinLD/Project-1---E-Commerce-Analysis",
        shots: [
          { src: "assets/img/olist/demo_interactive.mp4", cap: "Cross-filtering the live report, recorded in Power BI Desktop", tag: "POWER BI DEMO" },
          { src: "assets/img/olist/monthly_revenue_orders.png", cap: "Monthly revenue and order volume, growth was volume-driven", tag: "ANALYSIS CHARTS" },
          { src: "assets/img/olist/delay_vs_review.png", cap: "Average review score by delivery timing", tag: "ANALYSIS CHARTS" },
          { src: "assets/img/olist/rfm_revenue_by_segment.png", cap: "Revenue by RFM segment", tag: "ANALYSIS CHARTS" },
          { src: "assets/img/olist/rfm_segment_distribution.png", cap: "Customer distribution across RFM segments", tag: "ANALYSIS CHARTS" }
        ]
      },
      spotify: {
        title: "Spotify Charts: Dynamics & Streaming Concentration",
        subtitle: "26M rows · 5 years of US Top 200 · Pandas + SQL + Power BI",
        question: "What separates lasting hits from one-week spikes, and how concentrated is streaming attention?",
        method: "Processed a 26M-row (3.4GB) daily chart dataset in chunked Pandas passes; built chart-run and rank-delta analyses with SQL window functions; four-page Power BI report.",
        findings: ["55% of hits last ≤ 1 week; 11% reach top 10", "top 1% of songs capture 21% of all streams", "9 of 12 biggest climbs traced to external events"],
        tech: ["Python", "SQL", "Power BI"],
        github: "https://github.com/AustinLD/spotify-charts-analysis",
        shots: [
          { src: "assets/img/spotify/demo_interactive.mp4", cap: "Cross-filtering the live report, recorded in Power BI Desktop", tag: "POWER BI DEMO" },
          { src: "assets/img/spotify/1_overview.png", cap: "Overview: headline KPIs and the five-year streaming trend", tag: "POWER BI DASHBOARD" },
          { src: "assets/img/spotify/2_chart_dynamics.png", cap: "Chart dynamics: how long songs last, debut vs peak", tag: "POWER BI DASHBOARD" },
          { src: "assets/img/spotify/3_concentration.png", cap: "Concentration: how few songs capture most streams", tag: "POWER BI DASHBOARD" },
          { src: "assets/img/spotify/4_momentum.png", cap: "Climbers: the biggest single-week jumps into the top 10", tag: "POWER BI DASHBOARD" }
        ]
      },
      abtest: {
        title: "Marketing A/B Test: Ad Campaign Conversion",
        subtitle: "588,101 users · randomized experiment · Python + SQL",
        question: "Did the ad campaign cause a real conversion lift, and how large, with what confidence?",
        method: "Two-proportion z-test and chi-square on the randomized ad-vs-PSA split; 95% CI on the lift; 10,000-sample bootstrap; kept causal claims strictly to the randomized comparison.",
        findings: ["+43% relative lift, z = 7.4, p < 0.001", "95% CI: 0.60–0.94 pp; no bootstrap resample ≤ 0", "exposure curve reported as correlation only"],
        tech: ["Python", "SQL", "Power BI"],
        github: "https://github.com/AustinLD/marketing-ab-test-analysis",
        shots: [
          { src: "assets/img/abtest/demo_interactive.mp4", cap: "Cross-filtering the live report, recorded in Power BI Desktop", tag: "POWER BI DEMO" },
          { src: "assets/img/abtest/1_results.png", cap: "Results: lift, significance, and confidence interval", tag: "DASHBOARD PREVIEW" },
          { src: "assets/img/abtest/2_exposure.png", cap: "Exposure: conversion vs ads seen (correlational, not randomized)", tag: "DASHBOARD PREVIEW" },
          { src: "assets/img/abtest/3_timing.png", cap: "Timing: which days and hours convert best", tag: "DASHBOARD PREVIEW" },
          { src: "assets/img/abtest/4_segments.png", cap: "Segments: treatment-vs-control lift by day", tag: "DASHBOARD PREVIEW" }
        ]
      },
      kmeans: {
        title: "Product Segmentation with K-Means Clustering",
        subtitle: "4,479 SKUs · 1.07M transactions · scikit-learn",
        question: "Can clustering reveal product segments that a flat ABC/Pareto ranking hides?",
        method: "Engineered eight SKU-level features from a 1.07M-row UK retail log; log transforms + scaling; chose k = 5 via elbow and silhouette; benchmarked clusters against ABC analysis.",
        findings: ["bestsellers: 24% of SKUs → 78% of revenue", "flagged a returns-prone segment (96% median return rate)", "12 problem products invisible to ABC ranking"],
        tech: ["scikit-learn", "Python", "Power BI"],
        github: "https://github.com/AustinLD/Product-Segmentation",
        shots: [
          { src: "assets/img/kmeans/demo_interactive.mp4", cap: "Cross-filtering the live report, recorded in Power BI Desktop", tag: "POWER BI DEMO" },
          { src: "assets/img/kmeans/fig_segments_pca.png", cap: "The five product segments in PCA space", tag: "ANALYSIS CHARTS" },
          { src: "assets/img/kmeans/fig_k_selection.png", cap: "Choosing k: elbow inertia and silhouette scores", tag: "ANALYSIS CHARTS" },
          { src: "assets/img/kmeans/fig_revenue_by_segment.png", cap: "Revenue by segment", tag: "ANALYSIS CHARTS" }
        ]
      }
    };
  }

  // ---- knowledge base ----
  hl(t) { return { t: t, style: "color:#c4b5fd;font-weight:500" }; }
  tx(t) { return { t: t, style: "color:rgba(255,255,255,.82)" }; }

  kb() {
    const h = this.hl.bind(this), t = this.tx.bind(this);
    return [
      { keys: ["python", "pandas", "scikit", "sklearn"], parts: [t("Yes, Python is one of my core tools. I work in "), h("Pandas and scikit-learn"), t(" daily: processed a 26M-row dataset, ran a 10,000-sample bootstrap, and clustered 4,479 SKUs with k-means.")],
        card: { metric: "4,479", metricLabel: "SKUs clustered", title: "Product Segmentation with K-Means", desc: "scikit-learn · elbow + silhouette · 5 segments", section: "work" },
        followups: ["Do you know SQL?", "What's your biggest dataset?", "How do you use statistics?"] },

      { keys: ["sql", "mysql", "database", "query", "queries", "cte", "window function"], parts: [t("Advanced SQL is my home base: "), h("CTEs, window functions, multi-table modeling"), t(". I designed a 9-table MySQL database for the Olist analysis and wrote ranking analyses across five years of Spotify chart data.")],
        card: { metric: "100K+", metricLabel: "orders analyzed", title: "E-Commerce Performance & Segmentation", desc: "MySQL · 9 relational tables · window functions", section: "work" },
        followups: ["What did you find at Olist?", "Python too?", "Show me your dashboards"] },

      { keys: ["a/b", "ab test", "statistic", "hypothesis", "test", "significance", "experiment"], parts: [t("My strongest statistical work is a randomized ad-vs-PSA experiment across "), h("588,101 users"), t(": a "), h("43% relative conversion lift"), t(" (z = 7.4, p < 0.001), bounded with a 95% CI and a 10,000-sample bootstrap.")],
        card: { metric: "+43%", metricLabel: "conversion lift", title: "Marketing A/B Test", desc: "Two-proportion z-test · chi-square · bootstrap CI", section: "work" },
        followups: ["How did you handle non-randomized exposure?", "What else have you shipped?"] },

      { keys: ["exposure", "randomiz", "causation", "correlation", "causal"], parts: [t("Carefully. Conversion climbed from 0.16% (1 ad seen) to 17% (100+ ads), but exposure wasn't randomized, so I kept the "), h("causal claim on the randomized ad-vs-control gap"), t(" and reported the exposure curve as correlation only.")],
        card: null,
        followups: ["Show me your dashboards", "What's your biggest dataset?"] },

      { keys: ["power bi", "powerbi", "dashboard", "dax", "tableau", "visuali", "chart"], parts: [t("Every project ships with an interactive "), h("Power BI dashboard"), t(": custom DAX measures and custom themes. The Spotify analysis runs four pages: trends, chart dynamics, concentration, and top-10 climbers.")],
        card: { metric: "26M", metricLabel: "rows behind it", title: "Spotify Charts Analysis", desc: "Power BI · custom dark theme · 4 pages", section: "work" },
        followups: ["What did you find in the Spotify data?", "Do you know DAX?"] },

      { keys: ["biggest", "largest", "big data", "dataset", "26m", "scale"], parts: [t("A "), h("26M-row (3.4GB)"), t(" Spotify streaming dataset: five years of daily US Top 200 charts, processed in Pandas into an analysis-ready slice.")],
        card: { metric: "26M", metricLabel: "rows processed", title: "Spotify Charts Analysis", desc: "Pandas · SQL window functions · Power BI", section: "work" },
        followups: ["What did you find in it?", "How do you handle data that big?"] },

      { keys: ["spotify", "streaming", "music", "find in it", "what did you find"], parts: [h("55% of charting songs last a week or less"), t("; only 11% ever reach the top 10. Streaming is heavily concentrated: the top 1% of songs capture 21% of all streams, and 9 of the 12 biggest single-week climbs traced to external events, not organic momentum.")],
        card: { metric: "21%", metricLabel: "streams to top 1%", title: "Spotify Charts Analysis", desc: "Chart runs · rank deltas · concentration", section: "work" },
        followups: ["How do you handle data that big?", "What else have you shipped?"] },

      { keys: ["handle", "3.4", "gb", "memory", "process"], parts: [t("Filter early, validate often: I reshaped the raw 26M rows in "), h("chunked Pandas passes"), t(", validated against known chart totals, and pushed heavy aggregation into SQL window functions.")],
        card: null,
        followups: ["Do you know SQL?", "Show your projects"] },

      { keys: ["olist", "e-commerce", "ecommerce", "rfm", "customer", "segment", "churn", "review"], parts: [t("At Olist I decomposed "), h("20x revenue growth"), t(" (volume-driven, AOV flat), traced poor reviews to late delivery, a 1.72-point score gap, and RFM-segmented 93,000+ customers: the top 6.6% generated R$1.72M.")],
        card: { metric: "1.72", metricLabel: "pt review gap", title: "E-Commerce Performance & Segmentation", desc: "MySQL · RFM in Python · Power BI + DAX", section: "work" },
        followups: ["Do you know SQL?", "What about machine learning?"] },

      { keys: ["machine learning", "ml", "k-means", "kmeans", "cluster", "model"], parts: [t("Applied ML, yes, using "), h("k-means clustering"), t(" over 4,479 SKUs with eight engineered features. Chose k = 5 via elbow and silhouette, then benchmarked against ABC/Pareto: the flat ranking hid 12 returns-prone products my clusters flagged.")],
        card: { metric: "k = 5", metricLabel: "clusters selected", title: "Product Segmentation with K-Means", desc: "Feature engineering · log transforms · scikit-learn", section: "work" },
        followups: ["How do you use statistics?", "Show your skills"] },

      { keys: ["experience", "worked", "job", "career", "cwi", "aaa", "employer", "years"], parts: [t("2+ years professionally. Most recently "), h("Data Analyst at CWI Holdings (2023–2025)"), t(": built and maintained a MySQL warehouse database tracking 60+ material types, automated ETL with Python and VBA. Before that, client analytics at AAA.")],
        card: { metric: "2+", metricLabel: "years", title: "CWI Holdings, Data Analyst", desc: "MySQL warehouse DB · Python/VBA ETL automation", section: "experience" },
        followups: ["What about education?", "Show your projects"] },

      { keys: ["education", "school", "degree", "boot camp", "bootcamp", "ucf", "university", "certif"], parts: [t("UCF's full-time "), h("Full-Stack Web Development Boot Camp (2022)"), t(", verified certificate. That engineering foundation is why my analyses ship as reproducible repos, not one-off notebooks.")],
        card: { metric: "2022", metricLabel: "UCF · full-time", title: "Full-Stack Web Development", desc: "Verified credential (Parchment)", section: "experience" },
        followups: ["Show your skills", "How can I reach you?"] },

      { keys: ["skills", "stack", "tools", "tech", "know how"], parts: [h("SQL, Python, and Power BI"), t(" are the core. Around them: DAX, MySQL, Pandas, scikit-learn, statistics (A/B testing, bootstrap, hypothesis tests), and disciplined ETL and data-quality practice.")],
        card: { metric: "7", metricLabel: "skill groups", title: "Skills & Tools", desc: "Full breakdown in the skills section", section: "skills" },
        followups: ["Do you know Python?", "Do you know SQL?"] },

      { keys: ["hireable", "available", "hiring", "open to", "relocat", "remote"], parts: [t("Yes, open to data analyst roles. "), h("2+ years' experience, four shipped analyses"), t(", and every claim here traces to a query you can run. Email AustinLDonovan@gmail.com.")],
        card: { metric: "Open", metricLabel: "to data analyst roles", title: "Get in touch", desc: "Email · LinkedIn · GitHub", section: "contact" },
        followups: ["What's your biggest project?", "Where's your resume?"] },

      { keys: ["contact", "email", "reach", "linkedin", "github", "touch", "message"], parts: [t("Easiest: email "), h("AustinLDonovan@gmail.com"), t(". I'm also on LinkedIn (austinLD) and GitHub (AustinLD): all case studies and repos are public.")],
        card: { metric: "@", metricLabel: "email is fastest", title: "Get in touch", desc: "Email · LinkedIn · GitHub", section: "contact" },
        followups: ["Are you open to roles right now?"] },

      { keys: ["resume", "cv", "pdf"], parts: [t("One-page PDF, one click: the "), h("Resume button in the top-right corner"), t(" downloads it. It covers everything on this page.")],
        card: { metric: "PDF", metricLabel: "resume · 1 page", title: "Resume ↓ button, top right", desc: "Or email AustinLDonovan@gmail.com", section: "top" },
        followups: ["What's your biggest project?"] },

      { keys: ["about", "yourself", "who are you", "story", "background", "hobb"], parts: [t("Data analyst in Orlando, 2+ years' experience, with work spanning e-commerce, streaming, experimentation, and machine learning. I care about "), h("statistically sound findings"), t(" over dashboards for their own sake. Every claim here traces back to a query you can run.")],
        card: null,
        followups: ["Show your projects", "How can I reach you?"] },

      { keys: ["hello", "hey", "hi "], parts: [t("Hi! Ask me anything about my work: projects, skills, experience, or try one of the suggestions below.")],
        card: null,
        followups: ["What's your biggest dataset?", "Do you know Python?", "Are you open to roles right now?"] }
    ];
  }

  answer(q) {
    const query = " " + q.toLowerCase() + " ";
    let best = null, bestScore = 0;
    for (const entry of this.kb()) {
      let score = 0;
      for (const k of entry.keys) if (query.includes(k)) score += k.length;
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    if (best) return best;
    return { parts: [this.tx("I can speak to my projects, skills, experience, education, or how to reach me. Try one of these:")], card: null,
      followups: ["Do you know SQL?", "What's your biggest project?", "How can I contact you?"] };
  }

  ask(q) {
    q = (q || "").trim();
    if (!q || this.state.thinking) return;
    const userMsg = { id: Date.now(), isUser: true, isAi: false, text: q, parts: [], followups: [], hasCard: false };
    this.setState(s => ({ messages: [...s.messages, userMsg], query: "", thinking: true }));
    setTimeout(() => {
      const a = this.answer(q);
      const card = a.card ? { ...a.card, onOpen: () => this.goTo(a.card.section) } : null;
      const aiMsg = {
        id: Date.now() + 1, isUser: false, isAi: true, text: "",
        parts: a.parts, hasCard: !!card, card: card,
        followups: (a.followups || []).map(f => ({ q: f, onAsk: () => this.ask(f) }))
      };
      this.setState(s => ({ messages: [...s.messages, aiMsg], thinking: false }));
    }, 650);
  }

  goTo(id) {
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: "smooth" });
  }

  componentDidMount() {
    this._onScroll = () => {
      const ids = ["work", "skills", "experience", "about", "contact"];
      let active = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = id;
      }
      if (active !== this.state.active) this.setState({ active });
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._onKey = (e) => { if (e.key === "Escape" && this.state.openProject) this.setState({ openProject: null }); };
    window.addEventListener("keydown", this._onKey);
  }
  componentWillUnmount() { window.removeEventListener("scroll", this._onScroll); window.removeEventListener("keydown", this._onKey); }

  navStyle(id) {
    const on = this.state.active === id;
    return "cursor:pointer;padding:4px 0;transition:color .15s;border-bottom:2px solid " + (on ? "#8b5cf6" : "transparent") + ";color:" + (on ? "#fafafa" : "rgba(255,255,255,.55)");
  }

  renderVals() {
    const showCursor = this.props.heroCursor ?? true;
    const p = this.state.openProject ? this.projects()[this.state.openProject] : null;
    const shots = p && p.shots ? p.shots : [];
    const shotIdx = shots.length ? ((this.state.shotIndex % shots.length) + shots.length) % shots.length : 0;
    const shotSrc = shots.length ? shots[shotIdx].src : "";
    const shotIsVideo = /\.(mp4|webm)$/i.test(shotSrc);
    const modal = p ? {
      ...p,
      hasShots: shots.length > 0,
      shotSrc: shotSrc,
      shotIsVideo: shotIsVideo,
      shotIsImage: !shotIsVideo,
      shotCap: shots.length ? shots[shotIdx].cap : "",
      shotTag: shots.length ? shots[shotIdx].tag : "",
      shotPos: (shotIdx + 1) + " / " + shots.length,
      multiShots: shots.length > 1,
      onPrevShot: () => this.setState(s => ({ shotIndex: s.shotIndex - 1 })),
      onNextShot: () => this.setState(s => ({ shotIndex: s.shotIndex + 1 }))
    } : { findings: [], tech: [] };
    return {
      modalOpen: !!p,
      modal: modal,
      openOlist: () => this.setState({ openProject: "olist", shotIndex: 0 }),
      openSpotify: () => this.setState({ openProject: "spotify", shotIndex: 0 }),
      openAbtest: () => this.setState({ openProject: "abtest", shotIndex: 0 }),
      openKmeans: () => this.setState({ openProject: "kmeans", shotIndex: 0 }),
      closeModal: () => this.setState({ openProject: null }),
      stopProp: (e) => e.stopPropagation(),
      showChat: this.props.showChat ?? true,
      cursorStyle: showCursor ? "display:inline-block;width:18px;height:38px;background:#a78bfa;vertical-align:-4px;margin-left:12px;animation:blink 1.1s step-end infinite" : "display:none",
      query: this.state.query,
      messages: this.state.messages,
      thinking: this.state.thinking,
      onQueryChange: (e) => this.setState({ query: e.target.value }),
      onKeyDown: (e) => { if (e.key === "Enter") this.ask(this.state.query); },
      onSend: () => this.ask(this.state.query),
      starterChips: ["Do you know SQL?", "What's your biggest dataset?", "A/B testing?", "Are you hireable?"].map(q => ({ q, onAsk: () => this.ask(q) })),
      skillGroups: [
        { label: "LANGUAGES", items: ["SQL", "Python", "DAX", "JavaScript", "VBA"] },
        { label: "STATISTICS & ML", items: ["A/B testing", "Hypothesis testing", "Confidence intervals", "Bootstrap", "K-means", "RFM segmentation", "EDA"] },
        { label: "BI & VISUALIZATION", items: ["Power BI", "Excel", "Google Sheets", "KPI reporting", "Dashboard design"] },
        { label: "PYTHON LIBRARIES", items: ["Pandas", "scikit-learn", "Matplotlib", "Seaborn"] },
        { label: "DATA MANAGEMENT", items: ["ETL workflows", "Data cleaning", "Validation", "Quality audits", "Data modeling", "Feature engineering", "Governance"] },
        { label: "DATABASES & TOOLS", items: ["MySQL", "MS Access", "Git", "GitHub", "Jupyter", "Salesforce CRM"] }
      ],
      goTop: () => this.goTo("top"),
      goWork: () => this.goTo("work"),
      goSkills: () => this.goTo("skills"),
      goExp: () => this.goTo("experience"),
      goAbout: () => this.goTo("about"),
      goContact: () => this.goTo("contact"),
      navWorkStyle: this.navStyle("work"),
      navSkillsStyle: this.navStyle("skills"),
      navExpStyle: this.navStyle("experience"),
      navAboutStyle: this.navStyle("about"),
      navContactStyle: this.navStyle("contact")
    };
  }
}
