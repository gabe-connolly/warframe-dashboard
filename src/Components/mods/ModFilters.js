import ModTypesFilter from './ModTypesFilter';
import ModRarityFilter from './ModRarityFilter';
import PolaritiesFilter from './PolaritiesFilter';
import StyledFilters from '../StyledSubFilters';

const ModFilters = ({filters, filterProps, handleModFilterChange}) => {
    return (
        <StyledFilters>
            <label>Filter mods by:</label>
            <PolaritiesFilter
            value={filters.polarity}
            options={filterProps.polarity}
            onChange={handleModFilterChange('polarity')}/>

            <ModTypesFilter
            value={filters.type}
            options={filterProps.type}
            onChange={handleModFilterChange('type')}/>

            <ModRarityFilter
            value={filters.rarity}
            options={filterProps.rarity}
            onChange={handleModFilterChange('rarity')}/>
        </StyledFilters>
    )
}

export default ModFilters;
