import styled from "styled-components";

const StyledArcanerank = styled.div`
    .rank-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .rank-outer {
        border: 2px solid #C7C5A8;
        height: 2em;
        transform: rotate(45deg);
        width: 2em;
        text-align: center;
    }
    
    .rank-inner {
        height: 2em;
        width: 2em;
        line-height: 2em;
        transform: rotate(-45deg);
    }

    .description {
        padding: 1em;
    }
`

const ArcaneRank = (props) => {
    const level = props[0];
    const levelDescription = props[1].stats[0];
    return (
        <StyledArcanerank>

            <div className="rank-container">
                <div className="rank-outer">
                    <div className="rank-inner">{level}</div>
                </div>
            
                <div className="description">
                    {levelDescription}
                </div>
            </div>
        </StyledArcanerank>
    )
}
export default ArcaneRank;