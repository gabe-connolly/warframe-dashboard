import { ItemCard } from './ItemCard';
import StyledItemList from './StyledItemList';
import * as itemDataController from '../controllers/itemDataController';

const GenericItems = ({category}) => {
    const items = itemDataController.useItemsData(category);

    return (
        <StyledItemList>
            {itemDataController.listItems(items, GenericItem)}
        </StyledItemList>
    )
}

const GenericItem = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <h1>{name.trim()}</h1>
            <p>{description.trim()}</p>
        </ItemCard>
    )
}

const ItemFigure = ({imageName}) => {
    return (
        <figure className='styled-figure' style={{ backgroundImage: 'url(' + itemDataController.CDNBase + imageName + ')' }}/>
    )
}

export { GenericItems, ItemFigure } ;