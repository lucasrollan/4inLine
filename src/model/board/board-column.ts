import { Disc } from "../disc"

// TODO: this class can be replaced by Disc[]
export class BoardColumn {
    discs: Disc[] = []

    isEmpty(): Boolean {
        return this.discs.length === 0
    }

    clone(): BoardColumn {
        const column = new BoardColumn();
        column.discs = [...this.discs]

        return column
    }
}
