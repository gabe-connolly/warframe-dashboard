import styled from 'styled-components';

export const ItemCard = styled.li`
    background: #070713;
    border-radius: 5px;
    border: 1px solid #B5924E;
    border-bottom: 10px solid #F1E9B3;
    box-shadow: inset 0 0 100px rgba(199,178,110,0.3);
    color: #F8F5CB;
    position: relative;
    text-align: center;
    overflow:hidden;
    max-width: 256px;
    margin: 10px;

    h1 {
        padding: 0 0.5em;
    }
`;

export default ItemCard;
