import Logger from 'js-logger'
import { Match, MatchFactory, BoardFactory, PlayerAction, Agent, HumanAgent, AIAgent, MatchType, AgentType } from './model'

const ruleset = {
    grid: {
        columns: 7,
        rows: 6,
    },
    lineObjective: 4,
    allowedActions: [PlayerAction.dropDisc],
}

export const startMatch = (matchType: MatchType, secondPlayer: AgentType): Match => {
    const agents = [
        new HumanAgent(),
        new HumanAgent(),
    ] as [Agent, Agent]
    agents[0].name = 'Player 1'
    agents[1].name = 'Player 2'
    const board = BoardFactory.build(ruleset.grid)
    const match = MatchFactory.build(ruleset, board, agents)

    Logger.log('starting', match)

    return match
}

export const performAction = (match: Match, action: PlayerAction, columnIndex: number): void => {
    Logger.log('performAction', match, action, columnIndex)
    match.performAction(action, columnIndex)
}
