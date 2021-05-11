import React from 'react';
import StyledItemList from 'StyledItemList';

const ItemList = ({itemSingleComponent: ItemComponent, items}) => {
    return (
        <StyledItemList>
            {
                items.map(item => <ItemComponent key={item.name} {...item}/>)
            }
        </StyledItemList>
    )
}

export default ItemList;
