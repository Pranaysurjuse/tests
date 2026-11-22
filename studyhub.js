/* ==========================================================================
   AKIVA JEE Study Hub & Track System
   Exact 1:1 Implementation of the 14 Mobile App Reference Screens:
   - 📋 Today's Progress: Speedo Dial (% meter), Planned & Completed Cards,
                          Task items with [L][P][R] mode pills, level badges,
                          24hr countdown timers, and Edit Task modal.
   - ➕ Add Topics: Subject tabs (All, Chem, Maths, Phys), Live chapter search
                    with branch hierarchy (e.g. Physics >> Mechanics),
                    Topic selector, Mode (Lecture/Practice/Revision), and Add button.
   - ⏳ Backlog Recovery: Missed self-study auto-detection, 7-day range tracking,
                          Move to Today & Move to Future rescue actions.
   - 🗓️ Future Tasks: 7-Day horizontal day calendar strip, scheduled task manager.
   - 📈 Progress Bar: Dual Circular Gauges (JEE Mains & JEE Advanced) with
                      orbiting Chem, Phys, Maths nodes + Complete 83 JEE Chapter Matrix.
   - 🦊 Fox Mascot: Custom vector illustration for authentic empty states.
   - 🎨 macOS Sidebar: Collapsible floating rail on left with hover flyouts.
   ========================================================================== */

