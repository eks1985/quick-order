export const isNumeric = (obj) => {
  const type = typeof obj;
  return (type === "number" || type === "string") &&
  // parseFloat NaNs numeric-cast false positives ("")
  // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
  // subtraction forces infinities to NaN
  !isNaN(obj - parseFloat( obj));
}
