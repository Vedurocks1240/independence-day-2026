const CHARS = '01\u0905\u0906\u0907\u0908\u0909\u090A\u090B\u090F\u0910\u0913\u0914\u0905\u0902\u0905\u0903\u0915\u0916\u0917\u0918\u0919\u091A\u091B\u091C\u091D\u091E\u091F\u0920\u0921\u0922\u0923\u0924\u0925\u0926\u0927\u0928\u092A\u092B\u092C\u092D\u092E\u092F\u0930\u0932\u0935\u0936\u0937\u0938\u0939\u0933\u0915\u094D\u0937\u091C\u094D\u091E' +
              '0123456789ABCDEF<>[]{}()|/\\+=-*&%$#@!~`^';

interface TerminalCell {
  char: string;
  color: string;
  brightness: number;
  speed: number;
  y: number;
}

const COLORS = [
  '#FF9932',
  '#138808',
  '#000080',
  '#FFFFFF',
  '#e88620',
  '#0e7006',
];

export function initTerminal(): void {
  const canvas = document.getElementById('terminal-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) return;
  const ctx = maybeCtx;

  let width = window.innerWidth;
  let height = window.innerHeight;
  const fontSize = 14;
  let cols = Math.ceil(width / fontSize);
  let rows = Math.ceil(height / fontSize);

  canvas.width = width;
  canvas.height = height;

  const cells: TerminalCell[][] = [];

  function initGrid() {
    cells.length = 0;
    for (let r = 0; r < rows; r++) {
      const row: TerminalCell[] = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          brightness: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.02 + 0.005,
          y: Math.random() * Math.PI * 2,
        });
      }
      cells.push(row);
    }
  }

  initGrid();

  let frame = 0;
  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.12)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    ctx.textBaseline = 'top';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = cells[r][c];

        if (Math.random() < 0.003) {
          cell.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        cell.y += cell.speed;
        const wave = Math.sin(cell.y + frame * 0.01 + c * 0.1) * 0.5 + 0.5;
        const alpha = cell.brightness * wave;

        ctx.fillStyle = cell.color;
        ctx.globalAlpha = alpha;
        ctx.fillText(cell.char, c * fontSize, r * fontSize);
        ctx.globalAlpha = 1;
      }
    }

    frame++;
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    cols = Math.ceil(width / fontSize);
    rows = Math.ceil(height / fontSize);
    initGrid();
  });
}
