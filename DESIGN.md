# DESIGN: Resume Builder

**Based on:** PRD.md and SPEC.md | **Style:** Soft Glassmorphism with smooth animations
**Purpose:** a complete, self-contained design brief. A designer or an AI model should be able to rebuild the whole look and motion of the product from this file alone, without asking follow-up questions.

---

## 1. Design Principles

1. **Calm and encouraging.** The user is a student, probably nervous. The UI should feel light, safe and friendly.
2. **Glass with restraint.** Frosted surfaces float over a soft gradient background. Blur is a seasoning, not the whole meal.
3. **Motion explains.** Every animation shows cause and effect: something appeared, moved, or changed state.
4. **Readable first.** Text contrast always beats effect. If glass hurts legibility, make it more opaque.
5. **Mobile first.** Design for 390 px, then scale up.

## 2. Visual Identity

- **Mood words:** airy, soft, modern, optimistic, gentle.
- **Shapes:** large rounded corners, pill buttons, floating cards.
- **Depth:** layered translucent panels, soft long shadows, thin light borders.
- **Logo/wordmark:** "Resume Builder" in the display font, with a small glass-pill icon (document with a spark).

## 3. Color System

### 3.1 App palette (light mode, default)

| Token | Value | Use |
|---|---|---|
| `--bg-1` | #EEF2FF | Background gradient start |
| `--bg-2` | #F5F3FF | Gradient middle |
| `--bg-3` | #E0F2FE | Gradient end |
| `--ink` | #0F172A | Primary text |
| `--ink-muted` | #475569 | Secondary text |
| `--primary` | #6366F1 | Main actions, focus |
| `--primary-2` | #8B5CF6 | Gradient partner |
| `--accent` | #22D3EE | Highlights, AI sparkle |
| `--success` | #16A34A | Valid, saved |
| `--warning` | #F59E0B | Hints |
| `--danger` | #E11D48 | Errors |

Primary gradient: `linear-gradient(135deg, #6366F1 0%, #8B5CF6 60%, #22D3EE 140%)`.

### 3.2 Dark mode

| Token | Value |
|---|---|
| `--bg-1` | #0B1020 |
| `--bg-2` | #14112B |
| `--bg-3` | #0B1B2B |
| `--ink` | #F1F5F9 |
| `--ink-muted` | #94A3B8 |
| `--primary` | #818CF8 |
| `--accent` | #67E8F9 |

Dark mode follows the system setting with a manual toggle.

### 3.3 Resume themes (apply to the resume only)

Ocean #2563EB, Violet #7C3AED, Sunset #EA580C, Forest #15803D, Rose #E11D48, Graphite #374151, plus a custom picker. Full tokens are in SPEC.md section 7.

## 4. Typography

| Role | Font | Weight | Size / line-height |
|---|---|---|---|
| Display (H1) | "Plus Jakarta Sans" | 700 | 40/46 desktop, 30/36 mobile |
| H2 | Plus Jakarta Sans | 600 | 28/34, 22/28 |
| H3 | Plus Jakarta Sans | 600 | 20/26 |
| Body | "Inter" | 400 | 16/24 |
| Small / labels | Inter | 500 | 13/18 |
| Buttons | Plus Jakarta Sans | 600 | 15/20 |

Fallback stack: `system-ui, -apple-system, "Segoe UI", sans-serif`.
Resume templates use their own fonts: Classic (serif: "Source Serif 4"), Modern (Inter), Creative (Plus Jakarta Sans), Minimal (Inter light).

## 5. Spacing, Radius, Grid

- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64.
- **Radius:** small 12, card 24, modal/sheet 32, pill 999.
- **Layout:** mobile single column with 16 px margins; tablet 2 columns; desktop split view 45% form / 55% preview, max width 1280.
- **Touch targets:** min 44 x 44 px.

## 6. Glass Surface Recipe

Three glass levels:

```css
.glass-1 { /* cards, panels */
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(18px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.65);
  box-shadow: 0 8px 32px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.8);
  border-radius: 24px;
}
.glass-2 { /* modals, sheets, nav */
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.8);
  box-shadow: 0 16px 48px rgba(15,23,42,0.14), inset 0 1px 0 #fff;
}
.glass-3 { /* inputs, chips */
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99,102,241,0.18);
}
```

Dark mode: background `rgba(255,255,255,0.06-0.10)`, border `rgba(255,255,255,0.12)`, shadow `0 8px 32px rgba(0,0,0,0.45)`.

Fallbacks:
- If `backdrop-filter` unsupported or `prefers-reduced-transparency`: use solid `#FFFFFF` at 94% / `#161B2E` in dark.
- Never stack more than 2 blurred layers on screen at once (performance).

