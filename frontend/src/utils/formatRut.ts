export function formatRut(event: HTMLInputElement): void {
  // Limpiar RUT
  const newRut = event.value
    .replace(/\./g, '')
    .replace(/\-/g, '')
    .replace(/[^0-9kK]/g, '')
    .trim()
    .toLowerCase();

  const DV: string = newRut.slice(-1);
  const RUN: string = newRut.slice(0, -1);

  if (!newRut) {
    event.value = '';
    return;
  }

  // Formatear RUT XX.XXX.XXX-X
  let format: string = '';
  let count: number = 0;

  for (let i = RUN.length; i > 0; i--) {
    const e = RUN.charAt(i - 1);
    format = e.concat(format);

    count++;

    if (count === 3 && i > 1) {
      format = '.'.concat(format);
      count = 0;
    }
  }

  event.value = format
    .concat('-')
    .concat(DV)
    .toUpperCase();
};