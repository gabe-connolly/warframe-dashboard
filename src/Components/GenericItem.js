import React, {useEffect, useState} from 'react';
import { ItemCard } from './ItemCard';
import StyledItemList from './StyledItemList';
import StyledFilters from './StyledSubFilters';
import * as itemDataController from '../controllers/itemDataController';

const ResultsCount = ({allItemsCount, filteredItemcount}) => {
    const output = allItemsCount > 0 ? `Found ${filteredItemcount} results` : 'Loading...';
    return (
        <span>{output}</span>
    )
}

const GenericItems = ({category}) => {
    const items = itemDataController.useItemsData(category);

    let [filteredItems, setFilteredItems] = useState([]);
    const itemsCount = items.length;

    // Currently active filters
    const [keywordFilter, setKeywordFilter] = useState('')

    useEffect(() => {
        setFilteredItems(items);
    }, [itemsCount])

    useEffect(() => {
        let filteredItems = [...items];

        if (keywordFilter) {
            filteredItems = itemDataController.filterItemsByKeyword(filteredItems, keywordFilter);
        }

        setFilteredItems(filteredItems);

    }, [keywordFilter])

    const resetFilters = () => {
        setKeywordFilter('');
    }

    return (
        <>
            <StyledFilters>
                <input type="text" placeholder="keyword" name="keyword" value={keywordFilter} onChange={(e) => setKeywordFilter(e.target.value)}/>
                <button onClick={resetFilters}>Reset filters</button>
                <ResultsCount allItemsCount={items.length} filteredItemcount={filteredItems.length}/>
            </StyledFilters>

            <StyledItemList>
                {itemDataController.listItems(filteredItems, GenericItem)}
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