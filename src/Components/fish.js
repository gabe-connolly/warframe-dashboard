import CDNBase from "./utils";
import ItemCard from "./item-card";
import StyledImage from "./styled-image";

const React = require('react');
const Items = require('warframe-items')

const Fish = (props) => {
    return (
        <ItemCard>
            <h1>{props.name}</h1>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <p>{props.description}</p>
        </ItemCard>
    )
}

class FishList extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const fishItems = new Items({category: ['Fish']});
        let uniqueFishNames = [];
        let deDupedFish = [];
        const fish = [...fishItems]
        fish.forEach((fish) => {
            if (!uniqueFishNames.includes(fish.name)) {
                uniqueFishNames.push(fish.name);
                deDupedFish.push(fish);
            }
        })
        
        if (filterText) {
            deDupedFish = deDupedFish.filter(item => {
                return item.name.toLowerCase().includes(filterText)
            })
        }

        return deDupedFish.map(fish => <Fish key={fish.uniqueName} {...fish}/>)
    }
}

export default FishList;
