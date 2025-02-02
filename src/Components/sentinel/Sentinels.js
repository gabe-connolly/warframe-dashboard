import { ItemFigure, ResultsCount } from '../GenericItem';
import { ItemCard } from '../ItemCard';
import ItemDetailCard from '../ItemDetailCard';
import StyledItemList from '../StyledItemList';
import StyledFilters from '../StyledSubFilters';
import ItemBuildComponent from '../ItemBuildComponent';
import * as itemDataController from '../../controllers/itemDataController';

const Sentinels = ({category}) => {
    const items = itemDataController.useItemsData(category);

    return (
        <>
            <StyledFilters>
                <ResultsCount count={items.length}/>
            </StyledFilters>
            <StyledItemList>
                {itemDataController.listItems(items, SentinelCard)}
            </StyledItemList>
        </>
    )
}

const SentinelCard = ({armor, components, description, imageName, name}) => {
    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>Armor: {armor}</p>
            <h3>Manufacturing Requirements</h3>
            <ManufacturingRequirements components={components} />
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
