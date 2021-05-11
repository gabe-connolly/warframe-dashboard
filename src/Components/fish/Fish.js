import { ItemCard } from '../ItemCard';
import * as itemDataController from '../../controllers/itemDataController';
import {ItemFigure} from '../GenericItem';
import StyledItemList from '../StyledItemList';


function Fish({category}) {
    const items = itemDataController.useItemsData(category);

    return (
        <StyledItemList>
            {itemDataController.listItems(items, FishCard)}
        </StyledItemList>
    )
}

const FishCard = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default Fish;
