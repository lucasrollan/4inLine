import { Board } from '../board'

export interface MatchState {
    board: Board
    isOngoing: boolean
    currentTurnPlayer: number
    winner: number
}
