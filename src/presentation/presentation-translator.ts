import { Board, Match, AgentType, GameRules } from "../model";
import { PresentationMatchState, PresentationPlayer, PresentationBoard } from "./presentation-match-state";

export class PresentationTranslator {
    static translateFromDomain(match: Match): PresentationMatchState {
        return ({
            matchId: match.id,
            board: this.transformBoard(match.state.board),
            players: this.transformPlayers(match.players),
            currentPlayer: match.state.currentTurnPlayer,
            isOngoing: match.state.isOngoing,
            winner: match.state.winner,
        })
    }

    static transformPlayers(players: AgentType[]): PresentationPlayer[] {
        const presentationPlayers = players.map((type, index) => ({
            type,
            name: type === AgentType.AI ? 'AI' : 'Player 1',
            disc: GameRules.getPlayerDisc(index)
        }))
        if (players[1] === AgentType.Human) {
            presentationPlayers[1].name = 'Player 2'
        }
        
        return presentationPlayers
    }

    static transformBoard(board: Board): PresentationBoard {
        return {
            columns: board.columns.map(c => c.discs),
            size: board.size,
        }
    }
}
