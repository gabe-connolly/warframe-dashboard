import React from 'react';

class ItemList extends React.Component {
    render() {
        const ItemComponent = this.props.itemSingleComponent;
        return this.props.items.map(item => <ItemComponent key={item.name} {...item}/>)
    }
}

export default ItemList;
