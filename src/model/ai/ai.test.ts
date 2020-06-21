import { AI } from "./ai"
import { BoardFactory } from "../board"
import { Disc } from "../disc"
import { GameVariation } from "../game-rules"

const X = Disc.primary
const O = Disc.secondary

describe('AI', () => {
    describe('getInput()', () => {
        test('should choose the middle column when board is empty', () => {
            const discMock = X
            const boardMock = BoardFactory.build({columns: 5, rows: 4})
            const action = AI.getInput(boardMock, discMock, GameVariation.tiny)

            expect(action.columnIndex).toBe(2)
        })
        test('should choose winning move when possible', () => {
            const discMock = X
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [],
                    [X, X, X],
                    [O, O, O],
                    [],
                    [],
                ] as Disc[][]
            )
            const action = AI.getInput(boardMock, discMock, GameVariation.tiny)

            expect(action.columnIndex).toBe(1)
        })
        test('should avoid losing when possible', () => {
            const discMock = X
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [],
                    [],
                    [],
                    [X, X],
                    [O, O, O],
                ]
            )
            const action = AI.getInput(boardMock, discMock, GameVariation.tiny)

            expect(action.columnIndex).toBe(4)
        })
    })
    describe('rateAvailableActions()', () => {
        test('should rate inmediate victories when depth is 0', () => {
            const discMock = X
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [],
                    [],
                    [],
                    [X, X, X],
                    [O, O, O],
                ]
            )
            const ratings = AI.rateAvailableActions(boardMock, discMock, GameVariation.tiny, 0)

            expect(ratings).toMatchObject([0, 0, 0, 1, 0])
        })
        test('should rate inmediate losses when depth is 1', () => {
            const discMock = X
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [],
                    [],
                    [],
                    [X, X, X],
                    [O, O, O],
                ]
            )
            const ratings = AI.rateAvailableActions(boardMock, discMock, GameVariation.tiny, 1)

            expect(ratings).toMatchObject([-1/5, -1/5, -1/5, 1, -0])
        })
        test('should rate 4 turns when depth is 3', () => {
            const discMock = X
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [],
                    [X],
                    [O, O, O],
                    [X, O, O],
                    [X, O, O],
                ]
            )
            const ratings = AI.rateAvailableActions(boardMock, discMock, GameVariation.tiny, 1)

            expect(ratings).toMatchObject([-2/5, -2/5, -1/4, -1/2, -1/2])
        })
        test('should not rate when column is full', () => {
            const discMock = X
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [X, X, X],
                    [],
                    [O, O, O, X],
                    [X, O, O, X],
                    [X, O, O, O],
                ]
            )
            const ratings = AI.rateAvailableActions(boardMock, discMock, GameVariation.tiny, 1)

            expect(ratings).toMatchObject([1, -1/2, null, null, null])})
    })
})
