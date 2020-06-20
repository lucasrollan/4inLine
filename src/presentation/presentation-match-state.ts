import { Disc, Board, Player, AgentType, Match, BoardSize } from "../model";

export interface PresentationBoard {
    columns: Disc[][]
    size: BoardSize
}
export interface PresentationPlayer {
    name: string,
    type: AgentType,
    color: string,
}
export interface PresentationMatchState {
    matchId: string,
    players: PresentationPlayer[],
    board: PresentationBoard
    currentPlayer: PresentationPlayer
    winner: PresentationPlayer
    ongoing: boolean
}

export class PresentationTranslator {
    static translateFromDomain(match: Match): PresentationMatchState {
        return ({
            matchId: match.id,
            board: this.transformBoard(match.state.board),
            players: match.players.map(this.transformPlayer),
            currentPlayer: this.transformPlayer(match.state.currentTurnPlayer),
            ongoing: match.state.ongoing,
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
            color: player.disc === Disc.A ? 'red' : 'cyan',
        }
    }

    static transformBoard(board: Board): PresentationBoard {
        return {
            columns: board.columns.map(c => c.discs),
            size: board.size,
        }
    }
}
