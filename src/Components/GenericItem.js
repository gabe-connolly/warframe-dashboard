import { ItemCard } from './ItemCard';
import StyledItemList from './StyledItemList';
import StyledFilters from './StyledSubFilters';
import * as itemDataController from '../controllers/itemDataController';

const ResultsCount = ({count}) => {
    return (
        <span>Found {count} results</span>
    )
}

const GenericItems = ({category}) => {
    const items = itemDataController.useItemsData(category);

    return (
        <>
            <StyledFilters>
                <ResultsCount count={items.length}/>
            </StyledFilters>

            <StyledItemList>
                {itemDataController.listItems(items, GenericItem)}
            </StyledItemList>
        </>
    )
}

const GenericItem = ({description, imageName, name}) => {
    const descriptionOutput = description !== undefined && description.length ? <p>{description.trim()}</p>: null;

    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <h1>{name}</h1>
            {descriptionOutput}
        </ItemCard>
    )
}

const ItemFigure = ({imageName}) => {
    return (
        <figure className='styled-figure' style={{ backgroundImage: 'url(' + itemDataController.CDNBase + imageName + ')' }}/>
    )
}

export { GenericItems, ItemFigure, ResultsCount } ;