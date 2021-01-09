import styled from 'styled-components';
import ItemCard from './ItemCard';

const ModCard = styled(ItemCard)`
    display:flex;
    flex-basis: 256px;
    justify-content: space-evenly;
    flex-direction: column;
    justify-content: space-between;

    figure {
        width: 100%;
        height: 256px;
    }

    .stat {
        padding: 2px 10px;
    }

    @media only screen and (max-width: 512px) {
        flex-basis: 100%;

        .figure {
            height: auto;
        }
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
    gap: 0.5em;
    justify-content: center;
    list-style-type: none;
    flex-wrap: wrap;
    margin: 1em;

    li {
        border: 1px solid #5194B6;
        background-color: #C2F2FF;
        border-radius: 50%;
        width: 8px;
        height: 8px;
    }
`

export { ModCard, StyledFusionLevels }