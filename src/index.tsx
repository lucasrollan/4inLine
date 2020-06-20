import Logger from 'js-logger'
import * as React from "react";
import * as ReactDOM from "react-dom";

import { BoardComponent } from "./components/board";

import { startMatch, performAction } from './application'
import { PlayerActionType, MatchType, AgentType } from "./model";
import { PresentationMatchState, PresentationTranslator, startMatchRequest, performActionRequest } from "./presentation";

Logger.useDefaults();

class MatchComponent extends React.Component<{}, PresentationMatchState> {
    constructor(props: {}) {
        super(props)

        this.state = {
            board: null,
            currentPlayer: null,
            matchId: null,
            ongoing: false,
            players: null,
            winner: null,
        }
    }

    componentDidMount() {
        startMatchRequest(MatchType.connect4, AgentType.AI)
            .then(match =>
                this.setState(match)
            )
    }

    handlePerformAction(action: PlayerActionType, columnIndex?: number) {
        if (this.state.ongoing) {
            performActionRequest('', action, columnIndex)
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
