import * as React from "react";
import * as ReactDOM from "react-dom";

import { BoardComponent } from "./components/board";

import { startMatch, performAction } from './application'
import { PlayerAction, Board, Match, Player, Disc } from "./main";

const match = startMatch()

class PresentationTranslator {
    static translateFromDomain(match: Match): PresentationModel {
        return ({
            board: match.board,
            currentPlayer: this.transformPlayer(match.currentPlayer),
            ongoing: match.ongoing,
            winner: this.transformPlayer(match.winner),
        })
    }

    static transformPlayer(player: Player): {
        name: string,
        color: string,
    } {
        if (!player) {
            return null
        }
        return {
            name: player.agent.name,
            color: player.disc === Disc.A ? 'red' : 'cyan',
        }
    }
}


class MatchComponent extends React.Component<{}, PresentationModel> {
    constructor(props: {}) {
        super(props)

        this.state = PresentationTranslator.translateFromDomain(match)
    }

    handlePerformAction(action: PlayerAction, columnIndex?: number) {
        if (this.state.ongoing) {
            performAction(match, action, columnIndex)
            this.setState(PresentationTranslator.translateFromDomain(match))
        }
    }

    render() {
        return <div>
            {
                this.state.board && <BoardComponent
                    board={this.state.board}
                    onPerformAction={(...args) => this.handlePerformAction(...args)}
                />
            }
            {
                this.state.ongoing && this.state.currentPlayer && 
                    <div style={{ color: this.state.currentPlayer.color}}>
                        {this.state.currentPlayer.name}'s turn
                    </div>
            }
            {
                !this.state.ongoing && 'Game Over! '
            }
            {
                !this.state.ongoing && (this.state.winner ? `${this.state.winner.name} won` : 'It\'s a draw!')
            }
        </div>
    }
}

ReactDOM.render(
    <MatchComponent />,
    document.getElementById("example")
);

interface PresentationModel {
    board: Board,
    currentPlayer: {
        name: string,
        color: string,
    },
    ongoing: boolean,
    winner: {
        name: string,
        color: string,
    }
}
