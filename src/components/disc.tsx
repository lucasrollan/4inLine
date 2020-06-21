import styled from 'styled-components';
import { DiscColor } from '../model';
import { DISC_SIZE_PX } from './constants'

interface DiscProps { disc: DiscColor }
export const StyledDisc = styled.div`
    height: ${DISC_SIZE_PX}px;
    border-radius: 50%;
    ${(props: DiscProps) => props.disc && (
        props.disc === DiscColor.primary ? 'background-color: red;' : 'background-color: cyan;'
    )}
`
