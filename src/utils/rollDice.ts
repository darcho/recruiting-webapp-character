export const DICE_MAX = 20;

export function rollDice(): number {
  return Math.floor(Math.random() * DICE_MAX) + 1;
}