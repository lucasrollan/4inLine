export function getIndexOfHighest(numbers: number[] = []): number {
    let highest = -Infinity
    let index = -1
    for(let i=0; i<numbers.length; i += 1) {
        if (numbers[i] > highest) {
            index = i
        }
    }

    return index
}

export function average(numbers: number[] = []): number {
    if (numbers.length === 0) {
        return 0
    }

    return add(...numbers) / numbers.length
}

export function add(...numbers: number[]): number {
    let sum = 0
    for(let n of numbers) {
        sum += n
    }

    return sum
}
