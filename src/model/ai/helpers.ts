import { isNumber } from 'lodash'
import { DiscColor } from '../disc'

export function getIndexOfHighest(numbers: number[] = []): number {
    let highest = -Infinity
    let index = -1
    for(let i=0; i<numbers.length; i += 1) {
        const number = numbers[i]
        if (isNumber(number) && number > highest) {
            highest = number
            index = i
        }
    }

    return index
}

export function average(numbers: number[] = []): number {
    let length = 0
    let sum = 0

    for(let n of numbers) {
        if (isNumber(n)) {
            length += 1
            sum += n
        }
    }

    return length && sum / length
}

export function getOpponentDiscColor(discColor: DiscColor): DiscColor {
    return discColor === DiscColor.primary ? DiscColor.secondary : DiscColor.primary
}
