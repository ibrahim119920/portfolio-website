# Handoff — update the "NYC Mobility Lakehouse" project

Target: this portfolio site (`src/main.js`), project card + `lakehouse` detail viewer.
Source of truth: the repository `F:\Teknologi Informasi\Self Studies\Data Engineer\NYC Mobility Lakehouse on Databricks`.
Status of that repository: **uncommitted**. Do not commit, push, or delete anything there.

The project grew from **2 months (Jan–Feb 2024)** to **9 months (Jan–Sep 2024)**. The Job now runs end to end, and a 12-query analysis exists. The site still says "two months", "3 queries", "v0 to v5", and "Belum dijalankan" for orchestration. Those statements are now false.

---

## 0. Scope guardrails

- Change **only** the NYC Mobility Lakehouse card (`~line 92`) and its `lakehouse` viewer (`lakehouseData`, `lhMonthName`, `lhStats`, `lhFunnel`, `lhChecksum`, `lhDailyChart`, `lhOrchestration`) in `src/main.js`.
- Do **not** touch other projects, the shell, the design system, dependencies, or the framework.
- Keep ID and EN copy in sync. English is the default language.
- This folder is **not** a Git repository. Do not run `git init` and do not add one.
- Do not edit `dist/` by hand. It is a build output; regenerate with `npm run build` if the user wants the build refreshed.
- Do not invent numbers, dates, or results. Every figure below is copied from the source repository. If a value is not listed here, it is **not known** — do not guess.

### Where each fact comes from

| Fact | Authoritative file |
| --- | --- |
| Nine-month counts, reconciliation, Delta versions, backfill runs | `evidence/day7/07-backfill.md` |
| All 12 analysis results, per-month detail, limits | `evidence/day7/07-analysis.md` |
| Raw analysis outputs (exact numbers) | `evidence/day7/analysis_01_monthly_summary.csv` … `analysis_12_reconciliation.csv` |
| Job chain, rerun test, failed-input test | `evidence/day6/06-rerun-comparison.md` |
| Quality rules and per-rule rejects for Jan/Feb | `evidence/day4/04-silver.md` |
| Gold grain and reconciliation for Jan/Feb | `evidence/day5/05-gold.md` |
| Public summary | `README.md` (Results, Analysis, Limitations) |

Time convention used by the source evidence: Delta `last_write` and `DESCRIBE HISTORY` are **UTC**; Databricks screens, Runs tab, and file modification times are **WIB (UTC+7)**. The analysis CSVs contain no timestamps.

---

## 1. Project card (`src/main.js`, `~line 92`)

Replace the `scope`, `description`, and `caveat` blocks. Keep `title`, `icon`, `accent`, `links`, and `detailApp`.

```js
scope: {
  id: 'Databricks Free Edition · dataset NYC TLC Yellow Taxi Jan–Sep 2024 (9 bulan) · Bronze, Silver, dan Gold terbukti',
  en: 'Databricks Free Edition · NYC TLC Yellow Taxi dataset, Jan–Sep 2024 (9 months) · Bronze, Silver, and Gold proven'
},
description: {
  id: 'Membangun pipeline batch idempoten Bronze → Silver → Gold di Databricks Free Edition untuk dataset NYC TLC Yellow Taxi Januari–September 2024 (9 bulan, 30.020.554 perjalanan) dengan PySpark, SQL, dan Delta Lake. Setiap lapisan dimuat dengan overwrite selektif replaceWhere per source_month dan dijalankan oleh satu Job empat task yang sama untuk setiap bulan; backfill Maret–September memakai Job itu, bukan notebook terpisah. Idempotensinya dibuktikan lewat riwayat versi Delta dan checksum identik sebelum dan sesudah rerun. Gold direkonsiliasi terhadap Silver (selisih 0 di sembilan bulan), lalu dipakai untuk 12 query analisis deskriptif: ringkasan bulanan, perubahan bulanan, tren harian, pola hari dan jam, zona pickup, tipe pembayaran, serta ekor durasi.',
  en: 'Built an idempotent Bronze → Silver → Gold batch pipeline on Databricks Free Edition for the NYC TLC Yellow Taxi dataset (January–September 2024; 9 months, 30,020,554 trips) with PySpark, SQL, and Delta Lake. Each layer is loaded with a selective replaceWhere overwrite per source_month and driven by the same four-task Job for every month; the March–September backfill reused that Job rather than a separate notebook. Idempotency is evidenced by Delta version history and identical checksums before and after a rerun. Gold is reconciled against Silver (zero difference across nine months), then used for 12 descriptive analysis queries: monthly summary, month-over-month change, daily trend, weekday and hourly patterns, pickup zones, payment types, and the duration tail.'
},
caveat: {
  id: 'Sembilan bulan (Januari–September 2024) dan satu dataset; Oktober–Desember belum dimuat, jadi tidak ada klaim setahun penuh. Commit atomik per tabel, bukan lintas tabel. Tidak ada ID perjalanan unik sehingga deduplikasi tidak diterapkan; pemeriksaan grain ganda baru dilakukan untuk Januari–Februari. Satu writer; run paralel tidak diuji. Rincian penolakan per aturan hanya terukur untuk Januari–Februari; untuk Maret–September hanya dua aturan yang dihitung saat preflight. Analisis bersifat deskriptif, bukan kausal.',
  en: 'Nine months (January–September 2024) and one dataset; October–December are not loaded, so no full-year claim is made. Atomic commit per table, not across tables. No unique trip ID exists, so no deduplication was applied; the duplicate-grain check covers January–February only. Single writer; parallel runs are untested. Per-rule rejection counts are measured for January–February only; for March–September only two rules were counted in preflight. The analysis is descriptive, not causal.'
},
```

