# Portfolio PDF

The print source is `portfolio-print.html`; the generated file lives at the repository root:

`Ahmad-Maulana-Ibrahim-Portfolio.pdf`

## Regenerate

Open `portfolio-print.html` in Chrome and print to PDF with **background graphics enabled**, or run Chrome headless:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --allow-file-access-from-files --run-all-compositor-stages-before-draw `
  --virtual-time-budget=8000 `
  --print-to-pdf="Ahmad-Maulana-Ibrahim-Portfolio.pdf" `
  "file:///F:/Teknologi Informasi/Self Studies/Portfolio Website/docs/portfolio/portfolio-print.html"
```

The page is designed for A4 with zero browser margins. Images are read from `public/portfolio/` through relative paths. Update the HTML if the selected project list or copy changes.
