const trigger=document.getElementById('explore-ren');
const drawer=document.getElementById('ren-drawer');
const close=document.getElementById('drawer-close');
const go=document.getElementById('discover-more');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let departure=null;
if(trigger&&drawer&&close&&go&&typeof drawer.showModal==='function'){
  function reset(){clearTimeout(departure);departure=null;drawer.classList.remove('departing-home');document.body.classList.remove('drawer-open');trigger.setAttribute('aria-expanded','false');go.removeAttribute('aria-busy');}
  trigger.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();if(drawer.open)return;drawer.showModal();document.body.classList.add('drawer-open');trigger.setAttribute('aria-expanded','true');close.focus({preventScroll:true});});
  close.addEventListener('click',()=>drawer.close());
  drawer.addEventListener('click',e=>{if(e.target!==drawer)return;const r=drawer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)drawer.close();});
  drawer.addEventListener('close',()=>{reset();trigger.focus({preventScroll:true});});
  go.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||reduce.matches)return;e.preventDefault();if(departure!==null)return;go.setAttribute('aria-busy','true');drawer.classList.add('departing-home');departure=setTimeout(()=>location.assign(go.href),420);});
  window.addEventListener('pageshow',()=>{if(drawer.open)drawer.close();reset();});
}
