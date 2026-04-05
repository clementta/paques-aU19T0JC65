import './style.css';
import { pages } from './data/pages.js';
import { parseHash, buildHash } from './utils/urlState.js';
import { QuestionView } from './views/QuestionView.js';
import { RecapView } from './views/RecapView.js';

const app = document.getElementById('app');

function render() {
  const { step, answers, redirect } = parseHash();

  if (redirect) {
    window.location.hash = '#step=0';
    return;
  }

  app.innerHTML = '';

  if (step === 'recap') {
    app.appendChild(RecapView(answers));
    return;
  }

  const page = pages[step];
  const view = QuestionView(page, step, pages.length, {
    onAnswer(choice) {
      const newAnswers = [...answers, choice];
      const nextStep = step + 1 >= pages.length ? 'recap' : step + 1;
      window.location.hash = buildHash(nextStep, newAnswers);
    },
    onBack() {
      if (step === 0) return;
      const newAnswers = answers.slice(0, -1);
      window.location.hash = buildHash(step - 1, newAnswers);
    },
  });

  app.appendChild(view);
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => {
  if (!window.location.hash) {
    window.location.hash = '#step=0';
  } else {
    render();
  }
});
