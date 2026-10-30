/* The report tour: Driver.js walks a highlighter over every part of the demo report, opening the views it explains
   (the turn panel, the charts, Agent flow, the Trace & risk map) on the way. It plays by itself: each step moves on
   after a few seconds; Pause stops it, Next and Back still work. Starts by itself when the address ends in ?tour. */
(function () {
	const $ = (s) => document.querySelector(s);
	const click = (s) => { const e = $(s); if (e) e.click(); };
	const wide = () => window.innerWidth > 1024;   // narrower, the sidebar's numbers and sections are hidden

	/* each step names the view it needs; setView opens it, closing whatever was open before */
	let view = 'report';
	function setView(v) {
		if (v === view) return;
		if (view === 'panel') click('#pClose');
		if (view === 'panel' || view === 'charts') click('#mBoard');
		if (view === 'agents') click('#agentsBack');
		if (view === 'sky') click('#skyBack');
		if (v === 'panel') {
			click('#mTable');
			const row = document.querySelectorAll('#turnTable tbody tr')[4];
			if (row) row.click();
		}
		if (v === 'charts') click('#mCharts');
		if (v === 'agents') click('[data-agents]');
		if (v === 'sky') click('#sideNav [data-sky]');
		view = v;
	}

	const STEPS = [
		{ title: 'A SessionCost report', text: 'This is the report for a made-up chat: 12 turns building a small to-do app. The tour plays by itself and opens each part of the report for you. Pause it any time.' },
		{ el: '#ansH', title: 'The answer first', text: 'How many tokens this chat sent, and how many it would have sent with the fixes. Every message re-sends the whole chat, so most of this is old conversation sent again.' },
		{ el: '#ba', title: 'Now, and after the fixes', text: 'Blue is what the chat needed. The orange stripes are what the fixes would cut.' },
		{ el: '#top3', title: 'The biggest fixes', text: 'The three changes worth the most, each with its saving. "Show me on the board" lights up the turns it touches; "How to fix it" jumps to the rule.' },
		{ el: '#sideKpi', wide: true, title: 'The key numbers stay here', text: 'Tokens sent, turns and calls, cost and time, always in view while you scroll. Each ⓘ explains its number.' },
		{ el: '#board', title: 'The path', text: 'Every turn as a tile, from Step 0 to the last turn. The red bar under a turn shows how heavy it was; red outlines mark the three heaviest.' },
		{ el: () => $('#board [aria-label^="Step 0"]') || $('#board'), title: 'Step 0', text: 'What the agent sends before you type a word: its instructions, its tools, your rules files. It is sent again with every call, so a big Step 0 costs on every turn. Tap it to see what is inside.' },
		{ view: 'panel', el: '#panel', title: 'The turn panel', text: 'Tap any turn and this opens: what you said, what it cost, how long the agent worked, where the money went, and the dearest call. The tabs show what it did and every call.' },
		{ view: 'charts', el: '#secPath', title: 'Charts', text: 'The same chat as charts: cost per call, the running total, chat size against price, breaks, the dearest turns and where the time went.' },
		{ view: 'agents', el: '#stages', title: 'Agent flow', text: 'Which agents worked in the chat, what each one did, what it touched, and what it handed back. Helpers cost tokens too.' },
		{ el: '#secFixes', title: 'How to save', text: 'Every fix with its saving and a rule to paste to your agent. Tick "I did this" and the report stops repeating it.' },
		{ el: '#secSafety', title: 'Safety rules', text: 'When the agent took risky steps, here are the rules that would have stopped them, ready to paste.' },
		{ view: 'sky', el: '#skyWatch', title: 'Trace & risk map: what to check', text: 'The kinds of risky steps found in the chat, such as installs, network use, or a step taken right after reading outside content. Tap one to light those steps up.' },
		{ view: 'sky', el: '#sky', title: 'Every step, on one map', text: 'Each turn is a star of its calls; the small dots are tool steps. Red stars are the steps to check. Point at one to see what it did and why it is marked.' },
		{ view: 'sky', el: '#skyGuard', title: 'The guard', text: 'With the live guard on, risky steps are stopped or asked about while the agent works, not found afterwards. Type /livesession at the start of a chat (Claude Code).' },
		{ el: '.help', title: 'Lost? Press ?', text: 'Every section has a ? beside its name. It opens that section’s page on this help site.' },
		{ el: '#theme', title: 'Light or dark', text: 'The report opens light. The switch changes it, and the report remembers your choice.' },
		{ title: 'Now try your own', text: 'Type /sessioncost at the end of any chat, and your own report opens. Close this tour to look around the demo.' },
	];

	let tour = null, timer = null, playing = true, steps = [];
	const find = (s) => (typeof s.el === 'function' ? s.el() : $(s.el));
	const wait = (s) => Math.min(10000, 3500 + 40 * s.text.length);
	const stop = () => { clearTimeout(timer); timer = null; };

	function go(i) {
		stop();
		if (i < 0) return;
		if (i >= steps.length) { tour.destroy(); return; }
		setView(steps[i].view || 'report');
		setTimeout(() => tour.moveTo(i), 350);   // the view draws first, then the highlighter moves to it
	}
	function schedule() {
		stop();
		const i = tour.getActiveIndex();
		if (playing && i != null && i < steps.length - 1) timer = setTimeout(() => go(i + 1), wait(steps[i]));
	}

	function start() {
		if (tour && tour.isActive()) return;
		playing = true;
		steps = STEPS.filter((s) => !(s.wide && !wide()) && (!s.el || s.view || find(s)));
		tour = window.driver.js.driver({
			showProgress: true,
			progressText: '{{current}} of {{total}}',
			nextBtnText: 'Next →',
			prevBtnText: '← Back',
			doneBtnText: 'Done',
			popoverClass: 'sc-tour',
			stagePadding: 6,
			stageRadius: 10,
			steps: steps.map((s) => ({ element: s.el ? () => find(s) : undefined, popover: { title: s.title, description: s.text } })),
			onNextClick: () => go(tour.getActiveIndex() + 1),
			onPrevClick: () => go(tour.getActiveIndex() - 1),
			onHighlighted: schedule,
			onPopoverRender: (pop) => {
				const b = document.createElement('button');
				b.type = 'button';
				b.className = 'sc-tour-play';
				b.textContent = playing ? '⏸ Pause' : '▶ Play';
				b.addEventListener('click', () => { playing = !playing; b.textContent = playing ? '⏸ Pause' : '▶ Play'; playing ? schedule() : stop(); });
				pop.footerButtons.prepend(b);
			},
			onDestroyed: () => { stop(); setView('report'); },
		});
		setView('report');
		tour.drive();
	}

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'sc-tour-btn';
	btn.textContent = '▶ Take the tour';
	btn.addEventListener('click', start);
	document.body.append(btn);

	if (/[?&]tour\b/.test(location.search)) setTimeout(start, 400);
})();
