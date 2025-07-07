/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { CLASS_LIST } from '../../consts';
import { Attributes, Class } from '../../types';
import { meetsClassRequirements } from '../../utils/meetsClassRequirements';
import { Card, CardContent, CardTitle } from '../Common';
import ClassRequirementsCard from './ClassRequirementsCard';

const ClassesCard = (props: { attributes: Attributes; selectedClass: Class; onChange: (val: Class) => void }) => {
  const handleClassClick = (val: Class) => () => {
    props.onChange(val);
  };

  const handleCloseClassRequirements = () => {
    props.onChange(undefined);
  };

  return (
    <Card>
      <CardTitle>Classes</CardTitle>
      <CardContent>
        {Object.keys(CLASS_LIST).map((k) => (
          <ClassField
            key={k}
            meetsRequirements={meetsClassRequirements(props.attributes, k as Class)}
            onClick={handleClassClick(k as Class)}
          >
            {k}
          </ClassField>
        ))}

        {props.selectedClass ? (
          <div css={{ marginTop: '16px' }}>
            <ClassRequirementsCard selectedClass={props.selectedClass} onClose={handleCloseClassRequirements} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

const ClassField = styled('span')<{ meetsRequirements: boolean }>((props) => ({
  cursor: 'pointer',
  color: props.meetsRequirements ? 'red' : undefined,
  '&:hover': {
    color: 'red',
  },
}));

export default ClassesCard;
