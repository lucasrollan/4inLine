import { Board, Match, PlayerType, GameRules } from "../model";
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

    static transformPlayers(players: PlayerType[]): PresentationPlayer[] {
        const presentationPlayers = players.map((type, index) => ({
            type,
            name: type === PlayerType.AI ? 'AI' : 'Player 1',
            disc: GameRules.getPlayerDisc(index)
        }))
        if (players[1] === PlayerType.Human) {
            presentationPlayers[1].name = 'Player 2'
        }
        
        return presentationPlayers
    }

    static transformBoard(board: Board): PresentationBoard {
        return {
            columns: [...board.columns],
            size: board.size,
        }
    }
}
