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
- **JEE Study Tracker Sidebar Component:** Integrated the exact dark-gradient sidebar component:
  - Dynamic Time & Desk header (Morning/Afternoon/Evening/Night Desk)
  - Active Streak badge (`🔥 14 Days`)
  - Circular Gauge Target Card with dynamic SVG arc (`0 / 3 Done`, completion %, and countdown guidance)
  - Coaching Lecture Revision list with PHY/CHEM/MATH subject badges, lecture notes, and one-tap completion toggle
  - Dedicated `toggleSyllabusModal()` manager dialog for updating coaching revisions and one-click launch of the full Akiva Study Hub drawer.
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
  5. **📈 Progress Bar & 83 JEE Chapters Matrix:**
     - Restored the authentic syllabus progress visualizer (completely removed the AI Mentor chatbot/quiz/picks per user preference).
     - **Dual Circular Gauges:** JEE Mains and JEE Advanced syllabus coverage gauges with orbiting subject nodes for Chemistry, Physics, and Mathematics.
     - **83 JEE Chapters Checklist:** Interactive checklist covering all 83 chapters across Physics (28), Chemistry (30), and Mathematics (25) with branch breakdown, completion checkmarks, live stats, and 1-tap `+ Plan` task scheduler.

### C. Multi-Color Subject & Category Theme System
Eliminated the monotone black/amber UI in favor of vibrant, distinct colors:
- ⚡ **Physics**: Electric Cyan (`#38bdf8`)
- 🧪 **Chemistry**: Emerald Mint (`#34d399`)
- ∑ **Mathematics**: Radiant Purple (`#c084fc`)
- 📋 **Today's Tasks**: Vibrant Coral (`#f43f5e`)
- 🗓️ **Future Tasks**: Royal Indigo (`#6366f1`)
- ⏳ **Backlogs**: Warm Gold (`#f59e0b`)
- 📈 **Progress Bar**: Emerald & Cyan glow (`#10b981` + `#38bdf8`)

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
