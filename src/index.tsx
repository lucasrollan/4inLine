import Logger from 'js-logger'
import * as React from "react";
import * as ReactDOM from "react-dom";

import { BoardComponent } from "./components/board";

import { startMatch, performAction } from './application'
import { PlayerAction, MatchType, AgentType } from "./model";
import { PresentationModel, PresentationTranslator } from "./presentation/presentation-model";

Logger.useDefaults();

const match = startMatch(MatchType.connect4, AgentType.Human)

class MatchComponent extends React.Component<{}, PresentationModel> {
    constructor(props: {}) {
        super(props)

        this.state = PresentationTranslator.translateFromDomain(match.state)
    }

    handlePerformAction(action: PlayerAction, columnIndex?: number) {
        if (this.state.ongoing) {
            performAction(match, action, columnIndex)
            this.setState(PresentationTranslator.translateFromDomain(match.state))
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
