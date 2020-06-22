import Logger from 'js-logger'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { GameVariation, PlayerType, Match, MatchState } from '../model'
import { createMatch, startMatch, performAction } from '../application'
import { PresentationTranslator } from './presentation-translator'
import { PresentationMatchState } from './presentation-match-state'
import { Board } from './components/board'
import { isNumber } from 'lodash'
import { MatchSelector } from './components/match-selector'

Logger.useDefaults()

class MatchUI extends React.Component<{}, PresentationMatchState> {
    match: Match

    constructor(props: {}) {
        super(props)

        this.state = {
            board: null,
            currentPlayer: null,
            matchId: null,
            isOngoing: false,
            players: null,
            winner: null,
            currentTurn: null,
            pastTurn: null,
        }
    }

    startMatch(gameVariation: GameVariation, opponent: PlayerType) {
        this.match = createMatch(gameVariation, opponent)
        this.match.subscribe((matchState) => this.onMatchUpdate(matchState))
        startMatch(this.match)
    }

    onMatchUpdate(matchState: MatchState): void {
        Logger.log('update', matchState)
        const newState = PresentationTranslator.translateFromDomain(this.match, matchState)
        if (newState.pastTurn === PlayerType.AI) {
            window.setTimeout(() => this.setState(newState), 1500)
        } else {
            this.setState(newState)
        }
    }

    handlePerformAction(columnIndex?: number) {
        performAction(this.match, columnIndex)
    }

    render() {
        const currentPlayer =
            this.state.players && this.state.players[this.state.currentPlayer]
        const winner =
            this.state.players && this.state.players[this.state.winner]
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MatchSelector onMatchSelected={(gameVariation, opponent) => this.startMatch(gameVariation, opponent)} />
                    {this.state.board && (
                        <div style={{ marginLeft: '50px' }}>
                            <Board
                                match={this.state}
                                onPerformAction={(...args) =>
                                    this.handlePerformAction(...args)
                                }
                            />
                            {this.state.isOngoing && isNumber(this.state.currentPlayer) && 
                                <h2>{currentPlayer.name}'s turn</h2>
                            }
                            {
                                !this.state.isOngoing && <div>
                                    <h1>{(winner ? `${winner.name} won` : "It's a draw!")}</h1>
                                    <h2>Game Over!</h2>
                                </div>
                            }
                        </div>
                    )}
            </div>
        )
    }
}

ReactDOM.render(
    <MatchUI />,
    document.getElementById('app')
)
