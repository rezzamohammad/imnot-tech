"use client";
import { useEffect, useState } from "react";

/* ── shared types ─────────────────────────────────────────── */

type Mode = "terminal" | "sessiondeck";
type Status = "live" | "working" | "detached" | "focused" | "idle";
type LayoutPreset = "all" | "dual" | "quad" | "deck" | "infra" | "mixed";
type LogType = "info" | "ok" | "warn" | "err";

/* ── terminal mode types ──────────────────────────────────── */

interface Agent {
  id: string;
  name: string;
  color: string;
  role: string;
}

interface LogEntry {
  ts: string;
  msg: string;
  type: LogType;
}

interface Panel {
  id: string;
  title: string;
  agent: Agent;
  lines: LogEntry[];
}

/* ── sessiondeck mode types ───────────────────────────────── */

interface Session {
  id: string;
  name: string;
  host: "arch" | "macos";
  status: Status;
  type: "tmux" | "opencode" | "python" | "node" | "bash";
  workdir?: string;
  preview?: string[];
}

interface Workspace {
  id: string;
  name: string;
  sessions: string[];
  layout: LayoutPreset;
}

/* ── terminal mode data ───────────────────────────────────── */

const AGENTS: Agent[] = [
  { id: "nxs", name: "NEXUS", color: "#38e1ff", role: "compiler" },
  { id: "cip", name: "CIPHER", color: "#b26bff", role: "encryptor" },
  { id: "pls", name: "PULSE", color: "#3dffa0", role: "monitor" },
  { id: "eco", name: "ECHO", color: "#ff3ea5", role: "reflector" },
  { id: "vod", name: "VOID", color: "#6f7da3", role: "processor" },
  { id: "flux", name: "FLUX", color: "#fbbf24", role: "scheduler" },
];

const TASKS: Record<string, string[]> = {
  nxs: ["compiling ambition.dll", "parsing undefined specs", "linking hype modules", "optimizing coffee-to-code ratio", "resolving scope dependencies"],
  cip: ["encrypting vaporware specs", "hashing stakeholder promises", "encoding roadmap (vague)", "decrypting board meeting notes", "signing release manifests"],
  pls: ["monitoring vibe metrics", "tracking pivot count", "logging existential events", "reporting hype levels", "calibrating dread sensors"],
  eco: ["reflecting on nothing", "echoing board decisions", "replaying last sprint", "mirroring stakeholder intent", "bouncing ideas off void"],
  vod: ["processing empty promises", "consuming zero resources", "outputting pure vapor", "storing memos in /dev/null", "garbage collecting morale"],
  flux: ["scheduling next pivot", "queueing standup meetings", "balancing workload (none)", "prioritizing backlog (vibes)", "estimating ETA: infinity"],
};

const MSG_POOL = [
  "initialized", "syncing...", "pivot detected", "scope creep neutralized",
  "hype level: critical", "coffee reserves low", "meeting scheduled about meetings",
  "existential dread: calibrated", "roadmap updated: still vague", "stakeholder patience: infinite",
  "build status: revolutionary", "loading motivation... FAILED", "vibes: immaculate",
  "velocity: undefined", "backlog sorted by mood", "compiling dreams", "deploying to prod (someday)",
  "querying void for direction", "energy: optimal (for napping)", "code review: vibes only",
];

/* ── sessiondeck mode data ────────────────────────────────── */

const STATUS_STYLE: Record<Status, { bg: string; text: string; label: string }> = {
  live: { bg: "rgba(56,225,120,0.2)", text: "#38e1ff", label: "LIVE" },
  working: { bg: "rgba(178,107,255,0.2)", text: "#b26bff", label: "WORKING" },
  detached: { bg: "rgba(255,62,165,0.15)", text: "#ff3ea5", label: "DETACHED" },
  focused: { bg: "rgba(255,180,50,0.25)", text: "#ffb432", label: "FOCUSED" },
  idle: { bg: "rgba(111,125,163,0.15)", text: "#6f7da3", label: "IDLE" },
};

const TYPE_ICON_DECK: Record<Session["type"], string> = {
  tmux: "⊞", opencode: "◈", python: "▸", node: "⬡", bash: "▸",
};