## 7. Background

- Base: animated soft gradient `--bg-1 → --bg-2 → --bg-3`.
- **Floating blobs:** 3 blurred circles (indigo, violet, cyan), 320-520 px, blur 80-120 px, opacity 0.35-0.5, drifting slowly.
- Optional subtle noise overlay at 3% opacity to avoid banding.
- Blob animation is paused on low-power devices and with reduced motion.

## 8. Components

### Buttons

| Type | Style |
|---|---|
| Primary | Gradient fill, white text, pill, glow shadow `0 8px 24px rgba(99,102,241,.35)` |
| Secondary | glass-3, primary text, border |
| Ghost | Transparent, text only, underline on hover |
| AI button | Primary gradient with sparkle icon and shimmering sweep |

States: hover lifts 2 px and brightens; pressed scales to 0.97; disabled opacity 0.5; focus shows 3 px ring `rgba(99,102,241,.45)`; loading shows spinner replacing icon.

### Inputs

glass-3 surface, 16 px padding, floating label that moves up on focus, focus ring in primary, error state with danger border and shake, helper text below.

### Photo upload

Circular dashed glass drop zone, camera icon; on drop the image scales in with a spring; crop opens in a glass-2 modal.

### Tags (skills)

Pill chips, glass-3; added with a pop-in, removed with a shrink-out; suggestion chips use accent color outline.

### Stepper / progress

Top glass bar with dots; the active dot expands into a pill; a gradient line fills between completed steps.

### Cards

glass-1, hover lift 4 px with shadow growth, 24 px padding. Repeatable groups (experience, education) are cards with add and remove actions.

### Template picker

Horizontal scroll of glass thumbnails (mini live previews); selected one shows a gradient border and check badge.

### Theme picker

Round color swatches 36 px; the selected swatch gets a white ring and a scale-up. Custom swatch opens a color popover.

### Modals and sheets

glass-2; desktop modal centered, mobile bottom sheet with a drag handle; dimmed backdrop `rgba(15,23,42,0.35)` with blur 4 px.

### Toasts

Small glass-2 pills at top center, slide down, auto-dismiss after 4 s, icon colored by type.

### Preview frame

Desktop: A4 sheet floating with shadow on a glass tray. Mobile: phone-like 390 px frame with rounded corners. A segmented control switches between them.

## 9. Motion System

### 9.1 Tokens

| Token | Value |
|---|---|
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) |
| `--ease-spring` | spring: stiffness 260, damping 22, mass 1 |
| `--dur-fast` | 150 ms |
| `--dur-base` | 280 ms |
| `--dur-slow` | 480 ms |
| `--dur-ambient` | 18-30 s (background drift) |

### 9.2 Interaction animations

| Element | Animation |
|---|---|
| Button hover | translateY(-2px), glow grows, 150 ms |
| Button press | scale 0.97, 100 ms |
| Card hover | translateY(-4px), shadow expands, 280 ms |
| Input focus | label floats up, ring fades in, 200 ms |
| Input error | horizontal shake 6 px x 3, 300 ms |
| Chip add | scale 0.7→1 with spring |
| Chip remove | scale 1→0.6 + fade, 150 ms |
| Save indicator | check icon draws via stroke-dashoffset, 400 ms |

### 9.3 Entrance animations

- Page content: fade + translateY(16 px→0), 480 ms, stagger children by 60 ms (max 8 children).
- Cards in lists: stagger 50 ms.
- Preview sheet: scale 0.96→1 + fade, 480 ms.

### 9.4 Ambient animation

- Background blobs drift on slow loops (translate ±60 px, scale 1→1.12, 24 s, ease-in-out, alternate).
- AI sparkle icon pulses softly every 4 s.

## 10. Page and Step Transitions

| Transition | Behavior |
|---|---|
| Step forward | Current step slides left 40 px + fades out (200 ms); next slides in from right 40 px + fades in (280 ms) |
| Step back | Mirrored direction |
| Welcome → Form | Hero scales down and fades; form cards rise from the bottom with stagger |
| Form → AI step | Content crossfade 280 ms; AI panel expands with spring |
| Template switch | Preview crossfades 280 ms with slight scale 0.99→1; layout shifts use shared-layout animation so blocks glide to new positions |
| Theme switch | Color variables transition over 400 ms (`transition: color, background-color, border-color 400ms`); a radial wave of the new accent expands from the clicked swatch (opt. 600 ms) |
| Desktop ↔ Mobile preview | Frame morphs width and radius, 480 ms spring |
| Modal / sheet open | Backdrop fades in 200 ms; panel scales 0.95→1 (desktop) or slides up (mobile) with spring |
| Download | Button transforms into a progress ring, then a check; file chip flies to the corner |

