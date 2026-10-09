# Atlantia STEM Olympiads — Kazakhstan

Landing site: https://atlantia-olympiads.kz

Static site (HTML/CSS/JS, no build step), hosted on Vercel.

- `index.html` — landing page (RU/KZ/EN, language switch in `assets/app.js`)
- `polozhenie.html` — official regulations (pages in `assets/docs/`, PDFs for download)
- `oferta.html` — public offer
- `assets/app.js` — translations, intro and scroll animations, registration link (`REG_URL`)
- `assets/metrika.js` — Yandex Metrica (set `YM_ID`)
- `api/lead.js` — «Получить консультацию» form → Bitrix24 lead. Set env vars in Vercel: `BITRIX_WEBHOOK_URL` (required, keep it secret), optional `BITRIX_SOURCE_ID`, `BITRIX_STATUS_ID`, `BITRIX_ASSIGNED_BY_ID`
- `vercel.json` — security headers, caching, redirects

Deploy: `vercel deploy --prod`
