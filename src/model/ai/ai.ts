import { Board, Disc } from "../board"
import { PlayerAction } from "../player"
import { GameRules, GameVariation } from "../game-rules"
import Logger from "js-logger"

export function getInput(board: Board, disc: Disc, gameVariation: GameVariation, depth: number): PlayerAction {
    if (board.isEmpty()) {
        return {
            columnIndex: Math.floor(board.size.columns/2)
        }
    }

    const avaliableActions = rateAvailableActions(board, disc, gameVariation, depth)
    Logger.info('Available actions', avaliableActions)

    return getBestRatedAction(avaliableActions)
}

interface ActionRating {
    rating: number,
    action: PlayerAction,
    actionsConsidered: number
}

function getBestRatedAction(avaliableActions: ActionRating[]): PlayerAction {
    let highest = -Infinity
    let highestRated: PlayerAction = null

    for(let rating of avaliableActions) {
        if (rating.rating > highest) {
            highest = rating.rating
            highestRated = rating.action
        }
    }

    return highestRated
}

function rateAvailableActions(board: Board, disc: Disc, gameVariation: GameVariation, depth: number): ActionRating[] {
    let ratings: ActionRating[] = []
    const columnCount = board.size.columns
    for(let i = 0; i < columnCount; i += 1) {
        const action: PlayerAction = {
            columnIndex: i,
            disc: disc,
        }
        if (GameRules.isActionAllowed(board, action)) {
            const boardToRate = board.dropDisc(action)

            let rating = 0
            let actionsConsidered = 1
            if (isWinningAction(boardToRate, action, gameVariation)) {
                rating = 1
            } else if (depth > 0) {
                const opponentDisc = action.disc === Disc.A ? Disc.B : Disc.A
                const opponentActionRatings = rateAvailableActions(boardToRate, opponentDisc, gameVariation, depth - 1)

                rating = -averageRating(opponentActionRatings)
                actionsConsidered += sumActionsConsidered(opponentActionRatings)
            }

            ratings = ratings.concat({
                action,
                rating,
                actionsConsidered,
            })
            if (rating === 1) {
                break
            }
        }
    }

    return ratings
}

function isWinningAction(board: Board, action: PlayerAction, gameVariation: GameVariation): boolean {
    const row = board.getDiscCountInColumn(action.columnIndex) - 1
    return GameRules.isLine(board, action.columnIndex, row, gameVariation)
}

function averageRating(ratings: ActionRating[] = []): number {
    if (ratings.length === 0) {
        return 0
    }

    let sum = 0
    for(let r of ratings) {
        sum += r.rating
    }
    return sum / ratings.length
}

function sumActionsConsidered(ratings: ActionRating[] = []): number {
    if (ratings.length === 0) {
        return 0
    }

    let sum = 0
    for(let r of ratings) {
        sum += r.actionsConsidered
    }
    return sum
}
