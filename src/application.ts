import { Match, MatchFactory, Board, BoardFactory, PlayerAction, ActionPerformer, Agent, HumanAgent } from './main'

const ruleset = {
    grid: {
        columns: 7,
        rows: 6,
    },
    lineObjective: 5,
    allowedActions: [PlayerAction.dropDisc],
}

export const startMatch = (): Match => {
    const agents = [
        new HumanAgent(),
        new HumanAgent(),
    ] as [Agent, Agent]
    agents[0].name = 'Player 1'
    agents[1].name = 'Player 2'
    const board = BoardFactory.build(ruleset.grid)
    const match = MatchFactory.build(ruleset, board, agents)

    return match
}

export const performAction = (match: Match, action: PlayerAction, index?: number): void => {
    if (action === PlayerAction.dropDisc) {
        ActionPerformer.dropDisc(match, index)
    }
}
