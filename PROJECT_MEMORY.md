# JEE Test Tracker & Akiva Study Hub — Complete Project Memory

**Generated for:** Pranay Surjuse  
**Repository:** `C:\Users\piyus\Desktop\GIT REPO\tests`  
**Remote Git:** `git@github.com:Pranaysurjuse/tests.git` (Branch: `main`)  
**Status:** All changes committed and pushed to `origin/main`.

---

## 1. Project Overview & Architecture
- **Purpose:** Comprehensive JEE exam tracker and self-study hub replicating the exact UX/UI of the Akiva mobile app while integrating with Pranay's historical test analytics (June – November 2026).
- **Core Principle:** **Never alter past test data**. Preserve exact score history across Physics, Chemistry, and Mathematics.
- **Key Technology:** Vanilla HTML5, CSS3, ES6 JavaScript, Vector SVGs, and LocalStorage state persistence. No external frameworks required.

---

## 2. File Map & Responsibilities

### A. `dashboard.html`
- **Main Entrypoint:** Cards leading to After Diwali Live Tracker, Physics, Chemistry, Maths, and Combine menus.
- **Upgraded Vector Badges:** Replaced boring text emojis with custom glowing SVGs:
  - ⚛️ **Physics**: Quantum Rutherford-Bohr Atom with electron orbital paths (Electric Cyan glow)
  - 🧪 **Chemistry**: Molecular Benzene Hexagonal Lattice with delocalized pi ring (Emerald Mint glow)
  - 🧊 **Mathematics**: 3D Isometric Hypercube tesseract (Radiant Purple glow)
  - 💎 **Combine**: Layered Crystalline Prism stack (Amber glow)
  - 🚀 **Diwali Tracker**: Supersonic Starburst badge
- **Desktop Layout Fix:** Added responsive padding (`@media (min-width: 800px) { body { padding-left: 90px; } }`) to prevent the left sidebar from ever covering dashboard cards.

### B. `studyhub.js`
- **Exact 1:1 Akiva Mobile Replication:**
  1. **📋 Today's Progress:**
     - Circular Speedo dial ring (% completion meter)
     - Planned and Completed metric boxes
     - Task items with `[ L ]` (Lecture), `[ P ]` (Practice), `[ R ]` (Revision) mode pills
     - Exam level selector (`JEE Mains`, `JEE Advanced`, `JEE Mains + Advanced`)
     - Countdown timer (`⏱ 23 hrs`)
     - Edit Task modal (`Move to Backlog`, `Move to Future`, `Delete Task`)
     - Custom Fox mascot empty state vector illustration
  2. **➕ Add Topics:**
     - Subject filter tabs (`All`, `Chemistry`, `Mathematics`, `Physics`)
     - Live chapter search with branch hierarchy (e.g. `Physics >> Mechanics`)
     - Mode selection chips and level selector
  3. **⏳ Backlogs Recovery:**
     - 7-day backlog tracking range
     - Overdue task counter
     - 1-click `⚡ Move to Today` rescue button
  4. **🗓️ Future Tasks:**
     - 7-day horizontal scrollable day calendar strip (`22 SUN`, `23 MON`...)
     - Scheduled task manager
  5. **🦊 AI Mentor (Personal Assistant):**
     - **Replaced the static "Progress Bar" screen**.
     - **Simplified, non-intrusive layout** with 4 Akiva-style subtabs:
       - **`[ ⚡ Picks ]`** *(Default)*: 3 slim, elegant high-yield topic recommendations (Physics, Chemistry, Maths) with quick `+ Add` buttons and a **`⚡ Add All 3 Topics to Today's Tasks`** 1-tap planner.
       - **`[ 💬 Ask AI ]`**: Clean, spacious chat interface with Fox AI, prompt chips, and instant JEE advice.
       - **`[ ❓ Quiz ]`**: Focused 3-question drill with instant green/red option feedback, score tracking, and detailed explanations.
       - **`[ 📑 Formulas ]`**: High-yield formulas (Carnot, Arrhenius, Leibniz) with 1-click clipboard copy.

### C. Multi-Color Subject & Category Theme System
Eliminated the monotone black/amber UI in favor of vibrant, distinct colors:
- ⚡ **Physics**: Electric Cyan (`#38bdf8`)
- 🧪 **Chemistry**: Emerald Mint (`#34d399`)
- ∑ **Mathematics**: Radiant Purple (`#c084fc`)
- 📋 **Today's Tasks**: Vibrant Coral (`#f43f5e`)
- 🗓️ **Future Tasks**: Royal Indigo (`#6366f1`)
- ⏳ **Backlogs**: Warm Gold (`#f59e0b`)
- 🦊 **AI Mentor**: Electric Violet & Cyan gradient (`#8b5cf6` + `#06b6d4`)

### D. `theme.js`
- Floating macOS-style bottom dock with navigation items (`Home`, `Phy`, `Chem`, `Maths`, `All`, `Track`, `Theme`).
- **Global Track Launcher:** Clicking `Track` opens the Study Hub drawer on any page, auto-injecting `studyhub.js` on demand if not present.

---

## 3. Sidebar Configuration
- Defaults to `collapsedSidebar: true` (62px icon rail).
- Prevents desktop overlap on `dashboard.html`.
- Expands smoothly on toggle or opens drawer upon tapping any view.

---

## 4. Continuity Instructions for New Chat
When starting a new session:
1. Simply tell the assistant: *"Read `PROJECT_MEMORY.md`"*.
2. The working directory is `C:\Users\piyus\Desktop\GIT REPO\tests`.
3. The local test server runs on port 8080 (`http://localhost:8080/dashboard.html`).
4. All work is already pushed to GitHub `origin/main`.
