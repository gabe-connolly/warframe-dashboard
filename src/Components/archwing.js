import CDNBase from "./utils";
import styled from "styled-components";
import ItemCard from "./item-card";
import StyledImage from "./styled-image";

const React = require('react');
const Items = require('warframe-items')

const StyledAbility = styled.div`
    border: 1px solid #7F7A82;
    border-left:4px solid;
    border-radius:4px;
    background: #28282A;
    margin: 0 0 1em;
    padding: 1em;

    h2 {
        margin: 0;
    }
`

const Ability = (props) => {
    return (
        <StyledAbility key={props.name}>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </StyledAbility>
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
        <ItemCard>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <h3>Abilities</h3>
            <Abilities abilities={props.abilities} />
        </ItemCard>
    )
}

class ArchwingsList extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const archwings = new Items({category: ['Archwing']});
        let list = [...archwings]
        if (filterText) {
            list = list.filter(item => {
                return item.name.toLowerCase().includes(filterText)
            })
        }
        return list.map(archwing => <Archwing key={archwing.name} {...archwing}/>)
    }
}

export default ArchwingsList;
