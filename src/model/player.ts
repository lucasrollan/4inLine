import { Disc } from "./board";

export enum AgentType {
    Human = 'HUMAN',
    AI = 'AI',
}

// TODO: needed?
export interface PlayerAction {
    columnIndex: number
    disc?: Disc
}
