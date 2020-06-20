import { Player, PlayerAction } from "../player"
import { Board } from "../board"
import { MatchState } from "./match-state"

// TODO: use immutable object instead of this dance
export class MatchStateUpdater {
    static performAction(state: MatchState, action: PlayerAction): MatchState {
        const boardAction = {...action, disc: state.currentTurnPlayer.disc}
        return this.setBoard(
            state,
            state.board.dropDisc(boardAction)
        )
    }

    static setBoard(state: MatchState, board: Board): MatchState {
        return this.set(state, 'board', board)
    }
    static setOngoing(state: MatchState, value: boolean): MatchState {
        return this.set(state, 'ongoing', value)
    }

    static setCurrentTurnPlayer(state: MatchState, player: Player): MatchState {
        return this.set(state, 'currentTurnPlayer', player)
    }

    static gameWon(state: MatchState, ): MatchState {
        const nextState = this.set(state, 'winner', state.currentTurnPlayer)
        return this.set(nextState, 'ongoing', false)
    }

    static gameDraw(state: MatchState, ): MatchState {
        return this.set(state, 'ongoing', false)
    }

    static set<K extends keyof MatchState>(state: MatchState, key: K, value: MatchState[K]): MatchState {
        const nextState = { ...state }
        nextState[key] = value
        return nextState
    }
}
