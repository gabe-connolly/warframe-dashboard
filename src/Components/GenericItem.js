import { CDNBase } from './utils';
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
            <figure className='styled-figure' style={{ backgroundImage: 'url(' + CDNBase + imageName + ')' }}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default GenericItems;