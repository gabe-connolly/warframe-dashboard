import styled from "styled-components";

const Items = require('warframe-items')
const CDNBase = 'https://cdn.warframestat.us/img/';
const archwings = new Items({category: ['Archwing']});

const DetailCard = styled.div`
    border: 1px solid #CCC;
    padding: 1.5em;
    margin: 0 0 1em 0;
`;

const Ability = (props) => {
    return (
        <div key={props.name}>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </div>
    )
}

const Abilities = (props) => {
    const list = props.abilities.map((ability) => {
        return <Ability key={ability.name} {...ability} />
    })

    return list;
}

const Archwing = (props) => {
    return (
        <DetailCard>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <img alt="" src={CDNBase + props.imageName}/>
            <Abilities abilities={props.abilities} />
        </DetailCard>
    )
}

const ArchwingsList = () => {
    const list = [...archwings]
    return list.map(archwing => <Archwing key={archwing.name} {...archwing}/>)
}

export default ArchwingsList;
