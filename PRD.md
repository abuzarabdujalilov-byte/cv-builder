# PRD: Resume Builder

**Version:** 1.0 | **Status:** Draft | **Date:** 2026-11-17

---

## 1. Overview

Resume Builder is a web app that turns a short form into a polished, ready-to-use resume. The user fills in basic facts (photo, name, job title, experience, skills, education, contacts, date of birth). AI writes the professional summary and key strengths, then compiles the finished resume. The user picks a design template and a color theme and downloads the result in desktop and mobile versions.

## 2. Problem

Students and first-time job seekers have little experience, don't know how to describe themselves, and get stuck on a blank page and on formatting. Existing tools are either cluttered with paywalls or produce generic text.

## 3. Goals

1. A user goes from empty form to downloaded resume in **under 5 minutes**.
2. AI-written text feels personal, honest and appropriate for someone with limited experience.
3. The resume looks good in several templates and color themes.
4. Every resume is available in a **desktop** and a **mobile** version.

### Non-goals (v1)

- Job search, job-board integration or application tracking.
- Cover letter generation.
- Team or recruiter accounts.
- Multi-language resumes (v1 is one interface language; see Open Questions).

## 4. Target Users

**Primary:** students and first-time job seekers (ages ~16-25).

| Need | Implication |
|---|---|
| Little or no work experience | Form must accept projects, volunteering, internships as "experience" |
| Unsure how to write about themselves | AI drafts summary and strengths from minimal input |
| Mostly on phones | Mobile-first form and preview |
| Want to look professional fast | Ready templates, one-tap theme change |

## 5. User Flow

1. Open app → short welcome → "Create resume".
2. Fill the form step by step (see 6.1). Progress indicator shown.
3. Tap **Generate with AI** → AI produces summary and strengths.
4. User reviews and edits AI text inline.
5. Choose template and color theme in the live preview.
6. Download desktop and/or mobile version.

## 6. Functional Requirements

### 6.1 Resume Form

| Field | Type | Required | Notes |
|---|---|---|---|
| Photo | Image upload | No | JPG/PNG/WebP, max 5 MB, crop to square or circle |
| Full name | Text | Yes | |
| Job title | Text | Yes | Target role, e.g. "Junior Designer" |
| Date of birth | Date | No | User can choose to show or hide it on the resume |
| Experience | Repeatable group | No | Role, organization, start/end (or "present"), short notes. Supports internships, projects, volunteering |
| Skills | Tag input | Yes (min 1) | Suggestions as the user types |
| Education | Repeatable group | Yes (min 1) | Institution, degree/program, years |
| Contacts | Group | Yes (email or phone) | Email, phone, city, optional links (LinkedIn, portfolio) |

Requirements:
- FR-1: Form is split into steps; each step saves automatically.
- FR-2: Inline validation with friendly messages.
- FR-3: Data is stored locally in the browser so a refresh does not lose progress.
- FR-4: Date of birth is optional and hideable because of privacy and anti-discrimination norms in many regions.
- FR-5: Empty optional sections are removed from the resume automatically.

### 6.2 AI Generation

- FR-6: AI generates a **professional summary** (2-4 sentences) and **3-5 strengths** from the form data.
- FR-7: AI must use only facts the user provided. It must not invent employers, degrees, numbers or achievements.
- FR-8: For users with no experience, AI emphasizes skills, education, learning ability and projects.
- FR-9: The user can regenerate, change tone (Friendly / Neutral / Confident) and edit any AI text manually.
- FR-10: AI compiles the final resume content in a consistent structure ready for any template.
- FR-11: Generation shows a loading state and handles errors with a retry option.

### 6.3 Templates

- FR-12: At least **4 design templates** in v1:
  1. **Classic**: single column, conservative.
  2. **Modern**: two columns, sidebar with photo and contacts.
  3. **Creative**: bold header, accent shapes.
  4. **Minimal**: maximum white space, typography-led.
- FR-13: Switching templates keeps all content and applies instantly in the live preview.

### 6.4 Color Themes

- FR-14: At least **6 preset color themes** (e.g. Ocean, Violet, Sunset, Forest, Rose, Graphite).
- FR-15: Optional custom accent color picker.
- FR-16: Theme applies to the resume only; the app itself keeps its own glass style (see DESIGN.md).
- FR-17: Text/background contrast must meet WCAG AA in every theme.

### 6.5 Download and Export

- FR-18: Export format is **Markdown (.md)**.
- FR-19: Two layout versions per resume:
  - **Desktop version**: full structure, all sections, expanded layout.
  - **Mobile version**: condensed single-column structure, shorter line lengths, stacked sections.
- FR-20: User can download either version or both in one action.
- FR-21: Photo is referenced in the export file; embedded or bundled behavior is defined in SPEC.md.
- FR-22: File names follow `firstname-lastname-resume-desktop.md` and `...-mobile.md`.

### 6.6 Live Preview

- FR-23: Real-time preview that updates as the form changes.
- FR-24: Toggle between **Desktop** and **Mobile** preview.

## 7. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | First load under 3 s on mid-range mobile; preview updates under 100 ms |
| AI latency | Summary and strengths generated in under 10 s (p90) |
| Responsiveness | Fully usable from 360 px to 1920 px width |
| Accessibility | WCAG 2.1 AA, keyboard navigation, reduced-motion support |
| Privacy | Personal data stays in the browser except for the text sent to the AI; clear notice before sending |
| Browser support | Latest 2 versions of Chrome, Safari, Firefox, Edge |
| Reliability | Graceful fallback if AI is unavailable (user can write text manually) |

## 8. Success Metrics

- Completion rate (started → downloaded): **≥ 50%**.
- Median time to first download: **≤ 5 min**.
- AI text accepted without major edit: **≥ 60%**.
- Template switch rate (users who try 2+ templates): **≥ 40%**.
- Mobile share of sessions handled without errors: **≥ 99%**.

## 9. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| AI invents facts | Strict prompt rules (FR-7), "review before download" step |
| Users share sensitive data | Local storage, minimal data sent, privacy notice |
| Md export feels plain for a resume | Clean Markdown structure; offer PDF later (see Open Questions) |
| Weak results for users with no experience | Dedicated prompt branch for "no experience" profiles |

## 10. Milestones

| Phase | Scope |
|---|---|
| M1 | Form, local storage, live preview with 1 template |
| M2 | AI generation, editing, regenerate and tone |
| M3 | All 4 templates, 6 color themes |
| M4 | Desktop/mobile Markdown export, polish, accessibility pass |
| M5 | Beta with students, metrics review |

## 11. Open Questions

1. Should PDF export be added next to Markdown? (Most employers expect PDF.)
2. Which interface and resume language(s) for v1?
3. Which AI provider and model will be used?
4. Should users get accounts to sync across devices, or stay local-only?
