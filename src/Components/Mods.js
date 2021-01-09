import { CDNBase } from './utils';
import { ModCard, StyledFusionLevels } from './ModStyles';

const React = require('react');

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
    maxModLevelStats = maxModLevelStats.map((stat) => <div class="stat">{stat}</div>)

    return (
        <ModCard key={props.uniqueName} className={props.rarity.toLowerCase()}>
            <figure style={figureStyle}></figure>
            <h1>{props.name}</h1>
            {maxModLevelStats}
            <FusionLevels fusionLimit={props.fusionLimit}/>
        </ModCard>
    )
}

export default Mod;