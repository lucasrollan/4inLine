import { Board, BoardSize } from "./board"
import { Disc } from "../disc"

export class BoardFactory {
    static build(size: BoardSize, initialBoard?: Disc[][]): Board {
        const board = new Board(size)
        board.columns = []
        for(let i = 0; i<size.columns; i++) {
            let column: Disc[] = []
            if(initialBoard) {
                column = [ ...initialBoard[i] ]
            }
            board.columns = [
                ...board.columns,
                column
            ]
        }

        return board
    }
}
