import * as React from "react";

import styled from 'styled-components';
import { Disc } from '../model';
import { PresentationBoard } from "../presentation";

const size = 70;

// TODO: separate components
interface DiscProps { disc: Disc }
const StyledDisc = styled.div`
    height: ${size}px;
    border-radius: 50%;
    ${(props: DiscProps) => props.disc && (
        props.disc === Disc.A ? 'background-color: red;' : 'background-color: cyan;'
    )}
`

interface ColumnProps {
    col: Disc[]
    rows: number
    canDrop: boolean
    onSelected: () => void
}
const StyledColumn = styled.div`
    width: ${size}px;
    height: ${(props: { rows: number }) => props.rows * size}px;
    border: 1px solid blue;
    display: flex;
    flex-direction: column-reverse;
`

// TODO: use
const StyledDropIndicator = styled(StyledDisc)`
    visibility: hidden;
    ${StyledColumn}:hover & {
        visiblity: visible
    }
    
`
const Column = ({ col, rows, canDrop, onSelected }: ColumnProps) => <StyledColumn
    rows={rows}
    onClick={() => canDrop && onSelected()}>
        {col.map(
            disc => <StyledDisc disc={disc} />
        )}
</StyledColumn>

export interface BoardProps {
    board: PresentationBoard
    onPerformAction: (columnIndex: number) => void
}
const StyledBoard = styled.div`
    display: flex;
`

export const Board = (props: BoardProps) => (<div>
    <StyledBoard>
        {props.board.columns.map((col, index) =>
            <Column
                col={col}
                rows={props.board.size.rows}
                canDrop={col.length < props.board.size.rows}
                onSelected={() => props.onPerformAction(index)} />
        )}
    </StyledBoard>
</div>)
