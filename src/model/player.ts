import { Agent } from "./agent";
import { Disc } from "./board";

// TODO: What is a player, really?
// TODO: can the agent <-> disc relationship be moved to the match?
export interface Player {
    agent: Agent
    disc: Disc
}

export enum PlayerActionType {
    dropDisc = 'DROP_DISC',
    // popDisc = 'POP_DISC', TODO: create
}

export interface PlayerAction {
    type: PlayerActionType
    columnIndex: number
    disc?: Disc
}
