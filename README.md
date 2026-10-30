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

## The report tour

`public/demo/report.html` is a SessionCost report of a made-up chat, with `tour.js` and Driver.js added before
`</body>`. After the report changes, build a new demo report from the SessionCost repo (its `tools/make_demo.py`, then
`sessioncost <that file> --no-open`), and add the same four lines before `</body>` again.

## License

The site is MIT licensed (see `LICENSE`). It is built with Astro and Starlight and uses the IBM Plex fonts; their
licenses are in `CREDITS.md` and `licenses/`.
