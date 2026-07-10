# imnot.tech // we don't know what we're building yet

> A mysterious, hyper-hyped technology company from the year 2077. Building something revolutionary. Status: unclear. ETA: forever.

`imnot.tech` is a **vaporware parody / startup satire landing page** — a fictional tech brand that looks impossibly advanced (cyberpunk, neon, holographic, sci-fi dashboard) but is very self-aware about shipping nothing. It's a design playground that mixes premium futuristic presentation (Apple-keynote-meets-Unreal-Engine) with absurdist startup humor and indie-hacker culture.

The whole site is built **procedurally** — every visual is rendered with **canvas + CSS + SVG** (no heavy 3D libraries, no external image dependencies), so it stays lightweight and never breaks on missing assets. The only image is the brand logo.

---

## Tech stack

| Layer        | Choice |
|--------------|--------|
| Framework    | **Next.js 16.2.10** (App Router) |
| UI           | **React 19** |
| Styling      | **Tailwind CSS v4** (CSS-first config) |
| Language     | **TypeScript** |
| Fonts        | `next/font/google`: Orbitron, JetBrains Mono, Share Tech Mono, Inter |
| Effects      | Hand-rolled `<canvas>` + CSS (no three.js / WebGL deps) |

```bash
npm install      # install deps
npm run dev      # http://localhost:3000  (hot reload)
npm run build    # production build
npm run start    # serve the production build
```

> Requires Node 22+ (Next.js 16). Fonts are fetched from Google Fonts at build time (needs internet on first build).

---

## Project structure

```
imnot-tech/
├── app/
│   ├── layout.tsx        # fonts, metadata, favicon (/logo.png)
│   ├── page.tsx          # assembles all sections + fixed "hiring" badge
│   └── globals.css       # cyberpunk theme: neon tokens, glitch, scanlines, HUD, grid
├── components/
│   ├── effects/          # canvas / motion visuals
│   │   ├── BinaryRain.tsx   # falling 0/1 matrix rain
│   │   ├── AICore.tsx       # floating AI core orb
│   │   ├── DataViz.tsx      # sci-fi dashboard charts
│   │   ├── GlitchText.tsx   # RGB-split glitch heading
│   │   ├── HexFeed.tsx      # streaming random hex telemetry
│   │   └── Scanlines.tsx    # CRT scanline + vignette overlay
│   ├── ui/               # building blocks
│   │   ├── HudFrame.tsx     # labeled HUD panel frame
│   │   ├── TerminalLog.tsx  # funny terminal error log
│   │   ├── AbsurdProgress.tsx # progress bar that makes no sense
│   │   ├── ClassifiedPanels.tsx # mysterious project panels (hover reveal)
│   │   ├── FakeRoadmap.tsx  # roadmap 2077 → ∞
│   │   ├── AsciiArt.tsx     # ASCII art fragments
│   │   └── Marquee.tsx      # scrolling slogan ticker
│   └── sections/         # page sections (in render order)
│       ├── Hero.tsx           # cinematic hero
│       ├── ConceptAIGod.tsx   # concept 2: THE GOD MACHINE
│       ├── ConceptAbandoned.tsx # concept 1: ABANDONED HQ
│       ├── ConceptMemeStartup.tsx # concept 3: MEME STARTUP
│       ├── ConceptLogoArt.tsx # concept 4: THE MARK (brand logo)
│       ├── ConceptVaporware.tsx # concept 5: COMING SOON FOREVER
│       ├── ConceptHiring.tsx  # satirical hiring / requircuitment
│       └── Footer.tsx         # waitlist + satirical subscribe popup
└── public/
    ├── logo.png              # canonical brand logo (transparent PNG)
    └── logo/                 # logo variants (circle / non-circle) + After Effects source
```

---

## Content summary (everything inside)

### 🔹 Hero (`sections/Hero.tsx`)
Cinematic wide banner. Dark void background, perspective grid, global scanlines + CRT vignette. Features:
- **Binary rain** background (`BinaryRain`)
- **Floating AI core** with HUD telemetry (`AICore` + `HexFeed` in `HudFrame`)
- **Glitch title** `imnot.tech` (`GlitchText`)
- Tagline: *"we don't know what we're building yet."*
- **Terminal log** of funny fake errors (`TerminalLog`)
- **Absurd progress bar**: `revolution progress ████░░░░` with `ETA: ∞` (`AbsurdProgress`)
- Top-left **brand nav** (logo + `imnot.tech`, white glow) and a pulsing **"hiring"** link top-right.

### 🔸 1. ABANDONED HQ (`sections/ConceptAbandoned.tsx`) — *concept 1*
Futuristic abandoned AI startup HQ: holographic screens showing **corrupted code**, mysterious glowing tower servers, magenta binary rain, lonely "we left but the lights stayed on" mood.

