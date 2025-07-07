import styled from '@emotion/styled';
import { useCharacter } from '../contexts/CharacterContext';
import { Character, CharacterSkill, Class } from '../types';

import { calculateModifier } from '../utils/calculateModifier';
import AttributesCard from './cards/AttributesCard';
import ClassesCard from './cards/ClassesCard';
import SkillCheckCard from './cards/SkillCheckCard';
import SkillsCard from './cards/SkillsCard';
import { Card } from './Common';

const CharacterSheet = (props: { character: Character; index: number }) => {
  const { updateSelectedClass, updateCharacterAttributes, updateCharacterSkills } = useCharacter();

  const handleClassSelected = (val: Class) => {
    updateSelectedClass(props.index, val);
  };

  const handleAttributesUpdate = (updatedAttributes) => {
    updateCharacterAttributes(props.index, updatedAttributes);
  };

  const handleSkillsUpdate = (updatedSkillPoints: CharacterSkill[]) => {
    updateCharacterSkills(props.index, updatedSkillPoints);
  };

  const skillPointsAvailable = 10 + 4 * calculateModifier(props.character.attributes.Intelligence);

  return (
    <Card>
      <h2>Character {props.index + 1}</h2>
      <SkillCheckCard index={props.index} />
      <CardsContainer>
        <AttributesCard attributes={props.character.attributes} onUpdate={handleAttributesUpdate} />
        <ClassesCard
          attributes={props.character.attributes}
          selectedClass={props.character.selectedClass}
          onChange={handleClassSelected}
        />
        <SkillsCard
          attributes={props.character.attributes}
          skillPoints={props.character.skills}
          onChange={handleSkillsUpdate}
          totalPointsAvailable={skillPointsAvailable}
        />
      </CardsContainer>
    </Card>
  );
};
const CardsContainer = styled('div')({
  display: 'flex',
  gap: '16px',
  justifyContent: 'space-evenly',
});

export default CharacterSheet;
