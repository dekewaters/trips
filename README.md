# trips

Phone-first trip sites. One shared engine, and each trip is a single data file.

Live: https://dekewaters.github.io/trips/

| Folder | What |
| --- | --- |
| `engine/` | Shared app (`app.js`, `app.css`). Every trip loads it, so keep changes backward compatible. |
| `_template/` | Copy this to start a trip. `trip.js` documents every field. |
| `shanghai-2026/` | Reference trip (VCT Champions, Oct 2026). |
| `tools/check.py` | Headless smoke test: `python3 tools/check.py <folder> --shots` |
| `PLAYBOOK.md` | How Claude interviews, researches, builds and publishes a new trip. |

## New trip
1. `cp -r _template tokyo-2027`
2. Fill in `tokyo-2027/trip.js`, set the title in `tokyo-2027/index.html`, bump `?v=`.
3. Add a link to the top of `index.html`.
4. `python3 tools/check.py tokyo-2027 --shots`
5. Commit and push. It's live at `/trips/tokyo-2027/` in about a minute.

This repo is public. Never commit booking codes, confirmation numbers, passport numbers or card numbers.
