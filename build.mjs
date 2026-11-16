#!/usr/bin/env node
// Team Steen Juul – version 2. Én side, ingen afhængigheder, kræver kun Node 20+.
//
//   node build.mjs           byg dist/index.html med de gemte data
//   node build.mjs --hent    hent friske data fra Dansk Hestevæddeløb først
//   node build.mjs --serve   byg og vis på http://localhost:4174

import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROD = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROD, 'dist');
const DATAFIL = path.join(ROD, 'data', 'travinfo.json');
const API = 'https://api.danskhv.dk/webapi/trot';
const flag = (n) => process.argv.includes(`--${n}`);

// ---------- ret indhold her ----------

const SITE = {
  navn: 'Team Steen Juul',
  licens: 3106,
  telefon: '+45 40 33 45 16',
  adresse: 'Mannerupvej 8, Osted, 4320 Lejre',
  facebook: 'https://www.facebook.com/teamsteenjuul',
  travinfo: 'https://travinfo.dk/licenseholder-tabs/3106',
  intro: 'Travstald i Osted ved Lejre med Steen Juul som træner og kusk. Hjemmebane: Charlottenlund Trav. 10 sejre i Dansk Trav Derby og optaget i Travsportens Hall of Fame.',
};

const BANER = { Sk: 'Skive', 'Ål': 'Aalborg', 'År': 'Aarhus', Od: 'Odense', Ch: 'Charlottenlund', Bi: 'Billund', Bh: 'Bornholm', Ny: 'Nykøbing F.', Bs: 'Skovbo', Kl: 'Klampenborg', 'Åb': 'Åby', 'Jæ': 'Jägersro', Ax: 'Axevalla' };

// ---------- data ----------

