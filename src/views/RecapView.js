import { pages } from '../data/pages.js';

const eggImages = import.meta.glob('../assets/eggs/*', { eager: true, query: '?url', import: 'default' });

function getImageUrl(filename) {
  const key = `../assets/eggs/${filename}`;
  return eggImages[key] ?? null;
}

export function RecapView(answers) {
  const el = document.createElement('div');
  el.className = 'recap-view';

  const title = document.createElement('h1');
  title.textContent = 'Récapitulatif';
  el.appendChild(title);

  const list = document.createElement('div');
  list.className = 'recap-list';

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const answer = answers[i] ?? '—';

    const item = document.createElement('div');
    item.className = 'recap-item';

    // Miniatures
    const thumbs = document.createElement('div');
    thumbs.className = 'recap-thumbs';
    for (const filename of page.photos) {
      const url = getImageUrl(filename);
      if (url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Œuf ${page.id}`;
        thumbs.appendChild(img);
      }
    }
    item.appendChild(thumbs);

    // Réponse
    const answerEl = document.createElement('p');
    answerEl.className = 'recap-answer';
    answerEl.textContent = answer;
    item.appendChild(answerEl);

    list.appendChild(item);
  }

  el.appendChild(list);

  // Bouton rejouer
  const replayBtn = document.createElement('button');
  replayBtn.className = 'replay-btn';
  replayBtn.textContent = 'Rejouer';
  replayBtn.addEventListener('click', () => {
    window.location.hash = '#step=0';
  });
  el.appendChild(replayBtn);

  return el;
}
