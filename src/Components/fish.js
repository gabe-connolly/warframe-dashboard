import { CDNBase } from './utils';
import ItemCard from './ItemCard';
import StyledImage from './StyledImage';

const React = require('react');

class FishList extends React.Component {
    render() {
        const items = [...this.props.items];
        return items.map(fish => <Fish key={fish.uniqueName} {...fish}/>)
    }
}

const Fish = (props) => {
    return (
        <ItemCard>
            <h1>{props.name}</h1>
            <StyledImage alt="" src={CDNBase + props.imageName}/>
            <p>{props.description}</p>
        </ItemCard>
    )
}

export default FishList;