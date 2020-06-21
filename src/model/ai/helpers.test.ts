import { getIndexOfHighest, average } from "./helpers"

describe('AI helpers', () => {
    describe('getIndexOfHighest()', () => {
        test('should find the index of the highest number', () => {
            const index = getIndexOfHighest([-1/2, -0.00001, 0, 0.001, -1000])

            expect(index).toBe(3)
        })

        test('should find the index at firts position', () => {
            const index = getIndexOfHighest([1, 0, -1, -1/7, -0])

            expect(index).toBe(0)
        })

        test('should find the index at highest boundary', () => {
            const index = getIndexOfHighest([0.0001, 0, -1, -1/7, -0, 1])

            expect(index).toBe(5)
        })

        test('should find the first one in case of a tie', () => {
            const index = getIndexOfHighest([0.0001, 0, 1, -1/7, -0, 1])

            expect(index).toBe(2)
        })

        test('should return 0 if only one number', () => {
            const index = getIndexOfHighest([-1/2])

            expect(index).toBe(0)
        })

        test('should ignore null values', () => {
            const index = getIndexOfHighest([0.0001, null, 1, null, 0, null])

            expect(index).toBe(2)
        })

        test('should return -1 if no numbers were given', () => {
            const index = getIndexOfHighest([])

            expect(index).toBe(-1)
        })

        test('should return -1 if all values were null', () => {
            const index = getIndexOfHighest([null, null, null])

            expect(index).toBe(-1)
        })
    })
    describe('average()', () => {
        test('should calculate average of numbers', () => {
            const avg = average([1, 2, -1, 39])

            expect(avg).toBe(10.25)
        })

        test('should ignore null values', () => {
            const avg = average([1, 2, null, null, -1, null, 39])

            expect(avg).toBe(10.25)
        })
    })
})
