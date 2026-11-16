# Team Steen Juul – version 2

En simpel én-sides udgave. Ingen afhængigheder, kun Node 20+.

```
node build.mjs           byg dist/ med de gemte data
node build.mjs --hent    hent friske tal fra Dansk Hestevæddeløb først
node build.mjs --serve   byg og vis på http://localhost:4174
```

- Tekst og kontaktoplysninger: `SITE` øverst i `build.mjs`.
- Design: `assets/site.css`.
- `.github/workflows/opdater.yml` henter nye tal hver morgen og gemmer dem i repoet, så Vercel bygger igen.
