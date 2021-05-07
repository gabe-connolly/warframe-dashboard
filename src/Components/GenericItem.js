import { CDNBase } from './utils';
import { ItemCard } from './ItemCard';
import StyledImage from './StyledImage';
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
            <StyledImage alt="" src={CDNBase + imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default GenericItems;