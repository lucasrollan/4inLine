import { BoardFactory } from "./board-factory"
import { Board } from "./board"
import { Disc } from "../disc"

export class BoardActions {
    static dropDisc(board: Board, columnIndex: number, disc?: Disc): Board {
        const column = board.columns[columnIndex]
        const newColumn: Disc[] = [...column, disc]

        const nextBoard = BoardFactory.build(board.size)
        nextBoard.columns = [ ...board.columns ]
        nextBoard.columns[columnIndex] = newColumn

        return nextBoard
    }
}
