import { CDNBase } from '../utils';
import { ItemCard } from '../ItemCard';
import StyledImage from '../StyledImage';
import StyledItemList from '../StyledItemList';

const React = require('react');

const FishCard = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

const Fish = ({items}) => {
    return (
        <StyledItemList>
            {
                items.map(item => <FishCard key={item.name} {...item}/>)
            }
        </StyledItemList>
    )
}

export default Fish;
