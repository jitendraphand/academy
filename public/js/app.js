// Tabs + checklist + flip + mixer + quiz + progress APIs
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.tabpage').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const el = document.getElementById('t-' + t.dataset.t);
    if (el) el.classList.add('active');
    if (t.dataset.t === 'lab' && window.initThree) window.initThree();
  }));

  // checklist score
  const boxes = document.querySelectorAll('#actBox input[type=checkbox]');
  const score = document.getElementById('actScore');
  if (boxes.length && score) {
    const upd = () => {
      const n = [...boxes].filter(b => b.checked).length;
      score.textContent = n + '/' + boxes.length + (n === boxes.length ? ' — perfect! 🎉' : '');
    };
    boxes.forEach(b => b.addEventListener('change', upd)); upd();
  }
  // flip cards
  document.querySelectorAll('.flip').forEach(f => f.addEventListener('click', () => {
    const inner = f.querySelector('.fin');
    const showingB = f.dataset.show === 'b';
    if (!showingB) { f.dataset.show = 'b'; inner.innerHTML = '✅<br><b>' + f.dataset.b + '</b><br><small>' + f.dataset.a + '</small>'; f.style.borderColor = '#10b981'; }
    else { f.dataset.show = 'a'; inner.innerHTML = '❓<br><b>' + f.dataset.a + '</b><br><small>tap to flip</small>'; f.style.borderColor = ''; }
  }));
  // mixer reveal
  document.querySelectorAll('.mixbtn').forEach(b => b.addEventListener('click', () => {
    b.textContent = b.dataset.ok; b.disabled = true; b.style.opacity = '1';
  }));

  const quizBox = document.getElementById('quizBox');
  if (quizBox) {
    document.getElementById('quizBtn').addEventListener('click', async () => {
      const answers = {};
      quizBox.querySelectorAll('.q').forEach((q, i) => {
        const sel = q.querySelector('input:checked');
        answers[i] = sel ? sel.value : -1;
        q.querySelector('.explain').classList.remove('hidden');
        const correct = parseInt(q.dataset.answer, 10);
        q.style.borderColor = sel && parseInt(sel.value, 10) === correct ? '#10b981' : '#ef4444';
      });
      const res = await fetch('/api/quiz', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: quizBox.dataset.course, idx: parseInt(quizBox.dataset.idx, 10), answers })
      }).then(r => r.json());
      const el = document.getElementById('quizRes');
      if (res.ok) {
        el.innerHTML = `You scored <b>${res.score}/${res.total}</b> — ${res.passed ? '✅ PASSED! Next module unlocked (if theory done).' : '❌ Need 60% — review Learn tab & retry (best score kept).'}`;
        el.style.color = res.passed ? '#10b981' : '#f59e0b';
        const badge = document.getElementById('quizBadge'); if (res.passed && badge) badge.textContent = '✅';
      }
    });
  }

  const lessonBtn = document.getElementById('lessonBtn');
  if (lessonBtn && quizBox) {
    lessonBtn.addEventListener('click', async () => {
      await fetch('/api/lesson-done', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: quizBox.dataset.course, idx: parseInt(quizBox.dataset.idx, 10) })
      });
      lessonBtn.textContent = '✓ Theory marked complete';
    });
  }
  const pracBtn = document.getElementById('pracBtn');
  if (pracBtn && quizBox) {
    pracBtn.addEventListener('click', async () => {
      const notes = document.getElementById('pracNotes').value;
      if (!notes.trim()) { document.getElementById('pracRes').textContent = 'Please write what you did + mentor sign before submitting.'; return; }
      await fetch('/api/practical', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: quizBox.dataset.course, idx: parseInt(quizBox.dataset.idx, 10), notes })
      });
      document.getElementById('pracRes').textContent = '✅ Practical submitted! Visible to admin.';
      pracBtn.textContent = '✓ Practical submitted — update';
    });
  }
});
