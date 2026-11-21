(function(){
'use strict';
var D=document,R=D.documentElement,KEY='tests_theme_v1';
var cs=D.currentScript,BASE=cs?cs.src.replace(/theme\.js.*$/,''):'';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return{}}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
var S=load();
var MOODS=[['void','#7c3aed'],['midnight','#2563eb'],['ember','#f97316'],['forest','#10b981'],['mono','#94a3b8']];
function apply(){R.setAttribute('data-mood',S.mood||'void');
  if(S.motion==='off')R.setAttribute('data-motion','off');else R.removeAttribute('data-motion');}
apply();
/* subject from URL */
var p=location.pathname.toLowerCase(),subj='';
['physics','chemistry','maths','combine','adv','akiva'].forEach(function(s){if(p.indexOf('/'+s)>-1||p.indexOf(s+'.html')>-1)subj=s});
if(/\/afterdiwali/.test(p)){var q=new URLSearchParams(location.search).get('subject');if(q)subj=q.toLowerCase().slice(0,5)==='chemi'?'chemistry':q.toLowerCase()}
if(subj)R.setAttribute('data-subject',subj);
var home=/dashboard\.html$/.test(p)||/\/$/.test(p);

function ready(f){D.readyState!=='loading'?f():D.addEventListener('DOMContentLoaded',f)}
ready(function(){
  var B=D.body;
  /* aurora */
  var a=D.createElement('div');a.className='t-aurora';a.innerHTML='<i></i><i></i><i></i>';B.insertBefore(a,B.firstChild);
  /* progress */
  var pr=D.createElement('div');pr.className='t-progress';B.appendChild(pr);
  /* nav */
  var ic={
   home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
   akiva:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
   physics:'<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/>',
   chemistry:'<path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><path d="M7.5 15h9"/>',
   maths:'<path d="M18 5H7l6 7-6 7h11"/>',
   combine:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
   theme:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="16" cy="10" r="1.2"/><path d="M12 21c-1.5 0-2-1.5-1-2.5s0-2.5-1.5-2.5"/>'};
  var items=[['home','Home','dashboard.html'],['akiva','Akiva','akiva.html'],['physics','Phy','physics.html'],['chemistry','Chem','chemistry.html'],['maths','Maths','maths.html'],['combine','All','combine-menu.html']];
  var nav=D.createElement('nav');nav.className='t-nav';
  nav.innerHTML=items.map(function(i){
    var on=(i[0]==='home'&&home&&!subj)||(i[0]===subj)||(i[0]==='combine'&&subj==='adv');
    return '<a href="'+BASE+i[2]+'"'+(on?' class="on"':'')+'><svg viewBox="0 0 24 24">'+ic[i[0]]+'</svg>'+i[1]+'</a>'}).join('')+
    '<button type="button" aria-label="Theme"><svg viewBox="0 0 24 24">'+ic.theme+'</svg>Theme</button>';
  B.appendChild(nav);
  /* theme panel */
  var pn=D.createElement('div');pn.className='t-panel';
  pn.innerHTML='<h4>Mood</h4><div class="t-moods">'+MOODS.map(function(m){return '<button type="button" data-m="'+m[0]+'" aria-label="'+m[0]+'" style="--sw:'+m[1]+';background:radial-gradient(circle at 30% 25%,'+m[1]+',#05060d 85%)"></button>'}).join('')+'</div><div class="t-row">Animations<button type="button" class="t-sw" aria-label="Animations"></button></div>';
  B.appendChild(pn);
  var sw=pn.querySelector('.t-sw');
  function sync(){pn.querySelectorAll('[data-m]').forEach(function(b){b.classList.toggle('sel',b.dataset.m===(S.mood||'void'))});sw.classList.toggle('on',S.motion!=='off')}
  sync();
  pn.addEventListener('click',function(e){var b=e.target.closest('[data-m]');if(b){S.mood=b.dataset.m;save(S);apply();sync()}});
  sw.addEventListener('click',function(){S.motion=S.motion==='off'?'on':'off';save(S);apply();sync()});
  nav.querySelector('button').addEventListener('click',function(e){e.stopPropagation();pn.classList.toggle('open')});
  D.addEventListener('click',function(e){if(!pn.contains(e.target))pn.classList.remove('open')});

  /* scroll: progress + hide nav on scroll down */
  var last=scrollY,tick=false;
  addEventListener('scroll',function(){if(tick)return;tick=true;requestAnimationFrame(function(){
    var h=R.scrollHeight-innerHeight,y=scrollY;pr.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')';
    if(y>last+8&&y>120){nav.classList.add('t-hide');pn.classList.remove('open')}else if(y<last-8||y<120)nav.classList.remove('t-hide');
    last=y;tick=false})},{passive:true});

  /* month tabs -> scrollable pill strip */
  D.querySelectorAll('a').forEach(function(a){if(a.textContent.trim()==='June'&&a.parentElement&&!a.parentElement.classList.contains('t-tabs')){
    var c=a.parentElement;if(c.children.length<4||c.children.length>12)return;c.classList.add('t-tabs');
    var sp=c.querySelector('span');if(sp){c.querySelectorAll('a').forEach(function(x){if(x.textContent.trim()===sp.textContent.trim())x.classList.add('t-dupe')});
      setTimeout(function(){c.scrollTo({left:Math.max(0,sp.offsetLeft-24),behavior:'smooth'})},400)}}});
  /* spotlight on cards */
  var SEL='.kpi-card,.chart-card,.card,.tile,.panel,.readout';
  D.querySelectorAll(SEL).forEach(function(el){el.classList.add('t-spot')});
  function spot(e){var el=e.target.closest&&e.target.closest('.t-spot');if(!el)return;var r=el.getBoundingClientRect();
    el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px');el.classList.add('t-lit')}
  D.addEventListener('pointermove',spot,{passive:true});D.addEventListener('pointerdown',spot,{passive:true});
  D.addEventListener('pointerout',function(e){var el=e.target.closest&&e.target.closest('.t-spot');if(el)el.classList.remove('t-lit')});
  D.addEventListener('pointerup',function(e){var el=e.target.closest&&e.target.closest('.t-spot');if(el)setTimeout(function(){el.classList.remove('t-lit')},250)});

  /* scroll reveal: only for things that are not already animated by the page */
  if('IntersectionObserver' in window&&S.motion!=='off'){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('t-in');io.unobserve(en.target)}})},{threshold:.08,rootMargin:'0px 0px -6% 0px'});
    var n=0;D.querySelectorAll('.kpi-card,.chart-card,.card,.section-label,.table-scroll,.trend-alert,.log-row,.readout,.kpi-row,.scope-grid').forEach(function(el){
      var c=getComputedStyle(el);if(c.animationName!=='none'||el.closest('.t-rv'))return;
      var r=el.getBoundingClientRect();if(r.top>innerHeight*1.5||r.top<-50){}
      el.style.setProperty('--rvd',(Math.min(n++%6,5)*0.06)+'s');el.classList.add('t-rv');io.observe(el)})}

  /* count-up for plain numeric KPI values */
  if(S.motion!=='off'&&'IntersectionObserver' in window){
    var co=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;co.unobserve(en.target);var el=en.target,t=el.dataset.tc,m=t.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
      var to=parseFloat(m[1]),suf=m[2],dec=(m[1].split('.')[1]||'').length,t0=performance.now();
      (function f(now){var k=Math.min(1,(now-t0)/900),e=1-Math.pow(1-k,3);el.textContent=(to*e).toFixed(dec)+suf;if(k<1)requestAnimationFrame(f);else el.textContent=t})(t0)})},{threshold:.5});
    D.querySelectorAll('.kpi-value,.kpi-v,.readout-value').forEach(function(el){var t=el.textContent.trim();
      if(/^-?\d+(\.\d+)?(%|\/\d+)?$/.test(t)&&el.children.length===0){el.dataset.tc=t;co.observe(el)}})}

  /* fallback leave animation where View Transitions are unsupported */
  if(!(window.CSS&&CSS.supports&&CSS.supports('view-transition-name','none'))&&S.motion!=='off'){
    D.addEventListener('click',function(e){var l=e.target.closest('a[href]');if(!l||l.target||e.metaKey||e.ctrlKey||l.origin!==location.origin||l.hash&&l.pathname===location.pathname)return;
      e.preventDefault();R.classList.add('t-leaving');setTimeout(function(){location.href=l.href},190)})}
  addEventListener('pageshow',function(e){if(e.persisted)R.classList.remove('t-leaving')});
});
})();
