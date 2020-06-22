import * as React from 'react'

import styled from 'styled-components'
import { GameVariation, PlayerType } from '../../model'

const StyledMatchSelector = styled.div`
    background: lightgray;
    padding: 20px;
`

type MatchSelectorProps = {
    onMatchSelected: (gameVariation: GameVariation, opponent: PlayerType) => void
}
export const MatchSelector = ({ onMatchSelected }: MatchSelectorProps) => {
    return <StyledMatchSelector>
        <h3>Play a game</h3>
        <h4>VS a friend</h4>
        <div><button onClick={() => onMatchSelected(GameVariation.connect4, PlayerType.Human)}>4 in line</button></div>
        <div><button onClick={() => onMatchSelected(GameVariation.connect5, PlayerType.Human)}>5 in line</button></div>
        <div><button onClick={() => onMatchSelected(GameVariation.tiny, PlayerType.Human)}>Tiny</button></div>
        <h4>VS computer</h4>
        <div><button onClick={() => onMatchSelected(GameVariation.connect4, PlayerType.AI)}>4 in line</button></div>
        <div><button onClick={() => onMatchSelected(GameVariation.connect5, PlayerType.AI)}>5 in line</button></div>
        <div><button onClick={() => onMatchSelected(GameVariation.tiny, PlayerType.AI)}>Tiny</button></div>
    </StyledMatchSelector>
}
