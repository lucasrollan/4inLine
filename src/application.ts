import Logger from 'js-logger'
import {
    Match,
    MatchFactory,
    PlayerType,
    PlayerAction,
    GameVariation,
    subscriber,
} from './model'

export const createMatch = (
    gameVariation: GameVariation,
    opponent: PlayerType
): Match => {
    const match = MatchFactory.build(gameVariation, opponent)
    Logger.log('match created', match)

    return match
}

export const subscribeToMatch = (match: Match, onUpdate: subscriber): void => {
    match.subscribe(onUpdate)
}

export const startMatch = (match: Match): void => {
    match.attemptToRunAI()
}

export const performAction = (match: Match, columnIndex: number): void => {
    const action: PlayerAction = {
        columnIndex,
    }
    Logger.log('performAction', match, action)
    match.takeTurn(action)

    match.attemptToRunAI()
}
