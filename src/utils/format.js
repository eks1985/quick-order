export const format1 = (n, currency) => {
  try {
    return n.toFixed(2).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? " " + c : c;
    }) + ' ' + currency;
  } catch (e) {
  }
}
