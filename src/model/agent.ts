// TODO: separate
export enum AgentType {
    Human = 'HUMAN',
    AI = 'AI',
}
export interface Agent {
    type: AgentType
    name: string
}

export class HumanAgent implements Agent {
    type = AgentType.Human
    name: string
}

export class AIAgent implements Agent {
    type = AgentType.AI
    name: string
}
