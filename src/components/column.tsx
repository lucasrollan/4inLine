import * as React from "react";

import styled from 'styled-components';
import { Disc } from '../model';
import { DISC_SIZE_PX } from './constants'
import { StyledDisc } from "./disc";

interface ColumnProps {
    col: Disc[]
    rows: number
    canDrop: boolean
    onSelected: () => void
}
const StyledColumn = styled.div`
    width: ${DISC_SIZE_PX}px;
    height: ${(props: { rows: number }) => props.rows * DISC_SIZE_PX}px;
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
export const Column = ({ col, rows, canDrop, onSelected }: ColumnProps) => <StyledColumn
    rows={rows}
    onClick={() => canDrop && onSelected()}>
        {col.map(
            disc => <StyledDisc disc={disc} />
        )}
</StyledColumn>
