import { DiscColor, AgentType, BoardSize } from "../model";

export interface PresentationBoard {
    columns: DiscColor[][]
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
    isOngoing: boolean
}
