# Portfolio PDF

Two A4 portfolio versions are generated from the same visual system:

| Version | Source | Output |
| --- | --- | --- |
| v1 · engineering | `portfolio-print.html` | `Ahmad-Maulana-Ibrahim-Portfolio.pdf` |
| v2 · plain language | `portfolio-print-v2.html` | `Ahmad-Maulana-Ibrahim-Portfolio-v2.pdf` |

`portfolio-print.css` is the print stylesheet used by v2; v1 keeps the same styles inline in its HTML file.

## Regenerate

Open the HTML source in Chrome and print to PDF with **background graphics enabled**, or run Chrome headless:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --allow-file-access-from-files --run-all-compositor-stages-before-draw `
  --virtual-time-budget=8000 `
  --print-to-pdf="Ahmad-Maulana-Ibrahim-Portfolio-v2.pdf" `
  "file:///F:/Teknologi Informasi/Self Studies/Portfolio Website/docs/portfolio/portfolio-print-v2.html"
```

The page is designed for A4 with zero browser margins. Images are read from `public/portfolio/` through relative paths. Update the HTML if the selected project list or copy changes.
