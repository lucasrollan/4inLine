import { BoardRuleset, MaybeDisc } from "./board";
import { PlayerActionType } from "./player";

export interface Ruleset {
    grid: BoardRuleset,
    lineObjective: number,
    allowedActions: PlayerActionType[],
    firstPlayer?: MaybeDisc,
}
