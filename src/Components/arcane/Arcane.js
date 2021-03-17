import { CDNBase } from '../utils';
import { ItemMain, ItemCard } from '../ItemCard';
import ArcaneRank from './ArcaneRank';
import StyledImage from '../StyledImage';
import StyledItemList from '../StyledItemList';
import React from 'react';

const Arcanes = ({items}) => {
    return (
        <StyledItemList>
            {
                items.map(item => <ArcaneCard key={item.name} {...item}/>)
            }
        </StyledItemList>
    )
}

const ArcaneCard = ({levelStats, imageName, name}) => {
    if (name === 'Arcane') {
        return null;
    }

    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + imageName}/>
            <ItemMain>
                <h1>{name}</h1>
                <div className="item-details">
                    <Ranks ranks={levelStats} />
                </div>
            </ItemMain>
        </ItemCard>
    )
}

const Ranks = ({ranks}) => {
    if (ranks === undefined) {
        return null;
    }

    const levels = Array.isArray(Object.entries(ranks)) ? Object.entries(ranks) : [];
    const rankDetails = levels.map((level, idx) => {
        return <ArcaneRank key={idx} {...level} />
    })

    return rankDetails
}

export default Arcanes;
