import CDNBase from "./utils";
import ItemCard from "./item-card";
import StyledImage from "./styled-image";
import Items from "warframe-items";

const fishItems = new Items({category: ['Fish']});

const Fish = (props) => {
    return (
        <ItemCard>
            <h1>{props.name}</h1>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <p>{props.description}</p>
        </ItemCard>
    )
}

const FishList = () => {
    let uniqueFishNames = [];
    let deDupedFish = [];
    const fish = [...fishItems]
    fish.forEach((fish) => {
        if (!uniqueFishNames.includes(fish.name)) {
            uniqueFishNames.push(fish.name);
            deDupedFish.push(fish);
        }
    })
    return deDupedFish.map(fish => <Fish key={fish.uniqueName} {...fish}/>)
}

export default FishList;
