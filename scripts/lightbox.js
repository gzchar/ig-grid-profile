document.addEventListener('DOMContentLoaded', () => {
  // only target the first five posts
  const figures = Array.from(document.querySelectorAll('.post_grid .figure:nth-child(-n+5)'));
  if (!figures.length) return;

  const lb = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let current = 0;

  function openAt(index) {
    const fig = figures[index];
    const img = fig.querySelector('img');
    const capHtml = fig.querySelector('figcaption')?.innerHTML || img.alt || '';
    if (!img) return;
    current = index;
    lbImage.src = img.src;
    lbImage.alt = img.alt || '';
    lbCaption.innerHTML = capHtml;
    lb.setAttribute('aria-hidden', 'false');
    lb.querySelector('.lightbox-inner').dataset.index = index;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImage.removeAttribute('src');
  }

  function showNext(delta) {
    const next = (current + delta + figures.length) % figures.length;
    openAt(next);
  }

  figures.forEach((fig, i) => {
    fig.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      openAt(i);
    });
  });

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  lbPrev.addEventListener('click', () => showNext(-1));
  lbNext.addEventListener('click', () => showNext(1));

  document.addEventListener('keydown', (e) => {
    if (lb.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    }
  });
});