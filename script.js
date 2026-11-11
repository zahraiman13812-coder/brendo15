// BRENDO single-language website interactions
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const progress = document.querySelector('.scroll-progress span');
const floatingTop = document.querySelector('.floating-top');
function updateScrollUI() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progress) progress.style.width = value + '%';
  if (floatingTop) floatingTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', updateScrollUI, {passive:true});
updateScrollUI();

const revealItems = document.querySelectorAll('.proof-points, .goal-card, .supplement-facts, .alert-card, .ingredient-list article, .safety-warning, .safety-info-grid article, .pack-shot, .faq-items details, .section-heading');
revealItems.forEach(item => item.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.10});
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('visible'));

const modal = document.querySelector('.image-modal');
const modalImage = modal?.querySelector('img');
const closeModal = () => {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
};
document.querySelectorAll('.pack-shot').forEach(button => {
  button.addEventListener('click', () => {
    if (!modal || !modalImage) return;
    modalImage.src = button.dataset.image;
    modalImage.alt = button.querySelector('img')?.alt || 'Brendo packaging';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});
modal?.querySelector('.modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.querySelectorAll('.faq-items details').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.faq-items details').forEach(other => { if (other !== item) other.open = false; });
  });
});
