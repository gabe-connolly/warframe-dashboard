import { CDNBase } from '../utils';
import { ItemMain, ItemCard } from '../ItemCard';
import ArcaneRank from './ArcaneRank';
import StyledImage from '../StyledImage';
import React from 'react';

class Arcane extends React.Component {
    render() {
        if (this.props.name === 'Arcane') {
            return null;
        }

        return (
            <ItemCard>
                    <StyledImage alt="" src={CDNBase + this.props.imageName}/>
                <ItemMain>
                    <h1>{this.props.name}</h1>
                    <div className="item-details">
                        <LevelStats levelStats={this.props.levelStats} />
                    </div>
                </ItemMain>
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
        return <ArcaneRank key={idx} {...level} />
    })
    return (
        <div>
            {levelDetails}
        </div>
    )
}

export default Arcane;
