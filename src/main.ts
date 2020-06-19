enum AgentType {
    Human = 'HUMAN',
    AI = 'AI',
}
export interface Agent {
    type: AgentType
    name: string
}

export class HumanAgent implements Agent {
    type: AgentType.Human
    name: string
}

export class AIAgent implements Agent {
    type: AgentType.AI
    name: string
}

export enum Disc {
    A = 1,
    B = 2,
}
export type NoDisc = 0
export const noDisc = 0
export type MaybeDisc = Disc | NoDisc

export interface Player {
    agent: Agent
    disc: Disc
}

export class BoardColumn {
    discs: MaybeDisc[] = []

    isEmpty(): Boolean {
        return this.discs.length === 0
    }
}

export class ActionPerformer {
    static dropDisc(match: Match, colunmIndex: number): void {
        const board = match.board
        const currentPlayer = match.currentPlayer
        const column = board.columns[colunmIndex]
        const nextBoard = BoardFactory.buildFrom(board)
        const newColumn = new BoardColumn()
        newColumn.discs = column.discs.concat(currentPlayer.disc)
        nextBoard.columns[colunmIndex] = newColumn
        match.board = nextBoard

        if (nextBoard.isWinningConditionAtColumn(colunmIndex, match.ruleset)) {
            match.gameWon()
        }
        if (nextBoard.isFull()) {
            match.endGame()
        }

        match.setNextPlayer()
    }
}

class ObjectiveChecker {
    static isVerticalLine(board: Board, colIndex: number, row: number, lineLength: number): boolean {
        const column = board.columns[colIndex]
        if (column.isEmpty()) {
            return false
        }

        const discCount = column.discs.length
        let playerDisc = column.discs[row]
        let length = 1
        for (let i = row - 1; i >= 0 && length < lineLength; i -= 1) {
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

export class Board {
    columns: BoardColumn[] = []
    constructor (public grid: RulesetGrid) {}

    isWinningConditionAtColumn(columnIndex: number, ruleset: Ruleset): boolean {
        const row = this.columns[columnIndex].discs.length - 1
        return ObjectiveChecker.isVerticalLine(this, columnIndex, row, ruleset.lineObjective)
            || ObjectiveChecker.isHorizontalLine(this, columnIndex, row, ruleset.lineObjective)
            || ObjectiveChecker.isAscendingDiagonalLine(this, columnIndex, row, ruleset.lineObjective)
            || ObjectiveChecker.isDescendingDiagonalLine(this, columnIndex, row, ruleset.lineObjective)
    }
    isFull(): boolean {
        return this.columns.every(column => column.discs.length === this.grid.rows)
    }
}

export class Match {
    players: [Player, Player]
    currentPlayer: Player
    winner: Player
    ongoing = true
    constructor (
        public ruleset: Ruleset,
        public board: Board
    ) {}

    setNextPlayer(): void {
        if (this.currentPlayer === this.players[0]) {
            this.currentPlayer = this.players[1]
        } else {
            this.currentPlayer = this.players[0]
        }
    }

    gameWon() {
        this.winner = this.currentPlayer
        this.endGame()
    }
    endGame() {
        this.ongoing = false
        this.currentPlayer = null
    }
}

export class BoardFactory {
    static build(grid: RulesetGrid): Board {
        const board = new Board(grid)
        for(let i = 0; i<grid.columns; i++) {
            const column = new BoardColumn()
            board.columns = board.columns.concat(column)
        }

        return board
    }

    static buildFrom(board: Board): Board {
        const newBoard = new Board(board.grid)
        newBoard.columns = [...board.columns]

        return newBoard
    }
}

export enum PlayerAction {
    dropDisc,
    popDisc,
}

export interface RulesetGrid {
    columns: number,
    rows: number,
}
export interface Ruleset {
    grid: RulesetGrid,
    lineObjective: number,
    allowedActions: PlayerAction[],
    firstPlayer?: MaybeDisc,
}

export class MatchFactory {
    static build(ruleset: Ruleset, board: Board, agents: [Agent, Agent]): Match {
        const match = new Match(ruleset, board)
        match.players = [
            { agent: agents[0], disc: Disc.A },
            { agent: agents[1], disc: Disc.B },
        ]
        match.currentPlayer = match.players[0] // TODO: pick at random

        return match
    }
}
