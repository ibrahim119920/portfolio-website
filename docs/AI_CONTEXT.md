# AI Context — Portfolio Website

## Project purpose and design

This is Ahmad Maulana Ibrahim's portfolio. Keep its existing desktop/window/dock metaphor, six applications (home, about, projects, skills, learning, and contact), Lucide icons, and ID/EN interaction. The implementation is a standalone Vite project using vanilla JavaScript, CSS, and HTML. Do not migrate it to a framework or add dependencies, fonts, images, or unrelated visual redesigns without a request.

## Candidate facts and source mapping

The current source documents are:

- `resume_data_engineering_internship.tex` — contact details, Information Engineering education at Universitas Gadjah Mada, Sleman DIY location, GPA 3.41 (scale not stated), Find IT! duties, data engineering profile, selected projects, repository-backed skills, and five completed DataCamp courses.
- `cv_ahmad_maulana_ibrahim.tex` — broader project inventory and scope, Enforian UGM organizational duties, repository-backed technical skills, and additional user-reported Azure labs, AWS architecture/cost exercise, C#, and TensorFlow.

Both documents are maintained outside this website. They are the source of truth for candidate content; do not edit or copy them into the site. The previous starter copy claiming candidate information was unavailable is obsolete.

## Data organization

Keep portfolio copy and data in `src/main.js`:

- `profile`: name, contact links, education, location, positioning, and bilingual summary.
- `experience`: Find IT! UGM (Oct 2024–May 2025) and Enforian UGM (Sep–Dec 2024) organizational roles and user-provided duties.
- `projectSections`: documented projects grouped into data engineering; backend/software; mobile, ML, and simulation; and minor projects/coursework. Keep card summaries, contribution summaries, stacks, direct evidence anchors, visibility, and caveats together. Projects with `detailApp` get a shareable detail page; the minor C++ car-rental and OpenGL Porsche entries intentionally do not.
- `courses`: five completed DataCamp courses in the exact order and with the exact Statement of Accomplishment URLs supplied by the candidate. Dates were not supplied; these are course accomplishments, not professional certifications.
- `skillGroups`: repository-backed technical skills grouped by area.
- `engineeringConcepts`: concise concepts present in the project evidence.
- `reportedSkills`: candidate-reported Azure labs, AWS exercise, C#, and TensorFlow, separated from repository-backed skills.
- `translations`: Indonesian and English UI labels and content. Update both languages when changing important visitor-facing content, and keep `document.documentElement.lang`, browser title, and meta description in sync with the selected language.

`index.html` contains the shell and static controls. `src/styles.css` contains the existing visual system and responsive layout. `README.md` documents local commands and data organization.

## Evidence boundaries

The project evidence in the CV reflects a GitHub audit snapshot dated 3 October 2026. Links and descriptions reflect that document snapshot; do not imply that production behavior or linked repositories were freshly reverified.

- NusaCommerce uses synthetic e-commerce data and runs locally. Kafka is at-least-once with database-first offset commits; PySpark runs locally. The persistent checkpoint is a window-end timestamp, not a composite watermark.
- Chicago Traffic Crash counts and attribute totals are recorded notebook output, not new measurements. Attribute reduction is not a runtime or memory improvement claim.
- Rekberin's Midtrans integration uses the sandbox; seller payouts/refunds are simulated.
- Thrift payment behavior is simulated. Preserve the recorded ten-request race result (one order, nine conflicts) and the Newman snapshot's failed assertion; do not claim every test passes.
- Lelaku is described with the verified Team Lead/authentication contributor title. Its feature-branch integration and Azure database configuration are documented; deployment is unverified. Do not substitute the unconfirmed Project Manager title or invent management scope.
- RoutePulse, the CI/SSH workflow exercise, the AWS migration design, and the CRoute/Skills-swapping concept note are intentionally not shown in the visitor-facing project list.
- Photobooth's physical camera operation is unverified in the document snapshot; the repository is private and testing used a fake bridge.
- Highway Lane Occupancy & Hogging Detection is a separate local prototype documented by `docs/HANDOFF_WEB.md`. It covers a vision pipeline and a replay-fed FastAPI/Kafka/DuckDB/Streamlit platform. Hogging is a rule-based indication, replay is not live inference, and vehicle counts are a lower bound because track IDs can switch after occlusion. The five-minute night clip figures (158 vehicles, 111 events, 8.65 fps, 109 tests) and the 55-second day clip figures come from that handoff; the 10-minute clip results (10,786 frames, 323 tracks, 56 reviewed vehicles, 137 tests) come from the vision repository. The dashboard evidence in `public/portfolio/dashboard-*.jpg` comes from replay session `live_20261110_214853`: 10 of 10 windows complete, 650 events, 270 lane entries, 23 lane changes, 87 hogging signals across 4 lanes and 2 rules, 13/13 data checks passed, and 0 quarantined rows. Its 603 "vehicles seen" is the sum of the per-window vehicle counts, not unique tracks; preserve the per-window tables when updating. The pipeline case study links to the deployed dashboard at <https://lane.syaifudin-fam.my.id/>; it is a hosted instance fed by replay data, not live camera inference. Static frame and dashboard images are available in `public/portfolio/`; video slots remain pending.
- OpenGL Porsche 911 is a private repository. C++ Car Rental and OpenGL Porsche 911 are presented as minor coursework without detail pages.
- Use contributions language for collaborative repositories; do not imply sole authorship.
- Do not add project dates, employment, clients, users, performance gains, certifications, or proficiency ratings that are absent from the source documents.

The CV's user-reported Azure labs and AWS exercise remain distinct from repository-backed skills. Azure artifacts/scope are pending in the source; deployment is not confirmed. C# and TensorFlow are user-reported and should not be presented as repository-verified.

## Visitor-facing behavior

- English is the default language on page load (`state.language = 'en'` and `<html lang="en">`). Keep the ID/EN toggle available for Indonesian.
- Each application has a shareable URL routed in `src/main.js` through `appRoutes` / `routeAliases` and the History API. Navigation must not reload the document; back/forward must restore the matching view. Add new applications to `appMeta` and `appRoutes` together.
- The contact app uses `mailto:`, `tel:`, and the supplied GitHub/LinkedIn profiles. It has no form service and does not send messages.
- Search indexes applications, actual project names and terms, course titles, organizational experience, and skill groups. Results open their containing application.
- Keep the language toggle visible and usable on mobile. Use visible focus styles for links and controls; wrap long URLs/tokens, allow grid/flex children to shrink, and prevent accidental horizontal scrolling.
- Do not show starter instructions, made-up future projects, placeholders, or internal AI-context references in visitor flows.

## Running locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

The project is a Git repository published at https://github.com/ibrahim119920/portfolio-website. Keep `node_modules/` and `dist/` out of version control; build output is regenerated with `npm run build`. Do not change the resume, CV, audit files, or files under `sources/`.
