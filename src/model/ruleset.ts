import { BoardRuleset, MaybeDisc } from "./board";

export interface Ruleset {
    grid: BoardRuleset,
    lineObjective: number,
    firstPlayer?: MaybeDisc,
}
