import * as React from 'react'

import styled from 'styled-components'
import { Disc } from '../../model'
import { DISC_SIZE_PX } from './constants'
import { StyledDisc } from './disc'

interface ColumnProps {
    col: Disc[]
    rows: number
    canDrop: boolean
    playerDisc: Disc
    onSelected: () => void
}
const StyledColumnContainer = styled.div`
    margin-top: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
`
const StyledColumn = styled.div`
    box-sizing: border-box;
    width: ${DISC_SIZE_PX + 4}px;
    height: ${(props: { rows: number }) => (props.rows) * DISC_SIZE_PX + 4}px;
    border: 1px solid blue;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`
const StyledDropIndicator = styled.div`
    visibility: hidden;
    transform: translateX(2px);
    ${(props: { canDrop: boolean }) => props.canDrop && `
        ${StyledColumnContainer}:hover & {
            visibility: visible;
        }
    `}
`
export const Column = ({ col, rows, canDrop, playerDisc, onSelected }: ColumnProps) => (
    <StyledColumnContainer onClick={() => canDrop && onSelected()}>
        {
            <StyledDropIndicator canDrop={canDrop}>
                <StyledDisc disc={playerDisc} />
            </StyledDropIndicator>
        }
        <StyledColumn rows={rows}>
            {col.map((disc, index) => (
                <StyledDisc disc={disc} height={rows - index} />
            ))}
        </StyledColumn>
    </StyledColumnContainer>
)
