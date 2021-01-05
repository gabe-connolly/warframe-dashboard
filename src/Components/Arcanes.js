import { CDNBase } from './utils';
import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import StyledImage from './StyledImage';
import React from 'react';

class ArcanesList extends React.Component {
    render() {
        return this.props.items.map(item => <Arcane key={item.name} {...item}/>)
    }
}

const Arcane = (props) => {
    return (
        <ItemCard>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <h3>Ranks</h3>
            <LevelStats levelStats={props.levelStats} />
        </ItemCard>
    )
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

export default ArcanesList;
