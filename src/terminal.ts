const CHARS = '01अआइईउऊऋएऐओऔअंअःकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहळक्षज्ञ' +
              '0123456789ABCDEF<>[]{}()|/\\+=-*&%$#@!~`^';

interface TerminalCell {
  char: string;
  color: string;
  brightness: number;
  speed: number;
  y: number;
}

const COLORS = [
  '#FF9932', // saffron
  '#138808', // green
  '#000080', // navy
  '#FFFFFF', // white
  '#e88620',
  '#0e7006',
];

export function initTerminal(): void {
  const canvas = document.getElementById('terminal-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

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
