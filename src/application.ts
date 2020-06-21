import Logger from 'js-logger'
import {
    Match,
    MatchFactory,
    PlayerType,
    PlayerAction,
    GameVariation,
} from './model'

export const startMatch = (
    gameVariation: GameVariation,
    opponent: PlayerType
): Match => {
    const match = MatchFactory.build(gameVariation, opponent)

    match.attemptToRunAI()

    return match
}

export const performAction = (match: Match, columnIndex: number): Match => {
    const action: PlayerAction = {
        columnIndex,
    }
    Logger.log('performAction', match, action)
    match.takeTurn(action)

    match.attemptToRunAI()

    return match
}