Remove from the caveat: "Dua bulan", "Two months", and any "Belum dijalankan" / "not yet run" claim about orchestration. The Job is proven now (7 backfill runs on 2026-11-06 plus the Day 6 runs).

The detail page header reuses `project.description` and `project.caveat` (`renderLakehousePage`, ~line 1240), so updating the card updates that header too. Do not create a second copy of the text.

Optional but recommended (only if you agree it improves search/filtering):
- Tags: add `'Databricks Workflows'` (the Job is now proven). Leave the rest unchanged.
- Terms: add `nine months analysis workflows backfill`.
- If you change tags/terms, update both the `tags` array and the `terms` string in the same entry.

---

## 2. Viewer data — `lakehouseData` (`~line 708`)

### 2.1 Header, dataset, totals

```js
environment: 'Databricks Free Edition (serverless) · catalog workspace · schema nyc_mobility',
dataset: {
  id: 'NYC TLC Yellow Taxi, Januari–September 2024 (9 bulan)',
  en: 'NYC TLC Yellow Taxi, January–September 2024 (9 months)'
},
totalRows: 30020554,
months: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09'],
```

`30,020,554` is the number of **Silver/trip rows that passed the quality rules** (also the total `SUM(trip_count)` in Gold). The raw Bronze row count is **30,021,209** (the sum of the nine monthly Bronze counts; 655 more than Silver, the rejected rows). Keep those two distinct.

### 2.2 Per-month counts

Replace the `counts` object with:

```js
counts: {
  '2024-01': { bronze: 2964624, outside: 18, silver: 2964550, rejected: 74, gold: 6949, zones: 260, days: 31 },
  '2024-02': { bronze: 3007526, outside: 15, silver: 3007504, rejected: 22, gold: 6499, zones: 254, days: 29 },
  '2024-03': { bronze: 3582628, outside: 23, silver: 3582488, rejected: 140, gold: 7180, zones: 259, days: 31 },
  '2024-04': { bronze: 3514289, outside: 9, silver: 3514210, rejected: 79, gold: 6943, zones: 259, days: 30 },
  '2024-05': { bronze: 3723833, outside: 33, silver: 3723758, rejected: 75, gold: 7260, zones: 258, days: 31 },
  '2024-06': { bronze: 3539193, outside: 51, silver: 3539134, rejected: 59, gold: 6993, zones: 260, days: 30 },
  '2024-07': { bronze: 3076903, outside: 47, silver: 3076851, rejected: 52, gold: 7191, zones: 258, days: 31 },
  '2024-08': { bronze: 2979183, outside: 51, silver: 2979123, rejected: 60, gold: 7267, zones: 259, days: 31 },
  '2024-09': { bronze: 3633030, outside: 49, silver: 3632936, rejected: 94, gold: 7097, zones: 258, days: 30 },
},
```

- `outside` is "pickup outside the month". For Jan/Feb it is the Silver reject-rule count; for Mar–Sep it is the preflight count. The two sets agree with the rejected totals.
- `zones` comes from `analysis_08_zone_concentration.csv` (`zones_with_trips`).
- `days` is the number of calendar days in the month; all 274 days are present.