const SESSIONS: Session[] = [
  {
    id: "opencode_deck",
    name: "opencode_session_deck",
    host: "arch",
    status: "working",
    type: "opencode",
    workdir: "~/code_project/session_deck",
    preview: ["Plan · MiMo V2.5 Free", "OpenCode Zen · thinking...", "compiling session artifacts", "git: bfc7222 Fix host rename identity migration", "mimo reasoning: 42.3 tok/s"],
  },
  {
    id: "herdr",
    name: "herdr",
    host: "arch",
    status: "live",
    type: "tmux",
    workdir: "~/workspace/herdr",
    preview: ["[workstation@localhost bin]$ npm run dev", "herdr@0.1.0 start", "ready on http://localhost:3000", "GET /api/health 200 12ms", "POST /api/sessions 201 45ms"],
  },
  {
    id: "comofox",
    name: "comofox_browser",
    host: "arch",
    status: "live",
    type: "bash",
    workdir: "/tmp/comofox",
    preview: ["VNC: http://127.0.0.1:5901", "compression=6&path=websockify", "Server log: /tmp/comofox-vnc/server.log", "WebSocket client connected from 127.0.0.1", "framebuffer update: 1920x1080 @30fps"],
  },
  {
    id: "spotify",
    name: "spotify_player",
    host: "macos",
    status: "live",
    type: "python",
    workdir: "~/spotify_player",
    preview: ["Now Playing — lo-fi beats to code to", "Artist: chillhop records", "volume: ████░░░ 65%", "shuffle: ON | repeat: OFF", "device: workstation-imac (local)"],
  },
  {
    id: "forgedev",
    name: "forgedev_imnot",
    host: "arch",
    status: "live",
    type: "opencode",
    workdir: "~/workspace/forgedev_imnot",
    preview: ["forgedev v2.1.0 — imnot edition", "forge: building artifacts...", "target: linux/arm64 (proot)", "compilation: 3/3 modules OK", "output: dist/imnot.js (42.7kb)"],
  },
  {
    id: "omp",
    name: "omp_imnot",
    host: "arch",
    status: "live",
    type: "bash",
    workdir: "~",
    preview: ["oh-my-pi imnot edition v4.2", "theme: agnoster-dark-imnot", "plugins: git docker kubectl tmux", "segment: python v3.12.4", "last update: 3h ago — up to date"],
  },
  {
    id: "codex",
    name: "codex_imnot",
    host: "macos",
    status: "focused",
    type: "node",
    workdir: "~/workspace/codex_imnot",
    preview: ["codex-imnot v1.0.0 — research preview", "model: o4-mini (high reasoning)", "reasoning_effort: medium", "tokens: 14.2k in / 8.1k out", "session: code_review_imnot.js"],
  },
  {
    id: "claude",
    name: "claude_imnot",
    host: "macos",
    status: "idle",
    type: "opencode",
    workdir: "~/workspace/claude_imnot",
    preview: ["claude-imnot v2.1 — imnot fork", "model: claude-sonnet-4-20250514", "context: 200k tokens (142k used)", "extended thinking: ON · budget 32k", "status: idle — awaiting prompt"],
  },
  {
    id: "mission",
    name: "opencode_mission",
    host: "arch",
    status: "detached",
    type: "opencode",
    workdir: "~/workspace/mission_deck",
    preview: ["session paused — detached", "last action: commit bfc7222", "reason: user detach (tmux)", "runtime: 2h 14m · 47 actions"],
  },
];

const WORKSPACES: Workspace[] = [
  {
    id: "main",
    name: "my-workspace",
    sessions: ["opencode_deck", "herdr", "comofox", "spotify", "forgedev", "omp", "codex", "claude"],
    layout: "quad",
  },
  {
    id: "dev",
    name: "dev-flow",
    sessions: ["codex", "claude", "forgedev", "omp"],
    layout: "quad",
  },
];

const LAYOUT_PRESETS: { id: LayoutPreset; label: string }[] = [
  { id: "all", label: "all" },
  { id: "dual", label: "dual" },
  { id: "quad", label: "quad" },
  { id: "infra", label: "infra" },
  { id: "deck", label: "deck" },
  { id: "mixed", label: "mixed" },
];

const HOST_ICON: Record<string, string> = { arch: "⊞", macos: "◈" };

const TYPE_CLS: Record<LogType, string> = {
  info: "text-[#38e1ff]/70", ok: "text-[#3dffa0]/70",
  warn: "text-[#b26bff]/70", err: "text-[#ff3ea5]/70",
};

const TYPE_ICON_TERM: Record<LogType, string> = {
  info: "▸", ok: "✓", warn: "⚠", err: "✕",
};

/* ── helpers ──────────────────────────────────────────────── */

