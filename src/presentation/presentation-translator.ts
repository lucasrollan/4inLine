import { DiscColor, Board, Player, Match } from "../model";
import { PresentationMatchState, PresentationPlayer, PresentationBoard } from "./presentation-match-state";

export class PresentationTranslator {
    static translateFromDomain(match: Match): PresentationMatchState {
        return ({
            matchId: match.id,
            board: this.transformBoard(match.state.board),
            players: match.players.map(this.transformPlayer),
            currentPlayer: this.transformPlayer(match.state.currentTurnPlayer),
            isOngoing: match.state.isOngoing,
            winner: this.transformPlayer(match.state.winner),
        })
    }

    static transformPlayer(player: Player): PresentationPlayer {
        if (!player) {
            return null
        }
        return {
            name: player.agent.name,
            type: player.agent.type,
            color: player.disc === DiscColor.primary ? 'red' : 'cyan',
        }
    }

    static transformBoard(board: Board): PresentationBoard {
        return {
            columns: board.columns.map(c => c.discs),
            size: board.size,
        }
    }
}
