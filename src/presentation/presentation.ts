import { MatchType, AgentType } from "../model";
import { startMatch } from '../application'


export function startMatchRequest(matchType: MatchType, secondPlayer: AgentType) {
    const match = startMatch(matchType, secondPlayer)
    return match.id
}
