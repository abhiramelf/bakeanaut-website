(function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,
h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)},
l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r)
r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")},
n=function(r,s,t,u,v){var w="https://www.google-analytics.com/g/collect",x={v:"2",
tid:b,_p:k(),sr:(a.screen?a.screen.width+"x"+a.screen.height:void 0),ul:(f.language||
void 0),cid:l(),_s:"1",dl:e.location.href,dt:e.title,dr:e.referrer,sid:g.sid||(g.sid=
k()),sct:g.sct?parseInt(g.sct,10)+1:1,seg:"1"};g.sct=x.sct;if(r)x.en=r,x.ep=void 0;
else x.en="page_view";if(s)x["ep.event_category"]=s;if(t)x["ep.event_label"]=t;
if(u)x["ep.value"]=u;if(v)for(var y in v)v.hasOwnProperty(y)&&(x["ep."+y]=v[y]);
var z=w+"?"+m(x);if(f.sendBeacon)f.sendBeacon(z);else{var A=new XMLHttpRequest;
A.open("GET",z),A.send()}};d.pushState=function(){i.apply(d,arguments),n()};
a.addEventListener("popstate",function(){n()});
if("loading"==e.readyState)e.addEventListener("DOMContentLoaded",function(){n()});
else n();a.ma={trackEvent:function(r,s,t,u,v){n(s,r,t,u,v)}}
})(window,document.currentScript&&document.currentScript.dataset.id);
