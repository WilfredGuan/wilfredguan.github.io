# Personal Site

Static personal website built with Jekyll, hosted on GitHub Pages.

---

## Adding content

### Naming convention

Files must be named: **`YYYY-MM-DD-title.md`**

| Part | Format | Example |
|------|--------|---------|
| Date | `YYYY-MM-DD` | `2024-03-15` |
| Title | the actual title, hyphens as spaces if needed | `spring-rain` or `花坛与我` |
| Extension | `.md` | |

Examples: `2024-03-15-spring-rain.md`, `2025-03-13-花坛与我.md`

The filename is the single source of truth — **no need to repeat `date` or `title` in front matter**. Jekyll derives both automatically from the filename. The date drives the sort order (newest first in the directory).

---

### Poems → `_poems/`

Create a file in `_poems/`:

```
_poems/2024-03-15-spring-rain.md
```

Front matter template:

```yaml
---
category: "季节"
---

Your poem here.
```

`title` and `date` are derived automatically from the filename — do not repeat them. `category` is optional: poems with the same category are grouped under a shared heading in the directory. Poems without a category appear ungrouped.

---

### Tech Artifacts → `_tech_artifacts/`

Create a file in `_tech_artifacts/`:

```
_tech_artifacts/2024-02-10-notes-on-distributed-systems.md
```

Front matter template:

```yaml
---
category: "Systems"
---

Your content here. Supports full Markdown including code blocks, headings, etc.
```

`title` and `date` are derived automatically from the filename — do not repeat them. `category` is optional: artifacts with the same category are grouped under a shared heading in the directory. Artifacts without a category appear ungrouped.

---

### Inserting images in markdown

**Step 1** — Place the image in `assets/images/`:

```
assets/images/my-photo.jpg
```

**Step 2** — Reference it in your markdown using an absolute path from the site root:

```markdown
![Alt text](/assets/images/my-photo.jpg)
```

Images are automatically styled (max-width 100%, rounded corners, border) via `.content-body img` in `style.css`.

**Do not use relative paths** like `./my-photo.jpg` or `../assets/images/my-photo.jpg` — they will break due to Jekyll's URL structure.

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
