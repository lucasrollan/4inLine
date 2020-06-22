import * as React from 'react'

import styled from 'styled-components'
import { PresentationMatchState } from '../presentation-match-state'
import { Column } from './column'
import { PlayerType } from '../../model'

export interface BoardProps {
    match: PresentationMatchState
    onPerformAction: (columnIndex: number) => void
}
const StyledBoard = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    height: 500px;
`

export const Board = (props: BoardProps) => (
    <div>
        <StyledBoard>
            {props.match.board.columns.map((col, index) => (
                <Column
                    col={col}
                    rows={props.match.board.size.rows}
                    canDrop={props.match.currentTurn === PlayerType.Human && col.length < props.match.board.size.rows}
                    playerDisc={props.match.players[props.match.currentPlayer].disc}
                    onSelected={() => props.onPerformAction(index)}
                />
            ))}
        </StyledBoard>
    </div>
)
