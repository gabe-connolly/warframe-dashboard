import styled from 'styled-components';

export const ItemCard = styled.li`
    background: #070713;
    border: 1px solid #B5924E;
    border-bottom: 10px solid #F1E9B3;
    border-radius: 5px;
    box-shadow: inset 0 0 100px rgba(199,178,110,0.3);
    color: #F8F5CB;
    margin: 10px;
    max-width: 256px;
    overflow:hidden;
    position: relative;
    text-align: center;

    h1 {
        padding: 0 0.5em;
    }

    p {
        padding: 1em;
    }
`;

export default ItemCard;
