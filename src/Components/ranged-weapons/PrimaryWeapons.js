import React from 'react';
import { ItemFigure } from '../GenericItem';
import { ItemCard } from '../ItemCard';
import RangedWeapons from './RangedWeapons';

const PrimaryWeapons = ({category}) => {
    return <RangedWeapons category={category} component={PrimaryWeapon}/>
}

const PrimaryWeapon = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default PrimaryWeapons;
