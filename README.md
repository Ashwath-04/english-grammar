# English Grammar

A website that explains the grammar in the **TN State Board Class 11 and Class 12 English** textbooks, in simple English, with examples, common mistakes and practice questions.

- Searchable: the search bar finds topics, rules and grammar terms.
- Installable: it works as an app on phones (a PWA), and pages that have been opened work offline.
- Static: no server or database. It is hosted on Vercel and stays online on its own.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). Search is provided by [Pagefind](https://pagefind.app), which is built into Starlight.

## Adding content

See [CONTRIBUTING.md](CONTRIBUTING.md). Pages can be added or edited directly on the GitHub website. The site rebuilds automatically after each commit.

## Project layout

```
src/content/docs/        All pages (Markdown)
  index.mdx              Home page
  start-here.md
  foundation/            Foundation refresher (F1 to F5)
  topics/                One folder per grammar topic (T1 to T13)
  reference/             Quick-reference tables
src/components/          Small changes to Starlight's layout (class labels, search keywords)
src/content.config.ts    The fields allowed at the top of each page
src/styles/custom.css    Colours and text size
public/                  App icons, manifest and service worker (for installing on phones)
_templates/              Templates for new lessons and practice pages
astro.config.mjs         Site title, menu (sidebar) and settings
```

## Running it on your computer (optional)

You only need this to preview changes before publishing. It needs [Node.js](https://nodejs.org) 22.12 or newer.

In PowerShell, from the project folder:

```powershell
npm install
npm run dev       # preview at http://localhost:4321 (search does not work in this mode)
npm run build     # build the full site into dist/, including the search index
npm run preview   # preview the built site, with search
```

## Deploying

The site is deployed on Vercel from this repository:

1. In Vercel, choose **Add New → Project** and import this GitHub repository.
2. Vercel detects Astro automatically. Keep the default settings (build command `npm run build`, output folder `dist`).
3. Click **Deploy**.

After that, every commit to the `main` branch updates the live site automatically.
