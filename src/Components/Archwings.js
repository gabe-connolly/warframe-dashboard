const Items = require('warframe-items')

const CDNBase = 'https://cdn.warframestat.us/img/';
const archwings = new Items({category: ['Archwing']});

const Archwing = (props) => {
    return (
        <div key={props.name} data-name={props.name}>
            {props.name}
            <img alt="" src={CDNBase + props.imageName}/>
        </div>
    )
}

const ArchwingsList = () => {
    const list = [...archwings]
    return list.map(archwing => <Archwing {...archwing}/>)
}

export default ArchwingsList;
