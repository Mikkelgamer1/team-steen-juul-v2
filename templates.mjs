// Al HTML til sitet. Tekster rettes her; tal, heste og resultater kommer fra data/travinfo.json.

export const SITE = {
  // Version 2. På Vercel bruges projektets adresse (en vercel.app-adresse holdes ude af søgemaskinerne af build.mjs).
  url: (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL) || 'https://team-steen-juul-v2.vercel.app').replace(/\/$/, ''),
  navn: 'Team Steen Juul',
  person: 'Steen Juul',
  fornavn: 'Steen',
  licens: 3106,
  telefon: '+45 40 33 45 16', // står på Facebook-siden og i licensregistret
  gade: 'Mannerupvej 8',
  sted: 'Osted',
  postnr: '4320',
  by: 'Lejre',
  slogan: ['Træner', 'Kusk', 'Hall of Fame'],
  facebook: 'https://www.facebook.com/teamsteenjuul', // opslag vises som kort, når FB_SIDE/FB_TOKEN er sat i GitHub
  instagram: '',
  travinfo: 'https://travinfo.dk/licenseholder-tabs/3106',
  thof: 'https://www.thof.dk/1970-til-1990/steen-juul',
  hjemmebane: 'https://www.travbanen.dk/',
  // Staldens jockey – hans tal hentes hver dag af build.mjs (licensregistret: født 2003, jockey hos Steen Juul).
  kusk: { navn: 'Patrick Larsen', licens: 526155, foedt: 2003 },
  kort: 'https://www.google.com/maps/search/?api=1&query=Mannerupvej+8%2C+4320+Lejre',
};

// Ingen kendte sponsorer. Tilføj { navn, url, logo, b, h, tekst } for at vise dem.
const PARTNERE = [];

// Billeder: navn → [forhold, bredder…]. Fotografer og kilder står i alt-teksterne og billedteksterne
// (samme billeder og kilder som på den første udgave af sitet).
const BILLEDER = {
  'graes': [1.499, 800, 1400, 2048],
  'daekken': [1.000, 720],
  'extreme': [0.999, 600, 900, 1170],
  'festival': [1.529, 800, 1170],
  'buket': [1.429, 700, 1170],
  'copperfield': [1.382, 700, 1200],
  'vixi-ejer': [1.540, 616],
  'k-2002': [1.415, 700, 1100],
  'loeb-4': [1.515, 600, 850],
  'loeb-6': [1.515, 600, 850],
  'nat-6': [1.515, 600, 850],
  'tribune': [1.515, 600, 850],
  'aarhus': [1.494, 700, 1170],
  'sort': [1.499, 700, 1024],
  'gorm': [1.414, 700, 1131],
  'patrick': [2.127, 800, 1400],
  'h-frodo': [1.515, 800],
  'h-monterey': [1.501, 800],
  'h-ostedantik': [1.501, 800],
  'h-keepthemoney': [1.515, 800],
  'h-dutchess': [1.413, 800],
  'h-lanson': [1.413, 800],
  'h-pjs': [1.413, 800],
};
// Hestekort: hest-id → [billede, alt, kredit, beskæring]. Kun billeder, hvor kilden siger, hvilken hest det er.
// Forlader hesten træningslisten, forsvinder kortet. Kilder: travet.dk, trav24.dk og fotograferne i kreditten.
const HESTEFOTO = {
  643267: ['h-frodo', 'Frodo Cash i front med Steen Juul i sulkyen', 'Foto: Burt Seeger', '14% 50%'],
  656701: ['h-monterey', 'Monterey Market i fuld fart', 'Kilde: travet.dk', '58% 50%'],
  651251: ['h-keepthemoney', 'Keep The Money med Steen Juul i sulkyen', 'Foto: Burt Seeger', '70% 40%'],
  659013: ['patrick', 'New Watch med laurbærkrans efter sejren i Jydsk 2-årings Grand Prix 2026', 'Foto: Ole Hindby', '38% 40%'],
  653150: ['h-ostedantik', 'Lets Go Ostedantik i vindercirklen med Steen Juul og ejerne', 'Foto: Kjeld Mikkelsen', '64% 40%'],
  654349: ['h-lanson', 'Lanson med Steen Juul i holdets rød-grønne farver efter sejren i Odense', 'Foto: Gormfoto', '40% 50%'],
  656666: ['h-pjs', 'Get In Your Pj\'s og Patrick Larsen på vej mod sejren i Odense', 'Foto: Gormfoto', '5% 50%'],
  660306: ['h-dutchess', 'Dutchess Sun og Patrick Larsen, der jubler efter sejren i Odense', 'Foto: Gormfoto', '46% 50%'],
};

const BANER = { Sk: 'Skive', 'Ål': 'Aalborg', 'År': 'Aarhus', Od: 'Odense', Ch: 'Charlottenlund', Bi: 'Billund', Bh: 'Bornholm', Ny: 'Nykøbing F.', Bs: 'Skovbo', Kl: 'Klampenborg', 'Åb': 'Åby', 'Jæ': 'Jägersro', Ax: 'Axevalla' };
// Banernes omtrentlige placering [længdegrad, breddegrad] til det skematiske Danmarkskort (svenske baner og Bornholm vises ikke). Os = stalden i Osted.
const BANE_POS = { Sk: [9.06, 56.56], 'Ål': [9.87, 57.05], 'År': [10.2, 56.14], Od: [10.36, 55.4], Ch: [12.58, 55.75], Bi: [9.12, 55.73], Ny: [11.87, 54.77], Bs: [12.03, 55.46], Kl: [12.59, 55.77], Os: [11.93, 55.56] };
const HJEM = 'Ch';
const SVENSKE = ['Åb', 'Jæ', 'Ax'];
const NAV = [['om-steen/', 'Om Steen'], ['stalden/', 'Stalden'], ['heste/', 'Heste'], ['resultater/', 'Resultater']];

// ---------- små hjælpere ----------

let R = ''; // sti tilbage til roden fra den side, der bygges
let V = ''; // versionsmærke til css/js
let KORT;   // Danmarks omrids og projektionstal fra data/danmark.json

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nf = (n) => Number(n).toLocaleString('da-DK');
const kr = (n) => `${nf(n)}&nbsp;kr.`;
const d = (iso) => new Date(`${String(iso).slice(0, 10)}T12:00:00Z`);
const langDato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d(iso));
const kortDato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d(iso));
const ugedag = (iso) => new Intl.DateTimeFormat('da-DK', { weekday: 'long', timeZone: 'UTC' }).format(d(iso));
const dkListe = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} og ${a.at(-1)}`);
// API'et giver kun en kode. Ukendte koder er udenlandske baner (alle danske står i BANER), så de vises som Udlandet.
const bane = (kode) => BANER[kode] ?? 'Udlandet';
const tlfLink = SITE.telefon.replace(/\s/g, '');

/** "16,0a" → "1.16,0a". Tomt, hvis der ikke er en tid (fx galop uden tid). */
export const tid = (t) => (/^\d\d,\d/.test(t ?? '') ? `1.${t}` : '');

/** Hurtigste tid i en rekordstreng som "18,7k 14,3m *12,2am" → "1.12,2am". */
export const bedsteRekord = (mark) => {
  const tider = String(mark ?? '').replace(/\*/g, '').split(/\s+/).filter((x) => /^\d\d,\d/.test(x));
  tider.sort((a, b) => parseFloat(a.replace(',', '.')) - parseFloat(b.replace(',', '.')));
  return tider.length ? `1.${tider[0]}` : '';
};

/** Placering som den vises: 1, 2, 3 … "–" for uplaceret, "disk." for diskvalificeret. */
export const plac = (p) => (/^[1-9]\d*$/.test(p) ? p : p === 'd' ? 'disk.' : '–');

const pil = '<svg class="pil" viewBox="0 0 22 10" width="22" height="10" aria-hidden="true"><path d="M0 5h20M16 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const ud = '<svg class="ud" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M1 9 9 1M3 1h6v6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const nyFane = '<span class="sr"> (åbner i ny fane)</span>';
const ekstern = (href, tekst, cls = 'link') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${tekst} ${ud}${nyFane}</a>`;
const knap = (href, tekst, cls = '') => `<a class="knap ${cls}" href="${R}${href}">${tekst} ${pil}</a>`;
const link = (href, tekst, cls = '') => `<a class="link ${cls}" href="${R}${href}">${tekst} ${pil}</a>`;

