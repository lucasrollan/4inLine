import Logger from "js-logger"

import { PlayerAction } from "../player"
import { GameVariation } from "../game-rules"
import { MatchStateUpdater } from "./match-state-updater"
import { PlayerType } from "../player"
import { GameRules } from "../game-rules"
import { AI } from "../ai"
import { MatchState } from "./match-state"

export class Match {
    players: [PlayerType, PlayerType]
    state: MatchState

    constructor (
        public id: string,
        public gameVariation: GameVariation
    ) {}

    // TODO: add prettier
    attemptToRunAI() {
        if (
            this.state.isOngoing
            && this.players[this.state.currentTurnPlayer] === PlayerType.AI
        ) {
            const playerDisc = GameRules.getPlayerDisc(this.state.currentTurnPlayer)
            const action: PlayerAction = AI.getInput(this.state.board, playerDisc, this.gameVariation)
            this.takeTurn(action)
        }
    }

    takeTurn(action: PlayerAction): void {
        if (this.state.isOngoing && GameRules.isActionAllowed(this.state.board, action)) {
            const boardAction = {...action, disc: GameRules.getPlayerDisc(this.state.currentTurnPlayer)}
            this.updateState({
                board: this.state.board.dropDisc(boardAction)
            })
            Logger.log('action was performed', this.state)

            if(GameRules.isWinningAction(this.state.board, action, this.gameVariation)) {
                this.updateState({
                    winner: this.state.currentTurnPlayer,
                    isOngoing: false,
                })
            } else if (GameRules.isDraw(this.state.board)) {
                this.updateState({
                    isOngoing: false,
                })
            }

            const nextPlayer = GameRules.getNextPlayer(this)
            this.state = {...this.state, currentTurnPlayer: nextPlayer}
        }
    }

    private updateState(newState: Partial<MatchState>): void {
        this.state = {
            ...this.state,
            ...newState,
        }
    }
}
