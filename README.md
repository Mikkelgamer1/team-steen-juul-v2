# Team Steen Juul – version 2

Statisk site for Team Steen Juul og travtræner Steen Juul (licens 3106) i samme opbygning som Team Friis, Team Jeppe Juel og Stald Magnus M Nielsen: forside, Om Steen, Stalden, Heste, Resultater og Kontakt. Ingen afhængigheder – kræver kun Node 20+.

Version 1 ligger uændret i repoet `team-steen-juul`. Version 2 er enklere: ingen derbybane, kusk-sektion eller tunge rulleeffekter.

```
node build.mjs            byg til dist/ med de gemte data
node build.mjs --hent     hent friske data fra Dansk Hestevæddeløb først
node build.mjs --serve    byg og vis på http://localhost:4173 (PORT=… for en anden port)
node build.mjs --test     selvtjek
```

## Det opdaterer sig selv

- **Heste i træning, resultater, kommende starter, statistik og storløbssejre** hentes fra Dansk Hestevæddeløbs åbne data og gemmes i `data/travinfo.json`.
- `.github/workflows/opdater.yml` henter data hver morgen ca. kl. 6 og gemmer dem i repoet – så bygger Vercel en ny udgave. Fejler hentningen, bygges der videre med de gemte data.
- Hestekortene med billeder (`HESTEFOTO` i `templates.mjs`) forsvinder af sig selv, når en hest forlader træningslisten.
- På en `vercel.app`-adresse holdes sitet ude af søgemaskinerne, så det ikke konkurrerer med version 1. Med eget domæne (miljøvariablen `SITE_URL`) åbnes der.

## Ret indhold

- Tekster og kontaktoplysninger: `templates.mjs` (`SITE` øverst).
- Design: `assets/css/site.css` – farverne øverst: mørk grøn, smaragd og mint med rødt som accent (løbsfarverne rød og grøn). Skrift: Archivo.
- Facebook-opslag kan vises som kort på forsiden, når secret `FB_TOKEN` og variablen `FB_SIDE` er sat i GitHub (se README i `team-steen-juul`).

## Kilder

Fakta, billeder og kilder er de samme som i version 1: Travsportens Hall of Fame (thof.dk), da.wikipedia.org, Sjællandske Medier (1. december 2024), Charlottenlund Travbanes løbsprogram (5. januar 2025), travet.dk, Team Juuls Facebook-side og fotograferne nævnt ved billederne (Burt Seeger, Kjeld Mikkelsen, Gormfoto, Ole Hindby). Tal: Dansk Hestevæddeløb.
