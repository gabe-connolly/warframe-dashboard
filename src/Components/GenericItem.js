import React, {useEffect, useState} from 'react';
import { ItemCard } from './ItemCard';
import StyledItemList from './StyledItemList';
import StyledFilters from './StyledSubFilters';
import * as itemDataController from '../controllers/itemDataController';

import {
    LoadingIndicator,
    ResultsCount
} from './filters/filterComponents'

const GenericItems = ({category}) => {
    const [items, loading] = itemDataController.useItemsData(category);
    const [totalItemCount, setTotalItemCount] = useState(0);
    let [filteredItems, setFilteredItems] = useState([]);
    const [keywordFilter, setKeywordFilter] = useState('')

    // Set filtered items once items has loaded an initial data set.
    useEffect(() => {
        setFilteredItems(items);
        setTotalItemCount(items.length)
    }, [loading])

    // Update the filtered items list when the keyword filter is updated.
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
                {
                    !loading && totalItemCount > 0 ? <ResultsCount count={filteredItems.length} /> : <LoadingIndicator />
                }
            </StyledFilters>

            <StyledItemList>
                {
                    loading ? 'Loading...' : itemDataController.listItems(filteredItems, GenericItem)
                }
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