import { CDNBase } from './utils';
import { ItemCard } from './ItemCard';
import StyledImage from './StyledImage';

const React = require('react');

const Fish = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default Fish;
