import { CDNBase } from './utils';
import { ItemCard } from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import StyledImage from './StyledImage';
import React from 'react';

const Archwing = (props) => {
    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
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

export default Archwing;
