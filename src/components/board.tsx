import * as React from "react";

import styled from 'styled-components';
import { PresentationBoard } from "../presentation";
import { Column } from "./column";

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
