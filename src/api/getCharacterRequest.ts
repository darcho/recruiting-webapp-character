import { Character } from '../types';

export interface Response<T> {
  statusCode: number;
  body: T;
}

export async function getCharactersRequest(): Promise<Character[] | null> {
  try {
    const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/darcho/character', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error with status: ${response.status}`);
    }

    const data = (await response.json()) as Response<Character[]>;
    return data.body;
  } catch (e) {
    console.error('getCharactersRequest error:', e);
    return null;
  }
}