### 2.3 Rejects per month

For **January and February only**, the per-rule counts were measured and the other two rules were 0. Keep those two arrays as they are.

For **March–September**, only two rules were counted (in preflight). Do **not** add the "Timestamp / zona null" and "Jarak negatif" rows as `0` for these months — they were not measured. Add the two measured rules and a per-month note:

```js
rejects: {
  '2024-01': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 56],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 18],
    [{ id: 'Timestamp / zona null', en: 'Null timestamp / zone' }, 0],
    [{ id: 'Jarak negatif', en: 'Negative distance' }, 0],
  ],
  '2024-02': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 7],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 15],
    [{ id: 'Timestamp / zona null', en: 'Null timestamp / zone' }, 0],
    [{ id: 'Jarak negatif', en: 'Negative distance' }, 0],
  ],
  '2024-03': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 117],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 23],
  ],
  '2024-04': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 70],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 9],
  ],
  '2024-05': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 42],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 33],
  ],
  '2024-06': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 8],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 51],
  ],
  '2024-07': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 5],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 47],
  ],
  '2024-08': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 9],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 51],
  ],
  '2024-09': [
    [{ id: 'Dropoff sebelum pickup', en: 'Dropoff before pickup' }, 45],
    [{ id: 'Pickup di luar bulan', en: 'Pickup outside month' }, 49],
  ],
},
```

The two counts add up exactly to `rejected` in every month. Add a `rejectNote` property to each March–September `counts` entry (example for `2024-03`) and render it in `lhFunnel`:

```js
'2024-03': {
  bronze: 3582628, outside: 23, silver: 3582488, rejected: 140, gold: 7180, zones: 259, days: 31,
  rejectNote: {
    id: 'Rincian per aturan diambil dari preflight (dropoff sebelum pickup dan pickup di luar bulan); aturan null timestamp/zona dan jarak negatif tidak diukur untuk bulan ini.',
    en: 'The per-rule split comes from preflight (dropoff before pickup and pickup outside the month); the null timestamp/zone and negative-distance rules were not measured for this month.'
  }
},
```

Then in `lhFunnel`, render the note when present and keep the existing "no row fails two rules" sentence for months without a note.

### 2.4 Stages

Update `stages` facts. Numbers:

- Source: 9 monthly Parquet files; **30,021,209** raw rows (sum of the nine monthly counts); outside-month pickups 9–51 per month (18 Jan, 15 Feb, 23 Mar, 9 Apr, 33 May, 51 Jun, 47 Jul, 51 Aug, 49 Sep).
- `00_prepare_batch`: 5 validation cases unchanged. The `2024-03` "file not found" case remains a valid historical test; the file was uploaded later and that month succeeded during the backfill. Optionally add a fact: `'2024-03: FileNotFoundError, tanpa perubahan tabel' / '2024-03: FileNotFoundError, no table change'`.
- Bronze: **30,021,209** rows; history **v0–v15**; rerun Jan ×2, Feb ×1 plus 7 backfilled months; checksum identical before/after for Jan/Feb.
- Silver: **30,020,554** accepted; **655** rejected (74 Jan, 22 Feb, 140 Mar, 79 Apr, 75 May, 59 Jun, 52 Jul, 60 Aug, 94 Sep); history **v0–v19**; Feb proof rerun v9.
- Gold: **63,379** rows total (sum of the nine monthly Gold row counts; 6,943–7,267 per month); history **v0–v14**; reconciliation difference **0 in all nine months**; duplicate grain **0 for Jan/Feb only** (label it that way); Feb rerun twice, checksum identical.
- SQL: **12** queries (not 3); top zone Jan 132 (145,240); top zone Sep 132 (188,141); zones are IDs with no name lookup. Optionally add credit card share 73.77%.

Do not write "v0 to v5" or "v0 to v9" as if they were final versions. The final versions are 15 / 19 / 14.

### 2.5 History timeline

Do not fabricate per-version entries for the backfill. The source only records the aggregate movement: **Bronze 8 → 15, Silver 12 → 19, Gold 7 → 14** (one version per month per table). Keep the existing detailed v0–v5 / v0–v9 / v0–v4 timeline and add a note under it, e.g.:

