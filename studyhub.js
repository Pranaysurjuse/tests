/* ============================================================
   Study Hub Sidebar: macOS-Style Collapsible Sidebar
   - To-do List (Today's Checklist)
   - Future Tasks (Upcoming Scheduled Tasks)
   - Backlogs (Overdue Task Rollover)
   - Progress Bar (Subject Completion & Streak Heatmap)
   ============================================================ */

(function() {
  if (document.querySelector('.sb-root')) return;

  // 1. Inject Stylesheet
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --sb-bg: rgba(13, 16, 28, 0.94);
      --sb-glass: rgba(255, 255, 255, 0.05);
      --sb-glass-hover: rgba(255, 255, 255, 0.09);
      --sb-line: rgba(255, 255, 255, 0.09);
      --sb-acc: #f59e0b; /* Amber / Orange warm CTA matching mockup */
      --sb-teal: #2dd4bf;
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
      width: 250px;
      height: 100%;
      background: var(--sb-bg);
      border: 1px solid var(--sb-line);
      border-radius: 28px;
      backdrop-filter: blur(28px) saturate(1.4);
      -webkit-backdrop-filter: blur(28px) saturate(1.4);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 18px 14px;
      transition: width 0.45s var(--sb-ease), padding 0.45s var(--sb-ease);
      position: relative;
      box-sizing: border-box;
      user-select: none;
    }
    .sb-bar.collapsed {
      width: 68px;
      padding: 18px 10px;
    }

    /* Toggle Arrow Button on edge */
    .sb-toggle-btn {
      position: absolute;
      right: -13px;
      top: 36px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #1b2138;
      border: 1.5px solid var(--sb-line);
      color: var(--sb-text);
      display: grid;
      place-items: center;
      cursor: pointer;
      font-size: 11px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      transition: transform 0.3s var(--sb-ease), background 0.2s;
      z-index: 10;
    }
    .sb-toggle-btn:hover { background: #262e4c; }
    .sb-bar.collapsed .sb-toggle-btn svg { transform: rotate(180deg); }

    /* Top traffic dots */
    .sb-mac-dots {
      display: flex;
      gap: 6px;
      padding-left: 6px;
      margin-bottom: 16px;
    }
    .sb-dot { width: 9px; height: 9px; border-radius: 50%; }
    .sb-dot-red { background: #ff5f56; }
    .sb-dot-yellow { background: #ffbd2e; }
    .sb-dot-green { background: #27c93f; }
    .sb-bar.collapsed .sb-mac-dots { justify-content: center; padding-left: 0; }

    /* Profile Section */
    .sb-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 8px 16px;
      border-bottom: 1px solid var(--sb-line);
      margin-bottom: 14px;
      overflow: hidden;
    }
    .sb-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #3b82f6);
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
      box-shadow: 0 0 14px rgba(99, 102, 241, 0.4);
    }
    .sb-user-meta { display: flex; flex-direction: column; overflow: hidden; white-space: nowrap; }
    .sb-user-role { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: var(--sb-teal); text-transform: uppercase; letter-spacing: 0.1em; }
    .sb-user-name { font-weight: 700; font-size: 13.5px; color: var(--sb-text); text-overflow: ellipsis; overflow: hidden; }
    .sb-bar.collapsed .sb-profile { padding: 4px 0 14px; justify-content: center; }
    .sb-bar.collapsed .sb-user-meta { display: none; }

    /* Menu Navigation */
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

    .sb-nav-list { display: flex; flex-direction: column; gap: 6px; }
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
      background: var(--sb-glass-hover);
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
      font-size: 16px;
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
      padding: 1px 6px;
      border-radius: 8px;
      background: rgba(245, 158, 11, 0.2);
      color: var(--sb-acc);
    }
    .sb-bar.collapsed .sb-nav-item {
      padding: 10px 0;
      justify-content: center;
    }
    .sb-bar.collapsed .sb-item-text,
    .sb-bar.collapsed .sb-item-badge { display: none; }

    /* Tooltip when collapsed */
    .sb-tooltip {
      position: absolute;
      left: 72px;
      background: #181d33;
      border: 1px solid var(--sb-line);
      color: #fff;
      font-size: 11.5px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transform: translateX(-6px);
      transition: all 0.2s var(--sb-ease);
      box-shadow: 0 6px 20px rgba(0,0,0,0.6);
      z-index: 100;
    }
    .sb-bar.collapsed .sb-nav-item:hover .sb-tooltip {
      opacity: 1;
      transform: translateX(0);
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
      transition: opacity 0.3s;
    }
    .sb-card-title { font-weight: 700; font-size: 14px; color: #fff; }
    .sb-card-desc { font-size: 11px; color: var(--sb-muted); line-height: 1.4; }
    .sb-add-btn {
      background: var(--sb-acc);
      color: #06080f;
      font-weight: 700;
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      padding: 9px;
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

    /* Collapsed Plus Button */
    .sb-collapsed-add {
      display: none;
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: var(--sb-acc);
      color: #06080f;
      font-size: 20px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      place-items: center;
      margin: 0 auto;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
      transition: transform 0.15s;
    }
    .sb-collapsed-add:active { transform: scale(0.92); }
    .sb-bar.collapsed .sb-bottom-card { display: none; }
    .sb-bar.collapsed .sb-collapsed-add { display: grid; }

    /* Slide-out Detail Drawer for Active Tab */
    .sb-detail-pane {
      position: fixed;
      top: 18px;
      bottom: 18px;
      left: 284px;
      width: min(390px, calc(100vw - 120px));
      background: rgba(14, 18, 32, 0.96);
      border: 1px solid var(--sb-line);
      border-radius: 28px;
      backdrop-filter: blur(28px) saturate(1.4);
      -webkit-backdrop-filter: blur(28px) saturate(1.4);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
      z-index: 84;
      display: flex;
      flex-direction: column;
      padding: 22px;
      box-sizing: border-box;
      transform: translateX(-20px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s var(--sb-ease);
    }
    .sb-bar.collapsed ~ .sb-detail-pane {
      left: 102px;
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
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--sb-line);
    }
    .sb-pane-title { font-weight: 700; font-size: 18px; color: #fff; }
    .sb-pane-close {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      color: var(--sb-muted);
      cursor: pointer;
      display: grid;
      place-items: center;
      font-size: 13px;
    }
    .sb-pane-close:hover { color: #fff; }

    .sb-pane-body { flex: 1; overflow-y: auto; }

    /* Common Card Styles inside Panes */
    .sb-task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 12px;
      border-radius: 12px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      margin-bottom: 8px;
      transition: all 0.2s;
    }
    .sb-task-item.done {
      background: rgba(45, 212, 191, 0.1);
      border-color: rgba(45, 212, 191, 0.3);
    }
    .sb-task-item.done .sb-task-text {
      text-decoration: line-through;
      color: var(--sb-muted);
    }
    .sb-task-check {
      width: 20px;
      height: 20px;
      border-radius: 6px;
      border: 2px solid rgba(255, 255, 255, 0.35);
      background: transparent;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .sb-task-item.done .sb-task-check {
      background: var(--sb-teal);
      border-color: var(--sb-teal);
      color: #06080f;
    }
    .sb-task-text { flex: 1; font-size: 13.5px; word-break: break-word; }
    .sb-task-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      padding: 2px 6px;
      border-radius: 6px;
      background: var(--sb-glass-hover);
      color: var(--sb-muted);
    }
    .sb-task-act {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      padding: 4px 8px;
      border-radius: 6px;
      background: var(--sb-glass);
      border: 1px solid var(--sb-line);
      color: var(--sb-text);
      cursor: pointer;
    }
    .sb-task-act:hover { background: var(--sb-glass-hover); }

    /* Progress Bar styles */
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

    /* Modal for Quick Add Task */
    .sb-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
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
      border-radius: 20px;
      padding: 24px;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    }
  `;
  document.head.appendChild(style);

  // 2. Data Store
  const STORE_KEY = 'tests_sidebar_v2';
  function loadData() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {
        collapsed: false,
        tasks: [],
        progress: { Physics: 68, Chemistry: 54, Maths: 42, Overall: 55 }
      };
    } catch (e) {
      return { collapsed: false, tasks: [], progress: { Physics: 68, Chemistry: 54, Maths: 42, Overall: 55 } };
    }
  }
  function saveData(d) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch (e) {}
  }

  const state = loadData();

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // 3. Render HTML Elements
  const root = document.createElement('div');
  root.className = 'sb-root';

  root.innerHTML = `
    <!-- Main Left Sidebar -->
    <aside class="sb-bar ${state.collapsed ? 'collapsed' : ''}" id="sbBar">
      <!-- Toggle Edge Button -->
      <button class="sb-toggle-btn" id="sbToggleBtn" aria-label="Toggle Sidebar">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div>
        <!-- Mac traffic dots -->
        <div class="sb-mac-dots">
          <div class="sb-dot sb-dot-red"></div>
          <div class="sb-dot sb-dot-yellow"></div>
          <div class="sb-dot sb-dot-green"></div>
        </div>

        <!-- Profile -->
        <div class="sb-profile">
          <div class="sb-avatar">P</div>
          <div class="sb-user-meta">
            <span class="sb-user-role">JEE Aspirant</span>
            <span class="sb-user-name">Pranay Surjuse</span>
          </div>
        </div>

        <!-- Section Label -->
        <div class="sb-section-title">Study Hub</div>

        <!-- Nav Items -->
        <nav class="sb-nav-list">
          <!-- 1. To-do List -->
          <div class="sb-nav-item" data-tab="todo">
            <div class="sb-icon-wrap">&#128203;</div>
            <span class="sb-item-text">To-do List</span>
            <span class="sb-item-badge" id="sbTodoBadge">0</span>
            <span class="sb-tooltip">To-do List</span>
          </div>

          <!-- 2. Future Tasks -->
          <div class="sb-nav-item" data-tab="future">
            <div class="sb-icon-wrap">&#128197;</div>
            <span class="sb-item-text">Future Tasks</span>
            <span class="sb-item-badge" id="sbFutureBadge">0</span>
            <span class="sb-tooltip">Future Tasks</span>
          </div>

          <!-- 3. Backlogs -->
          <div class="sb-nav-item" data-tab="backlog">
            <div class="sb-icon-wrap">&#9203;</div>
            <span class="sb-item-text">Backlogs</span>
            <span class="sb-item-badge" id="sbBacklogBadge" style="background:rgba(239,68,68,0.2); color:#f87171;">0</span>
            <span class="sb-tooltip">Backlogs</span>
          </div>

          <!-- 4. Progress Bar -->
          <div class="sb-nav-item" data-tab="progress">
            <div class="sb-icon-wrap">&#128200;</div>
            <span class="sb-item-text">Progress Bar</span>
            <span class="sb-tooltip">Progress Bar</span>
          </div>
        </nav>
      </div>

      <!-- Bottom Card -->
      <div>
        <div class="sb-bottom-card">
          <span class="sb-card-title">Let's study!</span>
          <span class="sb-card-desc">Add today's tasks and keep your streak going.</span>
          <button class="sb-add-btn" id="sbOpenAddModal">
            <span>+</span> Add New Task
          </button>
        </div>
        <button class="sb-collapsed-add" id="sbCollapsedAddBtn" title="Add Task">+</button>
      </div>
    </aside>

    <!-- Slide-out Detail Drawer for Active Tab -->
    <section class="sb-detail-pane" id="sbDetailPane">
      <div class="sb-pane-header">
        <span class="sb-pane-title" id="sbPaneHeading">To-do List</span>
        <button class="sb-pane-close" id="sbPaneClose">&times;</button>
      </div>
      <div class="sb-pane-body" id="sbPaneContent">
        <!-- Rendered dynamically -->
      </div>
    </section>

    <!-- Quick Add Task Modal -->
    <div class="sb-modal-backdrop" id="sbAddModal">
      <div class="sb-modal">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <b style="color:#fff; font-size:16px;">Add New Study Task</b>
          <button class="sb-pane-close" id="sbCloseAddModal">&times;</button>
        </div>
        <input type="text" id="sbTaskInput" placeholder="What are you studying today?" maxlength="120" style="width:100%; box-sizing:border-box; padding:12px; border-radius:10px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:14px; outline:none; margin-bottom:12px;">
        
        <div style="display:flex; gap:8px; margin-bottom:16px;">
          <select id="sbSubjSelect" style="flex:1; padding:10px; border-radius:10px; background:#1b2138; border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:12px; outline:none;">
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
            <option value="Combine">Combine</option>
            <option value="Other">Other</option>
          </select>
          <select id="sbScheduleSelect" style="flex:1; padding:10px; border-radius:10px; background:#1b2138; border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:12px; outline:none;">
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="in2days">In 2 Days</option>
            <option value="weekend">This Weekend</option>
          </select>
        </div>

        <button class="sb-add-btn" id="sbSaveTaskBtn" style="width:100%; padding:11px;">
          Add to Study Plan &rarr;
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  // 4. Interactive Logic
  const bar = document.getElementById('sbBar');
  const toggleBtn = document.getElementById('sbToggleBtn');
  const detailPane = document.getElementById('sbDetailPane');
  const paneClose = document.getElementById('sbPaneClose');
  const paneHeading = document.getElementById('sbPaneHeading');
  const paneContent = document.getElementById('sbPaneContent');

  const addModal = document.getElementById('sbAddModal');
  const openAddModal = document.getElementById('sbOpenAddModal');
  const collapsedAddBtn = document.getElementById('sbCollapsedAddBtn');
  const closeAddModal = document.getElementById('sbCloseAddModal');
  const taskInput = document.getElementById('sbTaskInput');
  const subjSelect = document.getElementById('sbSubjSelect');
  const scheduleSelect = document.getElementById('sbScheduleSelect');
  const saveTaskBtn = document.getElementById('sbSaveTaskBtn');

  let currentTab = null;

  // Toggle Collapse
  toggleBtn.onclick = () => {
    state.collapsed = !state.collapsed;
    bar.classList.toggle('collapsed', state.collapsed);
    saveData(state);
  };

  // Tab Navigation
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

  function closeDetailPane() {
    detailPane.classList.remove('open');
    document.querySelectorAll('.sb-nav-item').forEach(i => i.classList.remove('active'));
    currentTab = null;
  }

  function openTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.sb-nav-item').forEach(i => i.classList.toggle('active', i.dataset.tab === tab));
    detailPane.classList.add('open');
    renderPaneContent(tab);
  }

  function renderCounts() {
    const today = todayStr();
    const todayTasks = state.tasks.filter(t => t.date === today);
    const pendingToday = todayTasks.filter(t => !t.done).length;
    const futureTasks = state.tasks.filter(t => t.date > today).length;
    const backlogTasks = state.tasks.filter(t => t.date < today && !t.done).length;

    document.getElementById('sbTodoBadge').textContent = pendingToday;
    document.getElementById('sbFutureBadge').textContent = futureTasks;
    document.getElementById('sbBacklogBadge').textContent = backlogTasks;
  }

  function renderPaneContent(tab) {
    const today = todayStr();

    if (tab === 'todo') {
      paneHeading.textContent = '📋 Today\'s To-do List';
      const list = state.tasks.filter(t => t.date === today);
      if (!list.length) {
        paneContent.innerHTML = `
          <div style="text-align:center; padding:40px 10px; color:var(--sb-muted); font-size:13px;">
            <p>No tasks planned for today.</p>
            <button class="sb-add-btn" onclick="document.getElementById('sbOpenAddModal').click()" style="margin:12px auto;">+ Add Your First Task</button>
          </div>
        `;
      } else {
        const doneCount = list.filter(t => t.done).length;
        let html = `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--sb-glass); padding:10px 14px; border-radius:12px; border:1px solid var(--sb-line); margin-bottom:14px; font-size:13px;">
            <span>Completed: <b>${doneCount} / ${list.length}</b></span>
            <span style="font-family:'JetBrains Mono',monospace; color:var(--sb-teal);">${Math.round((doneCount/list.length)*100)}%</span>
          </div>
        `;
        list.forEach(t => {
          html += `
            <div class="sb-task-item ${t.done ? 'done' : ''}">
              <button class="sb-task-check" onclick="window.sbToggleTask('${t.id}')">${t.done ? '&#10003;' : ''}</button>
              <div class="sb-task-text">
                ${t.text}
                <div style="margin-top:3px;"><span class="sb-task-tag">${t.subject}</span></div>
              </div>
              <button class="sb-task-act" onclick="window.sbDeleteTask('${t.id}')">&times;</button>
            </div>
          `;
        });
        paneContent.innerHTML = html;
      }
    } else if (tab === 'future') {
      paneHeading.textContent = '🗓️ Future Tasks';
      const list = state.tasks.filter(t => t.date > today);
      if (!list.length) {
        paneContent.innerHTML = `
          <div style="text-align:center; padding:40px 10px; color:var(--sb-muted); font-size:13px;">
            <p>No upcoming tasks scheduled yet.</p>
            <p style="font-size:11.5px;">Schedule tasks for tomorrow or later to stay ahead!</p>
          </div>
        `;
      } else {
        let html = '';
        list.forEach(t => {
          html += `
            <div class="sb-task-item">
              <div class="sb-task-text">
                ${t.text}
                <div style="margin-top:3px;">
                  <span class="sb-task-tag">${t.subject}</span>
                  <span class="sb-task-tag" style="color:var(--sb-acc);">${t.date}</span>
                </div>
              </div>
              <button class="sb-task-act" onclick="window.sbMoveToToday('${t.id}')">&rarr; TODAY</button>
              <button class="sb-task-act" onclick="window.sbDeleteTask('${t.id}')">&times;</button>
            </div>
          `;
        });
        paneContent.innerHTML = html;
      }
    } else if (tab === 'backlog') {
      paneHeading.textContent = '⏳ Backlogs';
      const list = state.tasks.filter(t => t.date < today && !t.done);
      if (!list.length) {
        paneContent.innerHTML = `
          <div style="text-align:center; padding:40px 10px; color:var(--sb-muted); font-size:13px;">
            <p>Backlog is clean! No overdue tasks pending. &#10024;</p>
          </div>
        `;
      } else {
        let html = `<p style="font-size:12px; color:var(--sb-muted); margin-bottom:12px;">Tasks from earlier days that need attention:</p>`;
        list.forEach(t => {
          html += `
            <div class="sb-task-item" style="border-color:rgba(239,68,68,0.25);">
              <div class="sb-task-text">
                ${t.text}
                <div style="margin-top:3px;">
                  <span class="sb-task-tag">${t.subject}</span>
                  <span class="sb-task-tag" style="background:rgba(239,68,68,0.15); color:#f87171;">Overdue (${t.date})</span>
                </div>
              </div>
              <button class="sb-task-act" onclick="window.sbMoveToToday('${t.id}')">&rarr; TODAY</button>
              <button class="sb-task-act" onclick="window.sbDeleteTask('${t.id}')">&times;</button>
            </div>
          `;
        });
        paneContent.innerHTML = html;
      }
    } else if (tab === 'progress') {
      paneHeading.textContent = '📈 Progress Bar & Syllabus';
      paneContent.innerHTML = `
        <div class="sb-progress-block">
          <div class="sb-prog-head"><span>Overall Syllabus</span><span>${state.progress.Overall}%</span></div>
          <div class="sb-prog-bar"><div class="sb-prog-fill" style="width:${state.progress.Overall}%; background:linear-gradient(90deg, #6366f1, #3b82f6);"></div></div>
        </div>

        <div class="sb-progress-block">
          <div class="sb-prog-head"><span>Physics Completion</span><span>${state.progress.Physics}%</span></div>
          <div class="sb-prog-bar"><div class="sb-prog-fill" style="width:${state.progress.Physics}%; background:#34d399;"></div></div>
        </div>

        <div class="sb-progress-block">
          <div class="sb-prog-head"><span>Chemistry Completion</span><span>${state.progress.Chemistry}%</span></div>
          <div class="sb-prog-bar"><div class="sb-prog-fill" style="width:${state.progress.Chemistry}%; background:#38bdf8;"></div></div>
        </div>

        <div class="sb-progress-block">
          <div class="sb-prog-head"><span>Mathematics Completion</span><span>${state.progress.Maths}%</span></div>
          <div class="sb-prog-bar"><div class="sb-prog-fill" style="width:${state.progress.Maths}%; background:#f87171;"></div></div>
        </div>

        <div style="margin-top:20px; text-align:center; font-size:12px; color:var(--sb-muted);">
          Keep solving chapter tests to advance your completion bars!
        </div>
      `;
    }

    renderCounts();
  }

  // Global actions attached to window for inline onclicks
  window.sbToggleTask = function(id) {
    const t = state.tasks.find(x => x.id === id);
    if (t) {
      t.done = !t.done;
      saveData(state);
      renderPaneContent(currentTab);
    }
  };

  window.sbDeleteTask = function(id) {
    state.tasks = state.tasks.filter(x => x.id !== id);
    saveData(state);
    renderPaneContent(currentTab);
  };

  window.sbMoveToToday = function(id) {
    const t = state.tasks.find(x => x.id === id);
    if (t) {
      t.date = todayStr();
      saveData(state);
      renderPaneContent(currentTab);
    }
  };

  // Add Task Modal Controls
  function openModal() {
    addModal.classList.add('open');
    taskInput.value = '';
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
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      text: text,
      subject: subj,
      date: targetDate,
      done: false
    });

    saveData(state);
    closeModal();
    renderCounts();
    if (currentTab) renderPaneContent(currentTab);
  };

  // Initial load
  renderCounts();
})();
