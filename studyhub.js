/**
 * AKIVA JEE Midnight Rail Sidebar
 * Exact 1:1 Implementation of Design 01: Midnight Rail:
 * - Slim 58px Icon Rail permanently docked on the left.
 * - Interactive 320px Slideout Panel beside it (toggles open/close on icon click).
 * - Progress Ring (% meter), Segmented Tabs (Today / Future / Backlog).
 * - Interactive Task Checklist with subject tags (Phy, Chem, Math) & custom checkmarks.
 * - Teal "+ Add New Task" button with inline add input.
 * - Pure standalone component: All extraneous widgets (AI mentor, 350px floating window card, etc.) are removed.
 */
(function() {
  'use strict';
  if (document.querySelector('.akiva-dock-wrapper')) return;

  // Master JEE Chapters
  const JEE_CHAPTERS = [
    { id: 'p1', title: 'Units & Dimensions', subject: 'Physics' },
    { id: 'p2', title: 'Kinematics: 1D Motion', subject: 'Physics' },
    { id: 'p3', title: 'Kinematics: 2D & Projectiles', subject: 'Physics' },
    { id: 'p4', title: 'Laws of Motion & Friction', subject: 'Physics' },
    { id: 'p5', title: 'Work, Power & Energy', subject: 'Physics' },
    { id: 'p6', title: 'Centre of Mass & Collisions', subject: 'Physics' },
    { id: 'p7', title: 'Rotational Motion & Inertia', subject: 'Physics' },
    { id: 'p8', title: 'Gravitation', subject: 'Physics' },
    { id: 'p9', title: 'Mechanical Properties of Solids', subject: 'Physics' },
    { id: 'p10', title: 'Mechanical Properties of Fluids', subject: 'Physics' },
    { id: 'p11', title: 'Thermal Properties & Calorimetry', subject: 'Physics' },
    { id: 'p12', title: 'Thermodynamics', subject: 'Physics' },
    { id: 'p13', title: 'Kinetic Theory of Gases (KTG)', subject: 'Physics' },
    { id: 'p14', title: 'Oscillations (SHM)', subject: 'Physics' },
    { id: 'p15', title: 'Waves & Sound', subject: 'Physics' },
    { id: 'p16', title: 'Electrostatics & Potential', subject: 'Physics' },
    { id: 'p17', title: 'Capacitance & Dielectrics', subject: 'Physics' },
    { id: 'p18', title: 'Current Electricity', subject: 'Physics' },
    { id: 'p19', title: 'Magnetic Effects of Current', subject: 'Physics' },
    { id: 'p20', title: 'Magnetism & Matter', subject: 'Physics' },
    { id: 'p21', title: 'Electromagnetic Induction (EMI)', subject: 'Physics' },
    { id: 'p22', title: 'Alternating Current (AC)', subject: 'Physics' },
    { id: 'p23', title: 'Electromagnetic Waves', subject: 'Physics' },
    { id: 'p24', title: 'Ray Optics & Optical Instruments', subject: 'Physics' },
    { id: 'p25', title: 'Wave Optics & Interference', subject: 'Physics' },
    { id: 'p26', title: 'Dual Nature & Photoelectric Effect', subject: 'Physics' },
    { id: 'p27', title: 'Atoms & Nuclei', subject: 'Physics' },
    { id: 'p28', title: 'Semiconductor Electronics', subject: 'Physics' },
    { id: 'c1', title: 'Mole Concept & Stoichiometry', subject: 'Chemistry' },
    { id: 'c2', title: 'Atomic Structure', subject: 'Chemistry' },
    { id: 'c3', title: 'States of Matter (Gases & Liquids)', subject: 'Chemistry' },
    { id: 'c4', title: 'Thermodynamics & Thermochemistry', subject: 'Chemistry' },
    { id: 'c5', title: 'Chemical Equilibrium', subject: 'Chemistry' },
    { id: 'c6', title: 'Ionic Equilibrium', subject: 'Chemistry' },
    { id: 'c7', title: 'Redox Reactions', subject: 'Chemistry' },
    { id: 'c8', title: 'Solutions & Colligative Properties', subject: 'Chemistry' },
    { id: 'c9', title: 'Electrochemistry', subject: 'Chemistry' },
    { id: 'c10', title: 'Chemical Kinetics', subject: 'Chemistry' },
    { id: 'c11', title: 'Surface Chemistry', subject: 'Chemistry' },
    { id: 'c12', title: 'Periodic Table & Periodicity', subject: 'Chemistry' },
    { id: 'c13', title: 'Chemical Bonding & Molecular Structure', subject: 'Chemistry' },
    { id: 'c14', title: 'Hydrogen & s-Block Elements', subject: 'Chemistry' },
    { id: 'c15', title: 'p-Block Elements (Group 13-14)', subject: 'Chemistry' },
    { id: 'c16', title: 'p-Block Elements (Group 15-18)', subject: 'Chemistry' },
    { id: 'c17', title: 'd- & f-Block Elements', subject: 'Chemistry' },
    { id: 'c18', title: 'Coordination Compounds', subject: 'Chemistry' },
    { id: 'c19', title: 'Metallurgy & Principles of Extraction', subject: 'Chemistry' },
    { id: 'c20', title: 'IUPAC Nomenclature & GOC', subject: 'Chemistry' },
    { id: 'c21', title: 'Isomerism in Organic Compounds', subject: 'Chemistry' },
    { id: 'c22', title: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)', subject: 'Chemistry' },
    { id: 'c23', title: 'Aromatic Compounds (Benzene)', subject: 'Chemistry' },
    { id: 'c24', title: 'Haloalkanes & Haloarenes', subject: 'Chemistry' },
    { id: 'c25', title: 'Alcohols, Phenols & Ethers', subject: 'Chemistry' },
    { id: 'c26', title: 'Aldehydes, Ketones & Carboxylic Acids', subject: 'Chemistry' },
    { id: 'c27', title: 'Amines & Diazonium Salts', subject: 'Chemistry' },
    { id: 'c28', title: 'Biomolecules', subject: 'Chemistry' },
    { id: 'c29', title: 'Polymers', subject: 'Chemistry' },
    { id: 'c30', title: 'Everyday Chemistry & Practical Chemistry', subject: 'Chemistry' },
    { id: 'm1', title: 'Sets, Relations & Functions', subject: 'Maths' },
    { id: 'm2', title: 'Complex Numbers', subject: 'Maths' },
    { id: 'm3', title: 'Quadratic Equations', subject: 'Maths' },
    { id: 'm4', title: 'Permutations & Combinations (P&C)', subject: 'Maths' },
    { id: 'm5', title: 'Binomial Theorem', subject: 'Maths' },
    { id: 'm6', title: 'Sequences & Series (AP, GP)', subject: 'Maths' },
    { id: 'm7', title: 'Matrices & Determinants', subject: 'Maths' },
    { id: 'm8', title: 'Probability', subject: 'Maths' },
    { id: 'm9', title: 'Statistics', subject: 'Maths' },
    { id: 'm10', title: 'Mathematical Reasoning', subject: 'Maths' },
    { id: 'm11', title: 'Trigonometric Functions & Identities', subject: 'Maths' },
    { id: 'm12', title: 'Inverse Trigonometric Functions (ITF)', subject: 'Maths' },
    { id: 'm13', title: 'Straight Lines & Pair of Lines', subject: 'Maths' },
    { id: 'm14', title: 'Circles & System of Circles', subject: 'Maths' },
    { id: 'm15', title: 'Conic Sections: Parabola', subject: 'Maths' },
    { id: 'm16', title: 'Conic Sections: Ellipse & Hyperbola', subject: 'Maths' },
    { id: 'm17', title: 'Limits, Continuity & Differentiability', subject: 'Maths' },
    { id: 'm18', title: 'Methods of Differentiation (MOD)', subject: 'Maths' },
    { id: 'm19', title: 'Application of Derivatives (AOD)', subject: 'Maths' },
    { id: 'm20', title: 'Indefinite Integration', subject: 'Maths' },
    { id: 'm21', title: 'Definite Integration', subject: 'Maths' },
    { id: 'm22', title: 'Differential Equations (DE)', subject: 'Maths' },
    { id: 'm23', title: 'Area Under Curves (AUC)', subject: 'Maths' },
    { id: 'm24', title: 'Vector Algebra', subject: 'Maths' },
    { id: 'm25', title: 'Three Dimensional Geometry (3D)', subject: 'Maths' }
  ];

  // Storage keys
  const STORAGE_KEY = 'akiva_midnight_rail_tasks_v1';

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function shiftDateStr(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  const DEFAULT_TASKS = [
    { id: 't1', title: 'Maths: Limits PYQs', subject: 'Maths', date: todayStr(), done: true },
    { id: 't2', title: 'Physics: Rotation Q1-25', subject: 'Physics', date: todayStr(), done: false },
    { id: 't3', title: 'Chem: Periodic Trends', subject: 'Chemistry', date: todayStr(), done: false },
    { id: 't4', title: 'Physics: EMI Notes Revision', subject: 'Physics', date: shiftDateStr(1), done: false },
    { id: 't5', title: 'Chem: Chemical Kinetics Lec 2', subject: 'Chemistry', date: shiftDateStr(-1), done: false },
    { id: 't6', title: 'Maths: Matrices & Det Ex 1', subject: 'Maths', date: shiftDateStr(-2), done: false }
  ];

  function loadTasks() {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : DEFAULT_TASKS;
    } catch(e) { return DEFAULT_TASKS; }
  }

  function saveTasks(tasks) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch(e) {}
  }

  let tasks = loadTasks();
  let currentTab = 'today'; // 'today' | 'future' | 'backlog'
  let isPanelOpen = false;

  // Inject Styles
  const style = document.createElement('style');
  style.id = 'akiva-midnight-rail-styles';
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

    /* 1. Midnight Rail (58px Slim Icon Rail) */
    .akiva-midnight-rail {
      width: 58px;
      background: #090e18;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 0;
      gap: 14px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.65);
      flex-shrink: 0;
      z-index: 100;
    }

    .d1-avatar {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: #14b8a6;
      color: #042f2e;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 15px;
      margin-bottom: 4px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .d1-avatar:hover {
      transform: scale(1.06);
    }

    .d1-rail-btn {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: transparent;
      border: 1px solid transparent;
      color: #64748b;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    .d1-rail-btn:hover {
      background: rgba(255, 255, 255, 0.06);
      color: #e2e8f0;
      transform: translateY(-1px);
    }
    .d1-rail-btn.active {
      background: rgba(20, 184, 166, 0.15);
      border-color: rgba(20, 184, 166, 0.4);
      color: #14b8a6;
      box-shadow: 0 0 16px rgba(20, 184, 166, 0.25);
    }

    .d1-tooltip {
      position: absolute;
      left: 50px;
      top: 50%;
      transform: translateY(-50%) translateX(6px);
      background: #141b2a;
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s, transform 0.15s;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      z-index: 120;
    }
    .d1-rail-btn:hover .d1-tooltip {
      opacity: 1;
      transform: translateY(-50%) translateX(10px);
    }

    .d1-bottom-flame {
      margin-top: auto;
      color: #f59e0b;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .d1-flame-num {
      font-size: 9px;
      font-family: monospace;
      font-weight: 700;
      color: #fbbf24;
    }

    /* 2. Slideout Panel (320px) */
    .akiva-midnight-panel {
      width: 320px;
      margin-left: 10px;
      background: #090e18;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 13px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.75);
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin-left 0.3s ease;
      overflow: hidden;
      position: relative;
      z-index: 99;
    }
    .akiva-midnight-panel.closed {
      width: 0px !important;
      margin-left: 0px !important;
      padding: 0 !important;
      opacity: 0;
      pointer-events: none;
      border-color: transparent !important;
    }

    /* Panel Header */
    .d1-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2px;
    }
    .d1-panel-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .d1-panel-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.01em;
    }
    .d1-panel-date {
      font-size: 11px;
      color: #64748b;
      font-family: monospace;
    }
    .d1-close-btn {
      background: transparent;
      border: none;
      color: #64748b;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      padding: 0 4px;
      transition: color 0.15s;
    }
    .d1-close-btn:hover {
      color: #fff;
    }

    /* Segmented Tabs */
    .d1-tabs {
      display: flex;
      background: rgba(255, 255, 255, 0.03);
      padding: 3px;
      border-radius: 10px;
      gap: 4px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .d1-tab {
      flex: 1;
      text-align: center;
      padding: 6px 0;
      font-size: 11px;
      font-weight: 600;
      border-radius: 7px;
      color: #94a3b8;
      cursor: pointer;
      border: none;
      background: transparent;
      transition: all 0.15s;
    }
    .d1-tab:hover {
      color: #fff;
    }
    .d1-tab.active {
      background: #14b8a6;
      color: #042f2e;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(20, 184, 166, 0.3);
    }

    /* Progress Dial Box */
    .d1-ring-box {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 14px;
    }
    .d1-ring-svg {
      width: 44px;
      height: 44px;
      transform: rotate(-90deg);
      flex-shrink: 0;
    }
    .d1-ring-circle {
      transition: stroke-dashoffset 0.4s ease;
    }

    /* Tasks List */
    .d1-tasks-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 7px;
      padding-right: 2px;
      min-height: 120px;
    }
    .d1-task-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: background 0.15s, border-color 0.15s;
    }
    .d1-task-row:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.09);
    }
    .d1-check {
      appearance: none;
      -webkit-appearance: none;
      width: 17px;
      height: 17px;
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      border-radius: 5px;
      cursor: pointer;
      display: grid;
      place-items: center;
      outline: none;
      transition: all 0.2s;
      flex-shrink: 0;
      margin: 0;
    }
    .d1-check:checked {
      background: #14b8a6;
      border-color: #14b8a6;
    }
    .d1-check:checked::after {
      content: '✓';
      font-size: 11px;
      font-weight: 800;
      color: #042f2e;
    }
    .d1-task-title {
      flex: 1;
      font-size: 12px;
      font-weight: 500;
      color: #e2e8f0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color 0.2s, text-decoration 0.2s;
    }
    .d1-task-row.done .d1-task-title {
      text-decoration: line-through;
      color: #64748b;
    }
    .d1-task-badge {
      font-size: 9.5px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 6px;
      text-transform: uppercase;
      font-family: monospace;
      flex-shrink: 0;
    }
    .subj-phy { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }
    .subj-chem { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }
    .subj-math { background: rgba(192, 132, 252, 0.15); color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.3); }

    .d1-del-btn {
      background: none;
      border: none;
      color: #475569;
      font-size: 14px;
      cursor: pointer;
      padding: 0 2px;
      line-height: 1;
      opacity: 0;
      transition: opacity 0.15s, color 0.15s;
    }
    .d1-task-row:hover .d1-del-btn {
      opacity: 1;
    }
    .d1-del-btn:hover {
      color: #ef4444;
    }

    /* Add Task Area */
    .d1-add-btn {
      width: 100%;
      padding: 10px;
      background: #14b8a6;
      border: none;
      border-radius: 12px;
      color: #042f2e;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: filter 0.15s, transform 0.1s;
      flex-shrink: 0;
    }
    .d1-add-btn:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }

    /* Inline Add Form */
    .d1-add-form {
      display: none;
      flex-direction: column;
      gap: 8px;
      padding: 10px;
      background: rgba(20, 27, 42, 0.95);
      border: 1px solid rgba(20, 184, 166, 0.4);
      border-radius: 12px;
      margin-top: 4px;
    }
    .d1-add-input {
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 6px 10px;
      color: #fff;
      font-size: 11px;
      outline: none;
    }
    .d1-add-input:focus {
      border-color: #14b8a6;
    }
    .d1-add-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
    }
    .d1-add-select {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      padding: 4px 8px;
      color: #cbd5e1;
      font-size: 10px;
      outline: none;
    }
    .d1-btn-save {
      background: #14b8a6;
      border: none;
      border-radius: 6px;
      padding: 4px 12px;
      color: #042f2e;
      font-size: 10.5px;
      font-weight: 700;
      cursor: pointer;
    }

    /* Scrollbars */
    .d1-tasks-list::-webkit-scrollbar { width: 3px; }
    .d1-tasks-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 999px; }

    @media (max-width: 600px) {
      .akiva-dock-wrapper {
        left: 6px;
        top: 6px;
        bottom: 6px;
      }
      .akiva-midnight-panel {
        width: calc(100vw - 78px);
      }
    }
  `;
  document.head.appendChild(style);

  // Root Container
  const wrap = document.createElement('div');
  wrap.className = 'akiva-dock-wrapper';
  wrap.innerHTML = `
    <!-- 1. SLIM ICON RAIL (58px) -->
    <div class="akiva-midnight-rail">
      <div class="d1-avatar" id="d1AvatarBtn" title="Pranay Surjuse &bull; Study Hub">P</div>

      <button class="d1-rail-btn active" id="btn-rail-todo" title="To-do List" onclick="window.akToggleMidnightRail('todo')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="currentColor" fill-opacity="0.2"/>
          <path d="m9 14 2 2 4-4" stroke="#14b8a6" stroke-width="2.2"/>
        </svg>
        <div class="d1-tooltip">📋 To-do List</div>
      </button>

      <button class="d1-rail-btn" id="btn-rail-cal" title="Test Calendar" onclick="window.akToggleMidnightRail('cal')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke="#14b8a6" stroke-width="2.5"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke="#14b8a6" stroke-width="2.5"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke-opacity="0.4"/>
        </svg>
        <div class="d1-tooltip">🗓️ Test Schedule</div>
      </button>

      <button class="d1-rail-btn" id="btn-rail-backlog" title="Backlogs" onclick="window.akToggleMidnightRail('backlog')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <div class="d1-tooltip">⏳ Backlogs</div>
      </button>

      <button class="d1-rail-btn" id="btn-rail-progress" title="Progress Bar" onclick="window.akToggleMidnightRail('progress')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
        <div class="d1-tooltip">📈 Progress Matrix</div>
      </button>

      <div class="d1-bottom-flame" title="14 Days Streak" onclick="window.akToggleMidnightRail('todo')">
        <span>🔥</span>
        <span class="d1-flame-num">14d</span>
      </div>
    </div>

    <!-- 2. SLIDEOUT PANEL (320px) -->
    <div class="akiva-midnight-panel closed" id="akMidnightPanel">
      <!-- Header -->
      <div class="d1-panel-header">
        <div class="d1-panel-title-wrap">
          <span class="d1-panel-title" id="d1HeaderTitle">To-do List</span>
          <span class="d1-panel-date" id="d1HeaderDate"></span>
        </div>
        <button class="d1-close-btn" onclick="window.akCloseMidnightPanel()" title="Minimize">&times;</button>
      </div>

      <!-- Segmented Tabs -->
      <div class="d1-tabs">
        <button class="d1-tab active" id="tab-today" onclick="window.akSwitchMidnightTab('today')">Today</button>
        <button class="d1-tab" id="tab-future" onclick="window.akSwitchMidnightTab('future')">Future</button>
        <button class="d1-tab" id="tab-backlog" onclick="window.akSwitchMidnightTab('backlog')">Backlog <span id="backlog-count-badge" style="opacity:0.8;">(0)</span></button>
      </div>

      <!-- Progress Dial Box -->
      <div class="d1-ring-box">
        <svg class="d1-ring-svg" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" stroke="rgba(255,255,255,0.1)" stroke-width="3.5" fill="none"/>
          <circle id="d1-circle-arc" cx="18" cy="18" r="14" stroke="#14b8a6" stroke-width="3.5" stroke-linecap="round" fill="none"
                  stroke-dasharray="87.96" stroke-dashoffset="87.96" class="d1-ring-circle"/>
        </svg>
        <div>
          <div id="d1-ratio-text" style="font-size:13px; font-weight:700; color:#fff;">0 / 0 done</div>
          <div id="d1-sub-msg" style="font-size:10.5px; color:#64748b;">0 left today &bull; Target: 99%ile</div>
        </div>
      </div>

      <!-- Tasks Checklist Container -->
      <div class="d1-tasks-list" id="d1TasksList"></div>

      <!-- Add New Task Button -->
      <button class="d1-add-btn" id="d1AddBtn" onclick="window.akToggleAddForm()">
        <span>+</span> Add New Task
      </button>

      <!-- Inline Add Form -->
      <div class="d1-add-form" id="d1AddForm">
        <input type="text" class="d1-add-input" id="d1InTitle" placeholder="e.g. Current Electricity PYQs...">
        <div class="d1-add-row">
          <select class="d1-add-select" id="d1InSubj">
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
          </select>
          <div style="display:flex; gap:6px;">
            <button onclick="window.akToggleAddForm()" style="background:none; border:none; color:#94a3b8; font-size:10px; cursor:pointer;">Cancel</button>
            <button class="d1-btn-save" onclick="window.akSaveTask()">Save</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(wrap);

  // Set date in header
  const today = todayStr();
  const dateObj = new Date();
  const dateFormatted = dateObj.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  const dateEl = document.getElementById('d1HeaderDate');
  if (dateEl) dateEl.textContent = dateFormatted;

  function updateBacklogBadge() {
    const bCount = tasks.filter(t => t.date < today && !t.done).length;
    const badge = document.getElementById('backlog-count-badge');
    if (badge) badge.textContent = `(${bCount})`;
  }

  function renderList() {
    const container = document.getElementById('d1TasksList');
    if (!container) return;

    let filtered = [];
    if (currentTab === 'today') {
      filtered = tasks.filter(t => t.date === today);
    } else if (currentTab === 'future') {
      filtered = tasks.filter(t => t.date > today);
    } else if (currentTab === 'backlog') {
      filtered = tasks.filter(t => t.date < today && !t.done);
    }

    // Update Progress Ring (for today)
    const todayTasks = tasks.filter(t => t.date === today);
    const totalToday = todayTasks.length;
    const doneToday = todayTasks.filter(t => t.done).length;
    const pct = totalToday ? Math.round((doneToday / totalToday) * 100) : 0;
    const arc = document.getElementById('d1-circle-arc');
    if (arc) {
      const circ = 87.96;
      arc.style.strokeDashoffset = circ - (circ * pct / 100);
    }

    const ratioEl = document.getElementById('d1-ratio-text');
    if (ratioEl) ratioEl.textContent = `${doneToday} / ${totalToday} done`;

    const subMsgEl = document.getElementById('d1-sub-msg');
    if (subMsgEl) {
      const left = totalToday - doneToday;
      subMsgEl.textContent = `${left} left today \u2022 Target: 99%ile`;
    }

    updateBacklogBadge();

    if (!filtered.length) {
      container.innerHTML = `
        <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px 10px; color:#64748b; text-align:center;">
          <div style="font-size:20px; margin-bottom:4px;">✨</div>
          <div style="font-size:12px; font-weight:600; color:#94a3b8;">No ${currentTab} tasks</div>
          <div style="font-size:10.5px; margin-top:2px;">Click "+ Add New Task" below to schedule.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(t => {
      let subClass = 'subj-phy';
      let subLabel = 'Phy';
      if (t.subject === 'Chemistry') { subClass = 'subj-chem'; subLabel = 'Chem'; }
      else if (t.subject === 'Maths') { subClass = 'subj-math'; subLabel = 'Math'; }

      return `
        <div class="d1-task-row ${t.done ? 'done' : ''}">
          <input type="checkbox" class="d1-check" ${t.done ? 'checked' : ''} onchange="window.akToggleTask('${t.id}')">
          <div class="d1-task-title" title="${t.title}">${t.title}</div>
          <span class="d1-task-badge ${subClass}">${subLabel}</span>
          <button class="d1-del-btn" onclick="window.akDeleteTask('${t.id}')" title="Delete task">&times;</button>
        </div>
      `;
    }).join('');
  }

  // Window functions
  window.akToggleMidnightRail = function(type) {
    const panel = document.getElementById('akMidnightPanel');
    const headerTitle = document.getElementById('d1HeaderTitle');

    if (type === 'todo') {
      window.akSwitchMidnightTab('today');
    } else if (type === 'cal') {
      window.akSwitchMidnightTab('future');
    } else if (type === 'backlog') {
      window.akSwitchMidnightTab('backlog');
    } else if (type === 'progress') {
      window.akSwitchMidnightTab('today');
    }

    if (isPanelOpen && panel && !panel.classList.contains('closed')) {
      window.akCloseMidnightPanel();
    } else {
      window.akOpenMidnightPanel();
    }
  };

  window.akOpenMidnightPanel = function() {
    const panel = document.getElementById('akMidnightPanel');
    if (panel) {
      panel.classList.remove('closed');
      isPanelOpen = true;
    }
  };

  window.akCloseMidnightPanel = function() {
    const panel = document.getElementById('akMidnightPanel');
    if (panel) {
      panel.classList.add('closed');
      isPanelOpen = false;
    }
  };

  window.akSwitchMidnightTab = function(tab) {
    currentTab = tab;
    ['today', 'future', 'backlog'].forEach(t => {
      const el = document.getElementById(`tab-${t}`);
      if (el) el.classList.toggle('active', t === tab);
    });

    const form = document.getElementById('d1AddForm');
    if (form) form.style.display = 'none';

    renderList();
    window.akOpenMidnightPanel();
  };

  window.akToggleTask = function(id) {
    const t = tasks.find(x => x.id === id);
    if (t) {
      t.done = !t.done;
      saveTasks(tasks);
      renderList();
    }
  };

  window.akDeleteTask = function(id) {
    tasks = tasks.filter(x => x.id !== id);
    saveTasks(tasks);
    renderList();
  };

  window.akToggleAddForm = function() {
    const form = document.getElementById('d1AddForm');
    if (!form) return;
    const isShowing = form.style.display === 'flex';
    form.style.display = isShowing ? 'none' : 'flex';
    if (!isShowing) {
      const inp = document.getElementById('d1InTitle');
      if (inp) { inp.value = ''; inp.focus(); }
    }
  };

  window.akSaveTask = function() {
    const inp = document.getElementById('d1InTitle');
    const sel = document.getElementById('d1InSubj');
    const title = inp ? inp.value.trim() : '';
    const subject = sel ? sel.value : 'Physics';

    if (!title) return;

    let d = today;
    if (currentTab === 'future') d = shiftDateStr(1);
    else if (currentTab === 'backlog') d = shiftDateStr(-1);

    tasks.push({
      id: 'task_' + Date.now(),
      title: title,
      subject: subject,
      date: d,
      done: false
    });

    saveTasks(tasks);
    window.akToggleAddForm();
    renderList();
  };

  // Close panel on outside click
  document.addEventListener('click', (e) => {
    const dock = document.querySelector('.akiva-dock-wrapper');
    if (isPanelOpen && dock && !dock.contains(e.target)) {
      window.akCloseMidnightPanel();
    }
  });

  // Initial render
  renderList();
})();