## 11. AI Moments (signature effects)

1. **Generate button:** shimmering gradient sweep moving left to right every 3 s while idle.
2. **Thinking state:** three glowing dots in a wave, plus the panel border animates with a rotating conic gradient.
3. **Text reveal:** summary appears word by word (30 ms per word, max 2 s total) with a soft blur-to-sharp effect; strengths pop in one by one with stagger 120 ms.
4. **Regenerate:** old text blurs out, new text reveals.
5. **Success:** small confetti-like sparkles (8 particles, 700 ms) near the text block, only once per generation.

## 12. Effects Catalog

| Effect | Where | Spec |
|---|---|---|
| Frosted glass | All surfaces | Section 6 |
| Glow | Primary buttons, focus | Colored shadow, blur 24 px |
| Gradient border | Selected template, AI panel | 1.5 px gradient via mask |
| Light sheen | Cards on hover | Diagonal white gradient moves across, 600 ms |
| Parallax | Background blobs on pointer move (desktop) | ±12 px, eased |
| Depth tilt | Preview sheet on hover (desktop) | Max 4° rotateX/Y, 300 ms |
| Skeleton shimmer | Loading states | Glass bars with moving highlight |

Use at most 3 simultaneous effects in the viewport to keep it calm.

## 13. Resume Template Visual Notes

- **Classic:** serif headings, thin divider lines in accent, photo top right, grayscale-friendly.
- **Modern:** accent-colored sidebar (accentSoft background), circular photo, skill bars as small dots, section icons.
- **Creative:** accent header band with large photo, diagonal cut, bold headings, rounded tags.
- **Minimal:** large whitespace, uppercase small-caps labels in muted color, accent only on name and links.
- Resume surfaces are **flat and print-clean** (no blur, no glow), unlike the app UI.

## 14. Icons and Imagery

- Icon set: Lucide, 1.75 px stroke, rounded caps, 20 px default, 24 px in headers.
- Illustrations: soft 3D-like glass shapes (spheres, document cards) in the welcome screen; no stock photos.
- Empty states: a single glass illustration plus one friendly sentence.

## 15. Responsive Behavior

| Breakpoint | Layout |
|---|---|
| < 640 | Single column, stepper at top, preview as full-screen sheet from a floating button |
| 640-1023 | Single column wide cards, preview in a slide-over panel |
| ≥ 1024 | Split view: form left, live preview right, sticky |

Floating action area on mobile: glass pill bar at the bottom with Back / Next, respecting safe-area insets.

## 16. Accessibility and Performance Rules

- `prefers-reduced-motion`: disable blob drift, parallax, tilt, sparkles, shimmer; replace slides with 150 ms fades.
- `prefers-reduced-transparency`: swap glass for solid surfaces.
- Text contrast ≥ 4.5:1 on all glass levels (verify on both light and dark backgrounds).
- Focus ring always visible, never removed.
- Animate only `transform` and `opacity` where possible; avoid animating blur radius.
- Limit `backdrop-filter` elements to those visible; remove it from off-screen layers.
- Target 60 fps on mid-range phones; fall back to static background if frame rate drops.

## 17. Copy Tone

Short, warm, encouraging. Examples:
- Welcome: "Let's build your first resume. It takes about 5 minutes."
- Empty experience: "No experience yet? Projects, volunteering and courses count too."
- AI loading: "Writing something great about you…"
- Success: "Your resume is ready."

## 18. Implementation Tokens (CSS starter)

```css
:root {
  --bg-1:#EEF2FF; --bg-2:#F5F3FF; --bg-3:#E0F2FE;
  --ink:#0F172A; --ink-muted:#475569;
  --primary:#6366F1; --primary-2:#8B5CF6; --accent:#22D3EE;
  --radius-card:24px; --radius-sheet:32px; --radius-pill:999px;
  --ease-out:cubic-bezier(.22,1,.36,1);
  --dur-fast:150ms; --dur-base:280ms; --dur-slow:480ms;
}
@media (prefers-color-scheme: dark) {
  :root { --bg-1:#0B1020; --bg-2:#14112B; --bg-3:#0B1B2B; --ink:#F1F5F9; --ink-muted:#94A3B8; --primary:#818CF8; --accent:#67E8F9; }
}
@media (prefers-reduced-motion: reduce) {
  *,*::before,*::after { animation-duration:.01ms !important; transition-duration:.15ms !important; }
}
```
