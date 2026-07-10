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
│   ├── page.tsx          # assembles all sections
│   └── globals.css       # cyberpunk theme: neon tokens, glitch, scanlines, HUD, grid, custom scrollbar, range slider
├── components/
│   ├── effects/          # canvas / motion visuals
│   │   ├── BinaryRain.tsx      # falling 0/1 matrix rain
│   │   ├── AICore.tsx          # rotating galaxy/atom (Hero)
│   │   ├── NeuralNetwork.tsx   # neural network nodes (God Machine)
│   │   ├── DataViz.tsx         # 3 chart types: area, radar, horizontal bars
│   │   ├── GlitchText.tsx      # RGB-split glitch heading
│   │   ├── HexFeed.tsx         # streaming random hex telemetry
│   │   └── Scanlines.tsx       # CRT scanline + vignette overlay
│   ├── ui/               # building blocks
│   │   ├── HudFrame.tsx        # labeled HUD panel frame
│   │   ├── TerminalLog.tsx     # funny terminal error log
│   │   ├── AbsurdProgress.tsx  # progress bar that makes no sense
│   │   ├── ClassifiedPanels.tsx # mystery project panels (6 colors)
│   │   ├── AgentWorkLog.tsx    # multi-mode terminal: SessionDeck + Agent logs
│   │   ├── MusicPlayer.tsx     # music player with waveform + volume control
│   │   ├── StickyHireButton.tsx # scroll-attach/detach hiring CTA (portal)
│   │   ├── ParodyWarning.tsx   # parody/satire legal notice (3 variants)
│   │   ├── FakeRoadmap.tsx     # roadmap 2077 → ∞
│   │   ├── AsciiArt.tsx        # ASCII art fragments
│   │   └── Marquee.tsx         # scrolling slogan ticker
│   └── sections/         # page sections (in render order)
│       ├── Hero.tsx              # cinematic hero + music player + sticky hire button
│       ├── ConceptAIGod.tsx      # concept 2: THE GOD MACHINE (neural network)
│       ├── ConceptAbandoned.tsx  # concept 1: ABANDONED HQ
│       ├── ConceptLogoArt.tsx    # concept 4: THE MARK + SessionDeck terminal
│       ├── ConceptVaporware.tsx  # concept 5: COMING SOON FOREVER
│       ├── ConceptHiring.tsx     # satirical hiring / requircuitment
│       └── Footer.tsx            # waitlist + satirical subscribe popup
└── public/
    ├── logo.png              # canonical brand logo (transparent PNG)
    ├── summoned_echoes.mp3   # background music track
    └── logo/                 # logo variants (circle / non-circle) + After Effects source
