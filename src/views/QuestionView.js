import { choices } from '../data/choices.js';

const eggImages = import.meta.glob('../assets/eggs/*', { eager: true, query: '?url', import: 'default' });

function getImageUrl(filename) {
  const key = `../assets/eggs/${filename}`;
  return eggImages[key] ?? null;
}

export function QuestionView(page, step, totalSteps, { onAnswer, onBack }) {
  const el = document.createElement('div');
  el.className = 'question-view';

  // Progression
  const progress = document.createElement('p');
  progress.className = 'progress';
  progress.textContent = `${step + 1} / ${totalSteps}`;
  el.appendChild(progress);

  // Photos
  const photosEl = document.createElement('div');
  photosEl.className = 'photos';
  for (const filename of page.photos) {
    const url = getImageUrl(filename);
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = `Œuf ${page.id}`;
      photosEl.appendChild(img);
    }
  }
  el.appendChild(photosEl);

  // Question
  const question = document.createElement('h1');
  question.textContent = 'Qui a fait cet œuf ?';
  el.appendChild(question);

  // Boutons de réponse
  const buttonsEl = document.createElement('div');
  buttonsEl.className = 'choices';
  for (const choice of choices) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => onAnswer(choice));
    buttonsEl.appendChild(btn);
  }
  el.appendChild(buttonsEl);

  // Bouton retour
  const backBtn = document.createElement('button');
  backBtn.className = 'back-btn';
  backBtn.textContent = '← Retour';
  backBtn.disabled = step === 0;
  backBtn.addEventListener('click', () => onBack());
  el.appendChild(backBtn);

  return el;
}
