import { GameVariation, GameRules } from "../game-rules"
import { Agent, AgentType } from "../agent"
import { Match } from "./match"
import { Disc, BoardFactory } from "../board"
import { MatchState } from "./match-state"

export class MatchFactory {
    static build(gameVariation: GameVariation, opponent: AgentType): Match {
        const matchId = Date.now().toString()
        const match = new Match(matchId, gameVariation)
        match.players = [
            opponent,
            AgentType.Human
        ]

        match.state = this.buildMatchState(match)

        return match
    }

    static buildMatchState(match: Match): MatchState {
        const boardSize = GameRules.getVariationGridSize(match.gameVariation)
        const initialBoard = GameRules.getVariationInitialBoard(match.gameVariation)
        const board = BoardFactory.build(boardSize, initialBoard)

        const state: MatchState = {
            board,
            currentTurnPlayer: 0,
            isOngoing: true,
            winner: null,
        }

        return state
    }
}
