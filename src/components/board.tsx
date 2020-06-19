import * as React from "react";

import styled from 'styled-components';
import { Match, Board, BoardColumn, Disc, PlayerAction } from '../main';

const size = 50;

interface DiscProps { disc: Disc }
const StyledDisc = styled.div`
    height: ${size}px;
    border-radius: 50%;
    ${(props: DiscProps) => props.disc && (
        props.disc === Disc.A ? 'background-color: red;' : 'background-color: cyan;'
    )}
`

interface ColumnProps {
    col: BoardColumn
    rows: number
    canDrop: boolean
    onSelected: (action: PlayerAction) => void
}
const StyledColumn = styled.div`
    width: ${size}px;
    height: ${(props: { rows: number }) => props.rows * size}px;
    border: 1px solid blue;
    display: flex;
    flex-direction: column-reverse;
`
const StyledDropIndicator = styled(StyledDisc)`
    visibility: hidden;
    ${StyledColumn}:hover & {
        visiblity: visible
    }
    
`
const Column = ({ col, rows, canDrop, onSelected }: ColumnProps) => <StyledColumn
    rows={rows}
    onClick={() => canDrop && onSelected(PlayerAction.dropDisc)}>
        {col.discs.map(
            disc => <StyledDisc disc={disc} />
        )}
</StyledColumn>

export interface BoardComponentProps {
    board: Board
    onPerformAction: (action: PlayerAction, columnIndex: number) => void
}
const StyledBoard = styled.div`
    display: flex;
`
export const BoardComponent = (props: BoardComponentProps) => (<div>
    <StyledBoard>
        {props.board.columns.map((col, index) =>
            <Column
                col={col}
                rows={props.board.grid.rows}
                canDrop={col.discs.length < props.board.grid.rows}
                onSelected={(action: PlayerAction) => props.onPerformAction(action, index)} />
        )}
    </StyledBoard>
</div>)
