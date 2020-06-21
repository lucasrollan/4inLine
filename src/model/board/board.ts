import { PlayerAction } from "../player"
import { BoardActionPerformer } from "./board-action-performer"
import { Disc } from "../disc"

export interface BoardSize {
    columns: number
    rows: number
}

export class Board {
    columns: Disc[][]
    constructor (public size: BoardSize) {}

    isEmpty() {
        return this.columns.every(column => column.length === 0)
    }
    isFull(): boolean {
        return this.columns.every(column => column.length === this.size.rows)
    }
    isColumnEmpty(columnIndex: number): boolean {
        return this.columns[columnIndex].length === 0
    }
    isColumnFull(columnIndex: number): boolean {
        return this.columns[columnIndex].length === this.size.rows
    }
    dropDisc(action: PlayerAction): Board {
        return BoardActionPerformer.dropDisc(this, action.columnIndex, action.disc)
    }
    getDiscCountInColumn(columnIndex: number): number {
        return this.columns[columnIndex].length
    }
    getTopRow(columnIndex: number): number {
        return this.columns[columnIndex].length - 1
    }
    getDiscAt(columnIndex: number, row: number) {
        return this.columns[columnIndex][row]
    }
    isWithinBoundaries(col: number, row: number): boolean {
        return row >= 0 && row < this.size.rows
            && col >= 0 && col < this.size.columns
    }
}
