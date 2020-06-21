import { PlayerType, Match, GameVariation } from '../model'
import { startMatch, performAction } from '../application'
import { PresentationMatchState } from './presentation-match-state'
import { PresentationTranslator } from './presentation-translator'

// TODO: save and retrieve by ID
let match: Match

// TODO: make express.js api
export function startMatchRequest(
    gameVariation: GameVariation,
    secondPlayer: PlayerType
): Promise<PresentationMatchState> {
    const promise = new Promise<PresentationMatchState>((resolve, reject) => {
        match = startMatch(gameVariation, secondPlayer)
        resolve(PresentationTranslator.translateFromDomain(match))
    })

    return promise
}

export function performActionRequest(
    matchId: string,
    columnIndex: number
): Promise<PresentationMatchState> {
    const promise = new Promise<PresentationMatchState>((resolve, reject) => {
        match = performAction(match, columnIndex)
        resolve(PresentationTranslator.translateFromDomain(match))
    })

    return promise
}
