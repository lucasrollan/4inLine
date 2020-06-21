import { Board, Disc } from "../board"
import { PlayerAction } from "../player"
import { GameRules, GameVariation } from "../game-rules"
import Logger from "js-logger"
import { getIndexOfHighest, average } from "./helpers"

export default class AI {
    static ratingActionsDepth = 4

    static getInput(board: Board, disc: Disc, gameVariation: GameVariation): PlayerAction {
        if (board.isEmpty()) {
            return { columnIndex: Math.floor(board.size.columns/2) }
        }
    
        const avaliableActions = this.rateAvailableActions(board, disc, gameVariation, this.ratingActionsDepth)
        Logger.info('Available actions', avaliableActions)
    
        return { columnIndex: getIndexOfHighest(avaliableActions) }
    }

    private static rateAvailableActions(board: Board, disc: Disc, gameVariation: GameVariation, depth: number): number[] {
        let ratings: number[] = []
        const columnCount = board.size.columns
        for(let i = 0; i < columnCount; i += 1) {
            const action: PlayerAction = {
                columnIndex: i,
                disc: disc,
            }
            if (GameRules.isActionAllowed(board, action)) {
                const boardToRate = board.dropDisc(action)
    
                let rating = 0
                if (GameRules.isWinningAction(boardToRate, action, gameVariation)) {
                    rating = 1
                } else if (depth > 0) {
                    const opponentDisc = action.disc === Disc.A ? Disc.B : Disc.A
                    const opponentActionRatings = this.rateAvailableActions(boardToRate, opponentDisc, gameVariation, depth - 1)
    
                    rating = -average(opponentActionRatings)
                }
    
                ratings = ratings.concat(rating)
                if (rating === 1) {
                    break
                }
            }
        }
    
        return ratings
    }
}
