import { Board, Disc } from "../board"
import { PlayerAction, PlayerActionType } from "../player"
import { Ruleset } from "../ruleset"
import { BoardObjectiveChecker } from "../board/board-objective-checker"
import Logger from "js-logger"

export function getInput(board: Board, disc: Disc, ruleset: Ruleset, depth: number): PlayerAction {
    const avaliableActions: ActionRating[] = rateAvailableActions(board, disc, ruleset, depth)
    Logger.info('Available actions', avaliableActions)

    return getBestRatedAction(avaliableActions)
}

interface ActionRating {
    rating: number,
    action: PlayerAction,
    actionsConsidered: number
}

function getBestRatedAction(avaliableActions: ActionRating[]): PlayerAction {
    let highest = -Infinity
    let highestRated: PlayerAction = null

    for(let rating of avaliableActions) {
        if (rating.rating > highest) {
            highest = rating.rating
            highestRated = rating.action
        }
    }

    return highestRated
}

function rateAvailableActions(board: Board, disc: Disc, ruleset: Ruleset, depth: number): ActionRating[] {
    let ratings: ActionRating[] = []
    const columnCount = board.grid.columns
    for(let i = 0; i < columnCount; i += 1) {
        const action: PlayerAction = {
            type: PlayerActionType.dropDisc,
            columnIndex: i,
            disc: disc,
        }
        // if (actionIsLegal) {
            const boardToRate = board.performAction(action)

            let rating = 0
            let actionsConsidered = 1
            if (isWinningAction(boardToRate, action, ruleset)) {
                rating = 1
            } else if (depth > 0) {
                const opponentDisc = action.disc === Disc.A ? Disc.B : Disc.A
                const opponentActionRatings = rateAvailableActions(boardToRate, opponentDisc, ruleset, depth - 1)

                rating = -averageRating(opponentActionRatings)
                actionsConsidered += sumActionsConsidered(opponentActionRatings)
            }

            ratings = ratings.concat({
                action,
                rating,
                actionsConsidered,
            })
        // }
    }

    return ratings
}

function isWinningAction(board: Board, action: PlayerAction, ruleset: Ruleset): boolean {
    const row = board.getDiscCountInColumn(action.columnIndex) - 1
    return BoardObjectiveChecker.isLine(board, action.columnIndex, row, ruleset.lineObjective)
}

function averageRating(ratings: ActionRating[] = []): number {
    if (ratings.length === 0) {
        return 0
    }

    let sum = 0
    for(let r of ratings) {
        sum += r.rating
    }
    return sum / ratings.length
}

function sumActionsConsidered(ratings: ActionRating[] = []): number {
    if (ratings.length === 0) {
        return 0
    }

    let sum = 0
    for(let r of ratings) {
        sum += r.actionsConsidered
    }
    return sum
}


// function rateMoves(board, piece, depth, playerPiece) {
//     var nextMoves;
//     var tempBoard;
//     playerPiece = playerPiece || piece;
//     var oppositePiece = getOppositePiece(piece);
//     var isOpponent = playerPiece === oppositePiece;
//     var result = getMoves(board, piece, isOpponent);

//     if (depth) {
//         for (var i = 0; i < board.length; i++) {
//             if (result[i] === 0 && columnHasSpace(board, i)) {
//                 tempBoard = createBoardWithColumn(board, i, piece);
//                 nextMoves = rateMoves(tempBoard, oppositePiece, depth - 1, playerPiece);
//                 result[i] = avg(nextMoves); //should be divided?
//             }
//         }
//     }

//     return result;
// }