function ts(): string {
  const h = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const m = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const s = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function rndEntry(agent: Agent): LogEntry {
  const msgs = TASKS[agent.id] || MSG_POOL;
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  const r = Math.random();
  const type: LogType = r < 0.1 ? "err" : r < 0.25 ? "warn" : r < 0.55 ? "ok" : "info";
  return { ts: ts(), msg, type };
}

function rndFullLog(agent: Agent, count: number): LogEntry[] {
  return Array.from({ length: count }, () => {
    const r = Math.random();
    return { ts: ts(), msg: MSG_POOL[Math.floor(Math.random() * MSG_POOL.length)], type: r < 0.08 ? "err" : r < 0.2 ? "warn" : r < 0.5 ? "ok" : "info" };
  });
}

const SESSION_LOGS: Record<string, string[]> = {
  opencode_deck: [
    "Plan · MiMo V2.5 Free · thinking...",
    "reasoning: 42.3 tok/s · context 142k/200k",
    "compiling session artifacts...",
    "git: bfc7222 Fix host rename identity migration",
    "checking git status — no changes",
    "tool_call: read_file src/main.ts",
    "OpenCode Zen · stream active",
    "mimo reasoning: high · budget 32k",
    "session checkpoint saved",
    "Plan · MiMo V2.5 Free · idle",
  ],
  herdr: [
    "GET /api/health 200 12ms",
    "POST /api/sessions 201 45ms",
    "[workstation@localhost bin]$ npm run dev",
    "herdr@0.1.0 start",
    "ready on http://localhost:3000",
    "GET /api/agents 200 8ms",
    "WebSocket connection established",
    "hot reload: 3 modules updated",
    "GET /api/tasks 200 15ms",
    "POST /api/sessions/1/attach 200 22ms",
  ],
  comofox: [
    "VNC: http://127.0.0.1:5901",
    "compression=6&path=websockify",
    "Server log: /tmp/comofox-vnc/server.log",
    "WebSocket client connected from 127.0.0.1",
    "framebuffer update: 1920x1080 @30fps",
    "clipboard sync: incoming text (42 bytes)",
    "keyboard event: Ctrl+C sent to session",
    "connection: workstation@localhost → 127.0.0.1:5901",
    "TLS handshake complete",
    "render loop: 28.7 avg fps",
  ],
  spotify: [
    "Now Playing — lo-fi beats to code to",
    "Artist: chillhop records",
    "volume: ████░░░ 65%",
    "shuffle: ON | repeat: OFF",
    "device: workstation-imac (local)",
    "seek: 1:42 / 3:28",
    "playlist: imnot coding session",
    "audio output: built-in speakers",
    "crossfade: 5s | gapless: ON",
    "spotifyd: daemon running (pid 42069)",
  ],
  forgedev: [
    "forgedev v2.1.0 — imnot edition",
    "forge: building artifacts...",
    "target: linux/arm64 (proot)",
    "compilation: 3/3 modules OK",
    "output: dist/imnot.js (42.7kb)",
    "minifying: terser --compress --mangle",
    "tree-shake: removed 12 dead exports",
    "watch mode: listening for changes",
    "forge cache: .forge/cache/ (247MB)",
    "build time: 1.84s (cached: 0.31s)",
  ],
  omp: [
    "oh-my-pi imnot edition v4.2",
    "theme: agnoster-dark-imnot",
    "plugins: git docker kubectl tmux",
    "segment: python v3.12.4",
    "last update: 3h ago — up to date",
    "prompt: root@imnot in ~/workspace",
    "git status segment: 2 modified, 1 staged",
    "k8s context: archnode-local",
    "virtualenv: imnot-dev (active)",
    "shell: zsh 5.9 · plugins loaded: 14",
  ],
  codex: [
    "codex-imnot v1.0.0 — research preview",
    "model: o4-mini (high reasoning)",
    "reasoning_effort: medium",
    "tokens: 14.2k in / 8.1k out",
    "session: code_review_imnot.js",
    "tool_call: read_file src/main.ts → 842 lines",
    "tool_call: bash_command npm test → 14 passed",
    "streaming response... chunk 47/89",
    "auto-compact: context 68% used",
    "cost: $0.0034 · 12 tool calls total",
  ],
  claude: [
    "claude-imnot v2.1 — imnot fork",
    "model: claude-sonnet-4-20250514",
    "context: 200k tokens (142k used)",
    "extended thinking: ON · budget 32k",
    "status: idle — awaiting prompt",
    "tool_use: bash_command ls -la",
    "tool_result: 24 files, 6 directories",
    "cache_read: 18.4k tokens (85% hit)",
    "artifacts: 1 active (code_review)",
    "session: imnot-workspace · 47 messages",
  ],
  mission: [
    "session paused — detached",
    "last action: commit bfc7222",
    "reason: user detach (tmux)",
    "runtime: 2h 14m · 47 actions",
    "cost: $0.12 · tokens: 42.1k in / 18.7k out",
    "plan: 4/7 steps completed",
    "checkpoint: saved to ~/.opencode/checkpoints/",
    "resume: opencode attach mission_deck",
    "git: on branch main, 2 ahead of origin",
    "idle since: 14:32:07",
  ],
};

/* ── terminal mode sub-components ─────────────────────────── */

function TerminalPanel({ panel }: { panel: Panel }) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b shrink-0" style={{ borderColor: "rgba(96,130,210,0.12)" }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: panel.agent.color }} />
        <span className="font-tech text-[9px] tracking-wider" style={{ color: panel.agent.color }}>{panel.agent.id}</span>
        <span className="text-dim text-[9px]">·</span>
        <span className="text-dim text-[9px]">{panel.agent.role}</span>
        <span className="ml-auto text-dim text-[9px]">{panel.title}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[10px] leading-[1.6] min-h-0">
        {panel.lines.map((l, i) => (
          <div key={i} className="flex gap-1.5">
            <span className="text-dim/50 shrink-0">{l.ts}</span>
            <span className={`${TYPE_CLS[l.type]} shrink-0 w-3`}>{TYPE_ICON_TERM[l.type]}</span>
            <span className="text-dim/70 truncate">{l.msg}</span>
          </div>
        ))}
        <div style={{ color: panel.agent.color }} className="opacity-60">
          root@imnot:~$ <span className="blink">▋</span>
        </div>
      </div>
    </div>
  );
}

