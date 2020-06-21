import { Ruleset } from "./ruleset";
import { DiscColor } from "../board";

export enum GameVariation {
    connect4 = 'CONNECT_4',
    connect5 = 'CONNECT_5',
    tiny = 'TINY',
}

export const gameVariationRuleset = {
    [GameVariation.connect4]: {
        boardSize: {
            columns: 7,
            rows: 6
        },
        lineObjective: 4,
        firstPlayer: DiscColor.secondary,
    } as Ruleset,
    [GameVariation.connect5]: {
        boardSize: {
            columns: 9,
            rows: 6
        },
        lineObjective: 5,
        firstPlayer: DiscColor.secondary,
    } as Ruleset,
    [GameVariation.tiny]: {
        boardSize: {
            columns: 5,
            rows: 4
        },
        lineObjective: 4,
        firstPlayer: DiscColor.secondary,
    } as Ruleset,
}

export const gameVariationStartingBoard = {
    [GameVariation.connect4]: null as DiscColor[][],
    [GameVariation.connect5]: [
        [DiscColor.primary, DiscColor.secondary, DiscColor.primary, DiscColor.secondary, DiscColor.primary, DiscColor.secondary],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [DiscColor.secondary, DiscColor.primary, DiscColor.secondary, DiscColor.primary, DiscColor.secondary, DiscColor.primary],
    ] as DiscColor[][],
    [GameVariation.tiny]: null as DiscColor[][],
}
