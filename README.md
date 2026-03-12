# Personal Site

Static personal website built with Jekyll, hosted on GitHub Pages.

---

## Adding content

### Naming convention

Files must be named: **`YYYY-MM-DD-slug.md`**

| Part | Format | Example |
|------|--------|---------|
| Date | `YYYY-MM-DD` | `2024-03-15` |
| Slug | lowercase, hyphens only | `spring-rain` |
| Extension | `.md` | |

Full example: `2024-03-15-spring-rain.md`

The date drives the sort order (newest first in the directory).

---

### Poems → `_poems/`

Create a file in `_poems/`:

```
_poems/2024-03-15-spring-rain.md
```

Front matter template:

```yaml
---
title: "Spring Rain"
date: 2024-03-15
---

Your poem here.
```

---

### Tech Artifacts → `_tech_artifacts/`

Create a file in `_tech_artifacts/`:

```
_tech_artifacts/2024-02-10-notes-on-distributed-systems.md
```

Front matter template:

```yaml
---
title: "Notes on Distributed Systems"
date: 2024-02-10
---

Your content here. Supports full Markdown including code blocks, headings, etc.
```

---

### Photo

Place your photo at `assets/images/photo.jpg`, then in `index.html`:
1. Remove the `profile-photo-placeholder` div
2. Uncomment the `<img>` tag

---

## Analytics (GoatCounter)

1. Sign up free at [goatcounter.com](https://www.goatcounter.com/)
2. Get your site code (e.g. `yourname`)
3. In `_layouts/default.html`, uncomment and update:

```html
<script data-goatcounter="https://yourname.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

---

## Local preview

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000

---

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g. `yourusername.github.io`)
2. Push this directory to the `main` branch
3. In repo Settings → Pages → Source: `main` branch, `/ (root)`

GitHub builds and deploys automatically on every push.
