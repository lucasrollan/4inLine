import { BoardColumn } from "./board-column"
import { BoardRuleset } from "./board-ruleset"
import { GameRules } from "../game-rules"
import { PlayerAction } from "../player"
import { BoardActionPerformer } from "./board-action-performer"

export class Board {
    columns: BoardColumn[] = []
    constructor (public grid: BoardRuleset) {}

    isWinningConditionAtColumn(columnIndex: number, lineObjective: number): boolean {
        const row = this.getDiscCountInColumn(columnIndex) - 1
        return GameRules.isLine(this, columnIndex, row, lineObjective)
    }
    isEmpty() {
        return this.columns.every(column => column.discs.length === 0)
    }
    isFull(): boolean {
        return this.columns.every(column => column.discs.length === this.grid.rows)
    }
    isColumnFull(columnIndex: number): boolean {
        return this.columns[columnIndex].discs.length === this.grid.rows
    }
    dropDisc(action: PlayerAction): Board {
        return BoardActionPerformer.dropDisc(this, action.columnIndex, action.disc)
    }
    getDiscCountInColumn(columnIndex: number): number {
        return this.columns[columnIndex].discs.length
    }
    getDiscAt(columnIndex: number, row: number) {
        return this.columns[columnIndex].discs[row]
    }
}
