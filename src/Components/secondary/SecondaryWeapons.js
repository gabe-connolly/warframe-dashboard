import { CDNBase } from '../utils';
import { ItemCard } from '../ItemCard';
import StyledImage from '../StyledImage';
import StyledItemList from '../StyledItemList';
import StyledFilters from '../StyledSubFilters';
import * as itemDataController from '../../controllers/itemDataController';

const SecondaryWeapons = ({category}) => {
    const items = itemDataController.useItemsData(category);

    return (
        <>
        <StyledFilters>
            <WeaponTypeFilter options={getWeaponFilterOptions(items, 'type')}/>
            <WeaponNoiseFilter options={getWeaponFilterOptions(items, 'noise')}/>
            <WeaponMasterRankFilter options={getWeaponFilterOptions(items, 'masteryReq')}/>
        </StyledFilters>

        <StyledItemList>
            {itemDataController.listItems(items, SecondaryWeaponCard)}
        </StyledItemList>
        </>
    )
}

const WeaponTypeFilter = ({options}) => {
    return (
        <select>
            <option value=''>-- Weapon type --</option>
            <WeaponFilter filters={options}/>
        </select>
    )
}

const WeaponMasterRankFilter = ({options}) => {
    return (
        <select>
            <option value=''>-- Mastery Rank Required --</option>
            <WeaponFilter filters={options}/>
        </select>
    )
}

const WeaponNoiseFilter = ({options}) => {
    return (
        <select>
            <option value=''>-- Noise level --</option>
            <WeaponFilter filters={options}/>
        </select>
    )
}

const WeaponFilter = ({filters}) => {
    return filters.map(filter => {
        return (
            <option key={filter} value={filter}>{filter}</option>
        )
    })
}

const getWeaponFilterOptions = (weapons, property) => {
    let options = new Set();
    weapons.forEach(weapon => {
        options.add(weapon[property])
    })

    if (property === 'masteryReq') {
        return [...options].sort((a, b) => {
            return Number(a) - Number(b)
        })
    }

    return [...options].sort();
}

const SecondaryWeaponCard = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default SecondaryWeapons;
