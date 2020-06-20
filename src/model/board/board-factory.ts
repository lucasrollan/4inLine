import { Board, BoardSize } from "./board"
import { BoardColumn } from "./board-column"

export class BoardFactory {
    static build(grid: BoardSize): Board {
        const board = new Board(grid)
        for(let i = 0; i<grid.columns; i++) {
            const column = new BoardColumn()
            board.columns = board.columns.concat(column)
        }

        return board
    }

    static buildFrom(board: Board): Board {
        const newBoard = new Board(board.size)
        newBoard.columns = [...board.columns]

        return newBoard
    }
}