(function() {
  if (document.querySelector('.akiva-hub-root')) return;

  // Master 83 JEE Chapters with Subject and Branch Classifications
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

  // Mascot SVG: Fox holding cardboard box (matching user's screenshots)
  const FOX_SVG = `
    <svg width="130" height="130" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Tail -->
      <path d="M125 105 C145 95 155 70 145 55 C135 68 120 78 105 82 Z" fill="#e07a2c"/>
      <path d="M145 55 C140 60 135 65 130 68 C135 62 142 57 145 55 Z" fill="#ffffff"/>
      <!-- Legs -->
      <ellipse cx="65" cy="138" rx="8" ry="4" fill="#c06018"/>
      <ellipse cx="95" cy="138" rx="8" ry="4" fill="#c06018"/>
      <!-- Body -->
      <path d="M60 90 Q80 82 100 90 L95 136 Q80 140 65 136 Z" fill="#e07a2c"/>
      <path d="M72 95 Q80 92 88 95 L84 134 Q80 136 76 134 Z" fill="#fef3e7"/>
      <!-- Head & Ears -->
      <path d="M52 45 L40 18 Q55 24 64 36 Z" fill="#e07a2c"/>
      <path d="M46 32 L42 22 Q50 26 54 31 Z" fill="#4a2612"/>
      <path d="M108 45 L120 18 Q105 24 96 36 Z" fill="#e07a2c"/>
      <path d="M114 32 L118 22 Q110 26 106 31 Z" fill="#4a2612"/>
      <ellipse cx="80" cy="52" rx="28" ry="22" fill="#e07a2c"/>
      <!-- Cheeks & Snout -->
      <path d="M56 54 Q80 75 104 54 Q92 72 80 74 Q68 72 56 54 Z" fill="#ffffff"/>
      <!-- Nose & Eyes -->
      <path d="M77 62 Q80 60 83 62 L80 66 Z" fill="#2d1c10"/>
      <ellipse cx="68" cy="48" rx="3.5" ry="4.5" fill="#2d1c10"/>
      <circle cx="69" cy="46.5" r="1.2" fill="#ffffff"/>
      <ellipse cx="92" cy="48" rx="3.5" ry="4.5" fill="#2d1c10"/>
      <circle cx="93" cy="46.5" r="1.2" fill="#ffffff"/>
      <!-- Cardboard Box held by paws -->
      <path d="M42 84 L118 84 L110 114 L50 114 Z" fill="#c4935a"/>
      <path d="M42 84 L50 114 L46 114 L38 84 Z" fill="#aa7b44"/>
      <path d="M42 84 L118 84 L112 88 L48 88 Z" fill="#8c6233"/>
      <!-- Paws -->
      <circle cx="48" cy="92" r="6" fill="#e07a2c"/>
      <circle cx="112" cy="92" r="6" fill="#e07a2c"/>
    </svg>
  `;

  // Inject Styles: Pixel-perfect recreation of Akiva Track screens
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --ak-bg: #090b12;
      --ak-card: #131726;
      --ak-card-inner: #1a1e32;
      --ak-border: rgba(255, 255, 255, 0.08);
      --ak-orange: #e07a2c;
      --ak-orange-glow: rgba(224, 122, 44, 0.35);
      --ak-orange-light: #f59e0b;
      --ak-green: #34d399;
      --ak-green-bg: rgba(52, 211, 153, 0.12);
      --ak-blue: #38bdf8;
      --ak-blue-bg: #152238;
      --ak-red: #ef4444;
      --ak-text: #f1f5f9;
      --ak-muted: #8b95a5;
      --ak-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    /* Fixed Left macOS Sidebar Launcher */
    .akiva-mac-sidebar {
      position: fixed;
      left: 16px;
      top: 16px;
      bottom: 16px;
      width: 350px;
      background: rgba(14, 17, 28, 0.96);
      backdrop-filter: blur(28px) saturate(1.5);
      -webkit-backdrop-filter: blur(28px) saturate(1.5);
      border: 1px solid var(--ak-border);
      border-radius: 24px;
      z-index: 70;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      box-shadow: 0 20px 50px rgba(0,0,0,0.75);
      transition: width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.35s ease, padding 0.35s ease;
      font-family: var(--ak-font);
      user-select: none;
      overflow: hidden;
    }
    .akiva-mac-sidebar.collapsed {
      width: 62px;
      padding: 16px 8px;
    }
    .akiva-mac-sidebar:not(.collapsed) {
      padding: 16px 14px;
      overflow-y: auto;
    }

    /* Collapsed vs Expanded View Switching */
    .akiva-mac-sidebar.collapsed .akiva-expanded-content { display: none !important; }
    .akiva-mac-sidebar:not(.collapsed) .akiva-collapsed-rail { display: none !important; }

    .akiva-collapsed-rail {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      width: 100%;
      height: 100%;
      justify-content: space-between;
    }

    .akiva-expanded-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    /* Quick 4-Item Nav Chips */
    .akiva-quick-nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .akiva-nav-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 12px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--ak-border);
      color: #e2e8f0;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .akiva-nav-chip:hover {
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.2);
      transform: translateY(-1px);
    }
    .akiva-nav-chip.active {
      border-color: var(--ak-orange);
      background: rgba(224, 122, 44, 0.15);
      color: #fff;
    }

    /* Sidebar Edge Toggle Chevron */
    .akiva-edge-toggle {
      position: absolute;
      right: -12px;
      top: 32px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #1e2438;
      border: 1.5px solid var(--ak-border);
      color: #fff;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-size: 11px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      z-index: 10;
      transition: transform 0.25s;
    }
    .akiva-mac-sidebar.collapsed .akiva-edge-toggle {
      transform: rotate(180deg);
    }

    /* Top Mac Dots */
    .akiva-mac-dots {
      display: flex;
      gap: 6px;
      padding: 2px 6px 12px;
    }
    .akiva-mac-dot { width: 9px; height: 9px; border-radius: 50%; }
    .akiva-dot-red { background: #ff5f56; }
    .akiva-dot-yellow { background: #ffbd2e; }
    .akiva-dot-green { background: #27c93f; }
    .akiva-mac-sidebar.collapsed .akiva-mac-dots { justify-content: center; padding-left: 0; }

    /* Profile Header */
    .akiva-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 6px 14px;
      border-bottom: 1px solid var(--ak-border);
      margin-bottom: 12px;
      overflow: hidden;
    }
    .akiva-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e07a2c, #ea580c);
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 13px;
      flex-shrink: 0;
      box-shadow: 0 4px 12px var(--ak-orange-glow);
    }
    .akiva-user-name { font-weight: 700; font-size: 13px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .akiva-user-sub { font-size: 10px; color: var(--ak-orange); text-transform: uppercase; font-family: monospace; font-weight: 700; }
    .akiva-mac-sidebar.collapsed .akiva-profile { justify-content: center; padding: 4px 0 14px; }
    .akiva-mac-sidebar.collapsed .akiva-user-meta { display: none; }

    /* Sidebar Navigation Items */
    .akiva-nav-list { display: flex; flex-direction: column; gap: 5px; }
    .akiva-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 12px;
      color: var(--ak-muted);
      cursor: pointer;
      font-size: 12.5px;
      font-weight: 600;
      transition: all 0.2s;
      position: relative;
    }
    .akiva-nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
    }
    .akiva-nav-item.active {
      background: rgba(224, 122, 44, 0.16);
      color: #fff;
      border: 1px solid rgba(224, 122, 44, 0.35);
    }
    .akiva-nav-item.active .akiva-icon { color: var(--ak-orange); }
    .akiva-badge {
      margin-left: auto;
      font-size: 10px;
      font-family: monospace;
      padding: 1px 6px;
      border-radius: 8px;
      background: rgba(224, 122, 44, 0.2);
      color: var(--ak-orange);
      font-weight: 700;
    }
    .akiva-mac-sidebar.collapsed .akiva-nav-item {
      justify-content: center;
      padding: 10px 0;
    }
    .akiva-mac-sidebar.collapsed .akiva-item-label,
    .akiva-mac-sidebar.collapsed .akiva-badge { display: none; }

    /* Collapsed Hover Flyout */
    .akiva-flyout {
      position: absolute;
      left: 56px;
      top: 50%;
      transform: translateY(-50%) translateX(6px);
      background: #161928;
      border: 1px solid var(--ak-border);
      border-radius: 10px;
      padding: 7px 12px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.7);
      transition: all 0.2s;
      z-index: 100;
      font-size: 12px;
      color: #fff;
      font-weight: 600;
    }
    .akiva-mac-sidebar.collapsed .akiva-nav-item:hover .akiva-flyout {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(10px);
    }

    /* Bottom Card on Sidebar */
    .akiva-bottom-card {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid var(--ak-border);
      border-radius: 16px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .akiva-card-h { font-size: 13px; font-weight: 700; color: #fff; }
    .akiva-card-p { font-size: 10.5px; color: var(--ak-muted); line-height: 1.35; }
    .akiva-pill-btn {
      background: var(--ak-orange);
      color: #0c0d14;
      border: none;
      border-radius: 12px;
      padding: 9px;
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-shadow: 0 4px 14px var(--ak-orange-glow);
      transition: transform 0.15s, filter 0.2s;
    }
    .akiva-pill-btn:hover { filter: brightness(1.1); transform: scale(1.02); }
    .akiva-mac-sidebar.collapsed .akiva-bottom-card { display: none; }
    .akiva-collapsed-fab {
      display: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--ak-orange);
      color: #0c0d14;
      border: none;
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
      place-items: center;
      margin: 0 auto;
      box-shadow: 0 4px 12px var(--ak-orange-glow);
    }
    .akiva-mac-sidebar.collapsed .akiva-collapsed-fab { display: grid; }

    /* ==============================================================
       AKIVA SLIDE-OUT APP DRAWER (1:1 with the 14 Mobile Screenshots)
       ============================================================== */
    .akiva-drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 90;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .akiva-drawer-backdrop.open {
      opacity: 1;
      pointer-events: auto;
    }

    .akiva-app-panel {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      width: min(440px, 100vw);
      background: #0c0d15;
      border-left: 1px solid var(--ak-border);
      z-index: 95;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
      font-family: var(--ak-font);
      color: var(--ak-text);
      box-shadow: -15px 0 60px rgba(0, 0, 0, 0.85);
      overflow: hidden;
    }
    .akiva-app-panel.open {
      transform: translateX(0);
    }

    /* Screen Top Nav Bar */
    .ak-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px;
      border-bottom: 1px solid var(--ak-border);
      flex-shrink: 0;
    }
    .ak-topbar-left { display: flex; align-items: center; gap: 12px; }
    .ak-back-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
    }
    .ak-topbar-title { font-weight: 700; font-size: 17px; color: #fff; }
    .ak-close-btn {
      background: none;
      border: none;
      color: var(--ak-muted);
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
    }
    .ak-close-btn:hover { color: #fff; }

    /* Scrollable Screen Content Container */
    .ak-screen-body {
      flex: 1;
      overflow-y: auto;
      padding: 18px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }
    .ak-screen-body::-webkit-scrollbar { width: 5px; }
    .ak-screen-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }

    /* Screen 1: Today's Progress Card */
    .ak-progress-card {
      background: linear-gradient(135deg, rgba(20, 24, 38, 0.85), rgba(12, 14, 24, 0.95));
      border: 1px solid var(--ak-border);
      border-radius: 20px;
      padding: 16px;
      margin-bottom: 16px;
      position: relative;
      overflow: hidden;
    }
    .ak-progress-card::before {
      content: '';
      position: absolute;
      top: -30px;
      right: -30px;
      width: 120px;
      height: 120px;
      background: radial-gradient(circle, var(--ak-orange-glow), transparent 70%);
      pointer-events: none;
    }
    .ak-prog-h { font-size: 18px; font-weight: 800; color: #fff; margin: 0 0 4px; }
    .ak-prog-sub { font-size: 12px; color: var(--ak-muted); margin: 0 0 14px; }
    .ak-prog-sub span { color: var(--ak-orange); font-weight: 700; }

    .ak-dial-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .ak-speedo-wrap {
      width: 86px;
      height: 86px;
      position: relative;
      flex-shrink: 0;
      display: grid;
      place-items: center;
    }
    .ak-speedo-val {
      position: absolute;
      font-size: 16px;
      font-weight: 800;
      font-family: monospace;
      color: #fff;
    }
    .ak-stat-boxes {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ak-stat-box {
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ak-stat-blue { background: var(--ak-blue-bg); border: 1px solid rgba(56, 189, 248, 0.2); }
    .ak-stat-green { background: var(--ak-green-bg); border: 1px solid rgba(52, 211, 153, 0.2); }
    .ak-stat-num { font-size: 16px; font-weight: 800; font-family: monospace; color: #fff; }
    .ak-stat-lbl { font-size: 11px; font-weight: 600; color: var(--ak-text); }

    /* Top Action Buttons (Backlog & Future Tasks) */
    .ak-action-pills {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 16px;
    }
    .ak-act-btn {
      padding: 12px;
      border-radius: 14px;
      font-weight: 700;
      font-size: 13px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .ak-btn-orange {
      background: var(--ak-orange);
      color: #0c0d14;
      box-shadow: 0 4px 14px var(--ak-orange-glow);
    }
    .ak-btn-gray {
      background: #1c2136;
      border: 1px solid var(--ak-border);
      color: #fff;
    }

    /* Sub Tabs (Today's Task / Completed Task) */
    .ak-subtab-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }
    .ak-subtab {
      padding: 8px 14px;
      border-radius: 12px;
      background: transparent;
      border: 1px solid var(--ak-border);
      color: var(--ak-muted);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .ak-subtab.active {
      border-color: var(--ak-orange);
      color: #fff;
      background: rgba(224, 122, 44, 0.1);
    }
    .ak-filter-icon-btn {
      margin-left: auto;
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: #171b2e;
      border: 1px solid var(--ak-border);
      color: var(--ak-muted);
      display: grid;
      place-items: center;
      cursor: pointer;
    }

    /* Subject Quick Filter Bar */
    .ak-subj-filter-row {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .ak-subj-pill {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--ak-muted);
      cursor: pointer;
      padding: 2px 0;
      white-space: nowrap;
      position: relative;
    }
    .ak-subj-pill.active {
      color: #fff;
    }
    .ak-subj-pill.active::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--ak-orange);
      border-radius: 2px;
    }

    /* Task Card (1:1 with Screenshot 12) */
    .ak-task-card {
      background: #101524;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 14px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: all 0.2s;
    }
    .ak-task-card.subj-Physics {
      border-color: rgba(56, 189, 248, 0.45);
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, #101524 100%);
      box-shadow: 0 4px 18px rgba(56, 189, 248, 0.08);
    }
    .ak-task-card.subj-Physics .ak-task-sub { color: #38bdf8; font-weight: 600; }
    .ak-task-card.subj-Physics .ak-level-badge {
      background: rgba(56, 189, 248, 0.14);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }

    .ak-task-card.subj-Chemistry {
      border-color: rgba(52, 211, 153, 0.45);
      background: linear-gradient(135deg, rgba(52, 211, 153, 0.08) 0%, #101524 100%);
      box-shadow: 0 4px 18px rgba(52, 211, 153, 0.08);
    }
    .ak-task-card.subj-Chemistry .ak-task-sub { color: #34d399; font-weight: 600; }
    .ak-task-card.subj-Chemistry .ak-level-badge {
      background: rgba(52, 211, 153, 0.14);
      color: #34d399;
      border: 1px solid rgba(52, 211, 153, 0.3);
    }

    .ak-task-card.subj-Mathematics {
      border-color: rgba(192, 132, 252, 0.45);
      background: linear-gradient(135deg, rgba(192, 132, 252, 0.08) 0%, #101524 100%);
      box-shadow: 0 4px 18px rgba(192, 132, 252, 0.08);
    }
    .ak-task-card.subj-Mathematics .ak-task-sub { color: #c084fc; font-weight: 600; }
    .ak-task-card.subj-Mathematics .ak-level-badge {
      background: rgba(192, 132, 252, 0.14);
      color: #c084fc;
      border: 1px solid rgba(192, 132, 252, 0.3);
    }
    .ak-task-card.is-done {
      border-color: rgba(255, 255, 255, 0.1);
      opacity: 0.65;
    }
    .ak-task-top {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .ak-task-circle {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.35);
      background: transparent;
      cursor: pointer;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .ak-task-card.is-done .ak-task-circle {
      background: var(--ak-green);
      border-color: var(--ak-green);
      color: #0c0d14;
    }
    .ak-task-info { flex: 1; min-width: 0; }
    .ak-task-title { font-size: 14.5px; font-weight: 700; color: #fff; margin: 0 0 2px; word-break: break-word; }
    .ak-task-card.is-done .ak-task-title { text-decoration: line-through; }
    .ak-task-sub { font-size: 11px; color: var(--ak-muted); font-family: monospace; }
    .ak-task-dots {
      background: none;
      border: none;
      color: var(--ak-muted);
      cursor: pointer;
      font-size: 18px;
      padding: 0 4px;
    }

    /* Card Bottom Row: Mode [L][P][R], Level badge, Timer */
    .ak-task-bot {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding-top: 6px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 11px;
    }
    .ak-mode-group {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ak-mode-tag {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #1e2438;
      border: 1px solid var(--ak-border);
      color: var(--ak-muted);
      font-size: 10px;
      font-weight: 800;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .ak-mode-tag.active {
      background: var(--ak-orange);
      color: #0c0d14;
      border-color: var(--ak-orange);
    }
    .ak-level-badge {
      padding: 3px 8px;
      border-radius: 8px;
      background: #252019;
      border: 1px solid rgba(224, 122, 44, 0.3);
      color: var(--ak-orange-light);
      font-weight: 700;
      font-size: 10.5px;
    }
    .ak-timer-tag {
      margin-left: auto;
      color: var(--ak-orange-light);
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Empty State Container */
    .ak-empty-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 24px 10px;
    }
    .ak-empty-h { font-size: 16px; font-weight: 800; color: #fff; margin: 12px 0 6px; }
    .ak-empty-p { font-size: 12px; color: var(--ak-muted); line-height: 1.5; max-width: 320px; margin: 0 0 20px; }

    /* Floating Action Button (FAB) */
    .ak-fab {
      position: absolute;
      right: 20px;
      bottom: 24px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--ak-orange);
      color: #0c0d14;
      border: none;
      font-size: 24px;
      font-weight: 700;
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: 0 6px 20px var(--ak-orange-glow);
      z-index: 10;
      transition: transform 0.2s;
    }
    .ak-fab:hover { transform: scale(1.08); }

    /* Screen 2: Add Topics Screen (1:1 with Screenshot 2, 4, 5, 7) */
    .ak-field-label {
      font-size: 12.5px;
      font-weight: 700;
      color: #fff;
      margin: 14px 0 8px;
      display: block;
    }
    .ak-search-box {
      width: 100%;
      box-sizing: border-box;
      padding: 12px 14px;
      border-radius: 12px;
      background: #141829;
      border: 1px solid var(--ak-border);
      color: #fff;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }
    .ak-search-box:focus { border-color: var(--ak-orange); }

    /* Live Auto-Suggest List */
    .ak-suggest-list {
      background: #141829;
      border: 1px solid var(--ak-border);
      border-radius: 12px;
      margin-top: 6px;
      max-height: 190px;
      overflow-y: auto;
    }
    .ak-suggest-item {
      padding: 10px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      cursor: pointer;
      transition: background 0.15s;
    }
    .ak-suggest-item:hover { background: rgba(224, 122, 44, 0.12); }
    .ak-suggest-title { font-size: 13px; font-weight: 600; color: #fff; }
    .ak-suggest-path { font-size: 10.5px; color: var(--ak-orange); margin-top: 2px; }

    /* Screen 3: Future Tasks Strip (1:1 with Screenshot 8, 11) */
    .ak-day-strip {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .ak-day-card {
      min-width: 52px;
      padding: 10px 4px;
      border-radius: 14px;
      background: #15192b;
      border: 1px solid var(--ak-border);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
    .ak-day-card.active {
      border-color: var(--ak-orange);
      background: rgba(224, 122, 44, 0.12);
    }
    .ak-day-num { font-size: 15px; font-weight: 800; font-family: monospace; color: #fff; }
    .ak-day-txt { font-size: 10px; font-weight: 700; color: var(--ak-muted); text-transform: uppercase; }

    /* Screen 4: Progress Bar Visualizer (Dual Circular Gauges, 1:1 with Screenshot 9) */
    .ak-prog-section {
      background: #121626;
      border: 1px solid var(--ak-border);
      border-radius: 20px;
      padding: 18px 16px;
      margin-bottom: 14px;
    }
    .ak-sec-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .ak-sec-title { font-weight: 700; font-size: 14px; color: #fff; }
    .ak-sec-link { font-size: 11.5px; color: var(--ak-orange); cursor: pointer; font-weight: 600; }
    .ak-orbit-wrap {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 8px 0;
    }
    .ak-node-stack { display: flex; flex-direction: column; gap: 8px; }
    .ak-node-item { display: flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 600; color: #e2e8f0; }
    .ak-node-icon { width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; background: rgba(255,255,255,0.06); }

    /* Screen 5: Edit Task Modal Overlay */
    .ak-edit-modal-wrap {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(8px);
      z-index: 110;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .ak-edit-modal-wrap.open { display: flex; }
    .ak-edit-modal {
      background: #111424;
      border: 1px solid var(--ak-border);
      border-radius: 22px;
      padding: 20px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.9);
      box-sizing: border-box;
    }

    /* Toast Notification */
    .ak-toast {
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #0f3d2a;
      border: 1px solid rgba(52, 211, 153, 0.4);
      color: #fff;
      font-size: 12.5px;
      font-weight: 600;
      padding: 12px 16px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.7);
      transform: translateY(80px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      z-index: 105;
      pointer-events: none;
    }
    .ak-toast.show {
      transform: translateY(0);
      opacity: 1;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .akiva-mac-sidebar {
        display: none !important;
      }
      .akiva-app-panel {
        width: 100vw;
        border-left: none;
      }
    }
  `;
  document.head.appendChild(style);

  // Storage and State Management
  const STORE_KEY = 'akiva_jee_tracker_v6';
  function loadState() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE_KEY));
      if (d && Array.isArray(d.tasks)) {
        if (typeof d.collapsedSidebar === 'undefined') d.collapsedSidebar = false;
        if (!Array.isArray(d.chatMessages)) d.chatMessages = [];
        return d;
      }
    } catch (e) {}

    const today = todayStr();
    return {
      collapsedSidebar: false,
      quizIndex: 0,
      tasks: [
        {
          id: 'task_kinematics',
          title: 'Kinematics: 1D & 2D Motion',
          subject: 'Physics',
          branch: 'Mechanics',
          mode: 'L',
          level: 'JEE Mains + Advanced',
          date: today,
          hoursLeft: 23,
          done: false
        },
        {
          id: 'task_chem_bonding',
          title: 'Chemical Bonding & Molecular Structure',
          subject: 'Chemistry',
          branch: 'Inorganic Chemistry',
          mode: 'P',
          level: 'JEE Mains + Advanced',
          date: today,
          hoursLeft: 23,
          done: false
        },
        {
          id: 'task_matrices',
          title: 'Matrices & Determinants',
          subject: 'Mathematics',
          branch: 'Algebra',
          mode: 'R',
          level: 'JEE Mains + Advanced',
          date: today,
          hoursLeft: 23,
          done: false
        }
      ],
      completedChapters: {
        'Units & Dimensions': true,
        'Mole Concept & Stoichiometry': true,
        'Sets, Relations & Functions': true
      }
    };
  }

  function saveState(s) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {}
  }

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function shiftDateStr(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  const state = loadState();

  // Root Container
  const root = document.createElement('div');
  root.className = 'akiva-hub-root';

  // 1. Desktop macOS Sidebar Launcher
  root.innerHTML = `
    <aside class="akiva-mac-sidebar ${state.collapsedSidebar ? 'collapsed' : ''}" id="akivaSidebar">
      <button class="akiva-edge-toggle" id="akivaEdgeToggle" title="Toggle Sidebar">‹</button>

      <!-- 1. Collapsed Rail View (62px) -->
      <div class="akiva-collapsed-rail">
        <div style="display:flex; flex-direction:column; align-items:center; gap:10px; width:100%;">
          <div class="akiva-mac-dots" style="justify-content:center; padding:2px 0 8px;">
            <div class="akiva-mac-dot akiva-dot-red"></div>
            <div class="akiva-mac-dot akiva-dot-yellow"></div>
            <div class="akiva-mac-dot akiva-dot-green"></div>
          </div>

          <div class="akiva-profile" style="justify-content:center; padding:0 0 10px; border-bottom:1px solid var(--ak-border);">
            <div class="akiva-avatar" title="Pranay Surjuse">PS</div>
          </div>

          <nav class="akiva-nav-list" style="width:100%;">
            <!-- 1. JEE Study Tracker Mini Gauge Widget -->
            <div class="akiva-nav-item" data-view="today" title="JEE Study Tracker">
              <div style="position:relative; width:28px; height:28px; display:grid; place-items:center;">
                <svg style="width:100%; height:100%;" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" stroke="rgba(255,255,255,0.12)" stroke-width="3.5" fill="none"/>
                  <circle id="mini-circle-arc" cx="18" cy="18" r="14" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" fill="none"
                          stroke-dasharray="87.96" stroke-dashoffset="87.96" style="transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 0.4s;"/>
                </svg>
                <span style="position:absolute; font-size:11px;">🔥</span>
              </div>
              <div class="akiva-flyout">🔥 JEE Study Tracker &bull; Target (<span id="mini-ratio-text">0/3 Done</span>)</div>
            </div>

            <!-- 2. Today's Tasks -->
            <div class="akiva-nav-item" data-view="today" title="Today's Tasks">
              <span class="akiva-icon">📋</span>
              <div class="akiva-flyout">Today's Tasks</div>
            </div>

            <!-- 3. Test Radar & Calendar -->
            <div class="akiva-nav-item" data-view="calendar" title="Test Radar & Calendar">
              <span class="akiva-icon">🎯</span>
              <div class="akiva-flyout">🗓️ Test Radar & Calendar</div>
            </div>

            <!-- 4. Future Tasks -->
            <div class="akiva-nav-item" data-view="future" title="Future Tasks">
              <span class="akiva-icon">🗓️</span>
              <div class="akiva-flyout">Future Tasks</div>
            </div>

            <!-- 4. Backlogs -->
            <div class="akiva-nav-item" data-view="backlog" title="Backlogs">
              <span class="akiva-icon">⏳</span>
              <div class="akiva-flyout">Backlogs</div>
            </div>

            <!-- 5. Progress Bar / Matrix -->
            <div class="akiva-nav-item" data-view="progress" title="Progress Bar">
              <span class="akiva-icon">📈</span>
              <div class="akiva-flyout">83 JEE Chapters Matrix</div>
            </div>

            <!-- 6. Coaching Revision Widget -->
            <div class="akiva-nav-item" onclick="toggleSyllabusModal()" title="Coaching Lecture Revision">
              <span class="akiva-icon">📚</span>
              <div class="akiva-flyout">📚 Coaching Revision (+ Update)</div>
            </div>
          </nav>
        </div>

        <button class="akiva-collapsed-fab" id="akCollapsedFab" title="Add Task">+</button>
      </div>

      <!-- 2. Expanded Full JEE Study Tracker Sidebar Component (350px) -->
      <div class="akiva-expanded-content">
        <!-- Top Window Header -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.06);">
          <div class="akiva-mac-dots" style="padding:0;">
            <div class="akiva-mac-dot akiva-dot-red"></div>
            <div class="akiva-mac-dot akiva-dot-yellow"></div>
            <div class="akiva-mac-dot akiva-dot-green"></div>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:10px; font-family:monospace; color:var(--ak-muted); font-weight:700;">PRANAY SURJUSE</span>
            <div style="width:22px; height:22px; border-radius:50%; background:linear-gradient(135deg, #e07a2c, #ea580c); font-size:10px; font-weight:800; color:#fff; display:grid; place-items:center;">PS</div>
          </div>
        </div>

        <!-- Header with Streak -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:2px 4px 0;">
          <div>
            <div style="font-size:10px; color:#a1a1aa; font-weight:600; letter-spacing:0.05em; text-transform:uppercase;" id="streakDeskTxt">Evening Desk &bull; 6:30 PM</div>
            <div style="font-size:14px; font-weight:700; color:#fff; letter-spacing:-0.02em;">JEE Study Tracker</div>
          </div>
          <div style="display:flex; align-items:center; gap:6px; padding:3px 10px; border-radius:999px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); color:#fcd34d; font-size:12px; font-weight:600;">
            <span>🔥</span>
            <span style="font-family:monospace; font-weight:700;" id="streak-num">14</span>
            <span style="font-size:9px; text-transform:uppercase; font-weight:700;">Days</span>
          </div>
        </div>

        <!-- Circular Gauge Target Card -->
        <div style="display:flex; align-items:center; gap:14px; padding:12px; border-radius:16px; background:rgba(19,22,32,0.85); border:1px solid rgba(255,255,255,0.08); cursor:pointer; transition:border-color 0.2s;" onclick="window.akOpenScreen('today')" title="Click to open Today's Progress">
          <div style="position:relative; width:56px; height:56px; flex-shrink:0; display:grid; place-items:center;">
            <svg style="width:100%; height:100%;" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" stroke="rgba(255, 255, 255, 0.08)" stroke-width="4.5" fill="none" />
              <circle id="circle-arc" cx="32" cy="32" r="26" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round" fill="none"
                      stroke-dasharray="163.36" stroke-dashoffset="163.36" style="transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 0.4s;" />
            </svg>
            <span id="circle-percent" style="position:absolute; font-family:monospace; font-size:12px; font-weight:700; color:#fff;">0%</span>
          </div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; align-items:baseline; justify-content:space-between;">
              <span style="font-size:12px; font-weight:600; color:#fff;">Today's Target</span>
              <span id="ratio-text" style="font-size:11px; font-family:monospace; color:#fbbf24; font-weight:700;">0 / 3 Done</span>
            </div>
            <p id="sub-guidance" style="font-size:10px; color:#a1a1aa; margin:2px 0 0;">3 tasks left before 11:30 PM</p>
            <div style="font-size:9.5px; font-family:monospace; color:#fbbf24; margin-top:4px;">● Active &bull; Target: 99%ile</div>
          </div>
        </div>

        <!-- Quick 4 Navigation Pills -->
        <div class="akiva-quick-nav">
          <div class="akiva-nav-chip" data-view="today">
            <span style="display:flex; align-items:center; gap:6px;"><span>📋</span> Today</span>
            <span class="akiva-badge" id="akBadgeToday">0</span>
          </div>
          <div class="akiva-nav-chip" data-view="future">
            <span style="display:flex; align-items:center; gap:6px;"><span>🗓️</span> Future</span>
            <span class="akiva-badge" id="akBadgeFuture">0</span>
          </div>
          <div class="akiva-nav-chip" data-view="backlog">
            <span style="display:flex; align-items:center; gap:6px;"><span>⏳</span> Backlog</span>
            <span class="akiva-badge" id="akBadgeBacklog" style="background:rgba(239,68,68,0.2); color:#f87171;">0</span>
          </div>
          <div class="akiva-nav-chip" data-view="progress">
            <span style="display:flex; align-items:center; gap:6px;"><span>📈</span> Matrix</span>
            <span class="akiva-badge" id="akBadgeProgress">0%</span>
          </div>
        </div>

        <!-- Coaching Revision List -->
        <div style="padding-top:6px; border-top:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex; align-items:center; justify-content:space-between; padding:0 2px 6px;">
            <div style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="window.toggleCoachingCollapse()" title="Minimize / Expand Coaching Revision">
              <span style="font-size:10px; text-transform:uppercase; font-weight:700; letter-spacing:0.06em; color:#a1a1aa;">Coaching Lecture Revision</span>
              <span id="coachingCollapseIcon" style="font-size:11px; color:#a1a1aa; font-weight:bold;">▾</span>
            </div>
            <button onclick="toggleSyllabusModal()" style="font-size:10.5px; color:#fbbf24; font-weight:700; cursor:pointer; background:none; border:none; padding:0;">+ Update</button>
          </div>
          <div style="display:flex; flex-direction:column; gap:5px;" id="lecture-container">
            <!-- Chapters render here -->
          </div>
          <div id="lecture-collapsed-summary" style="display:none; font-size:10.5px; color:var(--ak-muted); padding:5px 8px; background:rgba(255,255,255,0.03); border-radius:8px; cursor:pointer;" onclick="window.toggleCoachingCollapse()">
            3 Lectures Tracked &bull; Click to expand
          </div>
        </div>

        <!-- Add Topic Button -->
        <button class="ak-act-btn ak-btn-orange" id="akOpenAddBtn" style="width:100%; padding:10px; font-size:12px; margin-top:4px;">
          <span>+</span> Add New Topic / Task
        </button>
      </div>
    </aside>

    <!-- 2. Akiva Drawer Backdrop -->
    <div class="akiva-drawer-backdrop" id="akivaBackdrop"></div>

    <!-- 3. Akiva 1:1 App Screen Drawer Panel -->
    <section class="akiva-app-panel" id="akivaAppPanel">
      <div class="ak-topbar">
        <div class="ak-topbar-left">
          <button class="ak-back-btn" id="akBackBtn" title="Back" style="display:none;">‹</button>
          <span class="ak-topbar-title" id="akTopTitle">Today's Progress</span>
        </div>
        <button class="ak-close-btn" id="akCloseBtn" aria-label="Close">&times;</button>
      </div>

      <div class="ak-screen-body" id="akScreenContent"></div>

      <!-- Toast Notification -->
      <div class="ak-toast" id="akToast">
        <span>✓</span>
        <span id="akToastMsg">Topics saved for today. [v2]</span>
      </div>
    </section>

    <!-- 4. Edit Task Modal (1:1 with Screenshot 13) -->
    <div class="ak-edit-modal-wrap" id="akEditModal">
      <div class="ak-edit-modal">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <b style="font-size:16px; color:#fff;">Edit Task</b>
          <button class="ak-close-btn" id="akCloseEditModal">&times;</button>
        </div>

        <div style="background:#171c2e; border:1px solid rgba(52,211,153,0.3); border-radius:14px; padding:14px; margin-bottom:16px;">
          <h4 id="akEditTaskTitle" style="margin:0 0 4px; color:#fff; font-size:15px;">Kinematics</h4>
          <div id="akEditTaskPath" style="font-size:11px; color:var(--ak-muted); font-family:monospace; margin-bottom:12px;">Kinematics >> Physics</div>

          <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
            <span style="font-size:12px; color:var(--ak-muted);">Mode:</span>
            <button class="ak-mode-tag" id="akEditModeL" onclick="window.akSetEditMode('L')">L</button>
            <button class="ak-mode-tag" id="akEditModeP" onclick="window.akSetEditMode('P')">P</button>
            <button class="ak-mode-tag" id="akEditModeR" onclick="window.akSetEditMode('R')">R</button>
          </div>

          <select id="akEditLevelSelect" style="width:100%; padding:9px; border-radius:10px; background:#1e2438; border:1px solid var(--ak-border); color:#fff; font-size:12px; outline:none;">
            <option value="JEE Mains">JEE Mains</option>
            <option value="JEE Advanced">JEE Advanced</option>
            <option value="JEE Mains + Advanced">JEE Mains + Advanced</option>
          </select>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
          <button class="ak-act-btn ak-btn-orange" id="akBtnMoveToBacklog">Move To Backlog</button>
          <button class="ak-act-btn ak-btn-gray" id="akBtnMoveToFuture">Move To Future</button>
        </div>

        <button class="ak-act-btn" id="akBtnDeleteTask" style="width:100%; background:rgba(239,68,68,0.18); color:#f87171; border:1px solid rgba(239,68,68,0.3);">
          Delete Task
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  // References
  const sidebar = document.getElementById('akivaSidebar');
  const edgeToggle = document.getElementById('akivaEdgeToggle');
  const panel = document.getElementById('akivaAppPanel');
  const backdrop = document.getElementById('akivaBackdrop');
  const closeBtn = document.getElementById('akCloseBtn');
  const backBtn = document.getElementById('akBackBtn');
  const topTitle = document.getElementById('akTopTitle');
  const screenContent = document.getElementById('akScreenContent');
  const toast = document.getElementById('akToast');
  const toastMsg = document.getElementById('akToastMsg');

  // Edit Modal references
  const editModal = document.getElementById('akEditModal');
  const closeEditModal = document.getElementById('akCloseEditModal');
  const editTaskTitle = document.getElementById('akEditTaskTitle');
  const editTaskPath = document.getElementById('akEditTaskPath');
  const editLevelSelect = document.getElementById('akEditLevelSelect');
  const btnMoveToBacklog = document.getElementById('akBtnMoveToBacklog');
  const btnMoveToFuture = document.getElementById('akBtnMoveToFuture');
  const btnDeleteTask = document.getElementById('akBtnDeleteTask');

  let currentView = 'today';
  let viewHistory = [];
  let selectedTaskForEdit = null;
  let activeSubjFilter = 'All';
  let addTopicSubject = 'All';
  let addTopicQuery = '';
  let addTopicSelectedChapter = null;
  let addTopicMode = 'L';
  let selectedFutureDay = shiftDateStr(1);

  // Toggle Sidebar collapse
  edgeToggle.textContent = state.collapsedSidebar ? '›' : '‹';
  edgeToggle.onclick = () => {
    state.collapsedSidebar = !state.collapsedSidebar;
    sidebar.classList.toggle('collapsed', state.collapsedSidebar);
    edgeToggle.textContent = state.collapsedSidebar ? '›' : '‹';
    saveState(state);
  };

  // Nav Item & Nav Chip click
  document.querySelectorAll('.akiva-nav-item, .akiva-nav-chip').forEach(item => {
    item.onclick = () => {
      openView(item.dataset.view);
    };
  });

  const openAddBtn = document.getElementById('akOpenAddBtn');
  if (openAddBtn) openAddBtn.onclick = () => openView('add_today');
  const collapsedFab = document.getElementById('akCollapsedFab');
  if (collapsedFab) collapsedFab.onclick = () => openView('add_today');

  closeBtn.onclick = closePanel;
  backdrop.onclick = closePanel;

  backBtn.onclick = () => {
    if (viewHistory.length > 0) {
      const prev = viewHistory.pop();
      renderScreen(prev, false);
    } else {
      openView('today');
    }
  };

  function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function openView(v) {
    panel.classList.add('open');
    backdrop.classList.add('open');
    renderScreen(v, true);
  }

  function closePanel() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
  }

  function renderScreen(v, pushHistory = true) {
    if (pushHistory && currentView && currentView !== v) {
      viewHistory.push(currentView);
    }
    currentView = v;

    // Back button visibility
    backBtn.style.display = (v === 'today') ? 'none' : 'grid';

    // Highlight active nav item
    document.querySelectorAll('.akiva-nav-item, .akiva-nav-chip').forEach(i => {
      i.classList.toggle('active', i.dataset.view === v);
    });

    if (v === 'today') renderTodayScreen();
    else if (v === 'add_today') renderAddTopicScreen('today');
    else if (v === 'add_backlog') renderAddTopicScreen('backlog');
    else if (v === 'add_future') renderAddTopicScreen('future');
    else if (v === 'backlog') renderBacklogScreen();
    else if (v === 'future') renderFutureScreen();
    else if (v === 'progress') renderProgressScreen();
    else if (v === 'calendar') renderCalendarScreen();

    updateBadges();
    updateTargetCard();
  }

  // Calculate Progress Stats
  function getStats() {
    const today = todayStr();
    const todayTasks = state.tasks.filter(t => t.date === today);
    const planned = todayTasks.length;
    const completed = todayTasks.filter(t => t.done).length;
    const pct = planned > 0 ? Math.round((completed / planned) * 100) : 0;

    const futureCount = state.tasks.filter(t => t.date > today).length;
    const backlogCount = state.tasks.filter(t => t.date < today && !t.done).length;

    // Chapters count
    const totalChapters = JEE_CHAPTERS.length; // 83
    let doneChapters = 0;
    JEE_CHAPTERS.forEach(c => { if (state.completedChapters[c.title]) doneChapters++; });
    const overallPct = Math.round((doneChapters / totalChapters) * 100);

    return { planned, completed, pct, futureCount, backlogCount, doneChapters, totalChapters, overallPct };
  }

  function updateBadges() {
    const s = getStats();
    document.querySelectorAll('#akBadgeToday').forEach(el => el.textContent = s.planned - s.completed);
    document.querySelectorAll('#akBadgeFuture').forEach(el => el.textContent = s.futureCount);
    document.querySelectorAll('#akBadgeBacklog').forEach(el => el.textContent = s.backlogCount);
    document.querySelectorAll('#akBadgeProgress').forEach(el => el.textContent = `${s.overallPct}%`);
  }

  /* ==========================================================
     SCREEN 1: TODAY'S PROGRESS (1:1 with Screenshots 1 & 12)
     ========================================================== */
  function renderTodayScreen() {
    topTitle.textContent = "Today's Progress";
    const s = getStats();
    const today = todayStr();
    const tasks = state.tasks.filter(t => t.date === today);
    const filteredTasks = activeSubjFilter === 'All' ? tasks : tasks.filter(t => t.subject === activeSubjFilter);

    let contentHtml = `
      <!-- Top Card: Speedo dial & metrics (Screenshot 12) -->
      <div class="ak-progress-card">
        <h2 class="ak-prog-h">Today's Progress</h2>
        <div class="ak-prog-sub">You're <span>${s.planned - s.completed} tasks</span> away from finishing</div>

        <div class="ak-dial-row">
          <!-- Circular Speedo Dial -->
          <div class="ak-speedo-wrap">
            <svg width="86" height="86" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.08)" stroke-width="8" fill="none" stroke-dasharray="180 60" transform="rotate(135 50 50)"/>
              <circle cx="50" cy="50" r="38" stroke="var(--ak-orange)" stroke-width="8" fill="none" stroke-linecap="round"
                stroke-dasharray="${(s.pct * 1.8)} 240" transform="rotate(135 50 50)"/>
            </svg>
            <span class="ak-speedo-val">${s.pct}%</span>
          </div>

          <div class="ak-stat-boxes">
            <div class="ak-stat-box ak-stat-blue">
              <span class="ak-stat-num">${s.planned}</span>
              <span class="ak-stat-lbl">Planned Tasks</span>
            </div>
            <div class="ak-stat-box ak-stat-green">
              <span class="ak-stat-num">${s.completed}</span>
              <span class="ak-stat-lbl">Completed Tasks</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons Row -->
      <div class="ak-action-pills">
        <button class="ak-act-btn ak-btn-orange" onclick="window.akOpenScreen('backlog')">
          <span>⏳</span> Backlog
        </button>
        <button class="ak-act-btn ak-btn-gray" onclick="window.akOpenScreen('future')">
          <span>🗓️</span> Future Tasks
        </button>
      </div>

      <!-- Sub Tabs -->
      <div class="ak-subtab-strip">
        <button class="ak-subtab active">Today's Task</button>
        <button class="ak-subtab" onclick="window.akShowCompletedOnly()">Completed Task</button>
        <button class="ak-filter-icon-btn" title="Filter">&#9881;</button>
      </div>

      <!-- Subject Filters -->
      <div class="ak-subj-filter-row">
        <span class="ak-subj-pill ${activeSubjFilter === 'All' ? 'active' : ''}" onclick="window.akSetSubjFilter('All')">All (${tasks.length})</span>
        <span class="ak-subj-pill ${activeSubjFilter === 'Physics' ? 'active' : ''}" onclick="window.akSetSubjFilter('Physics')">Physics (${tasks.filter(t => t.subject === 'Physics').length})</span>
        <span class="ak-subj-pill ${activeSubjFilter === 'Chemistry' ? 'active' : ''}" onclick="window.akSetSubjFilter('Chemistry')">Chemistry (${tasks.filter(t => t.subject === 'Chemistry').length})</span>
        <span class="ak-subj-pill ${activeSubjFilter === 'Mathematics' ? 'active' : ''}" onclick="window.akSetSubjFilter('Mathematics')">Maths (${tasks.filter(t => t.subject === 'Mathematics').length})</span>
      </div>
    `;

    if (!filteredTasks.length) {
      // Empty state with Fox illustration (Screenshot 1)
      contentHtml += `
        <div class="ak-empty-wrap">
          ${FOX_SVG}
          <div class="ak-empty-h">No task for today</div>
          <div class="ak-empty-p">You can plan your JEE study by creating a to do list for the chapters/Topics you are going to study today. Completing them will add those chapters to progress bar. Each tasks will be given a span of 24 hours post which it will become a backlog</div>
          <button class="ak-pill-btn" onclick="window.akOpenScreen('add_today')" style="padding:12px 24px; font-size:13px;">
            Add Topics For Today &rarr;
          </button>
        </div>
      `;
    } else {
      contentHtml += `<div style="display:flex; flex-direction:column; gap:6px;">`;
      filteredTasks.forEach(t => {
        contentHtml += `
          <div class="ak-task-card subj-${t.subject} ${t.done ? 'is-done' : ''}">
            <div class="ak-task-top">
              <button class="ak-task-circle" onclick="window.akToggleTaskDone('${t.id}')">
                ${t.done ? '&#10003;' : ''}
              </button>
              <div class="ak-task-info">
                <h4 class="ak-task-title">${t.title}</h4>
                <div class="ak-task-sub">${t.title} &gt;&gt; ${t.subject}</div>
              </div>
              <button class="ak-task-dots" onclick="window.akOpenEditModal('${t.id}')">&hellip;</button>
            </div>

            <div class="ak-task-bot">
              <span style="color:var(--ak-muted);">Mode</span>
              <div class="ak-mode-group">
                <button class="ak-mode-tag ${t.mode === 'L' ? 'active' : ''}" onclick="window.akQuickSetMode('${t.id}', 'L')">L</button>
                <button class="ak-mode-tag ${t.mode === 'P' ? 'active' : ''}" onclick="window.akQuickSetMode('${t.id}', 'P')">P</button>
                <button class="ak-mode-tag ${t.mode === 'R' ? 'active' : ''}" onclick="window.akQuickSetMode('${t.id}', 'R')">R</button>
              </div>

              <span class="ak-level-badge">${t.level} &or;</span>
              <span class="ak-timer-tag">&#9201; ${t.hoursLeft || 23} hrs</span>
            </div>
          </div>
        `;
      });
      contentHtml += `</div>`;
    }

    // Floating + Button
    contentHtml += `
      <button class="ak-fab" onclick="window.akOpenScreen('add_today')" title="Add Topic">+</button>
    `;

    screenContent.innerHTML = contentHtml;
  }

  /* ==========================================================
     SCREEN 2: ADD TOPICS SCREEN (1:1 with Screenshots 2, 4, 5, 7)
     ========================================================== */
  function renderAddTopicScreen(targetScreen = 'today') {
    let titleStr = "Add Topics For Today";
    if (targetScreen === 'backlog') titleStr = "Add Topics To Backlog";
    else if (targetScreen === 'future') titleStr = "Add Topics To Future";
    topTitle.textContent = titleStr;

    // Filter matching chapters
    let filteredChaps = JEE_CHAPTERS;
    if (addTopicSubject !== 'All') {
      filteredChaps = filteredChaps.filter(c => c.subject === addTopicSubject);
    }
    if (addTopicQuery) {
      const q = addTopicQuery.toLowerCase();
      filteredChaps = filteredChaps.filter(c => c.title.toLowerCase().includes(q) || c.branch.toLowerCase().includes(q));
    }

    let suggestListHtml = '';
    if (addTopicQuery && filteredChaps.length) {
      filteredChaps.slice(0, 5).forEach(c => {
        suggestListHtml += `
          <div class="ak-suggest-item" onclick="window.akSelectSuggestedChapter('${c.id}')">
            <div class="ak-suggest-title">${c.title}</div>
            <div class="ak-suggest-path">${c.subject} &gt;&gt; ${c.branch}</div>
          </div>
        `;
      });
    }

    screenContent.innerHTML = `
      <label class="ak-field-label">By Chapter*</label>

      <!-- Subject Tabs -->
      <div class="ak-subj-filter-row" style="margin-bottom:10px;">
        <span class="ak-subj-pill ${addTopicSubject === 'All' ? 'active' : ''}" onclick="window.akSetAddSubj('All')">All</span>
        <span class="ak-subj-pill ${addTopicSubject === 'Chemistry' ? 'active' : ''}" onclick="window.akSetAddSubj('Chemistry')">Chemistry</span>
        <span class="ak-subj-pill ${addTopicSubject === 'Mathematics' ? 'active' : ''}" onclick="window.akSetAddSubj('Mathematics')">Mathematics</span>
        <span class="ak-subj-pill ${addTopicSubject === 'Physics' ? 'active' : ''}" onclick="window.akSetAddSubj('Physics')">Physics</span>
      </div>

      <!-- Live Search Box -->
      <input type="text" class="ak-search-box" id="akAddSearchInp" placeholder="Search your chapter" value="${addTopicQuery}">
      <div style="font-size:10.5px; color:var(--ak-muted); margin:4px 0 10px;">The chapter can be from any subject in your course.</div>

      ${suggestListHtml ? `<div class="ak-suggest-list">${suggestListHtml}</div>` : ''}

      <label class="ak-field-label">Select Topic*</label>
      <select class="ak-search-box" id="akTopicSelect" style="margin-bottom:14px;">
        ${addTopicSelectedChapter ? `
          <option value="All Topics">Entire Chapter (${addTopicSelectedChapter.title})</option>
          <option value="Formula Revision">Formula Revision & Key Concepts</option>
          <option value="PYQ Practice">Solve 30 PYQs (2023-2025)</option>
          <option value="NCERT Reading">NCERT Exemplar & In-text</option>
        ` : `
          <option value="">Search a chapter above first</option>
        `}
      </select>

      <label class="ak-field-label">Study Mode</label>
      <div style="display:flex; gap:8px; margin-bottom:16px;">
        <button class="ak-act-btn ${addTopicMode === 'L' ? 'ak-btn-orange' : 'ak-btn-gray'}" style="flex:1; padding:9px 4px;" onclick="window.akSetAddMode('L')">(L) Lecture</button>
        <button class="ak-act-btn ${addTopicMode === 'P' ? 'ak-btn-orange' : 'ak-btn-gray'}" style="flex:1; padding:9px 4px;" onclick="window.akSetAddMode('P')">(P) Practice</button>
        <button class="ak-act-btn ${addTopicMode === 'R' ? 'ak-btn-orange' : 'ak-btn-gray'}" style="flex:1; padding:9px 4px;" onclick="window.akSetAddMode('R')">(R) Revision</button>
      </div>

      <label class="ak-field-label">Target Level</label>
      <select class="ak-search-box" id="akLevelSelect" style="margin-bottom:24px;">
        <option value="JEE Mains + Advanced">JEE Mains + Advanced</option>
        <option value="JEE Mains">JEE Mains Only</option>
        <option value="JEE Advanced">JEE Advanced Only</option>
      </select>

      <button class="ak-pill-btn" onclick="window.akSaveNewTopic('${targetScreen}')" style="width:100%; padding:14px; font-size:14px;">
        ${targetScreen === 'today' ? 'Add Topic ->' : (targetScreen === 'backlog' ? 'Add To Backlog ->' : 'Add To Future ->')}
      </button>
    `;

    const inp = document.getElementById('akAddSearchInp');
    if (inp) {
      inp.oninput = (e) => {
        addTopicQuery = e.target.value;
        renderAddTopicScreen(targetScreen);
        const refoc = document.getElementById('akAddSearchInp');
        if (refoc) {
          refoc.focus();
          refoc.selectionStart = refoc.selectionEnd = refoc.value.length;
        }
      };
    }
  }

  /* ==========================================================
     SCREEN 3: BACKLOG RECOVERY (1:1 with Screenshot 3)
     ========================================================== */
  function renderBacklogScreen() {
    topTitle.textContent = "Backlogs";
    const today = todayStr();
    const backlogs = state.tasks.filter(t => t.date < today && !t.done);

    let html = `
      <!-- Backlog Recovery Header Card (Screenshot 3) -->
      <div class="ak-progress-card" style="background:linear-gradient(135deg, #1c1524, #120f18);">
        <h2 class="ak-prog-h">Backlog recovery</h2>
        <div class="ak-prog-sub">Missed self-study tasks appear here automatically.</div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <div style="font-size:24px; font-weight:800; font-family:monospace; color:#fff;">${backlogs.length}</div>
            <div style="font-size:11px; color:var(--ak-muted);">Total Backlogs</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px; color:var(--ak-muted);">Selected range</div>
            <div style="font-size:12px; font-weight:700; color:var(--ak-orange-light);">${shiftDateStr(-7)} &mdash; ${today} &gt;</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.04); border-radius:10px; padding:8px 12px; font-size:11px; color:var(--ak-orange-light);">
          Current : 7-day backlog tracking
        </div>
      </div>

      <div style="font-size:13px; font-weight:700; color:#fff; margin-bottom:12px;">
        Backlogs from selected range (${backlogs.length})
      </div>
    `;

    if (!backlogs.length) {
      html += `
        <div class="ak-empty-wrap">
          ${FOX_SVG}
          <div class="ak-empty-h">No Backlogs found</div>
          <div class="ak-empty-p">Great consistency! No missed self-study tasks in this range. Keep up the rhythm!</div>
        </div>
      `;
    } else {
      html += `<div style="display:flex; flex-direction:column; gap:8px;">`;
      backlogs.forEach(t => {
        html += `
          <div class="ak-task-card subj-${t.subject}">
            <div class="ak-task-top">
              <div class="ak-task-info">
                <h4 class="ak-task-title">${t.title}</h4>
                <div class="ak-task-sub">${t.title} &gt;&gt; ${t.subject} &bull; Due ${t.date}</div>
              </div>
              <button class="ak-task-dots" onclick="window.akOpenEditModal('${t.id}')">&hellip;</button>
            </div>

            <div style="display:flex; gap:8px; margin-top:8px;">
              <button class="ak-act-btn ak-btn-orange" onclick="window.akMoveTaskToToday('${t.id}')" style="flex:1; padding:8px;">
                ⚡ Move to Today
              </button>
              <button class="ak-act-btn ak-btn-gray" onclick="window.akToggleTaskDone('${t.id}')" style="padding:8px 14px;">
                ✓ Done
              </button>
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += `
      <button class="ak-fab" onclick="window.akOpenScreen('add_backlog')" title="Add Backlog">+</button>
    `;

    screenContent.innerHTML = html;
  }

  /* ==========================================================
     SCREEN 4: FUTURE TASKS (1:1 with Screenshots 8 & 11)
     ========================================================== */
  function renderFutureScreen() {
    topTitle.textContent = "Future Tasks";
    const today = todayStr();

    // Generate next 7 days
    let dayCardsHtml = '';
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const dayNum = d.getDate();
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const isSelected = (dStr === selectedFutureDay);

      dayCardsHtml += `
        <div class="ak-day-card ${isSelected ? 'active' : ''}" onclick="window.akSelectFutureDay('${dStr}')">
          <span class="ak-day-num">${dayNum}</span>
          <span class="ak-day-txt">${dayName}</span>
        </div>
      `;
    }

    const scheduledTasks = state.tasks.filter(t => t.date === selectedFutureDay);
    const selDateObj = new Date(selectedFutureDay);
    const dateFormatted = selDateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });

    let html = `
      <div style="font-size:11px; color:var(--ak-muted); margin-bottom:12px;">
        Basic plans 1 day ahead. Pro opens the full 7-day planner.
      </div>

      <!-- Horizontal Day Strip (Screenshot 8) -->
      <div class="ak-day-strip">${dayCardsHtml}</div>

      <div style="background:#151829; border:1px solid var(--ak-border); border-radius:16px; padding:14px; margin-bottom:14px;">
        <div style="font-size:14px; font-weight:800; color:#fff;">${dateFormatted}</div>
        <div style="font-size:11px; color:var(--ak-muted); margin-top:2px;">You can add the topic/chapters directly by selecting below</div>
        <button class="ak-pill-btn" onclick="window.akOpenScreen('add_future')" style="margin-top:12px; width:100%;">
          Add Topic on ${selDateObj.getDate()} ${selDateObj.toLocaleDateString('en-US', { month: 'short' })} &rarr;
        </button>
      </div>

      <div style="font-size:13px; font-weight:700; color:#fff; margin-bottom:10px;">
        Scheduled Tasks (${scheduledTasks.length})
      </div>
    `;

    if (!scheduledTasks.length) {
      html += `
        <div class="ak-empty-wrap">
          ${FOX_SVG}
          <div class="ak-empty-h">No topics added for this date</div>
          <div class="ak-empty-p">Stay ahead of your JEE syllabus by scheduling chapter practice questions early!</div>
        </div>
      `;
    } else {
      html += `<div style="display:flex; flex-direction:column; gap:8px;">`;
      scheduledTasks.forEach(t => {
        html += `
          <div class="ak-task-card subj-${t.subject}">
            <div class="ak-task-top">
              <div class="ak-task-info">
                <h4 class="ak-task-title">${t.title}</h4>
                <div class="ak-task-sub">${t.title} &gt;&gt; ${t.subject}</div>
              </div>
              <button class="ak-task-dots" onclick="window.akOpenEditModal('${t.id}')">&hellip;</button>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
              <span class="ak-level-badge">${t.level}</span>
              <button class="ak-act-btn ak-btn-orange" onclick="window.akMoveTaskToToday('${t.id}')" style="padding:6px 12px; font-size:11px;">
                ⚡ Move to Today
              </button>
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    screenContent.innerHTML = html;
  }

  /* ==========================================================
     SCREEN 5: PROGRESS BAR & SYLLABUS MATRIX (1:1 with Screenshot 9)
     Dual Circular Gauges: JEE Mains Only & JEE Advanced Only
     Complete 83 JEE Chapters Matrix with Subject Filters
     ========================================================== */
  function renderProgressScreen() {
    topTitle.textContent = "Progress Bar";

    // Calculate subject-wise completion
    let phyDone = 0, chemDone = 0, mathDone = 0;
    JEE_CHAPTERS.forEach(c => {
      if (state.completedChapters[c.title]) {
        if (c.subject === 'Physics') phyDone++;
        else if (c.subject === 'Chemistry') chemDone++;
        else if (c.subject === 'Mathematics') mathDone++;
      }
    });

    const phyPct = Math.round((phyDone / 28) * 100);
    const chemPct = Math.round((chemDone / 30) * 100);
    const mathPct = Math.round((mathDone / 25) * 100);
    const overallPct = Math.round(((phyDone + chemDone + mathDone) / 83) * 100);

    screenContent.innerHTML = `
      <!-- Section 1: JEE Mains Only (Dual Circular Gauges) -->
      <div class="ak-prog-section">
        <div class="ak-sec-head">
          <span class="ak-sec-title">JEE Mains Only</span>
          <span class="ak-sec-link" onclick="window.akSetSubjFilter('All')">${phyDone + chemDone + mathDone}/83 Chapters &rarr;</span>
        </div>

        <div class="ak-orbit-wrap">
          <!-- Circular Ring Gauge -->
          <div style="width:110px; height:110px; position:relative; display:grid; place-items:center;">
            <svg width="110" height="110" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.08)" stroke-width="8" fill="none" stroke-dasharray="190 50" transform="rotate(130 50 50)"/>
              <circle cx="50" cy="50" r="38" stroke="var(--ak-orange)" stroke-width="8" fill="none" stroke-linecap="round"
                stroke-dasharray="${(overallPct * 1.9)} 240" transform="rotate(130 50 50)"/>
            </svg>
            <div style="position:absolute; text-align:center;">
              <div style="font-size:18px; font-weight:800; color:#fff;">${overallPct}%</div>
              <div style="font-size:9.5px; color:var(--ak-muted);">complete</div>
            </div>
          </div>

          <!-- Orbiting Subject Nodes -->
          <div class="ak-node-stack">
            <div class="ak-node-item">
              <div class="ak-node-icon" style="color:var(--ak-orange);">🧪</div>
              <span>${chemPct}% Chemistry (${chemDone}/30)</span>
            </div>
            <div class="ak-node-item">
              <div class="ak-node-icon" style="color:var(--ak-blue);">⚛</div>
              <span>${phyPct}% Physics (${phyDone}/28)</span>
            </div>
            <div class="ak-node-item">
              <div class="ak-node-icon" style="color:#c084fc;">∑</div>
              <span>${mathPct}% Mathematics (${mathDone}/25)</span>
            </div>
          </div>
        </div>
        <div style="text-align:center; font-size:11px; color:var(--ak-muted); margin-top:8px;">Overall Syllabus Coverage</div>
      </div>

      <!-- Section 2: Interactive 83 Chapter Completion Checklist -->
      <div style="background:#121626; border:1px solid var(--ak-border); border-radius:20px; padding:16px;">
        <div style="font-size:15px; font-weight:800; color:#fff; margin-bottom:10px;">83 JEE Chapters Matrix</div>

        <div class="ak-subj-filter-row" style="margin-bottom:12px;">
          <span class="ak-subj-pill ${activeSubjFilter === 'All' ? 'active' : ''}" onclick="window.akSetSubjFilter('All')">All (83)</span>
          <span class="ak-subj-pill ${activeSubjFilter === 'Physics' ? 'active' : ''}" onclick="window.akSetSubjFilter('Physics')">Physics (${phyDone}/28)</span>
          <span class="ak-subj-pill ${activeSubjFilter === 'Chemistry' ? 'active' : ''}" onclick="window.akSetSubjFilter('Chemistry')">Chem (${chemDone}/30)</span>
          <span class="ak-subj-pill ${activeSubjFilter === 'Mathematics' ? 'active' : ''}" onclick="window.akSetSubjFilter('Mathematics')">Maths (${mathDone}/25)</span>
        </div>

        <div style="max-height:360px; overflow-y:auto; display:flex; flex-direction:column; gap:6px; padding-right:4px;">
          ${JEE_CHAPTERS.filter(c => activeSubjFilter === 'All' || c.subject === activeSubjFilter).map(c => {
            const isDone = !!state.completedChapters[c.title];
            const subjCol = c.subject === 'Physics' ? '#38bdf8' : c.subject === 'Chemistry' ? '#34d399' : '#c084fc';
            return `
              <div style="display:flex; align-items:center; justify-content:space-between; background:#181d30; padding:9px 12px; border-radius:12px; border:1px solid var(--ak-border);">
                <div style="display:flex; align-items:center; gap:10px; min-width:0; flex:1;">
                  <button class="ak-task-circle" onclick="window.akToggleChapterComplete('${c.title.replace(/'/g, "\\'")}')" style="${isDone ? 'background:var(--ak-green); border-color:var(--ak-green); color:#000;' : ''}">
                    ${isDone ? '&#10003;' : ''}
                  </button>
                  <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                    <div style="font-size:12.5px; font-weight:600; color:#fff; ${isDone ? 'text-decoration:line-through; opacity:0.7;' : ''}">${c.title}</div>
                    <div style="font-size:10px; color:${subjCol}; font-weight:600;">${c.subject} &bull; ${c.branch}</div>
                  </div>
                </div>
                <button class="ak-pill-btn" onclick="window.akPlanTaskForChapter('${c.title.replace(/'/g, "\\'")}', '${c.subject}')" style="padding:4px 10px; font-size:10px; flex-shrink:0; margin-left:8px;">
                  + Plan
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  window.akToggleChapterComplete = function(chapTitle) {
    state.completedChapters[chapTitle] = !state.completedChapters[chapTitle];
    saveState(state);
    renderProgressScreen();
    updateBadges();
  };

  window.akPlanTaskForChapter = function(chapTitle, subj) {
    const ch = JEE_CHAPTERS.find(x => x.title === chapTitle);
    addTopicSelectedChapter = ch || { title: chapTitle, subject: subj, branch: 'General' };
    addTopicQuery = chapTitle;
    addTopicSubject = subj;
    openView('add_today');
  };

  /* ==========================================================
     GLOBAL ACTION HANDLERS
     ========================================================== */
  window.akOpenScreen = function(screenName) {
    openView(screenName);
  };

  window.akSetSubjFilter = function(subj) {
    activeSubjFilter = subj;
    renderScreen(currentView, false);
  };

  window.akSetAddSubj = function(subj) {
    addTopicSubject = subj;
    renderAddTopicScreen(currentView === 'add_backlog' ? 'backlog' : (currentView === 'add_future' ? 'future' : 'today'));
  };

  window.akSetAddMode = function(mode) {
    addTopicMode = mode;
    renderAddTopicScreen(currentView === 'add_backlog' ? 'backlog' : (currentView === 'add_future' ? 'future' : 'today'));
  };

  window.akSelectSuggestedChapter = function(chapId) {
    const ch = JEE_CHAPTERS.find(x => x.id === chapId);
    if (ch) {
      addTopicSelectedChapter = ch;
      addTopicQuery = ch.title;
      renderAddTopicScreen(currentView === 'add_backlog' ? 'backlog' : (currentView === 'add_future' ? 'future' : 'today'));
    }
  };

  window.akSaveNewTopic = function(targetScreen) {
    const chap = addTopicSelectedChapter ? addTopicSelectedChapter.title : addTopicQuery.trim();
    if (!chap) return;

    let targetDate = todayStr();
    if (targetScreen === 'backlog') targetDate = shiftDateStr(-1);
    else if (targetScreen === 'future') targetDate = selectedFutureDay;

    const subject = addTopicSelectedChapter ? addTopicSelectedChapter.subject : 'General';
    const branch = addTopicSelectedChapter ? addTopicSelectedChapter.branch : 'Self-study';
    const level = document.getElementById('akLevelSelect') ? document.getElementById('akLevelSelect').value : 'JEE Mains + Advanced';

    state.tasks.push({
      id: 't_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: chap,
      subject: subject,
      branch: branch,
      mode: addTopicMode,
      level: level,
      date: targetDate,
      hoursLeft: 23,
      done: false
    });

    saveState(state);
    addTopicQuery = '';
    addTopicSelectedChapter = null;

    showToast('Topics saved for today. [v2]');
    renderScreen(targetScreen === 'today' ? 'today' : (targetScreen === 'backlog' ? 'backlog' : 'future'), false);
  };

  window.akToggleTaskDone = function(taskId) {
    const t = state.tasks.find(x => x.id === taskId);
    if (t) {
      t.done = !t.done;
      saveState(state);
      renderScreen(currentView, false);
    }
  };

  window.akQuickSetMode = function(taskId, mode) {
    const t = state.tasks.find(x => x.id === taskId);
    if (t) {
      t.mode = mode;
      saveState(state);
      renderScreen(currentView, false);
    }
  };

  window.akMoveTaskToToday = function(taskId) {
    const t = state.tasks.find(x => x.id === taskId);
    if (t) {
      t.date = todayStr();
      saveState(state);
      showToast('Moved to Today\'s Tasks');
      renderScreen(currentView, false);
    }
  };

  window.akSelectFutureDay = function(dStr) {
    selectedFutureDay = dStr;
    renderFutureScreen();
  };

  window.akToggleChapterComplete = function(chapTitle) {
    state.completedChapters[chapTitle] = !state.completedChapters[chapTitle];
    saveState(state);
    renderProgressScreen();
    updateBadges();
  };

  window.akPlanTaskForChapter = function(chapTitle, subj) {
    const ch = JEE_CHAPTERS.find(x => x.title === chapTitle);
    addTopicSelectedChapter = ch || { title: chapTitle, subject: subj, branch: 'General' };
    addTopicQuery = chapTitle;
    addTopicSubject = subj;
    openView('add_today');
  };

  // Edit Modal controls (Screenshot 13)
  window.akOpenEditModal = function(taskId) {
    const t = state.tasks.find(x => x.id === taskId);
    if (!t) return;
    selectedTaskForEdit = t;

    editTaskTitle.textContent = t.title;
    editTaskPath.textContent = `${t.title} >> ${t.subject}`;
    editLevelSelect.value = t.level || 'JEE Mains + Advanced';

    ['L', 'P', 'R'].forEach(m => {
      const btn = document.getElementById(`akEditMode${m}`);
      if (btn) btn.classList.toggle('active', t.mode === m);
    });

    editModal.classList.add('open');
  };

  window.akSetEditMode = function(mode) {
    if (selectedTaskForEdit) {
      selectedTaskForEdit.mode = mode;
      ['L', 'P', 'R'].forEach(m => {
        const btn = document.getElementById(`akEditMode${m}`);
        if (btn) btn.classList.toggle('active', m === mode);
      });
      saveState(state);
    }
  };

  closeEditModal.onclick = () => editModal.classList.remove('open');
  editModal.onclick = (e) => { if (e.target === editModal) editModal.classList.remove('open'); };

  btnMoveToBacklog.onclick = () => {
    if (selectedTaskForEdit) {
      selectedTaskForEdit.date = shiftDateStr(-1);
      saveState(state);
      editModal.classList.remove('open');
      showToast('Task moved to Backlogs');
      renderScreen(currentView, false);
    }
  };

  btnMoveToFuture.onclick = () => {
    if (selectedTaskForEdit) {
      selectedTaskForEdit.date = shiftDateStr(1);
      saveState(state);
      editModal.classList.remove('open');
      showToast('Task moved to Future Tasks');
      renderScreen(currentView, false);
    }
  };

  btnDeleteTask.onclick = () => {
    if (selectedTaskForEdit) {
      state.tasks = state.tasks.filter(x => x.id !== selectedTaskForEdit.id);
      saveState(state);
      editModal.classList.remove('open');
      showToast('Task deleted');
      renderScreen(currentView, false);
    }
  };

  // Keyboard shortcut: ESC closes drawer/modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (editModal.classList.contains('open')) editModal.classList.remove('open');
      else if (panel.classList.contains('open')) closePanel();
    }
  });

  /* ==========================================================
     COACHING LECTURE REVISION LOGIC & DESK SYNC
     ========================================================== */
  const DEFAULT_LECTURES = [
    { id: 'c_lec_1', subject: 'Physics', subTag: 'PHY', subColor: '#38bdf8', title: 'Current Electricity', note: 'Lec 4 &bull; Notes', done: false },
    { id: 'c_lec_2', subject: 'Chemistry', subTag: 'CHEM', subColor: '#34d399', title: 'Chemical Kinetics', note: 'Lec 2 &bull; Done', done: true },
    { id: 'c_lec_3', subject: 'Mathematics', subTag: 'MATH', subColor: '#c084fc', title: 'Matrices & Determinants', note: 'Lec 3 &bull; Revise', done: false }
  ];

  function getLectures() {
    try {
      const saved = localStorage.getItem('akiva_coaching_lectures');
      return saved ? JSON.parse(saved) : DEFAULT_LECTURES;
    } catch(e) {
      return DEFAULT_LECTURES;
    }
  }

  function saveLectures(list) {
    try {
      localStorage.setItem('akiva_coaching_lectures', JSON.stringify(list));
    } catch(e) {}
  }

  function renderLectures() {
    const container = document.getElementById('lecture-container');
    if (!container) return;
    const list = getLectures();
    container.innerHTML = list.map(item => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:7px 9px; border-radius:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); cursor:pointer; transition:all 0.15s;" onclick="window.toggleLectureDone('${item.id}')" title="Click to toggle done">
        <div style="display:flex; align-items:center; gap:8px; min-width:0; overflow:hidden;">
          <span style="font-size:9.5px; font-family:monospace; font-weight:700; padding:1px 5px; border-radius:4px; background:${item.subColor}22; color:${item.subColor}; border:1px solid ${item.subColor}44; flex-shrink:0;">${item.subTag}</span>
          <span style="font-size:12px; font-weight:600; color:#e2e8f0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; ${item.done ? 'text-decoration:line-through; opacity:0.6;' : ''}">${item.title}</span>
        </div>
        <span style="font-size:10px; font-family:monospace; margin-left:8px; flex-shrink:0; font-weight:600; color:${item.done ? '#34d399' : '#fbbf24'};">${item.done ? '✓ Done' : item.note}</span>
      </div>
    `).join('');
  }

  window.toggleLectureDone = function(id) {
    const list = getLectures();
    const item = list.find(x => x.id === id);
    if (item) {
      item.done = !item.done;
      saveLectures(list);
      renderLectures();
      updateTargetCard();
    }
  };

  let coachingCollapsed = false;
  window.toggleCoachingCollapse = function() {
    coachingCollapsed = !coachingCollapsed;
    const container = document.getElementById('lecture-container');
    const summary = document.getElementById('lecture-collapsed-summary');
    const icon = document.getElementById('coachingCollapseIcon');
    if (container) container.style.display = coachingCollapsed ? 'none' : 'flex';
    if (summary) {
      summary.style.display = coachingCollapsed ? 'block' : 'none';
      const list = getLectures();
      const doneCount = list.filter(x => x.done).length;
      summary.innerHTML = `${list.length} Lectures Tracked (${doneCount} Done) &bull; Click to expand`;
    }
    if (icon) icon.textContent = coachingCollapsed ? '▸' : '▾';
  };

  function updateTargetCard() {
    const streakEl = document.getElementById('streak-num');
    let streak = 14;
    try {
      const savedStreak = localStorage.getItem('akiva_streak');
      if (savedStreak) streak = parseInt(savedStreak, 10);
    } catch(e) {}
    if (streakEl) streakEl.textContent = streak;

    let totalPlanned = 3;
    let totalDone = 0;
    try {
      const today = todayStr();
      const todayTasks = (state.tasks || []).filter(t => t.date === today);
      if (todayTasks.length > 0) {
        totalPlanned = todayTasks.length;
        totalDone = todayTasks.filter(t => t.done).length;
      } else {
        const lecs = getLectures();
        totalPlanned = lecs.length;
        totalDone = lecs.filter(l => l.done).length;
      }
    } catch(e) {
      const lecs = getLectures();
      totalPlanned = lecs.length;
      totalDone = lecs.filter(l => l.done).length;
    }

    const pct = totalPlanned > 0 ? Math.round((totalDone / totalPlanned) * 100) : 0;
    const arc = document.getElementById('circle-arc');
    const miniArc = document.getElementById('mini-circle-arc');
    const pctEl = document.getElementById('circle-percent');
    const ratioEl = document.getElementById('ratio-text');
    const miniRatioEl = document.getElementById('mini-ratio-text');
    const subGuideEl = document.getElementById('sub-guidance');

    if (pctEl) pctEl.textContent = pct + '%';
    if (ratioEl) ratioEl.textContent = `${totalDone} / ${totalPlanned} Done`;
    if (miniRatioEl) miniRatioEl.textContent = `${totalDone}/${totalPlanned} Done`;
    if (arc) {
      const totalCircumference = 163.36;
      const offset = (totalCircumference * (1 - (pct / 100))).toFixed(2);
      arc.style.strokeDashoffset = offset;
    }
    if (miniArc) {
      const miniCircumference = 87.96;
      const offset = (miniCircumference * (1 - (pct / 100))).toFixed(2);
      miniArc.style.strokeDashoffset = offset;
    }
    if (subGuideEl) {
      const remaining = totalPlanned - totalDone;
      if (remaining <= 0) {
        subGuideEl.textContent = "All targets completed! Great work 🚀";
      } else {
        subGuideEl.textContent = `${remaining} task${remaining > 1 ? 's' : ''} left before 11:30 PM`;
      }
    }
  }

  function updateDeskHeader() {
    const el = document.getElementById('streakDeskTxt');
    if (!el) return;
    const now = new Date();
    const hours = now.getHours();
    let desk = "Evening Desk";
    if (hours >= 5 && hours < 12) desk = "Morning Desk";
    else if (hours >= 12 && hours < 17) desk = "Afternoon Desk";
    else if (hours >= 17 && hours < 21) desk = "Evening Desk";
    else desk = "Night Desk";
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    el.innerHTML = `${desk} &bull; ${timeStr}`;
  }

  window.toggleSyllabusModal = function() {
    let modal = document.getElementById('syllabusModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'syllabusModal';
      modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px); display: none; align-items: center; justify-content: center;
        z-index: 99999; padding: 16px; font-family: var(--ak-font);
      `;
      modal.innerHTML = `
        <div style="background:#0e111a; border:1px solid rgba(255,255,255,0.12); border-radius:24px; max-width:440px; width:100%; padding:22px; color:#e2e8f0; box-shadow:0 25px 60px rgba(0,0,0,0.85);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div>
              <div style="font-size:10px; color:#fbbf24; font-weight:700; text-transform:uppercase; letter-spacing:0.06em;">Coaching Revision</div>
              <h3 style="margin:2px 0 0; font-size:16px; font-weight:700; color:#fff;">Lecture Revision Manager</h3>
            </div>
            <button onclick="toggleSyllabusModal()" style="background:transparent; border:none; color:#94a3b8; font-size:22px; cursor:pointer; line-height:1;">&times;</button>
          </div>
          <p style="font-size:12px; color:#94a3b8; margin:0 0 16px;">Track your ongoing coaching lecture revisions and mark chapters completed:</p>
          <div id="modalLecturesList" style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px; max-height:240px; overflow-y:auto;"></div>
          <div style="display:flex; gap:8px;">
            <button onclick="openFullStudyHub()" style="flex:1; background:rgba(245,158,11,0.15); border:1px solid #f59e0b; color:#fbbf24; font-weight:600; font-size:12px; padding:10px; border-radius:12px; cursor:pointer; transition:background 0.2s;">Open Full Study Hub ⚡</button>
            <button onclick="toggleSyllabusModal()" style="background:#1e2438; border:1px solid rgba(255,255,255,0.1); color:#fff; font-size:12px; font-weight:600; padding:10px 16px; border-radius:12px; cursor:pointer;">Done</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', function(e) {
        if (e.target === modal) toggleSyllabusModal();
      });
    }

    if (modal.style.display === 'none' || !modal.style.display) {
      renderModalLectures();
      modal.style.display = 'flex';
    } else {
      modal.style.display = 'none';
      renderLectures();
      updateTargetCard();
    }
  };

  function renderModalLectures() {
    const listEl = document.getElementById('modalLecturesList');
    if (!listEl) return;
    const list = getLectures();
    listEl.innerHTML = list.map((item) => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 12px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); border-radius:12px;">
        <div>
          <span style="font-size:10px; font-family:monospace; font-weight:700; color:${item.subColor}; margin-right:6px;">[${item.subTag}]</span>
          <span style="font-size:13px; font-weight:600; color:#fff;">${item.title}</span>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">${item.note}</div>
        </div>
        <button onclick="window.toggleLectureDone('${item.id}'); renderModalLectures();" style="background:${item.done ? '#10b981' : 'transparent'}; border:1px solid ${item.done ? '#10b981' : 'rgba(255,255,255,0.2)'}; color:${item.done ? '#000' : '#fff'}; font-size:11px; font-weight:700; padding:5px 12px; border-radius:8px; cursor:pointer;">
          ${item.done ? '✓ Done' : 'Mark Done'}
        </button>
      </div>
    `).join('');
  }

  window.openFullStudyHub = function() {
    toggleSyllabusModal();
    if (window.akOpenScreen) window.akOpenScreen('today');
  };

  // Initial updates
  renderLectures();
  updateTargetCard();
  updateDeskHeader();
  updateBadges();

  setInterval(updateTargetCard, 5000);
  setInterval(updateDeskHeader, 60000);

  // Test Calendar & Radar Integration
  function loadTests() {
    try {
      const saved = localStorage.getItem('akiva_tests');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [
      { id: 1, title: 'Coaching Part Test', date: '2026-11-25', syllabus: 'Rotational Motion, Ionic Eq, Definite Int', type: 'Part Test' },
      { id: 2, title: 'AITS-1 (All India Test Series)', date: '2026-11-30', syllabus: 'Full 11th Syllabus', type: 'Full Mock' },
      { id: 3, title: 'Monthly Full Mock #2', date: '2026-12-07', syllabus: 'Complete JEE Mains Pattern', type: 'Full Mock' }
    ];
  }

  function saveTests(tests) {
    try {
      localStorage.setItem('akiva_tests', JSON.stringify(tests));
    } catch(e) {}
  }

  let calYear = 2026;
  let calMonth = 10; // 0-indexed (10 = Nov)
  let selectedCalDate = '2026-11-22';

  window.changeMonth = function(delta) {
    calMonth += delta;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    else if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendarScreen();
  };

  window.toggleAddTestModal = function() {
    const m = document.getElementById('akiva-add-test-modal');
    if (m) m.style.display = (m.style.display === 'none' || !m.style.display) ? 'block' : 'none';
  };

  window.saveTestFromDrawer = function() {
    const title = (document.getElementById('cal-in-title')?.value || '').trim();
    const date = document.getElementById('cal-in-date')?.value;
    const type = document.getElementById('cal-in-type')?.value || 'Mock Test';
    const syl = (document.getElementById('cal-in-syl')?.value || '').trim();
    if (!title || !date) {
      showToast('⚠️ Please enter title and date');
      return;
    }
    const tests = loadTests();
    tests.push({ id: Date.now(), title, date, syllabus: syl || 'Full Syllabus', type });
    saveTests(tests);
    window.toggleAddTestModal();
    showToast('✅ Test added to schedule');
    renderCalendarScreen();
  };

  window.deleteCalTest = function(id) {
    let tests = loadTests();
    tests = tests.filter(t => t.id !== id);
    saveTests(tests);
    showToast('🗑️ Test removed');
    renderCalendarScreen();
  };

  function renderCalendarScreen() {
    const tests = loadTests();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const totalDays = new Date(calYear, calMonth + 1, 0).getDate();

    let calGridHtml = '';
    ['S','M','T','W','T','F','S'].forEach(d => {
      calGridHtml += `<div style="text-align:center; font-size:10px; font-weight:700; color:#64748b; padding:4px 0;">${d}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
      calGridHtml += `<div></div>`;
    }

    for (let d = 1; d <= totalDays; d++) {
      const dStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const hasTest = tests.some(t => t.date === dStr);
      const isToday = dStr === '2026-11-22';
      const isSel = dStr === selectedCalDate;

      let bg = 'rgba(255,255,255,0.03)';
      let border = '1px solid rgba(255,255,255,0.05)';
      let col = '#cbd5e1';

      if (isToday) { border = '1.5px solid #2bb3a0'; col = '#2bb3a0'; }
      if (hasTest) { bg = 'rgba(245,158,11,0.2)'; border = '1px solid rgba(245,158,11,0.5)'; col = '#fbbf24'; }
      if (isSel) { bg = '#f59e0b'; col = '#000'; font_weight = '800'; }

      calGridHtml += `<div onclick="window.selectCalDate('${dStr}')" style="aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:6px; font-size:11px; cursor:pointer; background:${bg}; border:${border}; color:${col}; position:relative; font-weight:${isSel ? '800' : '600'};">
        ${d}
        ${hasTest && !isSel ? '<span style="position:absolute; bottom:2px; width:4px; height:4px; border-radius:50%; background:#f59e0b;"></span>' : ''}
      </div>`;
    }

    // Upcoming tests list
    const today = new Date('2026-11-22');
    const sorted = [...tests].sort((a,b) => new Date(a.date) - new Date(b.date));
    let upcomingHtml = '';
    sorted.forEach(t => {
      const tDate = new Date(t.date);
      const diffDays = Math.ceil((tDate - today) / (1000 * 60 * 60 * 24));
      let badge = diffDays > 0 ? `${diffDays}d left` : (diffDays === 0 ? 'TODAY' : 'Passed');
      let badgeCol = diffDays <= 3 ? '#ef4444' : (diffDays <= 7 ? '#f59e0b' : '#3b82f6');

      upcomingHtml += `
        <div style="padding:10px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:10px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#f1f5f9;">${t.title}</div>
            <div style="font-size:10px; color:#94a3b8; margin-top:2px;">📅 ${t.date} &bull; ${t.syllabus}</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:9.5px; font-weight:700; padding:2px 6px; border-radius:6px; background:${badgeCol}22; color:${badgeCol}; border:1px solid ${badgeCol}55;">${badge}</span>
            <button onclick="window.deleteCalTest(${t.id})" style="background:none; border:none; color:#64748b; cursor:pointer; font-size:13px; padding:0 2px;">&times;</button>
          </div>
        </div>
      `;
    });

    const bodyEl = document.querySelector('.akiva-drawer-body');
    if (!bodyEl) return;
    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:14px; padding:4px 0 20px;">
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:13px; font-weight:700; color:#f8fafc;">${monthNames[calMonth]} ${calYear}</span>
            <div style="display:flex; gap:4px;">
              <button onclick="window.changeMonth(-1)" style="background:rgba(255,255,255,0.06); border:none; color:#cbd5e1; border-radius:6px; width:24px; height:24px; cursor:pointer; font-size:12px;">&lsaquo;</button>
              <button onclick="window.changeMonth(1)" style="background:rgba(255,255,255,0.06); border:none; color:#cbd5e1; border-radius:6px; width:24px; height:24px; cursor:pointer; font-size:12px;">&rsaquo;</button>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(7, 1fr); gap:4px;">
            ${calGridHtml}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
          <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#94a3b8;">Upcoming Tests Radar</span>
          <button onclick="window.toggleAddTestModal()" style="font-size:10px; color:#fbbf24; font-weight:700; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3); border-radius:6px; padding:3px 8px; cursor:pointer;">+ Add Test</button>
        </div>

        <div id="akiva-add-test-modal" style="display:none; background:rgba(24,28,42,0.95); border:1px solid rgba(245,158,11,0.4); border-radius:12px; padding:12px; margin-bottom:6px;">
          <input type="text" id="cal-in-title" placeholder="Test Name (e.g. AITS Part Test)" style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:#fff; border-radius:6px; padding:6px 8px; font-size:11px; margin-bottom:6px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:6px;">
            <input type="date" id="cal-in-date" value="${selectedCalDate}" style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:#fff; border-radius:6px; padding:5px 6px; font-size:11px;">
            <select id="cal-in-type" style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:#fff; border-radius:6px; padding:5px 6px; font-size:11px;">
              <option value="Part Test">Part Test</option>
              <option value="Full Mock">Full Mock</option>
              <option value="Chapter Test">Chapter Test</option>
            </select>
          </div>
          <input type="text" id="cal-in-syl" placeholder="Syllabus (e.g. Mechanics + Calculus)" style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:#fff; border-radius:6px; padding:6px 8px; font-size:11px; margin-bottom:8px;">
          <button onclick="window.saveTestFromDrawer()" style="width:100%; padding:6px; background:#f59e0b; color:#000; font-weight:700; border-radius:6px; border:none; font-size:11px; cursor:pointer;">Save to Calendar &rarr;</button>
        </div>

        <div>
          ${upcomingHtml}
        </div>
      </div>
    `;
  }

  window.selectCalDate = function(dStr) {
    selectedCalDate = dStr;
    renderCalendarScreen();
  };

})();