import { Player, PlayerAction } from "../player"
import { GameVariation } from "../game-rules"
import { MatchState } from "./match-state"
import { MatchStateUpdater } from "./match-state-updater"
import { AgentType, AIAgent } from "../agent"
import { GameRules } from "../game-rules"
import Logger from "js-logger"

export class Match {
    players: [Player, Player]
    state: MatchState

    constructor (
        public id: string,
        public gameVariation: GameVariation
    ) {}

    // TODO: add prettier
    attemptToRunAI() {
        if (
            this.state.isOngoing
            && this.state.currentTurnPlayer.agent.type === AgentType.AI
        ) {
            this.runAITurn()
        }
    }

    runAITurn(): void {
        const ai = this.state.currentTurnPlayer.agent as AIAgent
        const action: PlayerAction = ai.getInput(this.state.board, this.state.currentTurnPlayer.disc, this.gameVariation)
        
        this.takeTurn(action)
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
