import { Board, Disc } from "../board"
import { PlayerAction } from "../player"
import { Match } from "../match"
import { GameVariation, gameVariationRuleset, gameVariationStartingBoard } from "./variations"

export class GameRules {
    static getVariationGridSize(gameVariation: GameVariation) {
        return gameVariationRuleset[gameVariation].boardSize
    }

    static getVariationInitialBoard(gameVariation: GameVariation) {
        if (gameVariationStartingBoard[gameVariation])
        return gameVariationStartingBoard[gameVariation]
    }

    static isActionAllowed(board: Board, action: PlayerAction): boolean {
        return !board.isColumnFull(action.columnIndex)
    }

    static getNextPlayer(match: Match) {
        return match.state.currentTurnPlayer === match.players[0]
            ? match.players[1]
            : match.players[0]
    }

    static isDraw(board: Board) {
        return board.isFull()
    }

    static isWinningAction(board: Board, action: PlayerAction, gameVariation: GameVariation): boolean {
        return this.isLine(board, action.columnIndex, gameVariation)
    }

    static isLine(board: Board, colIndex: number, gameVariation: GameVariation): boolean {
        const lineLength = gameVariationRuleset[gameVariation].lineObjective

        return this.isVerticalLine(board, colIndex, lineLength)
            || this.isHorizontalLine(board, colIndex, lineLength)
            || this.isAscendingDiagonalLine(board, colIndex, lineLength)
            || this.isDescendingDiagonalLine(board, colIndex, lineLength)
    }

    static isVerticalLine(board: Board, colIndex: number, lineLength: number): boolean {
        const length = this.checkLineLength(board, colIndex, lineLength, Direction.NONE, Direction.DOWN)

        return length >= lineLength
    }

    static isHorizontalLine(board: Board, colIndex: number, lineLength: number): boolean {
        const length = this.checkLineLength(board, colIndex, lineLength, Direction.RIGTH, Direction.NONE)

        return length >= lineLength
    }

    static isAscendingDiagonalLine(board: Board, colIndex: number, lineLength: number): boolean {
        const length = this.checkLineLength(board, colIndex, lineLength, Direction.RIGTH, Direction.UP)

        return length >= lineLength
    }

    static isDescendingDiagonalLine(board: Board, colIndex: number, lineLength: number): boolean {
        const length = this.checkLineLength(board, colIndex, lineLength, Direction.RIGTH, Direction.DOWN)

        return length >= lineLength
    }

    static checkLineLength(board: Board, colIndex: number, lineLength: number, horizontalDirection: Direction, verticalDirection: Direction): number {
        if (board.isColumnEmpty(colIndex)) {
            return 0
        }

        const topRow = board.getTopRow(colIndex)
        const playerDisc = board.getDiscAt(colIndex, topRow)


        return 1
            + this.countDiscsInDirection(board, colIndex, topRow, lineLength, horizontalDirection, verticalDirection, playerDisc)
            + this.countDiscsInDirection(board, colIndex, topRow, lineLength, -horizontalDirection, -verticalDirection, playerDisc)
    }

    static countDiscsInDirection(
        board: Board,
        colIndex: number,
        row: number,
        lineLength: number,
        horizontalDirection: Direction,
        verticalDirection: Direction,
        disc: Disc
    ) {
        let count = 0

        for (
            let i = colIndex + horizontalDirection, j = row + verticalDirection;
            length < lineLength && board.isWithinBoundaries(i, j);
            i += horizontalDirection, j += verticalDirection
        ) {
            if (board.getDiscAt(i, j) !== disc) {
                break
            }
            count += 1
        }

        return count
    }
}

enum Direction {
    UP = 1,
    DOWN = -1,
    RIGTH = 1,
    LEFT = -1,
    NONE = 0,
}
