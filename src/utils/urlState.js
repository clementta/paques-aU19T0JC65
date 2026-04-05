import { pages } from '../data/pages.js';

const CHAR_MAP = { Aurélie: 'A', Clément: 'C', Jules: 'J' };
const CHAR_MAP_INV = { A: 'Aurélie', C: 'Clément', J: 'Jules' };

export function encodeAnswers(answers) {
  return answers.map((a) => CHAR_MAP[a] ?? '').join('');
}

export function decodeAnswers(str) {
  return [...str].map((c) => CHAR_MAP_INV[c]).filter(Boolean);
}

export function buildHash(step, answers) {
  const encoded = encodeAnswers(answers);
  if (step === 'recap') {
    return encoded ? `#step=recap&answers=${encoded}` : '#step=recap';
  }
  return encoded ? `#step=${step}&answers=${encoded}` : `#step=${step}`;
}

export function parseHash() {
  const hash = window.location.hash.slice(1); // remove leading #
  const params = new URLSearchParams(hash);
  const stepRaw = params.get('step') ?? '0';
  const answersRaw = params.get('answers') ?? '';

  const answers = decodeAnswers(answersRaw);

  if (stepRaw === 'recap') {
    return { step: 'recap', answers };
  }

  const step = parseInt(stepRaw, 10);

  // Guard: invalid step or answers length mismatch
  if (
    isNaN(step) ||
    step < 0 ||
    step > pages.length ||
    answers.length !== step
  ) {
    return { step: 0, answers: [], redirect: true };
  }

  return { step, answers };
}
