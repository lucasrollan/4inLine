import { Board } from "."

export class BoardObjectiveChecker {
    static isVerticalLine(board: Board, colIndex: number, row: number, lineLength: number): boolean {
        const column = board.columns[colIndex]
        if (column.isEmpty()) {
            return false
        }

        const discCount = column.discs.length
        let playerDisc = column.discs[row]
        let length = 1
        for (let i = row - 1; i >= 0 && length < lineLength; i -= 1) {
            // TODO: board.getDiscAt(column, row)
            if (column.discs[i] !== playerDisc) {
                break
            }
            length += 1
        }
        for (let i = row + 1; i < discCount && length < lineLength; i += 1) {
            if (column.discs[i] !== playerDisc) {
                break
            }
            length += 1
        }

        return length >= lineLength
    }
    static isHorizontalLine(board: Board, colIndex: number, row: number, lineLength: number): boolean {
        const column = board.columns[colIndex]
        if (column.isEmpty()) {
            return false
        }

        const columns = board.columns
        let playerDisc = column.discs[row]
        let length = 1
        for (let i = colIndex - 1; i >= 0 && length < lineLength; i -= 1) {
            if (columns[i].discs[row] !== playerDisc) {
                break
            }
            length += 1
        }
        const columnCount = board.grid.columns
        for (let i = colIndex + 1; i < columnCount && length < lineLength; i += 1) {
            if (columns[i].discs[row] !== playerDisc) {
                break
            }
            length += 1
        }

        return length >= lineLength
    }
    static isAscendingDiagonalLine(board: Board, colIndex: number, row: number, lineLength: number): boolean {
        const column = board.columns[colIndex]
        if (column.isEmpty()) {
            return false
        }

        const columns = board.columns
        let playerDisc = column.discs[row]
        let length = 1
        for (
            let i = colIndex - 1,
            j = row - 1;
            i >= 0 && j >= 0 && length < lineLength;
            i -= 1, j -= 1
        ) {
            if (columns[i].discs[j] !== playerDisc) {
                break
            }
            length += 1
        }
        const columnCount = board.grid.columns
        const rowCount = board.grid.rows
        for (
            let i = colIndex + 1,
            j = row + 1;
            i < columnCount && j < rowCount && length < lineLength;
            i += 1, j += 1
        ) {
            if (columns[i].discs[j] !== playerDisc) {
                break
            }
            length += 1
        }

        return length >= lineLength
    }

    static isDescendingDiagonalLine(board: Board, colIndex: number, row: number, lineLength: number): boolean {
        const column = board.columns[colIndex]
        if (column.isEmpty()) {
            return false
        }

        const columns = board.columns
        const columnCount = board.grid.columns
        const rowCount = board.grid.rows
        let playerDisc = column.discs[row]
        let length = 1
        for (
            let i = colIndex - 1,
            j = row + 1;
            i >= 0 && j < rowCount && length < lineLength;
            i -= 1, j += 1
        ) {
            if (columns[i].discs[j] !== playerDisc) {
                break
            }
            length += 1
        }
        for (
            let i = colIndex + 1,
            j = row - 1;
            i < columnCount && j >= 0 && length < lineLength;
            i += 1, j -= 1
        ) {
            if (columns[i].discs[j] !== playerDisc) {
                break
            }
            length += 1
        }

        return length >= lineLength
    }
}
