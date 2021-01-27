import { CDNBase } from './utils';
import { ItemCard } from './ItemCard';
import StyledImage from './StyledImage';
import React from 'react';

class GenericItem extends React.Component {
    render() {
        return (
            <ItemCard>
                <StyledImage alt="" src={CDNBase + this.props.imageName}/>
                <h1>{this.props.name}</h1>
                <p>{this.props.description}</p>
            </ItemCard>
        )
    }
}

export default GenericItem;