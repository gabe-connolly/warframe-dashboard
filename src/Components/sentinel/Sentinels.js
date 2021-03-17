import { CDNBase } from '../utils';
import { ItemCard } from '../ItemCard';
import ItemDetailCard from '../ItemDetailCard';
import StyledImage from '../StyledImage';
import StyledItemList from '../StyledItemList';
import React from 'react';
import ItemBuildComponent from '../ItemBuildComponent';

const Sentinels = ({items}) => {
    return (
        <StyledItemList>
            {
                items.map(item => <SentinelCard key={item.name} {...item}/>)
            }
        </StyledItemList>
    )
}

const SentinelCard = (props) => {
    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + props.imageName} className="small"/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p>Armor: {props.armor}</p>
            <h3>Manufacturing Requirements</h3>
            <ManufacturingRequirements components={props.components} />
        </ItemCard>
    )
}

const ManufacturingRequirements = ({components, uniqueName}) => {
    if (components === undefined) {
        return null;
    }

    components = Object.entries(components);
    return (
        <ItemDetailCard key={uniqueName}>
            {
                components.map((component) => {
                    return (
                        <ManufacturingRequirement key={component.uniqueName} {...component} />
                    )
                })
            }
        </ItemDetailCard>
    )
}

const ManufacturingRequirement = (props) => {
    const description = props[1].description;
    return (
        <ItemBuildComponent>
            <p>{props[1].name} x {props[1].itemCount}</p>
            <StyledImage title={description} alt={description} src={CDNBase + props[1].imageName}/>
        </ItemBuildComponent>
    )
}

export default Sentinels;
