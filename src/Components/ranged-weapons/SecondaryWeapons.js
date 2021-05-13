import React from 'react';
import { ItemFigure } from '../GenericItem';
import { ItemCard } from '../ItemCard';
import RangedWeapons from './RangedWeapons';

const SecondaryWeapons = ({category}) => {
    return <RangedWeapons category={category} component={SecondaryWeapon}/>
}

const SecondaryWeapon = ({description, imageName, name}) => {
    return (
        <ItemCard>
            <ItemFigure imageName={imageName}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </ItemCard>
    )
}

export default SecondaryWeapons;
