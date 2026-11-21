/* Study Hub: checklist + backlog + streak slide-out. Self-contained. Add before </body>:  <script src="studyhub.js"></script> */
(function(){if(document.querySelector('.h-handle'))return;var s=document.createElement('style');s.textContent=`/* scoped vars so this works without theme.css */
.h-handle,.h-back,.h-drawer{--acc:#2dd4bf;--t-text:#eef1f8;--t-muted:#8b93a7;--t-glass:rgba(255,255,255,.045);--t-glass2:rgba(255,255,255,.08);--t-line:rgba(255,255,255,.1);
--t-font:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--t-head:'Space Grotesk','Inter',-apple-system,'Segoe UI',sans-serif;--t-mono:'JetBrains Mono',ui-monospace,'SF Mono',Consolas,monospace;--t-ease:cubic-bezier(.2,.8,.2,1)}
/* ===== STUDY HUB: checklist / backlog / streak drawer ===== */
@media screen{
.h-handle{position:fixed;top:50%;right:0;z-index:65;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:9px;padding:14px 8px 12px;cursor:pointer;
  border:1px solid var(--t-line);border-right:0;border-radius:16px 0 0 16px;background:rgba(14,16,28,.68);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:var(--t-text);
  box-shadow:0 14px 34px -10px rgba(0,0,0,.8);-webkit-tap-highlight-color:transparent;font:inherit;animation:h-peek-r .8s var(--t-ease) .5s both;transition:filter .3s}
html[data-hub-side=left] .h-handle{right:auto;left:0;border-right:1px solid var(--t-line);border-left:0;border-radius:0 16px 16px 0;animation-name:h-peek-l}
@keyframes h-peek-r{from{opacity:0;transform:translate(100%,-50%)}}
@keyframes h-peek-l{from{opacity:0;transform:translate(-100%,-50%)}}
.h-handle:active{filter:brightness(1.4)}
.h-fire{display:flex;flex-direction:column;align-items:center;font:700 12px/1.1 var(--t-mono)}
.h-fire span{font-size:15px}
.h-lbl{writing-mode:vertical-rl;font:700 10.5px var(--t-mono);letter-spacing:.24em;color:var(--acc)}
.h-badge{min-width:19px;height:19px;border-radius:10px;background:var(--acc);color:#06080f;font:800 10.5px/19px var(--t-mono);text-align:center;padding:0 4px;font-style:normal;box-shadow:0 0 14px -2px var(--acc)}
.h-badge.zero{display:none}
.h-back{position:fixed;inset:0;z-index:80;background:rgba(2,3,8,.55);opacity:0;pointer-events:none;transition:opacity .4s;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
.h-back.open{opacity:1;pointer-events:auto}
.h-drawer{position:fixed;top:0;bottom:0;right:0;z-index:90;width:min(390px,94vw);display:flex;flex-direction:column;color:var(--t-text);font-family:var(--t-font);
  background:rgba(10,12,22,.92);backdrop-filter:blur(28px) saturate(1.4);-webkit-backdrop-filter:blur(28px) saturate(1.4);border:1px solid var(--t-line);border-right:0;border-radius:24px 0 0 24px;
  box-shadow:0 0 90px rgba(0,0,0,.85);transform:translateX(106%);transition:transform .55s var(--t-ease);padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);visibility:hidden}
html[data-hub-side=left] .h-drawer{right:auto;left:0;border-right:1px solid var(--t-line);border-left:0;border-radius:0 24px 24px 0;transform:translateX(-106%)}
html .h-drawer.open{transform:none!important;visibility:visible}
.h-top{display:flex;justify-content:space-between;align-items:flex-start;padding:20px 18px 8px}
.h-title{display:block;font:700 22px var(--t-head);letter-spacing:-.02em}
.h-date{font:500 11px var(--t-mono);color:var(--t-muted)}
.h-btns{display:flex;gap:6px}
.h-ib{all:unset;cursor:pointer;box-sizing:border-box;width:36px;height:36px;display:grid;place-items:center;border-radius:12px;background:var(--t-glass2);border:1px solid var(--t-line);font-size:14px;color:var(--t-text);transition:.2s;-webkit-tap-highlight-color:transparent}
.h-ib:active{transform:scale(.88)}
.h-tabs{display:flex;gap:6px;padding:8px 18px 12px}
.h-tabs button{all:unset;cursor:pointer;box-sizing:border-box;flex:1;text-align:center;padding:10px 4px;border-radius:12px;font:700 11.5px var(--t-mono);color:var(--t-muted);background:var(--t-glass);border:1px solid var(--t-line);transition:.25s var(--t-ease);-webkit-tap-highlight-color:transparent}
.h-tabs button.on{background:var(--acc);color:#06080f;border-color:var(--acc);box-shadow:0 8px 22px -8px var(--acc)}
.h-tabs button:active{transform:scale(.94)}
.h-n{font-style:normal;margin-left:5px;padding:1px 6px;border-radius:9px;background:#ffb02e;color:#1a1200;font-size:10px}
.h-n:empty{display:none}
.h-pane{display:none;flex:1;overflow:auto;padding:4px 18px 16px;overscroll-behavior:contain}
.h-pane.on{display:block}
.h-sum{display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:18px;background:var(--t-glass);border:1px solid var(--t-line);margin-bottom:14px}
.h-ring{width:64px;height:64px;transform:rotate(-90deg);flex:none}
.h-ring circle{fill:none;stroke-width:6}
.h-ring .bg{stroke:rgba(255,255,255,.1)}
.h-ring .fg{stroke:var(--acc);stroke-linecap:round;stroke-dasharray:163.4;stroke-dashoffset:163.4;transition:stroke-dashoffset .8s var(--t-ease);filter:drop-shadow(0 0 6px var(--acc))}
.h-big{display:block;font:700 22px var(--t-head)}
.h-msg{font:500 12px var(--t-mono);color:var(--t-muted)}
.h-hint{margin:0 0 12px;font:500 12px/1.5 var(--t-mono);color:var(--t-muted)}
.h-item{display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:14px;background:var(--t-glass);border:1px solid var(--t-line);margin-bottom:8px;transition:background .3s,border-color .3s}
.h-item.done{background:color-mix(in srgb,var(--acc) 13%,transparent);border-color:color-mix(in srgb,var(--acc) 45%,transparent)}
.h-chk{all:unset;cursor:pointer;flex:none;box-sizing:border-box;width:28px;height:28px;border-radius:9px;border:2px solid rgba(255,255,255,.38);display:grid;place-items:center;transition:.3s var(--t-ease);-webkit-tap-highlight-color:transparent}
.h-chk::after{content:"";width:7px;height:12px;border:solid #06080f;border-width:0 3px 3px 0;transform:rotate(45deg) scale(0) translate(-1px,-1px);transition:transform .3s var(--t-ease)}
.h-chk:active{transform:scale(.82)}
.h-item.done .h-chk{background:var(--acc);border-color:var(--acc);box-shadow:0 0 0 4px color-mix(in srgb,var(--acc) 28%,transparent),0 6px 16px -4px var(--acc)}
.h-item.done .h-chk::after{transform:rotate(45deg) scale(1) translate(-1px,-1px)}
.h-txt{flex:1;min-width:0;font:500 14px/1.35 var(--t-font);word-break:break-word}
.h-item.done .h-txt{color:var(--t-muted);text-decoration:line-through;text-decoration-color:var(--acc)}
.h-tag{display:inline-block;margin:4px 6px 0 0;font:700 9.5px var(--t-mono);letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:7px;background:var(--t-glass2);color:var(--t-muted)}
.h-tag.h-late{background:rgba(255,176,46,.16);color:#ffb02e}
.h-act{all:unset;cursor:pointer;box-sizing:border-box;flex:none;font:700 10.5px var(--t-mono);padding:7px 9px;border-radius:9px;background:var(--t-glass2);border:1px solid var(--t-line);color:var(--t-text);-webkit-tap-highlight-color:transparent}
.h-act:active{transform:scale(.9)}
.h-del{opacity:.55;padding:7px 8px}
.h-empty{text-align:center;padding:30px 10px;color:var(--t-muted);font:500 12.5px/1.6 var(--t-mono)}
.h-fresh .h-item{animation:h-in .55s var(--t-ease) both;animation-delay:calc(var(--i,0)*45ms)}
@keyframes h-in{from{opacity:0;transform:translateX(20px)}}
html[data-hub-side=left] .h-fresh .h-item{animation-name:h-inl}
@keyframes h-inl{from{opacity:0;transform:translateX(-20px)}}
.h-add{display:none;padding:12px 18px 16px;border-top:1px solid var(--t-line);background:rgba(8,10,20,.65)}
.h-drawer[data-tab=today] .h-add{display:block}
.h-row{display:flex;gap:8px}
.h-in{flex:1;min-width:0;box-sizing:border-box;padding:12px 14px;border-radius:13px;background:var(--t-glass2);border:1px solid var(--t-line);color:var(--t-text);font:500 16px var(--t-font);outline:0;transition:border-color .2s}
.h-in:focus{border-color:var(--acc)}
.h-go{all:unset;cursor:pointer;box-sizing:border-box;padding:0 16px;display:grid;place-items:center;border-radius:13px;background:var(--acc);color:#06080f;font:800 13px var(--t-mono);box-shadow:0 8px 20px -8px var(--acc)}
.h-go:active{transform:scale(.9)}
.h-chips{display:flex;gap:6px;margin-top:10px}
.h-chips button{all:unset;cursor:pointer;box-sizing:border-box;flex:1;text-align:center;padding:8px 2px;border-radius:10px;font:700 10.5px var(--t-mono);color:var(--t-muted);background:var(--t-glass);border:1px solid var(--t-line);transition:.2s}
.h-chips button.on{background:var(--acc);color:#06080f;border-color:var(--acc)}
/* streak */
.h-flame{text-align:center;padding:8px 0 10px}
.h-flame .fl{font-size:58px;display:block;line-height:1.1;filter:grayscale(1) opacity(.4);transition:filter .6s}
.h-flame .h-sn{display:block;font:700 60px/1 var(--t-head)}
.h-flame .h-sl{font:600 12px var(--t-mono);color:var(--t-muted);letter-spacing:.1em;text-transform:uppercase}
.h-flame.risk .fl{filter:drop-shadow(0 0 10px #ffb02e) opacity(.75)}
.h-flame.risk .h-sn{color:#ffb02e}
.h-flame.hot .fl{filter:drop-shadow(0 0 18px #ff8a1e);animation:h-fl 1.8s ease-in-out infinite}
@keyframes h-fl{50%{transform:scale(1.1) rotate(-3deg)}}
.h-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:6px 0 14px}
.h-stats div{padding:12px 6px;border-radius:14px;background:var(--t-glass);border:1px solid var(--t-line);text-align:center}
.h-stats b{display:block;font:700 20px var(--t-head)}
.h-stats span{font:600 9.5px var(--t-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--t-muted)}
.h-note{margin:0 0 16px;padding:11px 13px;border-radius:13px;background:var(--t-glass);border:1px solid var(--t-line);font:500 12.5px/1.5 var(--t-font)}
.h-pane h5{margin:0 0 10px;font:700 10.5px var(--t-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--t-muted)}
.h-heat{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.h-heat i{aspect-ratio:1;border-radius:8px;background:rgba(255,255,255,.06)}
.h-heat i.l1{background:color-mix(in srgb,var(--acc) 35%,transparent)}
.h-heat i.l2{background:color-mix(in srgb,var(--acc) 58%,transparent)}
.h-heat i.l3{background:color-mix(in srgb,var(--acc) 80%,transparent)}
.h-heat i.l4{background:var(--acc);box-shadow:0 0 12px -2px var(--acc)}
.h-heat i.td{outline:2px solid #fff;outline-offset:1px}
}
@media print{.h-handle,.h-back,.h-drawer{display:none!important}}
`;document.head.appendChild(s)})();
/* ===== STUDY HUB (checklist / backlog / streak) ===== */
(function(){
'use strict';
var D=document,R=D.documentElement,KEY='tests_hub_v1',S;
var SUBJ={phy:'Phy',chem:'Chem',maths:'Maths',other:'Other'},MAP={physics:'phy',chemistry:'chem',maths:'maths'};
function pad(n){return String(n).padStart(2,'0')}
function ds(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function today(){return ds(new Date())}
function pd(s){var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2])}
function addDays(s,n){var d=pd(s);d.setDate(d.getDate()+n);return ds(d)}
function diff(a,b){return Math.round((pd(b)-pd(a))/864e5)}
function load(){var o=null;try{o=JSON.parse(localStorage.getItem(KEY))}catch(e){}
  S=(o&&typeof o==='object')?o:{};S.tasks=S.tasks||[];S.days=S.days||{};S.best=S.best||0;S.side=S.side==='left'?'left':'right'}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function streak(){var t=today(),d=S.days[t]?t:addDays(t,-1),n=0;while(S.days[d]){n++;d=addDays(d,-1)}return n}
function lists(){var t=today(),tl=[],bl=[];S.tasks.forEach(function(k){
  if(k.done){if(k.doneOn===t)tl.push(k)}else if(k.date<t)bl.push(k);else tl.push(k)});
  tl.sort(function(a,b){return (a.done?1:0)-(b.done?1:0)||a.ts-b.ts});bl.sort(function(a,b){return a.ts-b.ts});return{t:tl,b:bl}}
load();
(function clean(){var t=today();S.tasks=S.tasks.filter(function(k){return !(k.done&&k.doneOn&&diff(k.doneOn,t)>14)});
  Object.keys(S.days).forEach(function(d){if(diff(d,t)>150)delete S.days[d]});save()})();
R.setAttribute('data-hub-side',S.side);

function ready(f){D.readyState!=='loading'?f():D.addEventListener('DOMContentLoaded',f)}
ready(function(){
  var B=D.body,pageSubj=MAP[R.getAttribute('data-subject')]||null,sel=pageSubj||S.subj||'phy',tab='today';
  var hd=el('button','h-handle');hd.setAttribute('aria-label','Open Study Hub');
  hd.innerHTML='<div class="h-fire"><span>🔥</span><b>0</b></div><div class="h-lbl">STUDY</div><i class="h-badge zero">0</i>';
  var bk=el('div','h-back'),dr=el('aside','h-drawer');dr.setAttribute('data-tab','today');
  dr.innerHTML='<div class="h-top"><div><b class="h-title">Study Hub</b><span class="h-date"></span></div><div class="h-btns"><button class="h-ib h-side" aria-label="Switch side" title="Switch side">⇄</button><button class="h-ib h-close" aria-label="Close">✕</button></div></div>'+
  '<div class="h-tabs"><button data-t="today" class="on">Today</button><button data-t="backlog">Backlog<i class="h-n"></i></button><button data-t="streak">Streak</button></div>'+
  '<div class="h-pane on" data-p="today"><div class="h-sum"><svg class="h-ring" viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="26"/><circle class="fg" cx="32" cy="32" r="26"/></svg><div><b class="h-big"></b><span class="h-msg"></span></div></div><div class="h-list" data-l="today"></div></div>'+
  '<div class="h-pane" data-p="backlog"><p class="h-hint">Anything you didn’t finish on an earlier day lands here automatically. Clear it or pull it into today.</p><div class="h-list" data-l="backlog"></div></div>'+
  '<div class="h-pane" data-p="streak"><div class="h-flame"><span class="fl">🔥</span><b class="h-sn">0</b><span class="h-sl">day streak</span></div><div class="h-stats"><div><b class="h-best">0</b><span>Best</span></div><div><b class="h-tot">0</b><span>Days studied</span></div><div><b class="h-wk">0/7</b><span>This week</span></div></div><p class="h-note"></p><h5>Last 5 weeks</h5><div class="h-heat"></div></div>'+
  '<div class="h-add"><div class="h-row"><input class="h-in" type="text" maxlength="140" placeholder="Add a task for today…" enterkeyhint="done" autocomplete="off"><button class="h-go" type="button">ADD</button></div><div class="h-chips"></div></div>';
  B.appendChild(bk);B.appendChild(dr);B.appendChild(hd);
  function q(s){return dr.querySelector(s)}
  var ring=q('.h-ring .fg'),inp=q('.h-in'),chips=q('.h-chips');
  Object.keys(SUBJ).forEach(function(k){var b=el('button',k===sel?'on':'',SUBJ[k]);b.dataset.s=k;chips.appendChild(b)});
  chips.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;sel=b.dataset.s;S.subj=sel;save();[].forEach.call(chips.children,function(c){c.classList.toggle('on',c===b)})});

  function buzz(){try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}}
  function toggle(id){var t=today(),k=S.tasks.filter(function(x){return x.id===id})[0];if(!k)return;
    if(!k.done){k.done=true;k.doneOn=t;S.days[t]=(S.days[t]||0)+1}
    else{var d=k.doneOn;if(d&&S.days[d]){S.days[d]--;if(S.days[d]<=0)delete S.days[d]}k.done=false;k.doneOn=null}
    S.best=Math.max(S.best,streak());save();buzz();render()}
  function item(k,i,late){var d=el('div','h-item'+(k.done?' done':''));d.style.setProperty('--i',Math.min(i,10));
    var c=el('button','h-chk');c.setAttribute('aria-label','Mark done');c.onclick=function(){toggle(k.id)};
    var tx=el('div','h-txt');tx.appendChild(D.createTextNode(k.text));var br=el('div');br.appendChild(el('span','h-tag',SUBJ[k.s]||'Other'));
    if(late)br.appendChild(el('span','h-tag h-late',diff(k.date,today())+'d late'));tx.appendChild(br);
    d.appendChild(c);d.appendChild(tx);
    if(late){var m=el('button','h-act','→ TODAY');m.onclick=function(){k.date=today();save();render()};d.appendChild(m)}
    var x=el('button','h-act h-del','✕');x.setAttribute('aria-label','Delete');x.onclick=function(){S.tasks=S.tasks.filter(function(z){return z.id!==k.id});
      if(k.done&&k.doneOn&&S.days[k.doneOn]){S.days[k.doneOn]--;if(S.days[k.doneOn]<=0)delete S.days[k.doneOn]}save();render()};
    d.appendChild(x);return d}
  function render(){var L=lists(),t=today(),dn=L.t.filter(function(k){return k.done}).length,tot=L.t.length,pend=tot-dn,st=streak();
    q('.h-date').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'short'});
    q('.h-big').textContent=dn+' / '+tot+' done';
    q('.h-msg').textContent=tot===0?'Add your first task':(pend===0?'All clear. Streak safe 🔥':pend+' left today');
    ring.style.strokeDashoffset=163.4*(1-(tot?dn/tot:0));
    var tl=q('[data-l=today]');tl.replaceChildren();
    if(!tot)tl.appendChild(el('div','h-empty','Nothing planned yet.\nType below and hit ADD.'));
    L.t.forEach(function(k,i){tl.appendChild(item(k,i,false))});
    var bl=q('[data-l=backlog]');bl.replaceChildren();
    if(!L.b.length)bl.appendChild(el('div','h-empty','Backlog is empty.\nNothing pending from earlier days ✨'));
    L.b.forEach(function(k,i){bl.appendChild(item(k,i,true))});
    q('.h-n').textContent=L.b.length?L.b.length:'';
    /* streak pane */
    var fl=q('.h-flame');fl.className='h-flame '+(S.days[t]?'hot':(st>0?'risk':''));
    q('.h-sn').textContent=st;q('.h-best').textContent=Math.max(S.best,st);q('.h-tot').textContent=Object.keys(S.days).length;
    var wk=0;for(var i=0;i<7;i++)if(S.days[addDays(t,-i)])wk++;q('.h-wk').textContent=wk+'/7';
    q('.h-note').textContent=S.days[t]?'Today is counted. Come back tomorrow to keep it going.':(st>0?'Finish 1 task today to keep your '+st+'-day streak alive.':'Finish 1 task today to start a streak.');
    var hm=q('.h-heat');hm.replaceChildren();for(var j=34;j>=0;j--){var d=addDays(t,-j),n=S.days[d]||0,c=el('i',n?'l'+Math.min(4,n):'');c.title=d+(n?' · '+n+' done':'');if(j===0)c.classList.add('td');hm.appendChild(c)}
    /* handle */
    hd.querySelector('b').textContent=st;var bd=hd.querySelector('.h-badge'),np=pend+L.b.length;bd.textContent=np;bd.classList.toggle('zero',!np)}
  function fresh(){dr.classList.remove('h-fresh');void dr.offsetWidth;dr.classList.add('h-fresh');clearTimeout(fresh.t);fresh.t=setTimeout(function(){dr.classList.remove('h-fresh')},900)}
  function setTab(t){tab=t;dr.setAttribute('data-tab',t);[].forEach.call(dr.querySelectorAll('.h-tabs button'),function(b){b.classList.toggle('on',b.dataset.t===t)});
    [].forEach.call(dr.querySelectorAll('.h-pane'),function(p){p.classList.toggle('on',p.dataset.p===t)});fresh()}
  function open(){render();setTab(tab);dr.classList.add('open');bk.classList.add('open');}
  function close(){dr.classList.remove('open');bk.classList.remove('open');inp.blur()}
  function add(){var v=inp.value.trim();if(!v)return;S.tasks.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),text:v.slice(0,140),s:sel,date:today(),ts:Date.now(),done:false});
    inp.value='';save();buzz();render();var l=q('[data-l=today]');l.lastElementChild&&l.lastElementChild.scrollIntoView({block:'nearest',behavior:'smooth'})}
  hd.onclick=open;bk.onclick=close;q('.h-close').onclick=close;
  q('.h-tabs').addEventListener('click',function(e){var b=e.target.closest('button');if(b)setTab(b.dataset.t)});
  q('.h-go').onclick=add;inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();add()}});
  q('.h-side').onclick=function(){close();setTimeout(function(){S.side=S.side==='right'?'left':'right';save();R.setAttribute('data-hub-side',S.side);setTimeout(open,120)},480)};
  D.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  addEventListener('storage',function(e){if(e.key===KEY){load();R.setAttribute('data-hub-side',S.side);render()}});
  D.addEventListener('visibilitychange',function(){if(!D.hidden)render()});
  /* swipe the drawer toward its edge to close */
  var sx=null;dr.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  dr.addEventListener('touchend',function(e){if(sx==null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;if((S.side==='right'&&dx>90)||(S.side==='left'&&dx<-90))close()},{passive:true});
  render();
});
})();
