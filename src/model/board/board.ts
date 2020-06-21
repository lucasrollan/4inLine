import { PlayerAction } from '../player'
import { Disc } from '../disc'
import { BoardFactory } from './board-factory'

export interface BoardSize {
    columns: number
    rows: number
}

export class Board {
    columns: Disc[][]
    constructor(public size: BoardSize) {}

    isEmpty(): boolean {
        return this.columns.every((column) => column.length === 0)
    }
    isFull(): boolean {
        return this.columns.every((column) => column.length === this.size.rows)
    }
    isColumnEmpty(columnIndex: number): boolean {
        return this.columns[columnIndex].length === 0
    }
    isColumnFull(columnIndex: number): boolean {
        return this.columns[columnIndex].length === this.size.rows
    }
    getDiscCountInColumn(columnIndex: number): number {
        return this.columns[columnIndex].length
    }
    getTopRow(columnIndex: number): number {
        return this.columns[columnIndex].length - 1
    }
    getDiscAt(columnIndex: number, row: number): Disc {
        return this.columns[columnIndex][row] || null
    }
    isWithinBoundaries(col: number, row: number): boolean {
        return (
            row >= 0 &&
            row < this.size.rows &&
            col >= 0 &&
            col < this.size.columns
        )
    }
    dropDisc(action: PlayerAction): Board {
        const column = this.columns[action.columnIndex]
        const newColumn: Disc[] = [...column, action.disc]

        const nextBoard = BoardFactory.build(this.size)
        nextBoard.columns = [...this.columns]
        nextBoard.columns[action.columnIndex] = newColumn

        return nextBoard
    }
}