const billede = (navn, alt, { sizes = '100vw', lazy = true, cls = '' } = {}) => {
  const [forhold, ...bredder] = BILLEDER[navn];
  const max = bredder.at(-1);
  return `<img${cls ? ` class="${cls}"` : ''} src="${R}assets/img/${navn}-${bredder[0]}.webp" srcset="${bredder.map((w) => `${R}assets/img/${navn}-${w}.webp ${w}w`).join(', ')}" sizes="${sizes}" width="${max}" height="${Math.round(max / forhold)}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
};
const etiket = (tekst, attr = '') => `<p class="etiket"${attr}>${tekst}</p>`;

// ---------- afledte tal ----------

function afled(data, idag) {
  const heste = [...data.heste].sort((a, b) => b.praemier - a.praemier || a.navn.localeCompare(b.navn, 'da'));
  const navne = new Map(heste.map((h) => [h.id, h.navn]));
  const medNavn = (r) => ({ ...r, hest: navne.get(r.hestId) ?? r.hest });
  const saeson = data.traenerStatistik.find((s) => s.sejre > 0) ?? data.traenerStatistik.find((s) => s.starter > 0) ?? data.traenerStatistik[0];
  const kusk = data.kuskStatistik.find((s) => s.aar === saeson.aar) ?? data.kuskStatistik[0];
  const iAar = data.resultater.filter((r) => r.dato.startsWith(String(saeson.aar)));
  const prNavn = {};
  for (const r of iAar) {
    const b = (prNavn[bane(r.bane)] ??= { kode: r.bane, navn: bane(r.bane), antal: 0, sejre: 0 });
    b.antal++;
    if (r.placering === '1') b.sejre++;
  }
  const banetal = Object.values(prNavn).sort((a, b) => b.sejre - a.sejre || b.antal - a.antal);
  const traenerAar = data.traenerStatistik.filter((s) => s.starter > 0);
  return {
    heste,
    saeson,
    kusk,
    opdateret: langDato(data.opdateret),
    seneste: data.resultater.slice(0, 10).map(medNavn),
    kommende: data.kommende.filter((k) => k.dato >= idag).map(medNavn),
    banetal,
    sejrsbaner: banetal.filter((b) => b.sejre > 0 || b.kode === HJEM), // til kort og bjælker: baner uden sejre vises ikke
    banerIAar: [...banetal.filter((b) => b.navn !== 'Udlandet').map((b) => b.navn), ...(prNavn.Udlandet ? ['udenlandske baner'] : [])],
    svenske: banetal.filter((b) => SVENSKE.includes(b.kode)).map((b) => b.navn),
    ungheste: heste.filter((h) => h.alder <= 2),
    aldre: [Math.min(...heste.map((h) => h.alder)), Math.max(...heste.map((h) => h.alder))],
    femAar: { aar: traenerAar.length, sejre: traenerAar.reduce((s, x) => s + x.sejre, 0), starter: traenerAar.reduce((s, x) => s + x.starter, 0), fra: traenerAar.at(-1)?.aar },
    fb: (data.facebook ?? []).slice(0, 5),
    kortheste: heste.filter((h) => HESTEFOTO[h.id]).sort((a, b) => sejre(b) - sejre(a)).slice(0, 8),
    jockey: (data.kusk ?? []).find((s) => s.aar === saeson.aar && s.starter > 0),
    hjemmestarter: prNavn[bane(HJEM)]?.antal ?? 0,
    traenerAar: Number(idag.slice(0, 4)) - 1974 - (idag.slice(5) < '12-01' ? 1 : 0), // selvstændig træner siden 1. december 1974
    storloeb: data.storloeb ?? [],
  };
}

// ---------- fælles dele ----------

const maerke = (cls = '') => `<span class="maerke ${cls}">Team Steen <b>Juul</b></span>`;

const top = (sti) => `
<header class="top${sti === '' ? ' top--hero' : ''}">
  <div class="top__inner wrap">
    <a class="top__logo" href="${R || './'}" aria-label="${SITE.navn} – til forsiden">${maerke()}</a>
    <nav class="top__nav" aria-label="Primær navigation">
      ${NAV.map(([href, navn]) => `<a href="${R}${href}"${sti.startsWith(href) ? ' aria-current="page"' : ''}>${navn}</a>`).join('\n      ')}
    </nav>
    <a class="top__tlf" href="tel:${tlfLink}"><span class="sr">Ring til ${SITE.fornavn}: </span>${SITE.telefon}</a>
    <a class="knap knap--lille top__cta" href="${R}kontakt/"${sti.startsWith('kontakt/') ? ' aria-current="page"' : ''}>Kontakt</a>
    <button class="burger" type="button" aria-haspopup="dialog" aria-controls="menu" commandfor="menu" command="show-modal"><span>Menu</span><i aria-hidden="true"></i></button>
  </div>
</header>
<dialog class="menu" id="menu" aria-label="Menu">
  <div class="menu__top wrap">
    ${maerke()}
    <button class="burger burger--luk" type="button" data-luk commandfor="menu" command="close"><span>Luk</span><i aria-hidden="true"></i></button>
  </div>
  <nav class="menu__nav wrap" aria-label="Menu">
    <ul>
      ${[['', 'Forside'], ...NAV, ['kontakt/', 'Kontakt']].map(([href, navn], i) => `<li style="--i:${i}"><a href="${R}${href || (R ? '' : './')}"${(href ? sti.startsWith(href) : sti === '') ? ' aria-current="page"' : ''}>${navn}</a></li>`).join('\n      ')}
    </ul>
  </nav>
  <div class="menu__bund wrap">
    <a href="tel:${tlfLink}">${SITE.telefon}</a>
    <a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook${nyFane}</a>
  </div>
</dialog>`;

const kontaktbaand = () => `
<section class="cta">
  <div class="wrap cta__inner">
    <div>
      ${etiket('Kontakt', ' data-vis')}
      <h2 data-vis style="--i:1">Skal din hest i træning hos Steen Juul?</h2>
      <p data-vis style="--i:2">Ring, send en sms eller skriv til holdet på Facebook – så tager I en snak om hesten og mulighederne.</p>
    </div>
    <div class="cta__valg" data-vis style="--i:3">
      <a class="cta__tlf" href="tel:${tlfLink}">${SITE.telefon}</a>
      <p class="valg">${ekstern(SITE.facebook, 'Skriv på Facebook', 'knap knap--hvid')} ${link('kontakt/', 'Alle kontaktoplysninger', 'link--lys')}</p>
    </div>
  </div>
</section>`;

const partnere = () => (!PARTNERE.length ? '' : `
<section class="sek sek--moerk sek--smal">
  <div class="wrap partnere">
    <div>
      ${etiket('Samarbejdspartnere', ' data-vis')}
      <h2 data-vis style="--i:1">Med på holdet</h2>
    </div>
    <ul class="partnere__liste">${PARTNERE.map((p, i) => `
      <li data-vis style="--i:${i + 1}"><a href="${p.url}" target="_blank" rel="noopener"><img src="${R}assets/img/${p.logo}" width="${p.b}" height="${p.h}" alt="${esc(p.navn)}" loading="lazy"><span>${esc(p.tekst)} ${ud}</span>${nyFane}</a></li>`).join('')}
    </ul>
  </div>
</section>`);

const bund = (o) => `
<footer class="bund">
  <div class="wrap bund__gitter">
    <div class="bund__brand">
      ${maerke('maerke--stor')}
      <p>Travtræner og kusk med Charlottenlund Trav som hjemmebane. Optaget i Travsportens Hall of Fame.</p>
    </div>
    <nav aria-label="Sider">
      <h2>Sider</h2>
      <ul>
        ${[...NAV, ['kontakt/', 'Kontakt']].map(([href, navn]) => `<li><a href="${R}${href}">${navn}</a></li>`).join('')}
      </ul>
    </nav>
    <div>
      <h2>Kontakt</h2>
      <ul>
        <li><a href="tel:${tlfLink}">${SITE.telefon}</a></li>
        <li><address>${SITE.gade}, ${SITE.sted}<br>${SITE.postnr} ${SITE.by}</address></li>
      </ul>
    </div>
    <div>
      <h2>Følg med</h2>
      <ul>
        ${SITE.facebook ? `<li>${ekstern(SITE.facebook, 'Facebook', '')}</li>` : ''}
        ${SITE.instagram ? `<li>${ekstern(SITE.instagram, 'Instagram', '')}</li>` : ''}
        <li>${ekstern(SITE.travinfo, 'Travinfo', '')}</li>
        <li>${ekstern(SITE.thof, 'Hall of Fame', '')}</li>
        <li>${ekstern(SITE.hjemmebane, 'Charlottenlund Trav', '')}</li>
      </ul>
    </div>
  </div>
  <div class="wrap bund__linje">
    <p>Resultater og statistik: Dansk Hestevæddeløb · opdateret ${o.opdateret}</p>
    <p>© ${new Date().getFullYear()} ${SITE.navn}</p>
  </div>
</footer>`;

const organisation = () => ({
  '@type': ['LocalBusiness', 'SportsOrganization'],
  '@id': `${SITE.url}/#stald`,
  name: SITE.navn,
  description: 'Travstald med Steen Juul som træner og Charlottenlund Trav som hjemmebane: træning af løbsheste og tilkøring af ungheste.',
  url: `${SITE.url}/`,
  telephone: tlfLink,
  image: `${SITE.url}/assets/img/delebillede.jpg`,
  logo: `${SITE.url}/assets/img/ikon-512.png`,
  sport: 'Travsport',
  address: { '@type': 'PostalAddress', streetAddress: SITE.gade, postalCode: SITE.postnr, addressLocality: SITE.by, addressCountry: 'DK' },
  founder: { '@id': `${SITE.url}/#person` },
  sameAs: [SITE.travinfo, SITE.facebook, SITE.instagram].filter(Boolean),
});
const person = () => ({
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: SITE.person,
  jobTitle: 'Professionel travtræner og kusk',
  birthDate: '1950-08-20',
  url: `${SITE.url}/om-steen/`,
  image: `${SITE.url}/assets/img/daekken-720.webp`,
  worksFor: { '@id': `${SITE.url}/#stald` },
  sameAs: [SITE.travinfo, SITE.thof, 'https://da.wikipedia.org/wiki/Steen_Juul'],
});

