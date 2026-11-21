/* ==========================================================================
   Study Hub: macOS-Style Collapsible Sidebar & Complete JEE Chapter Hub
   - 📋 To-do List: Today's checklist & daily task completion
   - 🗓️ Future Tasks: Scheduled upcoming tasks with 1-click move to today
   - ⏳ Backlogs: Overdue task detection, delay indicators & 1-click rescue
   - 📈 Progress Bar: Full 83 JEE Chapters Matrix, search, filters & live stats
   - 🎨 macOS Floating Design: Collapsible rail, traffic dots, flyouts, amber card
   ========================================================================== */

(function() {
  if (document.querySelector('.sb-root')) return;

  // Master JEE Syllabus (83 Chapters across Physics, Chemistry, Maths)
  const JEE_CHAPTERS = {
    Physics: [
      "Units & Dimensions",
      "Kinematics: 1D Motion",
      "Kinematics: 2D & Projectiles",
      "Laws of Motion & Friction",
      "Work, Power & Energy",
      "Centre of Mass & Collisions",
      "Rotational Motion & Inertia",
      "Gravitation",
      "Properties of Solids (Elasticity)",
      "Fluid Mechanics & Viscosity",
      "Thermal Properties & Calorimetry",
      "Thermodynamics",
      "Kinetic Theory of Gases (KTG)",
      "Oscillations (SHM)",
      "Waves & Sound",
      "Electrostatics & Potential",
      "Capacitance & Dielectrics",
      "Current Electricity",
      "Magnetic Effects of Current",
      "Magnetism & Matter",
      "Electromagnetic Induction (EMI)",
      "Alternating Current (AC)",
      "Electromagnetic Waves",
      "Ray Optics & Optical Instruments",
      "Wave Optics & Interference",
      "Dual Nature & Photoelectric Effect",
      "Atoms & Nuclei",
      "Semiconductor Electronics"
    ],
    Chemistry: [
      "Mole Concept & Stoichiometry",
      "Atomic Structure",
      "States of Matter (Gases & Liquids)",
      "Thermodynamics & Thermochemistry",
      "Chemical Equilibrium",
      "Ionic Equilibrium",
      "Redox Reactions",
      "Solutions & Colligative Properties",
      "Electrochemistry",
      "Chemical Kinetics",
      "Surface Chemistry",
      "Periodic Table & Periodicity",
      "Chemical Bonding & Molecular Structure",
      "Hydrogen & s-Block Elements",
      "p-Block Elements (Group 13-14)",
      "p-Block Elements (Group 15-18)",
      "d- & f-Block Elements",
      "Coordination Compounds",
      "Metallurgy & Principles of Extraction",
      "IUPAC Nomenclature & GOC",
      "Isomerism in Organic Compounds",
      "Hydrocarbons (Alkanes, Alkenes, Alkynes)",
      "Aromatic Compounds (Benzene)",
      "Haloalkanes & Haloarenes",
      "Alcohols, Phenols & Ethers",
      "Aldehydes, Ketones & Carboxylic Acids",
      "Amines & Diazonium Salts",
      "Biomolecules",
      "Polymers",
      "Everyday Chemistry & Practical Chemistry"
    ],
    Maths: [
      "Sets, Relations & Functions",
      "Trigonometric Functions & Identities",
      "Inverse Trigonometric Functions (ITF)",
      "Complex Numbers",
      "Quadratic Equations",
      "Permutations & Combinations (P&C)",
      "Binomial Theorem",
      "Sequences & Series (AP, GP)",
      "Straight Lines & Pair of Lines",
      "Circles & System of Circles",
      "Conic Sections: Parabola",
      "Conic Sections: Ellipse & Hyperbola",
      "Limits, Continuity & Differentiability",
      "Methods of Differentiation (MOD)",
      "Application of Derivatives (AOD)",
      "Indefinite Integration",
      "Definite Integration",
      "Differential Equations (DE)",
      "Area Under Curves (AUC)",
      "Matrices & Determinants",
      "Vector Algebra",
      "Three Dimensional Geometry (3D)",
      "Probability",
      "Statistics",
      "Mathematical Reasoning"
    ]
  };

  // SVGs for clean macOS iconography
  const ICONS = {
    todo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    future: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>`,
    backlog: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    progress: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    chevron: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    trash: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    bolt: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  };

  // Inject Styles matching user's macOS mockup
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --sb-bg: rgba(15, 17, 28, 0.94);
      --sb-glass: rgba(255, 255, 255, 0.045);
      --sb-glass2: rgba(255, 255, 255, 0.08);
      --sb-line: rgba(255, 255, 255, 0.09);
      --sb-acc: #f59e0b;
      --sb-acc-glow: rgba(245, 158, 11, 0.28);
      --sb-teal: #2dd4bf;
      --sb-red: #f87171;
      --sb-text: #eef1f8;
      --sb-muted: #8b93a7;
      --sb-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    /* Fixed Floating Sidebar */
    .sb-root {
      position: fixed;
      top: 18px;
      bottom: 18px;
      left: 18px;
      z-index: 85;
      display: flex;
      pointer-events: none;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .sb-bar {
      pointer-events: auto;
      width: 252px;
      height: 100%;
      background: var(--sb-bg);
      border: 1px solid var(--sb-line);
      border-radius: 26px;
      backdrop-filter: blur(28px) saturate(1.4);
      -webkit-backdrop-filter: blur(28px) saturate(1.4);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 18px 14px;
      transition: width 0.4s var(--sb-ease), padding 0.4s var(--sb-ease);
      position: relative;
      box-sizing: border-box;
      user-select: none;
    }
    .sb-bar.collapsed {
      width: 66px;
      padding: 18px 8px;
    }

    /* Toggle Edge Pill Button */
    .sb-toggle-btn {
      position: absolute;
      right: -13px;
      top: 36px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #181d33;
      border: 1.5px solid var(--sb-line);
      color: var(--sb-text);
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      transition: transform 0.3s var(--sb-ease), background 0.2s;
      z-index: 10;
    }
    .sb-toggle-btn:hover { background: #262e4c; }
    .sb-bar.collapsed .sb-toggle-btn svg { transform: rotate(180deg); }

    /* macOS Traffic Dots */
    .sb-mac-dots {
      display: flex;
      gap: 6px;
      padding-left: 6px;
      margin-bottom: 14px;
    }
    .sb-dot { width: 9px; height: 9px; border-radius: 50%; }
    .sb-dot-red { background: #ff5f56; }
    .sb-dot-yellow { background: #ffbd2e; }
    .sb-dot-green { background: #27c93f; }
    .sb-bar.collapsed .sb-mac-dots { justify-content: center; padding-left: 0; }

    /* Profile Header */
    .sb-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 6px 14px;
      border-bottom: 1px solid var(--sb-line);
      margin-bottom: 14px;
      overflow: hidden;
    }
    .sb-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 14px;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
    }
    .sb-user-meta { display: flex; flex-direction: column; overflow: hidden; white-space: nowrap; }
    .sb-user-role { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: var(--sb-acc); text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700; }
    .sb-user-name { font-weight: 700; font-size: 13.5px; color: var(--sb-text); text-overflow: ellipsis; overflow: hidden; }
    .sb-bar.collapsed .sb-profile { padding: 4px 0 14px; justify-content: center; }
    .sb-bar.collapsed .sb-user-meta { display: none; }

    /* Nav Section Title */
    .sb-section-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      font-weight: 700;
      color: var(--sb-muted);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 0 8px 8px;
    }
    .sb-bar.collapsed .sb-section-title { display: none; }

    /* Nav Items */
    .sb-nav-list { display: flex; flex-direction: column; gap: 6px; position: relative; }
    .sb-nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 14px;
      color: var(--sb-muted);
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s var(--sb-ease);
      position: relative;
      background: transparent;
      border: 1px solid transparent;
      outline: none;
    }
    .sb-nav-item:hover {
      background: var(--sb-glass2);
      color: var(--sb-text);
      transform: translateX(2px);
    }
    .sb-nav-item.active {
      background: rgba(245, 158, 11, 0.14);
      color: #fff;
      border-color: rgba(245, 158, 11, 0.35);
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.15);
    }
    .sb-nav-item.active .sb-icon-wrap { color: var(--sb-acc); }

    .sb-icon-wrap {
      width: 22px;
      height: 22px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .sb-item-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sb-item-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 7px;
      border-radius: 10px;
      background: rgba(245, 158, 11, 0.18);
      color: var(--sb-acc);
    }
    .sb-item-badge.badge-red {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
    }
    .sb-bar.collapsed .sb-nav-item {
      padding: 10px 0;
      justify-content: center;
    }
    .sb-bar.collapsed .sb-item-text,
    .sb-bar.collapsed .sb-item-badge { display: none; }

    /* Collapsed Flyout Popover Card (matching user screenshot) */
    .sb-flyout {
      position: absolute;
      left: 64px;
      top: 50%;
      transform: translateY(-50%) translateX(6px);
      background: #141829;
      border: 1px solid var(--sb-line);
      border-radius: 14px;
      padding: 10px 14px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      transition: all 0.2s var(--sb-ease);
      z-index: 120;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .sb-flyout-title { font-size: 12.5px; font-weight: 700; color: #fff; }
    .sb-flyout-sub { font-size: 10.5px; font-family: 'JetBrains Mono', monospace; color: var(--sb-acc); }
    .sb-bar.collapsed .sb-nav-item:hover .sb-flyout {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(12px);
    }

    /* Bottom Card ("Let's start!") */
    .sb-bottom-card {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid var(--sb-line);
      border-radius: 18px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .sb-card-title { font-weight: 700; font-size: 14px; color: #fff; }
    .sb-card-desc { font-size: 11px; color: var(--sb-muted); line-height: 1.4; }
    .sb-add-btn {
      background: var(--sb-acc);
      color: #06080f;
      font-weight: 700;
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      padding: 9px 12px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
      transition: transform 0.15s, filter 0.2s;
    }
    .sb-add-btn:hover { filter: brightness(1.1); transform: scale(1.02); }
    .sb-add-btn:active { transform: scale(0.96); }

    /* Collapsed Circular Amber Plus Button */
    .sb-collapsed-add {
      display: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--sb-acc);
      color: #06080f;
      border: none;
      cursor: pointer;
      place-items: center;
      margin: 0 auto;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
      transition: transform 0.15s;
    }
    .sb-collapsed-add:hover { transform: scale(1.06); }
    .sb-collapsed-add:active { transform: scale(0.92); }
    .sb-bar.collapsed .sb-bottom-card { display: none; }
    .sb-bar.collapsed .sb-collapsed-add { display: grid; }

    /* Detail Pane Backdrop Overlay */
    .sb-pane-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(2, 4, 10, 0.5);
      backdrop-filter: blur(4px);
      z-index: 83;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s var(--sb-ease);
    }
    .sb-pane-backdrop.open {
      opacity: 1;
      pointer-events: auto;
    }

    /* Slide-out Detail Drawer for Active Tab */
    .sb-detail-pane {
      position: fixed;
      top: 18px;
      bottom: 18px;
      left: 282px;
      width: min(460px, calc(100vw - 110px));
      background: rgba(15, 19, 34, 0.98);
      border: 1px solid var(--sb-line);
      border-radius: 26px;
      backdrop-filter: blur(28px) saturate(1.4);
      -webkit-backdrop-filter: blur(28px) saturate(1.4);
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85);
      z-index: 84;
      display: flex;
      flex-direction: column;
      padding: 22px;
      box-sizing: border-box;
      transform: translateX(-16px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s var(--sb-ease);
    }
    .sb-bar.collapsed ~ .sb-detail-pane {
      left: 96px;
    }
    .sb-detail-pane.open {
      transform: translateX(0);
      opacity: 1;
      pointer-events: auto;
    }

    .sb-pane-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--sb-line);
    }
    .sb-pane-title-group { display: flex; align-items: center; gap: 10px; }
    .sb-pane-title { font-weight: 700; font-size: 17px; color: #fff; }
    .sb-pane-sub { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--sb-muted); }
    .sb-pane-close {
      width: 30px;
      height: 30px;
      border-radius: 9px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      color: var(--sb-muted);
      cursor: pointer;
      display: grid;
      place-items: center;
      font-size: 14px;
      transition: all 0.2s;
    }
    .sb-pane-close:hover { color: #fff; background: var(--sb-glass2); }

    .sb-pane-body { flex: 1; overflow-y: auto; padding-right: 4px; }
    .sb-pane-body::-webkit-scrollbar { width: 5px; }
    .sb-pane-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }

    /* Task Card Styles */
    .sb-task-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;
      border-radius: 14px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      margin-bottom: 8px;
      transition: all 0.2s;
    }
    .sb-task-item.done {
      background: rgba(45, 212, 191, 0.08);
      border-color: rgba(45, 212, 191, 0.25);
    }
    .sb-task-item.done .sb-task-text {
      text-decoration: line-through;
      color: var(--sb-muted);
    }
    .sb-task-check {
      width: 22px;
      height: 22px;
      border-radius: 7px;
      border: 2px solid rgba(255, 255, 255, 0.35);
      background: transparent;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: all 0.2s;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .sb-task-check:hover { border-color: var(--sb-teal); }
    .sb-task-item.done .sb-task-check {
      background: var(--sb-teal);
      border-color: var(--sb-teal);
      color: #06080f;
    }
    .sb-task-text { flex: 1; font-size: 13.5px; line-height: 1.4; word-break: break-word; color: #fff; }
    .sb-task-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
    .sb-task-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      padding: 2px 7px;
      border-radius: 6px;
      background: var(--sb-glass2);
      color: var(--sb-muted);
    }
    .sb-task-tag.tag-subj { color: #38bdf8; }
    .sb-task-tag.tag-chap { color: var(--sb-teal); }
    .sb-task-tag.tag-date { color: var(--sb-acc); }
    .sb-task-tag.tag-late { background: rgba(239, 68, 68, 0.16); color: #f87171; }

    .sb-task-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
    .sb-task-act {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      padding: 5px 8px;
      border-radius: 7px;
      background: var(--sb-glass2);
      border: 1px solid var(--sb-line);
      color: var(--sb-text);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s;
    }
    .sb-task-act:hover { background: rgba(255,255,255,0.14); }

    /* Progress & Chapter Matrix */
    .sb-progress-block {
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      border-radius: 14px;
      padding: 14px;
      margin-bottom: 12px;
    }
    .sb-prog-head { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; margin-bottom: 8px; }
    .sb-prog-bar {
      height: 8px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      overflow: hidden;
    }
    .sb-prog-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.6s var(--sb-ease);
    }

    /* Chapter Filter & Matrix */
    .sb-filter-bar {
      display: flex;
      gap: 5px;
      margin: 12px 0 10px;
    }
    .sb-filter-btn {
      flex: 1;
      padding: 7px 2px;
      border-radius: 9px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      color: var(--sb-muted);
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .sb-filter-btn.active {
      background: var(--sb-acc);
      color: #06080f;
      border-color: var(--sb-acc);
    }
    .sb-chap-search {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 14px;
      border-radius: 12px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      color: #fff;
      font-size: 12.5px;
      outline: none;
      transition: border-color 0.2s;
    }
    .sb-chap-search:focus { border-color: var(--sb-acc); }

    .sb-chapter-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 11px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      margin-bottom: 6px;
      font-size: 12.5px;
      transition: all 0.2s;
    }
    .sb-chapter-card.done {
      background: rgba(45, 212, 191, 0.08);
      border-color: rgba(45, 212, 191, 0.25);
    }
    .sb-chap-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
    .sb-chap-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #fff; font-weight: 500; }
    .sb-chap-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }

    /* Modal for Quick Add Task */
    .sb-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .sb-modal-backdrop.open { display: flex; }
    .sb-modal {
      background: #111526;
      border: 1px solid var(--sb-line);
      border-radius: 22px;
      padding: 24px;
      max-width: 440px;
      width: 90%;
      box-shadow: 0 25px 60px rgba(0,0,0,0.85);
      box-sizing: border-box;
    }
    .sb-chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 10px 0 14px;
    }
    .sb-chip {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      padding: 4px 9px;
      border-radius: 8px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      color: var(--sb-muted);
      cursor: pointer;
      transition: all 0.2s;
    }
    .sb-chip:hover { color: #fff; border-color: var(--sb-acc); }

    @media (max-width: 768px) {
      .sb-root { left: 10px; top: 10px; bottom: 10px; }
      .sb-detail-pane { left: 80px; width: calc(100vw - 90px); }
    }
  `;
  document.head.appendChild(style);

  // Storage Key & Initial Data
  const STORE_KEY = 'tests_sidebar_v3';
  function loadData() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE_KEY));
      if (d && Array.isArray(d.tasks)) return d;
    } catch (e) {}

    // Default seed with real JEE tasks
    const today = todayStr();
    const yest = shiftDate(-1);
    const tmrw = shiftDate(1);

    return {
      collapsed: false,
      tasks: [
        {
          id: 't_seed_1',
          text: 'Solve 25 Kinematics PYQs (2023-2025)',
          subject: 'Physics',
          chapter: 'Kinematics: 1D Motion',
          date: today,
          done: false
        },
        {
          id: 't_seed_2',
          text: 'Revise Chemical Bonding hybridisation & geometry',
          subject: 'Chemistry',
          chapter: 'Chemical Bonding & Molecular Structure',
          date: today,
          done: true
        },
        {
          id: 't_seed_3',
          text: 'Definite Integration King\'s property practice',
          subject: 'Maths',
          chapter: 'Definite Integration',
          date: tmrw,
          done: false
        },
        {
          id: 't_seed_4',
          text: 'Atomic Structure Bohr radius derivations',
          subject: 'Chemistry',
          chapter: 'Atomic Structure',
          date: yest,
          done: false
        }
      ],
      completedChapters: {
        "Kinematics: 1D Motion": true,
        "Units & Dimensions": true,
        "Laws of Motion & Friction": true,
        "Mole Concept & Stoichiometry": true,
        "Atomic Structure": true,
        "Sets, Relations & Functions": true,
        "Quadratic Equations": true
      }
    };
  }

  function saveData(d) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch (e) {}
  }

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function shiftDate(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  const state = loadData();

  // Build Floating Sidebar DOM
  const root = document.createElement('div');
  root.className = 'sb-root';

  root.innerHTML = `
    <!-- Main Left Sidebar -->
    <aside class="sb-bar ${state.collapsed ? 'collapsed' : ''}" id="sbBar">
      <button class="sb-toggle-btn" id="sbToggleBtn" aria-label="Toggle Sidebar">
        ${ICONS.chevron}
      </button>

      <div>
        <div class="sb-mac-dots">
          <div class="sb-dot sb-dot-red"></div>
          <div class="sb-dot sb-dot-yellow"></div>
          <div class="sb-dot sb-dot-green"></div>
        </div>

        <div class="sb-profile">
          <div class="sb-avatar">PS</div>
          <div class="sb-user-meta">
            <span class="sb-user-role">JEE Aspirant</span>
            <span class="sb-user-name">Pranay Surjuse</span>
          </div>
        </div>

        <div class="sb-section-title">Study Hub</div>

        <nav class="sb-nav-list">
          <!-- 1. To-do List -->
          <div class="sb-nav-item" data-tab="todo">
            <div class="sb-icon-wrap">${ICONS.todo}</div>
            <span class="sb-item-text">To-do List</span>
            <span class="sb-item-badge" id="sbTodoBadge">0</span>
            <div class="sb-flyout">
              <span class="sb-flyout-title">To-do List</span>
              <span class="sb-flyout-sub" id="sbTodoFlyoutSub">Today's checklist</span>
            </div>
          </div>

          <!-- 2. Future Tasks -->
          <div class="sb-nav-item" data-tab="future">
            <div class="sb-icon-wrap">${ICONS.future}</div>
            <span class="sb-item-text">Future Tasks</span>
            <span class="sb-item-badge" id="sbFutureBadge">0</span>
            <div class="sb-flyout">
              <span class="sb-flyout-title">Future Tasks</span>
              <span class="sb-flyout-sub" id="sbFutureFlyoutSub">Scheduled tasks</span>
            </div>
          </div>

          <!-- 3. Backlogs -->
          <div class="sb-nav-item" data-tab="backlog">
            <div class="sb-icon-wrap">${ICONS.backlog}</div>
            <span class="sb-item-text">Backlogs</span>
            <span class="sb-item-badge badge-red" id="sbBacklogBadge">0</span>
            <div class="sb-flyout">
              <span class="sb-flyout-title">Backlogs</span>
              <span class="sb-flyout-sub" id="sbBacklogFlyoutSub" style="color:var(--sb-red);">Overdue tasks</span>
            </div>
          </div>

          <!-- 4. Progress Bar -->
          <div class="sb-nav-item" data-tab="progress">
            <div class="sb-icon-wrap">${ICONS.progress}</div>
            <span class="sb-item-text">Progress Bar</span>
            <span class="sb-item-badge" id="sbProgressBadge">0%</span>
            <div class="sb-flyout">
              <span class="sb-flyout-title">Progress Bar</span>
              <span class="sb-flyout-sub" id="sbProgressFlyoutSub">83 JEE Chapters</span>
            </div>
          </div>
        </nav>
      </div>

      <div>
        <div class="sb-bottom-card">
          <span class="sb-card-title">Let's study!</span>
          <span class="sb-card-desc">Creating or adding new tasks couldn't be easier</span>
          <button class="sb-add-btn" id="sbOpenAddModal">
            ${ICONS.plus} Add New Task
          </button>
        </div>
        <button class="sb-collapsed-add" id="sbCollapsedAddBtn" title="Add Task">${ICONS.plus}</button>
      </div>
    </aside>

    <!-- Detail Pane Backdrop Overlay -->
    <div class="sb-pane-backdrop" id="sbPaneBackdrop"></div>

    <!-- Slide-out Detail Drawer for Active Tab -->
    <section class="sb-detail-pane" id="sbDetailPane">
      <div class="sb-pane-header">
        <div class="sb-pane-title-group">
          <span class="sb-pane-title" id="sbPaneHeading">To-do List</span>
          <span class="sb-pane-sub" id="sbPaneSub"></span>
        </div>
        <button class="sb-pane-close" id="sbPaneClose" aria-label="Close pane">&times;</button>
      </div>
      <div class="sb-pane-body" id="sbPaneContent"></div>
    </section>

    <!-- Quick Add Task Modal -->
    <div class="sb-modal-backdrop" id="sbAddModal">
      <div class="sb-modal">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <b style="color:#fff; font-size:16px;">Add New Study Task</b>
          <button class="sb-pane-close" id="sbCloseAddModal">&times;</button>
        </div>

        <input type="text" id="sbTaskInput" placeholder="e.g. Solve 30 PYQs / Formula Revision" maxlength="120" style="width:100%; box-sizing:border-box; padding:12px; border-radius:10px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:14px; outline:none; margin-bottom:10px;">

        <div class="sb-chip-row">
          <span class="sb-chip" onclick="window.sbQuickFillTask('Solve 30 PYQs (2023-2025)')">+ 30 PYQs</span>
          <span class="sb-chip" onclick="window.sbQuickFillTask('Formula Revision & Short Notes')">+ Formulas</span>
          <span class="sb-chip" onclick="window.sbQuickFillTask('NCERT Exemplar & In-text Questions')">+ NCERT</span>
          <span class="sb-chip" onclick="window.sbQuickFillTask('Attempt Chapter Mock Test')">+ Chapter Test</span>
        </div>

        <div style="display:flex; gap:8px; margin-bottom:12px;">
          <select id="sbSubjSelect" style="flex:1; padding:10px; border-radius:10px; background:#181d33; border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:12px; outline:none;">
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
            <option value="Other">General / Other</option>
          </select>
          <select id="sbScheduleSelect" style="flex:1; padding:10px; border-radius:10px; background:#181d33; border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:12px; outline:none;">
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="in2days">In 2 Days</option>
            <option value="weekend">This Weekend</option>
          </select>
        </div>

        <div style="margin-bottom:16px;">
          <label style="display:block; font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--sb-muted); margin-bottom:6px; letter-spacing:0.06em;">TAG JEE CHAPTER (OPTIONAL):</label>
          <select id="sbChapterSelect" style="width:100%; padding:10px; border-radius:10px; background:#181d33; border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:12px; outline:none;">
          </select>
        </div>

        <button class="sb-add-btn" id="sbSaveTaskBtn" style="width:100%; padding:12px;">
          Add to Study Hub &rarr;
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  // Element handles
  const bar = document.getElementById('sbBar');
  const toggleBtn = document.getElementById('sbToggleBtn');
  const detailPane = document.getElementById('sbDetailPane');
  const paneBackdrop = document.getElementById('sbPaneBackdrop');
  const paneClose = document.getElementById('sbPaneClose');
  const paneHeading = document.getElementById('sbPaneHeading');
  const paneSub = document.getElementById('sbPaneSub');
  const paneContent = document.getElementById('sbPaneContent');

  const addModal = document.getElementById('sbAddModal');
  const openAddModal = document.getElementById('sbOpenAddModal');
  const collapsedAddBtn = document.getElementById('sbCollapsedAddBtn');
  const closeAddModal = document.getElementById('sbCloseAddModal');
  const taskInput = document.getElementById('sbTaskInput');
  const subjSelect = document.getElementById('sbSubjSelect');
  const chapterSelect = document.getElementById('sbChapterSelect');
  const scheduleSelect = document.getElementById('sbScheduleSelect');
  const saveTaskBtn = document.getElementById('sbSaveTaskBtn');

  let currentTab = null;
  let activeChapterFilter = 'All';
  let chapterSearchQuery = '';

  // Dynamic Chapter Dropdown population in Add Task Modal
  function populateChapterDropdown(subj, preselected = '') {
    chapterSelect.innerHTML = '<option value="">-- No Specific Chapter --</option>';
    const chaps = JEE_CHAPTERS[subj] || [];
    chaps.forEach(ch => {
      const opt = document.createElement('option');
      opt.value = ch;
      opt.textContent = ch;
      if (ch === preselected) opt.selected = true;
      chapterSelect.appendChild(opt);
    });
  }
  populateChapterDropdown('Physics');
  subjSelect.onchange = (e) => populateChapterDropdown(e.target.value);

  // Toggle Collapse State
  toggleBtn.onclick = () => {
    state.collapsed = !state.collapsed;
    bar.classList.toggle('collapsed', state.collapsed);
    saveData(state);
  };

  // Nav Click
  document.querySelectorAll('.sb-nav-item').forEach(item => {
    item.onclick = () => {
      const tab = item.dataset.tab;
      if (currentTab === tab && detailPane.classList.contains('open')) {
        closeDetailPane();
      } else {
        openTab(tab);
      }
    };
  });

  paneClose.onclick = closeDetailPane;
  paneBackdrop.onclick = closeDetailPane;

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (addModal.classList.contains('open')) closeModal();
      else if (detailPane.classList.contains('open')) closeDetailPane();
    }
  });

  function closeDetailPane() {
    detailPane.classList.remove('open');
    paneBackdrop.classList.remove('open');
    document.querySelectorAll('.sb-nav-item').forEach(i => i.classList.remove('active'));
    currentTab = null;
  }

  function openTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.sb-nav-item').forEach(i => i.classList.toggle('active', i.dataset.tab === tab));
    detailPane.classList.add('open');
    paneBackdrop.classList.add('open');
    renderPaneContent(tab);
  }

  // Chapter Progress Calculation
  function getChapterProgress() {
    const totalP = JEE_CHAPTERS.Physics.length;
    const totalC = JEE_CHAPTERS.Chemistry.length;
    const totalM = JEE_CHAPTERS.Maths.length;
    const totalAll = totalP + totalC + totalM;

    let doneP = 0, doneC = 0, doneM = 0;
    JEE_CHAPTERS.Physics.forEach(ch => { if (state.completedChapters[ch]) doneP++; });
    JEE_CHAPTERS.Chemistry.forEach(ch => { if (state.completedChapters[ch]) doneC++; });
    JEE_CHAPTERS.Maths.forEach(ch => { if (state.completedChapters[ch]) doneM++; });
    const doneAll = doneP + doneC + doneM;

    return {
      Physics: { done: doneP, total: totalP, pct: Math.round((doneP / totalP) * 100) },
      Chemistry: { done: doneC, total: totalC, pct: Math.round((doneC / totalC) * 100) },
      Maths: { done: doneM, total: totalM, pct: Math.round((doneM / totalM) * 100) },
      Overall: { done: doneAll, total: totalAll, pct: Math.round((doneAll / totalAll) * 100) }
    };
  }

  function renderCounts() {
    const today = todayStr();
    const todayTasks = state.tasks.filter(t => t.date === today);
    const pendingToday = todayTasks.filter(t => !t.done).length;
    const futureTasks = state.tasks.filter(t => t.date > today).length;
    const backlogTasks = state.tasks.filter(t => t.date < today && !t.done).length;
    const prog = getChapterProgress();

    document.getElementById('sbTodoBadge').textContent = pendingToday;
    document.getElementById('sbFutureBadge').textContent = futureTasks;
    document.getElementById('sbBacklogBadge').textContent = backlogTasks;
    document.getElementById('sbProgressBadge').textContent = `${prog.Overall.pct}%`;

    // Flyout subtexts
    document.getElementById('sbTodoFlyoutSub').textContent = `${pendingToday} pending tasks`;
    document.getElementById('sbFutureFlyoutSub').textContent = `${futureTasks} upcoming`;
    document.getElementById('sbBacklogFlyoutSub').textContent = `${backlogTasks} overdue`;
    document.getElementById('sbProgressFlyoutSub').textContent = `${prog.Overall.done}/${prog.Overall.total} (${prog.Overall.pct}%)`;
  }

  function renderPaneContent(tab) {
    const today = todayStr();

    if (tab === 'todo') {
      paneHeading.textContent = 'To-do List';
      paneSub.textContent = `Today: ${new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}`;
      const list = state.tasks.filter(t => t.date === today);

      if (!list.length) {
        paneContent.innerHTML = `
          <div style="text-align:center; padding:45px 10px; color:var(--sb-muted); font-size:13px;">
            <div style="font-size:32px; margin-bottom:10px;">📋</div>
            <p style="color:#fff; font-weight:600; margin:0 0 4px;">No tasks planned for today</p>
            <p style="font-size:11.5px; margin:0 0 16px;">Add questions, chapter revision, or mock test goals!</p>
            <button class="sb-add-btn" onclick="document.getElementById('sbOpenAddModal').click()" style="margin:0 auto;">${ICONS.plus} Add Today's First Task</button>
          </div>
        `;
      } else {
        const doneCount = list.filter(t => t.done).length;
        const pct = Math.round((doneCount / list.length) * 100);
        let html = `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--sb-glass); padding:10px 14px; border-radius:12px; border:1px solid var(--sb-line); margin-bottom:14px; font-size:13px;">
            <span>Completed: <b>${doneCount} / ${list.length}</b></span>
            <span style="font-family:'JetBrains Mono',monospace; color:var(--sb-teal); font-weight:700;">${pct}%</span>
          </div>
          <div class="sb-prog-bar" style="margin-bottom:16px;">
            <div class="sb-prog-fill" style="width:${pct}%; background:var(--sb-teal);"></div>
          </div>
        `;
        list.forEach(t => {
          html += `
            <div class="sb-task-item ${t.done ? 'done' : ''}">
              <button class="sb-task-check" onclick="window.sbToggleTask('${t.id}')">${t.done ? ICONS.check : ''}</button>
              <div class="sb-task-text">
                ${t.text}
                <div class="sb-task-tags">
                  <span class="sb-task-tag tag-subj">${t.subject}</span>
                  ${t.chapter ? `<span class="sb-task-tag tag-chap">${t.chapter}</span>` : ''}
                </div>
              </div>
              <div class="sb-task-actions">
                <button class="sb-task-act" onclick="window.sbDeleteTask('${t.id}')" title="Delete">${ICONS.trash}</button>
              </div>
            </div>
          `;
        });
        paneContent.innerHTML = html;
      }
    } else if (tab === 'future') {
      paneHeading.textContent = 'Future Tasks';
      paneSub.textContent = 'Scheduled & Upcoming';
      const list = state.tasks.filter(t => t.date > today);

      if (!list.length) {
        paneContent.innerHTML = `
          <div style="text-align:center; padding:45px 10px; color:var(--sb-muted); font-size:13px;">
            <div style="font-size:32px; margin-bottom:10px;">🗓️</div>
            <p style="color:#fff; font-weight:600; margin:0 0 4px;">No upcoming tasks scheduled</p>
            <p style="font-size:11.5px; margin:0 0 16px;">Schedule chapters and revision for tomorrow or the weekend!</p>
            <button class="sb-add-btn" onclick="document.getElementById('sbOpenAddModal').click()" style="margin:0 auto;">${ICONS.plus} Schedule Future Task</button>
          </div>
        `;
      } else {
        let html = '';
        list.forEach(t => {
          html += `
            <div class="sb-task-item">
              <div class="sb-task-text">
                ${t.text}
                <div class="sb-task-tags">
                  <span class="sb-task-tag tag-subj">${t.subject}</span>
                  ${t.chapter ? `<span class="sb-task-tag tag-chap">${t.chapter}</span>` : ''}
                  <span class="sb-task-tag tag-date">${t.date}</span>
                </div>
              </div>
              <div class="sb-task-actions">
                <button class="sb-task-act" onclick="window.sbMoveToToday('${t.id}')" title="Move to Today">${ICONS.bolt} Today</button>
                <button class="sb-task-act" onclick="window.sbDeleteTask('${t.id}')" title="Delete">${ICONS.trash}</button>
              </div>
            </div>
          `;
        });
        paneContent.innerHTML = html;
      }
    } else if (tab === 'backlog') {
      paneHeading.textContent = 'Backlogs';
      paneSub.textContent = 'Overdue Incomplete Tasks';
      const list = state.tasks.filter(t => t.date < today && !t.done);

      if (!list.length) {
        paneContent.innerHTML = `
          <div style="text-align:center; padding:45px 10px; color:var(--sb-muted); font-size:13px;">
            <div style="font-size:32px; margin-bottom:10px;">✨</div>
            <p style="color:#fff; font-weight:600; margin:0 0 4px;">Backlog is 100% clean!</p>
            <p style="font-size:11.5px;">No overdue tasks. Keep up the high momentum! 🚀</p>
          </div>
        `;
      } else {
        let html = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:12px; color:var(--sb-muted);">${list.length} tasks delayed:</span>
            <button class="sb-task-act" onclick="window.sbMoveAllBacklogsToToday()" style="background:rgba(245,158,11,0.18); color:var(--sb-acc);">${ICONS.bolt} Move All to Today</button>
          </div>
        `;
        list.forEach(t => {
          html += `
            <div class="sb-task-item" style="border-color:rgba(239,68,68,0.25);">
              <div class="sb-task-text">
                ${t.text}
                <div class="sb-task-tags">
                  <span class="sb-task-tag tag-subj">${t.subject}</span>
                  ${t.chapter ? `<span class="sb-task-tag tag-chap">${t.chapter}</span>` : ''}
                  <span class="sb-task-tag tag-late">Due ${t.date}</span>
                </div>
              </div>
              <div class="sb-task-actions">
                <button class="sb-task-act" onclick="window.sbMoveToToday('${t.id}')" title="Move to Today">${ICONS.bolt} Today</button>
                <button class="sb-task-act" onclick="window.sbToggleTask('${t.id}')" title="Mark Done">${ICONS.check}</button>
                <button class="sb-task-act" onclick="window.sbDeleteTask('${t.id}')" title="Delete">${ICONS.trash}</button>
              </div>
            </div>
          `;
        });
        paneContent.innerHTML = html;
      }
    } else if (tab === 'progress') {
      paneHeading.textContent = 'Progress Bar';
      paneSub.textContent = '83 JEE Chapters Matrix';
      renderProgressTabContent();
    }

    renderCounts();
  }

  function renderProgressTabContent() {
    const prog = getChapterProgress();

    paneContent.innerHTML = `
      <!-- Overall Progress -->
      <div class="sb-progress-block">
        <div class="sb-prog-head">
          <span>Overall JEE Syllabus</span>
          <span style="color:var(--sb-acc);">${prog.Overall.done} / ${prog.Overall.total} (${prog.Overall.pct}%)</span>
        </div>
        <div class="sb-prog-bar">
          <div class="sb-prog-fill" style="width:${prog.Overall.pct}%; background:linear-gradient(90deg, #6366f1, #f59e0b);"></div>
        </div>
      </div>

      <!-- Subject 3-Grid -->
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:14px;">
        <div class="sb-progress-block" style="padding:10px; margin-bottom:0;">
          <div style="font-size:11px; color:#34d399; font-weight:700;">Physics</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:15px; font-weight:700; margin:4px 0;">${prog.Physics.pct}%</div>
          <div style="font-size:10px; color:var(--sb-muted);">${prog.Physics.done}/${prog.Physics.total}</div>
        </div>
        <div class="sb-progress-block" style="padding:10px; margin-bottom:0;">
          <div style="font-size:11px; color:#38bdf8; font-weight:700;">Chemistry</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:15px; font-weight:700; margin:4px 0;">${prog.Chemistry.pct}%</div>
          <div style="font-size:10px; color:var(--sb-muted);">${prog.Chemistry.done}/${prog.Chemistry.total}</div>
        </div>
        <div class="sb-progress-block" style="padding:10px; margin-bottom:0;">
          <div style="font-size:11px; color:#f59e0b; font-weight:700;">Maths</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:15px; font-weight:700; margin:4px 0;">${prog.Maths.pct}%</div>
          <div style="font-size:10px; color:var(--sb-muted);">${prog.Maths.done}/${prog.Maths.total}</div>
        </div>
      </div>

      <!-- Master JEE Chapters Search & Matrix -->
      <div style="margin-top:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <b style="font-size:13.5px; color:#fff;">Complete JEE Chapters</b>
          <span style="font-size:11px; color:var(--sb-muted);" id="sbChapterCountLabel"></span>
        </div>

        <input type="text" class="sb-chap-search" id="sbSearchInput" placeholder="Search any chapter (e.g. Thermodynamics, Matrices, Optics)..." value="${chapterSearchQuery}">

        <div class="sb-filter-bar">
          <button class="sb-filter-btn ${activeChapterFilter === 'All' ? 'active' : ''}" onclick="window.sbSetFilter('All')">All (83)</button>
          <button class="sb-filter-btn ${activeChapterFilter === 'Physics' ? 'active' : ''}" onclick="window.sbSetFilter('Physics')">Physics (28)</button>
          <button class="sb-filter-btn ${activeChapterFilter === 'Chemistry' ? 'active' : ''}" onclick="window.sbSetFilter('Chemistry')">Chem (30)</button>
          <button class="sb-filter-btn ${activeChapterFilter === 'Maths' ? 'active' : ''}" onclick="window.sbSetFilter('Maths')">Maths (25)</button>
        </div>

        <div id="sbChapterContainer" style="max-height:310px; overflow-y:auto; padding-right:2px;"></div>
      </div>
    `;

    renderChapterListOnly();

    // Instant search input listener without full DOM rerender
    const searchInp = document.getElementById('sbSearchInput');
    if (searchInp) {
      searchInp.oninput = (e) => {
        chapterSearchQuery = e.target.value;
        renderChapterListOnly();
      };
    }
  }

  function renderChapterListOnly() {
    let list = [];
    if (activeChapterFilter === 'All') {
      list = [
        ...JEE_CHAPTERS.Physics.map(c => ({ title: c, subj: 'Physics' })),
        ...JEE_CHAPTERS.Chemistry.map(c => ({ title: c, subj: 'Chemistry' })),
        ...JEE_CHAPTERS.Maths.map(c => ({ title: c, subj: 'Maths' }))
      ];
    } else {
      list = (JEE_CHAPTERS[activeChapterFilter] || []).map(c => ({ title: c, subj: activeChapterFilter }));
    }

    if (chapterSearchQuery) {
      const q = chapterSearchQuery.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.subj.toLowerCase().includes(q));
    }

    const countLabel = document.getElementById('sbChapterCountLabel');
    if (countLabel) countLabel.textContent = `${list.length} chapters`;

    const container = document.getElementById('sbChapterContainer');
    if (!container) return;

    if (!list.length) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--sb-muted); font-size:12.5px;">
          No matching JEE chapters found for "${chapterSearchQuery}".
        </div>
      `;
      return;
    }

    let html = '';
    list.forEach(c => {
      const isDone = !!state.completedChapters[c.title];
      html += `
        <div class="sb-chapter-card ${isDone ? 'done' : ''}">
          <div class="sb-chap-left">
            <button class="sb-task-check" onclick="window.sbToggleChapter('${c.title.replace(/'/g, "\\'")}')">${isDone ? ICONS.check : ''}</button>
            <span class="sb-chap-title">${c.title}</span>
          </div>
          <div class="sb-chap-right">
            <span class="sb-task-tag tag-subj" style="${isDone ? 'color:var(--sb-teal);' : ''}">${c.subj}</span>
            <button class="sb-task-act" onclick="window.sbPlanTaskForChapter('${c.title.replace(/'/g, "\\'")}', '${c.subj}')" title="Add task for this chapter">${ICONS.plus} Plan</button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // Window methods for global onclick actions
  window.sbToggleChapter = function(chName) {
    state.completedChapters[chName] = !state.completedChapters[chName];
    saveData(state);
    renderProgressTabContent();
    renderCounts();
  };

  window.sbSetFilter = function(filter) {
    activeChapterFilter = filter;
    document.querySelectorAll('.sb-filter-btn').forEach(b => {
      b.classList.toggle('active', b.textContent.startsWith(filter === 'All' ? 'All' : filter.slice(0, 4)));
    });
    renderChapterListOnly();
  };

  window.sbPlanTaskForChapter = function(chapName, subjName) {
    subjSelect.value = subjName;
    populateChapterDropdown(subjName, chapName);
    taskInput.value = `Practice questions: ${chapName}`;
    openModal();
  };

  window.sbToggleTask = function(id) {
    const t = state.tasks.find(x => x.id === id);
    if (t) {
      t.done = !t.done;
      saveData(state);
      renderPaneContent(currentTab);
      renderCounts();
    }
  };

  window.sbDeleteTask = function(id) {
    state.tasks = state.tasks.filter(x => x.id !== id);
    saveData(state);
    renderPaneContent(currentTab);
    renderCounts();
  };

  window.sbMoveToToday = function(id) {
    const t = state.tasks.find(x => x.id === id);
    if (t) {
      t.date = todayStr();
      saveData(state);
      renderPaneContent(currentTab);
      renderCounts();
    }
  };

  window.sbMoveAllBacklogsToToday = function() {
    const today = todayStr();
    state.tasks.forEach(t => {
      if (t.date < today && !t.done) t.date = today;
    });
    saveData(state);
    renderPaneContent('backlog');
    renderCounts();
  };

  window.sbQuickFillTask = function(title) {
    taskInput.value = title;
  };

  // Add Task Modal Controls
  function openModal() {
    addModal.classList.add('open');
    if (!taskInput.value) taskInput.value = '';
    taskInput.focus();
  }
  function closeModal() {
    addModal.classList.remove('open');
  }

  openAddModal.onclick = openModal;
  collapsedAddBtn.onclick = openModal;
  closeAddModal.onclick = closeModal;
  addModal.onclick = (e) => { if (e.target === addModal) closeModal(); };

  saveTaskBtn.onclick = function() {
    const text = taskInput.value.trim();
    if (!text) return;

    const subj = subjSelect.value;
    const chap = chapterSelect.value;
    const sched = scheduleSelect.value;
    const today = new Date();
    let targetDate = todayStr();

    if (sched === 'tomorrow') {
      today.setDate(today.getDate() + 1);
      targetDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    } else if (sched === 'in2days') {
      today.setDate(today.getDate() + 2);
      targetDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    } else if (sched === 'weekend') {
      const day = today.getDay();
      const diff = (6 - day + 7) % 7 || 7;
      today.setDate(today.getDate() + diff);
      targetDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    state.tasks.push({
      id: 't_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: text,
      subject: subj,
      chapter: chap,
      date: targetDate,
      done: false
    });

    saveData(state);
    closeModal();
    renderCounts();
    if (currentTab) renderPaneContent(currentTab);
  };

  renderCounts();
})();
