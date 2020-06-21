import Logger from 'js-logger'
import * as React from "react";
import * as ReactDOM from "react-dom";

import { BoardComponent } from "./components/board";

import { GameVariation, AgentType } from "./model";
import { PresentationMatchState, startMatchRequest, performActionRequest } from "./presentation";

Logger.useDefaults();

// TODO: rename to Match
class MatchComponent extends React.Component<{}, PresentationMatchState> {
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
        startMatchRequest(GameVariation.connect4, AgentType.AI)
            .then(match =>
                this.setState(match)
            )
    }

    handlePerformAction(columnIndex?: number) {
        if (this.state.isOngoing) {
            performActionRequest('', columnIndex)
                .then(match =>
                    this.setState(match)
                )
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
                this.state.isOngoing && this.state.currentPlayer && 
                    <div style={{ color: this.state.currentPlayer.color}}>
                        {this.state.currentPlayer.name}'s turn
                    </div>
            }
            {
                !this.state.isOngoing && 'Game Over! '
            }
            {
                !this.state.isOngoing && (this.state.winner ? `${this.state.winner.name} won` : 'It\'s a draw!')
            }
        </div>
    }
}

ReactDOM.render(
    // TODO: make it SPA
    <MatchComponent />,
    // TODO: use another Id
    document.getElementById("example")
);