```js
const notes = {
  bronze: { id: 'Urutan run apa adanya: Jan, Jan, Feb, Jan, Feb. Day 6 dan Day 7 menambah versi setelah yang tercantum di sini.', en: 'Run order as recorded: Jan, Jan, Feb, Jan, Feb. Day 6 and Day 7 added versions after the ones listed here.' },
  silver: { id: 'Versi 1 sampai 8 adalah run pengembangan. Bukti idempotensi diambil dari v9. Backfill kemudian menambah versi hingga v19.', en: 'Versions 1–8 are development runs. The idempotency proof comes from v9. The backfill later added versions up to v19.' },
  gold: { id: 'Februari dijalankan ulang dua kali (v3 dan v4). Backfill kemudian menambah versi hingga v14.', en: 'February was rerun twice (v3 and v4). The backfill later added versions up to v14.' },
};
```

Add one explicit sentence: "Sebelum backfill versinya 8 / 12 / 7; sesudahnya 15 / 19 / 14." / "Before the backfill the versions were 8 / 12 / 7; afterwards 15 / 19 / 14."

### 2.6 Checksums

Add the seven new months to `checksums.bronze`, `checksums.silver`, and `checksums.gold`.

Bronze:

```js
'2024-03': { n: 3582628, total: 97162913.97, distance: 16184205.17 },
'2024-04': { n: 3514289, total: 96619892.35, distance: 18568977.97 },
'2024-05': { n: 3723833, total: 105662803.2,  distance: 19985997.28 },
'2024-06': { n: 3539193, total: 98854638.37, distance: 18481638.7 },
'2024-07': { n: 3076903, total: 86418496.54, distance: 15728474.14 },
'2024-08': { n: 2979183, total: 84225045.0,  distance: 14731655.02 },
'2024-09': { n: 3633030, total: 103683398.86, distance: 20858929.41 },
```

Silver and Gold (identical, because Gold only sums Silver):

```js
'2024-03': { n: 3582488, total: 97158149.49,  distance: 16183378.37, duration: 59730858.88 },
'2024-04': { n: 3514210, total: 96616785.96,  distance: 18568413.32, duration: 59897233.65 },
'2024-05': { n: 3723758, total: 105659924.38, distance: 19985487.33, duration: 67112341.1 },
'2024-06': { n: 3539134, total: 98853108.04,  distance: 18481464.67, duration: 62194286.5 },
'2024-07': { n: 3076851, total: 86416719.61,  distance: 15728217.09, duration: 52996975.48 },
'2024-08': { n: 2979123, total: 84223219.53,  distance: 14731421.46, duration: 51727198.78 },
'2024-09': { n: 3632936, total: 103680692.85, distance: 20858459.18, duration: 67650538.97 },
```

The duration sums are the `s_dur` values in `evidence/day7/snapshot_after_backfill.png`. They are recorded on the Gold lines; Silver produces the same total because Gold sums Silver, as already verified for January and February.

The 2024-05 correction matters: Gold `SUM(total_amount)` is **105,659,924.38**, which is **lower** than Bronze 105,662,803.2 by **2,878.82**. There is no anomaly. Do not reintroduce any "Gold > Bronze" claim.

### 2.7 Top zones

Add the seven months from `analysis_06_top10_zones_monthly.csv`:

```js
'2024-03': [[161, 163264], [132, 157703], [237, 155631], [236, 146044], [162, 123805], [230, 122966], [142, 114980], [186, 114760], [138, 107434], [170, 103756]],
'2024-04': [[237, 164925], [161, 163461], [132, 157999], [236, 151837], [162, 119331], [230, 117267], [142, 116869], [186, 111558], [138, 111164], [239, 100930]],
'2024-05': [[237, 183490], [161, 174674], [236, 168379], [132, 167541], [138, 127134], [162, 125414], [142, 124888], [230, 121995], [186, 114354], [163, 107302]],
'2024-06': [[161, 162918], [132, 161491], [237, 159529], [236, 143177], [162, 120751], [230, 117287], [138, 116103], [186, 111593], [142, 107171], [170, 103867]],
'2024-07': [[132, 182048], [161, 156024], [237, 128578], [162, 113486], [236, 109672], [230, 108810], [186, 106414], [138, 102986], [170, 95095], [142, 88935]],
'2024-08': [[132, 183242], [161, 140408], [237, 119450], [186, 105779], [162, 105148], [138, 102924], [230, 102918], [236, 101081], [170, 88761], [68, 84428]],
'2024-09': [[132, 188141], [237, 166032], [161, 153985], [236, 149284], [186, 120391], [162, 117163], [230, 113528], [138, 111111], [142, 107536], [68, 104583]],
```

