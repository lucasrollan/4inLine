import { PlayerAction } from "../player"
import { Board } from "../board"
import { MatchState } from "./match-state"
import { GameRules } from "../game-rules"

// TODO: use immutable object instead of this dance. Delete the whole class
export class MatchStateUpdater {
    static performAction(state: MatchState, action: PlayerAction): MatchState {
        const boardAction = {...action, disc: GameRules.getPlayerDisc(state.currentTurnPlayer)}
        return {
            ...state,
            board: state.board.dropDisc(boardAction)
        }
    }
}
