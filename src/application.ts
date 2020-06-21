import Logger from 'js-logger'
import { Match, MatchFactory, Agent, HumanAgent, AgentType, PlayerAction, AIAgent, GameVariation } from './model'

export const startMatch = (gameVariation: GameVariation, secondPlayer: AgentType): Match => {
    // TODO: move this to match factory or game rules
    const secondAgent = secondPlayer === AgentType.Human
        ? new HumanAgent()
        : new AIAgent()

    const agents = [
        new HumanAgent(),
        secondAgent
    ] as [Agent, Agent]
    agents[0].name = 'Player 1'
    agents[1].name = 'Player 2'
    const match = MatchFactory.build(gameVariation, agents)

    match.attemptToRunAI()

    return match
}

export const performAction = (match: Match, columnIndex: number): Match => {
    const action: PlayerAction = {
        columnIndex,
    }
    Logger.log('performAction', match, action)
    match.completeTurn(action)

    match.attemptToRunAI()

    return match
}
