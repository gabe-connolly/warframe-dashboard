import { ItemMain, ItemCard } from '../ItemCard';
import ArcaneRank from './ArcaneRank';
import StyledItemList from '../StyledItemList';
import {ItemFigure} from '../GenericItem';
import * as itemDataController from '../../controllers/itemDataController';

function Arcanes({category}) {
    const items = itemDataController.useItemsData(category);

    return (
        <StyledItemList>
            {itemDataController.listItems(items, ArcaneCard)}
        </StyledItemList>
    )
}

const ArcaneCard = ({levelStats, imageName, name}) => {
    if (name === 'Arcane') {
        return null;
    }

    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <ItemMain>
                <h1>{name}</h1>
                <div className="item-details">
                    <Ranks ranks={levelStats} />
                </div>
            </ItemMain>
        </ItemCard>
    )
}

const Ranks = ({ranks}) => {
    if (ranks === undefined) {
        return null;
    }

    const levels = Array.isArray(Object.entries(ranks)) ? Object.entries(ranks) : [];
    const rankDetails = levels.map((level, idx) => {
        return <ArcaneRank key={idx} {...level} />
    })

    return rankDetails
}

export default Arcanes;
