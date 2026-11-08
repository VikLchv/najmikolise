# Najmi Kolise

Interactive CV of Jan Kolátor (Kolis). The page starts locked, the way in is on the wall. After that it walks the reader through the CV as a mission.

Built with Astro and vanilla TypeScript. Music is composed in code, the films are animated in code.

## Run

```bash
npm install
npm run dev
```

## Where things live

- `src/data/mission.ts`: all CV content. A field set to `null` renders as a visible dashed gap.
- `src/components/Lock.astro`: the torch lock.
- `src/components/Journey.astro`: the CV journey, a horizontal deck of scenes (swipe, arrow keys, wheel, bottom bar).
- `src/components/EpisodePlayer.astro`: the film player with voice, subtitles and seeking.
- `src/pages/cv.astro`: the one-page PDF version of the CV.

## License

No license: all rights reserved. Texts, voice recordings and images may not be reused without permission.
