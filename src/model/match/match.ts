import Logger from "js-logger"

import { Player, PlayerAction } from "../player"
import { Ruleset } from "../ruleset"
import { MatchState } from "./match-state"
import { MatchStateUpdater } from "./match-state-updater"

export class Match {
    players: [Player, Player]
    state: MatchState
    constructor (
        public id: string,
        public ruleset: Ruleset
    ) {}

    performAction(action: PlayerAction, columnIndex: number): void {
        Logger.log('match.performAction', action, columnIndex)
        if (this.isActionAllowed(action)) {
            Logger.log('action allowed')
            this.state = MatchStateUpdater.performAction(this.state, action, columnIndex)
            Logger.log('new board', this.state.board)

            if (this.state.board.isWinningConditionAtColumn(columnIndex, this.ruleset.lineObjective)) {
                this.state = MatchStateUpdater.gameWon(this.state)
            } else if (this.state.board.isFull()) {
                this.state = MatchStateUpdater.gameDraw(this.state)
            }

            this.setNextPlayer()
        }
        // TODO: Review this. giving it the disc looks weird
        const chosenColumn = this.state.currentPlayerTurn.agent.getInput(this.state.board, this.state.currentPlayerTurn.disc, this.ruleset.lineObjective)
    }

    isActionAllowed(action: PlayerAction): boolean {
        return this.ruleset.allowedActions.indexOf(action) >= 0
    }
    // TODO: this should be part of the game rules instead
    setNextPlayer(): void {
        const nextPlayer = this.state.currentPlayerTurn === this.players[0]
            ? this.players[1]
            : this.players[0]
        
        this.state = MatchStateUpdater.setCurrentPlayerTurn(this.state, nextPlayer)
    }
}
