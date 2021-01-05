import { CDNBase } from './utils';
import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import StyledImage from './StyledImage';
import React from 'react';

class ArchwingList extends React.Component {
    render() {
        return this.props.items.map(item => <Archwing key={item.name} {...item}/>)
    }
}

const Archwing = (props) => {
    return (
        <ItemCard>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <h3>Abilities</h3>
            <Abilities abilities={props.abilities} />
        </ItemCard>
    )
}

const Abilities = (props) => {
    return props.abilities.map((ability) => {
        return <Ability key={ability.name} {...ability} />
    })
}

const Ability = (props) => {
    return (
        <ItemDetailCard key={props.name}>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </ItemDetailCard>
    )
}

export default ArchwingList;
