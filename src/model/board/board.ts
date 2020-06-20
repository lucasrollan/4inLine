import { BoardColumn } from "./board-column"
import { PlayerAction } from "../player"
import { BoardActionPerformer } from "./board-action-performer"

export interface BoardSize {
    columns: number
    rows: number
}

export class Board {
    columns: BoardColumn[] = []
    constructor (public size: BoardSize) {}

    isEmpty() {
        return this.columns.every(column => column.discs.length === 0)
    }
    isFull(): boolean {
        return this.columns.every(column => column.discs.length === this.size.rows)
    }
    isColumnEmpty(columnIndex: number): boolean {
        return this.columns[columnIndex].discs.length === 0
    }
    isColumnFull(columnIndex: number): boolean {
        return this.columns[columnIndex].discs.length === this.size.rows
    }
    dropDisc(action: PlayerAction): Board {
        return BoardActionPerformer.dropDisc(this, action.columnIndex, action.disc)
    }
    getDiscCountInColumn(columnIndex: number): number {
        return this.columns[columnIndex].discs.length
    }
    getTopRow(columnIndex: number): number {
        return this.columns[columnIndex].discs.length - 1
    }
    getDiscAt(columnIndex: number, row: number) {
        return this.columns[columnIndex].discs[row]
    }
    isWithinBoundaries(col: number, row: number): boolean {
        if (row < 0 || row >= this.size.columns) {
            return false
        }
        return col >= 0 && col < this.size.columns
    }
}
