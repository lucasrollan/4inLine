import Logger from 'js-logger'
import { Match, MatchFactory, BoardFactory, PlayerActionType, Agent, HumanAgent, MatchType, AgentType, PlayerAction, AIAgent } from './model'

const ruleset = {
    grid: {
        columns: 7,
        rows: 6,
    },
    lineObjective: 4,
    allowedActions: [PlayerActionType.dropDisc],
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
    const board = BoardFactory.build(ruleset.grid)
    const match = MatchFactory.build(ruleset, board, agents)

    Logger.log('starting', match, 'vs', secondAgent)

    match.runTurns()

    return match
}

export const performAction = (match: Match, actionType: PlayerActionType, columnIndex: number): Match => {
    const action: PlayerAction = {
        type: actionType,
        columnIndex,
    }
    Logger.log('performAction', match, action, columnIndex)
    match.completeTurn(action)

    match.runTurns()

    return match
}
