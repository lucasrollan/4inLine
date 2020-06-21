import * as React from 'react'

import styled from 'styled-components'
import { PresentationMatchState } from '../../presentation'
import { Column } from './column'

export interface BoardProps {
    match: PresentationMatchState
    onPerformAction: (columnIndex: number) => void
}
const StyledBoard = styled.div`
    display: flex;
`

export const Board = (props: BoardProps) => (
    <div>
        <StyledBoard>
            {props.match.board.columns.map((col, index) => (
                <Column
                    col={col}
                    rows={props.match.board.size.rows}
                    canDrop={col.length < props.match.board.size.rows}
                    playerDisc={props.match.players[props.match.currentPlayer].disc}
                    onSelected={() => props.onPerformAction(index)}
                />
            ))}
        </StyledBoard>
    </div>
)
