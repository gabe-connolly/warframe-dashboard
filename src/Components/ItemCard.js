import styled from 'styled-components';

export const ItemCard = styled.li`
    h1 {
        padding: 0 0.5em;
        text-align: center;
    }

    p {
        padding: 1em;
    }

    box-shadow: inset 0 0 100px rgba(199,178,110,0.3);
    color: #F8F5CB;
    position: relative;
    overflow:hidden;
    max-width: 256px;
    background: #070713;
    border-radius: 5px;
    border: 1px solid #B5924E;
    border-bottom: 10px solid #F1E9B3;
    margin: 10px;
`;

export default ItemCard;
