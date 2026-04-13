export const isValidPnr = (pnr: string) => {
  const cleaned = pnr.replace(/\D/g, "");

  if (!/^\d{12}$/.test(cleaned)) return false;

  const year = cleaned.substring(0, 4);
  const month = cleaned.substring(4, 6);
  const day = cleaned.substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  if (date.toString() === 'Invalid Date') return false;

  return luhnCheck(cleaned.substring(2));
};

const luhnCheck = (num: string) => {
  let sum = 0;
  let alt = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num[i]);

    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }

    sum += n;
    alt = !alt;
  }

  return sum % 10 === 0;
};