const tal = (s) => Number(String(s ?? '').replace(/[^\d]/g, '')) || 0;
const paentNavn = (s) => String(s ?? '').replace('*', '').trim().toLowerCase()
  .replace(/(^|[\s(-])(\p{L})/gu, (_, f, b) => f + b.toUpperCase())
  .replace(/\(([a-z]{2})\)/i, (_, l) => `(${l.toUpperCase()})`);
const kuskNavn = (s) => { const [e, ...r] = String(s ?? '').trim().split(/\s+/); return [...r, e].join(' ').trim(); };
const erStart = (r) => !r.withdrawn && r.raceType?.displayValue !== 'k' && r.placement?.displayValue !== '';

async function hent() {
  const get = async (sti) => {
    const svar = await fetch(API + sti, { signal: AbortSignal.timeout(20_000) });
    if (!svar.ok) throw new Error(`${svar.status} ${sti}`);
    return svar.json();
  };
  const L = SITE.licens;
  const stat = await get(`/licenseholders/trainers/${L}/statistics`);
  const resultater = await get(`/licenseholders/trainers/${L}/results`);
  const heste = await get(`/licenseholders/trainers/${L}/horses`);
  const kommende = await get(`/licenseholders/trainers/${L}/comingstarts`).catch(() => []);
  if (!Array.isArray(heste) || !Array.isArray(resultater) || !stat.statistics?.length) throw new Error('uventet svar fra API');
  return {
    opdateret: new Date().toISOString(),
    traenerStatistik: stat.statistics.map((s) => ({ aar: Number(s.year), starter: s.numberOfStarts, sejre: s.firstPlaces, toer: s.secondPlaces, treer: s.thirdPlaces, procent: tal(s.winningRates), praemier: tal(s.prizeMoney) })),
    heste: heste.map((h) => ({ id: h.horse.id, navn: paentNavn(h.horse.name), alder: Number(h.age), koen: h.gender?.text ?? '', praemier: h.prizeMoney ?? 0 })),
    resultater: resultater.filter(erStart).slice(0, 30).map((r) => ({ dato: r.raceInformation.date, bane: r.trackCode, hest: paentNavn(r.horse.name), placering: r.placement.displayValue, tid: r.kilometerTime.displayValue, praemie: r.prizeMoney.sortValue })),
    kommende: kommende.map((k) => ({ dato: k.raceInformation.date, bane: k.track.code, loeb: k.raceInformation.raceNumber, hest: paentNavn(k.horse.name), kusk: kuskNavn(k.driver?.name) })),
  };
}

// ---------- side ----------

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nf = (n) => Number(n).toLocaleString('da-DK');
const dato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${String(iso).slice(0, 10)}T12:00:00Z`));
const bane = (k) => BANER[k] ?? 'Udlandet';
const plac = (p) => (/^[1-9]\d*$/.test(p) ? `${p}.` : p === 'd' ? 'disk.' : '–');
const tid = (t) => (/^\d\d,\d/.test(t ?? '') ? `1.${t}` : '');

function side(data) {
  const [iAar] = data.traenerStatistik;
  const kommende = data.kommende.slice(0, 8);
  const resultater = data.resultater.slice(0, 10);
  const heste = [...data.heste].sort((a, b) => a.navn.localeCompare(b.navn, 'da'));
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${SITE.navn}</title>
<meta name="description" content="${esc(SITE.intro)}">
<link rel="stylesheet" href="site.css">
</head>
<body>
<header class="top">
  <img src="hero.webp" alt="Steen Juul med en af staldens heste" width="1170" height="658">
  <div class="wrap">
    <h1>${SITE.navn}</h1>
    <p>${esc(SITE.intro)}</p>
    <p><a class="knap" href="tel:${SITE.telefon.replace(/\s/g, '')}">Ring ${SITE.telefon}</a></p>
  </div>
</header>
<main class="wrap">
  <section>
    <h2>${iAar.aar} indtil nu</h2>
    <dl class="tal">
      <div><dt>Starter</dt><dd>${nf(iAar.starter)}</dd></div>
      <div><dt>Sejre</dt><dd>${nf(iAar.sejre)}</dd></div>
      <div><dt>Sejrsprocent</dt><dd>${iAar.procent}%</dd></div>
      <div><dt>Indkørt</dt><dd>${nf(iAar.praemier)} kr.</dd></div>
    </dl>
  </section>
  <section>
    <h2>Kommende starter</h2>
    ${kommende.length ? `<table><thead><tr><th>Dato</th><th>Hest</th><th>Bane</th><th>Kusk</th></tr></thead><tbody>
${kommende.map((k) => `<tr><td>${dato(k.dato)}</td><td>${esc(k.hest)}</td><td>${bane(k.bane)}, løb ${k.loeb}</td><td>${esc(k.kusk)}</td></tr>`).join('\n')}
</tbody></table>` : '<p>Ingen anmeldte starter lige nu.</p>'}
  </section>
  <section>
    <h2>Seneste resultater</h2>
    <table><thead><tr><th>Dato</th><th>Hest</th><th>Bane</th><th>Plac.</th><th class="h">Tid</th></tr></thead><tbody>
${resultater.map((r) => `<tr${r.placering === '1' ? ' class="sejr"' : ''}><td>${dato(r.dato)}</td><td>${esc(r.hest)}</td><td>${bane(r.bane)}</td><td>${plac(r.placering)}</td><td class="h">${tid(r.tid)}</td></tr>`).join('\n')}
</tbody></table>
  </section>
  <section>
    <h2>Heste i træning <small>(${heste.length})</small></h2>
    <ul class="heste">
${heste.map((h) => `<li><b>${esc(h.navn)}</b><span>${h.alder} år, ${esc(h.koen.toLowerCase())}</span></li>`).join('\n')}
    </ul>
  </section>
  <section>
    <h2>Kontakt</h2>
    <p>${esc(SITE.adresse)}<br>Telefon <a href="tel:${SITE.telefon.replace(/\s/g, '')}">${SITE.telefon}</a></p>
    <p><a href="${SITE.facebook}">Facebook</a> · <a href="${SITE.travinfo}">Alle tal på travinfo.dk</a></p>
  </section>
</main>
<footer class="wrap">Tal fra Dansk Hestevæddeløb, opdateret ${new Intl.DateTimeFormat('da-DK', { dateStyle: 'long', timeZone: 'Europe/Copenhagen' }).format(new Date(data.opdateret))}.</footer>
</body>
</html>
`;
}

// ---------- kør ----------

let data = JSON.parse(await readFile(DATAFIL, 'utf8').catch(() => 'null'));
if (flag('hent')) {
  try {
    data = await hent();
    await writeFile(DATAFIL, `${JSON.stringify(data, null, 1)}\n`);
    console.log('Hentede friske data.');
  } catch (fejl) {
    console.warn(`Kunne ikke hente nye data (${fejl.message}) – bygger med de gemte.`);
    if (!data) throw fejl;
  }
}
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST);
await cp(path.join(ROD, 'assets'), DIST, { recursive: true });
await writeFile(path.join(DIST, 'index.html'), side(data));
console.log(`Bygget dist/index.html (${data.heste.length} heste, ${data.resultater.length} resultater)`);

if (flag('serve')) {
  const typer = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.webp': 'image/webp' };
  const port = Number(process.env.PORT) || 4174;
  http.createServer(async (req, res) => {
    const fil = path.join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/\/$/, '/index.html'));
    if (!fil.startsWith(DIST)) return res.writeHead(403).end();
    const indhold = await readFile(fil).catch(() => null);
    if (!indhold) return res.writeHead(404).end('Ikke fundet');
    res.writeHead(200, { 'content-type': typer[path.extname(fil)] ?? 'application/octet-stream' }).end(indhold);
  }).listen(port, () => console.log(`Vis: http://localhost:${port}`));
}
