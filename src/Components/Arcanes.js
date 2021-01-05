import { CDNBase } from './utils';
import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import StyledImage from './StyledImage';
import React from 'react';

class Arcane extends React.Component {
    render() {
        return (
            <ItemCard>
                <h1>{this.props.name}</h1>
                <p>{this.props.description}</p>
                <StyledImage alt="" src={CDNBase + this.props.imageName}/>
                <h3>Ranks</h3>
                <LevelStats levelStats={this.props.levelStats} />
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
    return levels.map((level, idx) => {
        return <LevelStat key={idx} {...level} />
    })
}

const LevelStat = (props) => {
    const level = props[0];
    const levelDescription = props[1].stats[0];
    return (
        <ItemDetailCard key={props.name}>
            <p>
                <strong>Rank {level}: </strong>
                {levelDescription}
            </p>
        </ItemDetailCard>
    )
}

export default Arcane;
