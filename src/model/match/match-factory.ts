import { Ruleset } from "../ruleset"
import { Agent } from "../agent"
import { Match } from "./match"
import { Board, Disc } from "../board"
import { MatchState } from "./match-state"

export class MatchFactory {
    static build(ruleset: Ruleset, board: Board, agents: [Agent, Agent]): Match {
        const matchId = Date.now().toString()
        const match = new Match(matchId, ruleset)
        match.players = [
            { agent: agents[0], disc: Disc.A },
            { agent: agents[1], disc: Disc.B },
        ]
        const state: MatchState = { // TODO: move to gameRules.getInitialState
            board,
            currentTurnPlayer: match.players[0],
            ongoing: true,
            winner: null,
        }

        match.state = state

        return match
    }
}
