import { CDNBase } from './utils';
import ItemCard from './ItemCard';
import StyledImage from './StyledImage';

const React = require('react');

const Fish = (props) => {
    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
        </ItemCard>
    )
}

export default Fish;