import { inject, pageview } from '@vercel/analytics';
import { createIcons, icons } from 'lucide';
import './styles.css';

const analyticsEnabled = import.meta.env.PROD;
if (analyticsEnabled) inject({ mode: 'production', disableAutoTrack: true });
let lastTrackedPath = null;

function trackPageview(appId) {
  if (!analyticsEnabled) return;
  const path = pathForApp(appId);
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;
  const route = path.startsWith('/projects/') ? '/projects/:project' : path;
  pageview({ route, path });
}

// Candidate facts are mapped from the current resume and general CV. Project
// descriptions retain the scope and caveats recorded in the 3 October 2026 audit.
const profile = {
  name: 'Ahmad Maulana Ibrahim',
  initials: 'AMI',
  university: 'Universitas Gadjah Mada',
  program: { id: 'Sarjana Teknik, Teknologi Informasi', en: 'Bachelor of Engineering, Information Engineering' },
  graduation: { id: '2024 — Perkiraan lulus 2028', en: '2024 — Expected 2028' },
  gpa: '3.41',
  location: 'Sleman, DIY',
  role: {
    id: 'Mahasiswa Teknologi Informasi · Data engineering dan backend',
    en: 'Information Engineering undergraduate · Data engineering and backend',
  },
  email: 'ahmadmaulanaibrahim@mail.ugm.ac.id',
  phone: '+62 895 4189 38225',
  phoneHref: '+62895418938225',
  github: 'https://github.com/ibrahim119920',
  linkedin: 'https://www.linkedin.com/in/hmdibrahim/',
  summary: {
    id: 'Mahasiswa Information Engineering di Universitas Gadjah Mada dengan pengalaman dari proyek data engineering dan backend/software. Pekerjaan proyek juga mencakup aplikasi web dan mobile, machine learning, simulasi, serta latihan desain arsitektur cloud.',
    en: 'Information Engineering undergraduate at Universitas Gadjah Mada with project experience in data engineering and backend/software. Project work also includes web and mobile applications, machine learning, simulation, and cloud architecture design exercises.',
  },
  positioning: {
    id: 'Fokus utama saya adalah pipeline data dan sistem backend. Machine learning serta desain arsitektur cloud menjadi area pendukung dalam pekerjaan berbasis proyek.',
    en: 'My main focus is data pipelines and backend systems. Machine learning and cloud architecture design are supporting areas in project work.',
  },
};

const experience = [
  {
    organization: 'Find IT! UGM',
    role: { id: 'Staf Divisi Acara', en: 'Staff of Event Division' },
    period: 'Oct 2024 — May 2025',
    details: [
      {
        id: 'Berkolaborasi dengan tim divisi acara dalam menyusun konsep Find IT! 2025.',
        en: 'Collaborated with the event division team to develop the concept for Find IT! 2025.',
      },
      {
        id: 'Berkontribusi pada timeline acara dan rundown terperinci, termasuk jadwal serta urutan kegiatan.',
        en: 'Contributed to the event timeline and detailed rundown, including the planned schedule and sequence of activities.',
      },
      {
        id: 'Menjadi penghubung Divisi Acara dengan Divisi Perlengkapan dan Logistik untuk memfasilitasi komunikasi antartim.',
        en: "Served as the event division's liaison with the equipment and logistics division, facilitating communication between the teams.",
      },
    ],
  },
  {
    organization: 'Enforian UGM',
    role: { id: 'Staf Divisi Logistik dan Konsumsi', en: 'Staff of Logistics and Catering Division' },
    period: 'Sep 2024 — Dec 2024',
    details: [
      {
        id: 'Berkoordinasi dengan tim untuk mengatur konsumsi dan transportasi selama persiapan dan pelaksanaan acara.',
        en: 'Coordinated with the team to arrange food and transportation during event preparation and execution.',
      },
    ],
  },
];

const projectSections = [
  {
    id: 'data',
    icon: 'database',
    title: { id: 'Proyek utama', en: 'Main projects' },
    projects: [
      {
        title: 'NusaCommerce Data Platform',
        icon: 'database',
        accent: 'gold',
        order: 4,
        scope: { id: 'Arsitektur data platform · data e-commerce sintetis · ingestion incremental lokal', en: 'Data platform architecture · synthetic e-commerce data · local incremental ingestion' },
        description: {
          id: 'Merancang arsitektur data platform NusaCommerce: sumber PostgreSQL read replica dan Payment REST API (clickstream/Kafka sebagai target), alur Bronze → Silver → Gold → mart → dashboard dengan kontrak kualitas dan SLO freshness. Ingestion awal memakai incremental batch dengan composite watermark, keyset pagination, safe cutoff, lookback 15 menit, dan checkpoint yang hanya maju setelah commit durabel; implementasinya mencakup staging per page, finalisasi atomik, dan recovery rerun.',
          en: 'Designed the NusaCommerce data platform architecture: PostgreSQL read replica and Payment REST API sources (clickstream/Kafka as future targets), a Bronze → Silver → Gold → marts → dashboard flow with quality contracts and freshness SLOs. Initial ingestion uses incremental batch with a composite watermark, keyset pagination, safe cutoff, 15-minute lookback, and checkpoints that advance only after a durable commit; the implementation covers per-page staging, atomic finalization, and rerun recovery.',
        },
        summary: {
          id: 'Arsitektur data platform Bronze–Silver–Gold dan ingestion incremental PostgreSQL dengan checkpoint serta kontrak kualitas data.',
          en: 'Bronze–Silver–Gold data platform architecture and incremental PostgreSQL ingestion with checkpoints and data-quality contracts.',
        },
        caveat: {
          id: 'Arsitektur mencakup tiga sumber; alur yang berjalan saat ini baru ingestion orders dari tabel lokal dengan satu runner berurutan. Payment API masih berupa latihan, sedangkan dbt, Airflow, Kafka, dan clickstream belum diimplementasikan. Safe cutoff diberikan manual, replica lag belum diukur, dan hash-conflict quarantine serta lock untuk run paralel belum ada.',
          en: 'The architecture covers three sources; the running flow is currently orders ingestion from a local table with a single sequential runner. Payment API remains an exercise, while dbt, Airflow, Kafka, and clickstream are not implemented yet. Safe cutoff is supplied manually, replica lag is not measured, and hash-conflict quarantine and concurrent-run locking are not implemented.',
        },
        tags: ['Python', 'PostgreSQL', 'SQLAlchemy', 'Data architecture', 'Bronze–Silver–Gold', 'Incremental ingestion', 'Data quality', 'Docker Compose'],
        links: [
          { label: 'GitHub repository', href: 'https://github.com/ibrahim119920/nusacommerce-data-platform', visibility: 'public' },
          { label: 'Source snapshot (3 Oct 2026)', href: 'https://github.com/ibrahim119920/nusacommerce-data-platform-archive/tree/a01be84dfd284a28d4efa3fa5e7b0f2aa6b8306d', visibility: 'public' },
        ],
        terms: 'data platform architecture data lake warehouse bronze silver gold medallion incremental batch keyset pagination checkpoint data quality slo postgresql python',
        detailApp: 'nusacommerce',
      },
      {
        title: 'NYC Mobility Lakehouse',
        icon: 'car-taxi-front',
        accent: 'gold',
        order: 3,
        scope: { id: 'Databricks Free Edition · dataset NYC TLC Yellow Taxi Jan–Sep 2024 (9 bulan) · Bronze, Silver, dan Gold terbukti', en: 'Databricks Free Edition · NYC TLC Yellow Taxi dataset, Jan–Sep 2024 (9 months) · Bronze, Silver, and Gold proven' },
        description: {
          id: 'Pipeline batch idempoten Bronze → Silver → Gold di Databricks Free Edition untuk NYC TLC Yellow Taxi Januari–September 2024 (9 bulan, 30.020.554 perjalanan) dengan PySpark, SQL, dan Delta Lake. Satu Job empat task dengan replaceWhere per source_month; idempotensi dibuktikan checksum dan riwayat Delta, Gold direkonsiliasi ke Silver (selisih 0), lalu dipakai untuk 12 query analisis deskriptif.',
          en: 'Built an idempotent Bronze → Silver → Gold batch pipeline on Databricks Free Edition for NYC TLC Yellow Taxi, January–September 2024 (9 months, 30,020,554 trips), using PySpark, SQL, and Delta Lake. One four-task Job with a replaceWhere overwrite per source_month; checksums and Delta history prove idempotency, Gold is reconciled against Silver (zero difference), then used for 12 descriptive analysis queries.',
        },
        summary: {
          id: 'Pipeline batch idempoten Bronze–Silver–Gold di Databricks untuk 30 juta perjalanan NYC TLC 2024.',
          en: 'Idempotent Bronze–Silver–Gold batch pipeline in Databricks for 30 million NYC TLC trips in 2024.',
        },
        caveat: {
          id: 'Sembilan bulan (Januari–September 2024) dan satu dataset; Oktober–Desember belum dimuat, jadi tidak ada klaim setahun penuh. Commit atomik per tabel, bukan lintas tabel. Tidak ada ID perjalanan unik sehingga deduplikasi tidak diterapkan; pemeriksaan grain ganda baru dilakukan untuk Januari dan Februari. Satu writer; run paralel tidak diuji. Rincian penolakan per aturan hanya terukur untuk Januari dan Februari; untuk Maret–September hanya dua aturan yang dihitung saat preflight. Analisis bersifat deskriptif, bukan kausal.',
          en: 'Nine months (January–September 2024) and one dataset; October–December are not loaded, so no full-year claim is made. Atomic commit per table, not across tables. No unique trip ID exists, so no deduplication was applied; the duplicate-grain check covers January–February only. Single writer; parallel runs are untested. Per-rule rejection counts are measured for January–February only; for March–September only two rules were counted in preflight. The analysis is descriptive, not causal.',
        },
        tags: ['Databricks', 'Databricks Workflows', 'PySpark', 'SQL', 'Delta Lake', 'Medallion', 'replaceWhere', 'Batch pipeline'],
        links: [],
        terms: 'NYC TLC taxi lakehouse Databricks bronze silver gold Delta Lake replaceWhere idempotent batch PySpark medallion checksum nine months analysis workflows backfill',
        detailApp: 'lakehouse',
      },
      {
        title: 'Highway Lane Occupancy & Hogging Detection',
        icon: 'scan-line',
        accent: 'green',
        order: 1,
        scope: { id: 'Pipeline computer vision · prototipe kamera tunggal · video prerekam · ground truth 56 kendaraan', en: 'Computer-vision pipeline · single-camera prototype · prerecorded video · 56-vehicle ground truth' },
        description: {
          id: 'Pipeline computer vision memetakan kendaraan CCTV jalan tol ke enam lajur terkalibrasi, melacaknya dengan YOLO11n dan ByteTrack, lalu menghasilkan event lajur bertipe serta indikasi lane hogging berbasis aturan. Aturan dirombak memakai 56 kendaraan berlabel manual: lajur 2 dan 3 diawasi, kendaraan yang mendahului dikecualikan, dan lajur ditentukan lewat voting bbox. F1 naik dari 0,54 ke 0,93, false positive turun 9 ke 5, dan hogger yang lolos turun 24 ke 1. Klip bukti delapan detik dan thumbnail dipublikasikan dari unit komputasi Kaggle ke Nextcloud; event hanya menyimpan path file.',
          en: 'A computer-vision pipeline maps highway CCTV vehicles to six calibrated lanes, tracks them with YOLO11n and ByteTrack, and emits typed lane events plus rule-based hogging indications. The rules were rebuilt against 56 manually labelled vehicles: lanes 2 and 3 are monitored, legitimate overtaking is exempted, and lane membership is voted across the bounding box. F1 rose from 0.54 to 0.93, false positives fell from 9 to 5, and missed hoggers fell from 24 to 1. Eight-second evidence clips and thumbnails are published from the Kaggle computation unit to Nextcloud; the event record only stores the file path.',
        },
        summary: {
          id: 'Pipeline computer vision untuk CCTV jalan tol: enam lajur terkalibrasi, voting bbox, pemeriksaan kendaraan yang mendahului, dan aturan hogging yang di-tuning dengan 56 kendaraan berlabel.',
          en: 'Computer-vision pipeline for highway CCTV: six calibrated lanes, bbox voting, overtake-aware exemption, and hogging rules tuned on 56 labelled vehicles.',
        },
        caveat: {
          id: 'Prototipe pada satu profil kamera dan klip pendek. Hogging adalah indikasi berbasis aturan, bukan penentuan hukum; replay bukan inferensi langsung. Evaluasi memakai 56 kendaraan yang direview manual dari satu klip 10 menit, dengan akurasi kelas 85,7%; label bersifat level kendaraan, bukan bounding box, dan hasilnya tidak digeneralisasi ke seluruh lalu lintas.',
          en: 'Prototype on one camera profile and short clips. Hogging is a rule-based indication, not a legal determination; replay is not live inference. Evaluation uses 56 manually reviewed vehicles from one 10-minute clip, with 85.7% class accuracy; labels are vehicle-level, not bounding boxes, and the results are not generalized to all traffic.',
        },
        tags: ['Python', 'YOLO11n', 'ByteTrack', 'OpenCV', 'Ground Truth', 'Precision / Recall', 'Nextcloud', 'pytest'],
        links: [{ label: 'Vision pipeline repository', href: 'https://github.com/ibrahim119920/highway-lane-analytics', visibility: 'public' }],
        terms: 'highway lane occupancy detection vehicle tracking YOLO ByteTrack lane hogging ground truth tuning precision recall F1 computer vision CCTV bbox vote Kaggle Nextcloud evidence clips',
        detailApp: 'highway',
      },
      {
        title: 'Highway Lane Analytics — Data Pipeline & Dashboard',
        icon: 'workflow',
        accent: 'blue',
        order: 2,
        scope: { id: 'FastAPI receiver · Kafka · DuckDB / Parquet medallion · Streamlit · prototipe lokal', en: 'FastAPI receiver · Kafka · DuckDB / Parquet medallion · Streamlit · local prototype' },
        description: {
          id: 'Platform data yang menerima batch event dari pipeline vision, memvalidasi dan menghapus duplikat, memublikasikan ke Kafka, lalu membangun lapisan bronze, silver, dan gold untuk dashboard Streamlit empat halaman. Pada sesi replay live_20261110_214853, platform menerima 650 event, mencatat 603 kendaraan terlihat, 270 lane entry, 23 lane change, dan 87 indikasi hogging; 13 dari 13 pemeriksaan kualitas lolos dengan 0 baris karantina. Klip dan thumbnail disimpan di Nextcloud; dashboard memetakan metadata event ke file tersebut dan memutarnya lewat proxy server-side.',
          en: 'A data platform that receives event batches from the vision pipeline, validates and de-duplicates them, publishes to Kafka, and builds bronze, silver, and gold layers for a four-page Streamlit dashboard. In replay session live_20261110_214853 it ingested 650 events, counted 603 vehicles seen, 270 lane entries, 23 lane changes, and 87 hogging indications; 13 of 13 data checks passed with 0 quarantined rows. Clips and thumbnails live in Nextcloud; the dashboard maps event metadata to those files and streams them through a server-side proxy.',
        },
        summary: {
          id: 'Platform data FastAPI, Kafka, DuckDB, dan Streamlit yang mengubah event vision menjadi dashboard penggunaan lajur, sinyal hogging, dan kualitas data.',
          en: 'FastAPI, Kafka, DuckDB, and Streamlit platform that turns vision events into a dashboard for lane usage, hogging signals, and data quality.',
        },
        caveat: {
          id: 'Prototipe lokal yang dijalankan lewat replay, bukan ingestion kamera langsung. Repositori platform bersifat privat; dashboard dan bukti klip ditampilkan di halaman portofolio ini.',
          en: 'Local prototype driven by replay, not live camera ingestion. The platform repository is private; the dashboard and evidence clips are shown in this portfolio case study.',
        },
        tags: ['FastAPI', 'Kafka', 'DuckDB', 'Parquet', 'Streamlit', 'Nextcloud', 'pytest'],
        links: [],
        terms: 'highway data pipeline dashboard FastAPI Kafka DuckDB Parquet medallion Streamlit Nextcloud evidence clips dashboard',
        detailApp: 'highwaypipeline',
      },
    ],
  },
  {
    id: 'backend',
    icon: 'server',
    title: { id: 'Backend dan software', en: 'Backend and software' },
    projects: [
      {
        title: 'Rekberin — Transaction and Payment Contributions',
        icon: 'shield-check',
        accent: 'gold',
        scope: { id: 'Repositori publik tim · kontribusi individual melalui PR #28, #38, #44', en: 'Public team repository · individual contributions in PRs #28, #38, and #44' },
        description: {
          id: 'Berkontribusi pada persisted transaction APIs menggunakan TypeScript, Next.js, Prisma, dan PostgreSQL, termasuk atomic listing reservations serta participant-based access controls. Mengintegrasikan Midtrans Core API untuk QRIS sandbox, verifikasi tanda tangan webhook, dan rekonsiliasi pembayaran; menambahkan tes transaksi dan pembayaran melalui pull request yang digabungkan.',
          en: 'Contributed persisted transaction APIs using TypeScript, Next.js, Prisma, and PostgreSQL, including atomic listing reservations and participant-based access controls. Integrated Midtrans Core API sandbox QRIS payments, webhook signature verification, and payment reconciliation; added transaction and payment tests through merged pull requests.',
        },
        summary: {
          id: 'Kontribusi API transaksi Next.js/Prisma/PostgreSQL, reservasi listing atomik, dan pembayaran QRIS Midtrans sandbox.',
          en: 'Next.js/Prisma/PostgreSQL transaction APIs, atomic listing reservations, and Midtrans sandbox QRIS payments.',
        },
        caveat: {
          id: 'Integrasi Midtrans memakai sandbox. Seller payout dan refund masih disimulasikan.',
          en: 'Midtrans integration uses the sandbox. Seller payouts and refunds are simulated.',
        },
        tags: ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL', 'Midtrans sandbox', 'REST APIs'],
        links: [{ label: 'GitHub repository', href: 'https://github.com/aufaanggara/rekberin', visibility: 'public' }],
        terms: 'escrow QRIS payments transactions webhook reconciliation authorization',
        detailApp: 'rekberin',
      },
      {
        title: 'Lelaku — Team Lead and Authentication Contributor',
        icon: 'key-round',
        accent: 'blue',
        scope: { id: 'Repositori publik tim · integrasi branch fitur; deployment Azure belum terverifikasi', en: 'Public team repository · feature-branch integration; Azure deployment unverified' },
        description: {
          id: 'Mengimplementasikan auth/profile APIs FastAPI dan PostgreSQL dengan Argon2, revocable sessions, hashed tokens, secure cookies, serta unique email validation. Mengintegrasikan autentikasi frontend, trip, dan chat pada feature branch; merekonsiliasi migrasi Alembic dan menambahkan tes/CI.',
          en: 'Implemented FastAPI/PostgreSQL auth and profile APIs with Argon2, revocable sessions, hashed tokens, secure cookies, and unique email validation. Integrated frontend, trip, and chat authentication on a feature branch; reconciled Alembic migrations and added tests/CI.',
        },
        summary: {
          id: 'Auth/profile API FastAPI/PostgreSQL dengan Argon2, revocable session, dan integrasi frontend sebagai Team Lead.',
          en: 'FastAPI/PostgreSQL auth and profile APIs with Argon2, revocable sessions, and frontend integration as Team Lead.',
        },
        caveat: {
          id: 'Menyiapkan konfigurasi database TLS untuk rencana cutover Azure; deployment tidak terverifikasi.',
          en: 'Prepared database TLS configuration for an Azure cutover; deployment is unverified.',
        },
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'Argon2', 'Alembic', 'Authentication', 'CI'],
        links: [{ label: 'GitHub repository', href: 'https://github.com/ibrahim119920/lelaku', visibility: 'public' }],
        terms: 'identity sessions secure cookies trip chat TLS migration',
        detailApp: 'lelaku',
      },
      {
        title: 'Thrift Store / WantToSell — Backend and Testing Contributions',
        icon: 'shopping-bag',
        accent: 'violet',
        scope: { id: 'Repositori publik tim · kontribusi backend dan testing', en: 'Public team repository · backend and testing contributions' },
        description: {
          id: 'Mengintegrasikan autentikasi Express/MongoDB, product CRUD/search, favorites, orders, dan reviews. Mengimplementasikan reservasi stok satu item secara transaksional, expiry, dan simulasi pembayaran; menambahkan API/integrity tests. Hasil race purchase 10-request yang tercatat menghasilkan satu order dan sembilan conflict.',
          en: 'Integrated Express/MongoDB authentication, product CRUD/search, favorites, orders, and reviews. Implemented transactional stock-one reservations, expiry, and simulated payments; added API/integrity tests. A recorded ten-request purchase race returned one created order and nine conflicts.',
        },
        summary: {
          id: 'Backend Express/MongoDB untuk katalog, favorit, order, dan reservasi stok transaksional, plus pengujian API.',
          en: 'Express/MongoDB backend for catalog, favorites, orders, and transactional stock reservations, plus API testing.',
        },
        caveat: {
          id: 'Provider pembayaran merupakan simulasi. Laporan Newman pada snapshot mencatat satu assertion gagal.',
          en: 'The payment provider is simulated. The Newman report snapshot records one failed assertion.',
        },
        tags: ['JavaScript', 'Express', 'MongoDB', 'Mongoose', 'Transactions', 'Newman'],
        links: [{ label: 'GitHub repository', href: 'https://github.com/ibrahim119920/web-thrift-store', visibility: 'public' }],
        terms: 'inventory stock race condition concurrency shopping orders',
        detailApp: 'wanttosell',
      },
      {
        title: 'Photobooth — Local-First Kiosk Prototype',
        icon: 'camera',
        accent: 'gold',
        scope: { id: 'Repositori privat · operasi kamera fisik belum terverifikasi', en: 'Private repository · physical camera operation unverified' },
        description: {
          id: 'Mengimplementasikan session states Next.js/SQLite, idempotent commands, transaksi, audit logs, dan pemeriksaan health/backup lokal. Membuat batas integrasi kamera C++ dengan fake-bridge tests.',
          en: 'Implemented Next.js/SQLite session states, idempotent commands, transactions, audit logs, and local health/backup checks. Built a C++ camera bridge boundary with fake-bridge tests.',
        },
        summary: {
          id: 'Prototipe kiosk local-first Next.js/SQLite dengan state machine sesi, audit log, dan batas integrasi kamera C++.',
          en: 'Local-first Next.js/SQLite kiosk prototype with session state machine, audit logs, and a C++ camera bridge boundary.',
        },
        caveat: {
          id: 'Operasi kamera fisik belum terverifikasi pada snapshot dokumen.',
          en: 'Physical camera operation was unverified in the document snapshot.',
        },
        tags: ['Next.js', 'SQLite', 'C++ bridge', 'Transactions', 'Audit logs'],
        links: [{ label: 'Private GitHub repository', href: 'https://github.com/ibrahim119920/photobooth-project', visibility: 'private' }],
        terms: 'kiosk sessions camera local first',
        detailApp: 'photobooth',
      },
    ],
  },
  {
    id: 'mobile-ml',
    icon: 'chart-no-axes-combined',
    title: { id: 'Mobile, machine learning, dan simulasi', en: 'Mobile, machine learning, and simulation' },
    projects: [
      {
        title: 'Money Tracker — Flutter Application Contributions',
        icon: 'wallet-cards',
        accent: 'green',
        scope: { id: 'Repositori publik kolaboratif · kontribusi UI, navigasi, dan proyeksi', en: 'Public collaborative repository · UI, navigation, and projection contributions' },
        description: {
          id: 'Berkontribusi pada tab dashboard, navigasi bulan, dan proyeksi transaksi mendatang dengan regression tests dalam aplikasi Riverpod/GoRouter yang memakai data repository berbasis Supabase.',
          en: 'Contributed dashboard tabs, month navigation, and future transaction projections with regression tests in a Riverpod/GoRouter application using Supabase-backed data repositories.',
        },
        summary: {
          id: 'Kontribusi UI dashboard, navigasi bulan, dan proyeksi transaksi pada aplikasi Flutter/Riverpod.',
          en: 'Dashboard UI, month navigation, and transaction projection contributions in a Flutter/Riverpod application.',
        },
        caveat: null,
        tags: ['Dart', 'Flutter', 'Riverpod', 'GoRouter', 'Supabase'],
        links: [{ label: 'GitHub repository', href: 'https://github.com/ibrahim119920/money_tracker', visibility: 'public' }],
        terms: 'personal finance budgeting mobile application',
        detailApp: 'moneytracker',
      },
      {
        title: 'River Water-Level Modeling — TMA Experiment Family',
        icon: 'waves',
        accent: 'blue',
        scope: { id: 'Empat repositori publik · keluarga eksperimen', en: 'Four public repositories · experiment family' },
        description: {
          id: 'Mengembangkan seasonal baselines, residual boosting ensembles, temporal validation, fitur station/upstream river, dan experiment provenance. Notebook PyTorch mencakup training serta inference graph/time-series neural model.',
          en: 'Developed seasonal baselines, residual boosting ensembles, temporal validation, station/upstream-river features, and experiment provenance. PyTorch notebooks include graph/time-series neural model training and inference.',
        },
        summary: {
          id: 'Keluarga eksperimen forecasting TMA: baseline musiman, ensemble boosting, fitur station-aware, dan model graf/time-series.',
          en: 'TMA forecasting experiment family: seasonal baselines, boosting ensembles, station-aware features, and graph/time-series models.',
        },
        caveat: null,
        tags: ['CatBoost', 'XGBoost', 'PyTorch', 'Time series', 'Feature engineering'],
        links: [
          { label: 'CatBoost', href: 'https://github.com/ibrahim119920/TMA-CatBoostRegressor', visibility: 'public' },
          { label: 'XGBoost', href: 'https://github.com/ibrahim119920/TMA-Codex-XGBoost', visibility: 'public' },
          { label: 'Station-aware', href: 'https://github.com/ibrahim119920/tma-station-aware', visibility: 'public' },
          { label: 'Graph neural network', href: 'https://github.com/ibrahim119920/graph-nn-tma-mdpl', visibility: 'public' },
        ],
        terms: 'TMA water level river forecasting prediction hydrology regression',
        detailApp: 'riverlevel',
      },
      {
        title: 'ABM Exposure Simulation — Team Contributions',
        icon: 'orbit',
        accent: 'violet',
        scope: { id: 'Repositori publik tim · kontribusi vision, UI, dan heatmap', en: 'Public team repository · vision, UI, and heatmap contributions' },
        description: {
          id: 'Berkontribusi pada obstacle-aware vision/ray casting, pembaruan UI simulasi, dan interactive exposure heatmaps.',
          en: 'Contributed obstacle-aware vision/ray casting, simulation UI updates, and interactive exposure heatmaps.',
        },
        summary: {
          id: 'Kontribusi vision ray casting, UI simulasi, dan heatmap paparan pada simulasi agent-based Streamlit.',
          en: 'Ray-casting vision, simulation UI, and exposure heatmap contributions in a Streamlit agent-based simulation.',
        },
        caveat: null,
        tags: ['Python', 'Streamlit', 'NumPy', 'Matplotlib', 'Plotly'],
        links: [{ label: 'GitHub repository', href: 'https://github.com/TheGasz/ABM_ExposureSim', visibility: 'public' }],
        terms: 'agent based model simulation exposure spatial heatmap',
        detailApp: 'abm',
      },
    ],
  },
  {
    id: 'minor',
    icon: 'graduation-cap',
    title: { id: 'Proyek kecil dan tugas kuliah', en: 'Minor projects and coursework' },
    projects: [
      {
        title: 'Chicago Traffic Crash Preprocessing',
        icon: 'map-pin',
        accent: 'blue',
        scope: { id: 'Chicago Data Portal 2018–2025 · 3 tabel · 877.921 kecelakaan dipertahankan', en: 'Chicago Data Portal 2018–2025 · 3 tables · 877,921 crashes preserved' },
        description: {
          id: 'Membersihkan dan mengintegrasikan tiga tabel Chicago Data Portal (Crashes, Vehicles, People) 2018–2025 dengan Pandas, PyArrow/Parquet, GeoPandas, dan indeks SQLite sementara. Grain sumber dipertahankan; atribut dengan missing >30% dikeluarkan, ringkasan anak diagregasi sebelum join, dan 871.586 kecelakaan dipetakan ke 77 community area. Tabel analisis direduksi dari 67 menjadi 15 atribut (52 dihapus, 77,6%).',
          en: 'Cleaned and integrated three Chicago Data Portal tables (Crashes, Vehicles, People) for 2018–2025 with Pandas, PyArrow/Parquet, GeoPandas, and a temporary SQLite index. Source grain is preserved; attributes with >30% missing are dropped, child summaries are aggregated before joining, and 871,586 crashes are mapped to 77 community areas. The analysis table is reduced from 67 to 15 attributes (52 removed, 77.6%).',
        },
        summary: {
          id: 'Pembersihan dan integrasi 3 tabel Chicago crash 2018–2025; 877.921 kecelakaan dipertahankan dan dipetakan ke 77 community area.',
          en: 'Cleaning and integration of three Chicago crash tables for 2018–2025; 877,921 crashes preserved and mapped to 77 community areas.',
        },
        caveat: {
          id: 'Angka berasal dari salinan lokal; 6.335 kecelakaan belum terpetakan, 5.909 lokasi dan 891 total cedera masih tidak diketahui. Koordinat geocoder adalah estimasi alamat, dan jumlah kecelakaan bukan risiko per perjalanan karena data paparan tidak tersedia.',
          en: 'Figures come from a local copy; 6,335 crashes remain unmapped, and 5,909 locations and 891 injury totals remain unknown. Geocoder coordinates are address estimates, and crash counts are not per-trip risk because exposure data is unavailable.',
        },
        tags: ['Python', 'Pandas', 'PyArrow', 'Parquet', 'SQLite', 'GeoPandas', 'Jupyter'],
        links: [{ label: 'GitHub repository', href: 'https://github.com/ibrahim119920/traffic-crash-preprocessing', visibility: 'public' }],
        terms: 'traffic crash accidents geospatial preprocessing data cleaning Chicago',
        detailApp: 'chicago',
      },
      {
        title: 'C++ Car Rental Application',
        icon: 'car-front',
        accent: 'blue',
        scope: { id: 'Repositori publik · kontribusi aplikasi konsol OOP', en: 'Public repository · OOP console application contribution' },
        description: {
          id: 'Berkontribusi pada alur penyewaan konsol berbasis object-oriented programming dan penyimpanan text file.',
          en: 'Contributed to object-oriented console rental workflows and text-file persistence.',
        },
        summary: {
          id: 'Aplikasi konsol penyewaan mobil berorientasi objek dengan penyimpanan text file.',
          en: 'Object-oriented console car-rental application with text-file persistence.',
        },
        caveat: null,
        tags: ['C++', 'Object-oriented programming', 'File persistence'],
        links: [{ label: 'GitHub repository', href: 'https://github.com/ibrahim119920/Car-Rental-Application', visibility: 'public' }],
        terms: 'vehicle rental application',
      },
      {
        title: 'OpenGL Porsche 911 Prototype',
        icon: 'box',
        accent: 'violet',
        scope: { id: 'Repositori privat · model dan rendering grafis', en: 'Private repository · model and graphics rendering' },
        description: {
          id: 'Mengimplementasikan rendering mesh/model dan shader serta pemuatan model.',
          en: 'Implemented mesh/model and shader rendering plus model loading.',
        },
        summary: {
          id: 'Prototipe rendering Porsche 911 dengan mesh, shader, dan model loading.',
          en: 'Porsche 911 rendering prototype with meshes, shaders, and model loading.',
        },
        caveat: null,
        tags: ['C++', 'OpenGL', 'GLFW', 'GLAD', 'GLM', 'Assimp'],
        links: [{ label: 'Private GitHub repository', href: 'https://github.com/ibrahim119920/OpenGL-Porsche-911', visibility: 'private' }],
        terms: 'Porsche graphics 3D rendering model loading',
      },
    ],
  },
];

const projectPlainCopy = {
  nusacommerce: {
    scope: { id: 'Rencana memindahkan data toko online ke laporan dan dashboard', en: 'A plan for moving online-store data into reports and dashboards' },
    summary: { id: 'Rancangan data platform yang memuat order dengan aman dan berakhir di laporan serta dashboard.', en: 'A data platform design that loads orders safely and ends in reports and dashboards.' },
    description: { id: 'Proyek ini merancang alur data toko online: data order bergerak dari database melalui lapisan yang jelas menuju laporan. Jalur pertama memuat order baru dalam halaman kecil dan mengingat posisi terakhir, sehingga proses yang gagal bisa diulang dengan aman.', en: 'This project designs how online-store order data moves from its database through clear layers into reports. The first working path loads new orders in small pages and remembers where it stopped, so a failed load can be retried safely.' },
    caveat: { id: 'Rancangan mencakup tiga sumber, tetapi yang berjalan baru jalur order. Data pembayaran, clickstream, dan beberapa alat pendukung masih berupa rencana.', en: 'The design covers three sources, but only the order path is running. Payment data, clickstream, and several supporting tools are still design targets.' },
  },
  lakehouse: {
    scope: { id: 'Sembilan bulan data taksi New York · sekitar 30 juta perjalanan', en: 'Nine months of New York City taxi trips · about 30 million records' },
    summary: { id: 'Pipeline batch yang mengubah sembilan bulan data taksi NYC menjadi tabel ringkasan yang bersih.', en: 'A batch pipeline that turns nine months of NYC taxi data into clean summary tables.' },
    description: { id: 'Proyek ini memproses sembilan bulan perjalanan taksi New York City — lebih dari 30 juta perjalanan — dan mengubahnya menjadi tabel ringkasan untuk analisis. Job bulanan yang sama bisa dijalankan ulang tanpa menambah data ganda.', en: 'This project processes nine months of New York City taxi trips — more than 30 million records — and turns them into clean summary tables for analysis. The same monthly job can run again without adding duplicate data.' },
    caveat: { id: 'Hasilnya mencakup Januari–September 2024 saja, bukan setahun penuh. Analisisnya deskriptif, bukan kausal.', en: 'The result covers January–September 2024 only, not a full year. The analysis is descriptive, not causal.' },
  },
  chicago: {
    scope: { id: 'Data kecelakaan Chicago 2018–2025 · tiga tabel · 877.921 kecelakaan dipertahankan', en: 'Chicago crash data 2018–2025 · three tables · 877,921 crashes kept' },
    summary: { id: 'Membersihkan dan menggabungkan tiga tabel kecelakaan Chicago, lalu memetakan lokasinya ke community area.', en: 'Cleaning and joining three Chicago crash tables, then mapping crashes to community areas.' },
    description: { id: 'Proyek ini membersihkan dan menggabungkan tiga tabel kecelakaan Chicago agar bisa dianalisis bersama. Sebanyak 877.921 kecelakaan dipertahankan, sebagian besar dipetakan ke community area, dan tabel analisis dipangkas ke kolom yang penting.', en: 'This project cleans and joins three Chicago crash tables so they can be analysed together. It keeps 877,921 crashes, maps most of them to community areas, and trims the analysis table to the columns that matter.' },
    caveat: { id: 'Sebagian kecelakaan belum bisa dipetakan dan sebagian total cedera belum diketahui. Jumlah kecelakaan bukan ukuran risiko per perjalanan karena data paparan tidak tersedia.', en: 'Some crashes could not be mapped, and some injury totals are unknown. Crash counts are not the same as risk per trip because exposure data is missing.' },
  },
  highway: {
    scope: { id: 'Pipeline kamera · satu kamera · video prerekam · 56 kendaraan diperiksa manual', en: 'Camera pipeline · one camera · prerecorded video · 56 vehicles checked by hand' },
    summary: { id: 'Pipeline kamera yang mencatat penggunaan lajur dan lane hogging, dengan aturan yang diuji pada 56 kendaraan yang diperiksa manual.', en: 'A camera pipeline that records lane use and lane hogging, with rules checked against 56 vehicles reviewed by hand.' },
    description: { id: 'Proyek ini mengamati video jalan tol dan mencatat perilaku tiap kendaraan. Aturan lane hogging dirombak setelah 56 kendaraan diperiksa manual, menaikkan F1 aturan dari 0,54 ke 0,93. Klip bukti delapan detik dan thumbnail dikirim dari Kaggle ke Nextcloud; catatan event hanya menyimpan path file.', en: 'This project watches recorded highway video and records what each vehicle does. The lane-hogging rules were rebuilt after 56 vehicles were reviewed by hand, lifting rule F1 from 0.54 to 0.93. Eight-second evidence clips and thumbnails are sent from Kaggle to Nextcloud; the event record only stores the file path.' },
    caveat: { id: 'Ini prototipe pada satu kamera. Sinyal hogging adalah kecocokan aturan, bukan pelanggaran hukum. Hasil akurasi berlaku untuk 56 kendaraan dari satu klip, bukan seluruh lalu lintas.', en: 'This is a prototype on one camera. A hogging signal is a rule match, not a legal violation. The accuracy result applies to 56 reviewed vehicles from one clip, not all traffic.' },
  },
  highwaypipeline: {
    scope: { id: 'Platform data · FastAPI, Kafka, DuckDB, Streamlit · prototipe lokal', en: 'Data platform · FastAPI, Kafka, DuckDB, Streamlit · local prototype' },
    summary: { id: 'Platform data yang mengubah event kamera menjadi dashboard penggunaan lajur, sinyal hogging, dan kualitas data. Pada satu sesi uji, 650 event dan 603 kendaraan terlihat, dengan 87 sinyal hogging dan 13 dari 13 pemeriksaan kualitas lolos.', en: 'A data platform that turns camera events into a dashboard for lane usage, hogging signals, and data quality. In one test session it recorded 650 events and 603 vehicles seen, with 87 hogging signals and 13 of 13 quality checks passing.' },
    description: { id: 'Platform ini menerima event dari pipeline kamera, memeriksa dan menghapus duplikat, lalu menyimpannya dalam lapisan yang rapi untuk dashboard. Pada sesi uji live_20261110_214853, 10 dari 10 jendela selesai dengan 650 event, 603 kendaraan terlihat, 270 kendaraan masuk lajur, 23 perubahan lajur, dan 87 sinyal hogging; 13 dari 13 pemeriksaan kualitas lolos dan 0 baris ditolak. Klip dan thumbnail berada di Nextcloud; dashboard memutarnya lewat proxy di server.', en: 'This platform receives events from the camera pipeline, checks and de-duplicates them, and stores them in clear layers for the dashboard. In test session live_20261110_214853, 10 of 10 windows completed with 650 events, 603 vehicles seen, 270 lane entries, 23 lane changes, and 87 hogging signals; all 13 quality checks passed and 0 rows were rejected. Clips and thumbnails live in Nextcloud; the dashboard plays them through a server-side proxy.' },
    caveat: { id: 'Prototipe lokal yang dijalankan lewat replay, bukan kamera langsung. Repositori platform bersifat privat; dashboard dan bukti klip ditampilkan di studi kasus ini.', en: 'Local prototype driven by replay, not a live camera. The platform repository is private; the dashboard and evidence clips are shown in this case study.' },
  },
  rekberin: {
    scope: { id: 'Proyek tim publik · kontribusi saya di PR #28, #38, #44', en: 'Public team project · my work landed in PRs #28, #38, #44' },
    summary: { id: 'API transaksi dan pembayaran untuk layanan escrow, termasuk pembayaran QRIS sandbox.', en: 'Transaction and payment APIs for an escrow service, including QRIS sandbox payments.' },
    description: { id: 'Saya mengerjakan API transaksi yang menahan dan melepas pembayaran dengan aman, plus pembayaran QRIS sandbox dan pemeriksaan webhook. Pekerjaan ini digabungkan melalui pull request.', en: 'I worked on the transaction APIs that hold and release payments safely, plus sandbox QRIS payments and webhook checks. The work was merged through pull requests.' },
    caveat: { id: 'Pembayaran memakai akun sandbox. Payout seller dan refund masih disimulasikan.', en: 'Payments use a sandbox account. Seller payouts and refunds are simulated.' },
  },
  lelaku: {
    scope: { id: 'Proyek tim publik · integrasi feature branch · deployment Azure belum terverifikasi', en: 'Public team project · feature-branch integration · Azure deployment not verified' },
    summary: { id: 'Login, profil, dan sesi untuk aplikasi travel, dibangun dengan FastAPI dan PostgreSQL.', en: 'Login, profile, and session handling for a travel app, built with FastAPI and PostgreSQL.' },
    description: { id: 'Saya membangun API login, profil, dan sesi lalu menyambungkannya ke frontend. Password di-hash, sesi bisa dicabut, dan email harus unik.', en: 'I built login, profile, and session APIs and connected them to the frontend. Passwords are hashed, sessions can be revoked, and email addresses are unique.' },
    caveat: { id: 'Deployment Azure sudah disiapkan tetapi belum diverifikasi.', en: 'The Azure deployment was prepared but not verified.' },
  },
  wanttosell: {
    scope: { id: 'Proyek tim publik · backend dan testing', en: 'Public team project · backend and testing' },
    summary: { id: 'Backend toko thrift online dengan katalog, order, dan reservasi stok yang aman.', en: 'An online thrift store backend with catalog, orders, and safe stock reservations.' },
    description: { id: 'Saya mengerjakan backend Express dan MongoDB: login, pencarian produk, favorit, order, ulasan, dan reservasi stok. Uji race dengan sepuluh permintaan menghasilkan satu order dan sembilan konflik.', en: 'I worked on the Express and MongoDB backend: login, product search, favorites, orders, reviews, and stock reservations. A ten-request race test produced one order and nine conflicts.' },
    caveat: { id: 'Pembayaran masih simulasi, dan satu assertion API masih gagal.', en: 'Payments are simulated, and one API assertion still fails.' },
  },
  photobooth: {
    scope: { id: 'Proyek privat · operasi kamera fisik belum terverifikasi', en: 'Private project · physical camera operation not verified' },
    summary: { id: 'Aplikasi photo booth local-first dengan sesi, audit log, dan jembatan kamera.', en: 'A local-first photo booth app with sessions, audit logs, and a camera bridge.' },
    description: { id: 'Saya membangun alur sesi dan penyimpanan lokal untuk photo booth, plus jembatan C++ kecil ke kamera. Setiap tindakan dicatat untuk audit.', en: 'I built the session flow and local storage for a photo booth, plus a small C++ bridge to the camera. The app records each action for auditing.' },
    caveat: { id: 'Kamera fisik belum diuji; pengujian memakai kamera simulasi.', en: 'The physical camera was not tested; tests used a simulated camera.' },
  },
  moneytracker: {
    scope: { id: 'Proyek kolaboratif publik · UI, navigasi, dan proyeksi', en: 'Public collaborative project · UI, navigation, and projections' },
    summary: { id: 'Aplikasi keuangan Flutter dengan tab dashboard dan proyeksi transaksi mendatang.', en: 'A Flutter personal-finance app with dashboard tabs and future transaction projections.' },
    description: { id: 'Saya mengerjakan tab dashboard, navigasi bulan, dan proyeksi transaksi mendatang, dengan tes agar perhitungannya tetap stabil.', en: 'I worked on dashboard tabs, month navigation, and a projection of upcoming transactions, with tests to keep the calculations stable.' },
    caveat: null,
  },
  riverlevel: {
    scope: { id: 'Empat repositori publik · satu keluarga eksperimen', en: 'Four public repositories · an experiment family' },
    summary: { id: 'Rangkaian eksperimen untuk memprediksi ketinggian air sungai.', en: 'A family of experiments for forecasting river water levels.' },
    description: { id: 'Saya membandingkan baseline musiman sederhana dengan model boosting dan model neural, memakai validasi berbasis waktu dan fitur stasiun.', en: 'I compared simple seasonal baselines with boosting and neural models, using time-aware validation and station features.' },
    caveat: null,
  },
  abm: {
    scope: { id: 'Proyek tim publik · kontribusi vision, UI, dan heatmap', en: 'Public team project · vision, UI, and heatmap contributions' },
    summary: { id: 'Simulasi yang menunjukkan pergerakan orang dan area paparan.', en: 'A simulation that shows how people move and where they are exposed.' },
    description: { id: 'Saya mengerjakan vision berbasis obstacle, pembaruan UI simulasi, dan heatmap yang menunjukkan paparan.', en: 'I worked on obstacle-aware vision, simulation UI updates, and heatmaps that show exposure.' },
    caveat: null,
  },
  'C++ Car Rental Application': {
    scope: { id: 'Proyek publik · aplikasi konsol OOP', en: 'Public project · OOP console app' },
    summary: { id: 'Aplikasi penyewaan mobil konsol dengan C++ berorientasi objek.', en: 'A console car-rental app built with object-oriented C++.' },
    description: { id: 'Saya mengerjakan alur penyewaan dan penyimpanan data ke file teks.', en: 'I worked on rental workflows and saving data to text files.' },
    caveat: null,
  },
  'OpenGL Porsche 911 Prototype': {
    scope: { id: 'Proyek privat · model dan rendering grafis', en: 'Private project · graphics model and rendering' },
    summary: { id: 'Prototipe rendering Porsche 911 dengan mesh, shader, dan model loading.', en: 'A Porsche 911 rendering prototype with meshes, shaders, and model loading.' },
    description: { id: 'Saya membangun model loading, rendering mesh, dan shader untuk scene Porsche 911 3D.', en: 'I built model loading, mesh rendering, and shaders for a 3D Porsche 911 scene.' },
    caveat: null,
  },
};

