import { BoardColumn } from "./board-column"
import { BoardRuleset } from "./board-ruleset"
import { BoardObjectiveChecker } from "./board-objective-checker"
import { PlayerAction } from "../player"
import { BoardActionPerformer } from "./board-action-performer"
import { Disc } from "./disc"

export class Board {
    columns: BoardColumn[] = []
    constructor (public grid: BoardRuleset) {}

    isWinningConditionAtColumn(columnIndex: number, lineObjective: number): boolean {
        const row = this.columns[columnIndex].discs.length - 1
        return BoardObjectiveChecker.isVerticalLine(this, columnIndex, row, lineObjective)
            || BoardObjectiveChecker.isHorizontalLine(this, columnIndex, row, lineObjective)
            || BoardObjectiveChecker.isAscendingDiagonalLine(this, columnIndex, row, lineObjective)
            || BoardObjectiveChecker.isDescendingDiagonalLine(this, columnIndex, row, lineObjective)
    }
    isFull(): boolean {
        return this.columns.every(column => column.discs.length === this.grid.rows)
    }
    performAction(action: PlayerAction, columnIndex: number, disc?: Disc): Board {
        if (action === PlayerAction.dropDisc) {
            return BoardActionPerformer.dropDisc(this, columnIndex, disc)
        }
    }
}
