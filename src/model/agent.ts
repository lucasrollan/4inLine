import { Board, Disc } from "./board"
import { PlayerAction } from "./player"
import { getInput } from "./ai"
import { GameVariation } from "./game-rules"

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
    type = AgentType.Human
    name: string
    getInput() {}
}

export class AIAgent implements Agent {
    type = AgentType.AI
    name: string
    // TODO: depth should come from some other place
    getInput(board: Board, disc: Disc, gameVariation: GameVariation): PlayerAction {
        return getInput(board, disc, gameVariation, 5)
    }
}
