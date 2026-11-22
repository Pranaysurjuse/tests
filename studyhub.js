/**
 * JEE Test Tracker & Akiva Study Hub — Integrated Dock & Slideout Drawer
 * Replicating sidebar_dock_integration.html & mini_test_calendar.html
 */
(function() {
  'use strict';

  const JEE_CHAPTERS = [
    // Physics (28)
    { id: 'p1', title: 'Units & Dimensions', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p2', title: 'Kinematics: 1D Motion', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p3', title: 'Kinematics: 2D & Projectiles', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p4', title: 'Laws of Motion & Friction', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p5', title: 'Work, Power & Energy', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p6', title: 'Centre of Mass & Collisions', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p7', title: 'Rotational Motion & Inertia', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p8', title: 'Gravitation', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p9', title: 'Mechanical Properties of Solids', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p10', title: 'Mechanical Properties of Fluids', subject: 'Physics', branch: 'Mechanics' },
    { id: 'p11', title: 'Thermal Properties & Calorimetry', subject: 'Physics', branch: 'Thermal Physics' },
    { id: 'p12', title: 'Thermodynamics', subject: 'Physics', branch: 'Thermal Physics' },
    { id: 'p13', title: 'Kinetic Theory of Gases (KTG)', subject: 'Physics', branch: 'Thermal Physics' },
    { id: 'p14', title: 'Oscillations (SHM)', subject: 'Physics', branch: 'Waves & Oscillations' },
    { id: 'p15', title: 'Waves & Sound', subject: 'Physics', branch: 'Waves & Oscillations' },
    { id: 'p16', title: 'Electrostatics & Potential', subject: 'Physics', branch: 'Electrodynamics' },
    { id: 'p17', title: 'Capacitance & Dielectrics', subject: 'Physics', branch: 'Electrodynamics' },
    { id: 'p18', title: 'Current Electricity', subject: 'Physics', branch: 'Electrodynamics' },
    { id: 'p19', title: 'Magnetic Effects of Current', subject: 'Physics', branch: 'Electrodynamics' },
    { id: 'p20', title: 'Magnetism & Matter', subject: 'Physics', branch: 'Electrodynamics' },
    { id: 'p21', title: 'Electromagnetic Induction (EMI)', subject: 'Physics', branch: 'Electrodynamics' },
    { id: 'p22', title: 'Alternating Current (AC)', subject: 'Physics', branch: 'Electrodynamics' },
    { id: 'p23', title: 'Electromagnetic Waves', subject: 'Physics', branch: 'Electrodynamics' },
    { id: 'p24', title: 'Ray Optics & Optical Instruments', subject: 'Physics', branch: 'Optics' },
    { id: 'p25', title: 'Wave Optics & Interference', subject: 'Physics', branch: 'Optics' },
    { id: 'p26', title: 'Dual Nature & Photoelectric Effect', subject: 'Physics', branch: 'Modern Physics' },
    { id: 'p27', title: 'Atoms & Nuclei', subject: 'Physics', branch: 'Modern Physics' },
    { id: 'p28', title: 'Semiconductor Electronics', subject: 'Physics', branch: 'Modern Physics' },

    // Chemistry (30)
    { id: 'c1', title: 'Mole Concept & Stoichiometry', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c2', title: 'Atomic Structure', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c3', title: 'States of Matter (Gases & Liquids)', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c4', title: 'Thermodynamics & Thermochemistry', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c5', title: 'Chemical Equilibrium', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c6', title: 'Ionic Equilibrium', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c7', title: 'Redox Reactions', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c8', title: 'Solutions & Colligative Properties', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c9', title: 'Electrochemistry', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c10', title: 'Chemical Kinetics', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c11', title: 'Surface Chemistry', subject: 'Chemistry', branch: 'Physical Chemistry' },
    { id: 'c12', title: 'Periodic Table & Periodicity', subject: 'Chemistry', branch: 'Inorganic Chemistry' },
    { id: 'c13', title: 'Chemical Bonding & Molecular Structure', subject: 'Chemistry', branch: 'Inorganic Chemistry' },
    { id: 'c14', title: 'Hydrogen & s-Block Elements', subject: 'Chemistry', branch: 'Inorganic Chemistry' },
    { id: 'c15', title: 'p-Block Elements (Group 13-14)', subject: 'Chemistry', branch: 'Inorganic Chemistry' },
    { id: 'c16', title: 'p-Block Elements (Group 15-18)', subject: 'Chemistry', branch: 'Inorganic Chemistry' },
    { id: 'c17', title: 'd- & f-Block Elements', subject: 'Chemistry', branch: 'Inorganic Chemistry' },
    { id: 'c18', title: 'Coordination Compounds', subject: 'Chemistry', branch: 'Inorganic Chemistry' },
    { id: 'c19', title: 'Metallurgy & Principles of Extraction', subject: 'Chemistry', branch: 'Inorganic Chemistry' },
    { id: 'c20', title: 'IUPAC Nomenclature & GOC', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c21', title: 'Isomerism in Organic Compounds', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c22', title: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c23', title: 'Aromatic Compounds (Benzene)', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c24', title: 'Haloalkanes & Haloarenes', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c25', title: 'Alcohols, Phenols & Ethers', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c26', title: 'Aldehydes, Ketones & Carboxylic Acids', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c27', title: 'Amines & Diazonium Salts', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c28', title: 'Biomolecules', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c29', title: 'Polymers', subject: 'Chemistry', branch: 'Organic Chemistry' },
    { id: 'c30', title: 'Everyday Chemistry & Practical Chemistry', subject: 'Chemistry', branch: 'Practical Chemistry' },

    // Mathematics (25)
    { id: 'm1', title: 'Sets, Relations & Functions', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm2', title: 'Complex Numbers', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm3', title: 'Quadratic Equations', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm4', title: 'Permutations & Combinations (P&C)', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm5', title: 'Binomial Theorem', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm6', title: 'Sequences & Series (AP, GP)', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm7', title: 'Matrices & Determinants', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm8', title: 'Probability', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm9', title: 'Statistics', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm10', title: 'Mathematical Reasoning', subject: 'Mathematics', branch: 'Algebra' },
    { id: 'm11', title: 'Trigonometric Functions & Identities', subject: 'Mathematics', branch: 'Trigonometry' },
    { id: 'm12', title: 'Inverse Trigonometric Functions (ITF)', subject: 'Mathematics', branch: 'Trigonometry' },
    { id: 'm13', title: 'Straight Lines & Pair of Lines', subject: 'Mathematics', branch: 'Coordinate Geometry' },
    { id: 'm14', title: 'Circles & System of Circles', subject: 'Mathematics', branch: 'Coordinate Geometry' },
    { id: 'm15', title: 'Conic Sections: Parabola', subject: 'Mathematics', branch: 'Coordinate Geometry' },
    { id: 'm16', title: 'Conic Sections: Ellipse & Hyperbola', subject: 'Mathematics', branch: 'Coordinate Geometry' },
    { id: 'm17', title: 'Limits, Continuity & Differentiability', subject: 'Mathematics', branch: 'Calculus' },
    { id: 'm18', title: 'Methods of Differentiation (MOD)', subject: 'Mathematics', branch: 'Calculus' },
    { id: 'm19', title: 'Application of Derivatives (AOD)', subject: 'Mathematics', branch: 'Calculus' },
    { id: 'm20', title: 'Indefinite Integration', subject: 'Mathematics', branch: 'Calculus' },
    { id: 'm21', title: 'Definite Integration', subject: 'Mathematics', branch: 'Calculus' },
    { id: 'm22', title: 'Differential Equations (DE)', subject: 'Mathematics', branch: 'Calculus' },
    { id: 'm23', title: 'Area Under Curves (AUC)', subject: 'Mathematics', branch: 'Calculus' },
    { id: 'm24', title: 'Vector Algebra', subject: 'Mathematics', branch: 'Vectors & 3D' },
    { id: 'm25', title: 'Three Dimensional Geometry (3D)', subject: 'Mathematics', branch: 'Vectors & 3D' }
  ];

  // Inject Styles
  const style = document.createElement('style');
  style.id = 'akiva-dock-styles';
  style.textContent = `
    .akiva-dock-wrapper {
      position: fixed;
      left: 14px;
      top: 14px;
      bottom: 14px;
      display: flex;
      align-items: stretch;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      user-select: none;
      -webkit-font-smoothing: antialiased;
      pointer-events: none;
    }
    .akiva-dock-wrapper * {
      box-sizing: border-box;
      pointer-events: auto;
    }

    /* 1. Slim Icon Dock */
    .akiva-slim-dock {
      width: 58px;
      background: #090c15;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 0;
      gap: 12px;
      flex-shrink: 0;
      z-index: 100;
      box-shadow: 0 20px 50px rgba(0,0,0,0.75);
    }

    .dock-brand-avatar {
      width: 38px;
      height: 38px;
      border-radius: 16px;
      background: linear-gradient(135deg, #d97706, #f59e0b, #fbbf24);
      padding: 1.5px;
      cursor: pointer;
      margin-bottom: 6px;
      transition: transform 0.2s;
    }
    .dock-brand-avatar:hover {
      transform: scale(1.06);
    }
    .dock-brand-avatar-inner {
      width: 100%;
      height: 100%;
      background: #0a0d17;
      border-radius: 14.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
    }

    .dock-icon-btn {
      width: 40px;
      height: 40px;
      border-radius: 14px;
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: transparent;
      color: #71717a;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    .dock-icon-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #e4e4e7;
      transform: translateY(-1px);
    }
    .dock-icon-btn.active {
      background: rgba(245, 158, 11, 0.14);
      border-color: rgba(245, 158, 11, 0.4);
      color: #f59e0b;
      box-shadow: 0 0 18px rgba(245, 158, 11, 0.2);
    }
    .dock-tooltip {
      position: absolute;
      left: 54px;
      top: 50%;
      transform: translateY(-50%) translateX(6px);
      background: #141724;
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      padding: 6px 12px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s, transform 0.15s;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      z-index: 110;
    }
    .dock-icon-btn:hover .dock-tooltip {
      opacity: 1;
      transform: translateY(-50%) translateX(10px);
    }

    /* 2. Slideout Drawer */
    #slideout-drawer {
      width: 330px;
      margin-left: 10px;
      background: linear-gradient(180deg, #0f1624 0%, #090d16 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      z-index: 99;
      box-shadow: 0 25px 60px rgba(0,0,0,0.85);
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin-left 0.3s ease;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 16px;
      position: relative;
    }
    #slideout-drawer.closed {
      width: 0px !important;
      margin-left: 0px !important;
      opacity: 0;
      pointer-events: none;
      padding: 0 !important;
      border-color: transparent !important;
    }

    /* Drawer Header */
    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      margin-bottom: 14px;
    }
    .drawer-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 700;
      color: #a1a1aa;
    }
    .drawer-close-btn {
      background: transparent;
      border: none;
      color: #a1a1aa;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      padding: 0 4px;
      transition: color 0.15s;
    }
    .drawer-close-btn:hover {
      color: #fff;
    }

    .drawer-view {
      flex: 1;
      overflow-y: auto;
      padding-right: 2px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .drawer-view.hidden {
      display: none !important;
    }

    /* Custom Checkbox */
    .round-check {
      appearance: none;
      -webkit-appearance: none;
      width: 17px;
      height: 17px;
      border: 1.5px solid rgba(255, 255, 255, 0.22);
      border-radius: 9999px;
      outline: none;
      cursor: pointer;
      display: inline-grid;
      place-content: center;
      transition: all 0.2s ease;
      background: rgba(255, 255, 255, 0.03);
      flex-shrink: 0;
      margin: 0;
    }
    .round-check:hover {
      border-color: #f59e0b;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.25);
    }
    .round-check:checked {
      background-color: #f59e0b;
      border-color: #f59e0b;
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.35);
    }
    .round-check:checked::before {
      content: '';
      width: 5px;
      height: 5px;
      background: #090a0f;
      border-radius: 9999px;
    }
    .round-check:checked ~ .task-content .task-title {
      text-decoration: line-through;
      color: #64748b !important;
    }

    /* Circular SVG Gauge */
    .progress-ring-circle {
      transition: stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1);
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }

    /* Calendar Grid */
    .cal-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      text-align: center;
      font-family: monospace;
    }
    .cal-day {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-size: 10.5px;
      cursor: pointer;
      transition: all 0.2s;
      color: #cbd5e1;
    }
    .cal-day:hover { background: rgba(255, 255, 255, 0.06); }
    .cal-day.active { background: #f59e0b; color: #090a0f !important; font-weight: bold; }
    .cal-day.today { border: 1px solid rgba(245, 158, 11, 0.6); }
    .cal-day.has-test::after {
      content: '';
      width: 4px;
      height: 4px;
      background: #f59e0b;
      border-radius: 9999px;
      margin-top: 1px;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.12); border-radius: 9999px; }

    @media (max-width: 600px) {
      .akiva-dock-wrapper {
        left: 8px;
        bottom: 8px;
        top: 8px;
      }
      #slideout-drawer {
        width: calc(100vw - 84px);
      }
    }
  `;
  document.head.appendChild(style);

  // Persistence keys
  const TASKS_KEY = 'akiva_dock_tasks_v3';
  const TESTS_KEY = 'akiva_test_events_v3';

  const DEFAULT_TASKS = [
    { id: 'dt1', title: 'Rotational Motion', subject: 'Physics', subColor: '#38bdf8', note: 'Revise notes & illustrations', done: false },
    { id: 'dt2', title: 'Ionic Equilibrium', subject: 'Chemistry', subColor: '#34d399', note: 'Buffer & Hydrolysis formulas', done: false },
    { id: 'dt3', title: 'Definite Integration', subject: 'Math', subColor: '#c084fc', note: 'Properties & King rule practice', done: false }
  ];

  const DEFAULT_TESTS = [
    { id: 1, name: 'Coaching Part Test #5', pattern: 'JEE Main', date: '2026-11-24', syllabus: 'Rotational, Ionic Eq, Definite Int', color: '#f59e0b' },
    { id: 2, name: 'All India Test Series (AITS-1)', pattern: 'JEE Adv (P1+P2)', date: '2026-11-29', syllabus: 'Mechanics + Physical Chem + Calculus', color: '#f43f5e' },
    { id: 3, name: 'Monthly Full Mock #2', pattern: 'JEE Main', date: '2026-12-06', syllabus: 'Full Class 11th Syllabus', color: '#38bdf8' }
  ];

  function loadTasks() {
    try {
      const s = localStorage.getItem(TASKS_KEY);
      return s ? JSON.parse(s) : DEFAULT_TASKS;
    } catch(e) { return DEFAULT_TASKS; }
  }
  function saveTasks(list) {
    try { localStorage.setItem(TASKS_KEY, JSON.stringify(list)); } catch(e) {}
  }

  function loadTests() {
    try {
      const s = localStorage.getItem(TESTS_KEY);
      return s ? JSON.parse(s) : DEFAULT_TESTS;
    } catch(e) { return DEFAULT_TESTS; }
  }
  function saveTests(list) {
    try { localStorage.setItem(TESTS_KEY, JSON.stringify(list)); } catch(e) {}
  }

  let tasksList = loadTasks();
  let testEvents = loadTests();
  let currentOpenTab = null;

  // Root wrapper
  const wrap = document.createElement('div');
  wrap.className = 'akiva-dock-wrapper';
  wrap.innerHTML = `
    <!-- 1. SLIM ICON DOCK -->
    <div class="akiva-slim-dock">
      <!-- Top Brand Logo -->
      <div class="dock-brand-avatar" title="JEE Study Tracker Hub">
        <div class="dock-brand-avatar-inner">🦊</div>
      </div>

      <!-- Icon 1: Study Tasks / Tracker -->
      <button class="dock-icon-btn" id="btn-dock-tasks" title="Today's Study Tracker" onclick="window.toggleDockTab('tasks')">
        <svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="currentColor" fill-opacity="0.2" />
          <path d="m9 14 2 2 4-4" stroke="#f59e0b" stroke-width="2.2" />
          <path d="M9 10h6" stroke-opacity="0.5" />
        </svg>
        <div class="dock-tooltip">📋 Study Tracker Hub</div>
      </button>

      <!-- Icon 2: Test Calendar & Radar -->
      <button class="dock-icon-btn" id="btn-dock-cal" title="Test Schedule & Radar" onclick="window.toggleDockTab('calendar')">
        <svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="#f59e0b" stroke-width="2.5" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="#f59e0b" stroke-width="2.5" />
          <line x1="3" y1="10" x2="21" y2="10" stroke-opacity="0.4" />
          <circle cx="12" cy="15" r="2" fill="#f59e0b" stroke="none" />
        </svg>
        <div class="dock-tooltip">🗓️ Test Calendar & Radar</div>
      </button>

      <!-- Icon 3: Backlogs -->
      <button class="dock-icon-btn" id="btn-dock-backlog" title="Backlog Recovery" onclick="window.toggleDockTab('backlog')">
        <svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" stroke="#f59e0b" />
        </svg>
        <div class="dock-tooltip">⏳ Backlog Recovery</div>
      </button>

      <!-- Icon 4: 83 Chapters Matrix -->
      <button class="dock-icon-btn" id="btn-dock-progress" title="83 JEE Chapters Matrix" onclick="window.toggleDockTab('progress')">
        <svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" stroke="#f59e0b" stroke-width="2.5" />
          <line x1="12" y1="20" x2="12" y2="4" stroke="#38bdf8" stroke-width="2.5" />
          <line x1="6" y1="20" x2="6" y2="14" stroke="#34d399" stroke-width="2.5" />
        </svg>
        <div class="dock-tooltip">📈 83 Chapters Matrix</div>
      </button>
    </div>

    <!-- 2. SLIDEOUT DRAWER -->
    <div id="slideout-drawer" class="closed">
      <!-- Header -->
      <div class="drawer-header">
        <span class="drawer-title" id="drawer-title">Study Tracker Hub</span>
        <button class="drawer-close-btn" onclick="window.closeDrawer()" title="Minimize to dock">&times;</button>
      </div>

      <!-- VIEW 1: STUDY TRACKER HUB -->
      <div id="view-tasks" class="drawer-view">
        <!-- Circular Progress Ring Card -->
        <div style="display:flex; align-items:center; gap:12px; padding:12px; border-radius:16px; background:rgba(18,26,42,0.85); border:1px solid rgba(255,255,255,0.08);">
          <div style="position:relative; width:48px; height:48px; flex-shrink:0; display:grid; place-items:center;">
            <svg style="width:100%; height:100%;" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" stroke="rgba(255, 255, 255, 0.08)" stroke-width="4.5" fill="none" />
              <circle id="circle-arc" cx="32" cy="32" r="26" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round" fill="none"
                      stroke-dasharray="163.36" stroke-dashoffset="163.36" class="progress-ring-circle" />
            </svg>
            <span id="circle-pct" style="position:absolute; font-family:monospace; font-size:10px; font-weight:700; color:#fff;">0%</span>
          </div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; align-items:baseline; justify-content:space-between;">
              <span style="font-size:12px; font-weight:600; color:#fff;">Today's Goal</span>
              <span id="ratio-text" style="font-size:10px; font-family:monospace; color:#fbbf24; font-weight:700;">0 / 3 Done</span>
            </div>
            <p id="sub-msg" style="font-size:9.5px; color:#a1a1aa; margin:2px 0 0;">3 tasks left before 11:30 PM</p>
            <div style="font-size:9px; font-family:monospace; color:#fbbf24; margin-top:4px;">🔥 14 Days Streak</div>
          </div>
        </div>

        <!-- Coaching Lectures List -->
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; align-items:center; justify-content:space-between; padding:0 2px;">
            <span style="font-size:9.5px; text-transform:uppercase; font-weight:700; letter-spacing:0.06em; color:#a1a1aa;">Coaching Lectures</span>
            <button onclick="window.toggleQuickInput()" style="font-size:10px; color:#fbbf24; font-weight:700; background:none; border:none; cursor:pointer;">+ Add</button>
          </div>

          <!-- Quick inline add input -->
          <div id="quick-add-box" style="display:none; padding:8px; border-radius:12px; background:rgba(18,26,42,0.9); border:1px solid rgba(245,158,11,0.3); flex-direction:column; gap:6px;">
            <input id="quick-ch-input" type="text" placeholder="e.g. Circular Motion, WEP..."
                   style="width:100%; background:rgba(0,0,0,0.35); border:1px solid #3f3f46; border-radius:8px; padding:4px 8px; color:#fff; font-size:10.5px; outline:none;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <select id="quick-sub-select" style="background:rgba(0,0,0,0.35); border:1px solid #3f3f46; color:#cbd5e1; border-radius:6px; padding:2px 6px; font-size:9.5px;">
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Math">Math</option>
              </select>
              <button onclick="window.addChapterFromDock()" style="padding:2px 10px; border-radius:6px; background:#f59e0b; color:#000; font-weight:700; font-size:9.5px; border:none; cursor:pointer;">Save</button>
            </div>
          </div>

          <!-- Tasks Container -->
          <div id="dock-task-list" style="display:flex; flex-direction:column; gap:5px;"></div>
        </div>
      </div>

      <!-- VIEW 2: MINI TEST CALENDAR & RADAR -->
      <div id="view-calendar" class="drawer-view hidden">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:6px;">
            <button onclick="window.changeMonth(-1)" style="background:rgba(255,255,255,0.05); border:none; color:#cbd5e1; border-radius:6px; width:22px; height:22px; cursor:pointer; font-size:11px;">&lsaquo;</button>
            <span id="cal-month-title" style="font-size:12px; font-weight:700; color:#fff;">November 2026</span>
            <button onclick="window.changeMonth(1)" style="background:rgba(255,255,255,0.05); border:none; color:#cbd5e1; border-radius:6px; width:22px; height:22px; cursor:pointer; font-size:11px;">&rsaquo;</button>
          </div>
          <button onclick="window.toggleAddTestModal()" style="font-size:9.5px; color:#fbbf24; font-weight:700; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3); border-radius:6px; padding:3px 8px; cursor:pointer;">+ Test</button>
        </div>

        <!-- Add Test Inline Modal -->
        <div id="add-test-modal" style="display:none; padding:10px; border-radius:12px; background:#151821; border:1px solid rgba(245,158,11,0.3); flex-direction:column; gap:6px;">
          <input id="new-test-name" type="text" placeholder="Test Name (e.g. AITS Part Test #4)"
                 style="width:100%; background:#0d0f14; border:1px solid #3f3f46; border-radius:8px; padding:4px 8px; color:#fff; font-size:10.5px; outline:none;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
            <input id="new-test-date" type="date" value="2026-11-29"
                   style="background:#0d0f14; border:1px solid #3f3f46; border-radius:6px; padding:2px 4px; color:#fff; font-size:9.5px;">
            <select id="new-test-pattern" style="background:#0d0f14; border:1px solid #3f3f46; color:#cbd5e1; border-radius:6px; padding:2px 4px; font-size:9.5px;">
              <option>JEE Main</option>
              <option>JEE Adv (P1+P2)</option>
              <option>Part Test</option>
            </select>
          </div>
          <input id="new-test-syllabus" type="text" placeholder="Syllabus (e.g. Rotation, Ionic Eq)"
                 style="width:100%; background:#0d0f14; border:1px solid #3f3f46; border-radius:8px; padding:4px 8px; color:#fff; font-size:10px; outline:none;">
          <button onclick="window.saveTest()" style="width:100%; padding:5px; background:#f59e0b; color:#000; font-weight:700; border-radius:6px; border:none; font-size:10px; cursor:pointer;">Save to Calendar &rarr;</button>
        </div>

        <!-- Calendar Grid Card -->
        <div style="padding:10px; border-radius:14px; background:rgba(18,26,42,0.85); border:1px solid rgba(255,255,255,0.08);">
          <div class="cal-grid" style="font-size:8.5px; color:#71717a; margin-bottom:4px; font-weight:700;">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span style="color:#fbbf24;">S</span><span style="color:#f43f5e;">S</span>
          </div>
          <div id="calendar-days" class="cal-grid"></div>
        </div>

        <!-- Upcoming Tests Radar -->
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; align-items:center; justify-content:space-between; padding:0 2px;">
            <span style="font-size:9.5px; text-transform:uppercase; font-weight:700; letter-spacing:0.06em; color:#a1a1aa;">Upcoming Test Radar</span>
            <span style="font-size:9px; color:#fbbf24; font-family:monospace;" id="next-countdown">Next test in 2d</span>
          </div>
          <div id="upcoming-tests-container" style="display:flex; flex-direction:column; gap:5px;"></div>
        </div>
      </div>

      <!-- VIEW 3: BACKLOGS -->
      <div id="view-backlog" class="drawer-view hidden">
        <div style="font-size:12px; font-weight:700; color:#fff;">Backlog Recovery</div>
        <div style="font-size:10.5px; color:#a1a1aa;">Missed self-study tasks from past 7 days</div>
        <div id="backlog-container" style="display:flex; flex-direction:column; gap:6px; margin-top:4px;">
          <div style="padding:16px; border-radius:12px; background:rgba(255,255,255,0.02); text-align:center; color:#71717a; font-size:11px;">
            🎉 No overdue backlogs found! Consistency is on point.
          </div>
        </div>
      </div>

      <!-- VIEW 4: 83 CHAPTERS MATRIX -->
      <div id="view-progress" class="drawer-view hidden">
        <div style="font-size:12px; font-weight:700; color:#fff;">83 JEE Chapters Matrix</div>
        <div style="font-size:10.5px; color:#a1a1aa;">Syllabus checklist across Physics, Chem & Maths</div>
        <div id="matrix-container" style="display:flex; flex-direction:column; gap:5px; max-height:420px; overflow-y:auto; padding-right:2px;"></div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  // Core Drawer Actions
  const circumference = 2 * Math.PI * 26;

  window.toggleDockTab = function(tab) {
    const drawer = document.getElementById('slideout-drawer');
    if (currentOpenTab === tab && !drawer.classList.contains('closed')) {
      window.closeDrawer();
      return;
    }

    drawer.classList.remove('closed');
    currentOpenTab = tab;

    const titles = {
      tasks: 'Study Tracker Hub',
      calendar: 'Test Radar & Calendar',
      backlog: 'Backlog Recovery',
      progress: '83 JEE Chapters Matrix'
    };
    const titleEl = document.getElementById('drawer-title');
    if (titleEl) titleEl.innerText = titles[tab] || 'Study Tracker';

    ['tasks', 'calendar', 'backlog', 'progress'].forEach(t => {
      const v = document.getElementById('view-' + t);
      if (v) v.classList.add('hidden');
      const btn = document.getElementById('btn-dock-' + (t === 'calendar' ? 'cal' : t));
      if (btn) btn.classList.remove('active');
    });

    const activeView = document.getElementById('view-' + tab);
    if (activeView) activeView.classList.remove('hidden');

    const activeBtn = document.getElementById('btn-dock-' + (tab === 'calendar' ? 'cal' : tab));
    if (activeBtn) activeBtn.classList.add('active');

    if (tab === 'tasks') window.renderDockTasks();
    else if (tab === 'calendar') window.renderCalendar();
    else if (tab === 'progress') window.renderMatrixList();
  };

  window.closeDrawer = function() {
    const drawer = document.getElementById('slideout-drawer');
    if (drawer) drawer.classList.add('closed');
    currentOpenTab = null;
    ['tasks', 'cal', 'backlog', 'progress'].forEach(id => {
      const btn = document.getElementById('btn-dock-' + id);
      if (btn) btn.classList.remove('active');
    });
  };

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) {
      window.closeDrawer();
    }
  });

  // ESC key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeDrawer();
  });

  /* Task List & Gauge Calculation */
  window.renderDockTasks = function() {
    const listEl = document.getElementById('dock-task-list');
    if (!listEl) return;
    listEl.innerHTML = tasksList.map(item => `
      <div style="display:flex; align-items:start; justify-content:space-between; padding:6px 8px; border-radius:10px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.05); transition:background 0.2s;">
        <label style="display:flex; align-items:start; gap:8px; flex:1; cursor:pointer;">
          <input type="checkbox" ${item.done ? 'checked' : ''} onchange="window.toggleTaskCheck('${item.id}')" class="round-check">
          <div class="task-content" style="flex:1; min-width:0;">
            <div style="display:flex; align-items:baseline; justify-content:space-between; padding-right:4px;">
              <span class="task-title" style="font-size:11px; font-weight:600; color:#fff; ${item.done ? 'text-decoration:line-through; color:#64748b;' : ''}">${item.title}</span>
              <span style="font-size:9px; font-family:monospace; color:${item.subColor};">${item.subject}</span>
            </div>
            <div style="font-size:9px; color:#94a3b8; margin-top:2px;">${item.note}</div>
          </div>
        </label>
        <button onclick="window.deleteTask('${item.id}')" style="background:none; border:none; color:#71717a; font-size:14px; cursor:pointer; padding:0 4px; line-height:1;" title="Delete task">&times;</button>
      </div>
    `).join('');
    window.calcDock();
  };

  window.toggleTaskCheck = function(id) {
    const item = tasksList.find(x => x.id === id);
    if (item) {
      item.done = !item.done;
      saveTasks(tasksList);
      window.renderDockTasks();
    }
  };

  window.deleteTask = function(id) {
    tasksList = tasksList.filter(x => x.id !== id);
    saveTasks(tasksList);
    window.renderDockTasks();
  };

  window.calcDock = function() {
    const total = tasksList.length;
    const done = tasksList.filter(x => x.done).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    const arc = document.getElementById('circle-arc');
    if (arc) {
      const offset = circumference - (pct / 100) * circumference;
      arc.style.strokeDashoffset = offset;
    }
    const pctEl = document.getElementById('circle-pct');
    if (pctEl) pctEl.innerText = pct + '%';
    const ratioEl = document.getElementById('ratio-text');
    if (ratioEl) ratioEl.innerText = done + ' / ' + total + ' Done';
    const subEl = document.getElementById('sub-msg');
    if (subEl) {
      const rem = total - done;
      subEl.innerText = rem === 0 && total > 0 ? "All targets cleared! Great job 🚀" : rem + " tasks left before 11:30 PM";
    }
  };

  window.toggleQuickInput = function() {
    const box = document.getElementById('quick-add-box');
    if (!box) return;
    box.style.display = box.style.display === 'none' ? 'flex' : 'none';
  };

  window.addChapterFromDock = function() {
    const inp = document.getElementById('quick-ch-input');
    const sel = document.getElementById('quick-sub-select');
    if (!inp || !sel) return;
    const text = inp.value.trim();
    if (!text) return;

    let subColor = '#38bdf8';
    if (sel.value === 'Chemistry') subColor = '#34d399';
    else if (sel.value === 'Math') subColor = '#c084fc';

    tasksList.unshift({
      id: 'dt_' + Date.now().toString(36),
      title: text,
      subject: sel.value,
      subColor: subColor,
      note: 'Self-study & revision',
      done: false
    });
    saveTasks(tasksList);
    inp.value = '';
    window.toggleQuickInput();
    window.renderDockTasks();
  };

  /* Calendar Logic */
  let currentYear = 2026;
  let currentMonth = 10; // 10 = November
  let selectedDateStr = '2026-11-24';
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  window.changeMonth = function(delta) {
    currentMonth += delta;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    window.renderCalendar();
  };

  window.renderCalendar = function() {
    const titleEl = document.getElementById('cal-month-title');
    if (titleEl) titleEl.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    const daysContainer = document.getElementById('calendar-days');
    if (!daysContainer) return;
    daysContainer.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const startDayIndex = (firstDay + 6) % 7;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < startDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day';
      emptyCell.style.opacity = '0.2';
      daysContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasTest = testEvents.find(t => t.date === dateStr);
      const isToday = (currentYear === 2026 && currentMonth === 10 && day === 22);
      const isSelected = (dateStr === selectedDateStr);

      const cell = document.createElement('div');
      cell.className = `cal-day ${isToday ? 'today' : ''} ${isSelected ? 'active' : ''} ${hasTest ? 'has-test' : ''}`;
      cell.onclick = () => { selectedDateStr = dateStr; window.renderCalendar(); };
      cell.innerText = day;
      daysContainer.appendChild(cell);
    }

    window.renderUpcomingList();
  };

  window.renderUpcomingList = function() {
    const container = document.getElementById('upcoming-tests-container');
    if (!container) return;
    container.innerHTML = '';

    const today = new Date(2026, 10, 22);
    testEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    testEvents.forEach(t => {
      const tDate = new Date(t.date);
      const diffDays = Math.ceil((tDate - today) / (1000 * 60 * 60 * 24));
      let daysBadge = '';

      if (diffDays === 0) daysBadge = '<span style="color:#f43f5e; font-weight:700;">TODAY!</span>';
      else if (diffDays === 1) daysBadge = '<span style="color:#fbbf24; font-weight:700;">Tomorrow</span>';
      else if (diffDays > 1) daysBadge = `<span style="color:#a1a1aa;">in <strong style="color:#fff;">${diffDays}d</strong></span>`;
      else daysBadge = '<span style="color:#71717a;">Passed</span>';

      const card = document.createElement('div');
      const isSelected = (t.date === selectedDateStr);
      card.style.cssText = `
        padding: 8px 10px; border-radius: 10px; border: 1px solid ${isSelected ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.06)'};
        background: ${isSelected ? 'rgba(255,255,255,0.06)' : 'rgba(18,20,28,0.9)'}; transition: all 0.2s;
      `;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="width:6px; height:6px; border-radius:50%; background:${t.color};"></span>
              <span style="font-size:11px; font-weight:700; color:#fff;">${t.name}</span>
            </div>
            <div style="font-size:9px; color:#94a3b8; font-family:monospace; margin-top:2px;">${t.pattern} &bull; ${t.date}</div>
          </div>
          <div style="font-size:10px; font-family:monospace;">${daysBadge}</div>
        </div>
        <div style="margin-top:6px; padding-top:4px; border-top:1px solid rgba(255,255,255,0.05); font-size:9px; color:#94a3b8; display:flex; justify-content:space-between; align-items:center;">
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:200px;">📚 ${t.syllabus}</span>
          <button onclick="window.deleteTest(${t.id})" style="background:none; border:none; color:#71717a; cursor:pointer; font-size:13px; line-height:1;">&times;</button>
        </div>
      `;
      container.appendChild(card);
    });

    const nextCountEl = document.getElementById('next-countdown');
    if (nextCountEl && testEvents.length > 0) {
      const nextTest = testEvents.find(t => new Date(t.date) >= today);
      if (nextTest) {
        const diff = Math.ceil((new Date(nextTest.date) - today) / (1000 * 60 * 60 * 24));
        nextCountEl.innerText = diff === 0 ? 'Next test TODAY!' : `Next test in ${diff}d`;
      }
    }
  };

  window.toggleAddTestModal = function() {
    const modal = document.getElementById('add-test-modal');
    if (!modal) return;
    modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
  };

  window.saveTest = function() {
    const name = document.getElementById('new-test-name').value.trim();
    const date = document.getElementById('new-test-date').value;
    const pattern = document.getElementById('new-test-pattern').value;
    const syllabus = document.getElementById('new-test-syllabus').value.trim() || 'Full Specified Syllabus';
    if (!name || !date) return;

    testEvents.push({
      id: Date.now(),
      name: name,
      pattern: pattern,
      date: date,
      syllabus: syllabus,
      color: pattern.includes('Adv') ? '#f43f5e' : '#f59e0b'
    });
    saveTests(testEvents);
    document.getElementById('new-test-name').value = '';
    window.toggleAddTestModal();
    window.renderCalendar();
  };

  window.deleteTest = function(id) {
    testEvents = testEvents.filter(t => t.id !== id);
    saveTests(testEvents);
    window.renderCalendar();
  };

  /* 83 Chapters Matrix Checklist */
  window.renderMatrixList = function() {
    const container = document.getElementById('matrix-container');
    if (!container) return;
    const completed = JSON.parse(localStorage.getItem('akiva_matrix_done') || '{}');

    container.innerHTML = JEE_CHAPTERS.map(c => {
      const isDone = !!completed[c.title];
      const subjCol = c.subject === 'Physics' ? '#38bdf8' : c.subject === 'Chemistry' ? '#34d399' : '#c084fc';
      return `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:6px 8px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04);">
          <label style="display:flex; align-items:center; gap:8px; flex:1; cursor:pointer;">
            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="window.toggleMatrixDone('${c.title.replace(/'/g, "\'")}')" class="round-check">
            <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              <span style="font-size:10.5px; font-weight:600; color:#fff; ${isDone ? 'text-decoration:line-through; opacity:0.6;' : ''}">${c.title}</span>
              <div style="font-size:8.5px; color:${subjCol};">${c.subject} &bull; ${c.branch}</div>
            </div>
          </label>
        </div>
      `;
    }).join('');
  };

  window.toggleMatrixDone = function(chapTitle) {
    const completed = JSON.parse(localStorage.getItem('akiva_matrix_done') || '{}');
    completed[chapTitle] = !completed[chapTitle];
    localStorage.setItem('akiva_matrix_done', JSON.stringify(completed));
    window.renderMatrixList();
  };

  // Global Bridge
  window.akOpenScreen = function(tabName) {
    let targetTab = 'tasks';
    if (tabName === 'calendar' || tabName === 'future') targetTab = 'calendar';
    else if (tabName === 'backlog') targetTab = 'backlog';
    else if (tabName === 'progress') targetTab = 'progress';
    window.toggleDockTab(targetTab);
  };

  // Initial Calculation
  window.renderDockTasks();
})();
