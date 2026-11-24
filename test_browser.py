import pathlib,json,re
from playwright.sync_api import sync_playwright
ROOT=pathlib.Path(__file__).parent
html=(ROOT/'index.html').read_text();html=re.sub(r'<script\b[^>]*>.*?</script>','',html,flags=re.S);html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(ROOT/'style.css').read_text()+'</style>')
js=(ROOT/'app.js').read_text()
fixture=[{'id':i,'title':{'rendered':f'Article {i} &amp; test'},'date':f'2026-11-{i:02}T09:00:00','status':'publish','link':f'https://reneorense.wordpress.com/test-{i}/'} for i in range(1,6)]
fixture += [{'id':6,'title':{'rendered':'Invalid link'},'date':'2026-11-26','status':'publish','link':'javascript:alert(1)'},{'id':7,'title':{'rendered':'Draft'},'date':'2026-11-27','status':'draft','link':'https://reneorense.wordpress.com/draft/'}]
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 def load(page,live):
  page.set_content(html);page.evaluate('(data)=>{window.fetch=async()=>{if(data===null)throw Error("offline");return {ok:true,json:async()=>data}}}',fixture if live else None);page.add_script_tag(content=js);page.wait_for_function("document.querySelector('#status').textContent.startsWith('"+('LIVE' if live else 'OFFLINE')+"')")
 for w,h in [(1440,900),(390,844),(320,740),(873,393)]:
  page=b.new_page(viewport={'width':w,'height':h});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));load(page,True)
  assert page.locator('.monitor').count()==5
  assert page.locator('.monitor').first.get_attribute('data-id')=='5'
  assert page.locator('.monitor h2').first.inner_text()=='Article 5 & test'
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  assert page.locator('.monitor').first.get_attribute('href')=='https://reneorense.wordpress.com/test-5/'
  page.locator('#mode').click();assert page.locator('body').evaluate("n=>n.classList.contains('flat')")
  page.locator('#mode').click();assert page.locator('#mode').get_attribute('aria-pressed')=='false'
  page.locator('#refresh').click();page.wait_for_function("document.querySelector('#status').textContent.startsWith('LIVE')")
  assert not errors,errors
  results.append(f'{w}×{h}: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS');page.close()
 page=b.new_page(viewport={'width':1200,'height':900},reduced_motion='reduce');load(page,False)
 page.evaluate("document.querySelectorAll('.monitor img').forEach(n=>n.dispatchEvent(new Event('error')))");assert page.locator('.monitor img').count()==0;assert page.locator('.monitor').count()==5;assert page.locator('.monitor').first.evaluate("n=>getComputedStyle(n).transform")=='none';results.append('Offline snapshot / failed images / reduced motion — PASS');page.close()
 page=b.new_page(viewport={'width':1200,'height':900});load(page,False);page.evaluate("document.querySelectorAll('.monitor img').forEach(n=>n.dispatchEvent(new Event('error')))");assert page.locator('.monitor img').count()==0;page.screenshot(path=str(ROOT.parent/'reading-array-preview.png'),full_page=True)
 # Capture transition state synchronously without permitting an external navigation.
 assert page.evaluate("()=>{const a=document.querySelector('.monitor');a.click();return a.classList.contains('selected')&&a.href.endsWith('sweldo-day-11-baon-versus-buying-meals/')}");results.append('Monitor click initiates zoom and points to expected article — PASS (external navigation not tested)');page.close();b.close()
print('\n'.join(results))
(ROOT/'QA.md').write_text('# Executed local Chromium checks\n\n'+'\n'.join('- '+r for r in results)+'\n\nBrowser navigation was blocked by administrator policy, so HTML, CSS and JS were injected into a local browser document with a mocked fetch. Actual WordPress API/CORS, real image delivery, Three.js module/WebGL rendering, real navigation, on-device performance and GitHub Pages deployment were not verified. Screenshot shows the offline fallback, not live artwork.\n')
