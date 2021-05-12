import React, {useEffect, useState} from 'react';
import { ItemFigure, ResultsCount } from '../GenericItem';
import { ItemCard } from '../ItemCard';
import ItemFilter from '../ItemFilter';
import StyledItemList from '../StyledItemList';
import StyledFilters from '../StyledSubFilters';
import * as itemDataController from '../../controllers/itemDataController';

const PrimaryWeapons = ({category}) => {
    const items = itemDataController.useItemsData(category);
    const itemsLength = items.length;
    const [filteredItems, setFilteredItems] = useState([]);

    // Currently active filters
    const [keywordFilter, setKeywordFilter] = useState('')
    const [weaponTypeFilter, setWeaponTypeFilter] = useState('')
    const [masteryRankFilter, setMasteryRankFilter] = useState('');
    const [noiseLevelFilter, setNoiseLevelFilter] = useState('');

    // Filter options
    const [masteryRankFilterOptions, setMasteryRankFilterOptions] = useState([]);
    const [noiseLevelFilterOptions, setNoiseLevelFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);

    const resetFilters = () => {
        setKeywordFilter('');
        setWeaponTypeFilter('');
        setMasteryRankFilter('');
        setNoiseLevelFilter('');
    }

    useEffect(() => {
        const ranks = itemDataController.getFilterProps(items, 'masteryReq').sort((a, b) => a - b);
        setMasteryRankFilterOptions(ranks);

        const noise = itemDataController.getFilterProps(items, 'noise');
        setNoiseLevelFilterOptions(noise);

        const type = itemDataController.getFilterProps(items, 'type')
        setTypeFilterOptions(type);

        // Once items has been populated, set it as the default content for filteredItems
        setFilteredItems(items);
    }, [itemsLength])

    useEffect(() => {
        let filteredItems = [...items];

        if (masteryRankFilter) {
            filteredItems = itemDataController.filterItemsByProp(filteredItems, 'masteryReq', parseInt(masteryRankFilter));
        }

        if (noiseLevelFilter) {
            filteredItems = itemDataController.filterItemsByProp(filteredItems, 'noise', noiseLevelFilter);
        }

        if (weaponTypeFilter) {
            filteredItems = itemDataController.filterItemsByProp(filteredItems, 'type', weaponTypeFilter);
        }

        if (keywordFilter) {
            filteredItems = itemDataController.filterItemsByKeyword(filteredItems, keywordFilter);
        }

        setFilteredItems(filteredItems);
    }, [keywordFilter, masteryRankFilter, noiseLevelFilter, weaponTypeFilter])

    const filters = [
        {
            defaultOption: 'Weapon type',
            options: typeFilterOptions,
            value: weaponTypeFilter,
            onChange: (event) => {
                setWeaponTypeFilter(event.target.value);
            }
        },
        {
            defaultOption: 'Noise Level',
            options: noiseLevelFilterOptions,
            value: noiseLevelFilter,
            onChange: (event) => {
                setNoiseLevelFilter(event.target.value);
            }
        },
        {
            defaultOption: 'Mastery Rank required',
            options: masteryRankFilterOptions,
            value: masteryRankFilter,
            onChange: (event) =>  {
                setMasteryRankFilter(event.target.value);
            }
        }
    ]

    return (
        <>
        <StyledFilters>
            <label>Filter weapons by:</label>
            {
                filters.map(filter => {
                    return (
                        <ItemFilter
                            key={filter.defaultOption}
                            defaultOption={filter.defaultOption}
                            name={filter.name}
                            onChange={filter.onChange}
                            options={filter.options}
                            value={filter.value}
                        />
                    )
                })
            }
            <input type="text" placeholder="keyword" name="keyword" value={keywordFilter} onChange={(e) => setKeywordFilter(e.target.value)}/>
            <button onClick={resetFilters}>Reset filters</button>
            <ResultsCount count={filteredItems.length}/>
        </StyledFilters>

        <StyledItemList>
            {itemDataController.listItems(filteredItems, PrimaryWeapon)}
        </StyledItemList>
        </>
    )
}

const PrimaryWeapon = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default PrimaryWeapons;
