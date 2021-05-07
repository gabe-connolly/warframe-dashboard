import React, {useEffect, useState} from 'react';
import { CDNBase } from '../utils';
import { ModCard, StyledFusionLevels } from './ModStyles';
import ModFilter from './ModFilter';
import StyledItemList from '../StyledItemList';
import * as itemDataController from '../../controllers/itemDataController';
import StyledFilters from '../StyledSubFilters';

function Mods({category}) {
    const [filteredItems, setFilteredItems] = useState([]);
    // Currently active filters
    const [polarityFilter, setPolarityFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [rarityFilter, setRarityFilter] = useState('');

    // Filter options
    const [polarityFilterOptions, setPolarityFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);
    const [rarityFilterOptions, setRarityFilterOptions] = useState([]);

    const deDupeMods = (mods) => {
        let deDupeMods = {};
        mods.forEach(mod => {
            const modLookupKey = `${mod.name}-fusion-levels-${mod.fusionLimit}`
            if (!deDupeMods.hasOwnProperty(modLookupKey)) {
                deDupeMods[modLookupKey] = mod;
            }
        })
        return Object.values(deDupeMods);
    }

    const resetFilters = () => {
        setPolarityFilter('');
        setTypeFilter('');
        setRarityFilter('');
    }

    const items = deDupeMods(itemDataController.useItemsData(category));

    useEffect(() => {
        const filterMods = () => {
            let filteredItems = [...items];
            if (polarityFilter) {
                filteredItems = filteredItems.filter(item => {
                    return item.polarity === polarityFilter
                })
            }

            if (typeFilter) {
                filteredItems = filteredItems.filter(item => {
                    return item.type === typeFilter
                })
            }

            if (rarityFilter) {
                filteredItems = filteredItems.filter(item => {
                    return item.rarity === rarityFilter
                })
            }

            setFilteredItems(filteredItems);
        }

        filterMods();
    }, [polarityFilter, typeFilter, rarityFilter, items]);

    useEffect(() => {
        const modPolarities = itemDataController.getFilterProps(items, 'polarity');
        setPolarityFilterOptions(modPolarities);
    }, [items])

    useEffect(() => {
        const modTypes = itemDataController.getFilterProps(items, 'type');
            setTypeFilterOptions(modTypes);
    }, [items])

    useEffect(() => {
        const modRarities = itemDataController.getFilterProps(items, 'rarity');
            setRarityFilterOptions(modRarities);
    }, [items])

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
                            key={filter.name}
                            defaultOption={filter.defaultOption}
                            name={filter.name}
                            onChange={filter.onChange}
                            options={filter.options}
                            value={filter.value}
                        />
                    )
                })
            }
            <button onClick={resetFilters}>Reset filters</button>
        </StyledFilters>

        <StyledItemList>
            <ModList items={filteredItems}/>
        </StyledItemList>
        </>
    )
}

const ModList = ({items}) => {
    return items.map(mod => {
        const modKey = `${mod.name}-limit-${mod.fusionLimit}`;
        return (
            <Mod key={modKey} {...mod}/>
        )
    })
}

const Mod = (props) => {
    const backgroundImageUrl = CDNBase + props.imageName;
    const figureStyle = {
        color: 'red',
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
    }

    const FusionLevels = (props) => {
        let fusionLimit = Array.apply(null, Array(props.fusionLimit));
        fusionLimit = fusionLimit.map((value, idx) => {
            return <li key={idx}></li>
        })

        return <StyledFusionLevels>{fusionLimit}</StyledFusionLevels>
    }

    const modLevels = props.levelStats;
    const maxModLevelIndex = modLevels !== undefined ? modLevels.length - 1 : false;
    let maxModLevelStats = maxModLevelIndex ? modLevels[maxModLevelIndex].stats : [];
    maxModLevelStats = maxModLevelStats.map((stat, idx) => <div className="stat" key={idx}>{stat}</div>)

    return (
        <ModCard key={props.uniqueName} className={props.rarity.toLowerCase()}>
            <figure style={figureStyle}></figure>
            <h1>{props.name}</h1>
            {maxModLevelStats}
            <FusionLevels fusionLimit={props.fusionLimit}/>
        </ModCard>
    )
}

export default Mods;