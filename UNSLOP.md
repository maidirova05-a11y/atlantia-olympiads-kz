# UI audit (unslop) — approved and applied to index.html

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

## Done (owner approved)
Direction used as proposed: exact, competitive, warm; sea and exam world; hero emblem and waves are the one rich moment; the existing stage timeline (national round -> final) is the signature, restyled as quiet solid markers.
- Spacing: every padding, margin and gap on the 4px scale; radii on a 12/16/20/24 scale.
- Color: `--grad` is now solid brand cyan (#2FE3D2, dark text on it, well above 4.5:1). Removed all hue gradients on surfaces, buttons, bars, timeline and level rows (26 -> 7 `linear-gradient`, all image scrims or the scroll-fill text reveal), the radial washes, glows and colored shadows.
- Gradient text removed from `h2 em`, `.grad`, `.word-sub b` and the hero wordmark (now solid; the scroll-fill text on the statement stays, it is a two-tone reveal, not a hue gradient).
- Type: weights 700-900 -> 500/600 (declarations 52 -> 0 above 600), uppercase tracked labels -> sentence case (11 -> 0), no negative tracking on small text, body 16px.
- Copy: exclamation marks removed from the lead-form success message (RU/KK/EN). All other text unchanged.
- Motion: removed Ken Burns, rays, orbit spin, emblem breathing, wordmark shine loop, CTA shimmer, WhatsApp/consult/video pulses, magnetic CTA, elastic/back easings and card hover lifts. Kept: the one intro, wave drift, marquee. One easing curve, named transitions only (14 -> 4 `infinite`).
- Blur/glass: 6 -> 1 (only the modal backdrop dimming).
- Unchanged: content, section order, SEO, API contract, prices and dates, tracking IDs, AVIF/WebP and fonts. `assets/app.js` changed, so its `?v=` hash was regenerated with `npm run version-assets`.
- Not done: no generated hero visual (no image generation tool was usable here); the existing emblem and photos stay. `polozhenie.html` and `oferta.html` have their own CSS and were not restyled.
