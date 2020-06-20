export enum Disc {
    A = 1,
    B = 2,
}
export type NoDisc = 0
export const noDisc = 0
export type MaybeDisc = Disc | NoDisc