### 2.8 Daily chart

The current `daily` array is only the first 17 days of January and the chart title says so. That is still factually true but no longer represents the project. Recommended replacement: nine points of **trips per day by month** from `analysis_02_trips_per_day_change.csv`.

```js
daily: [
  ['Jan', 95631], ['Feb', 103707], ['Mar', 115564], ['Apr', 117140], ['May', 120121],
  ['Jun', 117971], ['Jul', 99253], ['Aug', 96101], ['Sep', 121098],
],
```

Update `lhDailyChart` accordingly:

- Title: `'Perjalanan per hari menurut bulan, Jan–Sep 2024'` / `'Trips per day by month, Jan–Sep 2024'`.
- `aria-label`: `'Grafik garis trips per hari dari Januari sampai September 2024'` / `'Line chart of trips per day from January to September 2024'`.
- Tooltip: `` `${day}: ${lhNumber(value)} ${state.language === 'id' ? 'perjalanan' : 'trips'}` `` (remove the hardcoded "Jan").
- Replace the "only 17 days" lede with: `'Nilai adalah trips per hari, bukan total bulanan.'` / `'Values are trips per day, not monthly totals.'`

If you prefer to leave the chart untouched, then the "only 17 days" note must stay — but the handoff recommends the monthly series so the visual matches the nine-month scope.

### 2.9 Stats

Third stat currently reads "0 duplicated rows", which is only proven for Jan/Feb. Replace it with the nine-month reconciliation fact:

```js
<div class="lh-stat"><b>0</b><span>${lhLabel({ id: 'selisih rekonsiliasi', en: 'reconciliation gap' })}</span></div>
```

First stat label: change `'baris perjalanan' / 'trip rows'` to `'baris perjalanan (Silver)' / 'trip rows (Silver)'` so it is clear it is 30,020,554, not the 30,021,209 raw rows.

### 2.10 Month names

`lhMonthName` must know the seven new months, otherwise tabs render raw `2024-03` strings:

```js
const lhMonthName = (month) => ({
  '2024-01': { id: 'Januari 2024', en: 'January 2024' },
  '2024-02': { id: 'Februari 2024', en: 'February 2024' },
  '2024-03': { id: 'Maret 2024', en: 'March 2024' },
  '2024-04': { id: 'April 2024', en: 'April 2024' },
  '2024-05': { id: 'Mei 2024', en: 'May 2024' },
  '2024-06': { id: 'Juni 2024', en: 'June 2024' },
  '2024-07': { id: 'Juli 2024', en: 'July 2024' },
  '2024-08': { id: 'Agustus 2024', en: 'August 2024' },
  '2024-09': { id: 'September 2024', en: 'September 2024' },
}[month] ?? { id: month, en: month })[state.language];
```

`.lh-tabs` already has `flex-wrap: wrap`, so nine tabs wrap without a CSS change.

### 2.11 Limits and next steps

Replace `limits` and `nextSteps`:

