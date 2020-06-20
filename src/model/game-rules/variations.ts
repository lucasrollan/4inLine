import { Ruleset } from "./ruleset";
import { Disc } from "../board";

export enum GameVariation {
    connect4 = 'CONNECT_4',
    connect5 = 'CONNECT_5',
    tiny = 'TINY',
    connect4Infinity = 'CONNECT_4_INF',
}

export const gameVariationRuleset = {
    [GameVariation.connect4]: {
        boardSize: {
            columns: 7,
            rows: 6
        },
        lineObjective: 4,
        firstPlayer: Disc.B,
    } as Ruleset,
    [GameVariation.connect5]: {
        boardSize: {
            columns: 9,
            rows: 6
        },
        lineObjective: 4,
        firstPlayer: Disc.B,
    } as Ruleset,
    [GameVariation.tiny]: {
        boardSize: {
            columns: 5,
            rows: 4
        },
        lineObjective: 4,
        firstPlayer: Disc.B,
    } as Ruleset,
    [GameVariation.connect4Infinity]: {
        boardSize: {
            columns: 7,
            rows: 4
        },
        lineObjective: 4,
        firstPlayer: Disc.B,
        infinite: true,
    } as Ruleset,
}

export const gameVariationStartingBoard = {
    [GameVariation.connect5]: [
        [Disc.A, Disc.B, Disc.A, Disc.B, Disc.A, Disc.B],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [Disc.B, Disc.A, Disc.B, Disc.A, Disc.B, Disc.A],
    ] as Disc[][]
}
