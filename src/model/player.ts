import { Agent } from "./agent";
import { Disc } from "./board";

// TODO: What is a player, really?
// TODO: can the agent <-> disc relationship be moved to the match?
export interface Player {
    agent: Agent
    disc: Disc
}

export enum PlayerAction {
    dropDisc = 'DROP_DISC',
    popDisc = 'POP_DISC',
}
