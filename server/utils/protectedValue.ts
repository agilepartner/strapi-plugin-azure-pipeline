export default function protectedValue(sensitiveValue) {
  if (sensitiveValue === false) return;

  return (
    sensitiveValue &&
    sensitiveValue.substring(0, 3) + sensitiveValue.substring(3).replace(/./g, '*')
  );
}
