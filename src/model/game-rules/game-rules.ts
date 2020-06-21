import { Board, Disc } from "../board"
import { PlayerAction } from "../player"
import { Match } from "../match"
import { GameVariation, gameVariationRuleset, gameVariationStartingBoard } from "./variations"

export class GameRules {
    static getVariationGridSize(gameVariation: GameVariation) {
        return gameVariationRuleset[gameVariation].boardSize
    }

    static getVariationInitialBoard(gameVariation: GameVariation): Disc[][] {
        if (gameVariationStartingBoard[gameVariation])
        return gameVariationStartingBoard[gameVariation]
    }

    static isActionAllowed(board: Board, action: PlayerAction): boolean {
        return !board.isColumnFull(action.columnIndex)
    }

    static getNextPlayer(match: Match): number {
        return match.state.currentTurnPlayer === 0
            ? 1
            : 0
    }

    static isDraw(board: Board): boolean {
        return board.isFull()
    }

    static isWinningAction(board: Board, action: PlayerAction, gameVariation: GameVariation): boolean {
        const columnIndex = action.columnIndex
        const lineLength = gameVariationRuleset[gameVariation].lineObjective

        return this.hasLineOfLength(board, columnIndex, lineLength, direction.vertical)
            || this.hasLineOfLength(board, columnIndex, lineLength, direction.horizontal)
            || this.hasLineOfLength(board, columnIndex, lineLength, direction.ascending)
            || this.hasLineOfLength(board, columnIndex, lineLength, direction.descending)
    }

    static hasLineOfLength(board: Board, colIndex: number, lineLength: number, direction: Direction): boolean {
        if (board.isColumnEmpty(colIndex)) {
            return false
        }

        const topRow = board.getTopRow(colIndex)
        const playerDisc = board.getDiscAt(colIndex, topRow)
        const oppositeDirection = [-direction[0], -direction[1]] as Direction

        const length = 1
            + this.countDiscsInDirection(board, colIndex, topRow, lineLength, direction, playerDisc)
            + this.countDiscsInDirection(board, colIndex, topRow, lineLength, oppositeDirection, playerDisc)

        return length >= lineLength
    }

    static countDiscsInDirection(
        board: Board,
        colIndex: number,
        row: number,
        lineLength: number,
        direction: Direction,
        disc: Disc
    ) {
        let count = 0

        for (
            let i = colIndex + direction[0], j = row + direction[1];
            length < lineLength && board.isWithinBoundaries(i, j);
            i += direction[0], j += direction[1]
        ) {
            if (board.getDiscAt(i, j) !== disc) {
                break
            }
            count += 1
        }

        return count
    }
}

type Direction = [number, number]
const direction = {
    horizontal: [1, 0] as Direction,
    vertical: [0, -1] as Direction,
    ascending: [1, 1] as Direction,
    descending: [1, -1] as Direction,
}