function projectField(project, field) {
  if (state.copyMode === 'plain') {
    const key = project.detailApp ?? project.title;
    const plain = projectPlainCopy[key];
    if (plain && plain[field] != null) return plain[field];
  }
  return project[field];
}

const courses = [
  { title: 'Intermediate SQL', href: 'https://www.datacamp.com/statement-of-accomplishment/course/765f550ec280d12939854913201b66fbf0bb41cc?raw=1', terms: 'SQL querying joins' },
  { title: 'Joining Data in SQL', href: 'https://www.datacamp.com/statement-of-accomplishment/course/04232102ac88011c74b396dc92f56f9a01398c2e?raw=1', terms: 'SQL joins relational data' },
  { title: 'Cleaning Data in Python', href: 'https://www.datacamp.com/statement-of-accomplishment/course/bdf09f77bccc82f6261ba6fb6ce132e1b90e3c2a?raw=1', terms: 'Python data cleaning' },
  { title: 'Data Manipulation in SQL', href: 'https://www.datacamp.com/statement-of-accomplishment/course/c8f21ccfb9955ad13e4754efec108d4416b6edc7?raw=1', terms: 'SQL transform query' },
  { title: 'Introduction to Data Engineering', href: 'https://www.datacamp.com/statement-of-accomplishment/course/acbc6d963357e5a7dd581d0e60799c60616490f6?raw=1', terms: 'data engineering pipelines' },
];

