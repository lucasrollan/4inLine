import Logger from 'js-logger'
import { Match, MatchFactory, BoardFactory, Agent, HumanAgent, MatchType, AgentType, PlayerAction, AIAgent, Ruleset, Disc } from './model'

const ruleset: Ruleset = {
    grid: {
        columns: 7,
        rows: 5,
    },
    lineObjective: 4,
    firstPlayer: Disc.B,
}

export const startMatch = (matchType: MatchType, secondPlayer: AgentType): Match => {
    const secondAgent = secondPlayer === AgentType.Human
        ? new HumanAgent()
        : new AIAgent()

    const agents = [
        new HumanAgent(),
        secondAgent
    ] as [Agent, Agent]
    agents[0].name = 'Player 1'
    agents[1].name = 'Player 2'
    const match = MatchFactory.build(ruleset, agents)

    match.attemptToRunAI()

    return match
}

export const performAction = (match: Match, columnIndex: number): Match => {
    const action: PlayerAction = {
        columnIndex,
    }
    Logger.log('performAction', match, action, columnIndex)
    match.completeTurn(action)

    match.attemptToRunAI()

    return match
}
