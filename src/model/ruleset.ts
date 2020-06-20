import { BoardRuleset, MaybeDisc } from "./board";
import { PlayerAction } from "./player";

export interface Ruleset {
    grid: BoardRuleset,
    lineObjective: number,
    allowedActions: PlayerAction[],
    firstPlayer?: MaybeDisc,
}
