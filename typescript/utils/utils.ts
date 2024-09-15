export default function validateInput(
  input: string,
  min: number,
  max: number
): number | null {
  const parsed = parseInt(input, 10);
  return isNaN(parsed) || parsed < min || parsed > max ? null : parsed;
}
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