function layout({ sti, titel, beskrivelse, indhold, o, klasse = '', noindex = false }) {
  const kanonisk = `${SITE.url}/${sti}`;
  const sideNavn = [...NAV, ['kontakt/', 'Kontakt']].find(([href]) => href === sti)?.[1];
  const graf = [
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.navn, inLanguage: 'da-DK' },
    organisation(),
    person(),
    ...(sideNavn ? [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Forside', item: `${SITE.url}/` }, { '@type': 'ListItem', position: 2, name: sideNavn, item: kanonisk }] }] : []),
  ];
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beskrivelse)}">
${noindex ? '<meta name="robots" content="noindex">' : '<link rel="canonical" href="' + kanonisk + '">'}
<meta name="theme-color" content="#08120e">
<meta property="og:type" content="website">
<meta property="og:locale" content="da_DK">
<meta property="og:site_name" content="${SITE.navn}">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beskrivelse)}">
<meta property="og:url" content="${kanonisk}">
<meta property="og:image" content="${SITE.url}/assets/img/delebillede.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Team Steen Juul – travtræner Steen Juul, Charlottenlund">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="48x48" href="${R}assets/img/ikon-48.png">
<link rel="apple-touch-icon" href="${R}assets/img/ikon-180.png">
<link rel="preload" href="${R}assets/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/css/site.css?v=${V}">
<script>document.documentElement.classList.add('js');setTimeout(function(){window.__klar||document.documentElement.classList.remove('js')},2500)</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graf }).replace(/</g, '\\u003c')}</script>
</head>
<body class="${klasse}">
<a class="skip" href="#indhold">Spring til indhold</a>
${top(sti)}
<main id="indhold">
${indhold}
</main>
${bund(o)}
<script src="${R}assets/js/site.js?v=${V}" defer></script>
</body>
</html>
`;
}

// Sidehoved på undersider: mørkt felt med et af stallens billeder bagved, stor titel og nøgletal som "chips".
// `figur` = [billede, alt]: et indrammet foto til højre i stedet for et baggrundsfoto (til billeder, der er for små til fuld bredde)
const sidehoved = ({ sti, h1, tekst, foto, pos = '50% 50%', chips = [], figur, kredit = '' }) => `
<section class="sidehoved${figur ? ' sidehoved--figur' : ''}">
  ${foto ? `<div class="sidehoved__foto" style="--pos:${pos}">${billede(foto, '', { lazy: false })}</div>` : ''}${kredit ? `
  <p class="sidehoved__kredit">${kredit}</p>` : ''}
  <div class="wrap sidehoved__inner">
    <nav class="sti" aria-label="Brødkrumme"><a href="${R}">Forside</a><span aria-hidden="true">/</span><span aria-current="page">${sti}</span></nav>
    <h1>${h1}</h1>
    <p class="indled">${tekst}</p>
    ${chips.length ? `<ul class="chips">${chips.map(([tal, tekst]) => `<li><b>${tal}</b> ${tekst}</li>`).join('')}</ul>` : ''}${figur ? `
    <figure class="sidehoved__figur">${billede(figur[0], figur[1], { sizes: '(min-width: 901px) 40vw, 92vw', lazy: false })}</figure>` : ''}
  </div>
</section>`;

/**
 * Skematisk Danmarkskort. `punkter` er [{ kode, navn, antal?, sejre? }]: med antal tegnes en boble, hvis størrelse følger
 * antal starter, med antal sejre i; uden antal en lille prik. Hjemmebanen får en ring.
 */
function danmarkskort(punkter, beskrivelse) {
  const { bredde, hoejde, lon0, lat1, kx, ky, sti } = KORT;
  const max = Math.max(1, ...punkter.map((p) => p.antal ?? 0));
  const vist = punkter.filter((p) => BANE_POS[p.kode]).map((p) => {
    const [lon, lat] = BANE_POS[p.kode];
    const r = p.antal ? +(8 + 6 * Math.sqrt(p.antal / max)).toFixed(1) : 7;
    return { ...p, x: +((lon - lon0) * kx).toFixed(1), y: +((lat1 - lat) * ky).toFixed(1), r, ydre: p.kode === HJEM ? r + (p.antal ? 4 : 6) : r };
  });
  const hjem = vist.find((p) => p.kode === HJEM);

  // Navnet sættes dér, hvor det bedst holder sig inden for kortet og fri af andre baner.
  const navn = (p) => {
    const w = p.navn.length * 6.4, m = p.ydre + 6;
    const steder = [['start', p.x + m, p.y + 3.7], ['middle', p.x, p.y + m + 9], ['end', p.x - m, p.y + 3.7], ['end', Math.min(p.x + p.ydre, bredde - 4), p.y + m + 9], ['middle', p.x, p.y - m - 2]];
    const straf = ([anker, x, y]) => { // 100 for at stikke ud over kortet, 10 for at ramme en anden bane
      const x0 = (anker === 'start' ? x : anker === 'end' ? x - w : x - w / 2) - 3, x1 = x0 + w + 6, y0 = y - 12, y1 = y + 4;
      const inde = (px, py, luft = 0) => px > x0 - luft && px < x1 + luft && py > y0 - luft && py < y1 + luft;
      const udenfor = x0 < 0 || x1 > bredde || y0 < 0 || y1 > hoejde;
      const rammer = vist.some((q) => q !== p && inde(q.x, q.y, q.ydre));
      return (udenfor ? 100 : 0) + (rammer ? 10 : 0);
    };
    // Hjemmebanen helst til venstre. Ved lige straf vinder det første sted på listen.
    const [anker, x, y] = (p === hjem ? [steder[2], ...steder] : steder).map((sted, i) => [straf(sted) + i / 100, sted]).sort((a, b) => a[0] - b[0])[0][1];
    return `<text class="kort__navn" x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" text-anchor="${anker}">${esc(p.navn)}</text>`;
  };

  return `<svg class="kort__svg" viewBox="0 0 ${bredde} ${hoejde}" role="img" aria-label="${esc(beskrivelse)}">
        <path class="kort__land" d="${sti}"/>${vist.map((p, i) => `
        <g class="kort__bane" style="--n:${i}">${p === hjem ? `<circle class="kort__ring" cx="${p.x}" cy="${p.y}" r="${p.ydre}"/>` : ''}<circle class="kort__prik" cx="${p.x}" cy="${p.y}" r="${p.r}"/>${p.antal ? `<text class="kort__tal" x="${p.x}" y="${+(p.y + 3.3).toFixed(1)}" text-anchor="middle">${p.sejre ?? p.antal}</text>` : ''}${navn(p)}</g>`).join('')}
      </svg>`;
}

// ---------- genbrugte blokke ----------

const plKlasse = (p) => (p === '1' ? ' pl--1' : /^[23]$/.test(p) ? ' pl--23' : p === 'd' ? ' pl--tekst' : '');

const resultatRaekke = (r) => `
      <li class="res__r">
        <span class="pl${plKlasse(r.placering)}"><span class="sr">Placering: </span>${plac(r.placering)}</span>
        <span class="res__hest">${esc(r.hest)}</span>
        <span class="res__info"><time datetime="${r.dato}">${kortDato(r.dato)}</time> · ${esc(bane(r.bane))} · ${r.loeb}. løb · ${nf(r.distance)}&nbsp;m</span>
        <span class="res__tid">${tid(r.tid) || '<span aria-hidden="true">–</span><span class="sr">ingen tid</span>'}</span>
        <span class="res__kr">${r.praemie ? kr(r.praemie) : '<span aria-hidden="true">–</span><span class="sr">ingen præmie</span>'}</span>
      </li>`;
const resultatliste = (liste) => `<ol class="res">${liste.map(resultatRaekke).join('')}
    </ol>`;

const kommendeListe = (liste) => `<ul class="kom">${liste.map((k) => `
      <li>
        <time datetime="${k.dato}"><b>${new Date(`${k.dato}T12:00:00Z`).getUTCDate()}</b>${kortDato(k.dato).replace(/^\d+\.\s*/, '')}</time>
        <span class="kom__hest">${esc(k.hest)}</span>
        <span class="kom__bane">${ugedag(k.dato)} · ${esc(bane(k.bane))} · ${k.loeb}. løb${k.kusk ? ` · ${esc(k.kusk)}` : ''}</span>
      </li>`).join('')}
    </ul>`;
