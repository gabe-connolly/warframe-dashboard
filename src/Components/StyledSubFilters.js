import styled from 'styled-components';

const StyledFilters = styled.section`
    border: 1px solid #7F7A82;
    border-left:4px solid;
    border-radius:4px;
    background: #28282A;
    color: #FFF;
    margin: 10px;
    padding: 1em;

    button,
    input,
    select {
        border-radius: 10px;
        margin: 0 10px;
        padding: 0.5em 1em;
    }

    button {
        background-color: #F1E9B3;
        cursor: pointer;
    }
`

export default StyledFilters;
