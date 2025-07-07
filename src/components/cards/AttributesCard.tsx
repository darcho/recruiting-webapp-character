/** @jsxImportSource @emotion/react */

import { ATTRIBUTE_LIST, MAX_FOR_ATTRIBUTES } from '../../consts';
import { Attributes } from '../../types';
import Attribute from '../Attribute';
import { Card, CardContent, CardTitle } from '../Common';

const AttributesCard = (props: {
  attributes: Attributes,  
  onUpdate: (attributes: Attributes) => void,
}) => {

  const handleAttributeChange = (property: keyof Attributes) => (updatedAttribute: number) => {    
    const updatedAttributes: Attributes = {
      ...props.attributes,
      [property]: updatedAttribute,
    };

    props.onUpdate(updatedAttributes);
  };

  const totalScore = Object.values(props.attributes).reduce((a, b) => a + b, 0);
  const pointsAvailable = MAX_FOR_ATTRIBUTES - totalScore;
  const isIncrementDisabled = pointsAvailable <= 0;

  return (
    <Card>
      <CardTitle>Attributes</CardTitle>
      <CardContent>
        <div css={{ padding: '16px' }}>Total points available {pointsAvailable}</div>
        {ATTRIBUTE_LIST.map((attribute) => (
          <Attribute
            key={attribute}
            label={attribute}
            value={props.attributes[attribute] as number}
            onChange={handleAttributeChange(attribute as keyof Attributes)}
            isIncrementDisabled={isIncrementDisabled}
          />
        ))}
      </CardContent>
    </Card>
  );
};
export default AttributesCard;
