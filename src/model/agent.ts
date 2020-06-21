// TODO: separate
export enum AgentType {
    Human = 'HUMAN',
    AI = 'AI',
}
export interface Agent {
    type: AgentType
    name: string
}
