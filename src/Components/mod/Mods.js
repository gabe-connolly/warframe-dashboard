import React, {useEffect, useState} from 'react';
import { ItemFigure } from '../GenericItem';
import { ModCard, StyledFusionLevels } from './ModStyles';
import ItemFilter from '../ItemFilter';
import StyledItemList from '../StyledItemList';
import * as itemDataController from '../../controllers/itemDataController';
import StyledFilters from '../StyledSubFilters';


import {
    LoadingIndicator,
    ResultsCount
} from '../filters/filterComponents'

function Mods({category}) {
    const scrubbedModData = (mods) => {
        let deDupedMods = {};
        mods.forEach(mod => {
            const modLookupKey = `${mod.name}-fusion-levels-${mod.fusionLimit}`
            if (!deDupedMods.hasOwnProperty(modLookupKey) && mod.levelStats) {
                deDupedMods[modLookupKey] = mod;
            }
        })
        return Object.values(deDupedMods);
    }

    const [items, loading] = itemDataController.useItemsData(category);
    const itemsCount = items.length;

    let [filteredItems, setFilteredItems] = useState([]);

    // Currently active filters
    const [keywordFilter, setKeywordFilter] = useState('')
    const [polarityFilter, setPolarityFilter] = useState('');
    const [rarityFilter, setRarityFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    // Filter options
    const [polarityFilterOptions, setPolarityFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);
    const [rarityFilterOptions, setRarityFilterOptions] = useState([]);

    useEffect(() => {
        const modPolarities = itemDataController.getFilterProps(items, 'polarity');
        setPolarityFilterOptions(modPolarities);

        const modTypes = itemDataController.getFilterProps(items, 'type');
        setTypeFilterOptions(modTypes);

        const modRarities = itemDataController.getFilterProps(items, 'rarity');
        setRarityFilterOptions(modRarities);

        setFilteredItems(items);
    }, [itemsCount])

    useEffect(() => {
        let filteredItems = [...items];

        const noActiveFilters = !polarityFilter && !rarityFilter && !typeFilter && !keywordFilter;
        if (noActiveFilters) {
            setFilteredItems(filteredItems ? filteredItems.slice(0, 99) : []);
            return;
        }

        if (polarityFilter) {
            filteredItems = itemDataController.filterItemsByProp(filteredItems, 'polarity', polarityFilter);
        }

        if (rarityFilter) {
            filteredItems = itemDataController.filterItemsByProp(filteredItems, 'rarity', rarityFilter);
        }

        if (typeFilter) {
            filteredItems = itemDataController.filterItemsByProp(filteredItems, 'type', typeFilter);
        }

        if (keywordFilter) {
            filteredItems = itemDataController.filterItemsByKeyword(filteredItems, keywordFilter);
        }
        setFilteredItems(filteredItems);
    }, [keywordFilter, polarityFilter, rarityFilter, typeFilter])

    const resetFilters = () => {
        setKeywordFilter('');
        setPolarityFilter('');
        setRarityFilter('');
        setTypeFilter('');
    }

    const modFilters = [
        {
            defaultOption: 'Polarity',
            options: polarityFilterOptions,
            value: polarityFilter,
            onChange: (event) => {
                setPolarityFilter(event.target.value);
            }
        },
        {
            defaultOption: 'Type',
            options: typeFilterOptions,
            value: typeFilter,
            onChange: (event) => {
                setTypeFilter(event.target.value);
            }
        },
        {
            defaultOption: 'Rarity',
            options: rarityFilterOptions,
            value: rarityFilter,
            onChange: (event) =>  {
                setRarityFilter(event.target.value);
            }
        }
    ]

    return (
        <>
        <StyledFilters>
            <label>Filter mods by:</label>
            {
                modFilters.map(filter => {
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

            {
                !loading && items.length > 0 ? <ResultsCount count={filteredItems.length} /> : <LoadingIndicator loading={loading} />
            }
        </StyledFilters>

        <StyledItemList>
            <ModList items={filteredItems}/>
        </StyledItemList>
        </>
    )
}

const ModList = ({items}) => {
    if (!items) {
        return [];
    }

    return items.map(mod => {
        const modKey = `${mod.name}-limit-${mod.fusionLimit}`;
        return (
            <Mod key={modKey} {...mod}/>
        )
    })
}

const Mod = ({ fusionLimit, imageName, levelStats, name, rarity, uniqueName}) => {

    const FusionLevels = (props) => {
        let fusionLimit = Array.apply(null, Array(props.fusionLimit));
        fusionLimit = fusionLimit.map((value, idx) => {
            return <li key={idx}></li>
        })

        return <StyledFusionLevels>{fusionLimit}</StyledFusionLevels>
    }

    const modLevels = levelStats;
    const maxModLevelIndex = modLevels !== undefined ? modLevels.length - 1 : null;
    let maxModLevelStats = maxModLevelIndex ? modLevels[maxModLevelIndex].stats : [];
    maxModLevelStats = maxModLevelStats.map((stat, idx) => <div className="stat" key={idx}>{stat}</div>)

    return (
        <ModCard key={uniqueName} className={rarity.toLowerCase()}>
            <ItemFigure imageName={imageName}/>
            <h1>{name}</h1>
            {maxModLevelStats}
            <FusionLevels fusionLimit={fusionLimit}/>
        </ModCard>
    )
}

export default Mods;