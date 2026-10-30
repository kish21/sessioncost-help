/* The report tour: Driver.js walks a highlighter over the demo report, one part at a time.
   Starts by itself when the address ends in ?tour; the "Take the tour" button starts it again. */
(function () {
	const $ = (s) => document.querySelector(s);
	const shown = (el) => el && el.getClientRects().length > 0;
	const turnTile = () => $('#board [aria-label^="Turn 3:"]');   // the board draws each turn as a labelled shape

	const STEPS = [
		{ title: 'A SessionCost report', description: 'This is the report for a made-up chat: 12 turns building a small to-do app. Use Next, or the arrow keys, to walk through it.' },
		{ el: () => $('#ansH'), title: 'The answer first', description: 'How many tokens this chat sent, and how many it would have sent with the fixes. Every message re-sends the whole chat, so most of this is old conversation sent again.' },
		{ el: () => $('#ba'), title: 'Now, and after the fixes', description: 'Blue is what the chat needed. The orange stripes are what the fixes would cut.' },
		{ el: () => $('#top3'), title: 'The biggest fixes', description: 'The three changes worth the most, each with its saving. "Show me on the board" lights up the turns it touches; "How to fix it" jumps to the rule.' },
		{ el: () => $('#sideKpi'), title: 'The key numbers stay here', description: 'Tokens sent, turns and calls, cost and time, always in view while you scroll. Each ⓘ explains its number.' },
		{ el: () => $('#board'), title: 'The path', description: 'Every turn of the chat as a tile, from Step 0 (what the agent sends before you type) to the last turn. The red bar under a turn shows how heavy it was.' },
		{ el: turnTile, title: 'Tap a turn', description: 'A tap opens the turn panel: what you said, what the agent did, every call, and where the money went.' },
		{ el: () => $('#secFixes'), title: 'How to save', description: 'Every fix with its saving and a rule to paste to your agent. Tick "I did this" and the report stops repeating it.' },
		{ el: () => $('.help'), title: 'Lost? Press ?', description: 'Every section has a ? beside its name. It opens that section’s page on this help site.' },
		{ el: () => $('#sideNav'), title: 'Jump between sections', description: 'Including the Trace & risk map: every step the agent took, with the risky ones lit up.' },
		{ el: () => $('#theme'), title: 'Light or dark', description: 'The report remembers your choice.' },
		{ title: 'Now try your own', description: 'Type /sessioncost at the end of any chat, and your own report opens. Close this tour to look around the demo.' },
	];

	function start() {
		const steps = STEPS.filter((s) => !s.el || shown(s.el())).map((s) => ({
			element: s.el ? s.el() : undefined,
			popover: { title: s.title, description: s.description },
		}));
		const tour = window.driver.js.driver({
			showProgress: true,
			progressText: '{{current}} of {{total}}',
			nextBtnText: 'Next →',
			prevBtnText: '← Back',
			doneBtnText: 'Done',
			popoverClass: 'sc-tour',
			stagePadding: 6,
			stageRadius: 10,
			steps,
		});
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
