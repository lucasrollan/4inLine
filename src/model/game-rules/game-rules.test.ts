import { BoardFactory } from "../board"
import { GameRules } from "./game-rules"
import { Disc } from "../disc"
import { MatchFactory } from "../match"
import { GameVariation } from "./variations"
import { PlayerType, PlayerAction } from "../player"

const X = Disc.primary
const O = Disc.secondary

describe('GameRules', () => {
    describe('isActionAllowed()', () => {
        test('should return true if action in target column is allowed', () => {
            const boardMock = BoardFactory.build({columns: 5, rows: 4})
            const allowed = GameRules.isActionAllowed(boardMock, {columnIndex: 3, disc: X})

            expect(allowed).toBe(true)
        })
        test('should return false if action in target column is not allowed', () => {
            const boardMock = BoardFactory.build({columns: 5, rows: 4})
            boardMock.columns[2] = [X, X, O, X]
            const allowed = GameRules.isActionAllowed(boardMock, {columnIndex: 2, disc: X})

            expect(allowed).toBe(false)})
    })
    describe('getNextPlayer()', () => {
        test('should return the next player index', () => {
            const match1 = MatchFactory.build(GameVariation.tiny, PlayerType.Human)
            const match2 = MatchFactory.build(GameVariation.tiny, PlayerType.Human)
            
            match1.state.currentTurnPlayer = 0
            match2.state.currentTurnPlayer = 1

            expect(GameRules.getNextPlayer(match1)).toBe(1)
            expect(GameRules.getNextPlayer(match2)).toBe(0)
        })
    })
    describe('isDraw()', () => {
        test('should return true if the game is a draw', () => {
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [X, O, X, O],
                    [X, O, X, O],
                    [O, X, O, X],
                    [X, O, X, O],
                    [X, O, X, O],
                ]
            )

            expect(GameRules.isDraw(boardMock)).toBe(true)
        })
        test('should return false if the game is not a draw', () => {
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [X, O, X, O],
                    [X, O, O],
                    [O, X, X],
                    [O, X, X],
                    [X, O, X, O],
                ]
            )

            expect(GameRules.isDraw(boardMock)).toBe(false)
        })
    })
    describe('isWinningAction()', () => {
        test('should return true if the game was won', () => {
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [X, O, X, O],
                    [X, O, O],
                    [O],
                    [X, X, X, X],
                    [],
                ]
            )
            
            const actionMock: PlayerAction = {columnIndex: 3}
            const isWinningAction = GameRules.isWinningAction(boardMock, actionMock, GameVariation.tiny)

            expect(isWinningAction).toBe(true)
        })
        test('should return false if the game was not yet won', () => {
            const boardMock = BoardFactory.build(
                {columns: 5, rows: 4},
                [
                    [X, O, X, O],
                    [X, O, O],
                    [O],
                    [X, X, X, X],
                    [],
                ]
            )
            
            const actionMock: PlayerAction = {columnIndex: 4, disc: X}
            const isWinningAction = GameRules.isWinningAction(boardMock, actionMock, GameVariation.tiny)

            expect(isWinningAction).toBe(false)
        })
    })
    describe('hasLineOfLength()', () => {

        describe('vertical line', () => {
            test('should return true if a 4 disc line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [X, O, X, O],
                        [X, O, O],
                        [O],
                        [X, X, X, X, X],
                        [],
                    ]
                )
                const hasLine = GameRules.hasLineOfLength(boardMock, 3, 4, [0, -1])

                expect(hasLine).toBe(true)
            })
            test('should return true if a 5 disc line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [X, O, X, O],
                        [X, O, O],
                        [O],
                        [X, X, X, X, X],
                        [],
                    ]
                )
                
                const hasLine = GameRules.hasLineOfLength(boardMock, 3, 5, [0, -1])

                expect(hasLine).toBe(true)
            })
            test('should return false if no line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [X, O, X, O],
                        [X, O, O],
                        [O],
                        [X, X, O, X, X],
                        [],
                    ]
                )
                
                const hasLine = GameRules.hasLineOfLength(boardMock, 0, 4, [0, -1])

                expect(hasLine).toBe(false)
            })
        })

        describe('horizontal line', () => {
            test('should return true if a 4 disc line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [X, O, X, O],
                        [X, O, O],
                        [X],
                        [X, O, O, O],
                        [X],
                    ]
                )
                const hasLine = GameRules.hasLineOfLength(boardMock, 2, 4, [1, 0])

                expect(hasLine).toBe(true)
            })
            test('should return true if a 5 disc line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [X, O, X, O],
                        [X, O, O],
                        [X],
                        [X, O, O, O],
                        [X],
                    ]
                )
                
                const hasLine = GameRules.hasLineOfLength(boardMock, 2, 5, [1, 0])

                expect(hasLine).toBe(true)
            })
            test('should return false if no line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [X, O, X, O],
                        [X, O, O],
                        [X],
                        [X, O, O, O],
                        [X],
                    ]
                )
                
                const hasLine = GameRules.hasLineOfLength(boardMock, 0, 4, [1, 0])

                expect(hasLine).toBe(false)
            })
        })

        describe('ascending line', () => {
            test('should return true if a 4 disc line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [O, O, X, X],
                        [X, O, X],
                        [X, X, O],
                        [X, O, O, O],
                        [X],
                    ]
                )
                const hasLine = GameRules.hasLineOfLength(boardMock, 2, 4, [1, 1])

                expect(hasLine).toBe(true)
            })
            test('should return true if a 5 disc line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [O, O, X, X],
                        [X, O, X],
                        [X, X, O],
                        [X, O, O, O],
                        [X, O, O, O, O],
                    ]
                )
                
                const hasLine = GameRules.hasLineOfLength(boardMock, 2, 5, [1, 1])

                expect(hasLine).toBe(true)
            })
            test('should return false if no line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [O, O, X, X],
                        [X, O, X],
                        [X, X, O],
                        [X, O, O, O],
                        [X],
                    ]
                )
                
                const hasLine = GameRules.hasLineOfLength(boardMock, 4, 4, [1, 1])

                expect(hasLine).toBe(false)
            })
        })
        describe('descending line', () => {
            test('should return true if a 4 disc line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [O, O, X, X],
                        [X, O, X],
                        [X, X, O],
                        [X, O, O, O],
                        [X],
                    ]
                )
                const hasLine = GameRules.hasLineOfLength(boardMock, 0, 4, [1, -1])

                expect(hasLine).toBe(true)
            })
            test('should return true if a 5 disc line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [O, O, X, X, X],
                        [O, O, X, X],
                        [X, O, X],
                        [X, X, O],
                        [X, O, O, O],
                    ]
                )
                
                const hasLine = GameRules.hasLineOfLength(boardMock, 0, 5, [1, -1])

                expect(hasLine).toBe(true)
            })
            test('should return false if no line was formed', () => {
                const boardMock = BoardFactory.build(
                    {columns: 5, rows: 5},
                    [
                        [O, O, X, X],
                        [X, O, X],
                        [X, X, O],
                        [X, O, O, O],
                        [X],
                    ]
                )
                
                const hasLine = GameRules.hasLineOfLength(boardMock, 4, 4, [1, -1])

                expect(hasLine).toBe(false)
            })
        })
    })
    describe('countDiscsInDirection()', () => {
        test('should ', () => {})
        test('should ', () => {})
        test('should ', () => {})
        test('should ', () => {})
    })
})
