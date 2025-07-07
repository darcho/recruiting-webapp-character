import { CLASS_LIST } from '../../consts';
import { Class } from '../../types';
import { Card, CardContent, CardTitle } from '../Common';

const ClassRequirementsCard = (props: {
    selectedClass: Class,
    onClose: () => void,
}) => {

  const classRequirememts = CLASS_LIST[props.selectedClass];

  return (
    <Card>
      <CardTitle>{props.selectedClass} Minimum Requirements</CardTitle>
      <CardContent>
        {Object.entries(classRequirememts).map((requirement) => <div key={requirement[0]} >{requirement[0]}: {requirement[1]}</div>)}
        <button onClick={props.onClose} >Close Requirements</button>
      </CardContent>
    </Card>
  );
};
export default ClassRequirementsCard;