```js
limits: [
  { id: 'Sembilan bulan (Januari–September 2024) dan satu jenis dataset. Oktober–Desember belum dimuat, jadi tidak ada klaim setahun penuh atau musiman.', en: 'Nine months (January–September 2024) and one dataset type. October–December are not loaded, so no full-year or seasonality claim is made.' },
  { id: 'Delta memberi commit atomik per tabel, bukan transaksi lintas tiga tabel. Jika Silver atau Gold gagal, Bronze mungkin sudah terbarui dan bulan itu dijalankan ulang.', en: 'Delta gives an atomic commit per table, not a transaction across three tables. If Silver or Gold fails, Bronze may already be updated and that month is rerun.' },
  { id: 'Tidak ada ID perjalanan unik, jadi tidak ada deduplikasi. Idempotensi berarti rerun tidak menggandakan batch. Pemeriksaan grain ganda hanya dilakukan untuk Januari–Februari.', en: 'No unique trip ID exists, so there is no deduplication. Idempotency means a rerun does not duplicate a batch. The duplicate-grain check covers January–February only.' },
  { id: 'Aturan awal tidak membatasi durasi: median 11,6–13,9 menit, p99 60,4–76,8 menit, maksimum 9.767,5 menit (April 2024). Setiap bulan punya 12–26 trip di atas 24 jam dan 796–1.132 trip berdurasi nol.', en: 'The initial rules do not bound duration: median 11.6–13.9 minutes, p99 60.4–76.8 minutes, maximum 9,767.5 minutes (April 2024). Every month has 12–26 trips over 24 hours and 796–1,132 zero-duration trips.' },
  { id: 'Nilai uang negatif dipertahankan. Aturan refund dan validasi domain zona belum ada. Zona masih berupa ID. Tip tunai tidak tercatat di sumber, jadi 21,94% hanya berlaku untuk kartu kredit.', en: 'Negative monetary values are retained. Refund rules and zone-domain validation are not implemented. Zones are still IDs. Cash tips are not recorded in the source, so 21.94% applies to credit-card trips only.' },
  { id: 'Satu writer berurutan; run paralel tidak diuji. Backfill berjalan di atas tabel yang sudah berisi Januari–Februari, bukan katalog kosong. Run 2024-08 memakan 11m 6s; penyebabnya tidak diselidiki.', en: 'Single sequential writer; parallel runs are untested. The backfill ran on tables that already held January–February, not an empty catalog. The 2024-08 run took 11m 6s; the cause was not investigated.' },
  { id: 'Rincian penolakan per aturan hanya terukur untuk Januari–Februari. Untuk Maret–September hanya dropoff sebelum pickup dan pickup di luar bulan yang dihitung saat preflight. Analisis bersifat deskriptif, bukan kausal.', en: 'Per-rule rejection counts are measured for January–February only. For March–September only dropoff before pickup and pickup outside the month were counted in preflight. The analysis is descriptive, not causal.' },
],
nextSteps: [
  { id: 'Lookup nama zona TLC', en: 'TLC zone-name lookup' },
  { id: 'Batas durasi dan aturan refund', en: 'Duration bounds and refund rules' },
  { id: 'Hitung penolakan per aturan untuk Maret–September', en: 'Per-rule rejection counts for March–September' },
  { id: 'Tabel log metrik', en: 'Metrics log table' },
  { id: 'Dashboard', en: 'Dashboard' },
  { id: 'CI/CD', en: 'CI/CD' },
  { id: 'Oktober–Desember 2024 dan dataset tambahan', en: 'October–December 2024 and additional datasets' },
],
```

---

## 3. Required render changes

### 3.1 `lhOrchestration()` — currently contradicts the data

Both cards say `Belum dijalankan` / "not yet proven". That is now false. Replace the whole function body with proven-state cards (keep the section id and grid classes; use `lh-badge` instead of `lh-pending`):

```js
function lhOrchestration() {
  return `
    <section class="lh-block" id="lh-orchestration">
      <h3>${lhLabel({ id: 'Orkestrasi dan uji ujung ke ujung', en: 'Orchestration and end-to-end test' })}</h3>
      <div class="lh-grid2">
        <div class="lh-pending-card">
          <h4>${lhLabel({ id: 'Job nyc_mobility_monthly', en: 'Job nyc_mobility_monthly' })}</h4>
          <span class="lh-badge">${lhLabel({ id: 'terbukti', en: 'proven' })}</span>
          <p>${lhLabel({
            id: 'Empat task berurutan: prepare → bronze → silver → gold, satu parameter source_month per run. Job yang sama dipakai untuk semua bulan.',
            en: 'Four chained tasks: prepare → bronze → silver → gold, one source_month parameter per run. The same Job is used for every month.'
          })}</p>
        </div>
        <div class="lh-pending-card">
          <h4>${lhLabel({ id: 'Backfill Maret–September 2024', en: 'March–September 2024 backfill' })}</h4>
          <span class="lh-badge">${lhLabel({ id: 'terbukti', en: 'proven' })}</span>
          <p>${lhLabel({
            id: 'Tujuh run sukses pada 6 November 2026, 19.00–19.18 WIB, total 19 menit. Januari dan Februari diverifikasi tidak berubah. Satu run 2024-08 memakan 11m 6s; penyebabnya tidak diselidiki.',
            en: 'Seven successful runs on 6 November 2026, 19:00–19:18 WIB, 19 minutes in total. January and February were verified unchanged. The 2024-08 run took 11m 6s; the cause was not investigated.'
          })}</p>
        </div>
      </div>
    </section>`;
}
```

