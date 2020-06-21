import { isNumber } from 'lodash'
import { Disc } from '../disc'

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

export function getOpponentDisc(disc: Disc): Disc {
    return disc === Disc.primary ? Disc.secondary : Disc.primary
}
