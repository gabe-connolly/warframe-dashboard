import { CDNBase } from './utils';
import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import StyledImage from './StyledImage';
import React from 'react';
import styled from "styled-components";

const ItemMain = styled.main`
    @media (min-width: 1024px) {
        flex-wrap: nowrap;
    }
`

const ItemAside = styled.aside`
    
`

class Arcane extends React.Component {
    render() {
        if (this.props.name === 'Arcane') {
            return null;
        }

        return (
            <ItemCard className="clearfix">
                <ItemMain>
                    <h1>{this.props.name}</h1>
                    <p>{this.props.description}</p>
                    <StyledImage alt="" src={CDNBase + this.props.imageName}/>
                </ItemMain>
                <ItemAside>
                    <h3>Ranks</h3>
                    <LevelStats levelStats={this.props.levelStats} />
                </ItemAside>
            </ItemCard>
        )
    }
}

const LevelStats = (props) => {
    let levels = props.levelStats;
    
    if (levels === undefined) {
        return null;
    }

    levels = Object.entries(props.levelStats);
    const levelDetails = levels.map((level, idx) => {
        return <LevelStat key={idx} {...level} />
    })
    return (
        <ItemDetailCard key={props.name}>
            {levelDetails}
        </ItemDetailCard>
    )
}

const LevelStat = (props) => {
    const level = props[0];
    const levelDescription = props[1].stats[0];
    return (
        <p>
            <strong>Rank {level}: </strong>
            {levelDescription}
        </p>
    )
}

export default Arcane;
