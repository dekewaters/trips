"""Smoke-test a trip folder in headless Chromium.
Usage: python3 tools/check.py <trip-folder> [--shots]
Checks: page renders, no JS errors, every day renders stops, link buttons exist, no secrets.
Writes screenshots to /tmp/tripcheck-<folder>-*.png with --shots."""
import asyncio,sys,re,pathlib
from playwright.async_api import async_playwright
SECRET=re.compile(r"(booking|confirmation|locator|PNR|passport no|record locator)\s*[:#]?\s*(?-i:[A-Z0-9]{5,8})\b",re.I)
async def main(folder,shots):
    root=pathlib.Path(__file__).resolve().parent.parent; d=root/folder
    src=(d/"trip.js").read_text()
    if SECRET.search(src): print("WARN possible booking code in trip.js:",SECRET.search(src).group(0))
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for name,ua in [("iphone","Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"),("desktop",None)]:
            c=await (b.new_context(viewport={"width":390,"height":844},user_agent=ua) if ua else b.new_context(viewport={"width":390,"height":844}))
            pg=await c.new_page(); errs=[]
            pg.on("pageerror",lambda e:errs.append(str(e)))
            await pg.goto((d/"index.html").as_uri()); await pg.wait_for_timeout(600)
            n=await pg.locator(".daybtn").count(); bad=[]
            for i in range(n):
                await pg.click(f'.daybtn[data-i="{i}"]'); await pg.wait_for_timeout(80)
                if await pg.locator("li.stop").count()==0: bad.append(i)
                if shots and name=="iphone": await pg.screenshot(path=f"/tmp/tripcheck-{folder}-day{i}.png",full_page=True)
            for tab in ["p-food","p-taxi","p-info"]:
                await pg.click(f'.tabs button[data-p="{tab}"]'); await pg.wait_for_timeout(80)
                if shots and name=="iphone": await pg.screenshot(path=f"/tmp/tripcheck-{folder}-{tab}.png",full_page=True)
            hrefs=await pg.eval_on_selector_all("a[href]","els=>els.map(e=>e.href)")
            schemes=sorted({h.split(':')[0] for h in hrefs})
            print(f"{name}: days={n} empty_days={bad} links={len(hrefs)} schemes={schemes} errors={errs}")
        await b.close()
asyncio.run(main(sys.argv[1],"--shots" in sys.argv))
