import { CDNBase } from './utils';
import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import StyledImage from './StyledImage';
import React from 'react';
import ItemBuildComponent from './ItemBuildComponent';

class Sentinel extends React.Component {
    render() {
        return (
            <ItemCard>
                <StyledImage alt="" src={CDNBase + this.props.imageName} className="small"/>
                <h1>{this.props.name}</h1>
                <p>{this.props.description}</p>
                <p>Armor: {this.props.armor}</p>
                <h3>Manufacturing Requirements</h3>
                <ManufacturingRequirements components={this.props.components} />
            </ItemCard>
        )
    }
}

const ManufacturingRequirements = (props) => {
    let components = props.components;
    
    if (components === undefined) {
        return null;
    }

    components = Object.entries(props.components);
    return (
        <ItemDetailCard key={props.uniqueName}>
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

export default Sentinel;
