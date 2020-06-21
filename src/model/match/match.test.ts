/// <reference types="jest" />

import { Match } from './match'
import { GameVariation } from '../game-rules';
import { MatchFactory } from './match-factory';
import { PlayerType, PlayerAction } from '../player';
import * as ai from '../ai';
import { Disc } from '../disc';

jest.mock('../ai')

describe('Match', () => {
    describe('attemtToRunAI()', () => {
        describe('game is ongoing', () => {
            test('should run AI if it is AI turn', () => {
                const match = MatchFactory.build(GameVariation.connect4, PlayerType.AI)
                match.runAI = jest.fn()
                match.state.isOngoing = true
                match.state.currentTurnPlayer = 0

                match.attemptToRunAI()

                expect(match.runAI).toHaveBeenCalledTimes(1)
            })
            test('should not run AI if it is human turn', () => {
                const match = MatchFactory.build(GameVariation.connect4, PlayerType.AI)
                match.runAI = jest.fn()
                match.state.isOngoing = true
                match.state.currentTurnPlayer = 1

                match.attemptToRunAI()

                expect(match.runAI).toHaveBeenCalledTimes(0)
            })
        })
        describe('game is finished', () => {
            test('should not run AI', () => {
                const match = MatchFactory.build(GameVariation.connect4, PlayerType.AI)
                match.runAI = jest.fn()
                match.state.isOngoing = false
                match.state.currentTurnPlayer = 0

                match.attemptToRunAI()

                expect(match.runAI).toHaveBeenCalledTimes(0)
            })
        })
    })

    describe('runAI()', () => {
        test('should use AI input', () => {
            const actionMock: PlayerAction = { columnIndex: 3, disc: Disc.primary }
            const getAIinputMock = jest.spyOn(ai.AI, 'getInput').mockImplementation(() => actionMock)
            const gameVariation = GameVariation.connect4
            
            const match = MatchFactory.build(gameVariation, PlayerType.AI)
            match.state.isOngoing = true
            match.state.currentTurnPlayer = 0
            const takeTurnMock = jest.spyOn(match, 'takeTurn').mockImplementation(() => {})

            match.runAI()

            expect(getAIinputMock).toHaveBeenCalledTimes(1)
            expect(getAIinputMock).toHaveBeenCalledWith(match.state.board, Disc.primary, gameVariation)
            expect(takeTurnMock).toHaveBeenCalledWith(actionMock)
        })
    })

    describe('takeTurn()', () => {
        test('should not have an effect when match is finished', () => {})
        test('should not have an effect when action is not allowed', () => {})
        test('should update the board', () => {})
        test('should finish the game if a player won', () => {})
        test('should finish the game if it is a draw', () => {})
        test('should advance the turn to the next player', () => {})
    })

    describe('updateState()', () => {
        test('should update the state', () => {})
    })
})
