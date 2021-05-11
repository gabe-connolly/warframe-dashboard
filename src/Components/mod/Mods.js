import React, {useEffect, useState} from 'react';
import { CDNBase } from '../utils';
import { ModCard, StyledFusionLevels } from './ModStyles';
import ModFilter from './ModFilter';
import StyledItemList from '../StyledItemList';
import * as itemDataController from '../../controllers/itemDataController';
import StyledFilters from '../StyledSubFilters';

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

    const items = itemDataController.useItemsData(category, [scrubbedModData]);

    const [filteredItems, setFilteredItems] = useState();

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
    }, [items])

    const filterItemsByPolarity = items => {
        return items.filter(item => {
            return item.polarity === polarityFilter
        })
    }

    const filterItemsByRarity = items => {
        return items.filter(item => {
            return item.rarity === rarityFilter
        })
    }

    const filterItemsByType = items => {
        return items.filter(item => {
            return item.type === typeFilter
        })
    }

    const filterItemsByKeyword = items => {
        return items.filter(item => {
            return item.name.toLowerCase().includes(keywordFilter.toLowerCase());
        })
    }

    useEffect(() => {
        let filteredItems = [...items];
        const noActiveFilters = !polarityFilter && !rarityFilter && !typeFilter && !keywordFilter;

        if (noActiveFilters) {
            const subSet = filteredItems.slice(0, 99);
            setFilteredItems(subSet);
            return;
        }

        if (polarityFilter) {
            filteredItems = filterItemsByPolarity(filteredItems);
        }

        if (rarityFilter) {
            filteredItems = filterItemsByRarity(filteredItems);
        }

        if (typeFilter) {
            filteredItems = filterItemsByType(filteredItems);
        }

        if (keywordFilter) {
            filteredItems = filterItemsByKeyword(filteredItems);
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
                        <ModFilter
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
    const maxModLevelIndex = modLevels !== undefined ? modLevels.length - 1 : false;
    let maxModLevelStats = maxModLevelIndex ? modLevels[maxModLevelIndex].stats : [];
    maxModLevelStats = maxModLevelStats.map((stat, idx) => <div className="stat" key={idx}>{stat}</div>)

    return (
        <ModCard key={uniqueName} className={rarity.toLowerCase()}>
            <figure className='styled-figure' style={{ backgroundImage: 'url(' + CDNBase + imageName + ')' }}/>
            <h1>{name}</h1>
            {maxModLevelStats}
            <FusionLevels fusionLimit={fusionLimit}/>
        </ModCard>
    )
}

export default Mods;