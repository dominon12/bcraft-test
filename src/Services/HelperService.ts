/**
 * Generates a pseudo random number
 *
 * @returns a number from 0 to 1'000'000
 */
export function getRandomId() {
  return Math.floor(Math.random() * 1_000_000);
}
