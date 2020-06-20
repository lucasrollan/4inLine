import { Board, Disc } from "./board"

export enum AgentType {
    Human = 'HUMAN',
    AI = 'AI',
}
export interface Agent {
    type: AgentType
    name: string
    getInput: Function
}

export class HumanAgent implements Agent {
    type: AgentType.Human
    name: string
    getInput() {}
}

export class AIAgent implements Agent {
    type: AgentType.AI
    name: string
    getInput(board: Board, disc: Disc, depth: number): number {
        return 0
    }
}
