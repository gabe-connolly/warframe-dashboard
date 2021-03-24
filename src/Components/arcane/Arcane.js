import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { CDNBase } from '../utils';
import { ItemMain, ItemCard } from '../ItemCard';
import ArcaneRank from './ArcaneRank';
import StyledImage from '../StyledImage';
import StyledItemList from '../StyledItemList';
import * as itemDataController from '../../controllers/itemDataController';

function Arcanes() {
    let [itemCount, setItemCount] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:3000/warframe-dashboard/data/Arcanes.json`)
            .then(response => {
                if (isMounted) {
                    setItems(response.data);
                    setItemCount(response.data.length);
                }
            })

        return () => { isMounted = false };
    }, [itemCount]);

    return (
        <StyledItemList>
            {
                items.map(item => <ArcaneCard key={item.uniqueName} {...item}/>)
            }
        </StyledItemList>
    )
}

const ArcaneCard = ({levelStats, imageName, name}) => {
    if (name === 'Arcane') {
        return null;
    }

    return (
        <ItemCard>
            <StyledImage alt="" src={CDNBase + imageName}/>
            <ItemMain>
                <h1>{name}</h1>
                <div className="item-details">
                    <Ranks ranks={levelStats} />
                </div>
            </ItemMain>
        </ItemCard>
    )
}

const Ranks = ({ranks}) => {
    if (ranks === undefined) {
        return null;
    }

    const levels = Array.isArray(Object.entries(ranks)) ? Object.entries(ranks) : [];
    const rankDetails = levels.map((level, idx) => {
        return <ArcaneRank key={idx} {...level} />
    })

    return rankDetails
}

export default Arcanes;
