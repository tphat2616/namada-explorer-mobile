export function displayHash(originalString: string) {
  const firstPart: string = originalString.slice(0, 12);
  const lastPart: string = originalString.slice(-8);
  const middlePart: string = "......";
  const result: string = firstPart + middlePart + lastPart;

  return result;
}
