import { CDNBase } from '../utils';
import { ModCard, StyledFusionLevels } from './ModStyles';
import ModFilters from './ModFilters';
import StyledItemList from '../StyledItemList';

const React = require('react');

const Mods = (props) => {
    return (
        <>
        <ModFilters filters={props.filters} filterProps={props.filterProps} handleModFilterChange={props.handleModFilterChange}/>
        <StyledItemList>
            {
                props.items.map(item => <Mod key={item.name} {...item}/>)
            }
        </StyledItemList>
        </>
    )
}

const Mod = (props) => {
    if (props.category.toLowerCase() !== 'mods') {
        return null;
    }

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