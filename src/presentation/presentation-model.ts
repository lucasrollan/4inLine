import { Disc, Board, Player, BoardRuleset, AgentType } from "../model";
import { MatchState } from "../model";
import Logger from "js-logger";

export interface PresentationBoard {
    columns: Disc[][]
    grid: BoardRuleset
}
export interface PresentationPlayer {
    name: string,
    type: AgentType,
    color: string,
}
export interface PresentationModel {
    board: PresentationBoard
    currentPlayer: PresentationPlayer
    winner: PresentationPlayer
    ongoing: boolean
}

export class PresentationTranslator {
    static translateFromDomain(match: MatchState): PresentationModel {
        return ({
            board: this.transformBoard(match.board),
            currentPlayer: this.transformPlayer(match.currentPlayerTurn),
            ongoing: match.ongoing,
            winner: this.transformPlayer(match.winner),
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
        Logger.log('transformBoard', board)
        return {
            columns: board.columns.map(c => c.discs),
            grid: board.grid,
        }
    }
}
