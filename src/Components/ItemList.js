import React from 'react';


class ItemList extends React.Component {
    render() {
        const ComponentName = this.props.itemType;
        return this.props.items.map(item => <ComponentName key={item.name} {...item}/>)
    }
}

export default ItemList;