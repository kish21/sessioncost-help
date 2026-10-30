# SessionCost help

The help website for [SessionCost](https://github.com/kish21/sessioncost): **https://kish21.github.io/sessioncost-help/**

The pages are Markdown files in `src/content/docs/`. GitHub builds the site and publishes it to GitHub Pages on every
push to `main`.

## Preview on your computer

Needs Node.js 22 or newer.

```
npm install
npm run dev        # opens http://localhost:4321/sessioncost-help/
npm run build      # the finished site, in dist/
```

## License

The site is MIT licensed (see `LICENSE`). It is built with Astro and Starlight and uses the IBM Plex fonts; their
licenses are in `CREDITS.md` and `licenses/`.
