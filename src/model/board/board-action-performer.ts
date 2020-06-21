import { BoardFactory } from "./board-factory"
import { Board } from "./board"
import { Disc } from "../disc"

// TODO: performer?
export class BoardActionPerformer {
    static dropDisc(board: Board, columnIndex: number, disc?: Disc): Board {
        const column = board.columns[columnIndex]
        const newColumn = column.clone()
        newColumn.discs = column.discs.concat(disc)

        const nextBoard = BoardFactory.build(board.size)
        nextBoard.columns = [ ...board.columns ]
        nextBoard.columns[columnIndex] = newColumn

        return nextBoard
    }
}
