import { Ruleset } from './ruleset'
import { Disc } from '../disc'

export enum GameVariation {
    connect4 = 'CONNECT_4',
    connect5 = 'CONNECT_5',
    tiny = 'TINY',
}

export const gameVariationRuleset = {
    [GameVariation.connect4]: {
        boardSize: {
            columns: 7,
            rows: 6,
        },
        lineObjective: 4,
        firstPlayer: Disc.secondary,
    } as Ruleset,
    [GameVariation.connect5]: {
        boardSize: {
            columns: 9,
            rows: 6,
        },
        lineObjective: 5,
        firstPlayer: Disc.secondary,
    } as Ruleset,
    [GameVariation.tiny]: {
        boardSize: {
            columns: 5,
            rows: 4,
        },
        lineObjective: 4,
        firstPlayer: Disc.secondary,
    } as Ruleset,
}

export const gameVariationStartingBoard = {
    [GameVariation.connect4]: null as Disc[][],
    [GameVariation.connect5]: [
        [
            Disc.primary,
            Disc.secondary,
            Disc.primary,
            Disc.secondary,
            Disc.primary,
            Disc.secondary,
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
            Disc.secondary,
            Disc.primary,
            Disc.secondary,
            Disc.primary,
            Disc.secondary,
            Disc.primary,
        ],
    ] as Disc[][],
    [GameVariation.tiny]: null as Disc[][],
}
