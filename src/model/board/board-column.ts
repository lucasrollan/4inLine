import { MaybeDisc } from "../disc"

export class BoardColumn {
    discs: MaybeDisc[] = []

    isEmpty(): Boolean {
        return this.discs.length === 0
    }

    clone(): BoardColumn {
        const column = new BoardColumn();
        column.discs = [...this.discs]

        return column
    }
}
