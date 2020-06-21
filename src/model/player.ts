import { Agent } from "./agent";
import { Disc } from "./board";

// TODO: What is a player, really?
// TODO: can the agent <-> disc relationship be moved to the match?
export interface Player {
    agent: Agent
    disc: Disc
}

// TODO: needed?
export interface PlayerAction {
    columnIndex: number
    disc?: Disc
}
