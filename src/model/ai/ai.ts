import { Board, Disc } from "../board"
import { PlayerAction } from "../player"
import { GameRules, GameVariation } from "../game-rules"
import Logger from "js-logger"


interface ActionRating {
    rating: number,
    action: PlayerAction,
    actionsConsidered: number
}

export default class AI {
    static ratingActionsDepth = 4

    static getInput(board: Board, disc: Disc, gameVariation: GameVariation): PlayerAction {
        if (board.isEmpty()) {
            return {
                columnIndex: Math.floor(board.size.columns/2)
            }
        }
    
        const avaliableActions = this.rateAvailableActions(board, disc, gameVariation, this.ratingActionsDepth)
        Logger.info('Available actions', avaliableActions)
    
        return this.getBestRatedAction(avaliableActions)
    }

    private static rateAvailableActions(board: Board, disc: Disc, gameVariation: GameVariation, depth: number): ActionRating[] {
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
                if (GameRules.isWinningAction(boardToRate, action, gameVariation)) {
                    rating = 1
                } else if (depth > 0) {
                    const opponentDisc = action.disc === Disc.A ? Disc.B : Disc.A
                    const opponentActionRatings = this.rateAvailableActions(boardToRate, opponentDisc, gameVariation, depth - 1)
    
                    // TODO: return an array of numbers and spare this function
                    rating = -averageRating(opponentActionRatings)
                    // TODO: spare this function
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

    private static getBestRatedAction(avaliableActions: ActionRating[]): PlayerAction {
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