```

---

## Content summary (everything inside)

### Hero (`sections/Hero.tsx`)
Cinematic wide banner. Dark void background, perspective grid, global scanlines + CRT vignette. Features:
- **Binary rain** background (`BinaryRain`)
- **Floating AI core** with rotating galaxy/atom animation (`AICore`)
- **Glitch title** `imnot.tech` (`GlitchText`)
- Tagline: *"We don't know what we're building yet. Probably AI slops and it will be revolutionary."*
- **Terminal log** of funny fake errors (`TerminalLog`)
- **Absurd progress bar**: `revolution progress ████░░░░` with `ETA: ∞` (`AbsurdProgress`)
- **Nav**: Logo, MusicPlayer (play/stop/resume), CORE, HQ, PROJECTS, ROADMAP, JOIN, StickyHireButton
- **Sticky Hire Button**: Starts in nav, detaches to fixed top-right on scroll with smooth transition

### 1. ABANDONED HQ (`sections/ConceptAbandoned.tsx`) — concept 1
Futuristic abandoned AI startup HQ: holographic screens showing corrupted code, mysterious glowing tower servers, magenta binary rain.

### 2. THE GOD MACHINE (`sections/ConceptAIGod.tsx`) — concept 2
A mysterious AI core with **neural network visualization** (amber/orange interconnected nodes). Features:
- Neural output waveform (cyan)
- Status cards: Consciousness MOSTLY, Self-Awareness YES, Clue What We Build NO, Uptime ∞%
- Core telemetry hex feed

### 3. THE MARK (`sections/ConceptLogoArt.tsx`) — concept 4
Brand logo section with **SessionDeck terminal** (tmux-style multi-workflow):
- **Logo + wordmark**: `imnot.tech` with glitch effect, centered alignment
- **SessionDeck terminal**: Multi-panel workspace with:
  - Workspace tabs (my-workspace, dev-flow)
  - Session sidebar (Arch/macOS hosts)
  - 6 layout modes: ALL, DUAL, QUAD, INFRA, DECK, MIXED
  - 4 right-panel popups: Servers, Sessions, Spotlight, New Session/Workspace
  - 9 unique session panes: opencode, herdr, comofox, spotify, forgedev, omp, codex, claude, mission
  - Tmux controls bar with feature buttons

### 4. COMING SOON FOREVER (`sections/ConceptVaporware.tsx`) — concept 5
Fake billion-dollar announcement poster: bold futuristic typography, blurred/redacted mystery product, valuation `$1B` annotated *"a feeling, not a number"*.

### Classified projects (`ui/ClassifiedPanels.tsx`)
6 mystery project panels with unique accent colors (magenta, blue, green, purple, red, yellow). Reveal absurd descriptions on hover.

### Data viz dashboards (`effects/DataViz.tsx`)
3 distinct animated charts with different color themes:
- **Global Throughput**: Area chart (cyan theme)
- **Sentiment Analysis**: Radar/circular gauge (green theme)
- **Resource Allocation**: Horizontal bars (pink theme)

### Music Player (`ui/MusicPlayer.tsx`)
Background music player with:
- Play/Stop/Resume states (green/pink/yellow colors)
- Waveform visualizer overlay (cyan/purple/pink gradient bars)
- Volume slider with custom styling
- Loop mode (continuous playback)
- React Portal rendering (always on top of all elements)

### Marquee (`ui/Marquee.tsx`)
Infinite scrolling slogan ticker: *"we're definitely building something"*, *"trust the roadmap"*, *"this is fine"*, etc.

### WE ARE HIRING (`sections/ConceptHiring.tsx`) — satire recruitment
Self-aware "requircuitment" section:
- Open roles: INTERN (unpaid), SENIOR ENGINEER (paid in exposure), CHIEF VIBE OFFICER, GHOST INTERN, AI WHISPERER, PIVOT MANAGER
- 5-step hire procedure with absurd tags
- Apply form with satirical responses

### Footer / Waitlist (`sections/Footer.tsx`)
- Subscribe button → satirical popup "YOU'RE ON THE LIST"
- Branding with logo image and white glow

### Parody Warning (`ui/ParodyWarning.tsx`)
Disclaimers placed in sensitive sections (Hero, Hiring, Footer):
- `banner` — fixed bottom bar with hazard stripes (amber/black), dismissible
- `box` — bordered notice box with detailed explanation
- `inline` — compact single-line strip for tight layouts

---

## Brand & visual language

- **Palette**: void black `#04050a`, neon blue `#38e1ff`, neon purple `#b26bff`, neon green `#3dffa0`, neon magenta `#ff3ea5`, amber `#fbbf24`, red `#ff4444`, yellow `#fbbf24`.
- **Mood**: mysterious, funny, self-aware, indie-hacker, startup satire.
- **Logo**: transparent PNG (`public/logo.png`) used as the nav icon and the large "THE MARK" centerpiece.
- **Custom scrollbar**: 6px thin, cyan thumb on dark track (matches neon-blue theme)
- **Range slider**: Custom styled with 14px thumb, cyan glow

---

## Notes & caveats

- **All forms are satirical.** The subscribe and hiring/apply forms render a joke response and send nothing anywhere — there is no backend.
- **No placeholder/broken images.** Every visual is procedural (canvas/CSS/SVG); there are zero `<img>` placeholders except the brand logo.
- **Music**: `summoned_echoes.mp3` loops continuously when played. MusicPlayer uses Web Audio API for waveform visualization.

---

## Possible next steps

1. **Deploy** to Vercel and point the `imnot.tech` DNS at it.
2. **Wire the waitlist / hiring forms** to a real store (Supabase / Vercel KV / Resend).
3. **Swap sections for real renders** — the concept prompts were written to be generated via AI and dropped into `public/`.

---

*Made with too much hype and zero product.*
