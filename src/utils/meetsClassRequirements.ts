import { CLASS_LIST } from "../consts";
import { Attributes, Class } from "../types";

export function meetsClassRequirements(attributes: Attributes, clss: Class) {
    const classRequirements = CLASS_LIST[clss];
    return Object.entries(attributes).every((attr) => {        
        if(attr[0] in classRequirements) {                        
            return attr[1] >= classRequirements[attr[0]];
        }
        return false;
    });
}