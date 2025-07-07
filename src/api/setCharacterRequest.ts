import { Character } from '../types';

export async function setCharactersRequest(request: Character[]): Promise<void> {
  await fetch('https://recruiting.verylongdomaintotestwith.ca/api/darcho/character', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
}
