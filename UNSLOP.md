# UI audit (unslop) — for owner approval, nothing in the UI was changed

Verdict: heavy. A redesign needs your sign-off, so this is the audit and a proposed direction only.
Counts are from `index.html` (inline CSS). No emoji in the interface and no `transition: all`.

## Signs found
- Gradients: 26 `linear-gradient`, 2 `radial-gradient`; brand gradient `--grad` used on surfaces and the play button (`.vid-play .pi`).
- Gradient text: `h2 em, h3 em`, `.grad`, `.word-sub b` (background-clip: text).
- Looping motion: 14 `infinite` animations — Ken Burns hero (`.hero-bg img`), rotating rays (`.rays`), orbit spin (`.orbit .spin`), `.emblem.alive` breathing, shimmering `.cta-main::after`, drifting `.waves`, pulsing WhatsApp button (`waPulse`, twice). Marquee (`.mq-track`) and scroll cue are fine in kind.
- Type: 52 declarations with font-weight 700–900; 11 uppercase labels; 2 negative letter-spacings (check they are on display text only).
- Blur/glass: 6 `blur(` uses.

## Proposed direction (to approve)
- Product: international school olympiads in five subjects for grades 3–11 in Kazakhstan, run by AZ GROUP.
- Character: exact, competitive, warm.
- World: exam paper, medals, sea (the Atlantia name and the wave motif already in use).
- Moment: keep the hero emblem/waves as the one rich element; make everything else quiet.
- Signature: a small stage tracker (national round -> final) used wherever dates appear.

## Plan if approved
1. Spacing to a 4px scale. 2. Replace `--grad` on surfaces/buttons with one solid accent (keep brand cyan); remove gradient text. 3. Weights to 400/500/600 with Unbounded only for display. 4. Sentence-case labels. 5. Keep only the hero motion and marquee; drop breathing, pulse, rays, orbit spin, shimmer. 6. Check contrast of the accent on buttons.
