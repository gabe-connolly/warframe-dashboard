import styled from 'styled-components';
import ItemCard from './ItemCard';

const ModCard = styled(ItemCard)`
    flex-basis: 256px;
    justify-content: space-evenly;

    figure {
        width: 100%;
        height: 256px;
    }

    &.common {
        border-color: #9E7A5A #9E7A5A #DBB592
    }

    &.uncommon {
        border-color: #BABABE #BABABE #FAFAFC
    }

    &.rare {
        border-color: #B5924E #B5924E #F1E9B3
    }
`

const StyledFusionLevels = styled.ul`
    display: flex;
    list-style-type: none;
    justify-content: center;
    gap: 0.5em;

    li {
        border: 1px solid #5194B6;
        background-color: #C2F2FF;
        border-radius: 50%;
        width: 8px;
        height: 8px;
    }
`

export { ModCard, StyledFusionLevels }