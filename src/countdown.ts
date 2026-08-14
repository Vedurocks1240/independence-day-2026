const TARGET_DATE = new Date('2026-08-14T12:00:00+05:30');

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function updateDisplay(): void {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minsEl.textContent = '00';
    secsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minsEl.textContent = pad(minutes);
  secsEl.textContent = pad(seconds);
}

export function initCountdown(): void {
  updateDisplay();
  setInterval(updateDisplay, 1000);
}
