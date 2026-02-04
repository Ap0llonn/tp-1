const slides = Array.from(document.querySelectorAll('.slide'));
const counter = document.querySelector('.counter');
const bar = document.querySelector('.bar');

let index = 0;

function showSlide(next) {
  index = (next + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    const isActive = i === index;
    slide.classList.toggle('active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });

  if (counter) {
    counter.textContent = `${index + 1} / ${slides.length}`;
  }

  if (bar) {
    const pct = ((index + 1) / slides.length) * 100;
    bar.style.width = `${pct}%`;
  }
}

function handleKey(event) {
  switch (event.key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
      event.preventDefault();
      showSlide(index + 1);
      break;
    case 'ArrowLeft':
    case 'PageUp':
      event.preventDefault();
      showSlide(index - 1);
      break;
    case 'Home':
      showSlide(0);
      break;
    case 'End':
      showSlide(slides.length - 1);
      break;
    default:
      break;
  }
}

function handleClick(event) {
  if (event.target.closest('a, button')) {
    return;
  }
  showSlide(index + 1);
}

document.addEventListener('keydown', handleKey);
document.addEventListener('click', handleClick);

document.addEventListener('DOMContentLoaded', () => {
  showSlide(index);
});

showSlide(index);
