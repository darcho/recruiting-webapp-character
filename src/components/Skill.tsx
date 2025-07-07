import styled from '@emotion/styled';

function Skill(props: {
  label: string;
  modifier: number;
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

  const isDecrementDisabled = props.value === 0;

  return (
    <AttributesContainer>
      <div>
        {props.label}: {props.value} (Modifier: {props.modifier}) total: {props.value + props.modifier}
      </div>
      <div>
        <Button disabled={props.isIncrementDisabled} onClick={handleIncrementClick}>
          +
        </Button>
        <Button disabled={isDecrementDisabled} onClick={handleDecrementClick}>
          -
        </Button>
      </div>
    </AttributesContainer>
  );
}

const AttributesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const Button = styled('button')({});

export default Skill;
