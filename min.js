/*! (c) Andrea Giammarchi (ISC) */var monthly=function(){"use strict";var s=[].includes||function(t){return-1<this.indexOf(t)};return function(t){var e,a,n=t.date,l=[].concat(null==t.highlight?(e=n,a=new Date,a.getMonth()===e.getMonth()&&a.getFullYear()===e.getFullYear()?[e.getDate()]:[]):t.highlight).concat(t.invert||[]),r=[].concat(t.blink||[]),o=[].concat(t.bold||[]),c=[].concat(t.dim||[]),u=[].concat(t.underline||[]),h=[].concat(null==t.freeDay?[0,6]:t.freeDay),i=t.locale||"en",s=null==t.startDay?1:t.startDay,g=!!t.table,D=g?16:10,f=n.toLocaleDateString(i,{month:"long"})+(t.year?" "+n.getFullYear():""),p=[" ".repeat(D-Math.ceil(f.length/2))," ".repeat(D-Math.floor(f.length/2))].join(f),y=[];g&&y.push("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"),y.push((g?"┃ ":"")+j(7,p)+(g?" ┃":"")),g&&y.push("┣━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┫");var v=new Date("1978-05-17");b(v,0),v.setDate(v.getDate()+s);for(var d,m=[],M=0;M<7;M++)m.push(j(2,(d=i,v.toLocaleDateString(d,{weekday:"short"}).slice(0,2)))),v.setDate(v.getDate()+1);y.push((g?"┃ ":"")+m.join(g?" ┃ ":" ")+(g?" ┃":"")),g&&y.push("┣━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━┫"),v.setTime(n.getTime()),v.setDate(1),b(v,s);for(M=0;M<6;M++)y.push((g?"┃ ":"")+w(v,n,h,l,r,o,c,u).join(g?" ┃ ":" ")+(g?" ┃":"")),5!==M&&g&&y.push("┣━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━┫");return g&&y.push("┗━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┛"),y};function b(t,e){for(;t.getDay()!==e;)t.setDate(t.getDate()-1)}function j(t,e){return"["+t+"m"+e+"[0m"}function w(t,e,a,n,l,r,o,c){for(var u=[];u.length<7;){if(e.getMonth()===t.getMonth()){var h=t.getDate(),i=(" "+h).slice(-2);s.call(r,h)&&(i=j(1,i)),(s.call(o,h)||s.call(a,t.getDay()))&&(i=j(2,i)),s.call(c,h)&&(i=j(4,i)),s.call(l,h)&&(i=j(5,i)),s.call(n,h)&&(i=j(7,i)),u.push(i)}else u.push("  ");t.setDate(t.getDate()+1)}return u}}();