const skillGroups = [
  { icon: 'code-2', title: { id: 'Pemrograman', en: 'Programming' }, skills: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Dart', 'C++', 'HTML/CSS'] },
  { icon: 'database', title: { id: 'Data engineering', en: 'Data engineering' }, skills: ['Pandas', 'NumPy', 'PyArrow', 'Parquet', 'dbt', 'Airflow', 'Kafka', 'PySpark (local)', 'GeoPandas', 'Jupyter'] },
  { icon: 'server', title: { id: 'Database', en: 'Databases' }, skills: ['PostgreSQL', 'SQLite', 'MongoDB', 'SQLAlchemy', 'Psycopg', 'Alembic', 'Prisma', 'Mongoose', 'better-sqlite3', 'Supabase'] },
  { icon: 'blocks', title: { id: 'Backend, web, dan mobile', en: 'Backend, web, and mobile' }, skills: ['Node.js', 'Express', 'FastAPI', 'Next.js', 'React', 'REST APIs', 'JSON Schema', 'Zod', 'JWT', 'bcrypt', 'Argon2', 'Flutter', 'Riverpod', 'GoRouter', 'Midtrans Core API (sandbox)'] },
  { icon: 'chart-no-axes-combined', title: { id: 'Machine learning', en: 'Machine learning' }, skills: ['scikit-learn', 'CatBoost', 'XGBoost', 'PyTorch', 'Feature engineering', 'Temporal validation', 'Regression ensembles', 'Graph/time-series modeling'] },
  { icon: 'workflow', title: { id: 'Infrastruktur dan testing', en: 'Infrastructure and testing' }, skills: ['Docker/Compose', 'Git/GitHub', 'GitHub Actions', 'SSH workflows', 'Prometheus', 'pytest', 'Vitest', 'Node.js test runner', 'Postman/Newman', 'Unit/integration/contract tests', 'Widget/golden tests', 'Data-quality tests'] },
  { icon: 'panel-top', title: { id: 'Visualisasi dan grafis', en: 'Visualization and graphics' }, skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Streamlit', 'Sharp', 'OpenGL', 'GLFW', 'GLAD', 'GLM', 'Assimp', 'Canon EDSDK bridge development'] },
];

const engineeringConcepts = [
  'Incremental ingestion', 'Keyset pagination', 'Checkpoints', 'Idempotency',
  'Warehouse modeling', 'Transactional inventory', 'State machines',
  'Authentication and access control', 'Database migrations', 'Architecture decision records',
];

const reportedSkills = [
  {
    title: { id: 'Lab Azure (self-reported)', en: 'Azure labs (self-reported)' },
    details: { id: 'VM, VNet/subnet, VM terisolasi, Functions, Cosmos DB, Application Insights, Load Balancer, dan networking.', en: 'VMs, VNet/subnets, isolated VMs, Functions, Cosmos DB, Application Insights, Load Balancer, and networking.' },
    note: { id: 'Artefak dan cakupan latihan belum disertakan dalam dokumen sumber.', en: 'Lab artifacts and scope were not included in the source documents.' },
  },
  {
    title: { id: 'Latihan arsitektur/biaya AWS (self-reported)', en: 'AWS architecture/cost exercise (self-reported)' },
    details: { id: 'Lambda, Rekognition, DynamoDB, IoT Core, S3, API Gateway, dan CloudWatch.', en: 'Lambda, Rekognition, DynamoDB, IoT Core, S3, API Gateway, and CloudWatch.' },
    note: { id: 'Desain dan estimasi; deployment tidak terkonfirmasi.', en: 'Design and estimation; deployment is unconfirmed.' },
  },
  {
    title: { id: 'Bahasa dan library tambahan (self-reported)', en: 'Additional languages and libraries (self-reported)' },
    details: { id: 'C# dan TensorFlow.', en: 'C# and TensorFlow.' },
    note: { id: 'Dipisahkan dari skill yang diverifikasi melalui repositori.', en: 'Kept separate from repository-verified skills.' },
  },
];

const appMeta = {
  home: { title: { id: 'Ringkasan', en: 'Overview' }, label: { id: 'Beranda', en: 'Home' }, icon: 'house' },
  about: { title: { id: 'Profil', en: 'Profile' }, label: { id: 'Profil', en: 'About' }, icon: 'user-round' },
  projects: { title: { id: 'Proyek', en: 'Projects' }, label: { id: 'Proyek', en: 'Projects' }, icon: 'folder-kanban' },
  skills: { title: { id: 'Keahlian', en: 'Skills' }, label: { id: 'Keahlian', en: 'Skills' }, icon: 'layers-3' },
  notes: { title: { id: 'Kursus dan pembelajaran', en: 'Courses and learning' }, label: { id: 'Pembelajaran', en: 'Learning' }, icon: 'notebook-pen' },
  contact: { title: { id: 'Kontak', en: 'Contact' }, label: { id: 'Kontak', en: 'Contact' }, icon: 'send' },
  lakehouse: { title: { id: 'Detail proyek — NYC Mobility Lakehouse', en: 'Project detail — NYC Mobility Lakehouse' }, label: { id: 'NYC Mobility Lakehouse', en: 'NYC Mobility Lakehouse' }, icon: 'car-taxi-front' },
  nusacommerce: { title: { id: 'Detail proyek — NusaCommerce Data Platform', en: 'Project detail — NusaCommerce Data Platform' }, label: { id: 'NusaCommerce Data Platform', en: 'NusaCommerce Data Platform' }, icon: 'database' },
  chicago: { title: { id: 'Detail proyek — Chicago Traffic Crash Preprocessing', en: 'Project detail — Chicago Traffic Crash Preprocessing' }, label: { id: 'Chicago Traffic Crash', en: 'Chicago Traffic Crash' }, icon: 'map-pin' },
  highway: {
    title: { id: 'Highway Lane Occupancy & Hogging Detection — Studi Kasus Computer Vision', en: 'Highway Lane Occupancy & Hogging Detection — Computer Vision Case Study' },
    label: { id: 'Highway Lane Occupancy', en: 'Highway Lane Occupancy' },
    icon: 'scan-line',
    description: {
      id: 'Pipeline computer vision yang memetakan kendaraan CCTV jalan tol ke enam lajur terkalibrasi dan menghasilkan event lane hogging berbasis aturan, dengan aturan yang di-tuning memakai 56 kendaraan berlabel manual.',
      en: 'A computer vision pipeline that maps highway CCTV vehicles to six calibrated lanes and emits rule-based lane-hogging events, with rules tuned on 56 manually labelled vehicles.',
    },
  },
  highwaypipeline: {
    title: { id: 'Detail proyek — Highway Lane Analytics: Data Pipeline & Dashboard', en: 'Project detail — Highway Lane Analytics: Data Pipeline & Dashboard' },
    label: { id: 'Highway Data Pipeline', en: 'Highway Data Pipeline' },
    icon: 'workflow',
    description: {
      id: 'Platform data FastAPI, Kafka, DuckDB, dan Streamlit yang menerima event vision, membangun lapisan medallion, dan menampilkan penggunaan lajur, sinyal hogging, serta kualitas data.',
      en: 'A FastAPI, Kafka, DuckDB, and Streamlit data platform that receives vision events, builds a medallion model, and shows lane usage, hogging signals, and data quality.',
    },
  },
  rekberin: { title: { id: 'Detail proyek — Rekberin', en: 'Project detail — Rekberin' }, label: { id: 'Rekberin', en: 'Rekberin' }, icon: 'shield-check' },
  lelaku: { title: { id: 'Detail proyek — Lelaku', en: 'Project detail — Lelaku' }, label: { id: 'Lelaku', en: 'Lelaku' }, icon: 'key-round' },
  wanttosell: { title: { id: 'Detail proyek — WantToSell', en: 'Project detail — WantToSell' }, label: { id: 'WantToSell', en: 'WantToSell' }, icon: 'shopping-bag' },
  photobooth: { title: { id: 'Detail proyek — Photobooth', en: 'Project detail — Photobooth' }, label: { id: 'Photobooth', en: 'Photobooth' }, icon: 'camera' },
  moneytracker: { title: { id: 'Detail proyek — Money Tracker', en: 'Project detail — Money Tracker' }, label: { id: 'Money Tracker', en: 'Money Tracker' }, icon: 'wallet-cards' },
  riverlevel: { title: { id: 'Detail proyek — River Water-Level Modeling', en: 'Project detail — River Water-Level Modeling' }, label: { id: 'River Water-Level Modeling', en: 'River Water-Level Modeling' }, icon: 'waves' },
  abm: { title: { id: 'Detail proyek — ABM Exposure Simulation', en: 'Project detail — ABM Exposure Simulation' }, label: { id: 'ABM Exposure Simulation', en: 'ABM Exposure Simulation' }, icon: 'orbit' },
};

// Each application owns one shareable URL. Navigating between applications uses
// the History API, so the document is never reloaded.
const appRoutes = {
  home: '/',
  about: '/about',
  projects: '/projects',
  skills: '/skills',
  notes: '/learning',
  contact: '/contact',
  lakehouse: '/projects/nyc-mobility-lakehouse',
  nusacommerce: '/projects/nusacommerce-data-platform',
  chicago: '/projects/chicago-traffic-crash',
  highway: '/projects/highway-lane-occupancy',
  highwaypipeline: '/projects/highway-lane-analytics-data-pipeline',
  rekberin: '/projects/rekberin',
  lelaku: '/projects/lelaku',
  wanttosell: '/projects/wanttosell',
  photobooth: '/projects/photobooth',
  moneytracker: '/projects/money-tracker',
  riverlevel: '/projects/river-water-level-modeling',
  abm: '/projects/abm-exposure-simulation',
};

const routeAliases = {
  '/home': 'home',
  '/profile': 'about',
  '/work': 'projects',
  '/courses': 'notes',
};

const routesByPath = {
  ...Object.fromEntries(Object.entries(appRoutes).map(([appId, path]) => [path, appId])),
  ...routeAliases,
};

function normalizeRoutePath(pathname = window.location.pathname) {
  const segments = pathname.split('/').filter(Boolean).join('/');
  return `/${segments}`.toLowerCase();
}

function appFromPath(pathname = window.location.pathname) {
  return routesByPath[normalizeRoutePath(pathname)] ?? null;
}

function pathForApp(appId) {
  return appRoutes[appId] ?? appRoutes.home;
}

function updateDocumentTitle(appId) {
  const meta = appMeta[appId];
  if (!meta) return;
  document.title = appId === 'home'
    ? t('documentTitle')
    : `${localized(meta.title)} — ${profile.name}`;
  const description = $('meta[name="description"]');
  if (description) description.content = meta.description ? localized(meta.description) : t('metaDescription');
}

function syncRoute(appId, mode = 'push') {
  const path = pathForApp(appId);
  if (window.location.pathname === path) return;
  const entry = { app: appId };
  if (mode === 'replace') window.history.replaceState(entry, '', path);
  else if (mode === 'push') window.history.pushState(entry, '', path);
}

function routeFromLocation() {
  const appId = appFromPath();
  if (!appId) {
    window.history.replaceState({ app: 'home' }, '', appRoutes.home);
    return 'home';
  }
  const canonical = pathForApp(appId);
  if (window.location.pathname !== canonical) window.history.replaceState({ app: appId }, '', canonical);
  return appId;
}

const translations = {
  id: {
    documentTitle: 'Ahmad Maulana Ibrahim — Portfolio',
    metaDescription: 'Portfolio Ahmad Maulana Ibrahim, mahasiswa Information Engineering UGM dengan proyek data engineering, backend/software, ML, dan desain arsitektur cloud.',
    systemMenus: 'Menu sistem', desktopApps: 'Aplikasi desktop',
    portfolioStatus: 'Status portfolio', applications: 'Aplikasi', windowControls: 'Kontrol jendela', closeHelp: 'Tutup bantuan',
    menuHome: 'Beranda', menuWork: 'Karya', menuView: 'Tampilan', menuHelp: 'Bantuan',
    projects: 'Proyek', skills: 'Keahlian', learning: 'Pembelajaran', notes: 'Pembelajaran', home: 'Beranda', about: 'Profil', contact: 'Kontak',
    openSearch: 'Buka pencarian', showHelp: 'Tampilkan bantuan', switchLanguage: 'EN', switchLanguageAria: 'Beralih ke bahasa Inggris',
    copyModeLabel: 'Gaya bahasa proyek', copyModeTechnical: 'Teknis', copyModePlain: 'Bahasa awam', technicalDetails: 'Detail teknis',
    switchToDark: 'Beralih ke mode gelap', switchToLight: 'Beralih ke mode terang', toastDark: 'Mode gelap aktif', toastLight: 'Mode terang aktif',
    maximize: 'Maksimalkan jendela', closeWindow: 'Tutup jendela', minimize: 'Minimalkan jendela', toggleMaximize: 'Ubah ukuran jendela',
    workMenu: 'Buka menu karya', viewMenu: 'Buka menu tampilan', helpMenu: 'Buka menu bantuan',
    toggleWindow: 'Ubah ukuran jendela', spotlight: 'Pencarian cepat', howToExplore: 'Cara menjelajah',
    bootLine: 'MENYIAPKAN PORTFOLIO AHMAD MAULANA IBRAHIM',
    homeKicker: 'PORTFOLIO MAHASISWA TEKNOLOGI INFORMASI',
    homeTitle: 'Data systems<br><em>built with care.</em>',
    homeIntro: 'Saya Ahmad Maulana Ibrahim, mahasiswa Information Engineering di Universitas Gadjah Mada. Saya membangun proyek data engineering dan backend/software, dengan ML dan desain cloud sebagai area pendukung.',
    openProfile: 'Lihat profil', viewProjects: 'Lihat proyek', homeWelcome: 'SELAMAT DATANG DI PORTFOLIO',
    homeWelcomeTitle: 'Karya<br>terpilih.',
    homeWelcomeBody: 'Jelajahi pekerjaan proyek, kontribusi organisasi, keahlian, dan kursus yang telah diselesaikan.',
    featureOne: 'Data engineering', featureOneBody: 'Pipeline, kualitas data, dan pemodelan warehouse.',
    featureTwo: 'Backend dan software', featureTwoBody: 'API, konsistensi database, dan aplikasi.',
    featureThree: 'Area pendukung', featureThreeBody: 'Machine learning, simulasi, dan desain cloud.',
    currentFocus: 'PENDIDIKAN', focusBody: 'Teknologi Informasi · Universitas Gadjah Mada · 2024–perkiraan 2028.',
    homeStatus: 'Mahasiswa Teknologi Informasi',
    widgetStatus: 'Teknologi Informasi · Sleman, DIY',
    widgetData: 'Data engineering', widgetDataSub: 'Pipeline · kualitas · warehouse',
    widgetBackend: 'Backend/software', widgetBackendSub: 'API · database · sistem',
    widgetSupporting: 'Pekerjaan pendukung', widgetSupportingSub: 'ML · simulasi · desain cloud',
    widgetQuote: '“Proyek dengan konteks dan cakupan yang jelas.”', widgetQuoteCaption: 'Portfolio',
    aboutEyebrow: 'PROFIL / 001', aboutTitle: 'Tentang Ahmad', aboutDescription: 'Mahasiswa Information Engineering dengan pengalaman dari proyek individu dan kolaboratif.',
    positioningLead: 'Membangun sistem data dan software backend.',
    projectWorkSummary: 'Dalam proyek, saya mengerjakan ingestion, kualitas data, konsistensi database, pengujian otomatis, dan layanan berbasis container.',
    education: 'Pendidikan', university: 'Universitas', program: 'Program', graduation: 'Masa studi', gpa: 'GPA', location: 'Lokasi',
    organizationalExperience: 'Pengalaman organisasi', seasonal: 'Kepanitiaan',
    projectsEyebrow: 'KARYA / 003', projectsTitle: 'Proyek terpilih',
    projectsDescription: 'Kontribusi, teknologi, dan cakupan implementasi pada proyek data, software, serta desain arsitektur.',
    projectEvidenceNote: 'Ringkasan repositori mengikuti snapshot audit GitHub 3 Oktober 2026; perilaku production tidak diverifikasi ulang.',
    repositoryPublic: 'Repositori GitHub publik', repositoryPrivate: 'Repositori GitHub privat',
    openRepository: 'Buka repositori', openPrivateRepository: 'Buka repositori privat', openDocument: 'Buka dokumen desain', openProjectDetail: 'Buka detail proyek',
    conceptTitle: 'Dokumentasi konsep tim', conceptNote: 'CRoute dan Skills-swapping dicantumkan sebagai dokumentasi konsep; aplikasi tidak diimplementasikan.',
    skillsEyebrow: 'KEAHLIAN / 004', skillsTitle: 'Keahlian teknis',
    skillsDescription: 'Teknologi dan konsep engineering yang saya gunakan dalam proyek, dikelompokkan berdasarkan bidang.',
    repositoryVerified: 'Skill terverifikasi melalui repositori', engineeringConcepts: 'Konsep engineering',
    reportedSkillsTitle: 'Lab dan pengalaman tambahan', reportedSkillsIntro: 'Pengalaman yang dilaporkan sendiri; artefak lab pendukung belum ditautkan di sini.',
    learningEyebrow: 'PEMBELAJARAN / 005', learningTitle: 'Kursus yang diselesaikan',
    learningDescription: 'Kursus DataCamp yang telah saya selesaikan dalam SQL, Python, dan data engineering.',
    completedCourse: 'Kursus DataCamp selesai', viewAccomplishment: 'Lihat Statement of Accomplishment',
    courseNote: 'Setiap tautan membuka Statement of Accomplishment dari DataCamp.',
    contactEyebrow: 'KONTAK / 006', contactTitle: 'Hubungi Ahmad',
    contactDescription: 'Kontak langsung melalui email atau telepon, atau temukan profil GitHub dan LinkedIn.',
    contactLead: 'Untuk percakapan tentang data engineering, backend/software, dan proyek teknologi.',
    email: 'Email', phone: 'Telepon', linkedin: 'LinkedIn', github: 'GitHub',
    emptyWindow: 'Jendela ditutup', openOverview: 'Buka ringkasan',
    searchEyebrow: 'PENCARIAN', searchTitle: 'Cari di portfolio.', searchPlaceholder: 'Cari aplikasi, proyek, kursus, pengalaman, atau keahlian…',
    searchHint: 'navigasi', searchOpenHint: 'buka', searchCloseHint: 'tutup', searchEmpty: 'Tidak ada hasil yang cocok.',
    helpEyebrow: 'PANDUAN SINGKAT', helpTitle: 'Jelajahi portfolio ini seperti workspace.',
    helpBody: 'Gunakan dock, shortcut desktop, atau menu atas untuk membuka enam aplikasi. Pencarian dapat menemukan proyek, halaman detail proyek, kursus, pengalaman organisasi, dan kelompok keahlian.',
    helpStepOne: 'Buka aplikasi', helpStepOneBody: 'Pilih ikon di dock atau shortcut desktop.',
    helpStepTwo: 'Cari konten', helpStepTwoBody: 'Tekan Ctrl/⌘ K, lalu cari topik atau nama proyek.',
    helpStepThree: 'Ganti bahasa', helpStepThreeBody: 'Gunakan tombol ID/EN di bagian kanan atas.', gotIt: 'Mengerti',
    windowClosedToast: 'Jendela ditutup · buka aplikasi dari dock', languageToast: 'Bahasa Indonesia aktif',
    noEmploymentClaim: 'Mahasiswa · pengalaman organisasi dan proyek',
    targetLink: 'Tautan eksternal akan dibuka di tab baru',
  },
  en: {
    documentTitle: 'Ahmad Maulana Ibrahim — Portfolio',
    metaDescription: 'Portfolio of Ahmad Maulana Ibrahim, Information Engineering undergraduate at UGM with data engineering, backend/software, ML, and cloud architecture design projects.',
    systemMenus: 'System menus', desktopApps: 'Desktop applications',
    portfolioStatus: 'Portfolio status', applications: 'Applications', windowControls: 'Window controls', closeHelp: 'Close help',
    menuHome: 'Home', menuWork: 'Work', menuView: 'View', menuHelp: 'Help',
    projects: 'Projects', skills: 'Skills', learning: 'Learning', notes: 'Learning', home: 'Home', about: 'About', contact: 'Contact',
    openSearch: 'Open search', showHelp: 'Show help', switchLanguage: 'ID', switchLanguageAria: 'Switch to Indonesian',
    copyModeLabel: 'Project writing style', copyModeTechnical: 'Technical', copyModePlain: 'Plain language', technicalDetails: 'Technical details',
    switchToDark: 'Switch to dark mode', switchToLight: 'Switch to light mode', toastDark: 'Dark mode active', toastLight: 'Light mode active',
    maximize: 'Maximize window', closeWindow: 'Close window', minimize: 'Minimize window', toggleMaximize: 'Toggle window size',
    workMenu: 'Open work menu', viewMenu: 'Open view menu', helpMenu: 'Open help menu',
    toggleWindow: 'Toggle window size', spotlight: 'Spotlight search', howToExplore: 'How to explore',
    bootLine: 'INITIALIZING AHMAD MAULANA IBRAHIM PORTFOLIO',
    homeKicker: 'INFORMATION ENGINEERING PORTFOLIO',
    homeTitle: 'Data systems<br><em>built with care.</em>',
    homeIntro: 'I am Ahmad Maulana Ibrahim, an Information Engineering undergraduate at Universitas Gadjah Mada. I build data engineering and backend/software projects, with ML and cloud design as supporting areas.',
    openProfile: 'View profile', viewProjects: 'View projects', homeWelcome: 'WELCOME TO THE PORTFOLIO',
    homeWelcomeTitle: 'Selected<br>work.',
    homeWelcomeBody: 'Explore project work, organizational contributions, technical skills, and completed courses.',
    featureOne: 'Data engineering', featureOneBody: 'Pipelines, data quality, and warehouse modeling.',
    featureTwo: 'Backend and software', featureTwoBody: 'APIs, database consistency, and applications.',
    featureThree: 'Supporting areas', featureThreeBody: 'Machine learning, simulation, and cloud design.',
    currentFocus: 'EDUCATION', focusBody: 'Information Engineering · Universitas Gadjah Mada · 2024–expected 2028.',
    homeStatus: 'Information Engineering undergraduate',
    widgetStatus: 'Information Engineering · Sleman, DIY',
    widgetData: 'Data engineering', widgetDataSub: 'Pipelines · quality · warehouse',
    widgetBackend: 'Backend/software', widgetBackendSub: 'APIs · databases · systems',
    widgetSupporting: 'Supporting project work', widgetSupportingSub: 'ML · simulation · cloud design',
    widgetQuote: '“Project work with clear context and scope.”', widgetQuoteCaption: 'Portfolio',
    aboutEyebrow: 'PROFILE / 001', aboutTitle: 'About Ahmad', aboutDescription: 'Information Engineering undergraduate with individual and collaborative project experience.',
    positioningLead: 'Building data systems and backend software.',
    projectWorkSummary: 'Project work includes ingestion, data quality, database consistency, automated testing, and containerized services.',
    education: 'Education', university: 'University', program: 'Program', graduation: 'Study period', gpa: 'GPA', location: 'Location',
    organizationalExperience: 'Organizational experience', seasonal: 'Seasonal',
    projectsEyebrow: 'WORK / 003', projectsTitle: 'Selected projects',
    projectsDescription: 'Contributions, technologies, and implementation scope across data, software, and architecture projects.',
    projectEvidenceNote: 'Repository summaries reflect the 3 October 2026 GitHub audit snapshot; production behavior was not reverified.',
    repositoryPublic: 'Public GitHub repository', repositoryPrivate: 'Private GitHub repository',
    openRepository: 'Open repository', openPrivateRepository: 'Open private repository', openDocument: 'Open design document', openProjectDetail: 'Open project detail',
    conceptTitle: 'Team concept documentation', conceptNote: 'CRoute and Skills-swapping are listed as concept documentation; the applications were not implemented.',
    skillsEyebrow: 'SKILLS / 004', skillsTitle: 'Technical skills',
    skillsDescription: 'Technologies and engineering concepts used in my projects, grouped by area.',
    repositoryVerified: 'Repository-verified skills', engineeringConcepts: 'Engineering concepts',
    reportedSkillsTitle: 'Additional labs and practice', reportedSkillsIntro: 'Self-reported experience; supporting lab artifacts are not linked here.',
    learningEyebrow: 'LEARNING / 005', learningTitle: 'Completed courses',
    learningDescription: 'DataCamp courses I have completed in SQL, Python, and data engineering.',
    completedCourse: 'Completed DataCamp course', viewAccomplishment: 'View Statement of Accomplishment',
    courseNote: 'Each link opens a DataCamp Statement of Accomplishment.',
    contactEyebrow: 'CONTACT / 006', contactTitle: 'Contact Ahmad',
    contactDescription: 'Reach out directly by email or phone, or visit the GitHub and LinkedIn profiles.',
    contactLead: 'For conversations about data engineering, backend/software, and technology projects.',
    email: 'Email', phone: 'Phone', linkedin: 'LinkedIn', github: 'GitHub',
    emptyWindow: 'Window closed', openOverview: 'Open overview',
    searchEyebrow: 'SEARCH', searchTitle: 'Search the portfolio.', searchPlaceholder: 'Search apps, projects, courses, experience, or skills…',
    searchHint: 'navigate', searchOpenHint: 'open', searchCloseHint: 'close', searchEmpty: 'No matching results.',
    helpEyebrow: 'QUICK GUIDE', helpTitle: 'Explore this portfolio like a workspace.',
    helpBody: 'Use the dock, desktop shortcuts, or top menu to open the six applications. Search can find projects, project detail pages, courses, organizational experience, and skill groups.',
    helpStepOne: 'Open an app', helpStepOneBody: 'Choose an icon in the dock or desktop shortcuts.',
    helpStepTwo: 'Find content', helpStepTwoBody: 'Press Ctrl/⌘ K, then search a topic or project name.',
    helpStepThree: 'Change language', helpStepThreeBody: 'Use the ID/EN button in the top right.', gotIt: 'Got it',
    windowClosedToast: 'Window closed · open an app from the dock', languageToast: 'English mode active',
    noEmploymentClaim: 'Undergraduate · organizational and project experience',
    targetLink: 'External link opens in a new tab',
  },
};

const state = {
  activeApp: 'home',
  language: 'en',
  darkMode: false,
  copyMode: 'technical',
  minimized: false,
  maximized: false,
  searchReturnFocus: null,
  helpReturnFocus: null,
  lakehouse: { stage: 'bronze', month: '2024-01', layer: 'silver', csLayer: 'silver' },
  nusacommerce: { stage: 'source', product: 'hourly' },
  chicago: { stage: 'source' },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const t = (key) => translations[state.language][key] ?? key;
const localized = (value) => typeof value === 'string' ? value : value[state.language];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function icon(name, className = '') {
  return `<i data-lucide="${escapeHtml(name)}"${className ? ` class="${escapeHtml(className)}"` : ''} aria-hidden="true"></i>`;
}

function refreshIcons() {
  createIcons({ icons });
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = t('documentTitle');
  $('meta[name="description"]').content = t('metaDescription');

  $$('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $$('[data-i18n-html]').forEach((element) => { element.innerHTML = t(element.dataset.i18nHtml); });
  $$('[data-i18n-aria]').forEach((element) => { element.setAttribute('aria-label', t(element.dataset.i18nAria)); });
  $$('[data-i18n-placeholder]').forEach((element) => { element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder)); });
  $$('[data-i18n-tooltip]').forEach((element) => { element.dataset.tooltip = t(element.dataset.i18nTooltip); });
  $('#languageButton').textContent = t('switchLanguage');
  $('#languageButton').setAttribute('aria-label', t('switchLanguageAria'));
  applyDarkMode();
  $('#windowTitle').textContent = localized(appMeta[state.activeApp].title);
}

function applyDarkMode() {
  document.documentElement.classList.toggle('theme-dark', state.darkMode);
  const button = $('#themeButton');
  if (!button) return;
  button.innerHTML = icon(state.darkMode ? 'sun' : 'moon');
  button.setAttribute('aria-label', t(state.darkMode ? 'switchToLight' : 'switchToDark'));
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  try { localStorage.setItem('portfolio-theme', state.darkMode ? 'dark' : 'light'); } catch { }
  applyDarkMode();
  refreshIcons();
  showToast(t(state.darkMode ? 'toastDark' : 'toastLight'));
}

function renderHome() {
  return `
    <section class="home-app" aria-labelledby="homeTitle">
      <div class="home-app__intro">
        <div class="eyebrow">${t('homeKicker')}</div>
        <div class="identity-row">
          <span class="identity-avatar">${escapeHtml(profile.initials)}</span>
          <span>${escapeHtml(profile.university)} <b>·</b> ${escapeHtml(profile.location)}</span>
        </div>
        <h1 id="homeTitle">${t('homeTitle')}</h1>
        <p class="lead-copy">${t('homeIntro')}</p>
        <div class="button-row">
          <a class="button button--dark" href="/about" data-open-app="about">${t('openProfile')} <span aria-hidden="true">→</span></a>
          <a class="button button--light" href="/projects" data-open-app="projects">${t('viewProjects')} ${icon('arrow-up-right')}</a>
        </div>
        <div class="identity-footnote"><span class="status-dot"></span><span>${t('homeStatus')}</span></div>
      </div>
      <div class="home-app__welcome">
        <div class="eyebrow">${t('homeWelcome')}</div>
        <h2>${t('homeWelcomeTitle')}</h2>
        <p>${t('homeWelcomeBody')}</p>
        <div class="feature-list">
          <div class="feature-row"><span>01</span><div><strong>${t('featureOne')}</strong><small>${t('featureOneBody')}</small></div></div>
          <div class="feature-row"><span>02</span><div><strong>${t('featureTwo')}</strong><small>${t('featureTwoBody')}</small></div></div>
          <div class="feature-row"><span>03</span><div><strong>${t('featureThree')}</strong><small>${t('featureThreeBody')}</small></div></div>
        </div>
        <div class="focus-card">
          <span class="focus-card__icon">${icon('graduation-cap')}</span>
          <div><span class="focus-card__eyebrow">${t('currentFocus')}</span><strong>${t('focusBody')}</strong></div>
        </div>
      </div>
    </section>
  `;
}

function renderExperienceCard(item) {
  return `
    <article class="experience-card">
      <div class="experience-card__top">
        <div><h4>${escapeHtml(item.organization)}</h4><p>${escapeHtml(localized(item.role))}</p></div>
        <span class="experience-card__period">${escapeHtml(item.period)}</span>
      </div>
      <ul>${item.details.map((detail) => `<li>${escapeHtml(localized(detail))}</li>`).join('')}</ul>
    </article>
  `;
}

function renderAbout() {
  return `
    <section class="content-app about-app" aria-labelledby="aboutTitle">
      <div class="content-header content-header--split">
        <div><div class="eyebrow">${t('aboutEyebrow')}</div><h2 id="aboutTitle">${t('aboutTitle')}</h2></div>
        <span class="header-stamp">INFORMATION<br />ENGINEERING</span>
      </div>
      <div class="about-grid">
        <div class="about-copy">
          <p class="about-lead">${t('positioningLead')}</p>
          <p>${escapeHtml(localized(profile.summary))}</p>
          <p>${escapeHtml(localized(profile.positioning))}</p>
          <p>${t('projectWorkSummary')}</p>
          <a class="inline-link" href="/contact" data-open-app="contact">${localized({ id: 'Lihat kontak', en: 'View contact details' })} ${icon('arrow-up-right')}</a>
        </div>
        <aside class="profile-card" aria-label="${t('education')}">
          <div class="profile-card__top"><span class="profile-card__avatar">${escapeHtml(profile.initials)}</span><span class="profile-card__signal">${t('noEmploymentClaim')}</span></div>
          <h3>${escapeHtml(profile.name)}</h3>
          <p>${escapeHtml(localized(profile.role))}</p>
          <div class="profile-facts">
            <div><span>${t('university')}</span><strong>${escapeHtml(profile.university)}</strong></div>
            <div><span>${t('program')}</span><strong>${escapeHtml(localized(profile.program))}</strong></div>
            <div><span>${t('graduation')}</span><strong>${escapeHtml(localized(profile.graduation))}</strong></div>
            <div><span>${t('gpa')}</span><strong>${escapeHtml(profile.gpa)}</strong></div>
            <div><span>${t('location')}</span><strong>${escapeHtml(profile.location)}</strong></div>
          </div>
        </aside>
      </div>
      <section class="experience-section" aria-labelledby="experienceTitle">
        <div class="section-heading"><span class="eyebrow">${t('seasonal')}</span><h3 id="experienceTitle">${t('organizationalExperience')}</h3></div>
        <div class="experience-list">${experience.map(renderExperienceCard).join('')}</div>
      </section>
    </section>
  `;
}

function projectLinkLabel(link) {
  if (link.label === 'Cloud design document') return t('openDocument');
  return link.visibility === 'private' ? t('openPrivateRepository') : t('openRepository');
}

// NYC Mobility Lakehouse evidence viewer. Figures come from the recorded
// Databricks runs and analysis exports bundled with the supplied pipeline
// notebook set. Values that were never captured stay null and render as "—";
// they are never estimated.
const lakehouseData = {
  environment: 'Databricks Free Edition (serverless) · catalog workspace · schema nyc_mobility',
  dataset: { id: 'NYC TLC Yellow Taxi, Januari–September 2024 (9 bulan)', en: 'NYC TLC Yellow Taxi, January–September 2024 (9 months)' },
  totalRows: 30020554,
  months: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09'],
  counts: {
    '2024-01': { bronze: 2964624, outside: 18, silver: 2964550, rejected: 74, gold: 6949, zones: 260, days: 31 },
    '2024-02': { bronze: 3007526, outside: 15, silver: 3007504, rejected: 22, gold: 6499, zones: 254, days: 29 },
    '2024-03': { bronze: 3582628, outside: 23, silver: 3582488, rejected: 140, gold: 7180, zones: 259, days: 31, rejectNote: {
      id: 'Rincian per aturan diambil dari preflight (dropoff sebelum pickup dan pickup di luar bulan); aturan null timestamp/zona dan jarak negatif tidak diukur untuk bulan ini.',
      en: 'The per-rule split comes from preflight (dropoff before pickup and pickup outside the month); the null timestamp/zone and negative-distance rules were not measured for this month.',
    } },
    '2024-04': { bronze: 3514289, outside: 9, silver: 3514210, rejected: 79, gold: 6943, zones: 259, days: 30, rejectNote: {
      id: 'Rincian per aturan diambil dari preflight (dropoff sebelum pickup dan pickup di luar bulan); aturan null timestamp/zona dan jarak negatif tidak diukur untuk bulan ini.',
      en: 'The per-rule split comes from preflight (dropoff before pickup and pickup outside the month); the null timestamp/zone and negative-distance rules were not measured for this month.',
    } },
    '2024-05': { bronze: 3723833, outside: 33, silver: 3723758, rejected: 75, gold: 7260, zones: 258, days: 31, rejectNote: {
      id: 'Rincian per aturan diambil dari preflight (dropoff sebelum pickup dan pickup di luar bulan); aturan null timestamp/zona dan jarak negatif tidak diukur untuk bulan ini.',
      en: 'The per-rule split comes from preflight (dropoff before pickup and pickup outside the month); the null timestamp/zone and negative-distance rules were not measured for this month.',
    } },
    '2024-06': { bronze: 3539193, outside: 51, silver: 3539134, rejected: 59, gold: 6993, zones: 260, days: 30, rejectNote: {
      id: 'Rincian per aturan diambil dari preflight (dropoff sebelum pickup dan pickup di luar bulan); aturan null timestamp/zona dan jarak negatif tidak diukur untuk bulan ini.',
      en: 'The per-rule split comes from preflight (dropoff before pickup and pickup outside the month); the null timestamp/zone and negative-distance rules were not measured for this month.',
    } },
    '2024-07': { bronze: 3076903, outside: 47, silver: 3076851, rejected: 52, gold: 7191, zones: 258, days: 31, rejectNote: {
      id: 'Rincian per aturan diambil dari preflight (dropoff sebelum pickup dan pickup di luar bulan); aturan null timestamp/zona dan jarak negatif tidak diukur untuk bulan ini.',
      en: 'The per-rule split comes from preflight (dropoff before pickup and pickup outside the month); the null timestamp/zone and negative-distance rules were not measured for this month.',
    } },
    '2024-08': { bronze: 2979183, outside: 51, silver: 2979123, rejected: 60, gold: 7267, zones: 259, days: 31, rejectNote: {
      id: 'Rincian per aturan diambil dari preflight (dropoff sebelum pickup dan pickup di luar bulan); aturan null timestamp/zona dan jarak negatif tidak diukur untuk bulan ini.',
      en: 'The per-rule split comes from preflight (dropoff before pickup and pickup outside the month); the null timestamp/zone and negative-distance rules were not measured for this month.',
    } },
    '2024-09': { bronze: 3633030, outside: 49, silver: 3632936, rejected: 94, gold: 7097, zones: 258, days: 30, rejectNote: {
      id: 'Rincian per aturan diambil dari preflight (dropoff sebelum pickup dan pickup di luar bulan); aturan null timestamp/zona dan jarak negatif tidak diukur untuk bulan ini.',
      en: 'The per-rule split comes from preflight (dropoff before pickup and pickup outside the month); the null timestamp/zone and negative-distance rules were not measured for this month.',
    } },
  },
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
  stages: [
    {
      id: 'source', name: 'Parquet TLC', file: 'Unity Catalog Volume', kind: 'source',
      summary: {
        id: 'Satu file Parquet bulanan lengkap per batch. Bulan ditentukan dari nama file, bukan dari timestamp pickup.',
        en: 'One complete monthly Parquet file per batch. The month comes from the file name, not the pickup timestamp.',
      },
      grain: { id: 'Satu baris per perjalanan', en: 'One row per trip' },
      write: { id: 'Hanya dibaca, tidak diubah', en: 'Read-only, never modified' },
      facts: [
        [{ id: 'File bulanan', en: 'Monthly files' }, 9],
        [{ id: 'Total baris mentah', en: 'Raw rows' }, 30021209],
        [{ id: 'Pickup di luar bulan', en: 'Outside-month pickups' }, { id: '9–51 per bulan', en: '9–51 per month' }],
        [{ id: 'Tipe waktu', en: 'Time type' }, 'timestamp_ntz'],
      ],
    },
    {
      id: 'prepare', name: '00_prepare_batch', file: 'notebook', kind: 'prepare',
      summary: {
        id: 'Memvalidasi parameter dan input sebelum ada yang ditulis. Gagal lebih awal, tabel tetap kosong.',
        en: 'Validates parameters and input before anything is written. Fails early, leaving the table empty.',
      },
      grain: { id: 'Tidak menulis data', en: 'Writes no data' },
      write: { id: 'Tanpa penulisan', en: 'No write' },
      facts: [
        [{ id: 'Kasus uji', en: 'Test cases' }, { id: '5 (2 lolos, 3 ditolak)', en: '5 (2 passed, 3 rejected)' }],
        [{ id: '2024-1', en: '2024-1' }, { id: 'ditolak: format harus YYYY-MM', en: 'rejected: format must be YYYY-MM' }],
        [{ id: '2024-13', en: '2024-13' }, { id: 'ditolak: bukan bulan valid', en: 'rejected: invalid month' }],
        [{ id: '2024-03', en: '2024-03' }, { id: 'FileNotFoundError, tabel tidak berubah', en: 'FileNotFoundError, no table change' }],
      ],
    },
    {
      id: 'bronze', name: 'Bronze', file: 'bronze_yellow_trips', kind: 'bronze',
      summary: {
        id: 'Salinan apa adanya dari sumber ditambah metadata. Baris bermasalah tetap disimpan untuk audit.',
        en: 'An as-is copy of the source plus metadata. Problem rows are retained for audit.',
      },
      grain: { id: 'Satu baris per baris sumber + source_month, source_file, ingested_at', en: 'One row per source row + source_month, source_file, ingested_at' },
      write: { id: "overwrite + replaceWhere source_month = 'YYYY-MM'", en: "overwrite + replaceWhere source_month = 'YYYY-MM'" },
      facts: [
        [{ id: 'Total baris', en: 'Total rows' }, 30021209],
        [{ id: 'Riwayat', en: 'History' }, { id: 'v0 sampai v15', en: 'v0 to v15' }],
        [{ id: 'Rerun', en: 'Rerun' }, { id: 'Jan ×2, Feb ×1 + 7 bulan backfill', en: 'Jan ×2, Feb ×1 + 7 backfilled months' }],
        [{ id: 'Checksum', en: 'Checksum' }, { id: 'identik sebelum/sesudah (Jan/Feb)', en: 'identical before/after (Jan/Feb)' }],
      ],
    },
    {
      id: 'silver', name: 'Silver', file: 'silver_yellow_trips', kind: 'silver',
      summary: {
        id: 'Baris yang lolos aturan kualitas, dengan kolom turunan pickup_date dan trip_duration_min.',
        en: 'Rows that pass the quality rules, with derived pickup_date and trip_duration_min columns.',
      },
      grain: { id: 'Satu baris per perjalanan valid', en: 'One row per valid trip' },
      write: { id: "overwrite + replaceWhere source_month = 'YYYY-MM'", en: "overwrite + replaceWhere source_month = 'YYYY-MM'" },
      facts: [
        [{ id: 'Diterima', en: 'Accepted' }, 30020554],
        [{ id: 'Ditolak', en: 'Rejected' }, { id: '655 (74 Jan, 22 Feb, 140 Mar, 79 Apr, 75 May, 59 Jun, 52 Jul, 60 Aug, 94 Sep)', en: '655 (74 Jan, 22 Feb, 140 Mar, 79 Apr, 75 May, 59 Jun, 52 Jul, 60 Aug, 94 Sep)' }],
        [{ id: 'Riwayat', en: 'History' }, { id: 'v0 sampai v19', en: 'v0 to v19' }],
        [{ id: 'Rerun Feb', en: 'Feb rerun' }, { id: 'v9, checksum identik', en: 'v9, checksum identical' }],
      ],
    },
    {
      id: 'gold', name: 'Gold', file: 'gold_daily_pickup_zone', kind: 'gold',
      summary: {
        id: 'Agregat harian per zona pickup. Jumlah trip_count harus sama dengan baris Silver.',
        en: 'Daily aggregate per pickup zone. The trip_count total must equal the Silver row count.',
      },
      grain: { id: 'Satu baris per source_month, pickup_date, pickup_location_id', en: 'One row per source_month, pickup_date, pickup_location_id' },
      write: { id: "overwrite + replaceWhere source_month = 'YYYY-MM'", en: "overwrite + replaceWhere source_month = 'YYYY-MM'" },
      facts: [
        [{ id: 'Baris Gold', en: 'Gold rows' }, { id: '63.379 total (6.943–7.267 per bulan)', en: '63,379 total (6,943–7,267 per month)' }],
        [{ id: 'Rekonsiliasi', en: 'Reconciliation' }, { id: 'selisih 0 di sembilan bulan', en: 'zero difference across nine months' }],
        [{ id: 'Grain ganda', en: 'Duplicate grain' }, { id: '0 (hanya Januari dan Februari diuji)', en: '0 (January–February tested only)' }],
        [{ id: 'Rerun Feb', en: 'Feb rerun' }, { id: 'dua kali, checksum identik', en: 'twice, checksum identical' }],
      ],
    },
    {
      id: 'sql', name: 'Analisis SQL', file: 'sql/02_analysis.sql', kind: 'sql',
      summary: {
        id: 'Ringkasan bulanan, tren harian, pola hari dan jam, zona pickup, tipe pembayaran, serta ekor durasi. Zona masih berupa ID.',
        en: 'Monthly summary, daily trend, weekday and hourly patterns, pickup zones, payment types, and the duration tail. Zones are still IDs.',
      },
      grain: { id: 'Hasil query', en: 'Query result' },
      write: { id: 'Hanya membaca Gold dan Silver', en: 'Reads Gold and Silver only' },
      facts: [
        [{ id: 'Query', en: 'Queries' }, 12],
        [{ id: 'Zona teratas Jan', en: 'Top zone Jan' }, { id: '132 (145.240)', en: '132 (145,240)' }],
        [{ id: 'Zona teratas Sep', en: 'Top zone Sep' }, { id: '132 (188.141)', en: '132 (188,141)' }],
        [{ id: 'Pembayaran kartu kredit', en: 'Credit-card share' }, { id: '73,77%', en: '73.77%' }],
        [{ id: 'Nama zona', en: 'Zone name' }, { id: 'belum ada lookup', en: 'no lookup yet' }],
      ],
    },
  ],
  history: {
    bronze: [
      { v: 0, ts: '2026-10-31 04:51:59', op: 'CREATE TABLE' },
      { v: 1, ts: '2026-10-31 08:56:20', m: '2024-01', rows: 2964624, removed: 0 },
      { v: 2, ts: '2026-10-31 08:57:11', m: '2024-01', rows: 2964624, removed: 1 },
      { v: 3, ts: '2026-10-31 08:58:20', m: '2024-02', rows: 3007526, removed: 0 },
      { v: 4, ts: '2026-10-31 09:04:43', m: '2024-01', rows: 2964624, removed: 1 },
      { v: 5, ts: '2026-10-31 11:02:40', m: '2024-02', rows: 3007526, removed: 1 },
    ],
    silver: [
      { v: 0, ts: '2026-10-31 04:52:02', op: 'CREATE TABLE' },
      { v: 1, ts: '2026-10-31 11:18:25', m: '2024-01', rows: 2964550, removed: 0 },
      { v: 2, ts: '2026-11-03 17:21:14', m: '2024-02', rows: 3007504, removed: 0 },
      { v: 3, ts: '2026-11-04 03:57:10', m: '2024-02', rows: 3007504, removed: 1 },
      { v: 4, ts: '2026-11-04 03:57:39', m: '2024-01', rows: 2964550, removed: 1 },
      { v: 5, ts: '2026-11-04 03:57:57', m: '2024-01', rows: 2964550, removed: 1 },
      { v: 6, ts: '2026-11-04 03:58:11', m: '2024-02', rows: 3007504, removed: 1 },
      { v: 7, ts: '2026-11-04 03:58:25', m: '2024-02', rows: 3007504, removed: 1 },
      { v: 8, ts: '2026-11-04 03:58:51', m: '2024-02', rows: 3007504, removed: 1 },
      { v: 9, ts: '2026-11-04 04:19:59', m: '2024-02', rows: 3007504, removed: 1, proof: true },
    ],
    gold: [
      { v: 0, ts: '2026-10-31 04:52:03', op: 'CREATE TABLE' },
      { v: 1, ts: '2026-11-04 04:27:47', m: '2024-01', rows: 6949, removed: 0 },
      { v: 2, ts: '2026-11-04 04:28:10', m: '2024-02', rows: 6499, removed: 0 },
      { v: 3, ts: '2026-11-04 04:31:10', m: '2024-02', rows: 6499, removed: 1 },
      { v: 4, ts: '2026-11-04 04:31:14', m: '2024-02', rows: 6499, removed: 1 },
    ],
  },
  checksums: {
    bronze: {
      '2024-01': { n: 2964624, total: 79456384.28, distance: 10827308.4 },
      '2024-02': { n: 3007526, total: 80073615.28, distance: 11611633.16 },
      '2024-03': { n: 3582628, total: 97162913.97, distance: 16184205.17 },
      '2024-04': { n: 3514289, total: 96619892.35, distance: 18568977.97 },
      '2024-05': { n: 3723833, total: 105662803.2, distance: 19985997.28 },
      '2024-06': { n: 3539193, total: 98854638.37, distance: 18481638.7 },
      '2024-07': { n: 3076903, total: 86418496.54, distance: 15728474.14 },
      '2024-08': { n: 2979183, total: 84225045.0, distance: 14731655.02 },
      '2024-09': { n: 3633030, total: 103683398.86, distance: 20858929.41 },
    },
    silver: {
      '2024-01': { n: 2964550, total: 79454065.5, distance: 10826845.05, duration: 46286364.08 },
      '2024-02': { n: 3007504, total: 80073049.72, distance: 11611564.98, duration: 48067561.23 },
      '2024-03': { n: 3582488, total: 97158149.49, distance: 16183378.37, duration: null },
      '2024-04': { n: 3514210, total: 96616785.96, distance: 18568413.32, duration: null },
      '2024-05': { n: 3723758, total: 105659924.38, distance: 19985487.33, duration: null },
      '2024-06': { n: 3539134, total: 98853108.04, distance: 18481464.67, duration: null },
      '2024-07': { n: 3076851, total: 86416719.61, distance: 15728217.09, duration: null },
      '2024-08': { n: 2979123, total: 84223219.53, distance: 14731421.46, duration: null },
      '2024-09': { n: 3632936, total: 103680692.85, distance: 20858459.18, duration: null },
    },
    gold: {
      '2024-01': { n: 2964550, total: 79454065.5, distance: 10826845.05, duration: 46286364.08 },
      '2024-02': { n: 3007504, total: 80073049.72, distance: 11611564.98, duration: 48067561.23 },
      '2024-03': { n: 3582488, total: 97158149.49, distance: 16183378.37, duration: null },
      '2024-04': { n: 3514210, total: 96616785.96, distance: 18568413.32, duration: null },
      '2024-05': { n: 3723758, total: 105659924.38, distance: 19985487.33, duration: null },
      '2024-06': { n: 3539134, total: 98853108.04, distance: 18481464.67, duration: null },
      '2024-07': { n: 3076851, total: 86416719.61, distance: 15728217.09, duration: null },
      '2024-08': { n: 2979123, total: 84223219.53, distance: 14731421.46, duration: null },
      '2024-09': { n: 3632936, total: 103680692.85, distance: 20858459.18, duration: null },
    },
  },
  topZones: {
    '2024-01': [[132, 145240], [161, 143469], [237, 142707], [236, 136464], [162, 106717], [230, 106324], [186, 104522], [142, 104080], [138, 89530], [239, 88474]],
    '2024-02': [[161, 147086], [237, 140800], [236, 134000], [132, 126800], [162, 105937], [230, 102279], [186, 100415], [142, 97252], [239, 90849], [163, 89182]],
    '2024-03': [[161, 163264], [132, 157703], [237, 155631], [236, 146044], [162, 123805], [230, 122966], [142, 114980], [186, 114760], [138, 107434], [170, 103756]],
    '2024-04': [[237, 164925], [161, 163461], [132, 157999], [236, 151837], [162, 119331], [230, 117267], [142, 116869], [186, 111558], [138, 111164], [239, 100930]],
    '2024-05': [[237, 183490], [161, 174674], [236, 168379], [132, 167541], [138, 127134], [162, 125414], [142, 124888], [230, 121995], [186, 114354], [163, 107302]],
    '2024-06': [[161, 162918], [132, 161491], [237, 159529], [236, 143177], [162, 120751], [230, 117287], [138, 116103], [186, 111593], [142, 107171], [170, 103867]],
    '2024-07': [[132, 182048], [161, 156024], [237, 128578], [162, 113486], [236, 109672], [230, 108810], [186, 106414], [138, 102986], [170, 95095], [142, 88935]],
    '2024-08': [[132, 183242], [161, 140408], [237, 119450], [186, 105779], [162, 105148], [138, 102924], [230, 102918], [236, 101081], [170, 88761], [68, 84428]],
    '2024-09': [[132, 188141], [237, 166032], [161, 153985], [236, 149284], [186, 120391], [162, 117163], [230, 113528], [138, 111111], [142, 107536], [68, 104583]],
  },
  daily: [
    ['Jan', 95631], ['Feb', 103707], ['Mar', 115564], ['Apr', 117140], ['May', 120121],
    ['Jun', 117971], ['Jul', 99253], ['Aug', 96101], ['Sep', 121098],
  ],
  limits: [
    { id: 'Sembilan bulan (Januari–September 2024) dan satu jenis dataset. Oktober–Desember belum dimuat, jadi tidak ada klaim setahun penuh atau musiman.', en: 'Nine months (January–September 2024) and one dataset type. October–December are not loaded, so no full-year or seasonality claim is made.' },
    { id: 'Delta memberi commit atomik per tabel, bukan transaksi lintas tiga tabel. Jika Silver atau Gold gagal, Bronze mungkin sudah terbarui dan bulan itu dijalankan ulang.', en: 'Delta gives an atomic commit per table, not a transaction across three tables. If Silver or Gold fails, Bronze may already be updated and that month is rerun.' },
    { id: 'Tidak ada ID perjalanan unik, jadi tidak ada deduplikasi. Idempotensi berarti rerun tidak menggandakan batch. Pemeriksaan grain ganda hanya dilakukan untuk Januari dan Februari.', en: 'No unique trip ID exists, so there is no deduplication. Idempotency means a rerun does not duplicate a batch. The duplicate-grain check covers January–February only.' },
    { id: 'Aturan awal tidak membatasi durasi: median 11,6–13,9 menit, p99 60,4–76,8 menit, maksimum 9.767,5 menit (April 2024). Setiap bulan punya 12–26 trip di atas 24 jam dan 796–1.132 trip berdurasi nol.', en: 'The initial rules do not bound duration: median 11.6–13.9 minutes, p99 60.4–76.8 minutes, maximum 9,767.5 minutes (April 2024). Every month has 12–26 trips over 24 hours and 796–1,132 zero-duration trips.' },
    { id: 'Nilai uang negatif dipertahankan. Aturan refund dan validasi domain zona belum ada. Zona masih berupa ID. Tip tunai tidak tercatat di sumber, jadi 21,94% hanya berlaku untuk kartu kredit.', en: 'Negative monetary values are retained. Refund rules and zone-domain validation are not implemented. Zones are still IDs. Cash tips are not recorded in the source, so 21.94% applies to credit-card trips only.' },
    { id: 'Satu writer berurutan; run paralel tidak diuji. Backfill berjalan di atas tabel yang sudah berisi Januari dan Februari, bukan katalog kosong. Run 2024-08 memakan 11m 6s; penyebabnya tidak diselidiki.', en: 'Single sequential writer; parallel runs are untested. The backfill ran on tables that already held January–February, not an empty catalog. The 2024-08 run took 11m 6s; the cause was not investigated.' },
    { id: 'Rincian penolakan per aturan hanya terukur untuk Januari dan Februari. Untuk Maret–September hanya dropoff sebelum pickup dan pickup di luar bulan yang dihitung saat preflight. Analisis bersifat deskriptif, bukan kausal.', en: 'Per-rule rejection counts are measured for January–February only. For March–September only dropoff before pickup and pickup outside the month were counted in preflight. The analysis is descriptive, not causal.' },
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
};

const lhLocale = () => (state.language === 'id' ? 'id-ID' : 'en-US');
const lhNumber = (value) => new Intl.NumberFormat(lhLocale()).format(value);
const lhDecimal = (value) => new Intl.NumberFormat(lhLocale(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const lhLabel = (value) => escapeHtml(localized(value));
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
const lhCompact = (value) => `${Math.round(value / 1000)}${state.language === 'id' ? 'rb' : 'k'}`;

function lhStats() {
  return `
    <div class="lh-stats">
      <div class="lh-stat"><b>${lhNumber(lakehouseData.totalRows)}</b><span>${lhLabel({ id: 'baris perjalanan (Silver)', en: 'trip rows (Silver)' })}</span></div>
      <div class="lh-stat"><b>${lakehouseData.months.length}</b><span>${lhLabel({ id: 'bulan data', en: 'months of data' })}</span></div>
      <div class="lh-stat"><b>0</b><span>${lhLabel({ id: 'selisih rekonsiliasi', en: 'reconciliation gap' })}</span></div>
    </div>`;
}

function lhStageDetail() {
  const stage = lakehouseData.stages.find((entry) => entry.id === state.lakehouse.stage);
  return `
    <div class="lh-detail lh-detail--${stage.kind}">
      <div>
        <h4>${escapeHtml(stage.name)} <span class="lh-badge">${lhLabel({ id: 'terbukti', en: 'proven' })}</span></h4>
        <p>${escapeHtml(localized(stage.summary))}</p>
        <dl class="lh-kv">
          <dt>${lhLabel({ id: 'Grain', en: 'Grain' })}</dt><dd>${escapeHtml(localized(stage.grain))}</dd>
          <dt>${lhLabel({ id: 'Strategi tulis', en: 'Write strategy' })}</dt><dd><code>${escapeHtml(localized(stage.write))}</code></dd>
        </dl>
      </div>
      <ul class="lh-facts">
        ${stage.facts.map(([label, value]) => `<li><span>${lhLabel(label)}</span><b>${typeof value === 'number' ? lhNumber(value) : escapeHtml(localized(value))}</b></li>`).join('')}
      </ul>
    </div>`;
}

function lhPipeline() {
  const nodes = lakehouseData.stages.map((stage, index) => {
    const active = state.lakehouse.stage === stage.id;
    return `
      <button type="button" class="lh-node lh-node--${stage.kind}${active ? ' is-on' : ''}" data-lh-stage="${escapeHtml(stage.id)}" aria-pressed="${active}">
        <span class="lh-node__name">${escapeHtml(stage.name)}</span>
        <span class="lh-node__file">${escapeHtml(stage.file)}</span>
      </button>
      ${index < lakehouseData.stages.length - 1 ? '<span class="lh-arrow" aria-hidden="true">→</span>' : ''}`;
  }).join('');
  return `
    <section class="lh-block" id="lh-pipeline">
      <h3>${lhLabel({ id: 'Jalur data', en: 'Data path' })}</h3>
      <p class="lh-lede">${lhLabel({ id: 'Pilih tahap untuk melihat isi, grain, dan strategi tulisnya.', en: 'Select a stage to inspect its contents, grain, and write strategy.' })}</p>
      <div class="lh-flow" role="group" aria-label="${lhLabel({ id: 'Tahap pipeline', en: 'Pipeline stages' })}">${nodes}</div>
      <div id="lh-stage-detail">${lhStageDetail()}</div>
    </section>`;
}

function lhFunnel() {
  const counts = lakehouseData.counts[state.lakehouse.month];
  const reasons = lakehouseData.rejects[state.lakehouse.month];
  const max = Math.max(...reasons.map(([, value]) => value), 1);
  const rejectedTitle = state.language === 'id'
    ? `Mengapa ${lhNumber(counts.rejected)} baris ditolak di Silver`
    : `Why ${lhNumber(counts.rejected)} rows were rejected in Silver`;
  return `
    <section class="lh-block" id="lh-funnel">
      <h3>${lhLabel({ id: 'Dari baris mentah ke ringkasan harian', en: 'From raw rows to a daily summary' })}</h3>
      <div class="lh-tabs" role="tablist" aria-label="${lhLabel({ id: 'Pilih bulan', en: 'Choose a month' })}">
        ${lakehouseData.months.map((month) => `<button type="button" role="tab" class="lh-tab${state.lakehouse.month === month ? ' is-on' : ''}" data-lh-month="${month}" aria-selected="${state.lakehouse.month === month}">${lhMonthName(month)}</button>`).join('')}
      </div>
      <div class="lh-steps">
        <div class="lh-step lh-step--bronze">
          <span>Bronze</span><b>${lhNumber(counts.bronze)}</b>
          <small>${state.language === 'id' ? `${lhNumber(counts.outside)} baris pickup di luar bulan tetap tersimpan` : `${lhNumber(counts.outside)} outside-month pickup rows kept in Bronze`}</small>
        </div>
        <div class="lh-step-arrow" aria-hidden="true">−${lhNumber(counts.rejected)}</div>
        <div class="lh-step lh-step--silver">
          <span>Silver</span><b>${lhNumber(counts.silver)}</b>
          <small>${state.language === 'id' ? 'lolos aturan kualitas' : 'passed the quality rules'}</small>
        </div>
        <div class="lh-step-arrow" aria-hidden="true">Σ</div>
        <div class="lh-step lh-step--gold">
          <span>Gold</span><b>${lhNumber(counts.gold)}</b>
          <small>${state.language === 'id'
            ? `baris harian per zona (${lhNumber(counts.zones)} zona, ${counts.days} hari). Σ trip_count = ${lhNumber(counts.silver)}`
            : `daily rows per zone (${lhNumber(counts.zones)} zones, ${counts.days} days). Σ trip_count = ${lhNumber(counts.silver)}`}</small>
        </div>
      </div>
      <div class="lh-reject">
        <h4>${rejectedTitle}</h4>
        ${reasons.map(([label, value]) => `
          <div class="lh-bar-row">
            <span>${lhLabel(label)}</span>
            <div class="lh-bar"><i style="width:${(value / max) * 100}%"></i></div>
            <b>${lhNumber(value)}</b>
          </div>`).join('')}
      </div>
      <p class="lh-lede">${counts.rejectNote
        ? lhLabel(counts.rejectNote)
        : lhLabel({ id: 'Tidak ada baris yang gagal di dua aturan sekaligus, jadi jumlah per aturan sama dengan baris ditolak.', en: 'No row fails two rules at once, so the per-rule counts add up to the rejected rows.' })}</p>
    </section>`;
}

function lhLayerTabs(selected, attribute) {
  return ['bronze', 'silver', 'gold'].map((layer) => `
    <button type="button" role="tab" class="lh-tab lh-tab--${layer}${selected === layer ? ' is-on' : ''}" data-${attribute}="${layer}" aria-selected="${selected === layer}">${layer}</button>`).join('');
}

function lhHistory() {
  const entries = lakehouseData.history[state.lakehouse.layer];
  const rows = entries.map((entry) => {
    if (entry.op) {
      return `<li class="lh-tl"><b>v${entry.v}</b><div><strong>${escapeHtml(entry.op)}</strong><small>${escapeHtml(entry.ts)} UTC</small></div></li>`;
    }
    const rerun = entry.removed > 0;
    const loadLabel = rerun ? 'Rerun' : (state.language === 'id' ? 'Load awal' : 'Initial load');
    const proofLabel = state.language === 'id' ? 'rerun pembuktian' : 'proof rerun';
    return `<li class="lh-tl${rerun ? ' lh-tl--rerun' : ''}">
      <b>v${entry.v}</b>
      <div>
        <strong>${loadLabel} ${escapeHtml(entry.m)}${entry.proof ? ` <em>· ${proofLabel}</em>` : ''}</strong>
        <small>${escapeHtml(entry.ts)} UTC · <code>replaceWhere source_month = '${escapeHtml(entry.m)}'</code> · ${lhNumber(entry.rows)} ${state.language === 'id' ? 'baris' : 'rows'} · ${entry.removed} ${state.language === 'id' ? 'file dihapus' : 'files removed'}</small>
      </div>
    </li>`;
  }).join('');
  const notes = {
    bronze: { id: 'Urutan run apa adanya: Jan, Jan, Feb, Jan, Feb. Day 6 dan Day 7 menambah versi setelah yang tercantum di sini.', en: 'Run order as recorded: Jan, Jan, Feb, Jan, Feb. Day 6 and Day 7 added versions after the ones listed here.' },
    silver: { id: 'Versi 1 sampai 8 adalah run pengembangan. Bukti idempotensi diambil dari v9. Backfill kemudian menambah versi hingga v19.', en: 'Versions 1–8 are development runs. The idempotency proof comes from v9. The backfill later added versions up to v19.' },
    gold: { id: 'Februari dijalankan ulang dua kali (v3 dan v4). Backfill kemudian menambah versi hingga v14.', en: 'February was rerun twice (v3 and v4). The backfill later added versions up to v14.' },
  };
  return `
    <section class="lh-block" id="lh-history">
      <h3>${lhLabel({ id: 'Riwayat Delta: rerun hanya menukar satu bulan', en: 'Delta history: a rerun only replaces one month' })}</h3>
      <div class="lh-tabs" role="tablist" aria-label="${lhLabel({ id: 'Pilih lapisan', en: 'Choose a layer' })}">${lhLayerTabs(state.lakehouse.layer, 'lh-layer')}</div>
      <ol class="lh-timeline">${rows}</ol>
      <p class="lh-lede">${lhLabel(notes[state.lakehouse.layer])} ${lhLabel({ id: 'Semua penulisan memakai predicate bulan, tidak ada overwrite tanpa predicate.', en: 'Every write uses a month predicate; there is no overwrite without a predicate.' })} ${lhLabel({ id: 'Sebelum backfill versinya 8 / 12 / 7; sesudahnya 15 / 19 / 14.', en: 'Before the backfill the versions were 8 / 12 / 7; afterwards 15 / 19 / 14.' })}</p>
    </section>`;
}

function lhChecksum() {
  const layer = state.lakehouse.csLayer;
  const values = lakehouseData.checksums[layer];
  const hasDuration = layer !== 'bronze';
  return `
    <section class="lh-block" id="lh-checksum">
      <h3>${lhLabel({ id: 'Bukti idempoten: checksum sebelum dan sesudah rerun', en: 'Idempotency proof: checksums before and after a rerun' })}</h3>
      <div class="lh-tabs" role="tablist" aria-label="${lhLabel({ id: 'Pilih lapisan checksum', en: 'Choose a checksum layer' })}">${lhLayerTabs(layer, 'lh-cs')}</div>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'bulan', en: 'month' })}</th>
            <th class="lh-num">${lhLabel({ id: 'baris', en: 'rows' })}</th>
            <th class="lh-num">Σ total_amount</th>
            <th class="lh-num">Σ ${lhLabel({ id: 'jarak (mil)', en: 'distance (miles)' })}</th>
            ${hasDuration ? `<th class="lh-num">Σ ${lhLabel({ id: 'durasi (menit)', en: 'duration (minutes)' })}</th>` : ''}
            <th>${lhLabel({ id: 'sebelum vs sesudah rerun', en: 'before vs after rerun' })}</th>
          </tr></thead>
          <tbody>
            ${lakehouseData.months.map((month) => {
              const row = values[month];
              return `<tr>
                <td>${month}</td>
                <td class="lh-num">${lhNumber(row.n)}</td>
                <td class="lh-num">${lhDecimal(row.total)}</td>
                <td class="lh-num">${lhDecimal(row.distance)}</td>
                ${hasDuration ? `<td class="lh-num">${row.duration == null ? '—' : lhDecimal(row.duration)}</td>` : ''}
                <td><span class="lh-badge">${lhLabel({ id: 'identik', en: 'identical' })}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <p class="lh-lede">${lhLabel({ id: 'Gold hanya menjumlahkan Silver, jadi total, jarak, dan durasinya sama dengan Silver. Kolom yang boleh berubah saat rerun: ingested_at, processed_at, dan versi Delta.', en: 'Gold only sums Silver, so its total, distance, and duration match Silver. Columns allowed to change on rerun: ingested_at, processed_at, and the Delta version.' })}</p>
      <p class="lh-lede">${lhLabel({ id: 'Σ durasi hanya tercatat untuk Januari dan Februari; bulan lain ditampilkan sebagai —.', en: 'The duration sum is recorded for January–February only; other months render as —.' })}</p>
    </section>`;
}

function lhZoneChart() {
  const data = lakehouseData.topZones[state.lakehouse.month];
  const max = data[0][1];
  return `
    <div class="lh-chart">
      <h4>${state.language === 'id' ? `Sepuluh zona pickup teratas, ${lhMonthName(state.lakehouse.month)}` : `Top ten pickup zones, ${lhMonthName(state.lakehouse.month)}`}</h4>
      ${data.map(([zone, value]) => `
        <div class="lh-bar-row lh-bar-row--zone">
          <span>${state.language === 'id' ? 'Zona' : 'Zone'} ${zone}</span>
          <div class="lh-bar lh-bar--gold"><i style="width:${(value / max) * 100}%"></i></div>
          <b>${lhNumber(value)}</b>
        </div>`).join('')}
      <p class="lh-lede">${lhLabel({ id: 'Zona masih berupa ID. Nama zona butuh lookup resmi TLC.', en: 'Zones are still IDs. Zone names require the official TLC lookup.' })}</p>
    </div>`;
}

function lhDailyChart() {
  const width = 560;
  const height = 220;
  const pad = { left: 46, right: 12, top: 12, bottom: 28 };
  const values = lakehouseData.daily.map(([, value]) => value);
  const min = Math.min(...values) * 0.9;
  const max = Math.max(...values) * 1.05;
  const x = (index) => pad.left + (index / (values.length - 1)) * (width - pad.left - pad.right);
  const y = (value) => pad.top + (1 - (value - min) / (max - min)) * (height - pad.top - pad.bottom);
  const points = values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`);
  const area = `M${x(0)},${height - pad.bottom} L${points.join(' L')} L${x(values.length - 1)},${height - pad.bottom} Z`;
  const ticks = [min, (min + max) / 2, max].map((value) => `
    <line class="lh-grid-line" x1="${pad.left}" x2="${width - pad.right}" y1="${y(value)}" y2="${y(value)}"/>
    <text x="${pad.left - 6}" y="${y(value) + 4}" text-anchor="end">${lhCompact(value)}</text>`).join('');
  const labels = lakehouseData.daily.map(([day], index) => `<text x="${x(index)}" y="${height - 8}" text-anchor="middle">${day}</text>`).join('');
  const dots = lakehouseData.daily.map(([day, value], index) => `<circle cx="${x(index)}" cy="${y(value)}" r="3.5"><title>${day}: ${lhNumber(value)} ${state.language === 'id' ? 'perjalanan' : 'trips'}</title></circle>`).join('');
  return `
    <div class="lh-chart">
      <h4>${lhLabel({ id: 'Perjalanan per hari menurut bulan, Jan–Sep 2024', en: 'Trips per day by month, Jan–Sep 2024' })}</h4>
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${lhLabel({ id: 'Grafik garis trips per hari dari Januari sampai September 2024', en: 'Line chart of trips per day from January to September 2024' })}">
        ${ticks}<path d="${area}" class="lh-area"/><polyline points="${points.join(' ')}" class="lh-line"/>${dots}${labels}
      </svg>
      <p class="lh-lede">${lhLabel({ id: 'Nilai adalah trips per hari, bukan total bulanan.', en: 'Values are trips per day, not monthly totals.' })}</p>
    </div>`;
}

function lhAnalysis() {
  return `
    <section class="lh-block" id="lh-analysis">
      <h3>${lhLabel({ id: 'Hasil analisis dari Gold', en: 'Analysis results from Gold' })}</h3>
      <div class="lh-grid2">${lhZoneChart()}${lhDailyChart()}</div>
    </section>`;
}

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

function lhLimits() {
  return `
    <section class="lh-block" id="lh-limits">
      <h3>${lhLabel({ id: 'Batasan dan langkah berikutnya', en: 'Limitations and next steps' })}</h3>
      <ul class="lh-limits">${lakehouseData.limits.map((item) => `<li>${escapeHtml(localized(item))}</li>`).join('')}</ul>
      <ul class="lh-chips">${lakehouseData.nextSteps.map((item) => `<li>${escapeHtml(localized(item))}</li>`).join('')}</ul>
    </section>`;
}

function renderLakehouseViz() {
  return `
    <div class="lh">
      <div class="lh-intro">
        <span class="lh-label">${lhLabel({ id: 'Lingkungan', en: 'Environment' })}</span>
        <p class="lh-mono">${escapeHtml(lakehouseData.environment)}</p>
        <p class="lh-lede">${escapeHtml(localized(lakehouseData.dataset))}</p>
      </div>
      ${lhStats()}
      ${lhPipeline()}
      ${lhFunnel()}
      ${lhHistory()}
      ${lhChecksum()}
      ${lhAnalysis()}
      ${lhOrchestration()}
      ${lhLimits()}
    </div>`;
}

function replaceLakehouseSection(selector, html, focusSelector) {
  const current = $(selector);
  if (!current) return;
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  current.replaceWith(template.content.firstElementChild);
  if (focusSelector) $(focusSelector)?.focus();
}

function copyModeToggle() {
  const options = [
    ['technical', t('copyModeTechnical')],
    ['plain', t('copyModePlain')],
  ];
  return `<div class="copy-mode" role="group" aria-label="${escapeHtml(t('copyModeLabel'))}">
    ${options.map(([value, label]) => `
      <button type="button" data-copy-mode="${value}" class="${state.copyMode === value ? 'is-active' : ''}" aria-pressed="${state.copyMode === value}">${escapeHtml(label)}</button>
    `).join('')}
  </div>`;
}

function technicalBlock(content) {
  if (state.copyMode !== 'plain') return content;
  return `<details class="technical-details">
    <summary>${escapeHtml(t('technicalDetails'))}</summary>
    <div class="technical-details__body">${content}</div>
  </details>`;
}

function renderProject(project, index) {
  const detailOpen = project.detailApp
    ? ` data-open-app="${escapeHtml(project.detailApp)}" role="link" tabindex="0" aria-label="${escapeHtml(`${t('openProjectDetail')}: ${project.title}`)}"`
    : '';
  return `
    <article class="project-card project-card--${escapeHtml(project.accent)}"${detailOpen}>
      <div class="project-card__index">${String(index + 1).padStart(2, '0')}</div>
      <div class="project-card__icon">${icon(project.icon)}</div>
      <div class="project-card__body">
        <div class="project-card__meta"><span>${escapeHtml(localized(projectField(project, 'scope')))}</span></div>
        <h4>${escapeHtml(project.title)}</h4>
        <p>${escapeHtml(localized(projectField(project, 'summary') ?? projectField(project, 'description')))}</p>
        <div class="tag-list">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
        ${project.detailApp ? `<a class="inline-link project-card__open" href="${escapeHtml(pathForApp(project.detailApp))}" data-open-app="${escapeHtml(project.detailApp)}">${t('openProjectDetail')} ${icon('arrow-up-right')}</a>` : ''}
      </div>
      <div class="project-card__links">
        ${project.links.map((link) => `
          <a class="project-card__detail" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${projectLinkLabel(link)}: ${project.title}`)}">
            <span>${escapeHtml(link.label)}</span>${icon('arrow-up-right')}
          </a>
        `).join('')}
      </div>
    </article>
  `;
}

function renderProjects() {
  let globalIndex = 0;
  const sectionsHtml = projectSections.map((section) => {
    const ordered = [...section.projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    const projectsHtml = ordered.map((project) => renderProject(project, globalIndex++)).join('');
    return `
      <section class="project-section" aria-labelledby="projectSection-${escapeHtml(section.id)}">
        <div class="section-heading section-heading--with-icon"><span class="section-heading__icon">${icon(section.icon)}</span><h3 id="projectSection-${escapeHtml(section.id)}">${escapeHtml(localized(section.title))}</h3></div>
        <div class="project-list">${projectsHtml}</div>
        ${section.concepts ? `
          <aside class="concept-note">
            <div><strong>${t('conceptTitle')}</strong><p>${t('conceptNote')}</p></div>
            <div class="concept-links">${section.concepts.map((concept) => `<a href="${escapeHtml(concept.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(localized(concept.title))} ${icon('arrow-up-right')}</a>`).join('')}</div>
          </aside>
        ` : ''}
      </section>
    `;
  }).join('');

  return `
    <section class="content-app projects-app" aria-labelledby="projectsTitle">
      <div class="content-header content-header--split">
        <div><div class="eyebrow">${t('projectsEyebrow')}</div><h2 id="projectsTitle">${t('projectsTitle')}</h2></div>
        <p class="content-header__description">${t('projectsDescription')}</p>
      </div>
      <div class="copy-mode-row">${copyModeToggle()}</div>
      ${sectionsHtml}
      <p class="project-evidence-note">${icon('info')}<span>${t('projectEvidenceNote')}</span></p>
    </section>
  `;
}

function renderLakehousePage() {
  const project = projectSections
    .flatMap((section) => section.projects)
    .find((entry) => entry.detailApp === 'lakehouse');
  if (!project) return '';
  return `
    <section class="content-app lakehouse-app" aria-labelledby="lakehouseTitle">
      <a class="inline-link lakehouse-back" href="/projects" data-open-app="projects">${icon('arrow-left')} <span>${localized({ id: 'Kembali ke proyek', en: 'Back to projects' })}</span></a>
      <div class="content-header content-header--split">
        <div><div class="eyebrow">${localized({ id: 'DETAIL PROYEK', en: 'PROJECT DETAIL' })}</div><h2 id="lakehouseTitle">${escapeHtml(project.title)}</h2></div>        <p class="content-header__description">${escapeHtml(localized(projectField(project, 'scope')))}</p>
      </div>
      <div class="copy-mode-row">${copyModeToggle()}</div>
      <p class="lakehouse-lead">${escapeHtml(localized(projectField(project, 'description')))}</p>
      <p class="lakehouse-caveat"><strong>${localized({ id: 'Cakupan:', en: 'Scope note:' })}</strong> ${escapeHtml(localized(projectField(project, 'caveat')))}</p>
      <div class="tag-list">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      ${technicalBlock(renderLakehouseViz())}
    </section>
  `;
}

const nusacommerceData = {
  environment: 'NusaCommerce Data Platform v0.1 · PostgreSQL 16 · Python 3.11 · Docker Compose',
  scope: {
    id: 'Arsitektur data platform untuk Finance, Operations, dan Growth',
    en: 'Data platform architecture for Finance, Operations, and Growth',
  },
  stats: [
    { value: { id: '3', en: '3' }, label: { id: 'sistem sumber dirancang', en: 'source systems designed' } },
    { value: { id: '2', en: '2' }, label: { id: 'kontrak data product', en: 'data product contracts' } },
    { value: { id: '15 mnt', en: '15 min' }, label: { id: 'lookback window', en: 'lookback window' } },
  ],
  stages: [
    {
      id: 'source', name: 'Sumber', file: 'PostgreSQL · Payment API · Clickstream', kind: 'source',
      badge: { id: 'sebagian berjalan', en: 'partially running' },
      summary: {
        id: 'Tiga sistem sumber dengan karakter berbeda: PostgreSQL OLTP untuk customer, product, seller, dan order; Payment REST API untuk payments, refunds, dan status transaksi; Clickstream untuk perilaku pengguna. Arsitektur saat ini memakai incremental batch untuk PostgreSQL read replica dan Payment API; clickstream/Kafka masih target future.',
        en: 'Three source systems with different characteristics: PostgreSQL OLTP for customers, products, sellers, and orders; Payment REST API for payments, refunds, and transaction status; Clickstream for user behavior. The current architecture uses incremental batch for the PostgreSQL read replica and Payment API; clickstream/Kafka remain future targets.',
      },
      grain: { id: 'Satu baris per order di source.orders; satu page per respons API', en: 'One row per order in source.orders; one page per API response' },
      write: { id: 'read-only; tidak ada penulisan ke OLTP', en: 'read-only; no writes to OLTP' },
      facts: [
        [{ id: 'Sistem sumber', en: 'Source systems' }, 3],
        [{ id: 'Akses OLTP', en: 'OLTP access' }, { id: 'read-only', en: 'read-only' }],
        [{ id: 'Rate limit', en: 'Rate limit' }, 'Payment API'],
        [{ id: 'Target future', en: 'Future target' }, 'Clickstream → Kafka'],
      ],
    },
    {
      id: 'bronze', name: 'Bronze', file: 'Raw Data Lake · MinIO/S3', kind: 'bronze',
      badge: { id: 'arsitektur', en: 'architecture' },
      summary: {
        id: 'Raw Data Lake menyimpan payload sumber apa adanya bersama metadata ingestion. Lapisan ini menjadi source of truth untuk sistem ingestion dan dasar replay.',
        en: 'The raw data lake stores source payloads as-is with ingestion metadata. This layer is the source of truth for the ingestion system and the basis for replay.',
      },
      grain: { id: 'Satu baris per versi sumber + run ID/page', en: 'One row per source version + run ID/page' },
      write: { id: 'append/upsert idempoten; checkpoint hanya maju setelah commit', en: 'idempotent append/upsert; checkpoint advances only after commit' },
      facts: [
        [{ id: 'Lokasi', en: 'Location' }, 'MinIO/S3'],
        [{ id: 'Isi', en: 'Contents' }, { id: 'payload + metadata', en: 'payload + metadata' }],
        [{ id: 'Peran', en: 'Role' }, { id: 'ingestion system truth', en: 'ingestion system truth' }],
        [{ id: 'Kunci versi', en: 'Version key' }, '(order_id, version)'],
      ],
    },
    {
      id: 'silver', name: 'Silver', file: 'PostgreSQL Warehouse', kind: 'silver',
      badge: { id: 'arsitektur', en: 'architecture' },
      summary: {
        id: 'PostgreSQL Warehouse menyimpan data hasil cleaning, normalisasi, dan deduplication. Transformasi harus deterministik agar reprocessing menghasilkan output yang sama.',
        en: 'The PostgreSQL warehouse stores cleaned, normalized, and deduplicated data. Transformations must be deterministic so reprocessing produces the same output.',
      },
      grain: { id: 'Satu baris per entity setelah deduplication', en: 'One row per entity after deduplication' },
      write: { id: 'idempotent MERGE/UPSERT dari Bronze', en: 'idempotent MERGE/UPSERT from Bronze' },
      facts: [
        [{ id: 'Lokasi', en: 'Location' }, 'PostgreSQL warehouse'],
        [{ id: 'Transformasi', en: 'Transformations' }, { id: 'cleaning + dedup', en: 'cleaning + dedup' }],
        [{ id: 'Peran', en: 'Role' }, { id: 'bukan source of truth', en: 'not a source of truth' }],
        [{ id: 'Sifat', en: 'Property' }, { id: 'deterministik', en: 'deterministic' }],
      ],
    },
    {
      id: 'gold', name: 'Gold', file: 'facts + dimensions', kind: 'gold',
      badge: { id: 'arsitektur', en: 'architecture' },
      summary: {
        id: 'Facts dan dimensions disusun untuk analisis lintas proses: order, payment, refund, customer, seller, dan product. Gold menjadi source of truth untuk model analitik.',
        en: 'Facts and dimensions support cross-process analysis: orders, payments, refunds, customers, sellers, and products. Gold is the source of truth for the analytical model.',
      },
      grain: { id: 'Fact pada grain transaksi/item; dimension pada natural key', en: 'Facts at transaction/item grain; dimensions on natural keys' },
      write: { id: 'build dari Silver dengan MERGE/UPSERT', en: 'built from Silver with MERGE/UPSERT' },
      facts: [
        [{ id: 'Isi', en: 'Contents' }, { id: 'facts + dimensions', en: 'facts + dimensions' }],
        [{ id: 'Peran', en: 'Role' }, { id: 'analytical model truth', en: 'analytical model truth' }],
        [{ id: 'Drill-down', en: 'Drill-down' }, { id: 'order → item', en: 'order → item' }],
        [{ id: 'Konsumsi', en: 'Consumption' }, { id: 'marts', en: 'marts' }],
      ],
    },
    {
      id: 'mart', name: 'Mart', file: '2 data product contracts', kind: 'sql',
      badge: { id: 'kontrak', en: 'contract' },
      summary: {
        id: 'Dua kontrak konsumsi: hourly_sales_operations untuk dashboard operasional per jam dan daily_finance_reconciliation untuk rekonsiliasi harian Finance.',
        en: 'Two consumption contracts: hourly_sales_operations for the hourly operations dashboard and daily_finance_reconciliation for daily Finance reconciliation.',
      },
      grain: { id: 'hour × delivery area; date × payment method', en: 'hour × delivery area; date × payment method' },
      write: { id: 'agregasi deterministik dari Gold', en: 'deterministic aggregation from Gold' },
      facts: [
        [{ id: 'Produk', en: 'Products' }, 2],
        [{ id: 'Freshness', en: 'Freshness' }, { id: '1 jam / harian', en: 'hourly / daily' }],
        [{ id: 'Peran', en: 'Role' }, { id: 'kontrak konsumsi', en: 'consumption contract' }],
        [{ id: 'Kelengkapan', en: 'Completeness' }, '≥ 99%'],
      ],
    },
    {
      id: 'dashboard', name: 'Dashboard', file: 'Operations · Finance', kind: 'prepare',
      badge: { id: 'di luar scope', en: 'out of scope' },
      summary: {
        id: 'Dashboard operasional dan laporan Finance mengonsumsi mart. Dashboard bukan source of truth dan aksesnya dibatasi per role.',
        en: 'The operations dashboard and Finance reports consume the marts. The dashboard is not a source of truth and access is role-restricted.',
      },
      grain: { id: 'Agregat yang ditampilkan', en: 'Displayed aggregates' },
      write: { id: 'read-only dari mart', en: 'read-only from marts' },
      facts: [
        [{ id: 'Operations', en: 'Operations' }, { id: 'dashboard per jam', en: 'hourly dashboard' }],
        [{ id: 'Finance', en: 'Finance' }, { id: 'laporan harian < 00.30', en: 'daily report before 00:30' }],
        [{ id: 'Peran', en: 'Role' }, { id: 'bukan source of truth', en: 'not a source of truth' }],
        [{ id: 'Akses', en: 'Access' }, 'RBAC'],
      ],
    },
  ],
  products: {
    hourly: {
      name: 'hourly_sales_operations',
      owner: { id: 'Divisi Operational (didukung Data Engineering)', en: 'Operations division (supported by Data Engineering)' },
      consumers: { id: 'Operational, Marketing, Manajemen', en: 'Operations, Marketing, Management' },
      decisions: {
        id: 'Memantau performa operasional setiap jam, menganalisis sebaran lokasi customer dan delivery area, mengoptimalkan alokasi kurir, serta mengidentifikasi jam sibuk.',
        en: 'Monitor hourly operational performance, analyze customer and delivery-area distribution, optimize courier allocation, and identify peak hours.',
      },
      grain: { id: 'Satu baris per kombinasi jam × area pengiriman', en: 'One row per hour × delivery area' },
      freshness: { id: 'Diperbarui setiap 1 jam; keterlambatan maksimum 1 jam.', en: 'Refreshed hourly; maximum delay 1 hour.' },
      metrics: ['transaction_hour', 'delivery_area', 'customer_city', 'total_orders', 'total_items', 'total_transaction_value', 'average_order_value'],
      quality: [
        { id: 'Kombinasi (transaction_hour, delivery_area) harus unik.', en: 'The (transaction_hour, delivery_area) combination must be unique.' },
        { id: 'transaction_hour dan delivery_area wajib terisi.', en: 'transaction_hour and delivery_area are required.' },
        { id: 'total_orders, total_items, dan total_transaction_value tidak boleh negatif.', en: 'total_orders, total_items, and total_transaction_value must be non-negative.' },
        { id: 'average_order_value harus konsisten dengan hasil agregasi.', en: 'average_order_value must be consistent with the aggregate.' },
        { id: 'Tidak ada duplikasi transaction_id sebelum agregasi.', en: 'No duplicate transaction_id before aggregation.' },
        { id: 'Kelengkapan data minimal 99%.', en: 'Data completeness at least 99%.' },
      ],
    },
    finance: {
      name: 'daily_finance_reconciliation',
      owner: { id: 'Divisi Finance (didukung Data Engineering)', en: 'Finance division (supported by Data Engineering)' },
      consumers: { id: 'Finance, Accounting, Manajemen', en: 'Finance, Accounting, Management' },
      decisions: {
        id: 'Melakukan rekonsiliasi transaksi harian, memantau kontribusi metode pembayaran, menghitung refund rate, dan memantau net sales harian.',
        en: 'Reconcile daily transactions, monitor payment-method contribution, calculate refund rate, and track daily net sales.',
      },
      grain: { id: 'Satu baris per kombinasi tanggal × metode pembayaran', en: 'One row per date × payment method' },
      freshness: { id: 'Diperbarui setiap hari setelah penutupan transaksi (end of day).', en: 'Refreshed daily after the end-of-day transaction close.' },
      metrics: ['transaction_date', 'payment_method', 'total_sales', 'total_refund', 'refund_rate', 'number_of_transactions', 'net_sales'],
      quality: [
        { id: 'Kombinasi (transaction_date, payment_method) harus unik.', en: 'The (transaction_date, payment_method) combination must be unique.' },
        { id: 'payment_method harus berasal dari daftar yang valid.', en: 'payment_method must come from a valid list.' },
        { id: 'refund_rate harus konsisten dengan rumus yang disepakati.', en: 'refund_rate must be consistent with the agreed formula.' },
        { id: 'Kelengkapan data minimal 99%.', en: 'Data completeness at least 99%.' },
        { id: 'transaction_id unik pada fact atomik.', en: 'transaction_id is unique in the atomic fact.' },
        { id: 'Total refund tiap transaksi tidak boleh melebihi total order.', en: 'Each transaction refund total must not exceed the order total.' },
        { id: 'Setiap transaksi memiliki metode pembayaran yang valid.', en: 'Every transaction has a valid payment method.' },
      ],
    },
  },
  ingestion: [
    { title: { id: 'Baca checkpoint', en: 'Read checkpoint' }, detail: { id: 'Jika belum ada, mulai dari 2026-01-01 UTC.', en: 'If none exists, start from 2026-01-01 UTC.' } },
    { title: { id: 'Terapkan lookback', en: 'Apply lookback' }, detail: { id: 'Jika checkpoint ada, mulai dari checkpoint dikurangi 15 menit.', en: 'If a checkpoint exists, start 15 minutes before it.' } },
    { title: { id: 'Tetapkan window', en: 'Fix the window' }, detail: { id: 'Window [start, safe_cutoff) ditetapkan sekali dan tidak berubah selama pagination.', en: 'The [start, safe_cutoff) window is fixed once and does not change during pagination.' } },
    { title: { id: 'Buat run', en: 'Create run' }, detail: { id: 'Run ID baru dicatat dengan status running.', en: 'A new run ID is recorded with running status.' } },
    { title: { id: 'Baca page', en: 'Read pages' }, detail: { id: 'Urutkan dengan (updated_at, order_id); setiap page disimpan ke staging.', en: 'Order by (updated_at, order_id); each page is written to staging.' } },
    { title: { id: 'Finalisasi atomik', en: 'Atomic finalization' }, detail: { id: 'Dalam satu transaction: masukkan raw versions, perbarui checkpoint, tandai succeeded.', en: 'In one transaction: insert raw versions, update the checkpoint, and mark the run succeeded.' } },
    { title: { id: 'Gagal sebelum commit', en: 'Failure before commit' }, detail: { id: 'Finalisasi rollback; status failed dicatat dalam transaction terpisah; staging tetap tersedia.', en: 'Finalization rolls back; failed status is recorded in a separate transaction; staging remains available.' } },
    { title: { id: 'Retry', en: 'Retry' }, detail: { id: 'Run ID baru dan baca ulang window dari checkpoint terakhir.', en: 'Use a new run ID and reread the window from the last checkpoint.' } },
  ],
  reliability: [
    [{ id: 'Composite watermark', en: 'Composite watermark' }, { id: '(updated_at, primary_key) dibandingkan secara lexicographic; keyset pagination tanpa OFFSET.', en: '(updated_at, primary_key) compared lexicographically; keyset pagination without OFFSET.' }],
    [{ id: 'Overlap', en: 'Overlap' }, { id: 'Setiap run membaca ulang 15 menit sebelum checkpoint sampai safe_cutoff.', en: 'Each run rereads 15 minutes before the checkpoint up to safe_cutoff.' }],
    [{ id: 'Safe cutoff', en: 'Safe cutoff' }, { id: 'Diberikan pemanggil, tetap selama run; margin awal 5 menit.', en: 'Caller-supplied and fixed for the run; initial margin is 5 minutes.' }],
    [{ id: 'Checkpoint durabel', en: 'Durable checkpoint' }, { id: 'Hanya maju ke tuple maksimum ≤ cutoff setelah seluruh write, dedup, dan quality check commit.', en: 'Advances only to the maximum tuple ≤ cutoff after all writes, dedup, and quality checks commit.' }],
    [{ id: 'Idempotensi', en: 'Idempotency' }, { id: 'Primary key (order_id, version) dengan ON CONFLICT DO NOTHING; duplicates menghitung key, bukan hash.', en: 'Primary key (order_id, version) with ON CONFLICT DO NOTHING; duplicates count keys, not hashes.' }],
    [{ id: 'Kegagalan', en: 'Failure' }, { id: 'Finalisasi rollback; run gagal dicatat terpisah; retry memakai run ID baru.', en: 'Finalization rolls back; failed runs are recorded separately; retry uses a new run ID.' }],
    [{ id: 'Late-arriving data', en: 'Late-arriving data' }, { id: 'Version handling: versi lebih tinggi update, versi lebih rendah stale, payload hash sama duplicate, versi sama hash beda conflict.', en: 'Version handling: higher version updates, lower version is stale, same payload hash is a duplicate, same version with a different hash is a conflict.' }],
    [{ id: 'Delete', en: 'Delete' }, { id: 'Soft delete melalui deleted_at atau is_deleted.', en: 'Soft delete through deleted_at or is_deleted.' }],
  ],
  tests: [
    [{ id: 'Initial load, page size 2', en: 'Initial load, page size 2' }, { id: '8 extracted, 8 inserted; record dengan timestamp sama tetap terbaca.', en: '8 extracted, 8 inserted; same-timestamp records were still read.' }],
    [{ id: 'Rerun pada cutoff yang sama', en: 'Rerun on the same cutoff' }, { id: '2 extracted dalam lookback, 0 inserted, 2 duplicates; raw tetap 8 baris.', en: '2 extracted in the lookback, 0 inserted, 2 duplicates; raw stays at 8 rows.' }],
    [{ id: 'Failure setelah raw insert sebelum checkpoint', en: 'Failure after raw insert before checkpoint' }, { id: 'Insert baru rollback; raw tetap 8 baris dan checkpoint lama berlaku.', en: 'The new insert rolls back; raw stays at 8 rows and the old checkpoint remains valid.' }],
    [{ id: 'Retry setelah failure', en: 'Retry after failure' }, { id: '1 versi baru tersimpan; raw menjadi 9 baris dan checkpoint maju.', en: '1 new version is stored; raw becomes 9 rows and the checkpoint advances.' }],
  ],
  slo: [
    ['data_freshness', { id: '97,5% pemeriksaan selama 30 hari pada Gold ≤ 60 menit.', en: '97.5% of checks over 30 days on Gold are ≤ 60 minutes.' }],
    ['critical_field_completeness', { id: '99,9% nilai kolom krusial Silver dan Gold terisi selama rolling 30 hari.', en: '99.9% of critical Silver and Gold field values are non-null over a rolling 30 days.' }],
    ['availability', { id: 'Minimal 99% selama rolling 30 hari.', en: 'At least 99% over a rolling 30 days.' }],
    ['run_completion', { id: '99,9% run terjadwal selesai sukses selama rolling 30 hari.', en: '99.9% of scheduled runs succeed over a rolling 30 days.' }],
    ['lateness_lag', { id: '95% perubahan Silver diproses maksimal 1 jam sejak event terjadi.', en: '95% of Silver changes are processed within 1 hour of the event.' }],
  ],
  targets: [
    { id: '≥ 5 juta perubahan PostgreSQL/hari', en: '≥ 5 million PostgreSQL changes/day' },
    { id: 'Dashboard ≤ 1 jam setelah perubahan', en: 'Dashboard ≤ 1 hour after a change' },
    { id: 'Laporan Finance sebelum 00.30', en: 'Finance report before 00:30' },
    { id: 'Keberhasilan pipeline ≥ 99,9%', en: 'Pipeline success ≥ 99.9%' },
    { id: 'RTO ≤ 1 jam', en: 'RTO ≤ 1 hour' },
    { id: 'Kelengkapan kolom kritis ≥ 99,9%', en: 'Critical-field completeness ≥ 99.9%' },
  ],
  security: [
    [{ id: 'Authentication', en: 'Authentication' }, { id: 'IAM dan Role-Based Access Control.', en: 'IAM and Role-Based Access Control.' }],
    [{ id: 'Authorization', en: 'Authorization' }, { id: 'Finance hanya melihat revenue; Marketing tidak melihat payment detail; IT tidak melihat PII.', en: 'Finance sees revenue only; Marketing cannot see payment detail; IT cannot see PII.' }],
    [{ id: 'Encryption', en: 'Encryption' }, { id: 'TLS saat transit; AES-256 saat data disimpan.', en: 'TLS in transit; AES-256 at rest.' }],
    [{ id: 'Masking', en: 'Masking' }, { id: 'Email dan nomor telepon.', en: 'Email and phone number.' }],
    [{ id: 'Audit', en: 'Audit' }, { id: 'Seluruh akses data dicatat.', en: 'All data access is logged.' }],
    [{ id: 'Akses OLTP', en: 'OLTP access' }, { id: 'Data Platform hanya memiliki akses read-only.', en: 'The data platform has read-only access only.' }],
  ],
  status: [
    { component: { id: 'Arsitektur dan kontrak data', en: 'Architecture and data contracts' }, status: 'done', evidence: { id: 'Brief Day 1, 2 data product, SLI/SLO, quality policy.', en: 'Day 1 brief, 2 data products, SLIs/SLOs, quality policy.' } },
    { component: { id: 'Incremental orders ingestion', en: 'Incremental orders ingestion' }, status: 'running', evidence: { id: 'Berjalan dan teruji: initial load, rerun 0 duplicate, rollback, retry.', en: 'Running and tested: initial load, rerun with 0 duplicates, rollback, retry.' } },
    { component: { id: 'Payment API ingestion', en: 'Payment API ingestion' }, status: 'starter', evidence: { id: 'Client, repository, dan service masih NotImplementedError.', en: 'Client, repository, and service still raise NotImplementedError.' } },
    { component: { id: 'Clickstream / Kafka', en: 'Clickstream / Kafka' }, status: 'future', evidence: { id: 'Hanya target arsitektur future.', en: 'Future architecture target only.' } },
    { component: { id: 'dbt / Airflow', en: 'dbt / Airflow' }, status: 'absent', evidence: { id: 'Belum ada di repository.', en: 'Not present in the repository.' } },
    { component: { id: 'Dashboard', en: 'Dashboard' }, status: 'out', evidence: { id: 'Di luar scope; platform hanya menyediakan data.', en: 'Out of scope; the platform only supplies data.' } },
  ],
  limits: [
    { id: 'Arsitektur mencakup tiga sumber, tetapi alur yang berjalan baru ingestion orders dari tabel lokal dengan satu runner berurutan.', en: 'The architecture covers three sources, but the running flow is only orders ingestion from a local table with one sequential runner.' },
    { id: 'Safe cutoff diberikan manual; replica lag belum diukur dan cutoff otomatis belum ada.', en: 'Safe cutoff is supplied manually; replica lag is not measured and automatic cutoff is not implemented.' },
    { id: 'Source harus stabil selama pagination; belum ada snapshot isolation untuk seluruh extraction.', en: 'The source must be stable during pagination; there is no snapshot isolation across the extraction.' },
    { id: 'Snapshot ingestion hanya menyimpan versi yang sempat diobservasi; intermediate changes tidak tertangkap.', en: 'Snapshot ingestion stores only observed versions; intermediate changes are not captured.' },
    { id: 'Lookback 15 menit bukan jaminan untuk keterlambatan yang melebihi window tersebut.', en: 'The 15-minute lookback does not guarantee coverage for delays beyond that window.' },
    { id: 'Belum ada hash-conflict quarantine, stale-version classification, atau lock untuk concurrent runs.', en: 'Hash-conflict quarantine, stale-version classification, and concurrent-run locking are not implemented.' },
    { id: 'Tabel quality tersedia untuk modul nanti; dbt, Airflow, Kafka, clickstream, dan dashboard belum diimplementasikan.', en: 'The quality table is available for later modules; dbt, Airflow, Kafka, clickstream, and the dashboard are not implemented.' },
  ],
  nextSteps: [
    { id: 'Cutoff otomatis dan metrik replica lag', en: 'Automatic cutoff and replica-lag metric' },
    { id: 'Lock untuk run paralel', en: 'Concurrent-run lock' },
    { id: 'Quarantine konflik hash', en: 'Hash-conflict quarantine' },
    { id: 'Selesaikan Payment API ingestion', en: 'Finish Payment API ingestion' },
    { id: 'Model dbt Silver dan Gold', en: 'dbt Silver and Gold models' },
    { id: 'Orkestrasi Airflow', en: 'Airflow orchestration' },
    { id: 'Clickstream melalui Kafka', en: 'Clickstream via Kafka' },
    { id: 'Dashboard operations dan Finance', en: 'Operations and Finance dashboards' },
  ],
};

function ncStats() {
  return `
    <div class="lh-stats">
      ${nusacommerceData.stats.map((stat) => `
        <div class="lh-stat"><b>${escapeHtml(localized(stat.value))}</b><span>${lhLabel(stat.label)}</span></div>`).join('')}
    </div>`;
}

function ncStageDetail() {
  const stage = nusacommerceData.stages.find((entry) => entry.id === state.nusacommerce.stage);
  return `
    <div class="lh-detail lh-detail--${stage.kind}">
      <div>
        <h4>${escapeHtml(stage.name)} <span class="lh-badge">${lhLabel(stage.badge)}</span></h4>
        <p>${escapeHtml(localized(stage.summary))}</p>
        <dl class="lh-kv">
          <dt>${lhLabel({ id: 'Grain', en: 'Grain' })}</dt><dd>${escapeHtml(localized(stage.grain))}</dd>
          <dt>${lhLabel({ id: 'Alur tulis', en: 'Write path' })}</dt><dd><code>${escapeHtml(localized(stage.write))}</code></dd>
        </dl>
      </div>
      <ul class="lh-facts">
        ${stage.facts.map(([label, value]) => `<li><span>${lhLabel(label)}</span><b>${typeof value === 'number' ? lhNumber(value) : escapeHtml(localized(value))}</b></li>`).join('')}
      </ul>
    </div>`;
}

function ncPipeline() {
  const nodes = nusacommerceData.stages.map((stage, index) => {
    const active = state.nusacommerce.stage === stage.id;
    return `
      <button type="button" class="lh-node lh-node--${stage.kind}${active ? ' is-on' : ''}" data-nc-stage="${escapeHtml(stage.id)}" aria-pressed="${active}">
        <span class="lh-node__name">${escapeHtml(stage.name)}</span>
        <span class="lh-node__file">${escapeHtml(stage.file)}</span>
      </button>
      ${index < nusacommerceData.stages.length - 1 ? '<span class="lh-arrow" aria-hidden="true">→</span>' : ''}`;
  }).join('');
  return `
    <section class="lh-block" id="nc-pipeline">
      <h3>${lhLabel({ id: 'Arsitektur berlapis', en: 'Layered architecture' })}</h3>
      <p class="lh-lede">${lhLabel({ id: 'Pilih lapisan untuk melihat peran, grain, dan alur tulisnya. Hanya ingestion orders yang berjalan saat ini; lapisan lain masih rancangan.', en: 'Select a layer to inspect its role, grain, and write path. Only orders ingestion currently runs; the other layers are design.' })}</p>
      <div class="lh-flow" role="group" aria-label="${lhLabel({ id: 'Lapisan arsitektur', en: 'Architecture layers' })}">${nodes}</div>
      <div id="nc-stage-detail">${ncStageDetail()}</div>
    </section>`;
}

function ncProductTabs() {
  return Object.entries(nusacommerceData.products).map(([id, product]) => {
    const selected = state.nusacommerce.product === id;
    return `<button type="button" role="tab" class="lh-tab${selected ? ' is-on' : ''}" data-nc-product="${id}" aria-selected="${selected}">${escapeHtml(product.name)}</button>`;
  }).join('');
}

function ncProductDetail() {
  const product = nusacommerceData.products[state.nusacommerce.product];
  return `
    <div class="lh-detail lh-detail--gold">
      <div>
        <h4>${escapeHtml(product.name)} <span class="lh-badge">${lhLabel({ id: 'kontrak', en: 'contract' })}</span></h4>
        <p>${escapeHtml(localized(product.decisions))}</p>
        <dl class="lh-kv">
          <dt>${lhLabel({ id: 'Owner', en: 'Owner' })}</dt><dd>${escapeHtml(localized(product.owner))}</dd>
          <dt>${lhLabel({ id: 'Konsumen', en: 'Consumers' })}</dt><dd>${escapeHtml(localized(product.consumers))}</dd>
          <dt>${lhLabel({ id: 'Grain', en: 'Grain' })}</dt><dd>${escapeHtml(localized(product.grain))}</dd>
          <dt>${lhLabel({ id: 'Freshness', en: 'Freshness' })}</dt><dd>${escapeHtml(localized(product.freshness))}</dd>
        </dl>
      </div>
      <div>
        <h4>${lhLabel({ id: 'Metrik utama', en: 'Key metrics' })}</h4>
        <ul class="lh-chips">${product.metrics.map((metric) => `<li>${escapeHtml(metric)}</li>`).join('')}</ul>
        <h4 style="margin-top:14px">${lhLabel({ id: 'Kontrak kualitas', en: 'Quality contract' })}</h4>
        <ul class="lh-limits">${product.quality.map((item) => `<li>${escapeHtml(localized(item))}</li>`).join('')}</ul>
      </div>
    </div>`;
}

function ncProducts() {
  return `
    <section class="lh-block" id="nc-products">
      <h3>${lhLabel({ id: 'Data product dan SLO', en: 'Data products and SLOs' })}</h3>
      <p class="lh-lede">${lhLabel({ id: 'Setiap data product punya owner, grain, metrik, freshness, dan kontrak kualitas yang dapat diuji.', en: 'Each data product has an owner, grain, metrics, freshness target, and testable quality contract.' })}</p>
      <div class="lh-tabs" role="tablist" aria-label="${lhLabel({ id: 'Pilih data product', en: 'Choose a data product' })}">${ncProductTabs()}</div>
      <div id="nc-product-detail">${ncProductDetail()}</div>
    </section>`;
}

function ncIngestion() {
  const steps = nusacommerceData.ingestion.map((step, index) => `
    <li class="lh-tl">
      <b>${String(index + 1).padStart(2, '0')}</b>
      <div><strong>${escapeHtml(localized(step.title))}</strong><small>${escapeHtml(localized(step.detail))}</small></div>
    </li>`).join('');
  return `
    <section class="lh-block" id="nc-ingestion">
      <h3>${lhLabel({ id: 'Ingestion incremental yang berjalan', en: 'The running incremental ingestion' })}</h3>
      <p class="lh-lede">${lhLabel({ id: 'Alur Hari 2 pada PostgreSQL 16 lokal: satu window tetap, staging per page, dan finalisasi atomik.', en: 'The Day 2 flow on local PostgreSQL 16: one fixed window, per-page staging, and atomic finalization.' })}</p>
      <ol class="lh-timeline">${steps}</ol>
    </section>`;
}

function ncReliability() {
  return `
    <section class="lh-block" id="nc-reliability">
      <h3>${lhLabel({ id: 'Reliability dan recovery', en: 'Reliability and recovery' })}</h3>
      <p class="lh-mono">safe_cutoff = min(batch_started_at_utc − 5m, replica_replay_timestamp − 5m)</p>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'Mekanisme', en: 'Mechanism' })}</th>
            <th>${lhLabel({ id: 'Keputusan', en: 'Decision' })}</th>
          </tr></thead>
          <tbody>
            ${nusacommerceData.reliability.map(([mechanism, detail]) => `<tr><td>${lhLabel(mechanism)}</td><td>${lhLabel(detail)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="lh-lede">${lhLabel({ id: 'Pembacaan overlap bersifat at-least-once. Upsert idempoten mencegah duplikasi saat replay, dan checkpoint tidak pernah dimajukan sebelum commit durabel.', en: 'Overlap reads are at-least-once. Idempotent upserts prevent duplicate rows on replay, and the checkpoint never advances before a durable commit.' })}</p>
    </section>`;
}

function ncTests() {
  return `
    <section class="lh-block" id="nc-tests">
      <h3>${lhLabel({ id: 'Bukti pengujian ingestion', en: 'Ingestion test evidence' })}</h3>
      <p class="lh-lede">${lhLabel({ id: 'PostgreSQL 16 pada container sementara; database demo utama tidak dipakai. Seluruh 10 test lulus (3 integration + 7 OrderEvent).', en: 'PostgreSQL 16 in a temporary container; the main demo database was not used. All 10 tests passed (3 integration + 7 OrderEvent).' })}</p>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'Skenario', en: 'Scenario' })}</th>
            <th>${lhLabel({ id: 'Hasil terverifikasi', en: 'Verified result' })}</th>
          </tr></thead>
          <tbody>
            ${nusacommerceData.tests.map(([scenario, result]) => `<tr><td>${lhLabel(scenario)}</td><td>${lhLabel(result)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="lh-lede">${lhLabel({ id: 'Validasi tambahan: 5 contoh lulus, compileall berhasil, dan pip check tidak menemukan dependency rusak.', en: 'Additional validation: 5 examples passed, compileall succeeded, and pip check found no broken dependencies.' })}</p>
    </section>`;
}

function ncSlo() {
  return `
    <section class="lh-block" id="nc-slo">
      <h3>${lhLabel({ id: 'SLI, SLO, dan target non-fungsional', en: 'SLIs, SLOs, and non-functional targets' })}</h3>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'SLI', en: 'SLI' })}</th>
            <th>${lhLabel({ id: 'SLO (rolling 30 hari)', en: 'SLO (rolling 30 days)' })}</th>
          </tr></thead>
          <tbody>
            ${nusacommerceData.slo.map(([sli, objective]) => `<tr><td><code>${escapeHtml(sli)}</code></td><td>${lhLabel(objective)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <ul class="lh-chips">${nusacommerceData.targets.map((target) => `<li>${lhLabel(target)}</li>`).join('')}</ul>
    </section>`;
}

function ncSecurity() {
  return `
    <section class="lh-block" id="nc-security">
      <h3>${lhLabel({ id: 'Keamanan dan akses data', en: 'Security and data access' })}</h3>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'Area', en: 'Area' })}</th>
            <th>${lhLabel({ id: 'Kontrol', en: 'Control' })}</th>
          </tr></thead>
          <tbody>
            ${nusacommerceData.security.map(([area, control]) => `<tr><td>${lhLabel(area)}</td><td>${lhLabel(control)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

function ncStatusBadge(status) {
  const labels = {
    done: { id: 'selesai', en: 'done' },
    running: { id: 'berjalan', en: 'running' },
    starter: { id: 'starter', en: 'starter' },
    future: { id: 'future', en: 'future' },
    absent: { id: 'belum ada', en: 'not implemented' },
    out: { id: 'di luar scope', en: 'out of scope' },
  };
  const className = status === 'done' || status === 'running' ? 'lh-badge' : 'lh-pending';
  return `<span class="${className}">${lhLabel(labels[status])}</span>`;
}

function ncStatus() {
  return `
    <section class="lh-block" id="nc-status">
      <h3>${lhLabel({ id: 'Status implementasi', en: 'Implementation status' })}</h3>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'Komponen', en: 'Component' })}</th>
            <th>${lhLabel({ id: 'Status', en: 'Status' })}</th>
            <th>${lhLabel({ id: 'Bukti', en: 'Evidence' })}</th>
          </tr></thead>
          <tbody>
            ${nusacommerceData.status.map((item) => `<tr><td>${lhLabel(item.component)}</td><td>${ncStatusBadge(item.status)}</td><td>${lhLabel(item.evidence)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

function ncLimits() {
  return `
    <section class="lh-block" id="nc-limits">
      <h3>${lhLabel({ id: 'Batasan dan langkah berikutnya', en: 'Limitations and next steps' })}</h3>
      <ul class="lh-limits">${nusacommerceData.limits.map((item) => `<li>${escapeHtml(localized(item))}</li>`).join('')}</ul>
      <ul class="lh-chips">${nusacommerceData.nextSteps.map((item) => `<li>${lhLabel(item)}</li>`).join('')}</ul>
    </section>`;
}

function renderNusacommerceViz() {
  return `
    <div class="lh">
      <div class="lh-intro">
        <span class="lh-label">${lhLabel({ id: 'Arsitektur', en: 'Architecture' })}</span>
        <p class="lh-mono">${escapeHtml(nusacommerceData.environment)}</p>
        <p class="lh-lede">${escapeHtml(localized(nusacommerceData.scope))}</p>
      </div>
      ${ncStats()}
      ${ncPipeline()}
      ${ncProducts()}
      ${ncIngestion()}
      ${ncReliability()}
      ${ncTests()}
      ${ncSlo()}
      ${ncSecurity()}
      ${ncStatus()}
      ${ncLimits()}
    </div>`;
}

function renderNusacommercePage() {
  const project = projectSections
    .flatMap((section) => section.projects)
    .find((entry) => entry.detailApp === 'nusacommerce');
  if (!project) return '';
  return `
    <section class="content-app lakehouse-app" aria-labelledby="nusacommerceTitle">
      <a class="inline-link lakehouse-back" href="/projects" data-open-app="projects">${icon('arrow-left')} <span>${localized({ id: 'Kembali ke proyek', en: 'Back to projects' })}</span></a>
      <div class="content-header content-header--split">
        <div><div class="eyebrow">${localized({ id: 'DETAIL PROYEK', en: 'PROJECT DETAIL' })}</div><h2 id="nusacommerceTitle">${escapeHtml(project.title)}</h2></div>
        <p class="content-header__description">${escapeHtml(localized(projectField(project, 'scope')))}</p>
      </div>
      <div class="copy-mode-row">${copyModeToggle()}</div>
      <p class="lakehouse-lead">${escapeHtml(localized(projectField(project, 'description')))}</p>
      <p class="lakehouse-caveat"><strong>${localized({ id: 'Cakupan:', en: 'Scope note:' })}</strong> ${escapeHtml(localized(projectField(project, 'caveat')))}</p>
      <div class="tag-list">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      ${technicalBlock(renderNusacommerceViz())}
    </section>`;
}

const chicagoData = {
  environment: 'Python 3.11 · Pandas · PyArrow/Parquet · GeoPandas · SQLite index · Jupyter',
  dataset: { id: 'Chicago Traffic Crashes, 2018–2025', en: 'Chicago Traffic Crashes, 2018–2025' },
  stats: [
    { value: '4597950', label: { id: 'baris sumber', en: 'source rows' } },
    { value: '877921', label: { id: 'kecelakaan dipertahankan', en: 'crashes preserved' } },
    { value: '77', label: { id: 'community area', en: 'community areas' } },
  ],
  sources: [
    { name: 'Crashes', rows: 877921, cols: 49, grain: { id: 'Satu baris per kecelakaan', en: 'One row per crash' }, key: 'crash_record_id', size: '527,8 MiB' },
    { name: 'Vehicles', rows: 1792372, cols: 71, grain: { id: 'Satu baris per kendaraan/unit', en: 'One row per vehicle/unit' }, key: 'crash_unit_id', size: '612,1 MiB' },
    { name: 'People', rows: 1927657, cols: 29, grain: { id: 'Satu baris per orang', en: 'One row per person' }, key: 'person_id', size: '629,6 MiB' },
  ],
  stages: [
    {
      id: 'source', name: 'Sumber', file: '3 CSV · 149 kolom', kind: 'source',
      badge: { id: 'terbukti', en: 'proven' },
      summary: {
        id: 'Tiga tabel Chicago Data Portal dengan grain berbeda: satu baris per kecelakaan, per unit kendaraan, dan per orang. Rentang 1 Januari 2018 sampai 31 Desember 2025.',
        en: 'Three Chicago Data Portal tables with different grains: one row per crash, per vehicle unit, and per person. The range is 1 January 2018 through 31 December 2025.',
      },
      grain: { id: 'Crash · vehicle/unit · person', en: 'Crash · vehicle/unit · person' },
      write: { id: 'hanya dibaca dari CSV', en: 'read-only from CSV' },
      facts: [
        [{ id: 'Tabel', en: 'Tables' }, 3],
        [{ id: 'Baris', en: 'Rows' }, 4597950],
        [{ id: 'Kolom', en: 'Columns' }, 149],
        [{ id: 'Rentang', en: 'Date range' }, '2018–2025'],
      ],
    },
    {
      id: 'clean', name: 'Cleaning', file: 'chunked CSV → Parquet', kind: 'prepare',
      badge: { id: 'terbukti', en: 'proven' },
      summary: {
        id: 'CSV dibaca per chunk; missing value dan duplikasi diaudit. Kolom dengan lebih dari 30% nilai kosong dikeluarkan, tipe dan domain dinormalisasi, dan baris tetap dipertahankan.',
        en: 'CSV is read in chunks; missing values and duplicates are audited. Columns with more than 30% missing values are dropped, types and domains are normalized, and rows are retained.',
      },
      grain: { id: 'Grain sumber tidak berubah', en: 'Source grain is unchanged' },
      write: { id: 'Parquet sementara per tabel', en: 'Temporary Parquet per table' },
      facts: [
        [{ id: 'Kolom dihapus', en: 'Columns dropped' }, { id: '77 dari 149', en: '77 of 149' }],
        [{ id: 'Baris dihapus', en: 'Rows dropped' }, 0],
        [{ id: 'Sel status', en: 'Status cells' }, 3870601],
        [{ id: 'Koordinat kosong', en: 'Missing coordinates' }, 7068],
      ],
    },
    {
      id: 'integrate', name: 'Integrasi', file: 'crash_record_id + vehicle_id', kind: 'silver',
      badge: { id: 'terbukti', en: 'proven' },
      summary: {
        id: 'Vehicles dan People diringkas ke tingkat crash sebelum join ke Crashes. Relasi orang ke unit memakai vehicle_id dan crash_record_id yang sama, sehingga ringkasan tidak menggandakan baris kecelakaan.',
        en: 'Vehicles and People are aggregated to crash grain before joining to Crashes. Person-to-unit links use the same vehicle_id and crash_record_id, so summaries do not multiply crash rows.',
      },
      grain: { id: 'Satu baris per crash_record_id', en: 'One row per crash_record_id' },
      write: { id: 'left join tervalidasi one-to-one', en: 'validated one-to-one left join' },
      facts: [
        [{ id: 'Join vehicles', en: 'Vehicle join' }, { id: '877.921 sukses', en: '877,921 success' }],
        [{ id: 'Join people', en: 'People join' }, { id: '875.934 sukses', en: '875,934 success' }],
        [{ id: 'Konflik cedera', en: 'Injury conflicts' }, 1895],
        [{ id: 'Atribut Crashes', en: 'Crashes attributes' }, 67],
      ],
    },
    {
      id: 'map', name: 'Community area', file: 'GeoPandas sjoin · 77 area', kind: 'sql',
      badge: { id: 'terbukti', en: 'proven' },
      summary: {
        id: 'Koordinat asli diprioritaskan; estimasi alamat US Census hanya dipakai jika koordinat asli kosong. Titik dipetakan ke 77 poligon community area resmi dengan indeks spasial.',
        en: 'Original coordinates take priority; US Census address estimates are used only when original coordinates are missing. Points are mapped to the 77 official community-area polygons with a spatial index.',
      },
      grain: { id: 'Satu baris per crash_record_id + status area', en: 'One row per crash_record_id + area status' },
      write: { id: 'Parquet pemetaan terpisah', en: 'Separate mapping Parquet' },
      facts: [
        [{ id: 'Area', en: 'Areas' }, 77],
        [{ id: 'Terpetakan', en: 'Mapped' }, 871586],
        [{ id: 'Belum terpetakan', en: 'Unmapped' }, 6335],
        [{ id: 'Estimasi geocoder', en: 'Geocoder estimates' }, 1159],
      ],
    },
    {
      id: 'reduce', name: 'Reduksi', file: 'analysis_crashes_reduced', kind: 'gold',
      badge: { id: 'terbukti', en: 'proven' },
      summary: {
        id: 'Redundansi diperiksa dengan korelasi, kovarians, dan persentase nilai sama. Tabel analisis menyimpan 15 kolom dari 67 kolom terintegrasi; seluruh 877.921 baris tetap ada.',
        en: 'Redundancy is checked with correlation, covariance, and equal-value percentages. The analysis table keeps 15 of 67 integrated columns; all 877,921 rows remain.',
      },
      grain: { id: 'Satu baris per kecelakaan', en: 'One row per crash' },
      write: { id: 'Parquet terkompresi zstd', en: 'zstd-compressed Parquet' },
      facts: [
        [{ id: 'Kolom', en: 'Columns' }, { id: '15 dari 67', en: '15 of 67' }],
        [{ id: 'Dihapus', en: 'Dropped' }, { id: '52 (77,6%)', en: '52 (77.6%)' }],
        [{ id: 'Baris', en: 'Rows' }, 877921],
        [{ id: 'Parquet', en: 'Parquet' }, { id: '130,08 → 63,55 MB', en: '130.08 → 63.55 MB' }],
      ],
    },
    {
      id: 'marts', name: 'Ringkasan', file: '3 summary tables', kind: 'gold',
      badge: { id: 'terbukti', en: 'proven' },
      summary: {
        id: 'Tiga tabel ringkasan: community area, hari × jam, dan tipe kendaraan × tingkat keparahan. Masing-masing tersedia sebagai Parquet dan CSV.',
        en: 'Three summary tables: community area, day × hour, and vehicle type × severity. Each is available as Parquet and CSV.',
      },
      grain: { id: '77 · 168 · 122 baris', en: '77 · 168 · 122 rows' },
      write: { id: 'agregasi dari tabel integrasi', en: 'aggregated from the integrated tables' },
      facts: [
        [{ id: 'Community area', en: 'Community area' }, 77],
        [{ id: 'Hari × jam', en: 'Day × hour' }, 168],
        [{ id: 'Tipe × severity', en: 'Type × severity' }, 122],
        [{ id: 'Format', en: 'Format' }, 'Parquet + CSV'],
      ],
    },
  ],
  cleaning: [
    {
      decision: { id: 'Ambang missing > 30%', en: 'Missing threshold > 30%' },
      result: { id: '77 dari 149 kolom dikeluarkan; 4.597.950 baris dipertahankan.', en: '77 of 149 columns dropped; 4,597,950 rows retained.' },
      evidence: { id: 'Crashes 49→38, Vehicles 71→17, People 29→17.', en: 'Crashes 49→38, Vehicles 71→17, People 29→17.' },
    },
    {
      decision: { id: 'Label nilai kosong', en: 'Missing-value labels' },
      result: { id: '3.870.601 sel diberi TIDAK_BERLAKU atau TIDAK_TERCATAT, bukan nilai faktual.', en: '3,870,601 cells were labeled NOT_APPLICABLE or NOT_RECORDED, not factual values.' },
      evidence: { id: '33.915 Crashes, 567.402 Vehicle, 3.269.284 People.', en: '33,915 Crashes, 567,402 Vehicle, 3,269,284 People.' },
    },
    {
      decision: { id: 'Tipe dan domain', en: 'Types and domains' },
      result: { id: 'Tanggal dan angka tidak valid 0; age di luar 0–120 sebanyak 8; vehicle_year tidak wajar 1.073.', en: 'Invalid dates and numbers 0; age outside 0–120 was 8; implausible vehicle_year was 1,073.' },
      evidence: { id: 'Nilai asli tetap di age_raw dan vehicle_year_raw.', en: 'Original values remain in age_raw and vehicle_year_raw.' },
    },
    {
      decision: { id: 'Rekonstruksi cedera', en: 'Injury reconstruction' },
      result: { id: '875.934 konsisten; 1.895 konflik ditandai; 1.987 tanpa record orang tetap NULL.', en: '875,934 consistent; 1,895 conflicts flagged; 1,987 without people records remain NULL.' },
      evidence: { id: '1.096 total cedera diestimasi 0 dari NO INJURY / DRIVE AWAY; 891 masih tidak diketahui.', en: '1,096 injury totals estimated as 0 from NO INJURY / DRIVE AWAY; 891 remain unknown.' },
    },
    {
      decision: { id: 'Estimasi koordinat', en: 'Coordinate estimation' },
      result: { id: '7.068 koordinat kosong; 1.159 estimasi Exact dari US Census; 5.909 tetap tidak diketahui.', en: '7,068 missing coordinates; 1,159 Exact estimates from US Census; 5,909 remain unknown.' },
      evidence: { id: 'Semua estimasi punya flag dan metode; nilai sumber tidak ditimpa.', en: 'Every estimate has a flag and method; source values are not overwritten.' },
    },
    {
      decision: { id: 'ID dan grain', en: 'IDs and grain' },
      result: { id: 'ID utama unik dan non-null; jumlah baris ketiga tabel tidak berubah.', en: 'Primary keys are unique and non-null; row counts for all three tables are unchanged.' },
      evidence: { id: 'Validasi baris sumber = baris bersih; duplikat ID 0.', en: 'Source rows = clean rows; duplicate IDs 0.' },
    },
  ],
  joinChecks: [
    [{ id: 'People → unit', en: 'People → unit' }, { id: '1.885.401 COCOK + 42.256 UNIT_DARI_PERSON_ID; 0 ambigu.', en: '1,885,401 MATCH + 42,256 UNIT_FROM_PERSON_ID; 0 ambiguous.' }],
    [{ id: 'Crashes → Vehicles', en: 'Crashes → Vehicles' }, { id: '877.921 sukses; 0 gagal.', en: '877,921 success; 0 failure.' }],
    [{ id: 'Crashes → People', en: 'Crashes → People' }, { id: '875.934 sukses; 1.987 tanpa record orang.', en: '875,934 success; 1,987 without people records.' }],
    [{ id: 'Konflik num_units', en: 'num_units conflict' }, { id: '1.901 kecelakaan; sumber tidak ditimpa.', en: '1,901 crashes; source values are not overwritten.' }],
    [{ id: 'Konflik cedera', en: 'Injury conflict' }, { id: '1.895 kecelakaan; ditandai, bukan dihapus.', en: '1,895 crashes; flagged, not deleted.' }],
    [{ id: 'Perkalian baris', en: 'Row multiplication' }, { id: '0; Crashes tetap 877.921 baris.', en: '0; Crashes remains 877,921 rows.' }],
  ],
  areaStatus: [
    { label: { id: 'Koordinat asli', en: 'Original coordinates' }, value: 870436 },
    { label: { id: 'Estimasi (terpetakan)', en: 'Estimated (mapped)' }, value: 1150 },
    { label: { id: 'Koordinat hilang', en: 'Missing coordinates' }, value: 5909 },
    { label: { id: 'Di luar batas', en: 'Outside boundary' }, value: 371 },
    { label: { id: 'Koordinat tidak valid', en: 'Invalid coordinates' }, value: 55 },
  ],
  topAreas: [
    { name: 'Austin', crashes: 41495, victims: 10695, fatal: 54 },
    { name: 'Near West Side', crashes: 40539, victims: 8005, fatal: 34 },
    { name: 'Near North Side', crashes: 38912, victims: 6333, fatal: 21 },
    { name: 'Loop', crashes: 28342, victims: 5218, fatal: 25 },
    { name: 'West Town', crashes: 25581, victims: 5096, fatal: 13 },
  ],
  peaks: [
    { label: { id: 'Kecelakaan terbanyak', en: 'Most crashes' }, when: { id: 'Jumat 15.00', en: 'Friday 15:00' }, crashes: 11630, victims: 2144, severe: 147 },
    { label: { id: 'Korban terbanyak', en: 'Most victims' }, when: { id: 'Kamis 17.00', en: 'Thursday 17:00' }, crashes: 10193, victims: 2164, severe: 138 },
    { label: { id: 'Kecelakaan berat terbanyak', en: 'Most severe crashes' }, when: { id: 'Jumat 16.00', en: 'Friday 16:00' }, crashes: 11437, victims: 2153, severe: 169 },
  ],
  outputs: [
    { name: 'integrated_crashes.parquet', rows: 877921, content: { id: '67 atribut', en: '67 attributes' } },
    { name: 'integrated_vehicles.parquet', rows: 1792372, content: { id: '36 atribut', en: '36 attributes' } },
    { name: 'integrated_people.parquet', rows: 1927657, content: { id: '43 atribut', en: '43 attributes' } },
    { name: 'analysis_crashes_reduced.parquet', rows: 877921, content: { id: '15 atribut · 63,55 MB', en: '15 attributes · 63.55 MB' } },
    { name: 'area_impact_summary', rows: 77, content: { id: 'ringkasan community area', en: 'community area summary' } },
    { name: 'hourly_risk_summary', rows: 168, content: { id: 'ringkasan hari × jam', en: 'day × hour summary' } },
    { name: 'vehicle_severity_summary', rows: 122, content: { id: 'tipe kendaraan × severity', en: 'vehicle type × severity' } },
  ],
  limits: [
    { id: 'Jumlah kecelakaan per area atau kondisi cuaca tidak sama dengan risiko per perjalanan karena data paparan (penduduk, perjalanan, kendaraan) tidak tersedia.', en: 'Crash counts per area or weather condition are not travel risk because exposure data (population, trips, vehicles) is unavailable.' },
    { id: 'Koordinat hasil geocoder adalah estimasi rentang alamat, bukan lokasi kejadian yang terverifikasi.', en: 'Geocoder coordinates are address-range estimates, not verified crash locations.' },
    { id: '6.335 kecelakaan belum terpetakan; 5.909 lokasi dan 891 total cedera masih tidak diketahui.', en: '6,335 crashes remain unmapped; 5,909 locations and 891 injury totals remain unknown.' },
    { id: 'Sumber hanya mencakup kecelakaan yang dilaporkan ke polisi; kejadian yang tidak dilaporkan tidak ada dalam data.', en: 'The source covers police-reported crashes only; unreported events are absent.' },
    { id: 'Angka berasal dari salinan data lokal; jumlah dapat berbeda bila City of Chicago memperbarui sumber.', en: 'Figures come from a local data copy; counts may differ if the City of Chicago updates the source.' },
    { id: 'Tabel tipe kendaraan dapat memuat satu kecelakaan pada beberapa tipe; involved_crash_count tidak boleh dijumlahkan sebagai total kecelakaan unik.', en: 'The vehicle-type table can contain one crash under multiple types; involved_crash_count must not be summed as unique crashes.' },
    { id: 'Label TIDAK_TERCATAT dan TIDAK_BERLAKU adalah status, bukan fakta; age dan vehicle_year yang tidak diketahui tetap NULL pada data asli.', en: 'NOT_RECORDED and NOT_APPLICABLE are status labels, not facts; unknown age and vehicle_year remain NULL in the original data.' },
  ],
  nextSteps: [
    { id: 'Tambahkan data paparan per area', en: 'Add exposure data per area' },
    { id: 'Verifikasi koordinat estimasi', en: 'Verify estimated coordinates' },
    { id: 'Analisis sensitivitas missing/estimasi', en: 'Missing/estimate sensitivity analysis' },
    { id: 'Perketat rekonstruksi cedera', en: 'Tighten injury reconstruction' },
    { id: 'Pemodelan dengan proteksi leakage', en: 'Modeling with leakage guards' },
    { id: 'Dashboard dan pipeline reproducible', en: 'Dashboard and reproducible pipeline' },
  ],
};

function chStats() {
  return `
    <div class="lh-stats">
      ${chicagoData.stats.map((stat) => `
        <div class="lh-stat"><b>${lhNumber(Number(stat.value))}</b><span>${lhLabel(stat.label)}</span></div>`).join('')}
    </div>`;
}

function chStageDetail() {
  const stage = chicagoData.stages.find((entry) => entry.id === state.chicago.stage);
  return `
    <div class="lh-detail lh-detail--${stage.kind}">
      <div>
        <h4>${escapeHtml(stage.name)} <span class="lh-badge">${lhLabel(stage.badge)}</span></h4>
        <p>${escapeHtml(localized(stage.summary))}</p>
        <dl class="lh-kv">
          <dt>${lhLabel({ id: 'Grain', en: 'Grain' })}</dt><dd>${escapeHtml(localized(stage.grain))}</dd>
          <dt>${lhLabel({ id: 'Output', en: 'Output' })}</dt><dd><code>${escapeHtml(localized(stage.write))}</code></dd>
        </dl>
      </div>
      <ul class="lh-facts">
        ${stage.facts.map(([label, value]) => `<li><span>${lhLabel(label)}</span><b>${typeof value === 'number' ? lhNumber(value) : escapeHtml(localized(value))}</b></li>`).join('')}
      </ul>
    </div>`;
}

function chPipeline() {
  const nodes = chicagoData.stages.map((stage, index) => {
    const active = state.chicago.stage === stage.id;
    return `
      <button type="button" class="lh-node lh-node--${stage.kind}${active ? ' is-on' : ''}" data-ch-stage="${escapeHtml(stage.id)}" aria-pressed="${active}">
        <span class="lh-node__name">${escapeHtml(stage.name)}</span>
        <span class="lh-node__file">${escapeHtml(stage.file)}</span>
      </button>
      ${index < chicagoData.stages.length - 1 ? '<span class="lh-arrow" aria-hidden="true">→</span>' : ''}`;
  }).join('');
  return `
    <section class="lh-block" id="ch-pipeline">
      <h3>${lhLabel({ id: 'Alur preprocessing', en: 'Preprocessing path' })}</h3>
      <p class="lh-lede">${lhLabel({ id: 'Pilih tahap untuk melihat ringkasan, grain, output, dan angka yang tercatat di notebook.', en: 'Select a stage to inspect its summary, grain, output, and recorded notebook figures.' })}</p>
      <div class="lh-flow" role="group" aria-label="${lhLabel({ id: 'Tahap preprocessing', en: 'Preprocessing stages' })}">${nodes}</div>
      <div id="ch-stage-detail">${chStageDetail()}</div>
    </section>`;
}

function chSteps() {
  return `
    <section class="lh-block" id="ch-steps">
      <h3>${lhLabel({ id: 'Ringkasan reduksi', en: 'Reduction at a glance' })}</h3>
      <div class="lh-steps">
        <div class="lh-step lh-step--bronze">
          <span>${lhLabel({ id: 'Sumber', en: 'Source' })}</span><b>${lhNumber(4597950)}</b>
          <small>${lhLabel({ id: 'baris dari 3 tabel', en: 'rows from 3 tables' })}</small>
        </div>
        <div class="lh-step-arrow" aria-hidden="true">join</div>
        <div class="lh-step lh-step--silver">
          <span>Crashes</span><b>${lhNumber(877921)}</b>
          <small>${lhLabel({ id: 'baris tetap, 67 atribut', en: 'rows preserved, 67 attributes' })}</small>
        </div>
        <div class="lh-step-arrow" aria-hidden="true">−52</div>
        <div class="lh-step lh-step--gold">
          <span>${lhLabel({ id: 'Analisis', en: 'Analysis' })}</span><b>15</b>
          <small>${lhLabel({ id: 'atribut, 877.921 baris', en: 'attributes, 877,921 rows' })}</small>
        </div>
      </div>
    </section>`;
}

function chSources() {
  return `
    <section class="lh-block" id="ch-sources">
      <h3>${lhLabel({ id: 'Tiga tabel sumber', en: 'Three source tables' })}</h3>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'Tabel', en: 'Table' })}</th>
            <th class="lh-num">${lhLabel({ id: 'baris', en: 'rows' })}</th>
            <th class="lh-num">${lhLabel({ id: 'kolom', en: 'columns' })}</th>
            <th>${lhLabel({ id: 'grain', en: 'grain' })}</th>
            <th>${lhLabel({ id: 'kunci', en: 'key' })}</th>
            <th>${lhLabel({ id: 'ukuran', en: 'size' })}</th>
          </tr></thead>
          <tbody>
            ${chicagoData.sources.map((source) => `<tr>
              <td><strong>${escapeHtml(source.name)}</strong></td>
              <td class="lh-num">${lhNumber(source.rows)}</td>
              <td class="lh-num">${source.cols}</td>
              <td>${lhLabel(source.grain)}</td>
              <td><code>${escapeHtml(source.key)}</code></td>
              <td>${escapeHtml(source.size)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="lh-lede">${lhLabel({ id: 'Total 4.597.950 baris dan 149 kolom. Crashes menjadi tabel induk; Vehicles dan People one-to-many terhadap kecelakaan.', en: 'A total of 4,597,950 rows and 149 columns. Crashes is the parent table; Vehicles and People are one-to-many with a crash.' })}</p>
    </section>`;
}

function chCleaning() {
  return `
    <section class="lh-block" id="ch-cleaning">
      <h3>${lhLabel({ id: 'Keputusan cleaning dan buktinya', en: 'Cleaning decisions and evidence' })}</h3>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'Keputusan', en: 'Decision' })}</th>
            <th>${lhLabel({ id: 'Hasil', en: 'Result' })}</th>
            <th>${lhLabel({ id: 'Bukti', en: 'Evidence' })}</th>
          </tr></thead>
          <tbody>
            ${chicagoData.cleaning.map((row) => `<tr><td>${lhLabel(row.decision)}</td><td>${lhLabel(row.result)}</td><td>${lhLabel(row.evidence)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="lh-lede">${lhLabel({ id: 'Tidak ada baris yang dihapus. Nilai yang tidak dapat dipastikan tetap kosong atau disimpan bersama penanda estimasi.', en: 'No rows were deleted. Values that cannot be established remain empty or are stored with an estimation flag.' })}</p>
    </section>`;
}

function chJoin() {
  return `
    <section class="lh-block" id="ch-join">
      <h3>${lhLabel({ id: 'Integrasi tanpa menggandakan baris', en: 'Integration without row multiplication' })}</h3>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'Pemeriksaan', en: 'Check' })}</th>
            <th>${lhLabel({ id: 'Hasil', en: 'Result' })}</th>
          </tr></thead>
          <tbody>
            ${chicagoData.joinChecks.map(([check, result]) => `<tr><td>${lhLabel(check)}</td><td>${lhLabel(result)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

function chAreaMapping() {
  const max = Math.max(...chicagoData.areaStatus.map((row) => row.value), 1);
  return `
    <section class="lh-block" id="ch-area">
      <h3>${lhLabel({ id: 'Pemetaan ke community area', en: 'Community-area mapping' })}</h3>
      <div class="lh-chart">
        <h4>${lhLabel({ id: 'Status 877.921 kecelakaan', en: 'Status of 877,921 crashes' })}</h4>
        ${chicagoData.areaStatus.map((row) => `
          <div class="lh-bar-row">
            <span>${lhLabel(row.label)}</span>
            <div class="lh-bar lh-bar--gold"><i style="width:${(row.value / max) * 100}%"></i></div>
            <b>${lhNumber(row.value)}</b>
          </div>`).join('')}
        <p class="lh-lede">${lhLabel({ id: '871.586 kecelakaan terpetakan (870.436 koordinat asli + 1.150 estimasi); 6.335 belum terpetakan.', en: '871,586 crashes mapped (870,436 original + 1,150 estimated); 6,335 remain unmapped.' })}</p>
      </div>
    </section>`;
}

function chAreaBars() {
  const max = chicagoData.topAreas[0].crashes;
  return `
    <div class="lh-chart">
      <h4>${lhLabel({ id: 'Lima community area dengan kecelakaan terbanyak', en: 'Five community areas with the most crashes' })}</h4>
      ${chicagoData.topAreas.map((area) => `
        <div class="lh-bar-row">
          <span>${escapeHtml(area.name)}</span>
          <div class="lh-bar lh-bar--gold"><i style="width:${(area.crashes / max) * 100}%"></i></div>
          <b>${lhNumber(area.crashes)}</b>
        </div>`).join('')}
      <p class="lh-lede">${lhLabel({ id: 'Austin 25,77 korban per 100 kecelakaan; Near North Side 16,28. Lima area teratas menampung 20,06% kecelakaan terpetakan.', en: 'Austin has 25.77 victims per 100 crashes; Near North Side 16.28. The top five areas hold 20.06% of mapped crashes.' })}</p>
    </div>`;
}

function chPeaks() {
  return `
    <div class="lh-chart">
      <h4>${lhLabel({ id: 'Puncak hari × jam', en: 'Day × hour peaks' })}</h4>
      <ul class="lh-facts">
        ${chicagoData.peaks.map((peak) => `<li>
          <span>${lhLabel(peak.label)}</span>
          <b>${lhLabel(peak.when)} · ${lhNumber(peak.crashes)} / ${lhNumber(peak.victims)} / ${lhNumber(peak.severe)}</b>
        </li>`).join('')}
      </ul>
      <p class="lh-lede">${lhLabel({ id: 'Format: waktu · kecelakaan / korban / kecelakaan berat. Angka keterlibatan tidak menunjukkan penyebab atau risiko per perjalanan.', en: 'Format: time · crashes / victims / severe crashes. Involvement counts do not show causation or per-trip risk.' })}</p>
    </div>`;
}

function chFindings() {
  return `
    <section class="lh-block" id="ch-findings">
      <h3>${lhLabel({ id: 'Temuan dari tabel ringkasan', en: 'Findings from the summary tables' })}</h3>
      <div class="lh-grid2">${chAreaBars()}${chPeaks()}</div>
    </section>`;
}

function chOutputs() {
  return `
    <section class="lh-block" id="ch-outputs">
      <h3>${lhLabel({ id: 'Output dan audit', en: 'Outputs and audits' })}</h3>
      <div class="lh-scroll">
        <table class="lh-table">
          <thead><tr>
            <th>${lhLabel({ id: 'Output', en: 'Output' })}</th>
            <th class="lh-num">${lhLabel({ id: 'baris', en: 'rows' })}</th>
            <th>${lhLabel({ id: 'isi', en: 'content' })}</th>
          </tr></thead>
          <tbody>
            ${chicagoData.outputs.map((output) => `<tr>
              <td><code>${escapeHtml(output.name)}</code></td>
              <td class="lh-num">${lhNumber(output.rows)}</td>
              <td>${lhLabel(output.content)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="lh-lede">${lhLabel({ id: 'Audit tersimpan sebagai missing_value_audit.csv, integration_audit.csv, dan estimation_extension_audit.csv.', en: 'Audits are stored as missing_value_audit.csv, integration_audit.csv, and estimation_extension_audit.csv.' })}</p>
    </section>`;
}

function chLimits() {
  return `
    <section class="lh-block" id="ch-limits">
      <h3>${lhLabel({ id: 'Batasan dan langkah berikutnya', en: 'Limitations and next steps' })}</h3>
      <ul class="lh-limits">${chicagoData.limits.map((item) => `<li>${escapeHtml(localized(item))}</li>`).join('')}</ul>
      <ul class="lh-chips">${chicagoData.nextSteps.map((item) => `<li>${lhLabel(item)}</li>`).join('')}</ul>
    </section>`;
}

function renderChicagoViz() {
  return `
    <div class="lh">
      <div class="lh-intro">
        <span class="lh-label">${lhLabel({ id: 'Lingkungan', en: 'Environment' })}</span>
        <p class="lh-mono">${escapeHtml(chicagoData.environment)}</p>
        <p class="lh-lede">${escapeHtml(localized(chicagoData.dataset))}</p>
      </div>
      ${chStats()}
      ${chPipeline()}
      ${chSteps()}
      ${chSources()}
      ${chCleaning()}
      ${chJoin()}
      ${chAreaMapping()}
      ${chFindings()}
      ${chOutputs()}
      ${chLimits()}
    </div>`;
}

function renderChicagoPage() {
  const project = projectSections
    .flatMap((section) => section.projects)
    .find((entry) => entry.detailApp === 'chicago');
  if (!project) return '';
  return `
    <section class="content-app lakehouse-app" aria-labelledby="chicagoTitle">
      <a class="inline-link lakehouse-back" href="/projects" data-open-app="projects">${icon('arrow-left')} <span>${localized({ id: 'Kembali ke proyek', en: 'Back to projects' })}</span></a>
      <div class="content-header content-header--split">
        <div><div class="eyebrow">${localized({ id: 'DETAIL PROYEK', en: 'PROJECT DETAIL' })}</div><h2 id="chicagoTitle">${escapeHtml(project.title)}</h2></div>
        <p class="content-header__description">${escapeHtml(localized(projectField(project, 'scope')))}</p>
      </div>
      <div class="copy-mode-row">${copyModeToggle()}</div>
      <p class="lakehouse-lead">${escapeHtml(localized(projectField(project, 'description')))}</p>
      <p class="lakehouse-caveat"><strong>${localized({ id: 'Cakupan:', en: 'Scope note:' })}</strong> ${escapeHtml(localized(projectField(project, 'caveat')))}</p>
      <div class="tag-list">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      ${technicalBlock(renderChicagoViz())}
    </section>`;
}

const projectDetails = {
  rekberin: {
    environment: 'TypeScript · Next.js App Router · Prisma · PostgreSQL · NextAuth · Midtrans Core API (sandbox)',
    overview: {
      id: 'Rekberin adalah marketplace akun game dengan negosiasi, pembayaran QRIS Midtrans, dan alur serah terima. Kontribusi saya berfokus pada API transaksi yang persisten, reservasi listing, kontrol akses peserta, serta integrasi dan rekonsiliasi pembayaran.',
      en: 'Rekberin is a game-account marketplace with negotiation, Midtrans QRIS payment, and a handover flow. My contributions focused on persisted transaction APIs, listing reservations, participant access control, and payment integration and reconciliation.',
    },
    stats: [
      { value: '3', label: { id: 'pull request tergabung', en: 'merged pull requests' } },
      { value: 'QRIS', label: { id: 'Midtrans sandbox', en: 'Midtrans sandbox' } },
      { value: '2 jam', label: { id: 'batas konfirmasi buyer', en: 'buyer confirmation window' } },
    ],
    flow: [
      { name: 'Listing', file: { id: 'akun game', en: 'game account' }, kind: 'source' },
      { name: { id: 'Tawaran & chat', en: 'Offer & chat' }, file: { id: 'negosiasi', en: 'negotiation' }, kind: 'prepare' },
      { name: { id: 'Pembayaran QRIS', en: 'QRIS payment' }, file: 'Midtrans sandbox', kind: 'silver' },
      { name: 'Webhook', file: { id: 'verifikasi tanda tangan', en: 'signature verification' }, kind: 'silver' },
      { name: 'Handover', file: { id: 'chat & konfirmasi', en: 'chat & confirmation' }, kind: 'gold' },
      { name: 'Payout', file: { id: 'simulasi database', en: 'database simulation' }, kind: 'gold' },
    ],
    contributions: [
      { id: 'Mengimplementasikan persisted transaction APIs dengan TypeScript, Next.js, Prisma, dan PostgreSQL.', en: 'Implemented persisted transaction APIs with TypeScript, Next.js, Prisma, and PostgreSQL.' },
      { id: 'Menambahkan atomic listing reservations dan participant-based access controls agar hanya pihak dalam transaksi yang dapat mengubah state.', en: 'Added atomic listing reservations and participant-based access controls so only transaction participants can change state.' },
      { id: 'Mengintegrasikan Midtrans Core API untuk QRIS sandbox, verifikasi tanda tangan webhook, dan rekonsiliasi pembayaran.', en: 'Integrated Midtrans Core API for sandbox QRIS, webhook signature verification, and payment reconciliation.' },
      { id: 'Menambahkan tes transaksi dan pembayaran melalui pull request #28, #38, dan #44 yang digabungkan.', en: 'Added transaction and payment tests through merged pull requests #28, #38, and #44.' },
    ],
    facts: [
      [{ id: 'Repositori', en: 'Repository' }, { id: 'publik · tim', en: 'public · team' }],
      [{ id: 'Peran', en: 'Role' }, { id: 'kontributor transaksi & pembayaran', en: 'transaction and payment contributor' }],
      [{ id: 'Pull request', en: 'Pull requests' }, '#28 · #38 · #44'],
      [{ id: 'Stack', en: 'Stack' }, 'TypeScript · Next.js · Prisma · PostgreSQL'],
      [{ id: 'Pembayaran', en: 'Payment' }, 'Midtrans Core API · QRIS sandbox'],
      [{ id: 'Kontrol akses', en: 'Access control' }, { id: 'participant-based', en: 'participant-based' }],
      [{ id: 'Reservasi listing', en: 'Listing reservation' }, { id: 'atomik', en: 'atomic' }],
      [{ id: 'Payout & refund', en: 'Payout & refund' }, { id: 'disimulasikan', en: 'simulated' }],
      [{ id: 'Handover expiry', en: 'Handover expiry' }, { id: 'worker 30 detik / endpoint cron', en: '30-second worker / cron endpoint' }],
    ],
    limits: [
      { id: 'Integrasi Midtrans hanya memakai sandbox; kredensial dan perilaku production tidak diverifikasi.', en: 'The Midtrans integration uses only the sandbox; production credentials and behavior are not verified.' },
      { id: 'Seller payout dan refund dicatat sebagai simulasi database, bukan transfer nyata.', en: 'Seller payouts and refunds are recorded as database simulations, not real transfers.' },
      { id: 'Repositori ini milik tim; halaman ini hanya memuat kontribusi individual melalui pull request yang tercatat.', en: 'The repository belongs to a team; this page covers only individual contributions through the recorded pull requests.' },
    ],
  },
  lelaku: {
    environment: 'Python · FastAPI · PostgreSQL · SQLAlchemy · Alembic · Argon2 · GitHub Actions',
    overview: {
      id: 'Lelaku adalah aplikasi perjalanan berbasis tim. Sebagai Team Lead, saya mengerjakan autentikasi dan profil: API FastAPI/PostgreSQL dengan Argon2, sesi yang dapat dicabut, token ter-hash, secure cookie, serta integrasi autentikasi ke frontend, trip, dan chat.',
      en: 'Lelaku is a team-based travel application. As Team Lead, I worked on authentication and profiles: FastAPI/PostgreSQL APIs with Argon2, revocable sessions, hashed tokens, secure cookies, and authentication integration across the frontend, trips, and chat.',
    },
    stats: [
      { value: 'Team Lead', label: { id: 'peran tim', en: 'team role' } },
      { value: 'Argon2', label: { id: 'hashing password', en: 'password hashing' } },
      { value: 'Revocable', label: { id: 'sesi', en: 'sessions' } },
    ],
    flow: [
      { name: 'Client', file: 'frontend / trip / chat', kind: 'source' },
      { name: 'Auth routes', file: 'FastAPI', kind: 'prepare' },
      { name: 'Argon2', file: { id: 'verifikasi password', en: 'password verification' }, kind: 'silver' },
      { name: 'Session', file: { id: 'token ter-hash', en: 'hashed token' }, kind: 'silver' },
      { name: 'Secure cookie', file: { id: 'dapat dicabut', en: 'revocable' }, kind: 'gold' },
      { name: { id: 'Rute terproteksi', en: 'Protected routes' }, file: { id: 'profil · trip · chat', en: 'profile · trip · chat' }, kind: 'gold' },
    ],
    contributions: [
      { id: 'Mengimplementasikan auth/profile APIs FastAPI dan PostgreSQL dengan Argon2, revocable sessions, hashed tokens, secure cookies, serta validasi email unik.', en: 'Implemented FastAPI and PostgreSQL auth/profile APIs with Argon2, revocable sessions, hashed tokens, secure cookies, and unique email validation.' },
      { id: 'Mengintegrasikan autentikasi frontend, trip, dan chat pada feature branch.', en: 'Integrated frontend, trip, and chat authentication on a feature branch.' },
      { id: 'Merekonsiliasi migrasi Alembic dan menambahkan tes serta konfigurasi CI.', en: 'Reconciled Alembic migrations and added tests and CI configuration.' },
      { id: 'Menyiapkan konfigurasi database TLS untuk rencana cutover Azure.', en: 'Prepared database TLS configuration for the planned Azure cutover.' },
    ],
    facts: [
      [{ id: 'Repositori', en: 'Repository' }, { id: 'publik · tim', en: 'public · team' }],
      [{ id: 'Peran', en: 'Role' }, { id: 'Team Lead · authentication contributor', en: 'Team Lead · authentication contributor' }],
      [{ id: 'Hashing', en: 'Hashing' }, 'Argon2'],
      [{ id: 'Sesi', en: 'Sessions' }, { id: 'revocable · token ter-hash', en: 'revocable · hashed tokens' }],
      [{ id: 'Cookie', en: 'Cookies' }, { id: 'secure', en: 'secure' }],
      [{ id: 'Validasi', en: 'Validation' }, { id: 'email unik', en: 'unique email' }],
      [{ id: 'Migrasi', en: 'Migrations' }, 'Alembic'],
      [{ id: 'CI', en: 'CI' }, 'GitHub Actions'],
      [{ id: 'Deployment Azure', en: 'Azure deployment' }, { id: 'belum terverifikasi', en: 'unverified' }],
    ],
    limits: [
      { id: 'Deployment Azure belum terverifikasi; konfigurasi TLS database hanya disiapkan untuk rencana cutover.', en: 'Azure deployment is unverified; database TLS configuration was only prepared for the planned cutover.' },
      { id: 'Perilaku aplikasi di luar snapshot repositori tidak diverifikasi ulang di halaman ini.', en: 'Application behavior beyond the repository snapshot is not reverified on this page.' },
      { id: 'Repositori ini milik tim; kontribusi ditulis sebagai bagian dari pekerjaan kolaboratif.', en: 'The repository belongs to a team; contributions are described as part of collaborative work.' },
    ],
  },
  wanttosell: {
    environment: 'Node.js · Express · MongoDB replica set · Mongoose · JWT · Postman/Newman · Docker Compose',
    overview: {
      id: 'WantToSell adalah platform penjualan pakaian thrift dengan stok unik. Kontribusi backend saya mencakup autentikasi, katalog produk, favorit, order, dan review, dengan reservasi stok transaksional, expiry order, pembayaran simulasi, serta pengujian API dan integritas.',
      en: 'WantToSell is a thrift-clothing platform with unique stock. My backend contributions covered authentication, product catalog, favorites, orders, and reviews, with transactional stock reservations, order expiry, simulated payment, and API and integrity testing.',
    },
    stats: [
      { value: '10', label: { id: 'request pembelian bersamaan', en: 'concurrent purchase requests' } },
      { value: '1', label: { id: 'order terbentuk', en: 'order created' } },
      { value: '9', label: { id: 'conflict', en: 'conflicts' } },
    ],
    flow: [
      { name: { id: 'Produk', en: 'Product' }, file: { id: 'stok unik', en: 'unique stock' }, kind: 'source' },
      { name: 'Order', file: 'Express API', kind: 'prepare' },
      { name: { id: 'Reservasi stok', en: 'Stock reservation' }, file: { id: 'transaksi MongoDB', en: 'MongoDB transaction' }, kind: 'silver' },
      { name: { id: 'Pembayaran', en: 'Payment' }, file: { id: 'simulasi QRIS/VA', en: 'simulated QRIS/VA' }, kind: 'silver' },
      { name: { id: 'Kedaluwarsa', en: 'Expiry' }, file: 'ORDER_EXPIRY_MINUTES', kind: 'gold' },
    ],
    contributions: [
      { id: 'Mengintegrasikan autentikasi Express/MongoDB, product CRUD/search, favorites, orders, dan reviews.', en: 'Integrated Express/MongoDB authentication, product CRUD/search, favorites, orders, and reviews.' },
      { id: 'Mengimplementasikan reservasi stok satu item secara transaksional, expiry order, dan simulasi pembayaran.', en: 'Implemented transactional stock-one reservations, order expiry, and simulated payment.' },
      { id: 'Menambahkan pengujian API dengan Postman/Newman dan pengujian integritas untuk race condition serta kedaluwarsa.', en: 'Added Postman/Newman API tests and integrity tests for race conditions and expiry.' },
      { id: 'Merekam hasil race purchase 10 request: satu order berhasil dan sembilan conflict.', en: 'Recorded a ten-request purchase race: one order succeeded and nine returned conflicts.' },
    ],
    facts: [
      [{ id: 'Repositori', en: 'Repository' }, { id: 'publik · tim', en: 'public · team' }],
      [{ id: 'Stack', en: 'Stack' }, 'Node.js · Express · MongoDB · Mongoose'],
      [{ id: 'Database', en: 'Database' }, { id: 'replica set untuk transaksi', en: 'replica set for transactions' }],
      [{ id: 'Auth', en: 'Auth' }, 'JWT'],
      [{ id: 'Stok', en: 'Stock' }, { id: 'satu item per produk', en: 'one item per product' }],
      [{ id: 'Race 10 request', en: 'Ten-request race' }, { id: '1 order · 9 conflict', en: '1 order · 9 conflicts' }],
      [{ id: 'Pembayaran', en: 'Payment' }, { id: 'QRIS/VA disimulasikan', en: 'simulated QRIS/VA' }],
      [{ id: 'Pengujian API', en: 'API tests' }, { id: '9 kelompok Newman', en: '9 Newman groups' }],
      [{ id: 'Snapshot Newman', en: 'Newman snapshot' }, { id: '1 assertion gagal', en: '1 failed assertion' }],
    ],
    limits: [
      { id: 'Provider pembayaran merupakan simulasi; backend belum terhubung ke Midtrans sungguhan.', en: 'The payment provider is simulated; the backend is not connected to real Midtrans.' },
      { id: 'Laporan Newman pada snapshot mencatat satu assertion gagal; jangan mengklaim semua tes lulus.', en: 'The Newman report snapshot records one failed assertion; do not claim every test passes.' },
      { id: 'Login Google belum diimplementasikan, dan registrasi publik selalu membuat akun buyer.', en: 'Google login is not implemented, and public registration always creates a buyer account.' },
      { id: 'Repositori ini milik tim; halaman ini memuat kontribusi backend dan testing.', en: 'The repository belongs to a team; this page covers backend and testing contributions.' },
    ],
  },
  photobooth: {
    environment: 'Next.js App Router · TypeScript · SQLite (WAL) · Sharp/libvips · SSE · C++ camera bridge',
    overview: {
      id: 'Photobooth adalah prototipe kiosk local-first untuk satu perangkat dan satu sesi aktif. Next.js melayani UI serta backend lokal, SQLite dan folder lokal menjadi sumber kebenaran operasional, dan Local Camera Service menjadi batas integrasi ke kamera mirrorless melalui USB.',
      en: 'Photobooth is a local-first kiosk prototype for one device and one active session. Next.js serves the UI and local backend, SQLite and a local folder are the operational source of truth, and a Local Camera Service is the integration boundary to a USB mirrorless camera.',
    },
    stats: [
      { value: '1', label: { id: 'sesi aktif', en: 'active session' } },
      { value: 'SQLite', label: { id: 'sumber kebenaran lokal', en: 'local source of truth' } },
      { value: { id: 'Privat', en: 'Private' }, label: { id: 'repositori', en: 'repository' } },
    ],
    flow: [
      { name: { id: 'Pilih paket', en: 'Choose package' }, file: 'template', kind: 'source' },
      { name: 'QRIS + PIN', file: { id: 'verifikasi operator', en: 'operator verification' }, kind: 'prepare' },
      { name: 'Camera', file: 'prepare & capture', kind: 'silver' },
      { name: 'Composite', file: 'crop · frame · thumbnail', kind: 'silver' },
      { name: { id: 'Simpan lokal', en: 'Local save' }, file: { id: 'sebelum upload', en: 'before upload' }, kind: 'gold' },
      { name: 'Drive upload', file: { id: 'queue durabel', en: 'durable queue' }, kind: 'gold' },
      { name: { id: 'QR hasil', en: 'Result QR' }, file: { id: 'tautan hasil', en: 'result link' }, kind: 'gold' },
    ],
    contributions: [
      { id: 'Mengimplementasikan session states Next.js/SQLite dengan satu sesi aktif yang dikunci di database.', en: 'Implemented Next.js/SQLite session states with a single active session locked in the database.' },
      { id: 'Menambahkan idempotent commands, transaksi, audit logs, serta pemeriksaan health dan backup lokal.', en: 'Added idempotent commands, transactions, audit logs, and local health and backup checks.' },
      { id: 'Membuat batas integrasi kamera C++ dengan fake-bridge tests agar alur capture dapat diuji tanpa hardware.', en: 'Built a C++ camera integration boundary with fake-bridge tests so the capture flow can be tested without hardware.' },
    ],
    facts: [
      [{ id: 'Repositori', en: 'Repository' }, { id: 'privat', en: 'private' }],
      [{ id: 'Platform', en: 'Platform' }, { id: 'satu laptop/tablet touchscreen · satu kamera USB', en: 'one touchscreen laptop/tablet · one USB camera' }],
      [{ id: 'Local-first', en: 'Local-first' }, { id: 'SQLite + folder lokal', en: 'SQLite + local folder' }],
      [{ id: 'Sesi aktif', en: 'Active session' }, { id: 'dikunci di database', en: 'locked in the database' }],
      [{ id: 'Pembayaran', en: 'Payment' }, { id: 'QRIS statis · verifikasi manual operator', en: 'static QRIS · manual operator verification' }],
      [{ id: 'Penyimpanan hasil', en: 'Result storage' }, { id: 'lokal sebelum upload Drive', en: 'local before Drive upload' }],
      [{ id: 'Kamera bridge', en: 'Camera bridge' }, 'C++ · fake-bridge tests'],
      [{ id: 'Status realtime', en: 'Realtime status' }, 'Server-Sent Events'],
      [{ id: 'Kamera fisik', en: 'Physical camera' }, { id: 'belum terverifikasi', en: 'unverified' }],
    ],
    limits: [
      { id: 'Operasi kamera fisik belum terverifikasi pada snapshot dokumen; pengujian memakai fake bridge.', en: 'Physical camera operation was unverified in the document snapshot; testing used a fake bridge.' },
      { id: 'Integrasi Google Drive, perangkat kiosk, dan operasi lapangan belum diverifikasi di halaman ini.', en: 'Google Drive integration, kiosk hardware, and field operation are not verified on this page.' },
      { id: 'Repositori bersifat privat; detail ditulis dari dokumen perencanaan dan snapshot implementasi.', en: 'The repository is private; details come from the planning document and implementation snapshot.' },
    ],
  },
  moneytracker: {
    environment: 'Dart · Flutter · Riverpod · GoRouter · Supabase',
    overview: {
      id: 'Money Tracker adalah aplikasi keuangan pribadi berbasis Flutter. Kontribusi saya mencakup tab dashboard, navigasi bulan, dan proyeksi transaksi mendatang, dengan regression tests pada alur yang memakai repository data berbasis Supabase.',
      en: 'Money Tracker is a Flutter-based personal finance application. My contributions covered dashboard tabs, month navigation, and future transaction projections, with regression tests on flows backed by Supabase data repositories.',
    },
    stats: [
      { value: 'Flutter', label: { id: 'aplikasi mobile', en: 'mobile application' } },
      { value: 'Riverpod', label: { id: 'state management', en: 'state management' } },
      { value: 'Supabase', label: { id: 'sumber data', en: 'data source' } },
    ],
    flow: [
      { name: 'Supabase', file: { id: 'repository data', en: 'data repositories' }, kind: 'source' },
      { name: 'Providers', file: 'Riverpod', kind: 'prepare' },
      { name: 'Dashboard', file: { id: 'tab & ringkasan', en: 'tabs & summary' }, kind: 'silver' },
      { name: { id: 'Navigasi bulan', en: 'Month navigation' }, file: { id: 'periode', en: 'period' }, kind: 'silver' },
      { name: { id: 'Proyeksi', en: 'Projection' }, file: { id: 'transaksi mendatang', en: 'future transactions' }, kind: 'gold' },
    ],
    contributions: [
      { id: 'Berkontribusi pada tab dashboard dan ringkasan keuangan.', en: 'Contributed dashboard tabs and financial summaries.' },
      { id: 'Mengimplementasikan navigasi bulan untuk berpindah periode transaksi.', en: 'Implemented month navigation for moving between transaction periods.' },
      { id: 'Menambahkan proyeksi transaksi mendatang beserta regression tests.', en: 'Added future transaction projections with regression tests.' },
    ],
    facts: [
      [{ id: 'Repositori', en: 'Repository' }, { id: 'publik · kolaboratif', en: 'public · collaborative' }],
      [{ id: 'Stack', en: 'Stack' }, 'Dart · Flutter · Riverpod · GoRouter'],
      [{ id: 'Data', en: 'Data' }, { id: 'repository berbasis Supabase', en: 'Supabase-backed repositories' }],
      [{ id: 'Kontribusi', en: 'Contributions' }, { id: 'dashboard · navigasi bulan · proyeksi', en: 'dashboard · month navigation · projections' }],
      [{ id: 'Tes', en: 'Tests' }, { id: 'regression tests', en: 'regression tests' }],
    ],
    limits: [
      { id: 'Halaman ini hanya mencakup kontribusi UI, navigasi, dan proyeksi; bukan seluruh aplikasi.', en: 'This page covers only UI, navigation, and projection contributions, not the entire application.' },
      { id: 'Perilaku production dan data pengguna tidak diverifikasi ulang dari snapshot repositori.', en: 'Production behavior and user data are not reverified from the repository snapshot.' },
    ],
  },
  riverlevel: {
    environment: 'Python · CatBoost · XGBoost · PyTorch · Pandas · Kaggle GPU (2× T4)',
    overview: {
      id: 'Keluarga eksperimen peramalan tinggi muka air (TMA) yang mencakup seasonal baselines, residual boosting ensembles, temporal validation, fitur pos dan sungai upstream, serta provenance eksperimen. Orkestrator supermodel memilih satu keluarga model terbaik untuk 30 pos.',
      en: 'A river water-level (TMA) forecasting experiment family covering seasonal baselines, residual boosting ensembles, temporal validation, station and upstream-river features, and experiment provenance. A supermodel orchestrator selects the best model family for each of 30 stations.',
    },
    stats: [
      { value: '30', label: { id: 'pos terdaftar', en: 'registered stations' } },
      { value: '7', label: { id: 'keluarga model', en: 'model families' } },
      { value: '2× T4', label: { id: 'GPU Kaggle', en: 'Kaggle GPUs' } },
    ],
    flow: [
      { name: { id: 'Data pos', en: 'Station data' }, file: { id: 'time series TMA', en: 'TMA time series' }, kind: 'source' },
      { name: { id: 'Fitur', en: 'Features' }, file: { id: 'musiman · upstream', en: 'seasonal · upstream' }, kind: 'prepare' },
      { name: 'Training', file: { id: '7 keluarga model', en: '7 model families' }, kind: 'silver' },
      { name: { id: 'Validasi', en: 'Validation' }, file: 'temporal split', kind: 'silver' },
      { name: 'Registry', file: { id: 'model per pos', en: 'model per station' }, kind: 'gold' },
      { name: 'Bundle', file: 'models · metrics · manifest', kind: 'gold' },
    ],
    contributions: [
      { id: 'Mengembangkan seasonal baselines dan residual boosting ensembles untuk peramalan TMA.', en: 'Developed seasonal baselines and residual boosting ensembles for water-level forecasting.' },
      { id: 'Menerapkan temporal validation, fitur station/upstream river, dan experiment provenance.', en: 'Applied temporal validation, station and upstream-river features, and experiment provenance.' },
      { id: 'Menulis notebook PyTorch untuk training dan inference graph/time-series neural model.', en: 'Wrote PyTorch notebooks for graph/time-series neural model training and inference.' },
      { id: 'Menyusun registry 30 pos dan orkestrator training Kaggle dengan tujuh keluarga model.', en: 'Built a 30-station registry and a Kaggle training orchestrator with seven model families.' },
    ],
    facts: [
      [{ id: 'Repositori', en: 'Repositories' }, { id: '4 publik · keluarga eksperimen', en: '4 public · experiment family' }],
      [{ id: 'Registry', en: 'Registry' }, { id: '30 pos tanpa duplikasi', en: '30 stations without duplicates' }],
      [{ id: 'Keluarga model', en: 'Model families' }, 'v1 · station-aware · v8 · v4 · v3.1 · ensemble-xgboost · catboost_v6'],
      [{ id: 'Training', en: 'Training' }, { id: 'Kaggle · dua GPU T4 · job berurutan', en: 'Kaggle · two T4 GPUs · sequential jobs' }],
      [{ id: 'Artefak', en: 'Artifacts' }, 'models · metrics · data · manifest · submission'],
      [{ id: 'Stack', en: 'Stack' }, 'CatBoost · XGBoost · PyTorch · Pandas'],
    ],
    limits: [
      { id: 'Tidak ada angka akurasi yang diklaim di halaman ini; artefak metrik tidak ditautkan.', en: 'No accuracy numbers are claimed on this page; metric artifacts are not linked.' },
      { id: 'Ini adalah keluarga eksperimen dan pipeline training, bukan sistem peramalan production.', en: 'This is an experiment family and training pipeline, not a production forecasting system.' },
      { id: 'Cakupan data, kepemilikan data TMA, dan performa model di luar snapshot tidak diverifikasi ulang.', en: 'Data coverage, TMA data ownership, and model performance beyond the snapshot are not reverified.' },
    ],
  },
  abm: {
    environment: 'Python · Streamlit · NumPy · Matplotlib · Plotly',
    overview: {
      id: 'Simulasi agent-based untuk ruang tunggu: pengguna merancang tata letak, agen datang dengan distribusi Poisson, lalu bergerak mencari kursi atau keluar. Ray casting memberi agen field of view terhadap obstacle. Kontribusi saya mencakup vision, UI simulasi, dan heatmap paparan.',
      en: 'An agent-based waiting-room simulation: users design a layout, agents arrive with a Poisson process, then move to find a seat or exit. Ray casting gives agents a field of view against obstacles. My contributions covered vision, the simulation UI, and exposure heatmaps.',
    },
    stats: [
      { value: 'Streamlit', label: { id: 'aplikasi web', en: 'web application' } },
      { value: 'Ray casting', label: { id: 'field of view', en: 'field of view' } },
      { value: { id: 'Tim', en: 'Team' }, label: { id: 'repositori', en: 'repository' } },
    ],
    flow: [
      { name: { id: 'Desain ruangan', en: 'Design room' }, file: { id: 'grid · obstacle · kursi', en: 'grid · obstacles · chairs' }, kind: 'source' },
      { name: { id: 'Kedatangan agen', en: 'Agent arrivals' }, file: { id: 'distribusi Poisson', en: 'Poisson distribution' }, kind: 'prepare' },
      { name: 'Vision', file: { id: 'cone + ray casting', en: 'cone + ray casting' }, kind: 'silver' },
      { name: { id: 'Pergerakan', en: 'Movement' }, file: { id: 'cari kursi / keluar', en: 'find a seat / exit' }, kind: 'silver' },
      { name: { id: 'Heatmap paparan', en: 'Exposure heatmap' }, file: { id: 'obstacle teramati', en: 'observed obstacles' }, kind: 'gold' },
    ],
    contributions: [
      { id: 'Berkontribusi pada obstacle-aware vision dan ray casting untuk field of view agen.', en: 'Contributed obstacle-aware vision and ray casting for agent fields of view.' },
      { id: 'Memperbarui UI simulasi, termasuk kontrol dan tampilan state simulasi.', en: 'Updated the simulation UI, including controls and simulation state display.' },
      { id: 'Membuat interactive exposure heatmaps untuk menunjukkan obstacle yang paling sering teramati.', en: 'Built interactive exposure heatmaps showing which obstacles are observed most often.' },
    ],
    facts: [
      [{ id: 'Repositori', en: 'Repository' }, { id: 'publik · tim', en: 'public · team' }],
      [{ id: 'Simulasi', en: 'Simulation' }, { id: 'agent-based ruang tunggu', en: 'agent-based waiting room' }],
      [{ id: 'Kedatangan agen', en: 'Agent arrivals' }, { id: 'distribusi Poisson', en: 'Poisson distribution' }],
      [{ id: 'Vision', en: 'Vision' }, { id: 'cone of vision + ray casting', en: 'cone of vision + ray casting' }],
      [{ id: 'Mode fokus', en: 'Focused mode' }, { id: 'satu agen', en: 'single agent' }],
      [{ id: 'Heatmap', en: 'Heatmap' }, { id: 'paparan obstacle', en: 'obstacle exposure' }],
      [{ id: 'UI', en: 'UI' }, 'Streamlit'],
    ],
    limits: [
      { id: 'Ini adalah simulasi, bukan pengukuran empiris paparan di ruangan nyata.', en: 'This is a simulation, not an empirical measurement of exposure in a real room.' },
      { id: 'Hasil bergantung pada tata letak dan probabilitas yang dikonfigurasi; tidak ada klaim akurasi.', en: 'Results depend on the configured layout and probabilities; no accuracy claim is made.' },
      { id: 'Repositori ini milik tim; halaman ini memuat kontribusi vision, UI, dan heatmap.', en: 'The repository belongs to a team; this page covers vision, UI, and heatmap contributions.' },
    ],
  },
};

function findProjectByDetailApp(appId) {
  return projectSections
    .flatMap((section) => section.projects)
    .find((project) => project.detailApp === appId);
}

function renderDetailViz(detail) {
  const nodes = detail.flow.map((node, index) => `
    ${index ? '<span class="lh-arrow" aria-hidden="true">→</span>' : ''}
    <div class="lh-node lh-node--${escapeHtml(node.kind ?? 'source')}">
      <span class="lh-node__name">${escapeHtml(localized(node.name))}</span>
      <span class="lh-node__file">${escapeHtml(localized(node.file))}</span>
    </div>
  `).join('');
  return `
    <div class="lh">
      <div class="lh-intro">
        <span class="lh-label">${lhLabel({ id: 'Lingkungan', en: 'Environment' })}</span>
        <p class="lh-mono">${escapeHtml(detail.environment)}</p>
        <p class="lh-lede">${escapeHtml(localized(detail.overview))}</p>
      </div>
      <div class="lh-stats">${detail.stats.map((stat) => `
        <div class="lh-stat"><b>${escapeHtml(localized(stat.value))}</b><span>${lhLabel(stat.label)}</span></div>
      `).join('')}</div>
      <section class="lh-block">
        <h3>${lhLabel({ id: 'Alur', en: 'Flow' })}</h3>
        <div class="lh-flow">${nodes}</div>
      </section>
      <section class="lh-block">
        <h3>${lhLabel({ id: 'Kontribusi dan implementasi', en: 'Contributions and implementation' })}</h3>
        <ul class="lh-limits">${detail.contributions.map((item) => `<li>${escapeHtml(localized(item))}</li>`).join('')}</ul>
      </section>
      <section class="lh-block">
        <h3>${lhLabel({ id: 'Fakta kunci', en: 'Key facts' })}</h3>
        <ul class="lh-facts">${detail.facts.map(([label, value]) => `<li><span>${lhLabel(label)}</span><b>${escapeHtml(localized(value))}</b></li>`).join('')}</ul>
      </section>
      <section class="lh-block">
        <h3>${lhLabel({ id: 'Batasan', en: 'Limitations' })}</h3>
        <ul class="lh-limits">${detail.limits.map((item) => `<li>${escapeHtml(localized(item))}</li>`).join('')}</ul>
      </section>
    </div>`;
}

function renderDetailPage(appId) {
  const project = findProjectByDetailApp(appId);
  const detail = projectDetails[appId];
  if (!project || !detail) return '';
  const linksHtml = project.links.length
    ? `<div class="detail-links">${project.links.map((link) => `<a class="inline-link" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ${icon('arrow-up-right')}</a>`).join('')}</div>`
    : '';
  return `
    <section class="content-app lakehouse-app" aria-labelledby="${escapeHtml(appId)}Title">
      <a class="inline-link lakehouse-back" href="/projects" data-open-app="projects">${icon('arrow-left')} <span>${localized({ id: 'Kembali ke proyek', en: 'Back to projects' })}</span></a>
      <div class="content-header content-header--split">
        <div><div class="eyebrow">${localized({ id: 'DETAIL PROYEK', en: 'PROJECT DETAIL' })}</div><h2 id="${escapeHtml(appId)}Title">${escapeHtml(project.title)}</h2></div>
        <p class="content-header__description">${escapeHtml(localized(projectField(project, 'scope')))}</p>
      </div>
      <div class="copy-mode-row">${copyModeToggle()}</div>
      <p class="lakehouse-lead">${escapeHtml(localized(projectField(project, 'description')))}</p>
      ${projectField(project, 'caveat') ? `<p class="lakehouse-caveat"><strong>${localized({ id: 'Cakupan:', en: 'Scope note:' })}</strong> ${escapeHtml(localized(projectField(project, 'caveat')))}</p>` : ''}
      <div class="tag-list">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      ${linksHtml}
      ${technicalBlock(renderDetailViz(detail))}
    </section>`;
}


const highwayData = {
  environment: 'Python 3.10+ · Ultralytics YOLO11n · ByteTrack · OpenCV · Pandas · FastAPI · Kafka · DuckDB · Streamlit',
  hero: {
    eyebrow: { id: 'STUDI KASUS · COMPUTER VISION / DATA ENGINEERING', en: 'CASE STUDY · COMPUTER VISION / DATA ENGINEERING' },
    headline: { id: 'Dari aturan tebakan menjadi aturan yang terukur', en: 'From guessed rules to measured rules' },
    subhead: {
      id: 'Pipeline vision ini memetakan kendaraan CCTV jalan tol ke enam lajur terkalibrasi dan mengirim event ke platform data Kafka, DuckDB, dan Streamlit. Yang berubah: 56 kendaraan dari klip 10 menit dilabeli manual, lalu aturan hogging dirombak — lajur 2 dan 3 diawasi, kendaraan yang mendahului dikecualikan, dan lajur ditentukan lewat voting bbox. F1 aturan naik dari 0,54 ke 0,93.',
      en: 'This vision pipeline maps highway CCTV vehicles to six calibrated lanes and feeds typed events into a Kafka, DuckDB, and Streamlit data platform. The change: 56 vehicles from a 10-minute clip were manually labelled, then the hogging rules were rebuilt — lanes 2 and 3 are monitored, legitimate overtaking is exempted, and lane membership is voted across the bounding box. Rule F1 rose from 0.54 to 0.93.',
    },
    secondary: { id: 'Repositori pipeline vision', en: 'Vision pipeline repository' },
  },
  stats: [
    { value: '56', label: { id: 'kendaraan berlabel manual', en: 'manually labelled vehicles' } },
    { value: '0.93', label: { id: 'F1 aturan setelah tuning', en: 'rule F1 after tuning' } },
    { value: '9 → 5', label: { id: 'false positive', en: 'false positives' } },
    { value: '137', label: { id: 'tes otomatis', en: 'automated tests' } },
  ],
  architecture: {
    label: { id: 'Arsitektur', en: 'Architecture' },
    heading: { id: 'Dua proyek, satu kontrak event', en: 'Two projects, one event contract' },
    paragraphs: [
      {
        id: 'Proyek vision memiliki semua proses sampai file event. Proyek ini mendeteksi dan melacak kendaraan, menetapkan setiap kendaraan ke poligon lajur, lalu menulis event, ringkasan track, laporan, video beranotasi, dan bukti per event.',
        en: 'The vision project owns everything up to the event file. It detects and tracks vehicles, assigns each one to a lane polygon, and writes events, track summaries, reports, an annotated video, and per-event evidence.',
      },
      {
        id: 'Replay sender kemudian mengirim hasil tersebut ke webhook dengan autentikasi token dalam urutan timestamp, seperti kamera langsung tetapi lebih cepat. Platform data memiliki semua proses setelahnya: FastAPI receiver, topik Kafka dengan key kamera, validasi dan deduplikasi, model medallion DuckDB dan Parquet, serta dashboard.',
        en: 'A replay sender then posts those results to a token-authenticated webhook in timestamp order, the way a live camera would, but faster. The data platform owns everything after that: FastAPI receiver, Kafka topics keyed by camera, validation and de-duplication, a DuckDB and Parquet medallion model, and the dashboard.',
      },
      {
        id: 'Batas ini disengaja. Repositori vision hanya mengirim. Tidak ada Kafka client, database, atau dashboard di dalamnya.',
        en: 'The boundary is deliberate. The vision repo only sends. It has no Kafka client, no database, and no dashboard.',
      },
    ],
    note: {
      id: 'Replay bukan inferensi langsung. Replay mereproduksi timing feed langsung dari hasil yang sudah dihitung agar sistem downstream dapat diuji end to end. Timestamp event tetap memakai waktu event asli.',
      en: 'Replay is not live inference. It reproduces the timing of a live feed from precomputed results so the downstream system can be exercised end to end. Event timestamps stay in original event time.',
    },
    visionLabel: { id: 'Proyek vision', en: 'Vision project' },
    visionTag: { id: 'Python · CPU-first', en: 'Python · CPU-first' },
    platformLabel: { id: 'Platform data', en: 'Data platform' },
    platformTag: { id: 'FastAPI · Kafka · DuckDB', en: 'FastAPI · Kafka · DuckDB' },
    bridge: {
      id: 'events.jsonl → webhook replay → platform data',
      en: 'events.jsonl → webhook replay → data platform',
    },
    also: { id: 'Juga dihasilkan:', en: 'Also emitted:' },
    alsoItems: [
      { id: 'MP4 beranotasi', en: 'Annotated MP4' },
      { id: 'Evidence cutter · snapshot + klip 8 dtk', en: 'Evidence cutter · snapshot + 8 s clip' },
      { id: 'Laporan JSON · CSV · MD', en: 'Reports JSON · CSV · MD' },
      { id: 'Tuning report · proxy + replay', en: 'Tuning report · proxy + replay' },
      { id: 'Label manual · 56 kendaraan', en: 'Manual labels · 56 vehicles' },
    ],
  },
  lane: {
    label: { id: 'Geometri lajur', en: 'Lane geometry' },
    heading: { id: 'Enam lajur dari satu kamera di median', en: 'Six lanes from one median-mounted camera' },
    paragraphs: [
      {
        id: 'Penetapan lajur memakai poligon ternormalisasi, sehingga profil yang sama bekerja pada resolusi apa pun. Masing-masing dari enam lajur adalah poligon yang digambar sekali pada frame referensi 1434×1076 lalu dibagi dengan lebar dan tinggi frame tersebut.',
        en: 'Lane assignment uses normalized polygons, so the same profile works at any resolution. Each of the six lanes is a polygon drawn once against a 1434×1076 reference frame and divided by that frame\'s width and height.',
      },
      {
        id: 'Tepi atas peta lajur berada di `y = 400` piksel referensi, tempat marka lajur bertemu. Batas northbound berakhir di x = 621, 647, 671, dan 697; batas southbound berakhir di x = 803, 774, 743, dan 715. Lajur 3 adalah lajur sisi median pada kedua arah dan berperan sebagai lajur pendahulu. Aturan hasil tuning mengawasi lajur 2 dan 3, lalu mengecualikan kendaraan yang benar-benar sedang mendahului.',
        en: 'The top edge of the lane map sits at `y = 400` in reference pixels, where the painted lane markings converge. Northbound boundaries end at x = 621, 647, 671, and 697; southbound boundaries end at x = 803, 774, 743, and 715. Lane 3 is the median-side overtaking lane in both directions. The tuned rules monitor lanes 2 and 3, then exempt vehicles that are genuinely passing.',
      },
      {
        id: 'Kalibrasi adalah skrip, bukan edit manual. Skrip merender gambar overlay, menghasilkan YAML ternormalisasi, dan konfigurasi diuji terhadap output tersebut, sehingga perubahan lajur tidak dapat diam-diam menyimpang dari gambar.',
        en: 'Calibration is a script, not a manual edit. It renders an overlay image, emits the normalized YAML, and the config is asserted against that output, so a lane edit cannot silently drift from the picture.',
      },
    ],
    facts: [
      [{ id: 'Frame referensi', en: 'Reference frame' }, '1434 × 1076'],
      [{ id: 'Tepi atas peta', en: 'Map top edge' }, 'y = 400 px'],
      [{ id: 'Batas northbound', en: 'Northbound boundaries' }, 'x = 621 · 647 · 671 · 697'],
      [{ id: 'Batas southbound', en: 'Southbound boundaries' }, 'x = 803 · 774 · 743 · 715'],
      [{ id: 'Lajur diawasi', en: 'Monitored lanes' }, { id: 'lajur 2 & 3 · kedua arah', en: 'lanes 2 & 3 · both directions' }],
    ],
    mappingCaption: {
      id: 'Enam poligon lajur terkalibrasi pada frame referensi 1434×1076. Lajur 3 adalah lajur pendahulu di sisi median; aturan hasil tuning mengawasi lajur 2 dan 3.',
      en: 'The six calibrated lane polygons, drawn on the 1434×1076 reference frame. Lane 3 is the median-side overtaking lane; the tuned rules monitor lanes 2 and 3.',
    },
    mappingAlt: {
      id: 'Frame kamera jalan tol dengan enam poligon lajur berwarna, tiga northbound di kiri dan tiga southbound di kanan, bertemu ke arah horizon.',
      en: 'Highway camera frame with six coloured lane polygons, three northbound on the left and three southbound on the right, converging toward the horizon.',
    },
    previewCaption: {
      id: 'Poligon yang sama dirender di atas frame aktual 1024×768 dari kamera, menunjukkan bahwa koordinat ternormalisasi tetap bekerja setelah perubahan resolusi.',
      en: 'The same polygons rendered over an actual 1024×768 frame from the camera, showing that normalized coordinates survive the resolution change.',
    },
    previewAlt: {
      id: 'Frame jalan tol siang hari dengan enam overlay lajur dan label lajur.',
      en: 'Daytime toll-road frame with six lane overlays and lane labels.',
    },
  },
  anchor: {
    label: { id: 'Penentuan lajur', en: 'Lane assignment' },
    heading: { id: 'Mengapa satu titik adalah uji lajur yang salah', en: 'Why a single point is the wrong lane test' },
    paragraphs: [
      {
        id: 'Truk yang dekat kamera memiliki box besar. Titik tengah bawahnya dapat berada di atas garis lajur atau bahkan di lajur berikutnya, sementara rodanya jelas berada di satu lajur. Memakai satu titik menghasilkan lajur yang berkedip tepat di area yang paling andal: near field.',
        en: 'A truck close to the camera has a large box. Its bottom-centre point can sit over the lane line or even in the next lane, while its wheels are clearly in one lane. Using a single point produces lane flapping exactly where the scene is most reliable: the near field.',
      },
      {
        id: 'Perbaikannya adalah `bbox_vote`: lima titik di sepanjang bottom edge bbox (10%–90% lebar) dipetakan ke poligon lajur, lalu lajur dengan suara terbanyak dipakai. Voting dibatasi ke lajur dengan arah perjalanan yang sama. Kalau tidak ada lajur yang mencapai 50% suara, tracker kembali ke titik bottom-centre.',
        en: 'The fix is `bbox_vote`: five points along the bottom edge of the box (10%–90% of its width) are mapped to lane polygons, and the majority lane wins. Voting is restricted to lanes with the same travel direction. If no lane reaches 50% agreement, the tracker falls back to the bottom-centre point.',
      },
      {
        id: 'Pada replay 49 kendaraan yang berhasil dipetakan, perubahan ini menaikkan kecocokan lajur dari 98,0% menjadi 100% dan memperbaiki kasus truk near-field yang sebelumnya jatuh ke lajur sebelah. Penentuan kelas juga ikut diperbaiki: kelas kendaraan dipilih lewat vote berbobot confidence sepanjang track, bukan frame terakhir.',
        en: 'On the 49 mapped vehicles in the replay, this raised lane agreement from 98.0% to 100% and fixed the wide near-field truck case that previously landed in the neighbouring lane. Vehicle class evolved too: class is now a confidence-weighted vote over the whole track, not the latest frame.',
      },
    ],
    small: { id: 'Satu titik bisa jatuh di garis lajur.', en: 'A single point can fall on the lane line.' },
    wide: { id: 'Lima titik di bottom edge, majority vote.', en: 'Five bottom-edge points, majority vote.' },
    note: {
      id: 'Voting dibatasi arah perjalanan; jika tidak ada lajur mencapai 50% suara, tracker kembali ke bottom-centre.',
      en: 'Voting is restricted to travel direction; if no lane reaches 50% agreement, the tracker falls back to bottom-centre.',
    },
  },
  events: {
    label: { id: 'Event dan aturan', en: 'Events and rules' },
    heading: { id: 'Model event kecil dan bertipe', en: 'A small, typed event model' },
    intro: {
      id: 'Setiap event membawa `event_id`, `camera_id`, `track_id`, `object_class`, `lane_name`, `timestamp`, `video_time_s`, `frame_index`, `severity`, dan `rule_name` bila relevan. Lane change dihasilkan sebagai triplet berurutan: exit, change, enter, pada frame yang sama. Indikasi hogging dievaluasi saat lane stint berakhir (`evaluate_at: stint`), sehingga seluruh proses mendahului terlihat sebelum keputusan diambil dan `dwell_seconds` adalah durasi akhir stint.',
      en: 'Every event carries `event_id`, `camera_id`, `track_id`, `object_class`, `lane_name`, `timestamp`, `video_time_s`, `frame_index`, `severity`, and `rule_name` where relevant. A lane change is emitted as an ordered triplet: exit, change, enter, on the same frame. Hogging is evaluated when the lane stint ends (`evaluate_at: stint`), so the whole pass is visible before a decision and `dwell_seconds` is the final stint dwell.',
    },
    eventCaption: { id: 'Empat tipe event inti.', en: 'Four core event types.' },
    eventHead: [{ id: 'Event', en: 'Event' }, { id: 'Kapan aktif', en: 'When it fires' }, { id: 'Field tambahan', en: 'Extra fields' }],
    eventRows: [
      ['`lane_enter`', { id: 'Track dikonfirmasi berada di dalam lajur', en: 'A track is confirmed inside a lane' }, 'lane, timestamp'],
      ['`lane_exit`', { id: 'Track meninggalkan lajur selama jumlah frame yang disyaratkan', en: 'A track leaves the lane for the required frames' }, 'lane, dwell'],
      ['`lane_change`', { id: 'Exit dan enter mengarah ke lajur berbeda', en: 'Exit and enter resolve to different lanes' }, { id: 'from/to lane', en: 'from/to lane' }],
      ['`lane_hogging_indication`', { id: 'Stint berakhir dan track cocok dengan aturan', en: 'The stint ends and the track matches a rule' }, { id: 'severity, rule, dwell', en: 'severity, rule, dwell' }],
    ],
    ruleCaption: { id: 'Dua aturan setelah tuning; lajur 1 tidak pernah ditandai.', en: 'Two rules after tuning; lane 1 is never flagged.' },
    ruleHead: [{ id: 'Aturan', en: 'Rule' }, { id: 'Berlaku untuk', en: 'Applies to' }, { id: 'Kondisi', en: 'Condition' }, { id: 'Severity', en: 'Severity' }],
    ruleRows: [
      ['`heavy_cruising_lane_2_3`', { id: 'truck, bus', en: 'truck, bus' }, { id: '≥ 0,4 dtk di lajur 2 atau 3, tanpa sedang mendahului', en: '≥ 0.4 s in lane 2 or 3, not actively overtaking' }, 'high'],
      ['`car_cruising_lane_3`', { id: 'car', en: 'car' }, { id: '≥ 0,4 dtk di lajur 3, tanpa sedang mendahului', en: '≥ 0.4 s in lane 3, not actively overtaking' }, 'medium'],
    ],
    outro: {
      id: 'Aturan adalah konfigurasi, bukan kode. Kendaraan dikecualikan apabila di lajur sebelah dalam ada kendaraan yang lebih lambat di depan dalam jarak 10% tinggi frame (atau baru saja terlewati, sampai 2,5% di belakang). Satu keberhasilan mendahului membebaskan sisa lane stint. Kendaraan yang tidak cocok tetap dilacak dan dilaporkan sebagai penggunaan yang diizinkan — pemisahan antara "observed" dan "flagged".',
      en: 'Rules are configuration, not code. A vehicle is exempt when a slower vehicle in the adjacent inner lane is ahead within 10% of the frame height (or was just passed, up to 2.5% behind). One confirmed pass exempts the rest of that lane stint. Vehicles that do not match are still tracked and reported as allowed usage — the split between "observed" and "flagged".',
    },
  },
  tuning: {
    label: { id: 'Ground truth', en: 'Ground truth' },
    heading: { id: '56 kendaraan berlabel, aturan diukur ulang', en: '56 labelled vehicles, rules re-measured' },
    paragraphs: [
      {
        id: 'Aturan lama hanya menandai lajur 3 berdasarkan dwell time. Setelah 56 kendaraan dari klip 10 menit KM 58+400 direview manual — 43 hogger dan 13 bukan — kedua jenis kesalahan terlihat: mobil yang sedang mendahului ikut ditandai, sementara truk dan bus yang cruising di lajur 2 lolos.',
        en: 'The old rule flagged only lane 3 using dwell time. After 56 vehicles from a 10-minute KM 58+400 clip were manually reviewed — 43 hoggers and 13 non-hoggers — both failure modes were visible: passing cars were flagged, while trucks and buses cruising in lane 2 slipped through.',
      },
      {
        id: 'Aturan dirombak: lajur 2 dan 3 diawasi, kendaraan yang mendahului dikecualikan berdasarkan posisi dan kecepatan relatif, lajur ditentukan lewat voting bbox, dan keputusan diambil saat lane stint berakhir. Tuning memakai CLI dengan dua mode evaluasi — proxy lane-stint pada 56 label dan replay bbox per frame pada 49 kendaraan yang berhasil dipetakan — plus grid search dan laporan Markdown/CSV/JSON.',
        en: 'The rule set was rebuilt: lanes 2 and 3 are monitored, overtaking is exempted using relative position and speed, lane membership is voted across the bounding box, and the decision is made when the lane stint ends. Tuning uses a CLI with two evaluation modes — a lane-stint proxy over 56 labels and a per-frame bbox replay over 49 mapped vehicles — plus grid search and Markdown/CSV/JSON reports.',
      },
    ],
    proxyCaption: {
      id: 'Confusion matrix — 56 kendaraan berlabel, evaluasi proxy lane-stint.',
      en: 'Confusion matrix — 56 labelled vehicles, lane-stint proxy evaluation.',
    },
    proxyHead: [{ id: 'Konfigurasi', en: 'Configuration' }, 'TP', 'FP', 'FN', 'TN', { id: 'Precision', en: 'Precision' }, { id: 'Recall', en: 'Recall' }, 'F1'],
    proxyRows: [
      [{ id: 'Sebelum · lajur 3, live, tanpa overtake', en: 'Before · lane 3, live, no overtake' }, '19', '9', '24', '4', '0.679', '0.442', '0.535'],
      [{ id: 'Sesudah · lajur 2+3, overtake exemption, stint', en: 'After · lanes 2+3, overtake exemption, stint' }, '42', '5', '1', '8', '0.894', '0.977', '0.933'],
    ],
    replayCaption: {
      id: 'Replay bbox per frame — 49 dari 56 kendaraan berhasil dipetakan lewat time + lane.',
      en: 'Per-frame bbox replay — 49 of 56 vehicles were mapped by time + lane.',
    },
    replayRows: [
      [{ id: 'Sebelum · rule lama di-replay', en: 'Before · old rule replayed' }, '17', '9', '19', '4', '0.654', '0.472', '0.548'],
      [{ id: 'Sesudah · rule tuned di-replay', en: 'After · tuned rule replayed' }, '35', '6', '1', '7', '0.854', '0.972', '0.909'],
    ],
    facts: [
      [{ id: 'Kecocokan lajur', en: 'Lane agreement' }, { id: '98,0% → 100%', en: '98.0% → 100%' }],
      [{ id: 'Akurasi kelas', en: 'Class accuracy' }, { id: '85,7%', en: '85.7%' }],
      [{ id: 'Klip evaluasi', en: 'Evaluation clip' }, { id: '10 menit · 10.786 frame', en: '10 minutes · 10,786 frames' }],
      [{ id: 'Tes otomatis', en: 'Automated tests' }, '137'],
    ],
    note: {
      id: 'F1 ini berlaku pada kendaraan yang direview, bukan seluruh lalu lintas. Kelas kendaraan masih 85,7%; karena lajur 2 hanya menandai truk/bus, satu truk yang terbaca mobil bisa lolos. Label bersifat level kendaraan, bukan bounding box, sehingga tidak dipakai untuk fine-tune YOLO.',
      en: 'This F1 applies to the reviewed vehicles, not all traffic. Class accuracy is still 85.7%; because lane 2 only flags trucks and buses, a truck read as a car can slip through. Labels are vehicle-level, not bounding boxes, so they are not used to fine-tune YOLO.',
    },
    artifact: { id: 'Commit c33c17b · tuning CLI, label, dan laporan', en: 'Commit c33c17b · tuning CLI, labels, and reports' },
    artifactHref: 'https://github.com/ibrahim119920/highway-lane-analytics/commit/c33c17b',
  },
  evidence: {
    label: { id: 'Bukti per event', en: 'Evidence per event' },
    heading: { id: 'Setiap flag disertai snapshot dan klip delapan detik', en: 'Every flag comes with a snapshot and an eight-second clip' },
    paragraphs: [
      {
        id: 'Timestamp bukan bukti. Untuk setiap event, pipeline memotong JPEG pada frame event dan MP4 delapan detik yang berpusat pada frame tersebut, empat detik sebelum dan empat detik sesudah.',
        en: 'A timestamp is not evidence. For each event the pipeline cuts a JPEG at the event frame and an eight-second MP4 centred on it, four seconds before and four after.',
      },
      {
        id: 'Media dipotong dari video beranotasi, bukan sumber mentah, sehingga klip sudah menampilkan bounding box, track ID, label lajur, dwell time, dan badge hogging. Operator tidak perlu merekonstruksi konteks.',
        en: 'The media is cut from the annotated video, not the raw source, so the clip already shows the bounding box, track ID, lane label, dwell time, and hogging badge. An operator does not have to reconstruct context.',
      },
      {
        id: 'Event yang berbagi frame — triplet exit, change, enter — berbagi satu snapshot dan satu klip. Pada run 55 detik, ini mengubah 20 event menjadi 18 file unik alih-alih 20 duplikat, dengan total 38,8 MB. Encoding memakai ffmpeg bila tersedia dan fallback ke OpenCV.',
        en: 'Events that share a frame — the exit, change, enter triplet — share one snapshot and one clip. On a 55-second run that turned 20 events into 18 unique files instead of 20 duplicates, for 38.8 MB total. Encoding uses ffmpeg when available and falls back to OpenCV.',
      },
    ],
    imageCaption: {
      id: 'Snapshot hogging dari klip malam: mobil di `nb_lane_3`, ditandai `! HOGGING medium`, dengan dwell time dan anchor point terlihat. Snapshot ini berasal dari run sebelum tuning, saat aturan masih berbasis lajur pendahulu saja.',
      en: 'A hogging snapshot from the night clip: a car in `nb_lane_3`, flagged `! HOGGING medium`, with its dwell time and anchor point visible. This snapshot comes from a pre-tuning run, when the rule still watched only the overtaking lane.',
    },
    imageAlt: {
      id: 'Frame malam beranotasi dengan box merah di sekitar mobil, label lajur nb_lane_3, dan badge peringatan hogging.',
      en: 'Annotated night-time frame with a red box around a car, the lane label nb_lane_3, and a hogging warning badge.',
    },
    videoCaption: {
      id: 'Klip delapan detik yang cocok. Event yang sama, dengan konteks gerak sebelum dan sesudah flag.',
      en: 'The matching eight-second clip. Same event, with motion context before and after the flag.',
    },
    videoAlt: {
      id: 'Slot video: klip bukti delapan detik untuk event hogging.',
      en: 'Video slot: the eight-second evidence clip for the hogging event.',
    },
    videoLabel: { id: 'Video menyusul', en: 'Video pending' },
  },
  platform: {
    label: { id: 'Platform data dan dashboard', en: 'Data platform and dashboard' },
    heading: { id: 'Dari webhook ke dashboard', en: 'From webhook to dashboard' },
    paragraphs: [
      {
        id: 'Receiver menerima batch berisi satu sampai dua ribu event di balik bearer token, memvalidasi payload, menduplikasi berdasarkan `event_id`, dan memublikasikan ke Kafka. Tiga topik — events, tracks, runs — dipartisi berdasarkan `camera_id` dengan retensi tujuh hari.',
        en: 'The receiver accepts batches of one to two thousand events behind a bearer token, validates the payload, de-duplicates by `event_id`, and publishes to Kafka. Three topics — events, tracks, runs — are partitioned by `camera_id` with seven-day retention.',
      },
      {
        id: 'Consumer group memvalidasi setiap record, mengarantina record buruk alih-alih crash, dan menulis record mentah ke lapisan bronze sebelum menormalisasinya menjadi tabel fakta silver untuk runs, events, tracks, dan lane stints. Tabel gold mengagregasi penggunaan lajur, komposisi kelas, hogging per aturan dan severity, transisi lajur, dan kualitas data per run.',
        en: 'A consumer group validates each record, quarantines bad ones instead of crashing, and writes raw records to a bronze layer before normalizing them into silver fact tables for runs, events, tracks, and lane stints. Gold tables aggregate lane usage, class mix, hogging by rule and severity, lane transitions, and per-run data quality.',
      },
      {
        id: 'Dashboard membaca Parquet hasil ekspor melalui koneksi DuckDB in-memory, sehingga tidak pernah bersaing dengan consumer untuk write lock pada database live.',
        en: 'The dashboard reads exported Parquet through an in-memory DuckDB connection, so it never competes with the consumer for the write lock on the live database.',
      },
      {
        id: 'Angka pada halaman ini berasal dari satu sesi replay, `live_20261110_214853`: 10 dari 10 jendela selesai, 650 event, 603 kendaraan terlihat, 270 lane entry, 23 lane change, dan 87 indikasi hogging. Dashboard menampilkan data tersebut lewat filter sesi, run, dan rentang tanggal.',
        en: 'The numbers on this page come from one replay session, `live_20261110_214853`: 10 of 10 windows complete, 650 events, 603 vehicles seen, 270 lane entries, 23 lane changes, and 87 hogging indications. The dashboard exposes that data through session, run, and date-range filters.',
      },
    ],
    pagesCaption: { id: 'Empat halaman dashboard.', en: 'Four dashboard pages.' },
    pagesHead: [{ id: 'Halaman', en: 'Page' }, { id: 'Pertanyaan yang dijawab', en: 'What it answers' }],
    pagesRows: [
      [{ id: 'Overview', en: 'Overview' }, { id: 'Berapa kendaraan, lane change, dan sinyal hogging? Seberapa segar datanya?', en: 'How many vehicles, lane changes, and hogging signals? How fresh is the data?' }],
      [{ id: 'Lane usage', en: 'Lane usage' }, { id: 'Lajur mana yang membawa kendaraan apa, dan di mana kendaraan paling lama berada?', en: 'Which lanes carry which vehicles, and where do vehicles stay longest?' }],
      [{ id: 'Hogging signals', en: 'Hogging signals' }, { id: 'Event mana yang cocok dengan aturan, menurut level dan rule, dengan baris yang dapat diunduh?', en: 'Which events matched a rule, by level and rule, with downloadable rows?' }],
      [{ id: 'Data quality', en: 'Data quality' }, { id: 'Run mana yang menghasilkan data ini, dan apakah data lengkap serta bebas duplikat?', en: 'Which run produced this data, and is it complete and free of duplicates?' }],
    ],
    snapshot: {
      caption: { id: 'Cuplikan sesi `live_20261110_214853` — 10 dari 10 jendela selesai.', en: 'Session snapshot `live_20261110_214853` — 10 of 10 windows complete.' },
      head: [{ id: 'Metrik', en: 'Metric' }, { id: 'Nilai', en: 'Value' }],
      rows: [
        [{ id: 'Jendela terlihat / diharapkan', en: 'Windows seen / expected' }, '10 / 10'],
        [{ id: 'Event', en: 'Events' }, '650'],
        [{ id: 'Kendaraan terlihat', en: 'Vehicles seen' }, '603'],
        [{ id: 'Lane entry', en: 'Lane entries' }, '270'],
        [{ id: 'Lane change', en: 'Lane changes' }, '23'],
        [{ id: 'Indikasi hogging', en: 'Hogging signals' }, { id: '87 · 2 aturan · 4 lajur', en: '87 · 2 rules · 4 lanes' }],
        [{ id: 'Hogging per 1.000 lane entry', en: 'Hogging per 1,000 lane entries' }, '322.22'],
        [{ id: 'Rata-rata waktu di lajur pendahulu', en: 'Average passing-lane time' }, '2.02 s'],
        [{ id: 'Pemeriksaan kualitas', en: 'Data checks' }, { id: '13 / 13 lolos · 0 baris karantina', en: '13 / 13 passed · 0 quarantined rows' }],
      ],
      freshness: [
        [{ id: 'Batch terakhir (WIB)', en: 'Latest batch (WIB)' }, '10 Nov 21:52:55'],
        [{ id: 'Rata-rata delay data', en: 'Average data delay' }, '6 min'],
        [{ id: 'Delay terpanjang', en: 'Longest data delay' }, '9 min'],
        [{ id: 'Usia data saat diambil', en: 'Data age at capture' }, '3 min'],
      ],
      note: {
        id: 'Semua angka berasal dari satu sesi replay, bukan ingestion kamera langsung. Indikasi hogging tetap merupakan kecocokan aturan, bukan penentuan pelanggaran.',
        en: 'Every figure comes from one replay session, not live camera ingestion. A hogging indication remains a rule match, not a legal determination.',
      },
    },
    overviewCaption: {
      id: 'Overview: filter sesi, masthead jalan tol, delapan kartu ringkasan kendaraan, lane entry, lane change, dan indikasi hogging, plus catatan cara membaca angka.',
      en: 'Overview: session filters, a highway masthead, eight summary cards for vehicles, lane entries, lane changes, and hogging signals, plus a note on how to read the numbers.',
    },
    overviewAlt: {
      id: 'Dashboard gelap dengan masthead jalan tol dan kartu ringkasan: 603 kendaraan terlihat, 245 kendaraan per jendela, 245 masuk lajur, 23 lane change, 87 sinyal hogging, 355,10 hogging per 1.000 lane entry, dan 2,02 detik rata-rata waktu di lajur pendahulu.',
      en: 'Dark dashboard with a highway masthead and summary cards: 603 vehicles seen, 245 vehicles per window, 245 entered a lane, 23 lane changes, 87 hogging signals, 355.10 hogging per 1,000 lane entries, and a 2.02 s average passing-lane time.',
    },
    laneCaption: {
      id: 'Lane usage: heatmap kunjungan lajur per jam, box plot waktu di lajur menurut kelas kendaraan, dan matriks lane change dari → ke.',
      en: 'Lane usage: a lane-visit heatmap by hour, time-in-lane box plots by vehicle class, and a lane-change from → to matrix.',
    },
    laneAlt: {
      id: 'Halaman lane usage dengan heatmap kunjungan lajur per jam, box plot waktu di lajur untuk truk, mobil, dan bus, serta matriks lane change antar lajur.',
      en: 'Lane usage page with a lane-visit heatmap by hour, time-in-lane box plots for truck, car, and bus, and a lane-change matrix between lanes.',
    },
    hoggingCaption: {
      id: 'Hogging signals: 87 sinyal pada 4 lajur dan 2 aturan, dengan rata-rata 2,25 detik di lajur. Event log menampilkan track, kelas, lajur, dwell, level, rule, confidence, dan ketersediaan klip.',
      en: 'Hogging signals: 87 signals across 4 lanes and 2 rules, averaging 2.25 s in lane. The event log shows track, class, lane, dwell, level, rule, confidence, and clip availability.',
    },
    hoggingAlt: {
      id: 'Halaman hogging signals dengan kartu 87 total sinyal, 4 lajur terlibat, 2 aturan terpicu, 2,25 detik rata-rata waktu di lajur, dan tabel event log berisi track, kelas kendaraan, lajur, dwell, level, rule, confidence, serta klip.',
      en: 'Hogging signals page with cards for 87 total signals, 4 lanes involved, 2 rules triggered, and a 2.25 s average time in lane, plus an event log with track, vehicle class, lane, dwell, level, rule, confidence, and clip.',
    },
    qualityCaption: {
      id: 'Data quality: 13 dari 13 pemeriksaan lolos, 0 baris perlu perhatian, dan 0 baris karantina. Lane entry vs exit cocok (Δ0) di setiap jendela sesi.',
      en: 'Data quality: 13 of 13 checks passed, 0 rows need attention, and 0 quarantined rows. Lane entries vs exits reconcile (Δ0) in every window of the session.',
    },
    qualityAlt: {
      id: 'Halaman data quality dengan 13/13 pemeriksaan lolos, 0 perlu perhatian, 0 baris karantina, dan daftar pemeriksaan termasuk duplicate event ID, event di luar jendela run, lane entry vs exit per jendela, serta baris karantina.',
      en: 'Data quality page with 13/13 checks passed, 0 needing attention, 0 quarantined rows, and a check list covering duplicate event IDs, events outside the run window, lane entries vs exits per window, and quarantined rows.',
    },
  },
  results: {
    label: { id: 'Hasil operasional', en: 'Operational results' },
    heading: { id: 'Throughput dan cakupan evaluasi', en: 'Throughput and evaluation coverage' },
    paragraphs: [
      {
        id: 'Pada klip 10 menit beresolusi 1024×768, replay CPU memproses 10.786 frame dalam 17 menit 44 detik (±10,1 fps) dan menghasilkan 323 track. Sebanyak 56 kendaraan direview manual untuk tuning; 49 di antaranya berhasil dipetakan untuk replay bbox per frame.',
        en: 'On the 10-minute 1024×768 clip, a CPU replay processed 10,786 frames in 17 minutes 44 seconds (~10.1 fps) and produced 323 tracks. 56 vehicles were manually reviewed for tuning; 49 of them were mapped for per-frame bbox replay.',
      },
      {
        id: 'Hasil evaluasinya: F1 aturan naik dari 0,535 ke 0,933 pada proxy 56 label dan dari 0,548 ke 0,909 pada replay 49 kendaraan. False positive turun 9 ke 5, hogger yang lolos turun 24 ke 1, dan kecocokan lajur naik dari 98,0% ke 100%.',
        en: 'The evaluation: rule F1 rose from 0.535 to 0.933 on the 56-label proxy and from 0.548 to 0.909 on the 49-vehicle replay. False positives fell from 9 to 5, missed hoggers fell from 24 to 1, and lane agreement rose from 98.0% to 100%.',
      },
    ],
    caption: { id: 'Cakupan run evaluasi 10 menit.', en: 'Coverage of the 10-minute evaluation run.' },
    head: [{ id: 'Metrik', en: 'Metric' }, { id: 'Nilai', en: 'Value' }],
    rows: [
      [{ id: 'Frame diproses', en: 'Frames processed' }, '10.786'],
      [{ id: 'Kendaraan dilacak', en: 'Vehicles tracked' }, '323'],
      [{ id: 'Kendaraan direview manual', en: 'Vehicles manually reviewed' }, { id: '56 · 43 hogger, 13 bukan', en: '56 · 43 hoggers, 13 non-hoggers' }],
      [{ id: 'Dipetakan untuk replay', en: 'Mapped for replay' }, '49'],
      [{ id: 'Waktu proses CPU', en: 'CPU runtime' }, { id: '17 mnt 44 dtk', en: '17 min 44 s' }],
      [{ id: 'Throughput', en: 'Throughput' }, { id: '±10,1 fps', en: '~10.1 fps' }],
      [{ id: 'Tes otomatis', en: 'Automated tests' }, '137'],
    ],
    caveat: {
      id: 'Ini evaluasi satu kamera dan satu klip, bukan benchmark populasi. Label bersifat level kendaraan, bukan bounding box; akurasi kelas 85,7%; dan replay bukan inferensi langsung. Angka F1 hanya berlaku pada kendaraan yang direview.',
      en: 'This is a single-camera, single-clip evaluation, not a population benchmark. Labels are vehicle-level, not bounding boxes; class accuracy is 85.7%; and replay is not live inference. The F1 numbers apply only to the reviewed vehicles.',
    },
    frameCaption: {
      id: 'Output beranotasi dari run awal: bus di `sb_lane_2`, dengan box, track ID, kelas, lajur, dwell time, dan poligon lajur tetap di scene.',
      en: 'Annotated output from an earlier run: a bus in `sb_lane_2`, with boxes, track IDs, class, current lane, dwell time, and lane polygons fixed in the scene.',
    },
    frameAlt: {
      id: 'Frame siang beranotasi dengan bus di dalam box oranye, label lajur, dan HUD lane occupancy.',
      en: 'Daytime annotated frame with a bus inside an orange box, lane labels, and the lane-occupancy HUD.',
    },
    videoCaption: {
      id: 'Output beranotasi: box, track ID, kelas, lajur saat ini, dwell time, dan status hogging, dengan poligon lajur tetap di scene.',
      en: 'Annotated output: boxes, track IDs, class, current lane, dwell time, and hogging status, with lane polygons fixed in the scene.',
    },
    videoAlt: {
      id: 'Slot video: output beranotasi 20–30 detik dari footage jalan tol malam.',
      en: 'Video slot: a 20–30 second annotated output from night-time highway footage.',
    },
    videoLabel: { id: 'Video menyusul', en: 'Video pending' },
  },
  decisions: {
    label: { id: 'Keputusan engineering', en: 'Engineering decisions' },
    heading: { id: 'Keputusan dan tantangan', en: 'Decisions and challenges' },
    caption: { id: 'Masalah, keputusan, dan hasilnya.', en: 'Problem, decision, and result.' },
    head: [{ id: 'Masalah', en: 'Problem' }, { id: 'Keputusan', en: 'Decision' }, { id: 'Hasil', en: 'Result' }],
    rows: [
      [{ id: 'Aturan lama hanya melihat lajur 3 dan dwell time', en: 'The old rule watched only lane 3 and dwell time' }, { id: 'Label 56 kendaraan, awasi lajur 2+3, tambahkan overtake exemption', en: 'Label 56 vehicles, monitor lanes 2+3, add overtake exemption' }, { id: 'F1 0,54→0,93; false positive 9→5; hogger lolos 24→1', en: 'F1 0.54→0.93; false positives 9→5; missed hoggers 24→1' }],
      [{ id: 'Satu titik lajur jatuh di garis pada box near-field lebar', en: 'A single lane point falls on the line for wide near-field boxes' }, { id: '`bbox_vote`: lima titik di bottom edge, majority vote dibatasi arah', en: '`bbox_vote`: five bottom-edge points, direction-restricted majority vote' }, { id: 'Kecocokan lajur 98,0%→100% pada 49 kendaraan', en: 'Lane agreement 98.0%→100% on 49 vehicles' }],
      [{ id: 'Flag keluar sebelum proses mendahului selesai', en: 'A flag fired before the pass finished' }, { id: 'Evaluasi saat lane stint berakhir (`evaluate_at: stint`)', en: 'Evaluate at lane exit (`evaluate_at: stint`)' }, { id: 'Seluruh manuver terlihat; dwell = durasi akhir stint', en: 'Whole manoeuvre visible; dwell = final stint duration' }],
      [{ id: 'Tidak ada cara mengukur kualitas aturan secara reproduksibel', en: 'No repeatable way to measure rule quality' }, { id: 'CLI tuning dengan proxy lane-stint, replay per frame, grid search, dan laporan', en: 'Tuning CLI with lane-stint proxy, per-frame replay, grid search, and reports' }, { id: 'Dua confusion matrix; tercakup 137 tes', en: 'Two confusion matrices; covered by 137 tests' }],
      [{ id: 'Kedipan batas menciptakan lane change palsu', en: 'Boundary flicker creates fake lane changes' }, { id: 'Hysteresis frame sebelum lane change dikonfirmasi', en: 'Frame hysteresis before a lane change is confirmed' }, { id: 'Lane change hanya terbit saat perpindahan stabil', en: 'Lane changes are emitted only when the move is stable' }],
      [{ id: 'Footage malam menghasilkan skor rendah', en: 'Night footage scores low' }, { id: '`conf 0.30`, `imgsz 960`, kelas dibatasi ke car, bus, truck', en: '`conf 0.30`, `imgsz 960`, classes limited to car, bus, truck' }, { id: 'Recall yang dapat dipakai tanpa noise motor', en: 'Usable recall without motorcycles adding noise' }],
      [{ id: 'Demo langsung membutuhkan feed langsung', en: 'A live demo needs a live feed' }, { id: 'Batch dulu, lalu replay melalui kontrak webhook yang sama', en: 'Batch first, then replay through the same webhook contract' }, { id: 'Run end-to-end yang reproducible, tanpa GPU saat demo', en: 'Reproducible end-to-end runs, no GPU at demo time' }],
      [{ id: 'Event dan track datang pada laju berbeda', en: 'Events and tracks arrive at different rates' }, { id: 'Event per jendela waktu, track sekali, run-complete terakhir', en: 'Events per time window, tracks once, run-complete last' }, { id: 'Consumer dapat membangun ulang tabel gold hanya saat run selesai', en: 'Consumer can rebuild gold tables only when a run is complete' }],
      [{ id: 'Pengiriman duplikat tidak boleh dihitung dua kali', en: 'Duplicate sends must not double-count' }, { id: 'Deduplikasi `event_id` di receiver dan database', en: '`event_id` de-duplication at the receiver and in the database' }, { id: 'Replay idempoten', en: 'Idempotent replay' }],
      [{ id: 'Dashboard dan consumer berebut file lock', en: 'Dashboard vs consumer file lock' }, { id: 'Dashboard membaca Parquet hasil ekspor melalui DuckDB in-memory', en: 'Dashboard reads exported Parquet through in-memory DuckDB' }, { id: 'Tidak ada lock contention dengan writer', en: 'No lock contention with the writer' }],
      [{ id: 'Bukti harus menunjukkan deteksi', en: 'Evidence must show the detection' }, { id: 'Snapshot dan klip dipotong dari video beranotasi', en: 'Cut snapshots and clips from the annotated video' }, { id: 'Flag dapat diverifikasi secara visual', en: 'Flags are visually verifiable' }],
    ],
    outro: {
      id: 'Keputusan yang paling berguna adalah menjadikan kontrak event sebagai batas antara dua proyek. Sisi vision tidak tahu Kafka ada; sisi data tidak tahu bagaimana poligon lajur digambar. Ini menjaga kedua bagian tetap dapat diuji secara terpisah dan menjadikan replay urusan transport, bukan rewrite.',
      en: 'The most useful decision was to make the event contract the boundary between the two projects. The vision side does not know Kafka exists; the data side does not know how a lane polygon is drawn. That kept both halves testable in isolation and made replay a transport concern rather than a rewrite.',
    },
  },
  limitations: {
    label: { id: 'Batasan dan langkah berikutnya', en: 'Limitations and next steps' },
    heading: { id: 'Apa yang bukan cakupan proyek ini', en: 'What this is not' },
    paragraphs: [
      {
        id: 'Ini adalah prototipe, bukan deployment. Proyek berjalan pada satu profil kamera dan beberapa klip pendek. Tidak ada estimasi kecepatan, ANPR, re-identification lintas kamera, atau orkestrasi terjadwal.',
        en: 'This is a prototype, not a deployment. It runs on one camera profile and a few short clips. There is no speed estimation, no ANPR, no cross-camera re-identification, and no scheduled orchestration.',
      },
      {
        id: 'Tuning menyasar layer aturan dan post-processing, bukan bobot YOLO. Label bersifat level kendaraan, bukan bounding box, sehingga tidak dapat dipakai langsung untuk melatih detector. Akurasi kelas 85,7%; karena lajur 2 hanya menandai truk/bus, satu truk yang terbaca mobil bisa lolos.',
        en: 'Tuning targets the rule and post-processing layer, not the YOLO weights. Labels are vehicle-level, not bounding boxes, so they cannot be used directly to train the detector. Class accuracy is 85.7%; because lane 2 only flags trucks and buses, a truck read as a car can slip through.',
      },
      {
        id: 'Framing yang jujur tetap penting: hogging adalah indikasi berbasis aturan, bukan penentuan hukum; replay bukan inferensi langsung; dan F1 0,933 berlaku pada 56 kendaraan yang direview dari satu klip, bukan seluruh lalu lintas.',
        en: 'The honest framing still matters: hogging is a rule-based indication, not a legal determination; replay is not live inference; and the 0.933 F1 applies to 56 reviewed vehicles from one clip, not all traffic.',
      },
    ],
    nextSteps: [
      { id: 'Set validasi berlabel yang lebih besar', en: 'Larger labelled validation set' },
      { id: 'Konfigurasi multi-kamera', en: 'Multi-camera configuration' },
      { id: 'Consumer dan retensi terjadwal', en: 'Scheduled consumers and retention' },
      { id: 'Crop bukti ke box kendaraan', en: 'Vehicle-box evidence crops' },
      { id: 'Detector yang lebih kuat untuk kelas kendaraan', en: 'Stronger vehicle-class detector' },
    ],
  },
  cta: {
    title: { id: 'Dua proyek, satu kontrak event', en: 'Two projects, one event contract' },
    body: {
      id: 'Baca pipeline vision-nya, lihat proyek lain, atau hubungi saya untuk membahas desain event contract dan alur datanya.',
      en: 'Read the vision pipeline, browse the other projects, or get in touch to discuss event-contract design and the data flow.',
    },
    projects: { id: 'Semua proyek', en: 'All projects' },
    contact: { id: 'Hubungi saya', en: 'Get in touch' },
  },
  laneMap: [
    { name: 'nb_lane_1', role: { id: 'normal', en: 'normal' }, kind: 'normal' },
    { name: 'nb_lane_2', role: { id: 'normal', en: 'normal' }, kind: 'normal' },
    { name: 'nb_lane_3', role: { id: 'pendahulu', en: 'overtaking' }, kind: 'overtaking' },
    { name: { id: 'median', en: 'median' }, role: { id: 'pemisah', en: 'separator' }, kind: 'median' },
    { name: 'sb_lane_3', role: { id: 'pendahulu', en: 'overtaking' }, kind: 'overtaking' },
    { name: 'sb_lane_2', role: { id: 'normal', en: 'normal' }, kind: 'normal' },
    { name: 'sb_lane_1', role: { id: 'normal', en: 'normal' }, kind: 'normal' },
  ],
  visionNodes: [
    { name: { id: 'Video jalan tol / HLS langsung', en: 'Highway video / live HLS' }, meta: { id: 'input', en: 'input' }, kind: 'source' },
    { name: { id: 'Frame sampler', en: 'Frame sampler' }, meta: 'stride N', kind: 'vision' },
    { name: 'YOLO11n', meta: { id: 'detektor kendaraan', en: 'vehicle detector' }, kind: 'vision' },
    { name: 'ByteTrack', meta: { id: 'track ID persisten', en: 'persistent track IDs' }, kind: 'vision' },
    { name: { id: 'Pemeta lajur', en: 'Six-lane mapper' }, meta: { id: 'poligon + bbox vote', en: 'polygon + bbox vote' }, kind: 'vision' },
    { name: { id: 'Occupancy tracker', en: 'Occupancy tracker' }, meta: { id: 'enter / exit / change / dwell', en: 'enter / exit / change / dwell' }, kind: 'vision' },
    { name: { id: 'Aturan hogging', en: 'Hogging rules' }, meta: { id: 'berbasis konfigurasi', en: 'config-driven' }, kind: 'event' },
    { name: 'events.jsonl', meta: { id: 'kontrak event bertipe', en: 'typed event contract' }, kind: 'event' },
  ],
  platformNodes: [
    { name: { id: 'FastAPI receiver', en: 'FastAPI receiver' }, meta: { id: 'bearer token + batch', en: 'bearer token + batch' }, kind: 'platform' },
    { name: 'Kafka', meta: { id: 'events · tracks · runs', en: 'events · tracks · runs' }, kind: 'platform' },
    { name: { id: 'Consumer', en: 'Consumer' }, meta: { id: 'validasi + dedupe', en: 'validate + dedupe' }, kind: 'platform' },
    { name: 'Bronze', meta: { id: 'JSONL mentah', en: 'raw JSONL' }, kind: 'storage' },
    { name: 'Silver', meta: { id: 'DuckDB / Parquet', en: 'DuckDB / Parquet' }, kind: 'storage' },
    { name: 'Gold', meta: { id: 'tabel agg_*', en: 'agg_* tables' }, kind: 'gold' },
    { name: 'Streamlit', meta: { id: 'dashboard 4 halaman', en: 'four-page dashboard' }, kind: 'gold' },
  ],
};

const hwLabel = (value) => escapeHtml(localized(value));
const hwRich = (value) => escapeHtml(localized(value))
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/`([^`]+)`/g, '<code>$1</code>');

function hwCopy(paragraphs) {
  return `<div class="hw-copy">${paragraphs.map((paragraph) => `<p>${hwRich(paragraph)}</p>`).join('')}</div>`;
}

function hwSection(id, label, heading, body) {
  return `<section class="hw-section" id="${escapeHtml(id)}">
    <span class="hw-section__label">${hwRich(label)}</span>
    <h3>${hwRich(heading)}</h3>
    ${body}
  </section>`;
}

function hwTable(caption, head, rows, className = '') {
  return `<div class="lh-scroll"><table class="lh-table hw-table${className ? ` ${className}` : ''}">
    <caption>${hwRich(caption)}</caption>
    <thead><tr>${head.map((cell) => `<th>${hwRich(cell)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${hwRich(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function hwFigure(src, alt, caption, ratio = '16 / 9', label = { id: 'Media pending', en: 'Media pending' }) {
  const hasSource = Boolean(src);
  return `<figure class="hw-figure${hasSource ? '' : ' is-pending'}">
    <div class="hw-figure__frame" style="--hw-ratio: ${escapeHtml(ratio)}">
      ${hasSource ? `<img src="${escapeHtml(src)}" alt="${hwLabel(alt)}" loading="lazy" decoding="async" onload="this.closest('.hw-figure').classList.add('is-loaded')" onerror="this.closest('.hw-figure').classList.add('is-pending'); this.remove()">` : ''}
      <span class="hw-figure__pending"><span class="hw-pending">${hwLabel(label)}</span><small>${hwLabel(alt)}</small></span>
    </div>
    <figcaption>${hwRich(caption)}</figcaption>
  </figure>`;
}

function hwVideo(caption, alt, label, ratio = '16 / 9') {
  return `<figure class="hw-figure hw-figure--video is-pending">
    <div class="hw-figure__frame" style="--hw-ratio: ${escapeHtml(ratio)}">
      <span class="hw-figure__pending">
        <span class="hw-play">${icon('play')}</span>
        <span class="hw-pending">${hwLabel(label)}</span>
        <small>${hwLabel(alt)}</small>
      </span>
    </div>
    <figcaption>${hwRich(caption)}</figcaption>
  </figure>`;
}

function hwStats() {
  return `<div class="hw-stats">${highwayData.stats.map((stat) => `
    <div class="hw-stat"><b>${escapeHtml(stat.value)}</b><span>${hwLabel(stat.label)}</span></div>`).join('')}</div>`;
}

function hwChain(nodes) {
  return `<div class="hw-chain">${nodes.map((node, index) => `
    ${index ? '<span class="hw-arrow" aria-hidden="true">→</span>' : ''}
    <div class="hw-node hw-node--${escapeHtml(node.kind)}">
      <b>${hwLabel(node.name)}</b>
      <small>${hwLabel(node.meta)}</small>
    </div>`).join('')}</div>`;
}

function hwArchitecture() {
  const data = highwayData.architecture;
  return `<div class="hw-arch">
    <section class="hw-arch__group">
      <div class="hw-arch__head"><span class="hw-kicker">${hwLabel(data.visionLabel)}</span><span class="hw-tag">${hwLabel(data.visionTag)}</span></div>
      ${hwChain(highwayData.visionNodes)}
      <div class="hw-arch__aside"><span>${hwLabel(data.also)}</span>${data.alsoItems.map((item) => `<b>${hwLabel(item)}</b>`).join('')}</div>
    </section>
    <div class="hw-bridge"><span>${hwLabel(data.bridge)}</span></div>
    <section class="hw-arch__group">
      <div class="hw-arch__head"><span class="hw-kicker">${hwLabel(data.platformLabel)}</span><span class="hw-tag">${hwLabel(data.platformTag)}</span></div>
      ${hwChain(highwayData.platformNodes)}
    </section>
  </div>`;
}

function hwLaneMap() {
  return `<div class="hw-lane-map" role="img" aria-label="${hwLabel({ id: 'Peta enam lajur: tiga northbound, median, tiga southbound. Lajur 3 di kedua arah adalah lajur pendahulu.', en: 'Six-lane map: three northbound, the median, and three southbound. Lane 3 in both directions is the overtaking lane.' })}">
    ${highwayData.laneMap.map((lane) => `<div class="hw-lane hw-lane--${escapeHtml(lane.kind)}"><b>${hwLabel(lane.name)}</b><small>${hwLabel(lane.role)}</small></div>`).join('')}
  </div>`;
}

function hwAnchorDiagram() {
  const aria = hwLabel({ id: 'Perbandingan penentuan lajur: satu titik bawah box versus lima titik di sepanjang bottom edge dengan majority vote.', en: 'Lane assignment comparison: one bottom-centre point versus five points along the bottom edge with a majority vote.' });
  return `<div class="hw-anchor-grid">
    <figure class="hw-anchor">
      <svg class="hw-anchor-svg" viewBox="0 0 240 150" role="img" aria-label="${aria}">
        <rect class="hw-svg-road" x="0" y="0" width="240" height="150" rx="8"></rect>
        <path class="hw-svg-lane" d="M120 20 L30 150 M120 20 L92 150 M120 20 L148 150 M120 20 L210 150"></path>
        <rect class="hw-svg-box" x="99" y="92" width="32" height="28" rx="2"></rect>
        <circle class="hw-svg-dot" cx="115" cy="120" r="4.5"></circle>
        <text class="hw-svg-label" x="12" y="18">single point</text>
      </svg>
      <figcaption>${hwLabel(highwayData.anchor.small)}</figcaption>
    </figure>
    <figure class="hw-anchor">
      <svg class="hw-anchor-svg" viewBox="0 0 240 150" role="img" aria-label="${aria}">
        <rect class="hw-svg-road" x="0" y="0" width="240" height="150" rx="8"></rect>
        <path class="hw-svg-lane" d="M120 20 L30 150 M120 20 L92 150 M120 20 L148 150 M120 20 L210 150"></path>
        <rect class="hw-svg-box" x="44" y="74" width="112" height="56" rx="2"></rect>
        <circle class="hw-svg-dot" cx="55" cy="130" r="3.5"></circle>
        <circle class="hw-svg-dot" cx="78" cy="130" r="3.5"></circle>
        <circle class="hw-svg-dot" cx="100" cy="130" r="3.5"></circle>
        <circle class="hw-svg-dot" cx="122" cy="130" r="3.5"></circle>
        <circle class="hw-svg-dot" cx="145" cy="130" r="3.5"></circle>
        <text class="hw-svg-label" x="12" y="18">bbox_vote · 5 points</text>
      </svg>
      <figcaption>${hwLabel(highwayData.anchor.wide)}</figcaption>
    </figure>
  </div>
  <p class="hw-note">${icon('info')}<span>${hwRich(highwayData.anchor.note)}</span></p>`;
}

function hwFacts(facts) {
  return `<ul class="hw-facts">${facts.map(([label, value]) => `<li><span>${hwLabel(label)}</span><b>${hwLabel(value)}</b></li>`).join('')}</ul>`;
}

function hwMediaGrid(items) {
  return `<div class="hw-media-grid">${items.map((item) => hwFigure(item.src, item.alt, item.caption)).join('')}</div>`;
}

function renderHighwayPipelinePage() {
  const project = findProjectByDetailApp('highwaypipeline');
  if (!project) return '';
  const data = highwayData;
  const plain = state.copyMode === 'plain';
  const caveat = `<p class="lakehouse-caveat"><strong>${localized({ id: 'Cakupan:', en: 'Scope note:' })}</strong> ${escapeHtml(localized(projectField(project, 'caveat')))}</p>`;

  const dashboard = `
    ${hwTable(data.platform.pagesCaption, data.platform.pagesHead, data.platform.pagesRows)}
    ${hwTable(data.platform.snapshot.caption, data.platform.snapshot.head, data.platform.snapshot.rows)}
    ${hwFacts(data.platform.snapshot.freshness)}
    <div class="hw-media-grid">
      ${hwFigure('/portfolio/dashboard-overview.jpg', data.platform.overviewAlt, data.platform.overviewCaption, '16 / 9')}
      ${hwFigure('/portfolio/dashboard-lane-usage.jpg', data.platform.laneAlt, data.platform.laneCaption, '16 / 9')}
      ${hwFigure('/portfolio/dashboard-hogging.jpg', data.platform.hoggingAlt, data.platform.hoggingCaption, '16 / 9')}
      ${hwFigure('/portfolio/dashboard-quality.jpg', data.platform.qualityAlt, data.platform.qualityCaption, '16 / 9')}
    </div>
    <p class="hw-note">${icon('info')}<span>${hwRich(data.platform.snapshot.note)}</span></p>`;

  const technicalSections = `
    ${hwSection('hw-pipeline-flow', { id: 'Alur platform', en: 'Platform flow' }, { id: 'Receiver, queue, dan penyimpanan', en: 'Receiver, queue, and storage' }, `${hwCopy(data.platform.paragraphs)}${hwArchitecture()}`)}
    ${hwSection('hw-pipeline-dashboard', data.platform.label, { id: 'Empat halaman untuk membaca data', en: 'Four pages for reading the data' }, dashboard)}
    ${hwSection('hw-pipeline-evidence', { id: 'Bukti klip', en: 'Evidence clips' }, { id: 'Dari Kaggle ke Nextcloud lalu ke dashboard', en: 'From Kaggle to Nextcloud to the dashboard' }, `<div class="hw-copy"><p>${hwRich({ id: 'Klip bukti delapan detik dan thumbnail dihasilkan di Kaggle, lalu diunggah ke Nextcloud. Metadata event hanya menyimpan path relatif, bukan file video.', en: 'Eight-second evidence clips and thumbnails are produced on Kaggle and uploaded to Nextcloud. Event metadata stores only the relative path, not the video file.' })}</p><p>${hwRich({ id: 'Dashboard mengambil klip dan thumbnail melalui proxy server-side. Dengan begitu, kredensial Nextcloud tetap di server dan pemutar video bisa memakai range request tanpa membebani browser dengan file penuh.', en: 'The dashboard fetches clips and thumbnails through a server-side proxy. Nextcloud credentials stay on the server, and the video player can use range requests without loading the whole file in the browser.' })}</p></div>`) }
  `;

  return `
    <section class="content-app lakehouse-app hw-app" aria-labelledby="highwayPipelineTitle">
      <a class="inline-link lakehouse-back" href="/projects" data-open-app="projects">${icon('arrow-left')} <span>${localized({ id: 'Kembali ke proyek', en: 'Back to projects' })}</span></a>
      <div class="content-header content-header--split">
        <div><div class="eyebrow">${localized({ id: 'DETAIL PROYEK', en: 'PROJECT DETAIL' })}</div><h2 id="highwayPipelineTitle">${escapeHtml(project.title)}</h2></div>
        <p class="content-header__description">${escapeHtml(localized(projectField(project, 'scope')))}</p>
      </div>
      <div class="copy-mode-row">${copyModeToggle()}</div>
      <section class="hw-cta" aria-labelledby="hwVisionFirstTitle">
        <div><span class="hw-kicker">${hwLabel({ id: 'Mulai dari sini · 01', en: 'Start here · 01' })}</span><h3 id="hwVisionFirstTitle">${hwLabel({ id: 'Baca pipeline vision dulu', en: 'Read the vision pipeline first' })}</h3><p>${hwLabel({ id: 'Platform ini mengolah event dari pipeline kamera. Lihat bagaimana kendaraan dilacak, lajur ditentukan, dan klip bukti dibuat.', en: 'This platform processes events from the camera pipeline. See how vehicles are tracked, lanes are assigned, and evidence clips are produced.' })}</p></div>
        <div class="hw-actions"><a class="inline-link" href="/projects/highway-lane-occupancy" data-open-app="highway">${hwLabel({ id: 'Buka Highway vision', en: 'Open Highway vision' })} ${icon('arrow-up-right')}</a></div>
      </section>
      <div class="hw">
        <header class="hw-hero">
          <span class="hw-kicker">${hwLabel({ id: 'PLATFORM DATA · KAFKA · DUCKDB · STREAMLIT', en: 'DATA PLATFORM · KAFKA · DUCKDB · STREAMLIT' })}</span>
          <h3 class="hw-hero__headline">${hwLabel({ id: 'Dari webhook ke dashboard', en: 'From webhook to dashboard' })}</h3>
          <p class="hw-hero__subhead">${hwLabel(projectField(project, 'description'))}</p>
        </header>
        <div class="hw-stats">
          <div class="hw-stat"><b>650</b><span>${localized({ id: 'event masuk', en: 'events ingested' })}</span></div>
          <div class="hw-stat"><b>603</b><span>${localized({ id: 'kendaraan terlihat', en: 'vehicles seen' })}</span></div>
          <div class="hw-stat"><b>270</b><span>${localized({ id: 'lane entry', en: 'lane entries' })}</span></div>
          <div class="hw-stat"><b>87</b><span>${localized({ id: 'sinyal hogging', en: 'hogging signals' })}</span></div>
        </div>
        ${plain ? caveat : ''}
        ${technicalBlock(technicalSections)}
        <section class="hw-cta" aria-labelledby="hwPipelineCtaTitle">
          <div><span class="hw-kicker">${hwLabel({ id: 'Kembali ke awal', en: 'Back to the start' })}</span><h3 id="hwPipelineCtaTitle">${hwLabel({ id: 'Lihat cara event dibuat', en: 'See how the events are made' })}</h3><p>${hwLabel({ id: 'Pipeline vision menangani deteksi kendaraan, penentuan lajur, aturan hogging, dan pembuatan klip bukti.', en: 'The vision pipeline handles vehicle detection, lane assignment, hogging rules, and evidence clip generation.' })}</p></div>
          <div class="hw-actions">
            <a class="inline-link" href="/projects/highway-lane-occupancy" data-open-app="highway">${hwLabel({ id: 'Highway vision', en: 'Highway vision' })} ${icon('arrow-up-right')}</a>
            <a class="inline-link" href="/projects" data-open-app="projects">${hwLabel({ id: 'Semua proyek', en: 'All projects' })} ${icon('arrow-up-right')}</a>
          </div>
        </section>
        ${plain ? '' : caveat}
      </div>
    </section>`;
}

function renderHighwayPage() {
  const project = findProjectByDetailApp('highway');
  if (!project) return '';
  const data = highwayData;
  const repo = project.links[0];
  const ctaLinks = [
    repo ? `<a class="inline-link" href="${escapeHtml(repo.href)}" target="_blank" rel="noopener noreferrer">${hwLabel(data.hero.secondary)} ${icon('arrow-up-right')}</a>` : '',
    `<a class="inline-link" href="/projects" data-open-app="projects">${hwLabel(data.cta.projects)} ${icon('arrow-up-right')}</a>`,
    `<a class="inline-link" href="/contact" data-open-app="contact">${hwLabel(data.cta.contact)} ${icon('arrow-up-right')}</a>`,
  ].join('');
  const plain = state.copyMode === 'plain';
  const caveat = `<p class="lakehouse-caveat"><strong>${localized({ id: 'Cakupan:', en: 'Scope note:' })}</strong> ${escapeHtml(localized(projectField(project, 'caveat')))}</p>`;

  return `
    <section class="content-app lakehouse-app hw-app" aria-labelledby="highwayTitle">
      <a class="inline-link lakehouse-back" href="/projects" data-open-app="projects">${icon('arrow-left')} <span>${localized({ id: 'Kembali ke proyek', en: 'Back to projects' })}</span></a>
      <div class="content-header content-header--split">
        <div><div class="eyebrow">${localized({ id: 'DETAIL PROYEK', en: 'PROJECT DETAIL' })}</div><h2 id="highwayTitle">${escapeHtml(project.title)}</h2></div>
        <p class="content-header__description">${escapeHtml(localized(projectField(project, 'scope')))}</p>
      </div>
      <div class="copy-mode-row">${copyModeToggle()}</div>
      <div class="hw">
        <header class="hw-hero">
          <span class="hw-kicker">${hwLabel(data.hero.eyebrow)}</span>
          <h3 class="hw-hero__headline">${hwLabel(data.hero.headline)}</h3>
          <p class="hw-hero__subhead">${hwLabel(plain ? projectField(project, 'description') : data.hero.subhead)}</p>
          <div class="hw-actions">
            ${repo ? `<a class="button button--light" href="${escapeHtml(repo.href)}" target="_blank" rel="noopener noreferrer">${hwLabel(data.hero.secondary)} ${icon('arrow-up-right')}</a>` : ''}
          </div>
        </header>
        ${hwFigure('/portfolio/lane_mapping.jpg', data.lane.mappingAlt, data.lane.mappingCaption, '4 / 3')}
        ${hwStats()}
        ${plain ? caveat : ''}
        ${plain ? `<details class="technical-details"><summary>${escapeHtml(t('technicalDetails'))}</summary><div class="technical-details__body">` : ''}
        ${hwSection('hw-architecture', data.architecture.label, data.architecture.heading, `${hwCopy(data.architecture.paragraphs)}${hwArchitecture()}<p class="hw-note">${icon('info')}<span>${hwRich(data.architecture.note)}</span></p>`)}
        ${hwSection('hw-geometry', data.lane.label, data.lane.heading, `${hwCopy(data.lane.paragraphs)}${hwLaneMap()}${hwFacts(data.lane.facts)}${hwFigure('/portfolio/lane_preview.jpg', data.lane.previewAlt, data.lane.previewCaption, '4 / 3')}`)}
        ${hwSection('hw-anchor', data.anchor.label, data.anchor.heading, `${hwCopy(data.anchor.paragraphs)}${hwAnchorDiagram()}`)}
        ${hwSection('hw-events', data.events.label, data.events.heading, `<div class="hw-copy"><p>${hwRich(data.events.intro)}</p></div>${hwTable(data.events.eventCaption, data.events.eventHead, data.events.eventRows)}${hwTable(data.events.ruleCaption, data.events.ruleHead, data.events.ruleRows)}<div class="hw-copy"><p>${hwRich(data.events.outro)}</p></div><p class="hw-note">${icon('info')}<span>${hwRich({ id: 'Semua indikasi hogging tetap merupakan kecocokan aturan, bukan pelanggaran.', en: 'Every hogging indication remains a rule match, not a violation.' })}</span></p>`)}
        ${hwSection('hw-tuning', data.tuning.label, data.tuning.heading, `${hwCopy(data.tuning.paragraphs)}${hwTable(data.tuning.proxyCaption, data.tuning.proxyHead, data.tuning.proxyRows)}${hwTable(data.tuning.replayCaption, data.tuning.proxyHead, data.tuning.replayRows)}${hwFacts(data.tuning.facts)}<div class="hw-callout hw-callout--muted">${icon('info')}<p>${hwRich(data.tuning.note)}</p></div><p class="hw-note">${icon('info')}<span><a class="inline-link" href="${escapeHtml(data.tuning.artifactHref)}" target="_blank" rel="noopener noreferrer">${hwLabel(data.tuning.artifact)} ${icon('arrow-up-right')}</a></span></p>`)}
        ${hwSection('hw-evidence', data.evidence.label, data.evidence.heading, `${hwCopy(data.evidence.paragraphs)}${hwFigure('/portfolio/evidence_hogging.jpg', data.evidence.imageAlt, data.evidence.imageCaption, '4 / 3')}${hwVideo(data.evidence.videoCaption, data.evidence.videoAlt, data.evidence.videoLabel)}`)}
        ${hwSection('hw-results', data.results.label, data.results.heading, `${hwCopy(data.results.paragraphs)}${hwTable(data.results.caption, data.results.head, data.results.rows)}<div class="hw-callout hw-callout--muted">${icon('info')}<p>${hwRich(data.results.caveat)}</p></div>${hwVideo(data.results.videoCaption, data.results.videoAlt, data.results.videoLabel)}`)}
        ${hwSection('hw-decisions', data.decisions.label, data.decisions.heading, `${hwTable(data.decisions.caption, data.decisions.head, data.decisions.rows)}<div class="hw-copy"><p>${hwRich(data.decisions.outro)}</p></div>`)}
        ${hwSection('hw-limitations', data.limitations.label, data.limitations.heading, `${hwCopy(data.limitations.paragraphs)}<ul class="hw-chips">${data.limitations.nextSteps.map((item) => `<li>${hwLabel(item)}</li>`).join('')}</ul>`)}
        ${plain ? '</div></details>' : ''}
        <section class="hw-cta" id="hw-platform" aria-labelledby="hwNextTitle">
          <div><span class="hw-kicker">${hwLabel({ id: 'Berikutnya · 02', en: 'Next · 02' })}</span><h3 id="hwNextTitle">${hwLabel({ id: 'Dari event ke dashboard', en: 'From events to a dashboard' })}</h3><p>${hwLabel({ id: 'Lanjut ke Highway Lane Analytics — Data Pipeline & Dashboard: receiver FastAPI, topik Kafka, lapisan DuckDB, dashboard Streamlit, dan bukti klip.', en: 'Continue to Highway Lane Analytics — Data Pipeline & Dashboard: the FastAPI receiver, Kafka topics, DuckDB medallion, Streamlit dashboard, and evidence clips.' })}</p></div>
          <div class="hw-actions"><a class="inline-link" href="/projects/highway-lane-analytics-data-pipeline" data-open-app="highwaypipeline">${hwLabel({ id: 'Buka data platform', en: 'Open the data platform' })} ${icon('arrow-up-right')}</a></div>
        </section>
        <section class="hw-cta" aria-labelledby="hwCtaTitle">
          <div><span class="hw-kicker">${hwLabel({ id: 'Selanjutnya', en: 'Next' })}</span><h3 id="hwCtaTitle">${hwLabel(data.cta.title)}</h3><p>${hwLabel(data.cta.body)}</p></div>
          <div class="hw-actions">${ctaLinks}</div>
        </section>
        ${plain ? '' : caveat}
      </div>
    </section>`;
}

function renderSkillCard(skill, index) {
  return `
    <article class="skill-card">
      <div class="skill-card__top"><span class="skill-card__icon">${icon(skill.icon)}</span><span>${String(index + 1).padStart(2, '0')}</span></div>
      <h3>${escapeHtml(localized(skill.title))}</h3>
      <div class="tag-list">${skill.skills.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>
    </article>
  `;
}

function renderSkills() {
  return `
    <section class="content-app skills-app" aria-labelledby="skillsTitle">
      <div class="content-header content-header--split"><div><div class="eyebrow">${t('skillsEyebrow')}</div><h2 id="skillsTitle">${t('skillsTitle')}</h2></div><p class="content-header__description">${t('skillsDescription')}</p></div>
      <section class="skill-section" aria-labelledby="verifiedSkillsTitle">
        <div class="section-heading"><span class="eyebrow">${t('repositoryVerified')}</span><h3 id="verifiedSkillsTitle">${t('repositoryVerified')}</h3></div>
        <div class="skill-grid">${skillGroups.map(renderSkillCard).join('')}</div>
      </section>
      <section class="concepts-section" aria-labelledby="conceptsTitle">
        <div class="section-heading"><span class="eyebrow">${t('engineeringConcepts')}</span><h3 id="conceptsTitle">${t('engineeringConcepts')}</h3></div>
        <div class="tool-cloud__list">${engineeringConcepts.map((concept) => `<span>${escapeHtml(concept)}</span>`).join('')}</div>
      </section>
      <section class="reported-skills" aria-labelledby="reportedSkillsTitle">
        <div class="section-heading"><span class="eyebrow">SELF-REPORTED</span><h3 id="reportedSkillsTitle">${t('reportedSkillsTitle')}</h3></div>
        <p class="reported-skills__intro">${t('reportedSkillsIntro')}</p>
        <div class="reported-skill-grid">${reportedSkills.map((item) => `
          <article class="reported-skill-card"><h4>${escapeHtml(localized(item.title))}</h4><p>${escapeHtml(localized(item.details))}</p><small>${escapeHtml(localized(item.note))}</small></article>
        `).join('')}</div>
      </section>
    </section>
  `;
}

function renderCourses() {
  return `
    <section class="content-app notes-app" aria-labelledby="learningTitle">
      <div class="content-header content-header--split"><div><div class="eyebrow">${t('learningEyebrow')}</div><h2 id="learningTitle">${t('learningTitle')}</h2></div><p class="content-header__description">${t('learningDescription')}</p></div>
      <ol class="course-list">
        ${courses.map((course, index) => `
          <li class="course-card">
            <span class="course-card__index">${String(index + 1).padStart(2, '0')}</span>
            <div class="course-card__body"><span class="course-card__type">${t('completedCourse')}</span><h3>${escapeHtml(course.title)}</h3></div>
            <a href="${escapeHtml(course.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${t('viewAccomplishment')}: ${course.title}`)}">${t('viewAccomplishment')} ${icon('arrow-up-right')}</a>
          </li>
        `).join('')}
      </ol>
      <p class="course-note">${icon('info')}<span>${t('courseNote')}</span></p>
    </section>
  `;
}

function renderContact() {
  const links = [
    { label: t('email'), value: profile.email, href: `mailto:${profile.email}`, icon: 'mail' },
    { label: t('phone'), value: profile.phone, href: `tel:${profile.phoneHref}`, icon: 'phone' },
    { label: t('linkedin'), value: profile.linkedin, href: profile.linkedin, icon: 'link-2' },
    { label: t('github'), value: profile.github, href: profile.github, icon: 'code-2' },
  ];
  return `
    <section class="content-app contact-app" aria-labelledby="contactTitle">
      <div class="content-header"><div class="eyebrow">${t('contactEyebrow')}</div><h2 id="contactTitle">${t('contactTitle')}</h2><p class="content-header__description">${t('contactDescription')}</p></div>
      <div class="contact-grid">
        <div class="contact-copy"><p class="contact-lead">${t('contactLead')}</p><div class="contact-orbit" aria-hidden="true"><span class="orbit-dot orbit-dot--one"></span><span class="orbit-dot orbit-dot--two"></span><span class="orbit-center">${icon('send')}</span><span class="orbit-ring orbit-ring--one"></span><span class="orbit-ring orbit-ring--two"></span></div></div>
        <div class="contact-details">
          ${links.map((link) => `
            <div class="contact-detail">
              <span>${icon(link.icon)} ${escapeHtml(link.label)}</span>
              <a href="${escapeHtml(link.href)}"${link.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(link.value)}</a>
            </div>
          `).join('')}
          <div class="contact-location"><span>${icon('map-pin')} ${t('location')}</span><strong>${escapeHtml(profile.location)}</strong></div>
        </div>
      </div>
    </section>
  `;
}

function renderApp(appId) {
  return {
    home: renderHome,
    about: renderAbout,
    projects: renderProjects,
    skills: renderSkills,
    notes: renderCourses,
    contact: renderContact,
    lakehouse: renderLakehousePage,
    nusacommerce: renderNusacommercePage,
    chicago: renderChicagoPage,
    highway: renderHighwayPage,
    highwaypipeline: renderHighwayPipelinePage,
    rekberin: () => renderDetailPage('rekberin'),
    lelaku: () => renderDetailPage('lelaku'),
    wanttosell: () => renderDetailPage('wanttosell'),
    photobooth: () => renderDetailPage('photobooth'),
    moneytracker: () => renderDetailPage('moneytracker'),
    riverlevel: () => renderDetailPage('riverlevel'),
    abm: () => renderDetailPage('abm'),
  }[appId]();
}

function updateDock() {
  $$('.dock-item[data-open-app]').forEach((button) => {
    button.classList.toggle('dock-item--active', button.dataset.openApp === state.activeApp && !state.minimized);
    button.setAttribute('aria-current', button.dataset.openApp === state.activeApp && !state.minimized ? 'page' : 'false');
  });
}

function revealHashTarget() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  const details = target?.closest('details.technical-details');
  if (details) details.open = true;
}

function openApp(appId, options = {}) {
  if (!appMeta[appId]) return;
  const historyMode = options.history ?? 'push';
  const previousApp = state.activeApp;
  state.activeApp = appId;
  state.minimized = false;
  if (historyMode !== 'none') syncRoute(appId, historyMode);
  trackPageview(appId);
  updateDocumentTitle(appId);
  $('#windowEmpty').hidden = true;
  $('#windowFrame').hidden = false;
  $('#windowFrame').classList.toggle('is-maximized', state.maximized);
  $('#windowFrame').classList.remove('is-minimized');
  $('#windowTitle').textContent = localized(appMeta[appId].title);
  $('#windowContent').innerHTML = renderApp(appId);
  window.requestAnimationFrame(revealHashTarget);
  if (previousApp !== appId) $('#windowContent').scrollTop = 0;
  closeFloatingMenus();
  updateDock();
  refreshIcons();
}

function toggleMinimize() {
  state.minimized = !state.minimized;
  $('#windowFrame').classList.toggle('is-minimized', state.minimized);
  updateDock();
}

function closeWindow() {
  $('#windowFrame').hidden = true;
  $('#windowEmpty').hidden = false;
  state.minimized = false;
  updateDock();
  showToast(t('windowClosedToast'));
}

function toggleMaximize() {
  state.maximized = !state.maximized;
  $('#windowFrame').classList.toggle('is-maximized', state.maximized);
  refreshIcons();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function closeFloatingMenus() {
  $$('.floating-menu').forEach((menu) => { menu.hidden = true; });
  $('#brandButton').setAttribute('aria-expanded', 'false');
  $$('[data-menu-toggle]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
}

function openSearch() {
  closeFloatingMenus();
  state.searchReturnFocus = document.activeElement;
  $('#overlay').hidden = false;
  $('#searchInput').value = '';
  renderSearchResults('');
  window.setTimeout(() => $('#searchInput').focus(), 20);
}

function closeSearch() {
  $('#overlay').hidden = true;
  const returnFocus = state.searchReturnFocus;
  state.searchReturnFocus = null;
  if (returnFocus instanceof HTMLElement) returnFocus.focus();
}

function openHelp() {
  closeFloatingMenus();
  state.helpReturnFocus = document.activeElement;
  $('#helpOverlay').hidden = false;
  window.setTimeout(() => $('#helpClose').focus(), 20);
}

function closeHelp() {
  $('#helpOverlay').hidden = true;
  const returnFocus = state.helpReturnFocus;
  state.helpReturnFocus = null;
  if (returnFocus instanceof HTMLElement) returnFocus.focus();
}

function searchableItems() {
  const apps = Object.entries(appMeta).map(([id, meta]) => ({
    app: id,
    title: localized(meta.label),
    type: localized({ id: 'Aplikasi', en: 'Application' }),
    icon: meta.icon,
    terms: `${localized(meta.label)} ${localized(meta.title)}`,
  }));
  const projectItems = projectSections.flatMap((section) => section.projects.map((project) => ({
    app: 'projects', title: project.title, type: localized(section.title), icon: project.icon,
    terms: `${project.title} ${project.terms} ${project.tags.join(' ')} ${localized(project.scope)} ${localized(project.description)} ${project.links.map((link) => link.label).join(' ')}`,
  })));
  const projectDetailItems = projectSections
    .flatMap((section) => section.projects)
    .filter((project) => project.detailApp)
    .map((project) => ({
      app: project.detailApp, title: project.title, type: localized({ id: 'Detail proyek', en: 'Project detail' }), icon: project.icon,
      terms: `${project.title} ${project.terms} ${project.tags.join(' ')} detail evidence checksum`,
    }));
  const courseItems = courses.map((course) => ({
    app: 'notes', title: course.title, type: t('completedCourse'), icon: 'graduation-cap',
    terms: `${course.title} ${course.terms} DataCamp statement accomplishment completed`,
  }));
  const experienceItems = experience.map((item) => ({
    app: 'about', title: `${item.organization} — ${localized(item.role)}`, type: t('organizationalExperience'), icon: 'users-round',
    terms: `${item.organization} ${localized(item.role)} ${item.period} ${item.details.map((detail) => localized(detail)).join(' ')}`,
  }));
  const skillsItems = skillGroups.map((group) => ({
    app: 'skills', title: localized(group.title), type: t('repositoryVerified'), icon: group.icon,
    terms: `${localized(group.title)} ${group.skills.join(' ')}`,
  }));
  const reportedSkillItems = reportedSkills.map((group) => ({
    app: 'skills', title: localized(group.title), type: t('reportedSkillsTitle'), icon: 'flask-conical',
    terms: `${localized(group.title)} ${localized(group.details)} ${localized(group.note)}`,
  }));
  const conceptItems = projectSections.flatMap((section) => (section.concepts ?? []).map((concept) => ({
    app: 'projects', title: localized(concept.title), type: t('conceptTitle'), icon: 'lightbulb',
    terms: `${localized(concept.title)} ${t('conceptNote')}`,
  })));
  return [...apps, ...projectItems, ...projectDetailItems, ...conceptItems, ...courseItems, ...experienceItems, ...skillsItems, ...reportedSkillItems];
}

function renderSearchResults(query) {
  const normalized = query.trim().toLocaleLowerCase();
  const results = searchableItems()
    .filter((item) => !normalized || `${item.title} ${item.type} ${item.terms}`.toLocaleLowerCase().includes(normalized))
    .slice(0, 10);
  $('#searchResults').innerHTML = results.length
    ? results.map((item, index) => `
      <a class="search-result" href="${escapeHtml(pathForApp(item.app))}" data-open-search-app="${escapeHtml(item.app)}">
        <span class="search-result__icon">${icon(item.icon)}</span>
        <span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.type)}</small></span>
        <kbd>${index + 1}</kbd>
      </a>
    `).join('')
    : `<div class="search-empty">${t('searchEmpty')}</div>`;
  refreshIcons();
}

function updateClock() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(state.language === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  });
  $('#clock').textContent = formatter.format(now).replace(',', ' ·');
  $('#clock').dateTime = now.toISOString();
}

function toggleLanguage() {
  state.language = state.language === 'id' ? 'en' : 'id';
  applyTranslations();
  openApp(state.activeApp, { history: 'none' });
  updateClock();
  showToast(t('languageToast'));
}

function handlePaletteKeyboard(event) {
  if ($('#overlay').hidden) return false;
  const resultButtons = $$('#searchResults .search-result');
  const currentIndex = resultButtons.indexOf(document.activeElement);
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (!resultButtons.length) return true;
    resultButtons[currentIndex < 0 ? 0 : Math.min(currentIndex + 1, resultButtons.length - 1)].focus();
    return true;
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (!resultButtons.length) return true;
    if (currentIndex <= 0) $('#searchInput').focus();
    else resultButtons[currentIndex - 1].focus();
    return true;
  }
  if (event.key === 'Enter' && document.activeElement === $('#searchInput') && resultButtons.length) {
    event.preventDefault();
    resultButtons[0].click();
    return true;
  }
  if (event.key === 'Tab') {
    const focusable = [$('#searchInput'), ...resultButtons];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  return false;
}

function handleHelpFocus(event) {
  if ($('#helpOverlay').hidden || event.key !== 'Tab') return;
  const focusable = $$('#helpOverlay button:not([disabled])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

document.addEventListener('click', (event) => {
  const anchor = event.target.closest('a[href]');
  if (anchor && !anchor.dataset.openApp && !anchor.dataset.openSearchApp) return;

  const routedAnchor = (element) => element.matches('a[href]')
    && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0);

  const lakehouseControl = event.target.closest('[data-lh-stage], [data-lh-month], [data-lh-layer], [data-lh-cs]');
  if (lakehouseControl) {
    const { lhStage, lhMonth, lhLayer, lhCs } = lakehouseControl.dataset;
    if (lhStage) {
      state.lakehouse.stage = lhStage;
      replaceLakehouseSection('#lh-pipeline', lhPipeline(), `[data-lh-stage="${lhStage}"]`);
    }
    if (lhMonth) {
      state.lakehouse.month = lhMonth;
      replaceLakehouseSection('#lh-funnel', lhFunnel(), `[data-lh-month="${lhMonth}"]`);
      replaceLakehouseSection('#lh-analysis', lhAnalysis());
    }
    if (lhLayer) {
      state.lakehouse.layer = lhLayer;
      replaceLakehouseSection('#lh-history', lhHistory(), `[data-lh-layer="${lhLayer}"]`);
    }
    if (lhCs) {
      state.lakehouse.csLayer = lhCs;
      replaceLakehouseSection('#lh-checksum', lhChecksum(), `[data-lh-cs="${lhCs}"]`);
    }
    return;
  }

  const nusacommerceControl = event.target.closest('[data-nc-stage], [data-nc-product]');
  if (nusacommerceControl) {
    const { ncStage, ncProduct } = nusacommerceControl.dataset;
    if (ncStage) {
      state.nusacommerce.stage = ncStage;
      replaceLakehouseSection('#nc-pipeline', ncPipeline(), `[data-nc-stage="${ncStage}"]`);
    }
    if (ncProduct) {
      state.nusacommerce.product = ncProduct;
      replaceLakehouseSection('#nc-products', ncProducts(), `[data-nc-product="${ncProduct}"]`);
    }
    return;
  }

  const chicagoControl = event.target.closest('[data-ch-stage]');
  if (chicagoControl) {
    state.chicago.stage = chicagoControl.dataset.chStage;
    replaceLakehouseSection('#ch-pipeline', chPipeline(), `[data-ch-stage="${state.chicago.stage}"]`);
    return;
  }

  const openTarget = event.target.closest('[data-open-app]');
  if (openTarget) {
    if (routedAnchor(openTarget)) return;
    event.preventDefault();
    openApp(openTarget.dataset.openApp);
    return;
  }

  const searchApp = event.target.closest('[data-open-search-app]');
  if (searchApp) {
    if (routedAnchor(searchApp)) return;
    event.preventDefault();
    openApp(searchApp.dataset.openSearchApp);
    closeSearch();
    return;
  }

  const windowAction = event.target.closest('[data-window-action]');
  if (windowAction) {
    const action = windowAction.dataset.windowAction;
    if (action === 'close') closeWindow();
    if (action === 'minimize') toggleMinimize();
    if (action === 'toggle-maximize') toggleMaximize();
    return;
  }

  const menuToggle = event.target.closest('[data-menu-toggle]');
  if (menuToggle) {
    const menu = $(`#${menuToggle.dataset.menuToggle}`);
    const willOpen = menu.hidden;
    closeFloatingMenus();
    menu.hidden = !willOpen;
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    return;
  }

  if (event.target.closest('#brandButton')) {
    const button = $('#brandButton');
    const menu = $('#workMenu');
    const willOpen = menu.hidden;
    closeFloatingMenus();
    menu.hidden = !willOpen;
    button.setAttribute('aria-expanded', String(willOpen));
    return;
  }

  if (event.target.closest('[data-open-search]')) { openSearch(); return; }
  if (event.target.closest('[data-show-help]')) { openHelp(); return; }
  if (event.target.closest('[data-close-help]')) { closeHelp(); return; }
  const copyButton = event.target.closest('[data-copy-mode]');
  if (copyButton) {
    state.copyMode = copyButton.dataset.copyMode === 'plain' ? 'plain' : 'technical';
    try { localStorage.setItem('portfolio-copy-mode', state.copyMode); } catch { }
    openApp(state.activeApp, { history: 'none' });
    return;
  }
  if (event.target.closest('#languageButton')) { toggleLanguage(); return; }
  if (event.target.closest('#themeButton')) { toggleDarkMode(); return; }
  if (event.target.id === 'overlay') { closeSearch(); return; }
  if (event.target.id === 'helpOverlay') { closeHelp(); return; }

  if (!event.target.closest('.system-bar') && !event.target.closest('.floating-menu')) closeFloatingMenus();
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'searchInput') renderSearchResults(event.target.value);
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
  if (event.key === 'Enter' && document.activeElement?.getAttribute?.('role') === 'link') {
    event.preventDefault();
    document.activeElement.click();
    return;
  }
  if (handlePaletteKeyboard(event)) return;
  handleHelpFocus(event);
  if (event.key === 'Escape') {
    if (!$('#overlay').hidden) closeSearch();
    if (!$('#helpOverlay').hidden) closeHelp();
    closeFloatingMenus();
  }
});

window.addEventListener('popstate', () => {
  openApp(routeFromLocation(), { history: 'none' });
});
window.addEventListener('hashchange', revealHashTarget);

let storedTheme = null;
try { storedTheme = localStorage.getItem('portfolio-theme'); } catch { }
state.darkMode = storedTheme ? storedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
let storedCopyMode = null;
try { storedCopyMode = localStorage.getItem('portfolio-copy-mode'); } catch { }
if (storedCopyMode === 'plain' || storedCopyMode === 'technical') state.copyMode = storedCopyMode;
applyTranslations();
openApp(routeFromLocation(), { history: 'none' });
updateDock();
updateClock();
refreshIcons();
window.setInterval(updateClock, 30_000);
document.documentElement.classList.remove('is-booting');
window.setTimeout(() => $('#bootScreen').classList.add('is-hidden'), 900);
