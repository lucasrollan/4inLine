import { BoardFactory } from "./board-factory"
import { Board } from "./board"
import { DiscColor } from "../disc"

// TODO: performer?
// If using immutable and board is a Disc[][], may not be needed
export class BoardActionPerformer {
    static dropDisc(board: Board, columnIndex: number, disc?: DiscColor): Board {
        const column = board.columns[columnIndex]
        const newColumn = column.clone()
        newColumn.discs = column.discs.concat(disc)

        const nextBoard = BoardFactory.build(board.size)
        nextBoard.columns = [ ...board.columns ]
        nextBoard.columns[columnIndex] = newColumn

        return nextBoard
    }
}
