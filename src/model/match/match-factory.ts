import { Ruleset } from "../ruleset"
import { Agent } from "../agent"
import { Match } from "./match"
import { Disc, BoardFactory } from "../board"
import { MatchState } from "./match-state"

export class MatchFactory {
    static build(ruleset: Ruleset, agents: [Agent, Agent]): Match {
        const matchId = Date.now().toString()
        const match = new Match(matchId, ruleset)
        match.players = [
            { agent: agents[0], disc: Disc.A },
            { agent: agents[1], disc: Disc.B },
        ]

        match.state = this.buildMatchState(match, ruleset)

        return match
    }

    static buildMatchState(match: Match, ruleset: Ruleset): MatchState {
        const board = BoardFactory.build(ruleset.grid)

        const firstPlayer = ruleset.firstPlayer
            ? match.players.find(p => p.disc === ruleset.firstPlayer)
            : match.players[0]

        const state: MatchState = {
            board,
            currentTurnPlayer: firstPlayer,
            ongoing: true,
            winner: null,
        }

        return state
    }
}
