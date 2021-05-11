import { CDNBase } from '../utils';
import { ItemCard } from '../ItemCard';
import ItemDetailCard from '../ItemDetailCard';
import StyledItemList from '../StyledItemList';
import ItemBuildComponent from '../ItemBuildComponent';
import * as itemDataController from '../../controllers/itemDataController';

const Sentinels = ({category}) => {
    const items = itemDataController.useItemsData(category);

    return (
        <StyledItemList>
            {itemDataController.listItems(items, SentinelCard)}
        </StyledItemList>
    )
}

const SentinelCard = (props) => {
    return (
        <ItemCard>
            <figure className='styled-figure' style={{ backgroundImage: 'url(' + CDNBase + props.imageName + ')' }}/>
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
                        <ManufacturingRequirement key={component[1].uniqueName} {...component} />
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
        </ItemBuildComponent>
    )
}

export default Sentinels;
