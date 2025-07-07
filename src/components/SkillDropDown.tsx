import { SKILL_LIST } from "../consts";

const SkillDropDown = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => {
    return <select {...props} >{SKILL_LIST.map((skill) => <option key={skill.name} value={skill.name} >{skill.name}</option>) }</select>
}

export default SkillDropDown;