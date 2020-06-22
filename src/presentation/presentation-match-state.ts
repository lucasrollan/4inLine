import { Disc, PlayerType, BoardSize } from '../model'

export interface PresentationBoard {
    columns: Disc[][]
    size: BoardSize
}
export interface PresentationPlayer {
    name: string
    type: PlayerType
    disc: Disc
}
export interface PresentationMatchState {
    matchId: string
    players: PresentationPlayer[]
    board: PresentationBoard
    currentPlayer: number
    winner: number
    isOngoing: boolean
    pastTurn: PlayerType
    currentTurn: PlayerType
}
