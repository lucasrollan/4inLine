import { Player } from "../player"
import { Board } from "../board"

export interface MatchState {
    board: Board
    ongoing: boolean
    currentPlayerTurn: Player
    winner: Player
}
