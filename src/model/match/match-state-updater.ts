import { Player, PlayerAction } from "../player"
import { Board } from "../board"
import { MatchState } from "./match-state"

export class MatchStateUpdater {
    static performAction(state: MatchState, action: PlayerAction, columnIndex: number): MatchState {
        return this.setBoard(
            state,
            state.board.performAction(action, columnIndex, state.currentPlayerTurn.disc)
        )
    }

    static setBoard(state: MatchState, board: Board): MatchState {
        return this.set(state, 'board', board)
    }
    static setOngoing(state: MatchState, value: boolean): MatchState {
        return this.set(state, 'ongoing', value)
    }

    static setCurrentPlayerTurn(state: MatchState, player: Player): MatchState {
        return this.set(state, 'currentPlayerTurn', player)
    }

    static gameWon(state: MatchState, ): MatchState {
        const nextState = this.set(state, 'winner', state.currentPlayerTurn)
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
