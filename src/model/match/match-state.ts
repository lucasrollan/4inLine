import { Player } from "../player"
import { Board } from "../board"

export interface MatchState {
    // TODO: is board part of the state
    board: Board
    isOngoing: boolean
    currentTurnPlayer: Player
    winner: Player
}
