import React, { useEffect, useState } from 'react';
import { getCharactersRequest } from '../api/getCharacterRequest';
import { setCharactersRequest } from '../api/setCharacterRequest';
import { ATTRIBUTES_DEFAULTS, SKILL_LIST } from '../consts';
import { Attributes, Character, CharacterSkill, Class } from '../types';
import { calculateModifier } from '../utils/calculateModifier';

interface ContextValues {
  characters: Character[];
  getCharacterByIdx: (idx: number) => Character;
  updateCharacterAttributes: (idx: number, attributes: Attributes) => void;
  updateCharacterSkills: (idx: number, skills: CharacterSkill[]) => void;
  updateSelectedClass: (idx: number, selectedClass: Class) => void;
  addNewCharacter: () => void;
  resetCharacters: () => void;
  saveCharacters: () => void;
  getCharacterWithHighSkill: (skill: string) =>  [Character, number];
}

const CHARACTER_DEFAULTS: Character = {
  attributes: ATTRIBUTES_DEFAULTS,
  selectedClass: undefined,
  skills: SKILL_LIST.map((s) => ({ name: s.name, points: 0 })),
  totalAttributePoints: 0,
};

const CharacterContext = React.createContext<ContextValues>(undefined!);

const CharacterProvider = (props: { children: React.ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([CHARACTER_DEFAULTS]);

  useEffect(() => {
    getCharactersRequest()
      .catch((e) => {
        console.error(`There was an issue fetching characters: ${e}`);
      })
      .then((response) => {
        if (!!response) {
          setCharacters(response);
        }
      });
  }, []);

  const getCharacterByIdx = (idx: number) => characters.at(idx);

  const getCharacterWithHighSkill = (skill: string): [Character, number] => {
    const skillAttribute = SKILL_LIST.find((s) => s.name === skill);
  
    const characterWithHighestSkillIndex = characters.reduce((max, current, idx) => {
      const currentSkill = current.skills.find((s) => s.name === skill);
      const currentTotal =
        currentSkill?.points + calculateModifier(current.attributes[skillAttribute.attributeModifier]);

      const maxSkill = characters[idx].skills.find((s) => s.name === skill);
      const maxTotal = maxSkill.points + calculateModifier(characters[idx].attributes[skillAttribute.attributeModifier]);

      return currentTotal > maxTotal ? idx : max;
    }, 0);
    
    
    return [characters[characterWithHighestSkillIndex], characterWithHighestSkillIndex];
  };

  const addNewCharacter = () => {
    setCharacters((currentState) => [...currentState, CHARACTER_DEFAULTS]);
  };

  const resetCharacters = () => {
    setCharacters((currentState) => currentState.map((c) => CHARACTER_DEFAULTS));
  };

  const saveCharacters = () => {
    setCharactersRequest(characters)
      .catch((e) => {
        console.error(`There was an issue saving characters: ${e}`);
      })
      .then(() => {
        alert('Characters successfully saved');
      });
  };

  const updateCharacterAttributes = (idx: number, attributes: Attributes) => {
    setCharacters((currentState) => currentState.map((s, i) => (i !== idx ? s : { ...s, attributes })));
  };

  const updateCharacterSkills = (idx: number, skills: CharacterSkill[]) => {
    setCharacters((currentState) => currentState.map((s, i) => (i !== idx ? s : { ...s, skills })));
  };

  const updateSelectedClass = (idx: number, selectedClass: Class) => {
    setCharacters((currentState) => currentState.map((s, i) => (i !== idx ? s : { ...s, selectedClass })));
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        getCharacterByIdx,
        updateCharacterAttributes,
        updateCharacterSkills,
        updateSelectedClass,
        addNewCharacter,
        resetCharacters,
        saveCharacters,
        getCharacterWithHighSkill,
      }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
};

const useCharacter = () => {
  const context = React.useContext(CharacterContext);

  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }

  return context;
};

export { CharacterProvider, useCharacter };
