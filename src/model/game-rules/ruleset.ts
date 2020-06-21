import { MaybeDisc } from "../disc";
import { BoardSize } from "../board";

export interface Ruleset {
    boardSize: BoardSize,
    lineObjective: number,
    // TODO: remove
    firstPlayer: MaybeDisc,
}
