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
    width: ${DISC_SIZE_PX}px;
    height: ${(props: { rows: number }) => (props.rows + 1) * DISC_SIZE_PX}px;
    margin-top: ${DISC_SIZE_PX + 10}px;
    position: relative;
    display: flex;
    flex-direction: column;
`
const StyledColumn = styled.div`
    border: 1px solid blue;
    display: flex;
    flex-direction: column-reverse;
`
const StyledDropIndicator = styled.div`
    visibility: hidden;
    ${StyledColumnContainer}:hover & {
        visibility: visible;
    }
`
export const Column = ({ col, rows, canDrop, playerDisc, onSelected }: ColumnProps) => (
    <StyledColumnContainer rows={rows} onClick={() => canDrop && onSelected()}>
            {
                canDrop && <StyledDropIndicator>
                    <StyledDisc disc={playerDisc} />
                </StyledDropIndicator>
            }
        <StyledColumn>
            {col.map((disc, index) => (
                <StyledDisc disc={disc} height={rows - index} />
            ))}
        </StyledColumn>
    </StyledColumnContainer>
)
