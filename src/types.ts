export type Character = {    
    attributes: Attributes;
    skills: CharacterSkill[];
    selectedClass?: Class;
    totalAttributePoints: number;
}

export type CharacterSkill = {
    name: string;
    points: number;
}

export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";