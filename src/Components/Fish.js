import { CDNBase } from './utils';
import ItemCard from './ItemCard';
import StyledImage from './StyledImage';

const React = require('react');

const Fish = (props) => {
    return (
        <ItemCard>
            <h1>{props.name}</h1>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <p>{props.description}</p>
        </ItemCard>
    )
}

export default Fish;