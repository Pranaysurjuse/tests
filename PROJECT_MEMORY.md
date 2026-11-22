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
- **Clean Centered Page Layout:** Removed the temporary inline floating card column; the page layout is now clean, centered, and beautifully spaced with desktop padding-left (`@media (min-width: 800px) { body { padding-left: 90px; } }`) to accommodate the macOS left sidebar.
- **Upgraded Vector Badges:** Replaced boring text emojis with custom glowing SVGs:
  - ⚛️ **Physics**: Quantum Rutherford-Bohr Atom with electron orbital paths (Electric Cyan glow)
  - 🧪 **Chemistry**: Molecular Benzene Hexagonal Lattice with delocalized pi ring (Emerald Mint glow)
  - 🧊 **Mathematics**: 3D Isometric Hypercube tesseract (Radiant Purple glow)
  - 💎 **Combine**: Layered Crystalline Prism stack (Amber glow)
  - 🚀 **Diwali Tracker**: Supersonic Starburst badge

### B. `studyhub.js`
- **Clean macOS Sidebar Launcher:**
  - Standard macOS 3-dot window controls and Pranay Surjuse profile avatar (`PS`, `JEE ASPIRANT`).
  - 4 Clean Vertical Nav Items:
    - 📋 **Today's Tasks** (with badge & flyout)
    - 🗓️ **Future Tasks** (with badge & flyout)
    - ⏳ **Backlogs** (with badge & flyout)
    - 📈 **Progress Bar** (with % badge & flyout)
  - Bottom Card: "Let's study! Creating or adding new tasks couldn't be easier" with `+ Add New Task` pill button.
  - Collapses smoothly into the 62px compact icon rail via the toggle edge chevron (`‹` / `›`).
  - Completely removed the experimental tracker / coaching revision widget additions per user request.
- **Exact 1:1 Akiva Mobile Drawer Replication:**
  1. **📋 Today's Progress:** Circular Speedo dial ring, task cards with `[L]`, `[P]`, `[R]` mode tags, level selector, and edit modal.
  2. **➕ Add Topics:** Chapter search across all 83 chapters with mode and level selectors.
  3. **⏳ Backlogs Recovery:** 7-day backlog tracking range with `⚡ Move to Today`.
  4. **🗓️ Future Tasks:** 7-day horizontal scrollable calendar strip.
  5. **📈 Progress Bar & 83 JEE Chapters Matrix:** Dual circular gauges (JEE Mains and Advanced) and interactive 83-chapter syllabus checklist.
- **AI Mentor:** 100% permanently removed.
- **AI Mentor:** 100% removed.

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