If `lakehousePending` becomes unused after this, remove the constant (`~line 706`) and the comment above `lakehouseData` that says values render as "Belum dijalankan".

Optional third card: the failed-input test on 2026-11-05 — `prepare` failed with `FileNotFoundError` and no table changed (versions stayed 8/12/7). Label the message verbatim in Indonesian if you quote it; the English gloss is "input not found".

### 3.2 `lhFunnel()` — note for Mar–Sep

The generic sentence "Tidak ada baris yang gagal di dua aturan sekaligus..." is still true, but for Mar–Sep the breakdown is preflight-only. Render `counts.rejectNote` when it exists:

```js
${counts.rejectNote
  ? `<p class="lh-lede">${lhLabel(counts.rejectNote)}</p>`
  : `<p class="lh-lede">${lhLabel({ id: 'Tidak ada baris yang gagal di dua aturan sekaligus, jadi jumlah per aturan sama dengan baris ditolak.', en: 'No row fails two rules at once, so the per-rule counts add up to the rejected rows.' })}</p>`}
```

---

## 4. Analysis facts you may quote (all descriptive)

From `evidence/day7/07-analysis.md` and the CSVs:

| Fact | Value |
| --- | --- |
| Trips per day, Jan → Sep | 95,631 → 121,098 |
| Highest / lowest month by trips/day | Sep 121,098 / Jan 95,631 |
| Largest month-over-month drop | Jul −15.9% vs Jun |
| Largest month-over-month rise | Sep +26.0% vs Aug |
| Top-10 zone share of monthly trips | 36.6%–39.4% |
| Zones with trips per month | 254–260 |
| Credit card share | 73.77% of trips |
| Tips as % of fare, credit card | 21.94% |
| Cash tips | not recorded in the source |
| Median trip duration | 11.6–13.9 min |
| p99 duration | 60.4–76.8 min |
| Maximum duration | 9,767.5 min (April 2024) |
| Trips over 24 h per month | 12–26 |
| Zero-duration trips per month | 796–1,132 |
| Rejection rate | 0.00073%–0.00391% of Bronze rows |
| Gold `SUM(trip_count)` − Silver | 0 in all nine months |

Rules for using them:
- Say "descriptive", never causal. Do not explain the July drop or September rise.
- Zones are numeric IDs; do not name a zone.
- Do not present the 21.94% tip figure as an all-payment figure.
- Do not claim a full year or seasonality. Only Jan–Sep 2024 is loaded.
- Do not say "12 queries prove..." — they are descriptive queries, not tests.

Optional: add a compact facts block to `lhAnalysis` (payment share, median/p99/max duration, trips/day range). If you add it, keep it inside the existing section and do not add new dependencies.

---

## 5. Verification

1. `npm run build` must pass.
2. Search `src/main.js` and confirm **zero** matches for: `Jan–Feb`, `Januari–Februari`, `Dua bulan`, `Two months`, `Belum dijalankan`, `v0 sampai v5`, `v0 to v5`, `v0 sampai v9`, `3 queries`, `5972150`, `5.972.150`, `105,699,924`.
3. The month tabs must show nine names in both languages, and `2024-09` must render. The SQL stage fact must show **12** queries, not 3.
4. Funnel for `2024-09`: Bronze 3,633,030 − 94 = Silver 3,632,936; Gold 7,097; zones 258; days 30; note about preflight.
5. Checksum table for `2024-03`: Silver/Gold total `97,158,149.49`, distance `16,183,378.37`, duration `59,730,858.88`.
6. Orchestration section must not say "Belum dijalankan".
7. Switch ID ⇄ EN on the card, funnel, checksum, and orchestration sections; both must read naturally and carry the same numbers.
8. Do not touch other project entries: only the NYC card and the lakehouse viewer functions should differ.

---

## 6. Known gaps — leave them visible, do not fill them with guesses

- Duration sum for Mar–Sep is available from `snapshot_after_backfill.png`; do not recompute it from the rounded averages in `analysis_01`.
- Per-rule rejects for Mar–Sep → only the two preflight rules; the other two are unknown.
- Duplicate-grain check → Jan/Feb only.
- No screenshot exists of the 12 analysis results (CSV exports only). If the site claims screenshots, it should not.
- The backfill loop and `workflow_check` notebooks are not in the source repository (they live only in the workspace).
- October–December 2024 are not loaded.

If you need a value that is not in this handoff or in the source files, stop and ask the user instead of inventing it.
