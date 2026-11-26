# SPEC: Resume Builder

**Based on:** PRD.md v1.0 | **Version:** 1.0 | **Date:** 2026-11-17

---

## 1. Architecture

Single-page web app, client-side first.

```
Browser (SPA)
 ├─ UI layer           components, steps, preview
 ├─ State layer        form store + persistence (localStorage / IndexedDB for photo)
 ├─ Render layer       template engine (HTML preview) + Markdown exporter
 └─ AI client ──HTTPS──> Backend proxy ──> AI provider
```

- **Why a proxy:** the AI API key must never be shipped to the browser. The proxy is a thin serverless function that validates input, applies the system prompt and rate limits.
- No user accounts in v1. All resume data stays in the browser.

## 2. Recommended Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React + TypeScript + Vite | Fast, typed, easy component model |
| Styling | CSS variables + Tailwind (or CSS Modules) | Runtime theming via variables |
| Animation | Framer Motion | Declarative, supports reduced motion |
| State | Zustand with persist middleware | Small, simple local persistence |
| Forms | React Hook Form + Zod | Validation, typed schema |
| Image crop | react-easy-crop | Square/circle photo crop |
| Backend | Serverless function (Node) | AI proxy only |
| AI | Provider-agnostic interface | Model chosen in config |

## 3. Data Model

```ts
type Resume = {
  id: string;
  photo?: { dataUrl: string; shape: "circle" | "square" };
  fullName: string;
  jobTitle: string;
  dateOfBirth?: string;          // ISO yyyy-mm-dd
  showDateOfBirth: boolean;
  experience: Experience[];
  skills: string[];
  education: Education[];
  contacts: {
    email?: string; phone?: string; city?: string;
    links: { label: string; url: string }[];
  };
  ai: {
    summary: string;
    strengths: string[];         // 3-5 items
    tone: "friendly" | "neutral" | "confident";
    editedByUser: boolean;
  };
  design: {
    templateId: "classic" | "modern" | "creative" | "minimal";
    themeId: string;             // preset id or "custom"
    customAccent?: string;       // hex
  };
  updatedAt: string;
};

type Experience = {
  id: string; role: string; organization: string;
  start: string; end?: string; current: boolean; notes?: string;
};

type Education = {
  id: string; institution: string; program: string;
  startYear?: number; endYear?: number; current: boolean;
};
```

### Validation rules (Zod)

| Field | Rule |
|---|---|
| fullName | 2-80 chars |
| jobTitle | 2-80 chars |
| skills | 1-30 items, each 1-40 chars, deduplicated case-insensitively |
| education | min 1 item |
| contacts | at least one of email or phone; email format; phone 6-20 chars |
| experience.notes | max 500 chars |
| photo | JPG/PNG/WebP, max 5 MB, resized to max 800x800 before storing |
| dateOfBirth | valid date, age 14-100 |

## 4. Form Flow

Steps (each autosaves on change, debounce 300 ms):

1. Basics: photo, name, job title, date of birth
2. Education
3. Experience (skippable)
4. Skills
5. Contacts
6. AI generation and review
7. Design: template and theme
8. Download

Navigation: Next / Back, direct click on completed steps, progress bar. Step 6 is blocked until required fields are valid.

## 5. AI Module

### 5.1 API contract

`POST /api/generate`

```json
// request
{
  "jobTitle": "Junior Designer",
  "education": [...],
  "experience": [...],
  "skills": ["Figma", "Teamwork"],
  "tone": "friendly",
  "language": "en",
  "hasExperience": false
}
// response
{
  "summary": "string, 2-4 sentences",
  "strengths": ["string", "string", "string"]
}
```

- Response must be valid JSON. Proxy validates it with a schema; on failure it retries once, then returns `502` with a code.
- Date of birth and contact details are **not** sent to the AI.
- Rate limit: 10 requests per minute per IP, 30 per hour.
- Timeout: 20 s client side, one automatic retry on network error.

### 5.2 Prompt rules (system prompt)

1. Use only facts present in the input. Never invent employers, degrees, numbers, awards.
2. Summary: 2-4 sentences, first person omitted (resume style), no clichés such as "hard-working team player" without support.
3. Strengths: 3-5 short items (2-6 words), each grounded in skills, education or experience.
4. If `hasExperience` is false, emphasize education, skills, projects, motivation to learn.
5. Match requested tone and language.
6. Output JSON only.

### 5.3 Compilation

The client assembles the final resume model: form data + AI text. No further AI call is needed to render. Any user edit sets `ai.editedByUser = true` and is never overwritten silently by regenerate (user must confirm).

### 5.4 Failure handling

| Case | Behavior |
|---|---|
| Timeout / 5xx | Error toast, Retry button, manual text fields stay available |
| Invalid JSON after retry | Same as above |
| Rate limited | Message with wait time |
| Offline | Disable Generate button, show offline notice |