type RightPanel = "servers" | "sessions" | "spotlight" | "new-session" | "new-workspace" | null;

interface Host {
  name: string;
  ip: string;
  type: "local workstation" | "local termux";
  status: { label: string; color: string }[];
  uptime: string;
}

const HOSTS: Host[] = [
  { name: "macOS", ip: "192.168.18.4:22", type: "local workstation", uptime: "up 0mo 2d 6h 15m 30s", status: [
    { label: "healthy", color: "#38e1ff" }, { label: "reachable", color: "#3dffa0" }, { label: "remote shell", color: "#b26bff" },
  ]},
  { name: "Arch", ip: "127.0.0.1:22", type: "local termux", uptime: "up 0mo 2d 6h 15m 33s", status: [
    { label: "healthy", color: "#38e1ff" }, { label: "reachable", color: "#3dffa0" }, { label: "local shell", color: "#3dffa0" },
  ]},
];

const SPOTLIGHT_CMDS = [
  { cat: "WORKSPACE", label: "Switch to workspace: my-workspace", key: "Alt+1" },
  { cat: "WORKSPACE", label: "Switch to workspace: dev-flow", key: "Alt+2" },
  { cat: "WORKSPACE", label: "New workspace", key: "N" },
  { cat: "SESSION", label: "New session", key: "S" },
  { cat: "PANE", label: "Zoom focused pane", key: "Ctrl+Shift+F" },
  { cat: "PANE", label: "Show properties panel", key: "I" },
  { cat: "SESSION", label: "Focus session: opencode_session_deck", key: "Arch" },
  { cat: "SESSION", label: "Focus session: herdr", key: "Arch" },
  { cat: "SESSION", label: "Focus session: codex_imnot", key: "macOS" },
  { cat: "SESSION", label: "Focus session: claude_imnot", key: "macOS" },
  { cat: "SESSION", label: "Manage sessions", key: "" },
  { cat: "SETTINGS", label: "Settings: Servers", key: "" },
  { cat: "SETTINGS", label: "Settings: Sessions", key: "" },
  { cat: "SETTINGS", label: "Settings: Appearance", key: "" },
  { cat: "SETTINGS", label: "Settings: Help", key: "" },
];

const FEATURE_BTNS: { id: RightPanel; label: string }[] = [
  { id: "servers", label: "Servers" },
  { id: "sessions", label: "Sessions" },
  { id: "spotlight", label: "Spotlight" },
  { id: "new-session", label: "+ New" },
];

/* ── sessiondeck mode sub-components ──────────────────────── */

function DeckPane({ session }: { session: Session }) {
  const st = STATUS_STYLE[session.status];
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden" style={{ backgroundColor: "rgba(12,16,28,0.95)" }}>
      <div className="flex items-center gap-2 px-3 py-1.5 border-b shrink-0" style={{ borderColor: "rgba(96,130,210,0.1)" }}>
        <span className="text-[10px] opacity-50">{TYPE_ICON_DECK[session.type]}</span>
        <span className="font-tech text-[9px] tracking-wider text-dim truncate">{session.name}</span>
        <span className="ml-auto px-1.5 py-0.5 rounded text-[8px] font-tech uppercase tracking-wider shrink-0" style={{ backgroundColor: st.bg, color: st.text }}>{st.label}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[10px] leading-[1.6] min-h-0">
        {(session.preview || (SESSION_LOGS[session.id] || []).slice(0, 4)).map((line, i) => (
          <div key={i} className="text-dim/60 truncate">{line}</div>
        ))}
        <div className="text-dim/40 mt-1">$ <span className="blink">▋</span></div>
      </div>
    </div>
  );
}

