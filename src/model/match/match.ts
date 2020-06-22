import Logger from 'js-logger'

import { PlayerAction } from '../player'
import { GameVariation } from '../game-rules'
import { PlayerType } from '../player'
import { GameRules } from '../game-rules'
import { getPlayerDisc } from '../disc'
import { AI } from '../ai'
import { MatchState } from './match-state'

export type subscriber = (newState: MatchState) => void

export class Match {
    players: [PlayerType, PlayerType]
    state: MatchState
    subscribers: subscriber[] = []

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
            let nextState: Partial<MatchState> = {}
            const boardAction = {
                ...action,
                disc: getPlayerDisc(this.state.currentTurnPlayer),
            }
            nextState.board = this.state.board.dropDisc(boardAction)
            Logger.log('action was performed', this.state)

            if (
                GameRules.isWinningAction(
                    nextState.board,
                    action,
                    this.gameVariation
                )
            ) {
                nextState.winner = this.state.currentTurnPlayer
                nextState.isOngoing = false
            } else if (GameRules.isDraw(nextState.board)) {
                nextState.isOngoing = false
            } else {
                nextState.currentTurnPlayer = GameRules.getNextPlayer(this)
            }

            this.updateState(nextState)
        }
    }

    updateState(newState: Partial<MatchState>): void {
        this.state = {
            ...this.state,
            ...newState,
        }
        this.subscribers.forEach(sub => sub(this.state))
    }

    subscribe(onUpdate: subscriber): void {
        this.subscribers = this.subscribers.concat(onUpdate)
        onUpdate(this.state)
    }
}
