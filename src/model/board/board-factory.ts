import { BoardRuleset } from "./board-ruleset"
import { Board } from "./board"
import { BoardColumn } from "./board-column"

export class BoardFactory {
    static build(grid: BoardRuleset): Board {
        const board = new Board(grid)
        for(let i = 0; i<grid.columns; i++) {
            const column = new BoardColumn()
            board.columns = board.columns.concat(column)
        }

        return board
    }

    static buildFrom(board: Board): Board {
        const newBoard = new Board(board.grid)
        newBoard.columns = [...board.columns]

        return newBoard
    }
}
