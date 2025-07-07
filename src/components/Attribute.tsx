import styled from '@emotion/styled';
import { calculateModifier } from '../utils/calculateModifier';

function Attribute(props: { 
  label: string; 
  onChange: (val: number) => void; 
  value: number;
  isIncrementDisabled?: boolean;  
}) {


  const handleIncrementClick = () => {
    props.onChange(props.value + 1);
  };

  const handleDecrementClick = () => {
    const updatedVal = Math.max(props.value - 1, 0);
    props.onChange(updatedVal);
  };

  const modifier = calculateModifier(props.value);
  const isDecrementDisabled = props.value === 0;

  
  return (
    <AttributesContainer>
      <div>
        {props.label}: {props.value} (Modifier: {modifier})
      </div>
      <div>
        <Button disabled={props.isIncrementDisabled} onClick={handleIncrementClick}>+</Button>
        <Button disabled={isDecrementDisabled} onClick={handleDecrementClick}>-</Button>
      </div>
    </AttributesContainer>
  );
}

const AttributesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const Button = styled('button')({});

export default Attribute;
