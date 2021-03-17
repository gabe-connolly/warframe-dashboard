import { CDNBase } from './utils';
import { ItemCard } from './ItemCard';
import StyledImage from './StyledImage';
import StyledItemList from './StyledItemList';
import React from 'react';

const GenericItemsList = (props) => {
    return (
        <StyledItemList>
            {
                props.items.map(item => <GenericItem key={item.name} {...item}/>)
            }
        </StyledItemList>
    )
}

const GenericItem = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default GenericItemsList;