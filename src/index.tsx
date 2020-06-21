import Logger from 'js-logger'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Board } from './components/board'

import { GameVariation, PlayerType } from './model'
import {
    PresentationMatchState,
    startMatchRequest,
    performActionRequest,
} from './presentation'
import { DISC_COLORS } from './components/constants'

Logger.useDefaults()

class Match extends React.Component<{}, PresentationMatchState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            board: null,
            currentPlayer: null,
            matchId: null,
            isOngoing: false,
            players: null,
            winner: null,
        }
    }

    componentDidMount() {
        // TODO: take from UI
        startMatchRequest(GameVariation.connect4, PlayerType.AI).then((match) =>
            this.setState(match)
        )
    }

    handlePerformAction(columnIndex?: number) {
        if (this.state.isOngoing) {
            performActionRequest('', columnIndex).then((match) =>
                this.setState(match)
            )
        }
    }

    render() {
        const currentPlayer =
            this.state.players && this.state.players[this.state.currentPlayer]
        const winner =
            this.state.players && this.state.players[this.state.winner]
        return (
            <div>
                {this.state.board && (
                    <Board
                        board={this.state.board}
                        onPerformAction={(...args) =>
                            this.handlePerformAction(...args)
                        }
                    />
                )}
                {this.state.isOngoing && this.state.currentPlayer && (
                    <div style={{ color: DISC_COLORS[currentPlayer.disc] }}>
                        {currentPlayer.name}'s turn
                    </div>
                )}
                {
                    //TODO: make this more useful
                    !this.state.isOngoing && 'Game Over! '
                }
                {!this.state.isOngoing &&
                    (winner ? `${winner.name} won` : "It's a draw!")}
            </div>
        )
    }
}

ReactDOM.render(
    // TODO: make it SPA
    <Match />,
    document.getElementById('app')
)
