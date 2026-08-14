const ASCII_TITLE = `
    ██╗███╗   ██╗██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗███████╗
    ██║████╗  ██║██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██╔════╝
    ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     █████╗  
    ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██╔══╝  
    ██║██║ ╚████║██████╔╝███████╗██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗███████╗
    ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
`;

const QUOTES = [
  '"At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom." — Jawaharlal Nehru',
  '"Freedom is not worth having if it does not include the freedom to make mistakes." — Mahatma Gandhi',
  '"Swaraj is my birthright and I shall have it." — Bal Gangadhar Tilak',
  '"The best way to find yourself is to lose yourself in the service of others." — Mahatma Gandhi',
  `A nation's culture resides in the hearts and in the soul of its people." — Mahatma Gandhi',
  '"Give me blood, and I shall give you freedom." — Subhas Chandra Bose',
  '"Inquilab Zindabad!" — Bhagat Singh',
];

export function renderAsciiTitle(): void {
  const el = document.getElementById('ascii-title');
  if (el) el.textContent = ASCII_TITLE;
}

export function renderChakra(): void {
  const el = document.getElementById('chakra');
  if (!el) return;
}

export function rotateQuotes(): void {
  const el = document.getElementById('quote');
  if (!el) return;

  let idx = 0;
  el.textContent = QUOTES[0];

  setInterval(() => {
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % QUOTES.length;
      if (el) {
        el.textContent = QUOTES[idx];
        el.style.opacity = '1';
      }
    }, 500);
  }, 6000);
}
