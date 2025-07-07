/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { SKILL_LIST } from '../../consts';
import { useCharacter } from '../../contexts/CharacterContext';
import { calculateModifier } from '../../utils/calculateModifier';
import { DICE_MAX, rollDice } from '../../utils/rollDice';
import { Card, CardContent, CardTitle, Row, Stack } from '../Common';
import SkillDropDown from '../SkillDropDown';

const SkillCheckCard = (props: { index: number }) => {
  const { getCharacterByIdx } = useCharacter();
  const [skill, setSkill] = useState<string>(SKILL_LIST[0].name);
  const character = getCharacterByIdx(props.index);
  const [dc, setDC] = useState(DICE_MAX);
  const [dice, setDice] = useState<number>();

  const handleSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDice(undefined);
    const value = event.target.value;
    setSkill(value);
  };

  const handleDCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDice(undefined);
    const value = Math.max(Math.min(parseInt(event.target.value), DICE_MAX), 1);
    setDC(value);
  };

  const handleRollClick = () => {
    const result = rollDice();
    setDice(result);
  };

  const skillAttribute = SKILL_LIST.find((s) => s.name === skill);
  const selectedSkill = character.skills.find((s) => s.name === skill);
  const modifier = skillAttribute ? calculateModifier(character.attributes[skillAttribute.attributeModifier]) : 0;

  const isSuccess = selectedSkill ? selectedSkill.points + modifier + dice >= dc : false;

  return (
    <Card>
      <CardTitle>Skill Check</CardTitle>
      <CardContent>
        {dice ? (
          <Stack>
            <div>
              Skill: {skill}: {selectedSkill.points}
            </div>
            <div>You rolled: {dice}</div>
            <div>The DC was: {dc}</div>
            <div>Result: {isSuccess ? 'SUCCESS' : 'FAILURE'}</div>
          </Stack>
        ) : null}
        <Row
          css={{
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <div>
            <label htmlFor="skill">Choose a skill:</label>
            <SkillDropDown id="skill" value={skill} onChange={handleSkillChange} />
          </div>
          <div>
            <label htmlFor="dc">DC:</label>
            <input id="dc" value={dc} type="number" onChange={handleDCChange} />
          </div>
          <button onClick={handleRollClick}>Roll</button>
        </Row>
      </CardContent>
    </Card>
  );
};

export default SkillCheckCard;
