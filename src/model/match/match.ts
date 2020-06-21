import Logger from 'js-logger'

import { PlayerAction } from '../player'
import { GameVariation } from '../game-rules'
import { PlayerType } from '../player'
import { GameRules } from '../game-rules'
import { getPlayerDisc } from '../disc'
import { AI } from '../ai'
import { MatchState } from './match-state'

export class Match {
    players: [PlayerType, PlayerType]
    state: MatchState

    constructor(public id: string, public gameVariation: GameVariation) {}

    attemptToRunAI(): void {
        if (
            this.state.isOngoing &&
            this.players[this.state.currentTurnPlayer] === PlayerType.AI
        ) {
            this.runAI()
        }
    }

    runAI(): void {
        const playerDisc = getPlayerDisc(this.state.currentTurnPlayer)
        const action: PlayerAction = AI.getInput(
            this.state.board,
            playerDisc,
            this.gameVariation
        )
        this.takeTurn(action)
    }

    takeTurn(action: PlayerAction): void {
        if (
            this.state.isOngoing &&
            GameRules.isActionAllowed(this.state.board, action)
        ) {
            const boardAction = {
                ...action,
                disc: getPlayerDisc(this.state.currentTurnPlayer),
            }
            this.updateState({
                board: this.state.board.dropDisc(boardAction),
            })
            Logger.log('action was performed', this.state)

            if (
                GameRules.isWinningAction(
                    this.state.board,
                    action,
                    this.gameVariation
                )
            ) {
                this.updateState({
                    winner: this.state.currentTurnPlayer,
                    isOngoing: false,
                })
            } else if (GameRules.isDraw(this.state.board)) {
                this.updateState({
                    isOngoing: false,
                })
            } else {
                const nextPlayer = GameRules.getNextPlayer(this)
                this.updateState({
                    currentTurnPlayer: nextPlayer,
                })
            }
        }
    }

    private updateState(newState: Partial<MatchState>): void {
        this.state = {
            ...this.state,
            ...newState,
        }
    }
}
