import { ItemCard } from '../ItemCard';
import ItemDetailCard from '../ItemDetailCard';
import * as itemDataController from '../../controllers/itemDataController';
import { ItemFigure, ResultsCount } from '../GenericItem';
import StyledItemList from '../StyledItemList';
import StyledFilters from '../StyledSubFilters';

function Archwings({category}) {
    const items = itemDataController.useItemsData(category);

    return (
        <>
            <StyledFilters>
                <ResultsCount count={items.length}/>
            </StyledFilters>

            <StyledItemList>
                {itemDataController.listItems(items, Archwing)}
            </StyledItemList>
        </>
    )
}

const Archwing = ({abilities, description, imageName, name}) => {
    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
            <h3>Abilities</h3>
            <Abilities abilities={abilities} />
        </ItemCard>
    )
}

const Abilities = ({abilities}) => {
    if (abilities === undefined) {
        return null;
    }

    return abilities.map((ability) => {
        return <Ability key={ability.name} {...ability} />
    })
}

const Ability = ({description, name}) => {
    return (
        <ItemDetailCard key={name}>
            <h2>{name}</h2>
            <p>{description}</p>
        </ItemDetailCard>
    )
}

export default Archwings;
