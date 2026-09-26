from pathlib import Path
import re,json,base64,mimetypes
root=Path(__file__).resolve().parents[1]
release=root/'web-release'
def uri(p):
 m=mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
 return 'data:'+m+';base64,'+base64.b64encode(p.read_bytes()).decode()
js=next((release/'assets').glob('*.js')).read_text()
css=next((release/'assets').glob('*.css')).read_text()
for p in (release/'fonts').iterdir():css=css.replace('/fonts/'+p.name,uri(p))
images={p.stem:uri(p) for p in (release/'images').glob('*.jpg')}
js,n=re.subn(r'`/images/\$\{(\w+)\}\.jpg`',r'window.__DAYLIGHT_IMAGES__[\1]',js)
assert n==3, 'Desktop, mobile and onboarding image helpers must be embedded'
js=js.replace('localStorage','window.__daylightStorage')
js=js.replace(',`serviceWorker`in navigator&&window.addEventListener(`load`,()=>navigator.serviceWorker.register(`/sw.js`).catch(()=>{}))','')
js=js.replace('`Saved on this device`','(window.__daylightPersistent?`Saved in this browser`:`Temporary preview session`)')
js=js.replace('`No sign-up. Your workspace stays in this browser.`','(window.__daylightPersistent?`No sign-up. Your workspace stays in this browser.`:`No sign-up. This preview keeps a temporary workspace.`)')
js=js.replace('`This workspace is saved in this browser, on this device. Clearing browser data removes it. Export regularly to keep your plans safe.`','(window.__daylightPersistent?`This workspace is saved in this browser. Export regularly to keep your plans safe.`:`This in-chat preview keeps tasks only for this session. Closing or reloading the preview may reset them. You can use Export backup if your browser permits downloads.`)')
js=js.replace('`No account. Your workspace stays in this browser.`','(window.__daylightPersistent?`No account. Your workspace stays in this browser.`:`This preview keeps a temporary workspace. No account needed.`)')
js=js.replace('`Saved in this browser. One check-in per day.`','(window.__daylightPersistent?`Saved in this browser. One check-in per day.`:`Saved for this preview session. One check-in per day.`)')
css+='\n.install-card{display:none}.sidebar-foot>span{font-size:10px;color:#778467}.sidebar-foot{gap:5px}\n'
bootstrap='''window.__daylightPersistent=false;try{const s=window.localStorage;s.setItem('daylight.storage-check','1');s.removeItem('daylight.storage-check');window.__daylightStorage=s;window.__daylightPersistent=true;}catch{const memory=new Map;window.__daylightStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k)};}
// The in-chat viewer permits scripts but blocks native form submission.
// Dispatch the same cancelable submit event directly for React's handlers.
document.addEventListener('click',e=>{const b=e.target.closest?.('button');if(!b||b.type!=='submit'||!b.form)return;e.preventDefault();if(b.form.reportValidity())b.form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));},true);
document.addEventListener('keydown',e=>{if(e.key!=='Enter'||e.target.tagName!=='INPUT'||!e.target.form||e.target.getAttribute('aria-label')==='New subtask')return;e.preventDefault();if(e.target.form.reportValidity())e.target.form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));},true);
if(!globalThis.crypto?.randomUUID){const c=globalThis.crypto||{};c.randomUUID=()=> 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{let r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16)});if(!globalThis.crypto)globalThis.crypto=c;}
'''
theme_init=re.search(r'<script id="theme-init">(.*?)</script>',(root/'index.html').read_text()).group(1)
html='<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#fff9ed"><title>Daylight — Your web app</title><script>'+theme_init+'</script><style>'+css+'</style></head><body><div id="root"></div><script>'+bootstrap+'window.__DAYLIGHT_IMAGES__='+json.dumps(images)+';</script><script type="module">'+js.replace('</script','<\\/script')+'</script></body></html>'
path=root.parent/'Daylight.html';path.write_text(html)
print('Self-contained web app created:',path,round(path.stat().st_size/1024/1024,2),'MB')