function RightSidebar({ panel, sessions, onClose }: { panel: RightPanel; sessions: Session[]; onClose: () => void }) {
  if (!panel) return null;
  return (
    <div className="absolute right-0 top-0 bottom-0 z-30 flex flex-col border-l overflow-y-auto w-[90vw] max-w-full lg:w-[240px]" style={{ borderColor: "rgba(96,130,210,0.15)", backgroundColor: "rgba(8,10,20,0.98)", boxShadow: "-4px 0 24px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center justify-between px-3 py-2 border-b shrink-0" style={{ borderColor: "rgba(96,130,210,0.1)" }}>
        <span className="font-tech text-[10px] uppercase tracking-wider text-dim">{panel.replace("-", " ")}</span>
        <button onClick={onClose} className="text-dim/40 hover:text-dim text-[10px] transition">✕</button>
      </div>

      {panel === "servers" && (
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-dim/50 text-[9px] font-tech">{HOSTS.length} hosts</span>
            <div className="flex gap-1">
              <button className="px-2 py-0.5 rounded text-[8px] font-tech text-dim/50 border" style={{ borderColor: "rgba(96,130,210,0.15)" }}>Test All</button>
              <button className="px-2 py-0.5 rounded text-[8px] font-tech text-[#ffb432] border" style={{ borderColor: "rgba(255,180,50,0.3)" }}>+ Add Host</button>
            </div>
          </div>
          {HOSTS.map((h) => (
            <div key={h.name} className="mb-3">
              <div className="text-dim/40 text-[8px] font-tech uppercase tracking-wider mb-1">{h.type}</div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-tech text-[10px] text-dim">{h.name}</span>
                <span className="font-mono text-[8px] text-dim/40">{h.ip}</span>
              </div>
              <div className="text-dim/30 text-[8px] font-mono mb-1">{h.uptime}</div>
              <div className="flex flex-wrap gap-1">
                {h.status.map((st) => (
                  <span key={st.label} className="px-1.5 py-0 rounded text-[7px] font-tech" style={{ backgroundColor: `${st.color}20`, color: st.color }}>{st.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {panel === "sessions" && (
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-dim/50 text-[9px] font-tech">{sessions.length} sessions</span>
            <button className="px-2 py-0.5 rounded text-[8px] font-tech text-[#ffb432] border" style={{ borderColor: "rgba(255,180,50,0.3)" }}>+ New Session</button>
          </div>
          <div className="flex gap-1 mb-3">
            {["All Hosts", "Arch", "macOS"].map((f) => (
              <button key={f} className={`px-2 py-0.5 rounded text-[8px] font-tech ${f === "All Hosts" ? "bg-[rgba(255,180,50,0.15)] text-[#ffb432]" : "text-dim/40"}`}>{f}</button>
            ))}
          </div>
          {(["arch", "macos"] as const).map((host) => (
            <div key={host}>
              <div className="text-dim/40 text-[8px] font-tech uppercase tracking-wider mb-1 mt-2">{host}</div>
              {sessions.filter((s) => s.host === host).map((s) => {
                const st = STATUS_STYLE[s.status];
                return (
                  <div key={s.id} className="flex items-center gap-2 py-1">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: st.text }} />
                    <span className="font-mono text-[9px] text-dim/70 truncate">{s.name}</span>
                    <span className="ml-auto px-1 py-0 rounded text-[7px] font-tech" style={{ backgroundColor: st.bg, color: st.text }}>{s.status === "detached" ? "detached" : "active"}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {panel === "spotlight" && (
        <div className="px-3 py-2">
          <div className="text-dim/60 text-[9px] font-tech mb-2">SPOTLIGHT SEARCH</div>
          <div className="px-2 py-1.5 rounded text-[9px] text-dim/30 mb-3" style={{ backgroundColor: "rgba(96,130,210,0.06)", border: "1px solid rgba(96,130,210,0.1)" }}>
            ⌘ Type a command...
          </div>
          {SPOTLIGHT_CMDS.map((cmd, i) => (
            <div key={i} className="flex items-center justify-between py-1 hover:bg-[rgba(255,180,50,0.05)] px-1 rounded transition cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-dim/30 text-[7px] font-tech w-14 shrink-0">{cmd.cat}</span>
                <span className="text-dim/70 text-[9px] truncate">{cmd.label}</span>
              </div>
              {cmd.key && <span className="text-dim/30 text-[8px] font-tech shrink-0">{cmd.key}</span>}
            </div>
          ))}
        </div>
      )}

      {panel === "new-session" && (
        <div className="px-3 py-2">
          <div className="text-dim/60 text-[9px] font-tech mb-1">NEW SESSION</div>
          <div className="text-dim/30 text-[8px] font-mono mb-4">macOS:spotify_player</div>
          <div className="mb-3">
            <label className="text-dim/50 text-[8px] font-tech uppercase tracking-wider mb-1 block">Session Name *</label>
            <input defaultValue="my-session" className="w-full px-2 py-1.5 rounded text-[9px] font-mono text-dim outline-none" style={{ backgroundColor: "rgba(96,130,210,0.08)", border: "1px solid rgba(96,130,210,0.15)" }} />
          </div>
          <div className="mb-3">
            <label className="text-dim/50 text-[8px] font-tech uppercase tracking-wider mb-1 block">Host</label>
            <select className="w-full px-2 py-1.5 rounded text-[9px] font-mono text-dim outline-none" style={{ backgroundColor: "rgba(96,130,210,0.08)", border: "1px solid rgba(96,130,210,0.15)" }}>
              <option>macOS</option>
              <option>Arch</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-dim/50 text-[8px] font-tech uppercase tracking-wider mb-1 block">Start Directory (optional)</label>
            <input defaultValue="/home/user/project" className="w-full px-2 py-1.5 rounded text-[9px] font-mono text-dim outline-none" style={{ backgroundColor: "rgba(96,130,210,0.08)", border: "1px solid rgba(96,130,210,0.15)" }} />
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 px-2 py-1.5 rounded text-[9px] font-tech text-dim/60 border" style={{ borderColor: "rgba(96,130,210,0.15)" }}>Cancel</button>
            <button className="flex-1 px-2 py-1.5 rounded text-[9px] font-tech text-white" style={{ backgroundColor: "rgba(255,180,50,0.8)" }}>Create Session</button>
          </div>
        </div>
      )}

      {panel === "new-workspace" && (
        <div className="px-3 py-2">
          <div className="text-dim/60 text-[9px] font-tech mb-1">NEW WORKSPACE</div>
          <div className="text-dim/30 text-[8px] font-mono mb-4">macOS:spotify_player</div>
          <div className="mb-3">
            <label className="text-dim/50 text-[8px] font-tech uppercase tracking-wider mb-1 block">Name</label>
            <input defaultValue="my-workspace" className="w-full px-2 py-1.5 rounded text-[9px] font-mono text-dim outline-none" style={{ backgroundColor: "rgba(96,130,210,0.08)", border: "1px solid rgba(96,130,210,0.15)" }} />
          </div>
          <div className="mb-3">
            <label className="text-dim/50 text-[8px] font-tech uppercase tracking-wider mb-2 block">Layout Preset</label>
            <div className="flex flex-wrap gap-1.5">
              {LAYOUT_PRESETS.map((lp) => (
                <button key={lp.id} className={`px-2 py-1 rounded text-[8px] font-tech transition ${lp.id === "quad" ? "bg-[rgba(255,180,50,0.2)] text-[#ffb432] border" : "text-dim/50 border hover:text-dim/70"}`} style={{ borderColor: lp.id === "quad" ? "rgba(255,180,50,0.4)" : "rgba(96,130,210,0.15)" }}>{lp.label}</button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="text-dim/50 text-[8px] font-tech uppercase tracking-wider mb-2 block">Saved Templates</label>
            <div className="flex flex-wrap gap-1.5">
              {["my-workspace", "my-workspace-1", "my-workspace-main"].map((t) => (
                <button key={t} className="px-2 py-1 rounded text-[8px] font-tech text-dim/50 border hover:text-dim/70 transition" style={{ borderColor: "rgba(96,130,210,0.15)" }}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 px-2 py-1.5 rounded text-[9px] font-tech text-dim/60 border" style={{ borderColor: "rgba(96,130,210,0.15)" }}>Cancel</button>
            <button className="flex-1 px-2 py-1.5 rounded text-[9px] font-tech text-white" style={{ backgroundColor: "rgba(255,180,50,0.8)" }}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── responsive helper ───────────────────────────────────── */

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ── main component ───────────────────────────────────────── */

const TERMINAL_HEIGHT = "h-[380px]";

export default function AgentWorkLog({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("sessiondeck");

  /* mobile detection (below lg = 1024px) */
  const isMobile = useIsMobile(1024);

  /* terminal mode state */
  const [panels, setPanels] = useState<Panel[]>(() =>
    AGENTS.slice(0, 4).map((a) => ({ id: a.id, title: `~/${a.role}`, agent: a, lines: rndFullLog(a, 6) }))
  );
  const [termLayout, setTermLayout] = useState<"dual" | "quad">("quad");

  /* sessiondeck mode state */
  const [activeWorkspace, setActiveWorkspace] = useState(WORKSPACES[0].id);
  const [deckLayout, setDeckLayout] = useState<LayoutPreset>("quad");
  const [sessions, setSessions] = useState(SESSIONS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanel, setRightPanel] = useState<RightPanel>(null);

  /* collapse the left sidebar by default on mobile so it doesn't eat pane space */
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const ws = WORKSPACES.find((w) => w.id === activeWorkspace)!;
  const visibleSessions = sessions.filter((s) => ws.sessions.includes(s.id));

  /* shared interval — both modes animate */
  useEffect(() => {
    const id = setInterval(() => {
      setPanels((prev) => prev.map((p) => {
        const next = [...p.lines, rndEntry(p.agent)];
        return { ...p, lines: next.slice(-10) };
      }));
      setSessions((prev) => prev.map((s) => {
        if (s.status === "detached") return s;
        const pool = SESSION_LOGS[s.id] || SESSION_LOGS.mission;
        const newLine = pool[Math.floor(Math.random() * pool.length)];
        return { ...s, preview: [...(s.preview || []).slice(-4), newLine].slice(-5) };
      }));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  /* deck grid helpers */
  const deckPaneCount = deckLayout === "all" ? visibleSessions.length : deckLayout === "dual" ? 2 : deckLayout === "deck" ? 3 : deckLayout === "infra" ? 2 : 4;
  const deckGridClass = deckLayout === "all" ? "" : deckLayout === "dual" ? "grid-cols-2" : deckLayout === "deck" ? "grid-cols-3" : deckLayout === "infra" ? "grid-cols-2" : "grid-cols-2 grid-rows-2";
  const deckDisplay = visibleSessions.slice(0, deckPaneCount);

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden ${className}`}
      style={{ backgroundColor: "rgba(8,10,20,0.95)", border: "1px solid rgba(96,130,210,0.15)" }}
    >
      {/* ── mode switcher + title bar ─────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-2 border-b shrink-0" style={{ borderColor: "rgba(96,130,210,0.12)" }}>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff3ea5]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3dffa0]/60" />
        </div>
        <span className="font-tech text-[9px] uppercase tracking-[0.25em] text-dim">
          {mode === "terminal" ? "agent workstream" : "session_deck"} — imnot.tech
        </span>
        <div className="ml-auto flex items-center gap-0 rounded overflow-hidden" style={{ border: "1px solid rgba(96,130,210,0.15)" }}>
          {(["terminal", "sessiondeck"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2.5 py-1 text-[8px] font-tech uppercase tracking-wider transition ${
                mode === m ? "bg-[rgba(255,180,50,0.18)] text-[#ffb432]" : "text-dim/40 hover:text-dim/60"
              }`}
            >
              {m === "terminal" ? "◈ terminal" : "⊞ deck"}
            </button>
          ))}
        </div>
      </div>

      {/* ── fixed height body ─────────────────────────────── */}
      <div className={TERMINAL_HEIGHT} style={{ minHeight: 380 }}>
        {/* ── terminal mode ───────────────────────────────── */}
        {mode === "terminal" && (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-1 px-4 py-1.5 border-b shrink-0" style={{ borderColor: "rgba(96,130,210,0.1)" }}>
              <span className="text-dim/40 text-[8px] font-tech uppercase tracking-wider mr-2">layout</span>
              {(["dual", "quad"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTermLayout(t)}
                  className={`px-2 py-0.5 rounded text-[9px] font-tech uppercase tracking-wider transition ${
                    termLayout === t ? "bg-neon-blue/20 text-neon-blue" : "text-dim/40 hover:text-dim/60"
                  }`}
                >{t}</button>
              ))}
              <span className="ml-auto text-dim/30 text-[8px] font-tech">{termLayout === "dual" ? 2 : 4} panels · root@imnot</span>
            </div>
            <div className={`flex-1 grid gap-px overflow-hidden ${termLayout === "dual" ? "grid-cols-2" : "grid-cols-2 grid-rows-2"}`} style={{ backgroundColor: "rgba(96,130,210,0.08)" }}>
              {(termLayout === "dual" ? panels.slice(0, 2) : panels.slice(0, 4)).map((p) => (
                <div key={p.id} className="overflow-hidden min-h-0" style={{ backgroundColor: "rgba(2,4,9,0.92)" }}>
                  <TerminalPanel panel={p} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── sessiondeck mode ────────────────────────────── */}
        {mode === "sessiondeck" && (
          <div className="flex flex-col h-full">
            {/* workspace tabs */}
            <div className="flex items-center gap-0 border-b shrink-0" style={{ borderColor: "rgba(96,130,210,0.12)" }}>
              {WORKSPACES.map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setActiveWorkspace(w.id); setDeckLayout(w.layout); }}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] font-tech tracking-wider transition border-r ${
                    activeWorkspace === w.id
                      ? "bg-[rgba(255,180,50,0.08)] text-[#ffb432] border-b-2 border-b-[#ffb432]"
                      : "text-dim/60 hover:text-dim"
                  }`}
                  style={{ borderColor: "rgba(96,130,210,0.1)" }}
                >
                  <span>{w.name}</span>
                  <span className="text-dim/30">{w.sessions.length}p</span>
                </button>
              ))}
              <button
                onClick={() => {
                  if (rightPanel === "new-workspace") {
                    setRightPanel(null);
                  } else {
                    setRightPanel("new-workspace");
                    setSidebarOpen(false);
                  }
                }}
                className={`px-3 py-2 text-[12px] transition ${
                  rightPanel === "new-workspace" ? "text-[#3dffa0]" : "text-dim/30 hover:text-dim/60"
                }`}
              >+</button>
              <div className="ml-auto flex items-center gap-2 px-3">
                <span className="text-dim/40 text-[9px] font-tech">{deckDisplay.length} panes</span>
                <button
                  onClick={() => { setSidebarOpen(!sidebarOpen); setRightPanel(null); }}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-tech uppercase tracking-wider transition ${
                    sidebarOpen ? "bg-[rgba(255,180,50,0.15)] text-[#ffb432]" : "text-dim/40 hover:text-dim/60"
                  }`}
                >☰</button>
              </div>
            </div>

            {/* main content */}
            <div className="relative flex flex-1 min-h-0 overflow-hidden">
              {sidebarOpen && (
              <div
                className={`${isMobile ? "absolute inset-y-0 left-0 z-20 w-[200px] max-w-[70vw]" : "w-[180px] shrink-0"} flex flex-col border-r overflow-y-auto`}
                style={{ borderColor: "rgba(96,130,210,0.1)", backgroundColor: "rgba(8,10,20,0.98)" }}
              >
                  {(["arch", "macos"] as const).map((host) => (
                    <div key={host}>
                      <div className="flex items-center gap-2 px-3 py-2 text-[9px] font-tech text-dim/50 uppercase tracking-wider">
                        <span>{HOST_ICON[host]}</span><span>{host}</span>
                      </div>
                      {sessions.filter((s) => s.host === host).map((s) => {
                        const st = STATUS_STYLE[s.status];
                        return (
                          <button
                            key={s.id}
                            onClick={() => setSessions((prev) => prev.map((p) => p.id === s.id ? { ...p, status: "focused" } : p.status === "focused" ? { ...p, status: "live" } : p))}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition ${
                              s.status === "focused"
                                ? "bg-[rgba(255,180,50,0.08)] border-l-2 border-l-[#ffb432]"
                                : "border-l-2 border-l-transparent hover:bg-[rgba(255,255,255,0.02)]"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: st.text }} />
                            <span className="font-mono text-[9px] text-dim/70 truncate">{s.name}</span>
                            <span className="ml-auto px-1 py-0 rounded text-[7px] font-tech shrink-0" style={{ backgroundColor: st.bg, color: st.text }}>{s.type}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
              {/* all layout: horizontal scroll */}
              {deckLayout === "all" ? (
                <div className="relative flex-1 flex min-h-0 overflow-hidden">
                  {/* left fade */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(12,16,28,1) 0%, transparent 100%)" }} />
                  {/* scrollable row */}
                  <div className="flex-1 flex overflow-x-auto overflow-y-hidden scroll-smooth" style={{ backgroundColor: "rgba(96,130,210,0.06)", scrollbarWidth: "thin", scrollbarColor: "rgba(255,180,50,0.3) rgba(96,130,210,0.08)" }}>
                    {deckDisplay.map((s) => (
                      <div key={s.id} className="w-[280px] shrink-0 overflow-hidden border-r" style={{ borderColor: "rgba(96,130,210,0.08)" }}>
                        <DeckPane session={s} />
                      </div>
                    ))}
                  </div>
                  {/* right fade */}
                  <div className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(12,16,28,1) 0%, transparent 100%)" }} />
                  {/* scroll hint arrow */}
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <span className="text-dim/40 text-[10px] animate-pulse">›</span>
                  </div>
                </div>
              ) : (
                <div className={`flex-1 grid gap-px overflow-hidden ${deckGridClass}`} style={{ backgroundColor: "rgba(96,130,210,0.06)" }}>
                  {deckDisplay.map((s) => (
                    <div key={s.id} className="overflow-hidden min-h-0"><DeckPane session={s} /></div>
                  ))}
                </div>
              )}
              {/* right sidebar */}
              <RightSidebar panel={rightPanel} sessions={sessions} onClose={() => setRightPanel(null)} />
            </div>

            {/* tmux controls bar */}
            <div className="flex items-center gap-1 px-3 py-1.5 border-t shrink-0 overflow-x-auto" style={{ borderColor: "rgba(96,130,210,0.12)", backgroundColor: "rgba(8,10,20,0.98)" }}>
              <span className="text-dim/40 text-[8px] font-tech uppercase tracking-wider mr-2 shrink-0">tmux</span>
              {["Attach", "Detach", "Split LR", "Split TB", "Zoom", "Close", "Prefix"].map((cmd) => (
                <button key={cmd} className="px-2 py-0.5 rounded text-[8px] font-tech text-dim/50 hover:text-[#ffb432] hover:bg-[rgba(255,180,50,0.1)] transition shrink-0">{cmd}</button>
              ))}
              <div className="ml-auto flex items-center gap-1">
                <span className="text-dim/30 text-[8px] font-tech">Ctrl+B</span>
                <span className="text-dim/20 text-[8px]">|</span>
                {/* feature buttons */}
                {FEATURE_BTNS.map((fb) => (
                  <button
                    key={fb.id}
                    onClick={() => {
                      if (rightPanel === fb.id) {
                        setRightPanel(null);
                      } else {
                        setRightPanel(fb.id);
                        setSidebarOpen(false);
                      }
                    }}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-tech transition shrink-0 ${
                      rightPanel === fb.id
                        ? "bg-[rgba(56,225,120,0.15)] text-[#3dffa0]"
                        : "text-dim/40 hover:text-dim/60 hover:bg-[rgba(255,255,255,0.03)]"
                    }`}
                  >{fb.label}</button>
                ))}
                <span className="text-dim/15 text-[8px] mx-0.5">|</span>
                {LAYOUT_PRESETS.map((lp) => (
                  <button
                    key={lp.id}
                    onClick={() => setDeckLayout(lp.id)}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-tech uppercase tracking-wider transition ${
                      deckLayout === lp.id ? "bg-[rgba(255,180,50,0.2)] text-[#ffb432]" : "text-dim/30 hover:text-dim/50"
                    }`}
                  >{lp.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
