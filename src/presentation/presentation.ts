import { MatchType, AgentType, PlayerActionType, Match } from "../model";
import { startMatch, performAction } from '../application'
import { PresentationMatchState, PresentationTranslator } from "./presentation-match-state";
import Logger from "js-logger";

// TODO: save and retrieve by ID
let match: Match

export function startMatchRequest(matchType: MatchType, secondPlayer: AgentType): Promise<PresentationMatchState> {
    const promise = new Promise<PresentationMatchState>((resolve, reject) => {
        match = startMatch(matchType, secondPlayer)
        Logger.log('resolving', match)
        resolve(PresentationTranslator.translateFromDomain(match))
    })

    return promise
}

export function performActionRequest(matchId: string, action: PlayerActionType, columnIndex: number): Promise<PresentationMatchState> {
    const promise = new Promise<PresentationMatchState>((resolve, reject) => {
        match = performAction(match, action, columnIndex)
        Logger.log('resolving', match)
        resolve(PresentationTranslator.translateFromDomain(match))
    })

    return promise
}
