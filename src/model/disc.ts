export enum Disc {
    primary = 1,
    secondary = 2,
}

export function getPlayerDisc(player: number): Disc {
    return [Disc.primary, Disc.secondary][player]
}

export function getOpponentDisc(disc: Disc): Disc {
    return disc === Disc.primary ? Disc.secondary : Disc.primary
}
