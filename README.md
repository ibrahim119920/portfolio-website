# Portfolio Website

An interactive portfolio for Ahmad Maulana Ibrahim, built with Vite, vanilla JavaScript, CSS, HTML, and Lucide. The desktop, window, dock, search, and ID/EN language controls are part of the portfolio experience.

English is the default language on page load. Visitors can switch to Indonesian using the ID/EN control.

Repository: <https://github.com/ibrahim119920/portfolio-website>

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`, or serve the built files locally with `npm run preview`.

## Analytics

Vercel Web Analytics is wired through `@vercel/analytics`. `src/main.js` injects the tracking script in production and sends a page view on each client-side route change, with project detail routes grouped under `/projects/:project`. Enable Web Analytics in the Vercel project settings before the first production deployment.

## Portfolio PDF

A six-page A4 project portfolio is available at `Ahmad-Maulana-Ibrahim-Portfolio.pdf`, with a plain-language version at `Ahmad-Maulana-Ibrahim-Portfolio-v2.pdf`. Print source and regeneration instructions are in `docs/portfolio/`.

## Routes

Every window has a shareable URL. Navigation is handled client-side with the History API, so moving between views never reloads the document, and browser back/forward works.

| Path | View |
| --- | --- |
| `/` | Home |
| `/about` | Profile |
| `/projects` | Projects |
| `/projects/nusacommerce-data-platform` | NusaCommerce project detail |
| `/projects/nyc-mobility-lakehouse` | NYC Mobility Lakehouse project detail |
| `/projects/chicago-traffic-crash` | Chicago Traffic Crash project detail |
| `/projects/highway-lane-occupancy` | Highway Lane Occupancy & Hogging Detection project detail |
| `/projects/rekberin` | Rekberin project detail |
| `/projects/lelaku` | Lelaku project detail |
| `/projects/wanttosell` | WantToSell project detail |
| `/projects/photobooth` | Photobooth project detail |
| `/projects/money-tracker` | Money Tracker project detail |
| `/projects/river-water-level-modeling` | River Water-Level Modeling project detail |
| `/projects/abm-exposure-simulation` | ABM Exposure Simulation project detail |
| `/skills` | Skills |
| `/learning` | Courses and learning |
| `/contact` | Contact |

`/home`, `/profile`, and `/work` are aliases for `/`, `/about`, and `/projects`; `/courses` redirects to `/learning`. Unknown paths fall back to `/`. When deploying to static hosting, configure an SPA fallback so every path serves `index.html` (Vite dev and preview already do this).


## Content organization

Portfolio data and bilingual presentation live in `src/main.js`:

- `profile` contains the candidate's contact, education, positioning, and summary.
- `experience` contains Find IT! UGM and Enforian UGM organizational experience.
- `projectSections` groups the documented data, backend/software, mobile/ML/simulation, and minor coursework projects. Each entry has repository links, stacks, short card summaries, contribution summaries, and scope notes. Projects with a `detailApp` value also have a shareable detail page. The highway case study uses the `highway` detail app and images in `public/portfolio/`.
- `courses` contains the five completed DataCamp courses and their Statement of Accomplishment links, in the requested order.
- `skillGroups`, `engineeringConcepts`, and `reportedSkills` separate repository-backed skills, demonstrated concepts, and user-reported labs/skills.
- `translations` contains the Indonesian and English UI and portfolio copy.

The shell and responsive layout are in `index.html` and `src/styles.css`. `docs/AI_CONTEXT.md` records source mapping and evidence rules for future updates.

The highway case study uses `lane_mapping.jpg`, `lane_preview.jpg`, `evidence_hogging.jpg`, and `annotated_frame.jpg` from `public/portfolio/`, plus four dashboard captures from replay session `live_20261110_214853`: `dashboard-overview.jpg`, `dashboard-lane-usage.jpg`, `dashboard-hogging.jpg`, and `dashboard-quality.jpg`. The deployed dashboard at <https://lane.syaifudin-fam.my.id/> is linked from the top of the data pipeline page; it runs on replay data, not live camera inference. Video slots remain pending placeholders with their captions and alt text; drop the final files into `public/portfolio/` and update the corresponding paths in `src/main.js` when they are available.

## Content sources and evidence

The current candidate facts come from `resume_data_engineering_internship.tex` and `cv_ahmad_maulana_ibrahim.tex`. Those source documents are kept outside this website and were not edited. Repository-backed project descriptions follow the CV's GitHub audit snapshot dated 3 October 2026; the portfolio does not imply a new verification of live or production behavior. Education, contact, organization, course completion, and the additional Azure/AWS/C#/TensorFlow details are candidate-provided. Course completions are not described as professional certifications.

Project scope notes distinguish local or synthetic work, team contributions, sandbox/simulation behavior, design-only work, private repositories, and unverified deployment or hardware behavior. No professional employment, project dates, user counts, performance gains, certification, or proficiency score is added. Minor coursework projects are kept in a separate section without detail pages.
