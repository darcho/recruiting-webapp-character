/** @jsxImportSource @emotion/react */

import { SKILL_LIST } from '../../consts';
import { Attributes, CharacterSkill } from '../../types';
import { calculateModifier } from '../../utils/calculateModifier';
import { Card, CardContent, CardTitle } from '../Common';
import Skill from '../Skill';

const SkillsCard = (props: {
  skillPoints: CharacterSkill[];
  onChange: (skillPoints: CharacterSkill[]) => void;
  attributes: Attributes;
  totalPointsAvailable: number;
}) => {
  const handleChange = (skillName: string) => (val: number) => {
    const updatedVal = props.skillPoints.map((s) => (s.name !== skillName ? s : { ...s, points: val }));
    props.onChange(updatedVal);
  };

  const pointsUsed = props.skillPoints.reduce((a, b) => a + b.points, 0);
  const pointsAvailable = props.totalPointsAvailable - pointsUsed;
  const isIncrementDisabled = pointsUsed >= props.totalPointsAvailable;

  return (
    <Card>
      <CardTitle>Skills</CardTitle>
      <CardContent>
        <div css={{ padding: '16px' }}>Total skill points available {pointsAvailable}</div>
        {SKILL_LIST.map((skill) => {
          const modifier = calculateModifier(props.attributes[skill.attributeModifier]);
          return (
            <SkillRow
              key={`${skill.name}`}
              onChange={handleChange(skill.name)}
              val={props.skillPoints.find((s) => s.name === skill.name)?.points ?? 0}
              skillName={skill.name}
              modifier={modifier}
              isIncrementDisabled={isIncrementDisabled}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

const SkillRow = (props: {
  skillName: string;
  val: number;
  modifier: number;
  isIncrementDisabled: boolean;
  onChange: (val: number) => void;
}) => {
  const handleChange = (val: number) => {
    props.onChange(val);
  };

  return (
    <Skill
      key={`${props.skillName}`}
      label={props.skillName}
      modifier={props.modifier}
      onChange={handleChange}
      value={props.val}
      isIncrementDisabled={props.isIncrementDisabled}
    />
  );
};

export default SkillsCard;
