// 고양이 등장: 페이지 제목 옆 · 문제 채점 반응 · 다 풀면 축하 · 페이지 끝에서 빼꼼
(function(){
const IMG=window.CAT_IMG; if(!IMG) return;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const OK=['정답이다냥!','천재냥?','이 정도는 껌이다냥','A+ 가자냥','완벽하다냥 ✨','교수님도 놀라겠다냥'];
const BAD=['틀렸다냥…','다시 보자냥','괜찮다냥, 해설 읽자냥','고양이도 가끔 틀린다냥','한 번 더 하면 맞힌다냥'];
const POKE=['공부하라냥','왜 만지냥','시험 얼마 안 남았다냥','★ 표시부터 보라냥','츄르 주면 알려 주겠다냥'];

// 고양이 말풍선
const toast=document.createElement('div'); toast.className='cat-toast'; toast.setAttribute('aria-hidden','true');
toast.innerHTML=`<p class="bubble"></p><img src="${IMG}" alt="">`;
document.body.appendChild(toast);
let timer;
function say(msg,kind,ms){
  toast.querySelector('.bubble').textContent=msg;
  toast.className='cat-toast on '+(kind||'');
  clearTimeout(timer); timer=setTimeout(()=>toast.classList.remove('on'),ms||1600);
}

// 고양이 모달: 화면 가운데에 뜨는 확인창 (window.catConfirm / catAlert → Promise)
const dlg=document.createElement('dialog'); dlg.className='cat-modal';
dlg.innerHTML=`<img src="${IMG}" alt=""><p class="cat-modal-title"></p><p class="cat-modal-msg"></p><div class="cat-modal-btns"><button type="button" class="no">취소냥</button><button type="button" class="yes primary">확인냥</button></div>`;
document.body.appendChild(dlg);
let settle=null;
const close=v=>{ if(!settle) return; const f=settle; settle=null; dlg.close(); f(v); };
dlg.querySelector('.yes').onclick=()=>close(true);
dlg.querySelector('.no').onclick=()=>close(false);
dlg.addEventListener('cancel',e=>{e.preventDefault(); close(false);});          // Esc
dlg.addEventListener('click',e=>{ if(e.target===dlg) close(false); });          // 바깥(배경) 클릭
function modal(msg,title,two){
  if(settle) close(false);
  dlg.querySelector('.cat-modal-title').textContent=title;
  dlg.querySelector('.cat-modal-msg').textContent=msg;
  dlg.querySelector('.no').hidden=!two;
  return new Promise(res=>{ settle=res; dlg.showModal(); dlg.querySelector(two?'.no':'.yes').focus(); });
}
window.catConfirm=msg=>modal(msg,'잠깐만냥!',true);
window.catAlert=msg=>modal(msg,'알려 주겠다냥',false);

// 페이지 제목 옆 고양이 (누르면 한마디)
const h1=document.querySelector('.page-head h1');
if(h1){
  const c=document.createElement('span'); c.className='head-cat'; c.title='눌러 보라냥';
  c.onclick=()=>say(pick(POKE));
  h1.appendChild(c);
}

// 문제: 고른 보기 · 계산 확인 결과에 반응
const quiz=document.getElementById('quiz');
if(quiz){
  const cards=()=>document.querySelectorAll('.q.qa');
  const react=card=>{
    const ok=card.classList.contains('marked-ok'), bad=card.classList.contains('marked-bad');
    if(!ok&&!bad) return;
    const all=cards().length, done=document.querySelectorAll('.q.qa.marked-ok,.q.qa.marked-bad').length;
    if(done===all){
      const n=document.querySelectorAll('.q.qa.marked-ok').length;
      say(`다 풀었다냥! ${n} / ${all} 🎉`,'party',3500); return;
    }
    say(ok?pick(OK):pick(BAD),ok?'':'bad');
  };
  quiz.addEventListener('click',e=>{
    const b=e.target.closest('.mc-opts button,.check'); if(!b) return;
    setTimeout(()=>react(b.closest('.q')),0);
  });
  quiz.addEventListener('keydown',e=>{
    if(e.key!=='Enter'||!e.target.matches('.calc-fields input')) return;
    const ins=[...e.target.closest('.calc-fields').querySelectorAll('input')];
    if(ins[ins.length-1]===e.target) setTimeout(()=>react(e.target.closest('.q')),0);
  });
}

// 이론 페이지: 끝까지 읽으면 빼꼼
if(document.body.classList.contains('mode-theory')&&!document.querySelector('.soon')){
  const peek=document.createElement('div'); peek.className='cat-peek'; peek.setAttribute('aria-hidden','true');
  peek.innerHTML='<p class="bubble">다 읽었다냥! 문제 풀러 가자냥</p>';
  document.body.appendChild(peek);
  const chk=()=>peek.classList.toggle('on',innerHeight+scrollY>=document.documentElement.scrollHeight-40);
  addEventListener('scroll',chk,{passive:true}); chk();
}
})();
