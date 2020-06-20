import { Board, BoardSize } from "./board"
import { BoardColumn } from "./board-column"
import { Disc } from "../disc"

export class BoardFactory {
    static build(size: BoardSize, initialBoard?: Disc[][]): Board {
        const board = new Board(size)
        for(let i = 0; i<size.columns; i++) {
            const column = new BoardColumn()
            if(initialBoard) {
                column.discs = [ ...initialBoard[i] ]
            }
            board.columns = board.columns.concat(column)
        }

        return board
    }
}