const ingenStarter = () => `<p class="tom">Ingen af staldens heste er startmeldt lige nu. Nye startlister kommer på ${ekstern(SITE.travinfo, 'Travinfo')}.</p>`;

const omHest = (h) => `${h.alder}-årig ${esc(h.koen.toLowerCase())}`;
const afstamning = (h) => (h.far ? `e. ${esc(h.far)} – ${esc(h.mor)}` : '');
const sejre = (h) => Number(h.placeringer.split('-')[0]) || 0;

// Profilkort for de mest vindende heste.
const profilkort = (h, i) => `
      <a class="profil" href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener" data-vis style="--i:${i % 6}">
        <span class="profil__nr" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(h.navn)}</h3>
        <p>${omHest(h)}${afstamning(h) ? `<br>${afstamning(h)}` : ''}</p>
        <p class="profil__kr">${kr(h.praemier)}<small>indkørt</small></p>
        <dl>
          <div><dt>Starter</dt><dd>${h.starter}</dd></div>
          <div><dt>Sejre</dt><dd>${sejre(h)}</dd></div>
          <div><dt>Rekord</dt><dd>${bedsteRekord(h.rekord) || '–'}</dd></div>
        </dl>
        <span class="profil__ud">Travinfo ${ud}${nyFane}</span>
      </a>`;

