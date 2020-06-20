import { BoardFactory } from "./board-factory"
import { Board } from "./board"
import { Disc } from "../disc"

export class BoardActionPerformer {
    static dropDisc(board: Board, columnIndex: number, disc?: Disc): Board {
        const column = board.columns[columnIndex]
        const newColumn = column.clone()
        newColumn.discs = column.discs.concat(disc)

        const nextBoard = BoardFactory.buildFrom(board)
        nextBoard.columns[columnIndex] = newColumn

        return nextBoard
    }
}
