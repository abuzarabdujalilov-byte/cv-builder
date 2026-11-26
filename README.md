# Resume Builder

A fast, elegant, client-first web app that turns a simple form into a polished, ready-to-use resume for students and first-time job seekers. Built according to PRD, SPEC, and DESIGN guidelines.

---

## ✨ Features

- **⏱️ Under 5 Minutes to Ready:** Step-by-step guidance designed specifically for candidates with limited or non-traditional experience (projects, volunteering, coursework).
- **🤖 Truthful AI Generation:**
  - AI drafts a **professional summary (2-4 sentences)** and **3-5 core strengths** grounded exclusively in your input facts.
  - **Zero Hallucination Guarantee:** Never invents employers, numbers, degrees, or awards.
  - **Tone Selector:** Choose between **Friendly**, **Neutral**, and **Confident**.
  - **Signature Motion Effects:** Word-by-word reveal (30ms per word), thinking wave with rotating conic border, and celebration confetti.
  - **Full User Control:** Edit text inline; regenerate with confirmation so your manual changes are never lost.
- **🎨 4 Ready-to-Use Templates:**
  1. **Classic:** Conservative single-column with elegant serif typography ("Source Serif 4"), thin dividers, and grayscale friendliness.
  2. **Modern:** Two-column split with an `accentSoft` sidebar, circular photo, section icons, and dedicated skill badges.
  3. **Creative:** Expressive header band with subtle floating shapes, bold headings, and superpower chips.
  4. **Minimal:** Maximum whitespace, typography-led, uppercase small-caps labels, and subtle accent touches.
- **🌈 6 Color Themes + Custom Palette:**
  - Preset themes: **Ocean** (#2563EB), **Violet** (#7C3AED), **Sunset** (#EA580C), **Forest** (#15803D), **Rose** (#E11D48), **Graphite** (#374151).
  - **Custom Accent Picker:** Pick any hex color. Features automatic WCAG AA contrast calculation (≥ 4.5:1) with auto-darkening and user hints.
- **📱 Live Real-Time Preview:**
  - Split view on desktop (45% form / 55% live preview), instant reactivity (< 100ms).
  - Toggle between **Desktop (A4)** and **Mobile (390px)** preview frames with spring morphing.
  - Responsive floating "Preview Resume" button and full-screen bottom sheet for mobile viewports.
- **📦 Markdown & ZIP Export:**
  - **Desktop Markdown:** `{firstname}-{lastname}-resume-desktop.md` with full structure.
  - **Mobile Markdown:** `{firstname}-{lastname}-resume-mobile.md` with vertical scannable list structure.
  - **Complete Bundle (.ZIP):** One-click download of both desktop & mobile markdown files plus cropped photo in `assets/photo.jpg`.
- **🔒 Privacy & Client-First Persistence:**
  - Form autosaves to `localStorage` (`rb.resume.v1`).
  - Cropped photo saved in `IndexedDB` (`rb.photo`).
  - Contact details, full name, date of birth, and photos are **never** transmitted to AI servers.
  - Complete data wipe button in navigation bar.
- **💎 Soft Glassmorphism Design System:**
  - Layered translucent panels (`.glass-1`, `.glass-2`, `.glass-3`) with frosted backdrop blur.
  - Ambient floating background blobs drifting in slow loops with pointer parallax.
  - Dark mode with system preference auto-detection and manual toggle.
  - Full keyboard accessibility and `prefers-reduced-motion` support.

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| **Framework** | React 18 + TypeScript + Vite 6 |
| **Styling** | Tailwind CSS + CSS Variables for runtime theming |
| **Motion** | Framer Motion + Canvas Confetti |
| **State & Store** | Zustand (with `persist` middleware) |
| **Image Cropping** | `react-easy-crop` (Circle & Square modes) |
| **Archive Bundler** | `JSZip` |
| **Icons** | Lucide React |
| **Validation** | Zod schemas |
| **Testing** | Vitest |

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> Note: The Vite dev server includes the `/api/generate` proxy middleware with rate limiting (10 req/min per IP, 30 req/hr) and the truthful generation engine.

### 3. Optional AI Provider Configuration
If you want the proxy to use live Google Gemini or OpenAI LLMs, set the environment variables in a `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
# or
OPENAI_API_KEY=your_openai_api_key_here
```
If no key is configured, the built-in deterministic contextual synthesis engine strictly adheres to SPEC Section 5.2 rules without needing any external API.

### 4. Running Tests
```bash
npm test
```

### 5. Production Build
```bash
npm run build
```

---

## 📂 Project Structure

```
cv-builder/
├── src/
│   ├── types/
│   │   └── resume.ts           # Complete TypeScript interfaces
│   ├── lib/
│   │   ├── schema.ts           # Zod validation schemas
│   │   ├── db.ts               # IndexedDB helper for rb.photo
│   │   ├── storage.ts          # Zustand store with persistence
│   │   ├── ai.ts               # Client AI service with retries
│   │   ├── markdown.ts         # Desktop/Mobile markdown & ZIP bundler
│   │   ├── themes.ts           # Theme tokens & WCAG AA contrast engine
│   │   └── sampleData.ts       # Starter student resume for testing
│   ├── server/
│   │   └── aiEngine.ts         # Proxy logic, rate limiter & SPEC 5.2 prompt engine
│   ├── components/
│   │   ├── common/             # GlassCard, GlassButton, GlassInput, PhotoCropModal, Toast
│   │   ├── layout/             # Navbar, Stepper, Footer
│   │   ├── steps/              # WelcomeStep, Steps 1-8
│   │   ├── templates/          # Classic, Modern, Creative, Minimal templates
│   │   └── preview/            # LivePreview, DeviceFrame
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   └── resume.test.ts          # Unit tests for schemas, markdown, contrast, and AI
├── vite.config.ts
├── tailwind.config.js
└── package.json
```
