# AI Prompt Finder

A static, offline-capable prompt library with deterministic local search, editable templates, favorites, personal prompts, import/export, and ChatGPT/Codex handoff.

## Run locally

Install Node.js 20.19 or later, then double-click `Open AI Prompt Finder.bat`. It opens a visible server window and launches the app in your browser at `http://127.0.0.1:5173/`. Keep the server window open while using the app; close it to stop the local server. The launcher installs dependencies if they are missing. To start it manually, run `npm install`, `npm run dev`, and open the local URL printed by Vite. Run `npm test` and `npm run build` to verify.

## GitHub Pages

The public site is deployed from `main` by the GitHub Actions workflow in `.github/workflows/deploy.yml`. The Vite build uses relative asset paths (`base: './'`) for project subpaths. The service worker caches the built application on first successful visit; later visits can work offline.

## Collection A source and reuse

The 99 item identities, numbering, titles, quick labels, category positions, and source attribution refer to [AI郵報's article](https://www.aiposthub.com/chatgpt-99-prompts-guide/). The article supplies prompt templates rather than a separate description field; the app's descriptions and templates are independently written adaptations. The complete original templates are not redistributed because no reuse permission was established. Please consult the source for its original wording.

Collection B contains independently authored community-style conventions. Slash names are not claims of official OpenAI functionality. Search is deterministic keyword, alias, and synonym matching; it is not AI semantic understanding.

Personal prompts and preferences are stored in this browser on this device. They do not sync between Windows, iPhone, and Android. Export a JSON backup to move data. No backend, account, paid service, or AI API is used.
