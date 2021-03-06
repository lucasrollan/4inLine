import { Board } from '../board'
import { Disc, getOpponentDisc } from '../disc'
import { PlayerAction } from '../player'
import { GameRules, GameVariation } from '../game-rules'
import Logger from 'js-logger'
import { getIndexOfHighest, average } from './helpers'
import { COLLUMN_NOT_ALLOWED } from './constants'

export class AI {
    static ratingActionsDepth = 4

    static getInput(
        board: Board,
        disc: Disc,
        gameVariation: GameVariation
    ): PlayerAction {
        if (board.isEmpty()) {
            return { columnIndex: Math.floor(board.size.columns / 2) }
        }

        const avaliableActions = AI.rateAvailableActions(
            board,
            disc,
            gameVariation,
            AI.ratingActionsDepth
        )
        const highestRatedAction = getIndexOfHighest(avaliableActions)
        Logger.info(
            'Available actions:',
            avaliableActions,
            'highest:',
            highestRatedAction
        )

        return { columnIndex: highestRatedAction }
    }

    static rateAvailableActions(
        board: Board,
        disc: Disc,
        gameVariation: GameVariation,
        depth: number
    ): number[] {
        let ratings: number[] = []
        const columnCount = board.size.columns
        for (let i = 0; i < columnCount; i += 1) {
            const action: PlayerAction = {
                columnIndex: i,
                disc,
            }
            let rating: number = COLLUMN_NOT_ALLOWED
            if (GameRules.isActionAllowed(board, action)) {
                const boardToRate = board.dropDisc(action)

                if (
                    GameRules.isWinningAction(
                        boardToRate,
                        action,
                        gameVariation
                    )
                ) {
                    rating = 1
                } else if (depth > 0) {
                    const opponentDisc = getOpponentDisc(action.disc)
                    const opponentActionRatings = AI.rateAvailableActions(
                        boardToRate,
                        opponentDisc,
                        gameVariation,
                        depth - 1
                    )

                    rating = -average(opponentActionRatings)
                } else {
                    rating = 0
                }
            }
            ratings = ratings.concat(rating)
        }

        return ratings
    }
}
