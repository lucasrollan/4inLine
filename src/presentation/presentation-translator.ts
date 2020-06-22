import { Board, Match, PlayerType, getPlayerDisc, MatchState } from '../model'
import {
    PresentationMatchState,
    PresentationPlayer,
    PresentationBoard,
} from './presentation-match-state'

export class PresentationTranslator {
    static translateFromDomain(
        match: Match,
        matchState: MatchState
    ): PresentationMatchState {
        return {
            matchId: match.id,
            board: PresentationTranslator.transformBoard(matchState.board),
            players: PresentationTranslator.transformPlayers(match.players),
            currentPlayer: matchState.currentTurnPlayer,
            isOngoing: matchState.isOngoing,
            winner: matchState.winner,
            pastTurn: match.players[matchState.currentTurnPlayer === 1 ? 0 : 1],
            currentTurn: match.players[matchState.currentTurnPlayer],
        }
    }

    static transformPlayers(players: PlayerType[]): PresentationPlayer[] {
        const presentationPlayers = players.map((type, index) => ({
            type,
            name: type === PlayerType.AI ? 'AI' : 'Player 1',
            disc: getPlayerDisc(index),
        }))

        if (presentationPlayers[0].type === PlayerType.Human) {
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
