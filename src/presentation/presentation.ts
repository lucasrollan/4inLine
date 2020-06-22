// import { PlayerType, Match, GameVariation, subscriber, MatchState } from '../model'
// import { startMatch, performAction, createMatch, subscribeToMatch } from '../application'
// import { PresentationMatchState } from './presentation-match-state'
// import { PresentationTranslator } from './presentation-translator'

// export function createMatchRequest(
//     gameVariation: GameVariation,
//     secondPlayer: PlayerType
// ): Promise<Match> {
//     const promise = new Promise<Match>((resolve, reject) => {
//         resolve(createMatch(gameVariation, secondPlayer))
//     })

//     return promise
// }

// export function subscribeRequest(match: Match, onUpdate: subscriber): Promise<void> {
//     const promise = new Promise<void>((resolve, reject) => {
//         const callback = (state: MatchState): PresentationMatchState => 
//         subscribeToMatch(match, onUpdate)
//         resolve()
//     })

//     return promise
// }

// export function startMatchRequest(match: Match): Promise<void> {
//     const promise = new Promise<void>((resolve, reject) => {
//         startMatch(match)
//         resolve()
//     })

//     return promise
// }

// export function performActionRequest(
//     matchId: string,
//     columnIndex: number
// ): Promise<PresentationMatchState> {
//     const promise = new Promise<PresentationMatchState>((resolve, reject) => {
//         match = performAction(match, columnIndex)
//         resolve(PresentationTranslator.translateFromDomain(match))
//     })

//     return promise
// }
