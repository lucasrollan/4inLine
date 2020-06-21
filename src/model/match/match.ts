import Logger from "js-logger"

import { PlayerAction } from "../player"
import { GameVariation } from "../game-rules"
import { MatchStateUpdater } from "./match-state-updater"
import { AgentType } from "../player"
import { GameRules } from "../game-rules"
import { AI } from "../ai"
import { MatchState } from "./match-state"

export class Match {
    players: [AgentType, AgentType]
    state: MatchState

    constructor (
        public id: string,
        public gameVariation: GameVariation
    ) {}

    // TODO: add prettier
    attemptToRunAI() {
        if (
            this.state.isOngoing
            && this.players[this.state.currentTurnPlayer] === AgentType.AI
        ) {
            const playerDisc = GameRules.getPlayerDisc(this.state.currentTurnPlayer)
            const action: PlayerAction = AI.getInput(this.state.board, playerDisc, this.gameVariation)
            this.takeTurn(action)
        }
    }

    takeTurn(action: PlayerAction): void {
        if (this.state.isOngoing && GameRules.isActionAllowed(this.state.board, action)) {
            this.state = MatchStateUpdater.performAction(this.state, action)
            Logger.log('action was performed', this.state)

            if(GameRules.isWinningAction(this.state.board, action, this.gameVariation)) {
                this.state = MatchStateUpdater.gameWon(this.state)
            } else if (GameRules.isDraw(this.state.board)) {
                this.state = MatchStateUpdater.gameDraw(this.state)
            }

            const nextPlayer = GameRules.getNextPlayer(this)
            this.state = MatchStateUpdater.setCurrentTurnPlayer(this.state, nextPlayer)
        }
    }
}
