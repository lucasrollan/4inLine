// TODO: BAD!
import { BoardFactory } from "./board-factory"
import { Board } from "./board"
import { Disc } from "./disc"
import Logger from "js-logger"

export class BoardActionPerformer {
    // TODO: return new board and drop everything about the match
    static dropDisc(board: Board, columnIndex: number, disc?: Disc): Board {
        const column = board.columns[columnIndex]
        const newColumn = column.clone()
        newColumn.discs = column.discs.concat(disc)

        const nextBoard = BoardFactory.buildFrom(board)
        nextBoard.columns[columnIndex] = newColumn

        Logger.log('dropped disc', nextBoard, newColumn, columnIndex, disc)

        return nextBoard
    }
}
