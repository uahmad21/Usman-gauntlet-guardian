## Gauntlet Guardian – Secure-by-Design Simulator

Gauntlet Guardian is a cyberpunk‑style training game where you play the security architect of a **student marketplace**.  
Your job is to spot attacks, choose the right security control, and watch how the system reacts in real time.

- **Left side**: vulnerable student marketplace (login, data transmission, auth, database view).
- **Right side**: threat console with logs, per‑level briefings, and multiple‑choice decisions.
- **Goal**: harden the system from the start and reach a 99% **Resilience Score**.

### Tech stack

- **React + TypeScript** (Vite)
- **Tailwind CSS** + custom cyberpunk theme
- **shadcn/ui** components
- **framer‑motion** for animations
- **lucide‑react** for icons

---

## How to run locally

```sh
npm install
npm run dev
```

Then open the printed `http://localhost:xxxx` URL in your browser.

To run tests (if you add any with Vitest):

```sh
npm test
```

---

## Gameplay overview

- **3 interactive levels**, all based on real security failures:
  - Level 1 – SQL Injection on the login form.
  - Level 2 – Man‑in‑the‑Middle sniffing of student data.
  - Level 3 – Broken authentication / brute force with leaked credentials.
- For each level you:
  - Read a short **mission briefing**.
  - Press **“Simulate Attack”** to see the breach.
  - Pick a **security control** from 4 options (only one is correct).
  - See **terminal logs**, exposed vs protected record counters, and visual changes in the UI.
- A wrong choice:
  - Increases the **“wrong attempts”** counter.
  - Exposes **more records**.
  - Reduces the **XP** you can earn for that level.
- A correct choice:
  - Marks the level as **SECURED**.
  - Encrypts / hides sensitive data in the UI.
  - Awards **XP** and improves your **Resilience Score**.

When all three levels are secured you get a **win screen** with:

- Grade (S / A / B / C based on mistakes).
- Total XP.
- Final Resilience Score (up to 99%).
- A button to view the **Security Audit Report**.

---

## How this meets the BCS “Secure From Day One” brief

**1. Working prototype**

- The app is a fully working React/Tailwind single‑page web application.
- It simulates a student marketplace plus a security operations console side‑by‑side.

**2. Threat modelling (at least five realistic threats)**

The game explicitly models these threats:

1. **SQL Injection** on the login API (`/api/login`).
2. **Man‑in‑the‑Middle (MITM)** sniffing plain‑text HTTP traffic.
3. **Brute force / credential stuffing** against the authentication endpoint.
4. **Session and token risks** (session fixation / stolen tokens mentioned in the report).
5. **Over‑privileged database access / insider misuse** (full table exposure vs least‑privilege).

These appear in:

- The **LevelPanel** mission briefings and choices.
- The **terminal log** entries.
- The **SecurityReport** “Attack Surfaces” and “Residual Risk” sections.

**3. Security controls implemented**

The prototype demonstrates and explains:

- **Parameterized queries** for SQL Injection defense.
- **AES‑256 style encryption / HTTPS** to protect data in transit.
- **Rate limiting + MFA** as the main defense against brute force.
- **Least‑privilege database access** (only what is needed, not full tables).
- **Better session handling & monitoring** (called out in the report).

The UI shows before/after states:

- Database rows go from **fully visible** to **masked/encrypted**.
- Packets go from plain‑text student data to `[AES‑256] ███` blocks.
- Brute‑force attempts stop after a few tries once rate limiting + MFA are “enabled”.

**4. Security report**

Click **“Security Report”** on the top‑right after securing all levels to see:

- **Assets Protected** – student records, credentials, transcripts, payment data.
- **Attack Surfaces Identified** – login, API endpoints, auth system, session management, DB layer.
- **Mitigations Applied** – parameterized queries, AES‑256, rate limiting, MFA, etc.
- **Residual Risk** – human error, social engineering, zero‑days, insider threats.

This view directly matches the hackathon requirement for a short security report.

**5. Presentation & demo**

For a live demo you can:

- Start on **Level 1**, trigger the attack, show:
  - Terminal logs.
  - Exposed record counters.
  - Raw DB rows.
- Walk through a **wrong choice first** to show extra damage.
- Then select the **correct control** and show how the UI + logs change.
- Repeat for Levels 2 and 3.
- Finish with the **win screen** and the **Security Audit Report**.

---

## Project file structure (high level)

- `src/pages/Index.tsx` – main game container; manages level state, XP, logs, resilience score, and report/win modals.
- `src/components/LevelPanel.tsx` – per‑level mission briefing + attack simulation + multi‑choice defenses.
- `src/components/LiveAppPanel.tsx` – student marketplace simulation (login, traffic view, auth log, database table).
- `src/components/TerminalLog.tsx` – animated security log output.
- `src/components/ResilienceScore.tsx` – progress bar + XP + restart button.
- `src/components/WinState.tsx` – “Certified secure‑by‑design” end screen with grade and stats.
- `src/components/SecurityReport.tsx` – in‑app security report modal aligned with the BCS brief.
- `src/components/ui/*` – reusable UI primitives from shadcn/ui (buttons, cards, dialogs, etc.).
- `src/index.css`, `tailwind.config.ts` – global styles, cyberpunk theme, fonts, colors.

---

## Suggested GitHub description

> **Gauntlet Guardian** – a cyberpunk secure‑by‑design training game where you harden a vulnerable student marketplace against SQL injection, MITM sniffing, and brute‑force attacks. Built with React, TypeScript, Tailwind, framer‑motion, and shadcn/ui for the BCS “Build Something Secure From Day One” hackathon.

