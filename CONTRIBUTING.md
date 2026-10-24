# Adding and editing content

This guide is for staff who want to add a new lesson or fix an existing one. You do not need to install anything: everything can be done on the GitHub website.

## Where the pages are

All pages are Markdown (`.md`) files inside `src/content/docs/`:

| Folder | What it holds |
|---|---|
| `foundation/` | Foundation refresher pages (parts of speech, verb forms...) |
| `topics/t01-tenses/` ... `topics/t13-conditionals/` | One folder per grammar topic. Usually `class-11.md`, `class-11-practice.md`, `class-12.md` |
| `reference/` | Quick-reference tables |
| `start-here.md` | The "Start here" page |
| `index.mdx` | The home page |

The website address follows the file path. For example, `src/content/docs/topics/t10-questions/class-11.md` becomes `/topics/t10-questions/class-11/`.

## Edit an existing page

1. Open the file on GitHub.
2. Click the pencil icon (**Edit this file**).
3. Make your change.
4. Click **Commit changes**, write a short note about what you changed, and commit.

The website updates on its own a few minutes later.

## Add a new lesson

1. Open the topic folder on GitHub, for example `src/content/docs/topics/t04-prepositions/`.
2. Click **Add file → Create new file**.
3. Name the file, for example `class-11.md`. Use lowercase letters and hyphens only, no spaces.
4. Copy everything from [`_templates/lesson.md`](_templates/lesson.md) into it and fill it in. For a practice page, use [`_templates/practice.md`](_templates/practice.md).
5. Commit the file.

The page appears in the menu automatically. Its search entries are added automatically too.

To add a whole new topic, create a new folder under `topics/` and also add one line for it to the `topics` list at the top of `astro.config.mjs`.

## The details at the top of each page

Every page starts with a block between two `---` lines. This is the page's information:

```yaml
---
title: Question tags (Class 11)          # the page heading
description: One sentence about the page # shown in search results and link previews
classes: [11]                            # [11], [12] or [11, 12]: shows the class label
keywords: ["tag question", "aren't I"]   # extra words people may search for
reviewed: false                          # change to true once a teacher has checked it
sidebar:
  order: 1                               # position in the menu (1 comes first)
---
```

If a value contains a colon (`:`), put it in double quotes: `title: "Practice: question tags"`.

Pages with `reviewed: false` show a **Not yet reviewed** label. Once a teacher has checked the page for accuracy, change it to `reviewed: true`. The label then disappears.

## Writing style

- Long in explanation, short in sentences. Add detail with more steps and examples, not harder words.
- Keep most sentences under 20 words. Use everyday words.
- Explain every grammar term the first time it appears.
- Show an example first, then name the rule.
- Use names, places and situations students know.
- For every rule, include the common mistakes (wrong → right → why).
- Every practice answer should explain **why** it is right.
- Write your own examples. Do not copy text or exercises from the textbook.

## Handy Markdown

| You type | You get |
|---|---|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `## Heading` | a section heading (also appears in "On this page") |
| `> *Example sentence.*` | an indented example |
| `[Link text](/topics/t01-tenses/class-11/)` | a link to another page |
| `:::tip[Remember]` ... `:::` | a highlighted "Remember" box |
| `<details><summary>Show answer</summary>` ... `</details>` | a hidden answer |
