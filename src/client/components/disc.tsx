import styled from 'styled-components'
import { Disc } from '../../model'
import { DISC_SIZE_PX } from './constants'

interface DiscProps {
    disc: Disc
    height?: number 
}
export const StyledDisc = styled.div`
    height: ${DISC_SIZE_PX}px;
    width: ${DISC_SIZE_PX}px;
    border-radius: 50%;
    ${(props: DiscProps) =>
        props.disc &&
        (props.disc === Disc.primary
            ? 'background-color: red;'
            : 'background-color: cyan;')}
    
    ${(props: DiscProps) =>
        props.height && `animation: fall-into-place-${props.height} 0.${props.height}s ease-in`}
    
`
