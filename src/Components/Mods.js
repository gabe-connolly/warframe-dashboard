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

    const modeLevels = props.levelStats;
    const maxedPerk = modeLevels !== undefined ? console.log(modeLevels) : '';

    return (
        <ModCard key={props.uniqueName} className={props.rarity.toLowerCase()}>
            <figure style={figureStyle}></figure>
            <h1>{props.name}</h1>
            {maxedPerk}
            <FusionLevels fusionLimit={props.fusionLimit}/>
        </ModCard>
    )
}

export default Mod;