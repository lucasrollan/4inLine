import { Disc } from "./disc";

export enum PlayerType {
    Human = 'HUMAN',
    AI = 'AI',
}

export interface PlayerAction {
    columnIndex: number
    disc?: Disc
}
