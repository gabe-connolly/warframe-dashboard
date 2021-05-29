import styled from 'styled-components';

export function ResultsCount(props) {
    return (
        <span>Found {props.count} results</span>
    )
}

const LoadingSpinner = styled.span`
    background: url('/warframe-dashboard/img/loading-gear.gif') left center no-repeat;
    background-size: auto 100%;
    padding-left: 30px;
`

export function LoadingIndicator() {
    return (
        <LoadingSpinner>
            Loading...
        </LoadingSpinner>
    )
}
