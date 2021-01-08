import React from 'react';
import styled from 'styled-components';

const StyledItemList = styled.ul`
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;
    justify-content: center;
`

class ItemList extends React.Component {
    render() {
        const ItemComponent = this.props.itemSingleComponent;
        return (
            <StyledItemList>
                {
                    this.props.items.map(item => <ItemComponent key={item.name} {...item}/>)
                }
            </StyledItemList>
        )
    }
}

export default ItemList;
