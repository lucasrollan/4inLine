import { BoardColumn } from "./board-column"
import { BoardRuleset } from "./board-ruleset"
import { BoardObjectiveChecker } from "./board-objective-checker"
import { PlayerActionType, PlayerAction } from "../player"
import { BoardActionPerformer } from "./board-action-performer"

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
    performAction(action: PlayerAction): Board {
        if (action.type === PlayerActionType.dropDisc) {
            return BoardActionPerformer.dropDisc(this, action.columnIndex, action.disc)
        }
    }
}
