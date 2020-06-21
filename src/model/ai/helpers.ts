import { isNumber } from 'lodash'

export function getIndexOfHighest(numbers: number[] = []): number {
    let highest = -Infinity
    let index = -1
    for (let i = 0; i < numbers.length; i += 1) {
        const n = numbers[i]
        if (isNumber(n) && n > highest) {
            highest = n
            index = i
        }
    }

    return index
}

export function average(numbers: number[] = []): number {
    let length = 0
    let sum = 0

    for (const n of numbers) {
        if (isNumber(n)) {
            length += 1
            sum += n
        }
    }

    return length && sum / length
}
