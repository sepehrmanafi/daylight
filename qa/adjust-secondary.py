from pathlib import Path
import json,re
def lum(h):
 a=[int(h[i:i+2],16)/255 for i in (1,3,5)];a=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in a];return sum(v*w for v,w in zip(a,[.2126,.7152,.0722]))
colors={}
for vs in json.load(open('qa/mobile-secondary-accessibility.json')).values():
 for v in vs:
  if v['id']!='color-contrast':continue
  for n in v['nodes']:
   m=re.search(r'foreground color: (#[a-f\d]{6}), background color: (#[a-f\d]{6})',n['summary'])
   if not m:continue
   fg,bg=m.groups();rgb=[int(fg[i:i+2],16) for i in (1,3,5)];factor=1
   while factor>0:
    col='#'+''.join(f'{round(v*factor):02x}' for v in rgb)
    if (lum(bg)+.05)/(lum(col)+.05)>=4.8:break
    factor-=.01
   if fg not in colors or lum(colors[fg])>lum(col):colors[fg]=col
p=Path('src/mobile.css');s=p.read_text()
for old,new in colors.items():s=re.sub(r'(?<![-\w])color: '+old+r'\b','color: '+new,s)
extra=[]
for sel,decl in re.findall(r'([^{}]+)\{([^{}]*)\}',Path('src/style.css').read_text()):
 for old,new in colors.items():
  if re.search(r'(?<![-\w])color:\s*'+old+r'\b',decl):
   sels=',\n'.join(':is(.mobile-app,.onboarding) '+t.strip() for t in sel.split(','));extra.append(sels+'{color:'+new+'}')
s+='\n/* Keep shared editors readable on the mobile surface. */\n@media(max-width:767px){'+''.join(extra)+':is(.mobile-app,.onboarding){--muted:#62695b}:is(.mobile-app,.onboarding) .eyebrow{color:#687159}}\n'
p.write_text(s)
