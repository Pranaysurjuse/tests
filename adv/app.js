(function(){
var D=(window.ADV_DATA||[]).slice().sort(function(a,b){return a.date<b.date?-1:1});
var M=window.ADV_MONTH||null;
var SC={physics:'#6fcf97',chemistry:'#3b9dff',maths:'#ef8b7c'};
var SL={physics:'Physics',chemistry:'Chemistry',maths:'Maths'};
function $(i){return document.getElementById(i)}
function pc(d){return d.score/d.maxScore*100}
function acc(d){var t=(d.correct||0)+(d.wrong||0);return t?d.correct/t*100:null}
document.querySelectorAll('[data-month]').forEach(function(e){
var n=D.filter(function(d){return d.date.indexOf(e.getAttribute('data-month'))===0}).length;
e.textContent=n?n+' test'+(n>1?'s':''):'No tests yet'});
var hs=$('hubStats');
if(hs){
var best=D.length?Math.max.apply(null,D.map(pc)):null;
var avg=D.length?D.reduce(function(s,d){return s+pc(d)},0)/D.length:null;
hs.innerHTML=st('Tests logged',D.length,'')+st('Best score',best==null?'—':best.toFixed(1)+'%','')+st('Average',avg==null?'—':avg.toFixed(1)+'%','');
}
function st(l,v){return '<div class="stat fade"><p class="lbl">'+l+'</p><p class="val">'+v+'</p></div>'}
var kp=$('kpis');
if(!kp)return;
var R=M?D.filter(function(d){return d.date.indexOf(M)===0}):D;
function kpi(l,v,d,c){return '<div class="kpi fade"><p class="lbl">'+l+'</p><p class="val"'+(c?' style="color:'+c+'"':'')+'>'+v+'</p><p class="d">'+d+'</p></div>'}
if(!R.length){
kp.innerHTML=kpi('Latest score','—','no test yet')+kpi('Accuracy','—','no test yet')+kpi('Strongest','—','no test yet')+kpi('Weakest','—','no test yet');
$('empty').hidden=false;$('dash').hidden=true;return}
$('empty').hidden=true;$('dash').hidden=false;
var L=R[R.length-1],ks=Object.keys(L.subjects||{});
var sp=function(k){return L.subjects[k].score/L.subjects[k].maxScore};
var s=ks.slice().sort(function(a,b){return sp(b)-sp(a)});
var a=acc(L);
kp.innerHTML=kpi('Latest score',L.score+'<small> / '+L.maxScore+'</small>',pc(L).toFixed(1)+'% overall')+kpi('Accuracy',a==null?'—':a.toFixed(1)+'%',L.correct+' correct of '+(L.correct+L.wrong))+kpi('Strongest',SL[s[0]]||'—',L.subjects[s[0]].score+' / '+L.subjects[s[0]].maxScore,SC[s[0]])+kpi('Weakest',SL[s[s.length-1]]||'—',L.subjects[s[s.length-1]].score+' / '+L.subjects[s[s.length-1]].maxScore,SC[s[s.length-1]]);
$('bars').innerHTML=ks.map(function(k){var x=L.subjects[k],p=Math.max(0,x.score/x.maxScore*100);
return '<div class="bar"><div class="n">'+SL[k]+'</div><div class="tr"><div class="f" style="background:'+SC[k]+'" data-w="'+p+'"><span>'+x.score+'/'+x.maxScore+'</span></div></div></div>'}).join('');
setTimeout(function(){document.querySelectorAll('.f').forEach(function(e){e.style.width=e.getAttribute('data-w')+'%'})},300);
var T=$('trend');
if(R.length<2){T.innerHTML='<p style="color:#8d8a84;font-size:13px;text-align:center;margin:10px 0">Trend shows up after two tests.</p>'}
else{var W=700,H=240,pl=40,pr=16,pt=16,pb=30,n=R.length;
var x=function(i){return pl+i*(W-pl-pr)/(n-1)},y=function(v){return H-pb-v/100*(H-pb-pt)};
var g='';[0,25,50,75,100].forEach(function(v){g+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="rgba(255,255,255,.07)"/><text x="4" y="'+(y(v)+3)+'">'+v+'%</text>'});
var pts=R.map(function(d,i){return x(i)+','+y(pc(d))}).join(' ');
var dots=R.map(function(d,i){return '<circle cx="'+x(i)+'" cy="'+y(pc(d))+'" r="4.5" fill="#ffb547"/><text x="'+x(i)+'" y="'+(H-10)+'" text-anchor="middle">'+(d.label||d.date.slice(5))+'</text>'}).join('');
T.innerHTML='<svg class="tr" viewBox="0 0 '+W+' '+H+'" width="100%">'+g+'<polyline points="'+pts+'" fill="none" stroke="#ffb547" stroke-width="2.5" stroke-linejoin="round"/>'+dots+'</svg>'}
$('hist').innerHTML=R.slice().reverse().map(function(d){var q=acc(d),sb=d.subjects||{};
function c(k){return sb[k]?sb[k].score+'/'+sb[k].maxScore:'—'}
return '<tr><td>'+(d.label||d.date)+'</td><td>'+d.score+'/'+d.maxScore+'</td><td>'+(q==null?'—':q.toFixed(0)+'%')+'</td><td>'+c('physics')+'</td><td>'+c('chemistry')+'</td><td>'+c('maths')+'</td></tr>'}).join('');
})();
