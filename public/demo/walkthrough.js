/* Shared VS Code 3-Column Walkthrough Engine
   - Full Transition Notification Card (api.notify)
   - External Focus Ring (#scRing) + Paper-White Pointer Tag (#scTag) that NEVER covers commands
   - Dedicated Bottom Story Caption Strip (#captionBar)
   - Character-by-character Terminal typing (api.typeTerm) & steady 4.5s+ reading beats */
(function () {
  const SCENES_META = [
    { num: 1, file: 'scene1.html', short: '1. Install & Setup', title: 'Scene 1: Every Way to Install Across All 5 Agents' },
    { num: 2, file: 'scene2.html', short: '2. Live Guard', title: 'Scene 2: Live Guard — Stopping Secret Leaks & Injections' },
    { num: 3, file: 'scene3.html', short: '3. Guard Controls & Audit', title: 'Scene 3: Guard Controls, Project Rules & Audit Report' },
    { num: 4, file: 'scene4.html', short: '4. Report Tour', title: 'Scene 4: /sessioncost & Inside the HTML Report' },
    { num: 5, file: 'scene5.html', short: '5. Fix & Handover', title: 'Scene 5: Saving Tokens & Long-Chat Handover' },
    { num: 6, file: 'scene6.html', short: '6. Prices & CLI', title: 'Scene 6: Custom Prices, History & CLI Tools' }
  ];

  const HELP = '/sessioncost-help/watch/';     // the help page that lists every video and walkthrough
  const VIDEOS = {};                           // scene number -> its YouTube link, e.g. 2: 'https://youtu.be/...'; none yet

  window.initWalkthrough = function (config) {
    const sceneNum = config.sceneNum || 1;
    const steps = config.steps || [];
    const nextMeta = SCENES_META.find((s) => s.num === sceneNum + 1) || SCENES_META[0];

    document.body.innerHTML = `
      <div class="top-bar">
        <div class="top-bar-left">
          <div class="win-dots">
            <span class="win-dot r"></span>
            <span class="win-dot y"></span>
            <span class="win-dot g"></span>
          </div>
          <strong>payments-api — VS Code</strong>
          <span>—</span>
          <span class="timeline-badge" id="timelineBadge">${config.initialBadge || SCENES_META[sceneNum - 1].title}</span>
        </div>
        <div class="top-controls">
          <a href="${HELP}" class="ctrl-btn" title="Back to the help pages: every video and walkthrough">← Help</a>
          ${VIDEOS[sceneNum] ? `<a href="${VIDEOS[sceneNum]}" target="_blank" rel="noopener" class="ctrl-btn" title="Watch this as a video">▶ Video</a>` : ''}
          <select class="speed-select" id="speedSelect" title="Playback Speed">
            <option value="0.75">0.75x (Slow)</option>
            <option value="1" selected>1.0x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2.0x</option>
          </select>
          <button class="ctrl-btn" id="pauseBtn">⏸ Pause</button>
          <button class="ctrl-btn" id="restartBtn">↺ Restart</button>
          ${SCENES_META.map((s) => `
            <a href="${s.file}" class="ctrl-btn ${s.num === sceneNum ? 'active-scene' : ''}" title="${s.title}">${s.short}</a>
          `).join('')}
          <a href="${nextMeta.file}" class="ctrl-btn next-scene-btn" title="Go to ${nextMeta.title}">
            Next: ${nextMeta.short} →
          </a>
        </div>
      </div>

      <div class="substep-bar">
        <div class="substep-left" id="substepBar">
          <span class="substep-label">Jump to step:</span>
        </div>
        <span style="color:var(--muted); font-size:0.71rem;">Click any step pill to jump · Press Pause any time</span>
      </div>

      <div class="workspace">
        <!-- 1. LEFT: EXPLORER -->
        <div class="explorer-column">
          <div class="pane-header">
            <span>EXPLORER</span>
            <span>•••</span>
          </div>
          <div class="tree-section">
            <div class="tree-folder">▾ PAYMENTS-API</div>
            <div class="tree-item" id="treeReportItem" style="display:none;">
              <span>📊 5e551077.html</span>
              <span class="tree-badge badge-new">REPORT</span>
            </div>
            <div class="tree-item" id="treeGuardReportItem" style="display:none;">
              <span>🛡 guard.html</span>
              <span class="tree-badge badge-fix">AUDIT</span>
            </div>
            <div class="tree-item active" id="treeCheckout">
              <span>🐍 checkout.py</span>
              <span class="tree-badge badge-m">M</span>
            </div>
            <div class="tree-item" id="treeWebhook">
              <span>🐍 webhook.py</span>
            </div>
            <div class="tree-item" id="treeTests">
              <span>🧪 test_checkout.py</span>
            </div>
            <div class="tree-item" id="treeEnv">
              <span>🔒 .env</span>
              <span class="tree-badge badge-block" id="envBadge" style="display:none;">GUARDED</span>
            </div>
            <div class="tree-item" id="treeRules">
              <span>📝 CLAUDE.md</span>
              <span class="tree-badge badge-fix" id="rulesBadge" style="display:none;">+RULES</span>
            </div>
            <div class="tree-item" id="treeAllow">
              <span>🛡 .sessioncost-allow</span>
              <span class="tree-badge badge-new" id="allowBadge" style="display:none;">ALLOW</span>
            </div>
            <div class="tree-item" id="treeHandover" style="display:none;">
              <span>📋 payments-api.md</span>
              <span class="tree-badge badge-new">HANDOVER</span>
            </div>
          </div>
        </div>

        <!-- 2. MIDDLE: CANVAS AREA (Top) + TERMINAL (Bottom) -->
        <div class="center-column">
          <div class="canvas-area" id="canvasArea">
            <div class="editor-tabs">
              <div class="tabs-left">
                <div class="editor-tab active" id="tabCode">
                  <span style="color:#519aba;">🐍</span>
                  <span id="tabCodeLabel">checkout.py</span>
                </div>
                <div class="editor-tab" id="tabReport" style="display:none;">
                  <span>📊</span>
                  <span id="tabReportLabel">SessionCost Report — 5e551077.html</span>
                  <span style="color:#38bdf8; font-size:0.7rem; font-weight:700;">● LIVE</span>
                </div>
              </div>
              <div class="tabs-right" id="reportTabActions" style="display:none;">
                <a href="report.html" target="_blank" class="tab-action-btn" id="openFullReportLink">↗ Open in Full Browser Tab</a>
              </div>
            </div>

            <div class="breadcrumbs" id="breadcrumbBar">
              <span>payments-api</span><span>›</span><span>src</span><span>›</span><span style="color:#e6e6e6;">checkout.py</span>
            </div>

            <div class="canvas-view active" id="canvasCode">
              <div class="code-editor-body" id="codeEditorBody"></div>
            </div>

            <div class="canvas-view" id="canvasReport">
              <div class="report-iframe-wrap" id="reportIframeWrap">
                <iframe src="report.html" class="report-iframe" id="reportIframe" title="SessionCost Report"></iframe>
              </div>
            </div>
          </div>

          <div class="terminal-panel" id="terminalPanel">
            <div class="terminal-tabs">
              <div class="terminal-tabs-left">
                <span class="term-tab">PROBLEMS</span>
                <span class="term-tab">OUTPUT</span>
                <span class="term-tab">DEBUG CONSOLE</span>
                <span class="term-tab active">TERMINAL</span>
              </div>
              <span style="font-family:var(--font-mono); text-transform:none;">bash — payments-api</span>
            </div>
            <div class="terminal-body" id="terminalBody"></div>
          </div>
        </div>

        <!-- 3. RIGHT: CHAT WINDOW -->
        <div class="chat-column">
          <div class="pane-header">
            <div class="pane-header-title">
              <span>💬 CHAT</span>
            </div>
            <span class="agent-pill">Claude · Codex · Cursor · Antigravity · Copilot</span>
          </div>

          <div class="chat-stream" id="chatStream"></div>

          <div class="composer-wrap">
            <form class="composer-box" id="composerForm">
              <input
                type="text"
                class="composer-input"
                id="composerInput"
                placeholder="Ask anything, @ to mention, / for commands"
                autocomplete="off"
              />
              <div class="composer-footer">
                <span id="composerStatus">Agent Mode · SessionCost Active</span>
                <button type="submit" class="send-btn" title="Send">→</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Dedicated Bottom Story Caption Strip -->
      <div class="caption-bar" id="captionBar">
        <span class="caption-kicker" id="captionKicker">SCENE ${sceneNum}</span>
        <span class="caption-text" id="captionText">${config.initialBadge || SCENES_META[sceneNum - 1].title}</span>
      </div>

      <div class="status-bar">
        <div class="status-left">
          <span>⎇ main*</span>
          <span id="statusGuard">🛡 Live Guard: ON</span>
          <span>⚡ SessionCost 1.1</span>
        </div>
        <div class="status-right">
          <span>Scene ${sceneNum} of 6</span>
          <span>UTF-8</span>
          <span>Python 3.12</span>
        </div>
      </div>

      <!-- 1. Full Notification / Chapter Card -->
      <div class="sc-notify-backdrop" id="scNotifyBackdrop">
        <div class="sc-notify-card">
          <div class="sc-notify-kicker" id="scNotifyKicker">SESSIONCOST</div>
          <div class="sc-notify-title" id="scNotifyTitle"></div>
          <div class="sc-notify-sub" id="scNotifySub"></div>
        </div>
      </div>

      <!-- 2. External Focus Ring & Paper-White Pointer Tag (Never covers commands) -->
      <div class="sc-ring" id="scRing"></div>
      <div class="sc-tag" id="scTag">
        <span class="sc-tag-badge" id="scTagBadge">LOOK</span>
        <span id="scTagText"></span>
      </div>

      <!-- End of Scene Next Link Banner -->
      <div class="scene-next-banner" id="sceneNextBanner">
        <span>✔ Finished ${SCENES_META[sceneNum - 1].short}</span>
        <a href="${nextMeta.file}">Continue to ${nextMeta.short} →</a>
      </div>
    `;

    const chatStream = document.getElementById('chatStream');
    const terminalBody = document.getElementById('terminalBody');
    const composerInput = document.getElementById('composerInput');
    const composerForm = document.getElementById('composerForm');
    const timelineBadge = document.getElementById('timelineBadge');
    const pauseBtn = document.getElementById('pauseBtn');
    const substepBar = document.getElementById('substepBar');
    const captionKicker = document.getElementById('captionKicker');
    const captionText = document.getElementById('captionText');
    const scNotifyBackdrop = document.getElementById('scNotifyBackdrop');
    const scNotifyKicker = document.getElementById('scNotifyKicker');
    const scNotifyTitle = document.getElementById('scNotifyTitle');
    const scNotifySub = document.getElementById('scNotifySub');
    const scRing = document.getElementById('scRing');
    const scTag = document.getElementById('scTag');
    const scTagBadge = document.getElementById('scTagBadge');
    const scTagText = document.getElementById('scTagText');
    const sceneNextBanner = document.getElementById('sceneNextBanner');

    let isPaused = false;
    let playbackSpeed = 1.0;
    let runGeneration = 0; // Incremented whenever user jumps/restarts to cancel earlier async loops

    // Build substep pills
    const stepButtons = [];
    steps.forEach((st, idx) => {
      if (st.stepLabel) {
        const pill = document.createElement('button');
        pill.className = 'step-pill';
        pill.textContent = st.stepLabel;
        pill.addEventListener('click', () => jumpToStep(idx));
        substepBar.appendChild(pill);
        stepButtons.push({ idx, pill });
      }
    });

    function updateStepPills(activeIdx) {
      let currentPill = null;
      for (const sb of stepButtons) {
        if (sb.idx <= activeIdx) currentPill = sb.pill;
        sb.pill.classList.remove('active');
      }
      if (currentPill) currentPill.classList.add('active');
    }

    // Pause-aware sleep that aborts if user clicked another step (gen !== runGeneration)
    function rawWait(ms) {
      return new Promise((r) => setTimeout(r, ms));
    }

    async function sleep(ms, gen = runGeneration) {
      const slice = 80;
      let elapsed = 0;
      while (elapsed < ms / playbackSpeed) {
        if (gen !== runGeneration) throw new Error('CANCELLED');
        if (!isPaused) {
          elapsed += slice;
        }
        await rawWait(slice);
      }
      if (gen !== runGeneration) throw new Error('CANCELLED');
    }

    function setCaption(kicker, html) {
      if (kicker) captionKicker.textContent = kicker;
      if (html) captionText.innerHTML = html;
    }

    function hidePointer() {
      scRing.style.display = 'none';
      scTag.style.display = 'none';
    }

    // External Pointer: draws #scRing around targetEl and places #scTag OUTSIDE targetEl
    function showPointerOnElement(targetEl, labelText, badge = 'LOOK', preferredSide = 'auto') {
      if (!targetEl || !labelText) {
        hidePointer();
        return;
      }
      const rect = targetEl.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      const pad = 5;
      scRing.style.display = 'block';
      scRing.style.left = `${Math.max(4, rect.left - pad)}px`;
      scRing.style.top = `${Math.max(4, rect.top - pad)}px`;
      scRing.style.width = `${rect.width + pad * 2}px`;
      scRing.style.height = `${rect.height + pad * 2}px`;
      scRing.style.opacity = '1';

      scTagBadge.textContent = badge;
      scTagText.innerHTML = labelText;
      scTag.className = 'sc-tag';
      scTag.style.display = 'inline-flex';

      const tw = scTag.offsetWidth || 290;
      const th = scTag.offsetHeight || 44;

      let side = preferredSide;
      if (side === 'auto') {
        if (badge.includes('TERM')) side = 'top';             // Above Terminal panel, pointing down (▾)
        else if (badge.includes('CHAT')) side = 'left';       // Left of Chat column, pointing right (▸)
        else if (badge.includes('CANVAS')) side = 'bottom';   // Below Canvas header/line, pointing up (▴)
        else if (rect.left > tw + 36) side = 'left';
        else if (rect.top > th + 95) side = 'top';
        else side = 'right';
      }

      let left = 40;
      let top = 90;

      if (side === 'left') {
        scTag.classList.add('side-left');
        left = Math.max(12, rect.left - pad - tw - 16);
        top = Math.max(82, Math.min(window.innerHeight - th - 85, rect.top + Math.min(rect.height / 2, 45) - th / 2));
      } else if (side === 'right') {
        scTag.classList.add('side-right');
        left = Math.min(window.innerWidth - tw - 12, rect.right + pad + 16);
        top = Math.max(82, Math.min(window.innerHeight - th - 85, rect.top + Math.min(rect.height / 2, 45) - th / 2));
      } else if (side === 'top') {
        scTag.classList.add('side-top');
        left = Math.max(18, Math.min(window.innerWidth - tw - 18, rect.left + 20));
        top = Math.max(80, rect.top - pad - th - 14);
      } else {
        scTag.classList.add('side-bottom');
        left = Math.max(18, Math.min(window.innerWidth - tw - 18, rect.left + 20));
        top = Math.min(window.innerHeight - th - 85, rect.bottom + pad + 14);
      }

      scTag.style.left = `${left}px`;
      scTag.style.top = `${top}px`;
    }

    async function pointAndHold(targetEl, labelText, badge = 'LOOK', holdMs = 4400, gen = runGeneration, preferredSide = 'auto') {
      setCaption(badge, labelText);
      showPointerOnElement(targetEl, labelText, badge, preferredSide);
      const pulses = Math.max(4, Math.floor(holdMs / 450));
      for (let i = 0; i < pulses; i++) {
        scRing.style.opacity = i % 2 === 1 ? '0.6' : '1';
        await sleep(450, gen);
      }
      hidePointer();
    }

    async function showNotificationCard(kicker, title, subtitle, holdMs = 3100, gen = runGeneration) {
      hidePointer();
      setCaption(kicker, `<strong>${title}</strong> — ${subtitle}`);
      scNotifyKicker.textContent = kicker;
      scNotifyTitle.innerHTML = title;
      scNotifySub.innerHTML = subtitle;
      scNotifyBackdrop.style.display = 'grid';
      await sleep(holdMs, gen);
      scNotifyBackdrop.style.display = 'none';
    }

    function renderDefaultCode(extraLinesHtml = '') {
      const body = document.getElementById('codeEditorBody');
      document.getElementById('tabCodeLabel').textContent = 'checkout.py';
      document.getElementById('breadcrumbBar').innerHTML = '<span>payments-api</span><span>›</span><span>src</span><span>›</span><span style="color:#e6e6e6;">checkout.py</span>';
      body.innerHTML = `
        <div class="code-line"><span class="ln">1</span><span><span class="kw">import</span> os</span></div>
        <div class="code-line"><span class="ln">2</span><span><span class="kw">import</span> hmac</span></div>
        <div class="code-line"><span class="ln">3</span><span><span class="kw">from</span> fastapi <span class="kw">import</span> APIRouter, Request, HTTPException</span></div>
        <div class="code-line"><span class="ln">4</span><span></span></div>
        <div class="code-line"><span class="ln">5</span><span>router = <span class="fn">APIRouter</span>()</span></div>
        <div class="code-line"><span class="ln">6</span><span>WEBHOOK_SECRET = os.<span class="fn">getenv</span>(<span class="str">"STRIPE_WEBHOOK_SECRET"</span>)</span></div>
        <div class="code-line"><span class="ln">7</span><span></span></div>
        <div class="code-line"><span class="ln">8</span><span><span class="cmt"># Verify Stripe signature header before processing order</span></span></div>
        <div class="code-line"><span class="ln">9</span><span>@router.<span class="fn">post</span>(<span class="str">"/webhooks/stripe"</span>)</span></div>
        <div class="code-line"><span class="ln">10</span><span><span class="kw">async def</span> <span class="fn">stripe_webhook</span>(<span class="var">request</span>: Request):</span></div>
        <div class="code-line"><span class="ln">11</span><span>    payload = <span class="kw">await</span> request.<span class="fn">body</span>()</span></div>
        <div class="code-line"><span class="ln">12</span><span>    sig_header = request.headers.<span class="fn">get</span>(<span class="str">"stripe-signature"</span>)</span></div>
        ${extraLinesHtml}
        <div class="code-line"><span class="ln">16</span><span>    <span class="kw">return</span> {<span class="str">"status"</span>: <span class="str">"received"</span>}</span></div>
      `;
    }

    function showCustomFileInCanvas(fileName, crumbPath, lines) {
      switchCanvasTab('code');
      document.getElementById('tabCodeLabel').textContent = fileName;
      document.getElementById('breadcrumbBar').innerHTML = crumbPath;
      const body = document.getElementById('codeEditorBody');
      body.innerHTML = lines.map((l, i) => `
        <div class="code-line ${l.added ? 'added' : ''}">
          <span class="ln">${i + 1}</span>
          <span>${l.html}</span>
        </div>
      `).join('');
    }

    function switchCanvasTab(target, reportSrc = 'report.html', reportLabel = 'SessionCost Report — 5e551077.html') {
      const tabCode = document.getElementById('tabCode');
      const tabReport = document.getElementById('tabReport');
      const canvasCode = document.getElementById('canvasCode');
      const canvasReport = document.getElementById('canvasReport');
      const reportTabActions = document.getElementById('reportTabActions');
      const iframe = document.getElementById('reportIframe');

      if (target === 'report') {
        if (iframe.getAttribute('src') !== reportSrc) {
          iframe.setAttribute('src', reportSrc);
        }
        document.getElementById('tabReportLabel').textContent = reportLabel;
        document.getElementById('openFullReportLink').setAttribute('href', reportSrc);
        tabReport.style.display = 'inline-flex';
        tabReport.classList.add('active');
        tabCode.classList.remove('active');
        canvasReport.classList.add('active');
        canvasCode.classList.remove('active');
        reportTabActions.style.display = 'flex';
        document.getElementById('breadcrumbBar').innerHTML = `<span>~/.sessioncost</span><span>›</span><span>reports</span><span>›</span><span style="color:#4daafc;">${reportLabel}</span>`;
        if (reportSrc.includes('guard.html')) {
          document.getElementById('treeGuardReportItem').style.display = 'flex';
        } else {
          document.getElementById('treeReportItem').style.display = 'flex';
        }
      } else {
        tabCode.classList.add('active');
        tabReport.classList.remove('active');
        canvasCode.classList.add('active');
        canvasReport.classList.remove('active');
        reportTabActions.style.display = 'none';
      }
    }

    document.getElementById('tabCode').addEventListener('click', () => switchCanvasTab('code'));
    document.getElementById('tabReport').addEventListener('click', () => switchCanvasTab('report'));

    // Character-by-character terminal command typing + output + external arrow highlight
    async function typeTerminalCommand(cmd, output, statusColor, arrowText, holdMs = 4600, gen = runGeneration) {
      const entry = document.createElement('div');
      entry.className = 'term-entry';
      const cmdSpan = document.createElement('span');
      cmdSpan.className = 'term-cmd';
      const curSpan = document.createElement('span');
      curSpan.className = 'term-cursor';

      entry.innerHTML = `<div><span class="term-prompt">dev@payments-api</span>:<span style="color:#4daafc;">~/payments-api</span>$ </div>`;
      entry.firstChild.appendChild(cmdSpan);
      entry.firstChild.appendChild(curSpan);
      terminalBody.appendChild(entry);
      terminalBody.scrollTop = terminalBody.scrollHeight;

      setCaption('TERMINAL', `Running: <code>${cmd}</code>`);
      showPointerOnElement(entry, `Typing command: ${cmd}`, 'TERMINAL', 'top');

      const charDelay = cmd.length > 45 ? 24 : 42;
      for (let i = 1; i <= cmd.length; i++) {
        cmdSpan.textContent = cmd.slice(0, i);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        await sleep(charDelay, gen);
      }
      await sleep(350, gen);
      curSpan.remove();

      if (output) {
        const outDiv = document.createElement('div');
        outDiv.className = 'term-out';
        if (statusColor) outDiv.style.color = statusColor;
        outDiv.textContent = output;
        entry.appendChild(outDiv);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }

      const callout = arrowText || `Output from ${cmd.split(' ')[0]}`;
      await pointAndHold(entry, callout, 'TERMINAL', holdMs, gen, 'top');
      return entry;
    }

    async function typeChatMessage(text, gen = runGeneration) {
      composerInput.value = '';
      composerForm.classList.add('focus');
      setCaption('CHAT INPUT', `You type: <code>${text}</code>`);
      showPointerOnElement(composerForm, `You type: "${text}"`, 'CHAT INPUT', 'left');

      const charDelay = text.length > 32 ? 32 : 55;
      for (let i = 1; i <= text.length; i++) {
        composerInput.value = text.slice(0, i);
        await sleep(charDelay, gen);
      }
      await sleep(450, gen);
      composerForm.classList.remove('focus');
      composerInput.value = '';
      hidePointer();

      const turn = document.createElement('div');
      turn.className = 'msg-turn';
      turn.innerHTML = `<div class="user-msg">${text}</div>`;
      chatStream.appendChild(turn);
      chatStream.scrollTop = chatStream.scrollHeight;
      await sleep(500, gen);
      return turn;
    }

    async function appendAgentTurnAndHold(html, arrowText, holdMs = 4600, gen = runGeneration) {
      const turn = document.createElement('div');
      turn.className = 'msg-turn';
      turn.innerHTML = `<div class="agent-msg">${html}</div>`;
      chatStream.appendChild(turn);
      chatStream.scrollTop = chatStream.scrollHeight;
      const callout = arrowText || 'SessionCost & Agent reply in Chat';
      await pointAndHold(turn, callout, 'CHAT', holdMs, gen, 'left');
      return turn;
    }

    // Build API supporting both async step functions and queued beats
    let pendingAsyncTasks = null;

    function queueTask(asyncFn) {
      if (pendingAsyncTasks) {
        pendingAsyncTasks.push(asyncFn);
      } else {
        asyncFn(runGeneration).catch(() => {});
      }
    }

    const api = {
      setBadge(text) {
        timelineBadge.textContent = text;
      },
      setGuardStatus(text) {
        document.getElementById('statusGuard').textContent = text;
      },
      showTreeBadge(id, show = true) {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? 'inline-block' : 'none';
      },
      showTreeItem(id, show = true) {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? 'flex' : 'none';
        return el;
      },
      notify(kicker, title, subtitle, holdMs = 3200) {
        queueTask((gen) => showNotificationCard(kicker, title, subtitle, holdMs, gen));
      },
      appendUserBubble(text) {
        // If st.type already typed & appended this exact bubble, skip duplicate bubble
        const lastUser = chatStream.querySelector('.msg-turn:last-child .user-msg');
        if (lastUser && lastUser.textContent === text) return;
        const turn = document.createElement('div');
        turn.className = 'msg-turn';
        turn.innerHTML = `<div class="user-msg">${text}</div>`;
        chatStream.appendChild(turn);
        chatStream.scrollTop = chatStream.scrollHeight;
      },
      appendTerminal(cmd, output, statusColor = '', arrowText = null) {
        queueTask((gen) => typeTerminalCommand(cmd, output, statusColor, arrowText, 4600, gen));
      },
      appendAgentTurn(html, arrowText = null) {
        queueTask((gen) => appendAgentTurnAndHold(html, arrowText, 4600, gen));
      },
      openReportInCanvas(arrowText = null, reportSrc = 'report.html', reportLabel = 'SessionCost Report — 5e551077.html') {
        queueTask(async (gen) => {
          switchCanvasTab('report', reportSrc, reportLabel);
          const tabEl = document.getElementById('tabReport');
          await pointAndHold(
            tabEl,
            arrowText || `Opened ${reportLabel} in Canvas Area`,
            'CANVAS REPORT',
            4600,
            gen,
            'bottom'
          );
        });
      },
      showCodeInCanvas(extraLinesHtml = '', arrowText = null) {
        queueTask(async (gen) => {
          switchCanvasTab('code');
          renderDefaultCode(extraLinesHtml);
          const addedLine = document.querySelector('#codeEditorBody .code-line.added') || document.getElementById('tabCode');
          await pointAndHold(
            addedLine,
            arrowText || 'Updated checkout.py in Canvas Editor',
            'CANVAS CODE',
            4200,
            gen,
            'bottom'
          );
        });
      },
      showCustomFileInCanvas(fileName, crumbPath, lines, arrowText = null) {
        queueTask(async (gen) => {
          showCustomFileInCanvas(fileName, crumbPath, lines);
          const targetLine = document.querySelector('#codeEditorBody .code-line.added') || document.getElementById('tabCode');
          await pointAndHold(
            targetLine,
            arrowText || `Viewing ${fileName} in Canvas Area`,
            'CANVAS FILE',
            4400,
            gen,
            'bottom'
          );
        });
      },
      driveReport(viewName, arrowText = null) {
        queueTask(async (gen) => {
          switchCanvasTab('report');
          const iframe = document.getElementById('reportIframe');
          if (iframe && iframe.contentWindow) {
            try {
              const doc = iframe.contentWindow.document;
              const click = (sel) => { const e = doc && doc.querySelector(sel); if (e) e.click(); };
              if (viewName === 'overview') {
                click('#pClose'); click('#agentsBack'); click('#skyBack'); click('#mBoard');
                iframe.contentWindow.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (viewName === 'step0') {
                click('#pClose'); click('#agentsBack'); click('#skyBack'); click('#mBoard');
                const b = doc && doc.querySelector('#board');
                if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const s0 = doc && doc.querySelector('#board [aria-label^="Step 0"]');
                if (s0) s0.click();
              } else if (viewName === 'turn6') {
                click('#pClose'); click('#agentsBack'); click('#skyBack'); click('#mTable');
                const rows = doc && doc.querySelectorAll('#turnTable tbody tr');
                if (rows && rows[5]) rows[5].click();
              } else if (viewName === 'charts') {
                click('#pClose'); click('#agentsBack'); click('#skyBack'); click('#mCharts');
                const sp = doc && doc.querySelector('#secPath');
                if (sp) sp.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else if (viewName === 'agents') {
                click('#pClose'); click('#skyBack'); click('[data-agents]');
              } else if (viewName === 'sky') {
                click('#pClose'); click('#agentsBack'); click('#sideNav [data-sky]');
              }
            } catch (e) {}
          }
          await pointAndHold(
            document.getElementById('tabReport'),
            arrowText || `Report View in Canvas: ${viewName}`,
            'CANVAS REPORT',
            4800,
            gen,
            'bottom'
          );
        });
      }
    };

    function resetState() {
      hidePointer();
      scNotifyBackdrop.style.display = 'none';
      sceneNextBanner.style.display = 'none';
      chatStream.innerHTML = '';
      terminalBody.innerHTML = '';
      composerInput.value = '';
      composerForm.classList.remove('focus');
      document.getElementById('tabReport').style.display = 'none';
      document.getElementById('treeReportItem').style.display = 'none';
      document.getElementById('treeGuardReportItem').style.display = 'none';
      document.getElementById('treeHandover').style.display = 'none';
      document.getElementById('envBadge').style.display = 'none';
      document.getElementById('rulesBadge').style.display = 'none';
      document.getElementById('allowBadge').style.display = 'none';
      document.getElementById('statusGuard').textContent = '🛡 Live Guard: ON';
      renderDefaultCode();
      switchCanvasTab('code');
    }

    async function playFromStep(startIdx, gen) {
      try {
        for (let i = startIdx; i < steps.length; i++) {
          if (gen !== runGeneration) return;
          const st = steps[i];
          updateStepPills(i);
          if (st.badge) {
            timelineBadge.textContent = st.badge;
            setCaption(`STEP ${i + 1}`, st.badge);
          }

          if (st.notify) {
            await showNotificationCard(
              st.notify.kicker || `STEP ${i + 1}`,
              st.notify.title,
              st.notify.subtitle || '',
              st.notify.holdMs || 3200,
              gen
            );
          }

          if (st.type) {
            await typeChatMessage(st.type, gen);
          }

          pendingAsyncTasks = [];
          if (st.run) st.run(api);
          const tasks = pendingAsyncTasks;
          pendingAsyncTasks = null;

          for (const taskFn of tasks) {
            if (gen !== runGeneration) return;
            await taskFn(gen);
          }

          await sleep(600, gen);
        }

        if (gen === runGeneration) {
          hidePointer();
          setCaption('COMPLETE', `Finished ${SCENES_META[sceneNum - 1].short} — Click "Continue to ${nextMeta.short} →"`);
          sceneNextBanner.style.display = 'flex';
        }
      } catch (err) {
        // Cancelled by jumpToStep or restart
      }
    }

    function jumpToStep(idx) {
      runGeneration++;
      const myGen = runGeneration;
      isPaused = false;
      pauseBtn.textContent = '⏸ Pause';
      resetState();
      playFromStep(idx, myGen);
    }

    document.getElementById('speedSelect').addEventListener('change', (e) => {
      playbackSpeed = parseFloat(e.target.value) || 1.0;
    });

    document.getElementById('restartBtn').addEventListener('click', () => jumpToStep(0));

    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
    });

    composerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = composerInput.value.trim();
      if (!val) return;
      composerInput.value = '';
      api.appendUserBubble(val);
    });

    jumpToStep(0);
  };
})();
