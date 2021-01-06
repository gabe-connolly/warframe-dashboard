import React from 'react';
import styled from 'styled-components';

const StyledItemList = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    justify-content: flex-start;
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