// Hestekort med staldens egne billeder fra banen (HESTEFOTO), fire pr. række.
const hestekort = (heste) => `<ul class="hestekort" style="--n:${Math.min(4, Math.max(3, heste.length))}" aria-label="Heste fra banen">${heste.map((h, i) => {
  const [foto, alt, kredit, pos] = HESTEFOTO[h.id];
  return `
      <li data-vis style="--i:${i % 4};--pos:${pos}"><a href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener">${billede(foto, alt, { sizes: '(min-width: 1100px) 24vw, (min-width: 700px) 45vw, 90vw' })}<small>${kredit}</small><span><b>${esc(h.navn)}</b><em>${sejre(h)} ${sejre(h) === 1 ? 'sejr' : 'sejre'} · ${kr(h.praemier)}</em> ${ud}${nyFane}</span></a></li>`;
}).join('')}
    </ul>`;

// Hesterække til den fulde træningsliste.
const hesteraekke = (h, i) => `
      <li class="hest" data-vis style="--i:${i % 6}">
        <div class="hest__navn">
          <h3><a href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener">${esc(h.navn)}${nyFane}</a></h3>
          <p>${omHest(h)}${afstamning(h) ? ` · ${afstamning(h)}` : ''}</p>
        </div>
        ${h.starter ? `<dl class="hest__tal">
          <div><dt>Starter</dt><dd>${h.starter} <small>${esc(h.placeringer)}</small></dd></div>
          <div><dt>Indkørt</dt><dd>${kr(h.praemier)}</dd></div>
          <div><dt>Rekord</dt><dd>${bedsteRekord(h.rekord) || '–'}</dd></div>
        </dl>` : '<p class="hest__tal hest__tal--tom">Ustartet</p>'}
      </li>`;
const hestegruppe = (titel, heste) => (heste.length ? `
    <div class="gruppe">
      <h2 class="gruppe__titel" data-vis>${titel} <span>${heste.length}</span></h2>
      <ul class="hesteliste">${heste.map(hesteraekke).join('')}
      </ul>
    </div>` : '');

const ydelser = (o) => `
    <ul class="ydelser">
      <li data-vis>
        <span class="ydelser__ikon" aria-hidden="true">01</span>
        <h3>Træning af løbsheste</h3>
        <p>Stalden træner og starter løbsheste på baner i hele landet og i Sverige. I ${o.saeson.aar} har staldens heste været til start i ${dkListe(o.banerIAar)}.</p>
      </li>
      <li data-vis style="--i:1">
        <span class="ydelser__ikon" aria-hidden="true">02</span>
        <h3>Tilkøring af ungheste</h3>
        <p>Ungheste køres til og bygges op mod deres første starter.${o.ungheste.length > 1 ? ` Lige nu står ${o.ungheste.length} åringer og 2-årige på træningslisten.` : ''}</p>
      </li>
      <li data-vis style="--i:2">
        <span class="ydelser__ikon" aria-hidden="true">03</span>
        <h3>Erfaring i sulkyen</h3>
        <p>${SITE.fornavn} har kørt løb siden 1968.${o.jockey ? ` I dag kører staldens jockey, ${SITE.kusk.navn}, mange af hestene – i ${o.jockey.aar} ${o.jockey.starter} starter og ${o.jockey.sejre} sejre.` : ''}</p>
      </li>
    </ul>`;

// Billeder fra løbsdagene (Team Juuls Facebook-side og fotograferne i alt-teksterne).
// Stalden-siden viser hele galleriet, forsiden et kort udvalg med billeder, der ikke står på Stalden-siden.
const FORSIDEFOTOS = [
  ['buket', 'Steen Juul i holdets rød-grønne farver med buketten efter Jysk 4-års Grand Prix 2024'],
  ['festival', 'Festival of Speed med laurbærkrans og Steen Juul efter derbysejren i 2021 · Foto: Kjeld Mikkelsen'],
  ['gorm', 'Mørk travhest i løb · Foto: Gormfoto'],
];
const galleri = (fotos = GALLERI, cls = '') => `<ul class="galleri${cls}">${fotos.map(([navn, alt], i) => `
      <li data-vis style="--i:${i % 4}">${billede(navn, alt, { sizes: '(min-width: 1000px) 30vw, 50vw' })}</li>`).join('')}
    </ul>`;
const GALLERI = [
    ['graes', 'Travhest i fuld fart med kusken i rødt og grønt · Foto: Kjeld Mikkelsen'],
    ['loeb-6', 'Kusken i rødt og grønt bag hest nummer 6 · Foto: Burt Seeger'],
    ['daekken', 'Steen Juul smiler i sulkyen efter en sejr'],
    ['nat-6', 'Aftenløb under lysene · Foto: Burt Seeger'],
    ['aarhus', 'Hest nummer 2 foran tribunen'],
    ['sort', 'Sort travhest i trav foran tribunen'],
    ['tribune', 'Hest nummer 4 i trav foran tribunen · Foto: Burt Seeger'],
    ['loeb-4', 'Hest nummer 4 i løb'],
];

const sejreTekst = (n) => `${n} ${n === 1 ? 'sejr' : 'sejre'}`;

/** Hjemmebanen og – hvis det er en anden – banen med flest sejre i år. */
const baneTekst = (o) => {
  const hjem = o.banetal.find((b) => b.kode === HJEM), top = o.banetal[0];
  const sverige = o.svenske.length ? ` Stalden har også været til start i Sverige på ${dkListe(o.svenske)}.` : '';
  if (!hjem) return `Charlottenlund Trav har været hjemmebanen siden 1983.${sverige}`;
  return (top !== hjem && top.sejre > hjem.sejre
    ? `Charlottenlund er hjemmebanen med ${hjem.antal} starter i ${o.saeson.aar} – men flest sejre kommer i ${top.navn}: ${sejreTekst(top.sejre)} på ${top.antal} starter.`
    : `Hjemmebanen er også der, hvor flest sejre kommer: ${sejreTekst(hjem.sejre)} på ${hjem.antal} starter i ${o.saeson.aar}.`) + sverige;
};

const banebjaelker = (banetal) => {
  const max = Math.max(1, ...banetal.map((b) => b.sejre));
  return `<ul class="baner">${banetal.map((b) => `
        <li style="--w:${Math.round((b.sejre / max) * 100)}%"><span>${esc(b.navn)}</span><em>${b.antal} starter · ${Math.round((b.sejre / b.antal) * 100)} %</em><b>${sejreTekst(b.sejre)}</b></li>`).join('')}
      </ul>`;
};

const statTabel = (titel, raekker) => `
      <div class="tabelboks" role="region" aria-label="${titel}" tabindex="0">
        <table class="tabel">
          <caption>${titel}</caption>
          <thead><tr><th scope="col">År</th><th scope="col">Starter</th><th scope="col">1.–2.–3.</th><th scope="col">Sejrs&shy;procent</th><th scope="col">Præmiesum</th></tr></thead>
          <tbody>${raekker.filter((s) => s.starter > 0).map((s) => `
            <tr><th scope="row">${s.aar}</th><td>${s.starter}</td><td>${s.sejre}–${s.toer}–${s.treer}</td><td>${s.procent}&nbsp;%</td><td>${kr(s.praemier)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>`;

const formkurve = (liste) => `<ol class="form" aria-label="Placeringer i de seneste ${liste.length} starter, nyeste først">${liste.map((r) => `<li class="pl${plKlasse(r.placering)}"><span class="sr">${esc(r.hest)}: </span>${plac(r.placering)}</li>`).join('')}</ol>`;

/** Lang tekst forkortes ved et ordskifte. */
const kortTekst = (s, max = 240) => (s.length <= max ? s : `${s.slice(0, s.lastIndexOf(' ', max))}…`);

// De seneste Facebook-opslag (hentet af build.mjs) som kort. Vises kun, når der er opslag.
const fbKort = (liste) => `
    <ul class="fbkort" aria-label="Seneste opslag fra Facebook">${liste.map((p, i) => `
      <li data-vis style="--i:${i}">
        <a href="${esc(p.link)}" target="_blank" rel="noopener">
          ${p.billede ? `<img src="${R}assets/fb/${p.billede}" alt="" loading="lazy" decoding="async">` : ''}
          <time datetime="${p.dato}">${langDato(p.dato)}</time>
          ${p.tekst ? `<p>${esc(kortTekst(p.tekst))}</p>` : ''}
          <span class="fbkort__mere">Se opslaget på Facebook ${ud}</span>${nyFane}
        </a>
      </li>`).join('')}
    </ul>`;

// Faste kort til profilerne – ingen indlejring fra Facebook, så ingen cookies og intet banner
const FB_IKON = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M13.4 21v-7.5h2.5l.4-2.9h-2.9V8.8c0-.8.2-1.4 1.4-1.4h1.6V4.8a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2H7.8v2.9h2.5V21z" fill="currentColor"/></svg>';
const IG_IKON = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/></svg>';
const social = (href, ikon, navn, adresse, foto) => `
      <a class="social" href="${href}" target="_blank" rel="noopener">
        ${billede(foto, '', { sizes: '(min-width: 901px) 22vw, 46vw' })}
        <span class="social__ikon">${ikon}</span>
        <span><b>${navn}</b><small>${adresse}</small></span>
        ${ud}${nyFane}
      </a>`;

// "Følg med" er sin egen sektion på de fleste sider. På Kontakt står den i samme sektion som kontaktfelterne,
// så de to lyse flader får én fælles baggrund i stedet for en synlig kant imellem.
const harFoelg = (fb = []) => Boolean(SITE.facebook || SITE.instagram || fb.length);
const foelg = (fb = []) => (harFoelg(fb) ? `
<section class="sek sek--lys sek--gloed">${foelgIndhold(fb)}
</section>` : '');
const foelgIndhold = (fb = []) => `
  <div class="wrap foelg">
    <div>
      ${etiket('Følg med', ' data-vis')}
      <h2 data-vis style="--i:1">Løbsdagene, før de sker</h2>
      <p data-vis style="--i:2">På Facebook gennemgår Team Juul staldens starter før hver løbsdag – hest for hest – og fortæller, hvordan det gik${fb.length ? '. Her er de seneste opslag' : ''}.</p>
    </div>
    <div class="sociale" data-vis style="--i:2">${SITE.facebook ? social(SITE.facebook, FB_IKON, 'Facebook', SITE.facebook.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').replace('/', '/<wbr>'), 'loeb-6') : ''}${SITE.instagram ? social(SITE.instagram, IG_IKON, 'Instagram', '@' + SITE.instagram.replace(/\/$/, '').split('/').pop(), 'tribune') : ''}
    </div>
  </div>
  ${fb.length ? `<div class="wrap">${fbKort(fb)}</div>` : ''}`;

// ---------- sider ----------

// Løbsfarverne fra Dansk Hestevæddeløb ("Rød/grøn/reklame") som prikker på holdkortet
const FARVER = { 'rød': 'var(--roed)', 'grøn': 'var(--blaa)' };
const loebsfarver = (data) => data.traener.farver.split('/').filter((f) => FARVER[f.toLowerCase()]);
const prikker = (farver) => farver.map((f) => `<i style="--f:${FARVER[f.toLowerCase()]}"></i>`).join('');

// "Næsten 8.000 sejre": Sjællandske Medier (1. december 2024) – officielt 7.602 pr. 1. april 2020 (da.wikipedia.org)
const forside = (o, data) => {
  const farver = loebsfarver(data);
  return `
<section class="hero">
  <div class="hero__foto">
    ${billede('graes', 'Travhest i fuld fart med kusken i holdets rød-grønne farver · Foto: Kjeld Mikkelsen', { lazy: false })}
  </div>
  <div class="wrap hero__gitter">
    <div class="hero__tekst">
      <p class="etiket etiket--lys">Team Steen Juul · Travtræner · Charlottenlund</p>
      <h1>Steen <span>Juul</span></h1>
      <p class="hero__slogan">${SITE.slogan.map((s) => `<span>${s}</span>`).join('')}</p>
      <p class="hero__indled">${o.heste.length} heste i træning med Charlottenlund Trav som hjemmebane – og en træner med næsten 8.000 sejre, ti derbysejre som kusk og en plads i Travsportens Hall of Fame.</p>
      <p class="valg">${knap('kontakt/', 'Kontakt stalden')} ${knap('heste/', 'Se hestene', 'knap--glas')}</p>
    </div>
    <figure class="holdkort">
      <div class="holdkort__foto">${billede('daekken', `${SITE.person} smiler i sulkyen efter en sejr`, { sizes: '(min-width: 901px) 350px, 104px', lazy: false })}<span>${esc(data.traener.licens)}-licens</span></div>
      <p class="segl"><small>næsten</small><b>8.000</b><span>sejre i karrieren</span></p>
      <figcaption>
        <b>${SITE.person}</b>
        <span>Travtræner og kusk</span>
        <dl>
          <div><dt>Født</dt><dd>${data.traener.foedt}</dd></div>
          <div><dt>Hjemmebane</dt><dd>${esc(data.traener.hjemmebane)}</dd></div>${farver.length ? `
          <div><dt>Løbsfarver</dt><dd class="farver">${prikker(farver)}<span class="sr">${dkListe(farver)}</span></dd></div>` : ''}
        </dl>
      </figcaption>
    </figure>
  </div>
</section>

<section class="tal" aria-label="Sæsonen i tal">
  <div class="wrap">
    <div class="tal__kort">
      <div class="tal__titel"><b>Sæson ${o.saeson.aar}</b><span>som træner</span></div>
      <dl>
        <div><dt>Starter</dt><dd>${o.saeson.starter}</dd></div>
        <div><dt>Sejre</dt><dd>${o.saeson.sejre}</dd></div>
        <div><dt>Sejrsprocent</dt><dd>${o.saeson.procent}<small>%</small></dd></div>
        <div><dt>Indkørt</dt><dd>${nf(o.saeson.praemier)}<small>kr.</small></dd></div>
      </dl>
      <div class="tal__naeste">
        <span>Næste start</span>
        ${o.kommende.length ? `<b>${esc(o.kommende[0].hest)}</b><em>${ugedag(o.kommende[0].dato)} ${kortDato(o.kommende[0].dato)} · ${esc(bane(o.kommende[0].bane))}</em>` : '<b>Ingen startmeldte</b><em>Startlister på Travinfo</em>'}
      </div>
    </div>
  </div>
</section>

<section class="sek sek--lys sek--gloed">
  <div class="wrap traener">
    <figure class="traener__foto" data-vis>${billede('extreme', 'Steen Juul og derbyvinderen Extreme med buketten efter en sejr', { sizes: '(min-width: 901px) 34vw, 90vw' })}</figure>
    <div>
      ${etiket(SITE.fornavn, ' data-vis')}
      <h2 data-vis style="--i:1">En legende på Lunden</h2>
      <p class="indled" data-vis style="--i:2">${SITE.fornavn} kørte sit første løb i 1968, blev selvstændig træner i 1974 og har haft Charlottenlund som hjemmebane siden 1983. I dag har han ${data.traener.licens}-licens som både træner og kusk.</p>
      <p data-vis style="--i:3">Ti sejre i Dansk Trav Derby som kusk – fra For Ever Vixi i 1983 til Festival of Speed i 2021 – tangerer N. J. Kosters rekord. Travsportens Hall of Fame siger det kort: »Steen Juul vil vinde – hver gang.«</p>
      <dl class="nogle" data-vis style="--i:4">
        <div><dt>Derbysejre som kusk</dt><dd>10</dd></div>
        <div><dt>Championater på Charlottenlund</dt><dd>35</dd></div>
        <div><dt>År som træner</dt><dd>${o.traenerAar}</dd></div>
      </dl>
      <p class="valg" data-vis style="--i:5">${link('om-steen/', 'Historien om Steen')}</p>
    </div>
  </div>
</section>

<section class="sek sek--moerk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Hestene', ' data-vis')}
        <h2 data-vis style="--i:1">Holdet lige nu</h2>
      </div>
      <p data-vis style="--i:2">${o.heste.length} heste står på træningslisten${o.ungheste.length > 1 ? ` – ${o.heste.length - o.ungheste.length} i løbsalderen og ${o.ungheste.length} ungheste på vej` : ''}.</p>
    </div>
    ${o.kortheste.length ? hestekort(o.kortheste.slice(0, 4)) : ''}
    <h3 class="mini" data-vis>Mest vindende på listen</h3>
    <div class="profiler">${[...o.heste].sort((a, b) => sejre(b) - sejre(a) || b.praemier - a.praemier).slice(0, 6).map(profilkort).join('')}
    </div>
    <p class="midt" data-vis>${knap('heste/', `Hele træningslisten (${o.heste.length})`, 'knap--glas')}</p>
  </div>
</section>

<section class="sek sek--lys sek--gloed">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Stalden', ' data-vis')}
        <h2 data-vis style="--i:1">Fra løbsdagene</h2>
      </div>
      <p data-vis style="--i:2">Buketter, laurbærkranse og hverdag på banen. Billeder fra Team Juuls Facebook-side.</p>
    </div>
    ${galleri(FORSIDEFOTOS, ' galleri--kort')}
    <p class="valg" data-vis>${link('stalden/', 'Se flere billeder fra stalden')}</p>
  </div>
</section>

<section class="sek sek--moerk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Fra banen', ' data-vis')}
        <h2 data-vis style="--i:1">Seneste resultater</h2>
      </div>
      <p data-vis style="--i:2">Opdateret ${o.opdateret} fra Dansk Hestevæddeløb.</p>
    </div>
    <div class="resgitter">
      <div class="panel" data-vis>
        <h3 class="mini">Seneste starter</h3>
        ${resultatliste(o.seneste.slice(0, 6))}
        <p class="valg">${link('resultater/', 'Alle resultater og statistik', 'link--lys')}</p>
      </div>
      <div class="panel" data-vis style="--i:1">
        <h3 class="mini">Kommende starter</h3>
        ${o.kommende.length ? kommendeListe(o.kommende.slice(0, 5)) : ingenStarter()}
        <h3 class="mini mini--luft">Formkurve</h3>
        ${formkurve(o.seneste)}
      </div>
    </div>
  </div>
</section>

<section class="sek sek--lys sek--gloed">
  <div class="wrap duo">
    <div>
      ${etiket('Banerne', ' data-vis')}
      <h2 data-vis style="--i:1">Hjemme på Lunden – ude i hele landet</h2>
      <p class="indled" data-vis style="--i:2">${baneTekst(o)}</p>
      <div data-vis style="--i:3">${banebjaelker(o.sejrsbaner)}</div>
    </div>
    <figure class="kort" data-vis style="--i:2">
      ${danmarkskort(o.sejrsbaner, `Danmarkskort med staldens sejre og starter pr. bane i ${o.saeson.aar}: ${o.sejrsbaner.map((b) => `${b.navn} ${sejreTekst(b.sejre)} på ${b.antal} starter`).join(', ')}.`)}
      <figcaption>Sejre pr. dansk bane i ${o.saeson.aar}. Boblens størrelse viser antal starter, og ringen markerer hjemmebanen.</figcaption>
    </figure>
  </div>
</section>
${partnere()}
${foelg(o.fb)}
${kontaktbaand()}`;
};

// Karrieren i nedslag. Kilder: Travsportens Hall of Fame (thof.dk), da.wikipedia.org (Steen Juul; Dansk Trav Derby),
// Sjællandske Medier (1. december 2024) og Charlottenlund Travbanes løbsprogram (5. januar 2025, Årets kusk 2024).
const KARRIERE = [
  { aar: '1968', titel: 'Debut med sejr', tekst: 'Lidt over en uge efter sin 18-års fødselsdag kører Steen sit første løb – den 31. august 1968 med Karat. Det bliver til sejr i første forsøg.', loeb: [] },
  { aar: '1974', titel: 'Egen stald', tekst: 'Som 24-årig bliver han selvstændig træner den 1. december 1974. To år senere tager han championatet i Skive fra banens syvdobbelte champion.', loeb: [] },
  { aar: '1980', titel: 'Landschampion', tekst: 'I 1977 slår han Tarok i Skovbo Eliteløb med Pondus Hanover til odds 26. I 1980 bliver han landschampion for første gang – med en ny sæsonrekord på 216 sejre.', loeb: [] },
  { aar: '1983', titel: 'Til Charlottenlund', tekst: 'Flytter til Lunden den 15. januar 1983. Samme år sætter Dilli Hanover verdensrekord for hopper på 1000-meterbane, 1.13,5 – og For Ever Vixi giver den første derbysejr.', loeb: [] },
  { aar: '2002', titel: 'Legendary Lover K', tekst: 'Copenhagen Cup, Elite Rennen og den hidtil eneste dansktrænede samlede sejr i den europæiske Grand Circuit. Sæsonen giver 5.143.947 kr.', loeb: [] },
];
// Dansk Trav Derby som kusk (da.wikipedia.org, thof.dk). Som træner desuden Chock Nock i 2018 med Björn Goop i sulkyen.
const DERBY = [[1983, 'For Ever Vixi'], [1987, 'Konsonant'], [1990, 'New Quick'], [1993, 'Rudolf Le Ann'], [1994, 'Skalflex'], [1997, 'Atom Tess'], [2007, 'Leviti'], [2017, 'Bvlgari Peak'], [2020, 'Extreme'], [2021, 'Festival of Speed']];
// Championater som kusk: [antal, bane]. Kilder: da.wikipedia.org (til og med 2023), Charlottenlunds løbsprogram (Årets kusk 2024).
const CHAMPIONATER = [[35, 'Lunden'], [8, 'Danmark'], [7, 'Skive'], [5, 'Odense'], [4, 'Skovbo'], [2, 'Billund']];

const tidslinje = () => {
  const max = Math.max(...CHAMPIONATER.map(([n]) => n));
  const punkt = (i, aar, indhold, cls = '') => `
      <li data-vis style="--i:${i}"><span class="tidslinje__aar">${aar}</span><div class="tidslinje__kort${cls}">${indhold}
      </div></li>`;
  const kort = (p, i) => punkt(i, p.aar, `
        <h3>${p.titel}</h3>
        <p>${p.tekst}</p>${p.loeb.length ? `
        <ul class="loebsliste">${p.loeb.map((l) => `<li>${l}</li>`).join('')}</ul>` : ''}`);
  return `
<section class="sek sek--lys sek--gloed">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Karrieren', ' data-vis')}
        <h2 data-vis style="--i:1">Ti derbysejre og næsten 8.000 sejre</h2>
      </div>
      <p data-vis style="--i:2">Udvalgte højdepunkter fra mere end 55 år i sulkyen.</p>
    </div>
    <ol class="tidslinje">${KARRIERE.map(kort).join('')}${kort({ aar: '1983–2021', titel: 'Ti gange Dansk Trav Derby', tekst: 'Ti sejre som kusk i Dansk Trav Derby – og dermed tangerer Steen N. J. Kosters rekord.', loeb: DERBY.map(([aar, hest]) => `${hest} ${aar}`) }, KARRIERE.length)}${punkt(KARRIERE.length + 1, '1976–2024', `
        <h3>Championater som kusk</h3>
        <p>Den kusk, der vinder flest løb på en bane i løbet af et år, bliver banens champion. På Charlottenlund er det blevet til 35 – fra 1985 til 2024.</p>
        <div class="mestre" role="img" aria-label="Championater som kusk: ${CHAMPIONATER.map(([n, sted]) => `${sted} ${n}`).join(', ')}">${CHAMPIONATER.map(([n, sted], k) => `<div style="--h:${Math.round((n / max) * 100)}%;--n:${k}"${n === max ? ' class="mestre__bedst"' : ''}><b>${n}</b><i></i><span>${sted}</span></div>`).join('')}</div>`)}${punkt(KARRIERE.length + 2, 'I dag', `
        <b class="tidslinje__tal">8.000</b>
        <h3>sejre – næsten</h3>
        <p>Officielt 7.602 sejre som kusk pr. 1. april 2020. Ved 50-års jubilæet som træner i december 2024 var han ifølge Sjællandske tæt på 8.000.</p>`, ' tidslinje__kort--stor')}
    </ol>
  </div>
</section>`;
};

const omSteen = (o, data) => `
${sidehoved({
  sti: 'Om Steen',
  h1: 'Steen Juul',
  tekst: `Født i ${data.traener.foedt}. Kørte sit første løb i 1968, blev træner i 1974 og har haft Charlottenlund som hjemmebane siden 1983. Optaget i Travsportens Hall of Fame.`,
  figur: ['copperfield', 'En ung Steen Juul med Copperfield og en buket · Foto: Burt Seeger'],
  chips: [['1968', 'debut'], ['10', 'derbysejre som kusk'], [esc(data.traener.licens), 'licens']],
})}

<section class="sek sek--lys sek--gloed">
  <div class="wrap artikel">
    <aside class="fakta" data-vis>
      <figure class="fakta__foto">${billede('daekken', 'Steen Juul smiler i sulkyen efter en sejr', { sizes: '(min-width: 901px) 340px, 92vw' })}</figure>
      <dl>
        <div><dt>Født</dt><dd>20. august 1950</dd></div>
        <div><dt>Første løb</dt><dd>31. august 1968 – Karat</dd></div>
        <div><dt>Træner siden</dt><dd>1. december 1974</dd></div>
        <div><dt>Licens</dt><dd>${esc(data.traener.licens)} – professionel træner og kusk</dd></div>
        <div><dt>Hjemmebane</dt><dd>Charlottenlund Trav – siden 1983</dd></div>
        <div><dt>Løbsfarver</dt><dd class="fakta__farver">${prikker(loebsfarver(data))}<span>Rød og grøn</span></dd></div>
        <div><dt>Dansk Trav Derby</dt><dd>10 sejre som kusk</dd></div>
        <div><dt>Heste i træning</dt><dd>${o.heste.length}</dd></div>
      </dl>
    </aside>
    <div class="prosa">
      ${etiket('Historien', ' data-vis')}
      <h2 data-vis>Skive-drengen</h2>
      <p class="indled" data-vis>${SITE.person} er født den 20. august 1950 og lærte faget hos Victor Borregård i Skive og senere hos Jørgen Hill og svigerfaren Børge Simonsen i Aarhus.</p>
      <p data-vis>Debuten kom den 31. august 1968 med Karat – og blev til sejr i første forsøg. Den 1. december 1974 blev han som 24-årig selvstændig træner, og i 1980 blev han landschampion for første gang med en ny sæsonrekord på 216 sejre.</p>
      <p data-vis>Copperfield, som Steen selv kalder den første store stjerne i stalden, vandt blandt andet Fyens 4-års Grand Prix og Aalborg Store Pris og blev nr. 3 i Dansk Trav Derby.</p>
      <h2 data-vis>Lunden</h2>
      <p data-vis>Den 15. januar 1983 flyttede Steen Juul til Charlottenlund. Samme år vandt Dilli Hanover i 1.13,5 – verdensrekord for hopper på 1000-meterbane – og For Ever Vixi gav den første derbysejr. Hesten var købt i Sverige godt en uge før løbet.</p>
      <figure class="prosa__foto" data-vis>${billede('vixi-ejer', 'For Ever Vixi med Steen Juul og ejeren Ivar Hvidtfeldt', { sizes: '(min-width: 1000px) 60vw, 92vw' })}<figcaption>For Ever Vixi med Steen Juul og ejeren Ivar Hvidtfeldt · Foto: Burt Seeger</figcaption></figure>
      <p data-vis>I 1985 fulgte det første Kriterium med Join Løjbjerg og det første af 35 championater på Charlottenlund til og med 2024.</p>
      <h2 data-vis>Ude i Europa</h2>
      <p data-vis>Det største år ude kom i 2002. Legendary Lover K vandt Copenhagen Cup, Elite Rennen i Gelsenkirchen, Momarken Grand Prix og Kymi Grand Prix og blev den hidtil eneste dansktrænede samlede vinder af den europæiske Grand Circuit. Året efter blev parret nr. 7 i Prix d’Amérique.</p>
      <figure class="prosa__foto" data-vis>${billede('k-2002', 'Legendary Lover K vinder Copenhagen Cup 2002', { sizes: '(min-width: 1000px) 60vw, 92vw' })}<figcaption>Legendary Lover K vinder Copenhagen Cup 2002 · Kilde: thof.dk</figcaption></figure>
      <h2 data-vis>I dag</h2>
      <p data-vis>${SITE.navn} har ${o.heste.length} heste på træningslisten og stalden i ${SITE.sted} ved ${SITE.by}. I ${o.saeson.aar} er det indtil videre blevet til ${o.saeson.sejre} sejre på ${o.saeson.starter} starter som træner${o.jockey ? ` – og staldens jockey, ${SITE.kusk.navn}, kører mange af hestene` : ''}.</p>
      <p class="valg" data-vis>${ekstern(SITE.travinfo, 'Profilen på Travinfo')} ${ekstern(SITE.thof, 'Hall of Fame-artiklen')}</p>
      <p class="note" data-vis>Kilder: Travsportens Hall of Fame (thof.dk), da.wikipedia.org (Steen Juul; Dansk Trav Derby), Sjællandske Medier (1. december 2024), Team Juul på Facebook og Dansk Hestevæddeløb.</p>
    </div>
  </div>
</section>

<section class="sek sek--moerk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Statistik', ' data-vis')}
        <h2 data-vis style="--i:1">Sæson for sæson</h2>
      </div>
      <p data-vis style="--i:2">Officielle tal fra Dansk Hestevæddeløb, opdateret ${o.opdateret}.</p>
    </div>
    <div class="tabeller" data-vis>
      ${statTabel('Som træner', data.traenerStatistik)}
      ${statTabel('Som kusk', data.kuskStatistik)}
    </div>
  </div>
</section>
${tidslinje()}
${partnere()}
${kontaktbaand()}`;

const stalden = (o) => `
${sidehoved({
  sti: 'Stalden',
  h1: 'Stalden',
  tekst: `${SITE.navn} har adresse i ${SITE.sted} ved ${SITE.by} og Charlottenlund Trav som hjemmebane – med ${o.heste.length} heste på træningslisten, fra åringer til rutinerede løbsheste.`,
  foto: 'gorm',
  pos: '50% 50%',
  kredit: 'Foto: Gormfoto',
  chips: [[o.heste.length, 'heste i træning'], [`${o.aldre[0]}–${o.aldre[1]}`, 'år gamle'], [o.banetal.length, `baner i ${o.saeson.aar}`]],
})}

<section class="sek sek--lys sek--gloed">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Det tilbyder stalden', ' data-vis')}
        <h2 data-vis style="--i:1">Fra første tilkøring til målstregen</h2>
      </div>
      <p data-vis style="--i:2">Kontakt ${SITE.fornavn} for pris.</p>
    </div>
    ${ydelser(o)}
  </div>
</section>

<section class="sek sek--moerk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Hverdagen', ' data-vis')}
        <h2 data-vis style="--i:1">Løbsdage</h2>
      </div>
      <p data-vis style="--i:2">Billeder fra Team Juuls Facebook-side.</p>
    </div>
    ${galleri()}
  </div>
</section>

<section class="sek sek--lys sek--gloed">
  <div class="wrap duo">
    <div>
      ${etiket('Hjemmebanen', ' data-vis')}
      <h2 data-vis style="--i:1">Charlottenlund Trav</h2>
      <p class="indled" data-vis style="--i:2">Nordens ældste travbane, grundlagt i 1891 – og banen, hvor Dansk Trav Derby køres hvert år. Steen Juul har haft Lunden som base siden den 15. januar 1983.</p>
      <p data-vis style="--i:3">${baneTekst(o)}</p>
      <div data-vis style="--i:4">${banebjaelker(o.sejrsbaner)}</div>
      <p class="valg" data-vis style="--i:5">${ekstern(SITE.hjemmebane, 'travbanen.dk')}</p>
    </div>
    <figure class="kort" data-vis style="--i:2">
      ${danmarkskort(o.sejrsbaner, `Danmarkskort med staldens sejre og starter pr. bane i ${o.saeson.aar}: ${o.sejrsbaner.map((b) => `${b.navn} ${sejreTekst(b.sejre)} på ${b.antal} starter`).join(', ')}.`)}
      <figcaption>Sejre pr. dansk bane i ${o.saeson.aar}. Boblens størrelse viser antal starter, og ringen markerer hjemmebanen.</figcaption>
    </figure>
  </div>
  <div class="wrap adresse-blok">
    <div class="adresse" data-vis>
      <div>
        ${etiket('Adresse')}
        <address class="adresse__stor">${SITE.navn}<br>${SITE.gade}, ${SITE.sted}<br>${SITE.postnr} ${SITE.by}</address>
      </div>
      <p>${ekstern(SITE.kort, 'Åbn i Google Maps', 'knap knap--blaa')}</p>
    </div>
  </div>
</section>
${partnere()}
${kontaktbaand()}`;

const heste = (o) => `
${sidehoved({
  sti: 'Heste',
  h1: 'Heste i træning',
  tekst: 'Træningslisten kommer direkte fra Dansk Hestevæddeløb og følger automatisk med, når heste kommer til eller rejser videre.',
  foto: 'sort',
  pos: '50% 50%',
  chips: [[o.heste.length - o.ungheste.length, 'løbsheste'], [o.ungheste.length, 'ungheste']],
})}

${o.kortheste.length ? `
<section class="sek sek--moerk sek--smal">
  <div class="wrap">
    ${etiket('Fra banen', ' data-vis')}
    ${hestekort(o.kortheste)}
  </div>
</section>` : ''}

<section class="sek sek--lys sek--gloed">
  <div class="wrap">
    ${hestegruppe('Løbsheste', o.heste.filter((h) => h.alder >= 3))}
    ${hestegruppe('2-årige', o.heste.filter((h) => h.alder === 2))}
    ${hestegruppe('Åringer', o.heste.filter((h) => h.alder <= 1))}
    <p class="note" data-vis>Starter, placeringer (1.–2.–3.), præmiesum og rekord er livstal. Rekorden er hestens hurtigste kilometertid; a = autostart, k/m/l = kort, mellem og lang distance. Klik på en hest for at se den på Travinfo. Kilde: Dansk Hestevæddeløb, opdateret ${o.opdateret}.</p>
  </div>
</section>
${kontaktbaand()}`;

const resultater = (o, data) => `
${sidehoved({
  sti: 'Resultater',
  h1: 'Resultater',
  tekst: `Staldens seneste starter, kommende løb og sæsonens tal. Data kommer fra Dansk Hestevæddeløb og er senest opdateret ${o.opdateret}.`,
  foto: 'aarhus',
  pos: '50% 55%',
  chips: [[o.saeson.sejre, `sejre i ${o.saeson.aar}`], [`${o.saeson.procent} %`, 'sejrsprocent']],
})}

<section class="sek sek--lys sek--gloed">
  <div class="wrap">
    ${etiket(`Sæson ${o.saeson.aar}`, ' data-vis')}
    <dl class="kpi" data-vis>
      <div><dt>Starter</dt><dd>${o.saeson.starter}</dd></div>
      <div><dt>Sejre</dt><dd>${o.saeson.sejre}</dd></div>
      <div><dt>2.-pladser</dt><dd>${o.saeson.toer}</dd></div>
      <div><dt>3.-pladser</dt><dd>${o.saeson.treer}</dd></div>
      <div><dt>Sejrsprocent</dt><dd>${o.saeson.procent}<small>%</small></dd></div>
      <div><dt>Indkørt</dt><dd>${nf(o.saeson.praemier)}<small>kr.</small></dd></div>
    </dl>
    <div class="formboks" data-vis style="--i:1">
      <h3 class="mini">Formkurve – de seneste ${o.seneste.length} starter</h3>
      ${formkurve(o.seneste)}
    </div>${o.storloeb.length ? `
    <div class="formboks" data-vis style="--i:2">
      <h3 class="mini">Storløbssejre</h3>
      <ul class="storloeb">${o.storloeb.slice(0, 8).map((s) => `
        <li><b>${esc(s.navn && !/^Løb \d+$/.test(s.navn) ? s.navn : 'Storløbssejr')}</b><span>${esc(s.hest)} · ${esc(bane(s.bane))}, ${langDato(s.dato)}${tid(s.tid) ? ` · ${tid(s.tid)}` : ''}</span><em>${kr(s.praemie)}</em></li>`).join('')}
      </ul>
      <p class="note">Sejre med mindst 100.000 kr. i førstepræmie. Listen opdateres automatisk fra Dansk Hestevæddeløb.</p>
    </div>` : ''}
  </div>
</section>

<section class="sek sek--moerk">
  <div class="wrap resgitter">
    <div class="panel" data-vis>
      <h2 class="mini">De seneste ${o.seneste.length} starter</h2>
      ${resultatliste(o.seneste)}
      <p class="note">Tider er kilometertider. a = autostart, g = galop undervejs. – = uplaceret, disk. = diskvalificeret.</p>
    </div>
    <div class="panel" data-vis style="--i:1">
      <h2 class="mini">Kommende starter</h2>
      ${o.kommende.length ? kommendeListe(o.kommende) : ingenStarter()}
    </div>
  </div>
</section>

<section class="sek sek--lys sek--gloed">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Statistik', ' data-vis')}
        <h2 data-vis style="--i:1">Sæson for sæson</h2>
      </div>
      <p data-vis style="--i:2">Alle resultater og detaljer findes hos Dansk Hestevæddeløb. ${ekstern(SITE.travinfo, 'Åbn Travinfo')}</p>
    </div>
    <div class="tabeller" data-vis>
      ${statTabel('Som træner', data.traenerStatistik)}
      ${statTabel('Som kusk', data.kuskStatistik)}
    </div>
  </div>
</section>
${kontaktbaand()}`;

const kontakt = () => `
${sidehoved({
  sti: 'Kontakt',
  h1: 'Kontakt stalden',
  tekst: 'Har du en hest, der skal i træning, eller en unghest, der skal køres til? Ring, send en sms eller skriv til holdet på Facebook.',
  foto: 'buket',
  pos: '40% 45%',
})}

<section class="sek sek--lys sek--gloed">
  <div class="wrap kontakt">
    <div class="kontakt__felt kontakt__felt--tlf" data-vis>
      <h2 class="mini">Telefon</h2>
      <p class="kontakt__stor"><a href="tel:${tlfLink}">${SITE.telefon}</a></p>
      <p class="valg"><a class="knap knap--hvid" href="tel:${tlfLink}">Ring op ${pil}</a> <a class="link link--lys" href="sms:${tlfLink}">Send en sms ${pil}</a></p>
    </div>
    <div class="kontakt__felt" data-vis style="--i:1">
      <h2 class="mini">Facebook</h2>
      <p class="kontakt__stor kontakt__stor--mail"><a href="${SITE.facebook}" target="_blank" rel="noopener">facebook.com/<wbr>teamsteenjuul${nyFane}</a></p>
      <p class="valg">${ekstern(SITE.facebook, 'Skriv til Team Juul', 'knap knap--blaa')}</p>
    </div>
    <div class="kontakt__felt kontakt__felt--kort" data-vis style="--i:2">
      <div>
        <h2 class="mini">Stalden</h2>
        <address class="kontakt__adr">${SITE.navn}<br>${SITE.gade}, ${SITE.sted}<br>${SITE.postnr} ${SITE.by}</address>
        <p class="valg">${ekstern(SITE.kort, 'Find vej')}</p>
      </div>
      <div class="kort kort--mini">${danmarkskort([{ kode: 'Os', navn: 'Osted' }], 'Danmarkskort, hvor Osted ved Lejre er markeret')}</div>
    </div>
  </div>${harFoelg() ? `
  <div class="kontakt__foelg">${foelgIndhold()}
  </div>` : ''}
</section>`;

const ikkeFundet = () => `
<section class="sidehoved sidehoved--enkel">
  <div class="sidehoved__foto">${billede('nat-6', '', { lazy: false })}</div>
  <div class="wrap sidehoved__inner">
    ${etiket('Fejl 404', '')}
    <h1>Siden findes ikke</h1>
    <p class="indled">Adressen er forkert, eller siden er flyttet.</p>
    <p class="valg">${knap('', 'Til forsiden')}</p>
  </div>
</section>`;

/** Alle sider som [{ sti, html }]. `idag` er YYYY-MM-DD, `v` et versionsmærke til css/js. */
export function sider(data, { v, idag, kort }) {
  V = v;
  KORT = kort;
  const o = afled(data, idag);
  const side = (sti, def) => {
    R = sti === '404.html' ? new URL(SITE.url + '/').pathname : sti ? '../' : '';
    return { sti: sti.endsWith('.html') ? sti : `${sti}index.html`, url: sti, html: layout({ sti, o, ...def() }) };
  };
  return [
    side('', () => ({
      titel: `${SITE.navn} – travtræner ${SITE.person}, Charlottenlund`,
      beskrivelse: `${SITE.person} og ${SITE.navn}: travtræning med Charlottenlund Trav som hjemmebane. ${o.heste.length} heste i træning, ti derbysejre som kusk og en plads i Travsportens Hall of Fame.`,
      klasse: 'forside',
      indhold: forside(o, data),
    })),
    side('om-steen/', () => ({
      titel: `Om ${SITE.person} – travtræner og kusk | ${SITE.navn}`,
      beskrivelse: `${SITE.person}: travtræner og kusk siden 1968, ti derbysejre som kusk, 35 championater på Charlottenlund og optaget i Travsportens Hall of Fame.`,
      indhold: omSteen(o, data),
    })),
    side('stalden/', () => ({
      titel: `Stalden – travtræning på Charlottenlund | ${SITE.navn}`,
      beskrivelse: `${SITE.navn} har adresse på ${SITE.gade} i ${SITE.sted} ved ${SITE.by} og Charlottenlund Trav som hjemmebane. Træning af løbsheste og tilkøring af ungheste.`,
      indhold: stalden(o),
    })),
    side('heste/', () => ({
      titel: `Heste i træning | ${SITE.navn}`,
      beskrivelse: `Se de ${o.heste.length} travheste, der lige nu er i træning hos ${SITE.person} – med afstamning, starter, præmiesum og rekord.`,
      indhold: heste(o),
    })),
    side('resultater/', () => ({
      titel: `Resultater og statistik | ${SITE.navn}`,
      beskrivelse: `Seneste resultater, kommende starter og sæsonstatistik for travtræner ${SITE.person}: ${o.saeson.sejre} sejre på ${o.saeson.starter} starter i ${o.saeson.aar}.`,
      indhold: resultater(o, data),
    })),
    side('kontakt/', () => ({
      titel: `Kontakt ${SITE.person} | ${SITE.navn}`,
      beskrivelse: `Kontakt ${SITE.navn}: telefon ${SITE.telefon} eller Facebook. Stalden har adresse på ${SITE.gade}, ${SITE.sted}, ${SITE.postnr} ${SITE.by}.`,
      indhold: kontakt(),
    })),
    side('404.html', () => ({
      titel: `Siden findes ikke | ${SITE.navn}`,
      beskrivelse: `Siden findes ikke. Gå til forsiden for ${SITE.navn} – travtræner ${SITE.person} på Charlottenlund.`,
      noindex: true,
      indhold: ikkeFundet(),
    })),
  ];
}
