import { Player } from "../player"
import { Board } from "../board"

export interface MatchState {
    board: Board
    isOngoing: boolean
    currentTurnPlayer: Player
    winner: Player
}
