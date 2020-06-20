import { Player } from "../player"
import { Board } from "../board"

export interface MatchState {
    board: Board
    ongoing: boolean
    currentTurnPlayer: Player
    winner: Player
}
