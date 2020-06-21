import Logger from 'js-logger'
import { Match, MatchFactory, Agent, AgentType, PlayerAction, GameVariation } from './model'

export const startMatch = (gameVariation: GameVariation, opponent: AgentType): Match => {
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
