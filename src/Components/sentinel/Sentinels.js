import { CDNBase } from '../utils';
import { ItemCard } from '../ItemCard';
import ItemDetailCard from '../ItemDetailCard';
import StyledImage from '../StyledImage';
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
            <StyledImage title={description} alt={description} src={CDNBase + props[1].imageName}/>
        </ItemBuildComponent>
    )
}

export default Sentinels;
