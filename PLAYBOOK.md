---
name: trip-site-builder
description: Use when Deke wants to plan a trip or build a phone trip site for a new destination. Interviews him, researches, fills a trip.js in the dekewaters/trips repo and publishes it to GitHub Pages.
---

# Trip site builder

Builds a phone-first trip site like the Shanghai 2026 one: a schedule that knows today's date, shows leave-by times and has a running-late mode, plus "show the driver" cards, near-here search, emergency info, a currency converter and tips. One engine is shared by every trip. Each trip is just a data file.

Repo: `dekewaters/trips` (public). Live at `https://dekewaters.github.io/trips/<folder>/`.
- `engine/app.js`, `engine/app.css`: shared engine. Don't edit it for a single trip.
- `_template/`: copy this for a new trip. `trip.js` documents every field.
- `shanghai-2026/`: the full reference example. Read it before building.
- `tools/check.py`: headless smoke test and screenshots.
- `index.html`: list of trips.

## 1. Set up
1. `add_repo` dekewaters/trips with push access, clone it, then read `README.md`, `_template/trip.js` and `shanghai-2026/trip.js`.
2. Make a task list: interview, research, draft plan, build, check, publish, extras.

## 2. Interview (AskUserQuestion, up to 4 questions per round, never ask what research can answer)
- **Round 1, logistics:** destination and dates; flights (or ask him to attach the itinerary); hotel name or address; why he's going and the fixed commitments (event times, dinners, work blocks), so the free windows are clear.
- **Round 2, style:** earliest start each day; pace; interests and hard no's (in Shanghai: no museums; shops and unique sights); food (must-try dishes, dietary limits, budget); walking, transit or taxis.
- **Round 3, people:** who else will use the site, and their passports, for visa checks; anything that must stay private.
- Before building around an event, ask **"when do you actually need to be at the venue?"** The default arrival of 45 minutes before can be wrong for staff.
- Keep his style rules: ruthless-mentor pushback, follow-up questions at the end, no em dashes.

## 3. Research rules (lessons from Shanghai)
- **Read everything he attached first**, especially guides with food sections. He called this out when it was missed.
- **Verify every restaurant and shop is open:** `places_search` and check the hours. Drop anything you can't verify. Write "hours not posted" when that's the honest answer.
- **Get event times early.** Real match times rewrote three days of the Shanghai plan. Anything that opens after the event starts is out for that day.
- **Hotel names change.** Confirm the current listing; "Middle House" was really "Upper House".
- **Local script only when you're sure.** Never guess characters. When unsure, use the street address, or leave `local` empty.
- Find sunset times for each day.
- **Emergency:** local numbers. English-speaking hospitals near the hotel AND near the main venue; his own list may cover only one side of town. For the consulate, find where passport services actually are. In Shanghai, American Citizen Services was in Westgate Mall, not at the main consulate address.
- **Country pack:** which map, review, ride-hailing and payment apps locals use; what's blocked; eSIM vs local wifi; the visa rule for each passport; arrival card.
  - **China:** `links ["apple","amap","dianping"]`, `near.provider "amap"` with Chinese keywords (咖啡, 小吃, 厕所), `amapCity` code. Pay with Alipay, with DiDi inside it. Google and many western sites are blocked on local wifi.
  - **Korea:** `["naver","google"]`; Naver Map is the local standard.
  - **Japan, Europe, US:** `["google","apple"]`.
- **Links:** prefer app links over website search pages that require a login. Rednote's web search needed a login and failed; the Amap website opened instead of the app until it was switched to the `iosamap://` format. Only add a provider whose URL format is documented or confirmed by two sources, and have him tap one on his phone before calling it done.

## 4. Plan rules
- Nothing before his stated start time.
- Mark flights, reservations and dinners as `fixed`, and leave travel time before each one (`go`).
- Mark the stops to drop first as `cut`. The running-late banner uses them.
- For each day: one lunch plan near the route plus two verified backups. Coffee and quick bites near the hotel.
- Give each day a one-line `sub`, a `carry` chip and a sunset time.
- Give each sight and food stop a `more` blurb with "don't miss" spots (verified shops and dishes). The same content can make a places-guide PDF as an offline backup.
- Include a jet lag plan for long-haul trips; that one goes in the chat reply or doc, not the site.
- Before building, show him the day-by-day plan in chat and get his OK. Rewriting data later costs more.

## 5. Build
1. `cp -r _template <city>-<year>`. Fill in `trip.js`, set `<title>` and the Home Screen name in `index.html`, and bump both `?v=` values to today (YYYYMMDD).
2. Add the trip to the top of the root `index.html` list.
3. **Public repo (his choice: Option 1, public and trimmed):** NO booking codes, confirmation numbers, passport or card numbers. Leave private fixed events (team or client dinners, meetings, anyone else's plans) off the site by default; they go in the private doc or PDF. Booking references belong only in private outputs.
4. Set `updated` to the current local time, so he can tell from his phone whether he has the latest version.
5. Run `python3 tools/check.py <folder> --shots`. It must show no errors and no empty days. Look at the screenshots, including the Info tab.

## 6. Privacy check (every publish, every time)
He asked to always be reminded about what he's sharing. Before every push, and in the reply after it, include a short **"What's public"** note:
- what this push exposes: hotel, dates away, daily times and places, names of other people or private events;
- anything you left out on purpose;
- a reminder that anyone with the link can see it, and that git history keeps old versions.
After the trip ends, remind him to delete the trip folder (the site goes dark; history remains).
GitHub Pages sites are public even from a private repo on personal plans. Only Enterprise Cloud adds a login. Revisit options 2 (private repo + Pro + random folder names) or 3 (Cloudflare Access) if a trip is sensitive or Riot's travel policy requires it.

## 7. Publish
- Commit with the session attribution lines and push. GitHub Pages is already on for this repo.
- Tell him: open the link in Safari, then Share → Add to Home Screen. If it looks stale, check the "updated" line; if it's old, remove and re-add the Home Screen icon.
- Updates later: edit only `trip.js`, bump `updated` and `?v=`, push.

## 8. Offer extras (only if he wants them)
- A Claude Doc with the full plan and a "worth seeing" section. Docs type.
- An offline PDF field guide (taxi cards, phrases, emergency page). It can include booking codes, because it's private.
- A message for the group: the link, how to add it to the Home Screen, which apps to install and how to set each up, and a two-tap test.

## 9. Engine changes
- Keep `engine/app.js` backward compatible, because every past trip loads it.
- To add a link provider: add it to the `P` and `PLABEL` maps (and `NEARP` if it supports near-here search), document it in `_template/trip.js`, then run `check.py` on every trip folder before pushing.
