// Trainer mode: tabs + checklist + flip + mixer + oral quiz (no server tracking)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.tabpage').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const el = document.getElementById('t-' + t.dataset.t);
    if (el) el.classList.add('active');
    if (t.dataset.t === 'lab' && window.initThree) window.initThree();
  }));

  // checklist (trainer ticks on projector)
  const boxes = document.querySelectorAll('#actBox input[type=checkbox]');
  const score = document.getElementById('actScore');
  if (boxes.length && score) {
    const upd = () => {
      const n = [...boxes].filter(b => b.checked).length;
      score.textContent = n + '/' + boxes.length + (n === boxes.length ? ' — class complete! 🎉' : '');
    };
    boxes.forEach(b => b.addEventListener('change', upd)); upd();
  }
  // flip cards (ask class, tap to reveal)
  document.querySelectorAll('.flip').forEach(f => f.addEventListener('click', () => {
    const inner = f.querySelector('.fin');
    const showingB = f.dataset.show === 'b';
    if (!showingB) { f.dataset.show = 'b'; inner.innerHTML = '✅<br><b>' + f.dataset.b + '</b><br><small>' + f.dataset.a + '</small>'; f.style.borderColor = '#10b981'; }
    else { f.dataset.show = 'a'; inner.innerHTML = '❓<br><b>' + f.dataset.a + '</b><br><small>ask class, tap to reveal</small>'; f.style.borderColor = ''; }
  }));
  // mixer reveal
  document.querySelectorAll('.mixbtn').forEach(b => b.addEventListener('click', () => {
    b.textContent = b.dataset.ok; b.disabled = true; b.style.opacity = '1';
  }));

  // oral knowledge check — reveal only, no POST
  const quizBox = document.getElementById('quizBox');
  if (quizBox) {
    document.getElementById('quizBtn').addEventListener('click', () => {
      quizBox.querySelectorAll('.q').forEach((q) => {
        q.querySelector('.explain').classList.remove('hidden');
        const correct = parseInt(q.dataset.answer, 10);
        q.querySelectorAll('.opt').forEach((label) => {
          const input = label.querySelector('input');
          if (parseInt(input.value, 10) === correct) label.style.background = '#eaf7ee';
        });
        q.style.borderColor = '#10b981';
      });
      document.getElementById('quizRes').textContent = '✅ Answers revealed — discuss each “why” aloud before moving on.';
    });
  }
});
