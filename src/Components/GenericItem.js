import { CDNBase } from './utils';
import { ItemCard } from './ItemCard';
import StyledImage from './StyledImage';
import React from 'react';

const GenericItem = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default GenericItem;