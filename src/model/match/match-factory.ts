import { GameVariation, GameRules } from "../game-rules"
import { Agent } from "../agent"
import { Match } from "./match"
import { Disc, BoardFactory } from "../board"
import { MatchState } from "./match-state"

export class MatchFactory {
    static build(gameVariation: GameVariation, agents: [Agent, Agent]): Match {
        const matchId = Date.now().toString()
        const match = new Match(matchId, gameVariation)
        match.players = [
            { agent: agents[0], disc: Disc.A },
            { agent: agents[1], disc: Disc.B },
        ]

        match.state = this.buildMatchState(match)

        return match
    }

    static buildMatchState(match: Match): MatchState {
        const boardSize = GameRules.getVariationGridSize(match.gameVariation)
        const initialBoard = GameRules.getVariationInitialBoard(match.gameVariation)
        const board = BoardFactory.build(boardSize, initialBoard)

        const firstPlayer = match.players[0]

        const state: MatchState = {
            board,
            currentTurnPlayer: firstPlayer,
            isOngoing: true,
            winner: null,
        }

        return state
    }
}
