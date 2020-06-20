import Logger from "js-logger"

import { Player, PlayerAction } from "../player"
import { Ruleset } from "../ruleset"
import { MatchState } from "./match-state"
import { MatchStateUpdater } from "./match-state-updater"
import { AgentType, AIAgent } from "../agent"

export class Match {
    players: [Player, Player]
    state: MatchState
    constructor (
        public id: string,
        public ruleset: Ruleset
    ) {}

    runTurns() {
        while (this.state.ongoing) {
            if (this.state.currentTurnPlayer.agent.type === AgentType.AI) {
                this.runAITurn()
            } else {
                return
            }
        }
    }

    runAITurn(): void {
        const ai = this.state.currentTurnPlayer.agent as AIAgent
        const action: PlayerAction = ai.getInput(this.state.board, this.state.currentTurnPlayer.disc, 4)
        
        this.completeTurn(action)
    }

    completeTurn(action: PlayerAction): void {
        this.performAction(action)

        //TODO: move to rules
        if (this.state.board.isWinningConditionAtColumn(action.columnIndex, this.ruleset.lineObjective)) {
            this.state = MatchStateUpdater.gameWon(this.state)
        } else if (this.state.board.isFull()) {
            this.state = MatchStateUpdater.gameDraw(this.state)
        }

        this.setNextPlayer()
    }

    performAction(action: PlayerAction): void {
        Logger.log('match.performAction', action)
        if (this.isActionAllowed(action)) {
            Logger.log('action allowed')
            this.state = MatchStateUpdater.performAction(this.state, action)
            Logger.log('new board', this.state.board)
        }
    }

    isActionAllowed(action: PlayerAction): boolean {
        //TODO: move to rules
        return this.ruleset.allowedActions.indexOf(action.type) >= 0
    }
    // TODO: this should be part of the game rules instead
    setNextPlayer(): void {
        const nextPlayer = this.state.currentTurnPlayer === this.players[0]
            ? this.players[1]
            : this.players[0]
        
        this.state = MatchStateUpdater.setCurrentTurnPlayer(this.state, nextPlayer)
    }
}
