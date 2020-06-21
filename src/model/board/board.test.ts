import { BoardFactory } from './board-factory'
import { Disc } from '../disc'

const X = Disc.primary
const O = Disc.secondary

describe('Board', () => {
    describe('isEmpty()', () => {
        test('should return true if all columns are empty', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 })
            const empty = board.isEmpty()

            expect(empty).toBe(true)
        })
        test('should return false if some column is not empty', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [X],
                [],
                [],
                [],
                [],
            ])
            const empty = board.isEmpty()

            expect(empty).toBe(false)
        })
    })
    describe('isFull()', () => {
        test('should return true if all columns are full', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [X, X, X, X],
                [X, X, X, X],
                [X, X, X, X],
                [X, X, X, X],
                [X, X, X, X],
            ])
            const full = board.isFull()

            expect(full).toBe(true)
        })
        test('should return false if some column is not full', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [X, X, X, X],
                [X, X, X],
                [X, X, X, X],
                [X, X],
                [X, X, X, X],
            ])
            const full = board.isFull()

            expect(full).toBe(false)
        })
    })
    describe('isColumnEmpty()', () => {
        test('should return true if column is empty', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 })
            const empty = board.isColumnEmpty(3)

            expect(empty).toBe(true)
        })
        test('should return false if column has any discs', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X],
                [],
                [],
                [],
            ])
            const empty = board.isColumnEmpty(1)

            expect(empty).toBe(false)
        })
    })
    describe('isColumnFull()', () => {
        test('should return true if column is full', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X, X, X, X],
                [],
                [],
                [],
            ])
            const full = board.isColumnFull(1)

            expect(full).toBe(true)
        })
        test('should return false if column has space', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X, X, X],
                [],
                [],
                [],
            ])
            const full = board.isColumnFull(1)

            expect(full).toBe(false)
        })
    })
    describe('getDiscCountInColumn()', () => {
        test('should return number of discs in the column', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X, X, X],
                [],
                [],
                [],
            ])
            const length = board.getDiscCountInColumn(1)

            expect(length).toBe(3)
        })
    })
    describe('getTopRow()', () => {
        test('should return the row index of the last disc added', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X, X, X],
                [],
                [],
                [],
            ])
            const row = board.getTopRow(1)

            expect(row).toBe(2)
        })
        test('should return -1 if empty', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X, X, X],
                [],
                [],
                [],
            ])
            const row = board.getTopRow(2)

            expect(row).toBe(-1)
        })
    })
    describe('getDiscAt()', () => {
        test('should return disc at given grid position', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X, O, X],
                [O],
                [],
                [],
            ])
            const disc1 = board.getDiscAt(1, 1)
            const disc2 = board.getDiscAt(1, 0)

            expect(disc1).toBe(O)
            expect(disc2).toBe(X)
        })
        test('should return null if position is empty', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X, O, X],
                [O],
                [],
                [],
            ])
            const disc = board.getDiscAt(4, 3)

            expect(disc).toBe(null)
        })
    })
    describe('isWithinBoundaries()', () => {
        test('should return true if given position is inside the grid', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 })

            expect(board.isWithinBoundaries(0, 0)).toBe(true)
            expect(board.isWithinBoundaries(0, 3)).toBe(true)
            expect(board.isWithinBoundaries(4, 3)).toBe(true)
            expect(board.isWithinBoundaries(4, 0)).toBe(true)
            expect(board.isWithinBoundaries(2, 2)).toBe(true)
        })
        test('should return false if given position is outside the grid', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 })

            expect(board.isWithinBoundaries(-1, 0)).toBe(false)
            expect(board.isWithinBoundaries(0, -1)).toBe(false)
            expect(board.isWithinBoundaries(-1, 3)).toBe(false)
            expect(board.isWithinBoundaries(0, 4)).toBe(false)
            expect(board.isWithinBoundaries(5, 3)).toBe(false)
            expect(board.isWithinBoundaries(5, 4)).toBe(false)
            expect(board.isWithinBoundaries(5, 0)).toBe(false)
            expect(board.isWithinBoundaries(5, -1)).toBe(false)
        })
    })
    describe('dropDisc()', () => {
        test('should return a new board with a disc added in the top column', () => {
            const board = BoardFactory.build({ columns: 5, rows: 4 }, [
                [],
                [X, X, X],
                [],
                [],
                [],
            ])

            const nextBoard1 = board.dropDisc({ columnIndex: 1, disc: O })
            const nextBoard2 = nextBoard1.dropDisc({ columnIndex: 3, disc: X })

            expect(nextBoard1.getDiscAt(1, 3)).toBe(O)
            expect(nextBoard2.getDiscAt(3, 0)).toBe(X)
        })
    })
})
