import React from 'react';
import styled from 'styled-components';

const StyledItemList = styled.ul`
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;
    justify-content: center;
`

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
