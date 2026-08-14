import './style.css';
import { initTerminal } from './terminal';
import { initCountdown } from './countdown';
import { renderAsciiTitle, renderChakra, rotateQuotes } from './ascii';

document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
  renderAsciiTitle();
  renderChakra();
  initCountdown();
  rotateQuotes();
});
