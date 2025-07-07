import styled from '@emotion/styled';
import { useCharacter } from '../contexts/CharacterContext';
import CharacterSheet from './CharacterSheet';
import { Page } from './Common';

const CharacterSheets = () => {
  const { characters, addNewCharacter, resetCharacters, saveCharacters } = useCharacter();

  const addNewCharacterClick = () => {
    addNewCharacter();
  };

  const resetAllCharactersClick = () => {
    resetCharacters();
  };

  const saveAllCharactersClick = () => {
    saveCharacters();
  };

  return (
    <Page>
      <Actions>
        <button onClick={addNewCharacterClick}>Add New Character</button>
        <button onClick={resetAllCharactersClick}>Reset All Characters</button>
        <button onClick={saveAllCharactersClick}>Save All Characters</button>
      </Actions>
      {/* <PartySkillCheckCard /> */}
      {characters?.map((character, idx) => (
        <CharacterSheet key={`character-${idx}`} index={idx} character={character} />
      ))}
    </Page>
  );
};

const Actions = styled('div')({
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
});

export default CharacterSheets;