### 🔸 2. THE GOD MACHINE (`sections/ConceptAIGod.tsx`) — *concept 2*
A mysterious AI core floating in a futuristic lab, thousands of binary digits + hex orbiting it, unfinished prototype fragments. Output readout ends with: **`CLUE WHAT WE BUILD: NO`**.

### 🔸 3. MEME STARTUP (`sections/ConceptMemeStartup.tsx`) — *concept 3*
Robots in a startup office building **nothing**. Daily standup KPI cards: `0 things shipped / ∞ announced`, `vibes: optimal`, `pivot count: 7`.

### 🔸 4. THE MARK (`sections/ConceptLogoArt.tsx`) — *concept 4*
Brand logo section. Shows the **`public/logo.png`** mark (white glow), the `imnot.tech` wordmark, an ASCII box `[ N O T ] building...`, and tags: `minimal · broken · glitch`.

### 🔸 5. COMING SOON FOREVER (`sections/ConceptVaporware.tsx`) — *concept 5*
Fake billion-dollar announcement poster: bold futuristic typography, a **blurred/redacted** mystery product, valuation `**$1B**` annotated *"a feeling, not a number"*, badge `SINCE 2075`.

### 🔹 Classified projects (`ui/ClassifiedPanels.tsx`)
Mysterious "CLASSIFIED" project panels that reveal absurd descriptions on hover (e.g. *Project: ??? — status: allegedly*).

### 🔹 Fake roadmap (`ui/FakeRoadmap.tsx`)
A roadmap that starts in 2077 and goes to `∞`, with milestones like *"Q3 2077 — announce something"*, *"Q4 2077 — pivot"*, *"∞ — ship (maybe)"*.

### 🔹 Data viz dashboards (`effects/DataViz.tsx`)
Three animated sci-fi charts (bars / waveforms / radial) that look important but plot nonsense.

### 🔹 Marquee (`ui/Marquee.tsx`)
Infinite scrolling slogan ticker: *"we're definitely building something"*, *"trust the roadmap"*, *"this is fine"*, etc.

### 🔸 WE ARE HIRING (`sections/ConceptHiring.tsx`) — *satire recruitment*
The self-aware "requircuitment" section:
- Subtitle: *"Priority #1: interns. As many as possible. We need mostly no cost. This is a no-capital company."*
- **Open roles**: INTERN (unpaid), SENIOR ENGINEER (paid in exposure), CHIEF VIBE OFFICER (salary: 0), GHOST INTERN, AI WHISPERER, PIVOT MANAGER.
- **Hire procedure (5 steps)**: `APPLY` (CV → /dev/null) → `PROJECT TEST` (**real work shipped under someone else's name**) → `TECH INTERVIEW` (12 rounds of free work) → `OFFER` (unpaid, equity in vibes) → `GHOSTING` (we stop replying, forever).
- **Apply form** "SUBMIT TO THE VOID": expected salary must be `0`, "are you okay being ghosted?" → yes/yes. On submit: *"APPLICATION RECEIVED. Discarded. (Just kidding — we never actually received it.)"*

### 🔹 Footer / Waitlist (`sections/Footer.tsx`)
- **Subscribe** button → satirical popup **"YOU'RE ON THE LIST"**: `queue position → ∞`, `est. invite → never`, *"we won't remember this. we won't email you. we won't launch."*
- Branding, fake copyright `© 2077 imnot.tech — all rights reserved, none exercised`.

---

## Brand & visual language

- **Palette**: void black `#04050a`, neon blue `#38e1ff`, neon purple `#b26bff`, neon green `#3dffa0`, neon magenta `#ff3ea5`.
- **Mood**: mysterious, funny, self-aware, indie-hacker, startup satire.
- **Logo**: transparent PNG (`public/logo.png`) used as the nav icon, the large "THE MARK" centerpiece, and the browser favicon. Variants (circle / non-circle) live in `public/logo/`.
- **Logo glow** is intentionally **white** (per brand direction) so it reads cleanly on the dark void.

---

## Notes & caveats

- **All forms are satirical.** The subscribe and hiring/apply forms render a joke response and send **nothing anywhere** — there is no backend. (Wiring them to a real DB was intentionally deferred.)
- **No placeholder/broken images.** Every visual is procedural (canvas/CSS/SVG); there are zero `<img>` placeholders except the brand logo.
- **macOS cruft**: `public/.DS_Store` and `public/logo/.DS_Store` may appear — add them to `.gitignore` if you care. They're harmless.

---

## Possible next steps

1. **Deploy** to Vercel and point the `imnot.tech` DNS (Namecheap) at it.
2. **Wire the waitlist / hiring forms** to a real store (Supabase / Vercel KV / Resend) — the UI already exists, just needs a handler.
3. **Swap sections for real renders** — the 5 concept prompts (AI god, abandoned HQ, meme startup, logo, vaporware poster) were written to be generated via ChatGPT/Gemini/Midjourney and dropped into `public/`.

---

*Made with too much hype and zero product.*