## 6. Templates

Each template is a React component receiving `Resume` and `ThemeTokens`.

| Id | Layout | Photo | Notes |
|---|---|---|---|
| classic | 1 column | top right, small | Serif headings |
| modern | 2 columns (30/70) | sidebar top | Contacts and skills in sidebar |
| creative | header band + 2 columns | large in header | Accent shapes |
| minimal | 1 column, wide margins | optional small | Typography-led |

Rules:
- A4 proportion for desktop preview (210 x 297 ratio); fluid single column for mobile preview.
- Sections hidden when empty.
- Date of birth rendered only if `showDateOfBirth` is true.
- All templates read colors only from CSS variables (`--r-accent`, `--r-text`, `--r-muted`, `--r-bg`).

## 7. Color Themes

```ts
type ThemeTokens = { accent: string; accentSoft: string; text: string; muted: string; bg: string };
```

| Id | Accent | Accent soft |
|---|---|---|
| ocean | #2563EB | #DBEAFE |
| violet | #7C3AED | #EDE9FE |
| sunset | #EA580C | #FFEDD5 |
| forest | #15803D | #DCFCE7 |
| rose | #E11D48 | #FFE4E6 |
| graphite | #374151 | #E5E7EB |
| custom | user hex | auto: 12% mix with white |

Contrast check: on custom accent, compute contrast against the text/background it is used on; if below 4.5:1, auto-darken the accent and show a hint.

## 8. Export (Markdown)

### 8.1 Files

- `{firstname}-{lastname}-resume-desktop.md`
- `{firstname}-{lastname}-resume-mobile.md`
- "Download both" produces a `.zip` containing both files and the photo (if any) in `/assets`.

File names are slugified (lowercase, ASCII, hyphens). Fallback: `resume-desktop.md`.

### 8.2 Desktop structure

```md
# Full Name
**Job Title**

Email · Phone · City · Links

## Summary
...

## Strengths
- ...

## Experience
### Role — Organization
*Mar 2025 – Present*
- notes

## Education
### Program — Institution
*2023 – 2027*

## Skills
Figma · Teamwork · ...
```

Date of birth line is added under contacts only if enabled.

### 8.3 Mobile structure

Differences from desktop:
- Contacts as a vertical list, one per line.
- Skills as a bulleted list instead of a single dot-separated line.
- Short lines; no inline separators.
- Section order optimized for scanning: Summary → Skills → Experience → Education → Contacts.
- Photo link placed at top: `![Name](assets/photo.jpg)`.

### 8.4 Photo handling

Photo is exported as `assets/photo.jpg` (resized, quality 85) inside the zip and referenced by relative path. A single `.md` download uses no photo reference and omits the image line.

## 9. Live Preview

- Renders the selected template from the current store state, debounced 100 ms.
- Toggle: Desktop (A4 frame) / Mobile (390 px frame).
- On small screens the preview opens as a full-screen sheet from a floating "Preview" button.
- Template and theme changes crossfade (see DESIGN.md).

## 10. Persistence and Privacy

- Store: `localStorage` key `rb.resume.v1` for JSON; photo in IndexedDB (key `rb.photo`).
- "Clear all data" button in settings deletes both.
- Before the first AI request, a one-time notice explains what is sent (job title, education, experience, skills) and what is not (name, date of birth, contacts, photo).
- No analytics on form content.

## 11. Accessibility

- All controls reachable by keyboard; visible focus ring.
- Labels bound to inputs; errors announced via `aria-live="polite"`.
- Animations respect `prefers-reduced-motion` (replaced by fades).
- Glass surfaces keep text contrast at least 4.5:1 (use fallback opaque background when `prefers-reduced-transparency`).
- Photo requires no alt entry; resume image alt is the person's name.

## 12. Error and Empty States

| Situation | UI |
|---|---|
| Photo too large | Inline error, show limit |
| No skills added | Prompt with 6 suggested skills chips |
| Storage full | Toast, suggest clearing photo |
| Export with missing required data | Block download, list missing fields |

## 13. Testing

- Unit: Zod schemas, slugify, Markdown exporter (desktop and mobile snapshots).
- Component: each template with full, minimal and no-experience data.
- E2E: complete flow on 390 px and 1440 px viewports.
- AI: contract tests with mocked provider; prompt tests ensure no invented facts on a fixed fixture set.
- Accessibility: automated axe checks per step.

## 14. Release Checklist

- [ ] All FRs from PRD mapped to tasks
- [ ] Lighthouse mobile performance ≥ 85
- [ ] AA contrast verified for all 6 themes in all 4 templates
- [ ] Rate limiting and key protection verified on the proxy
- [ ] Privacy notice reviewed
