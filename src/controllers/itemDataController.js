import axios from 'axios';
import React, {useEffect, useState} from 'react';

/**
 * Some categories of item (e.g. Fish) have multiple entries for a single type of item to accomodate
 * for item size variations.  This would clutter up the search results, so there needs to be a method
 * for removing duplicate items.
 *
 * @param {array} items
 */
export function deDupeItems(items) {
    let uniqueItems = [];
    let deDupedItems = [];
    // TODO: Change from an array search to a hashmap.
    items.forEach((item) => {
        if (!uniqueItems.includes(item.name)) {
            uniqueItems.push(item.name);
            deDupedItems.push(item);
        }
    })
    return deDupedItems;
}

export function listItems(items, componentName, itemKey = 'uniqueName') {
    return items.map(item => {
        const Component = componentName;
        return (
            <Component key={item[itemKey]} {...item}/>
        )
    })
}

export function stripLineSeparatorTags(string) {
    const regex = /<LINE_SEPARATOR>/gi
    return string.replace(regex, '');
}

/**
 * Populate an array of properties than can be used to filter Mods.
 *
 * @param {array} mods
 * @param {string} propName
 */
export function getFilterProps(items, propName) {
    let propsList = new Set();
    items.forEach(mod => {
        propsList.add(mod[propName])
    });

    return [...propsList].sort();
}

export async function getItemDataByCategory(category) {
    const dataFileUrl = `${window.location.href}/data/${category}.json`;
    axios.get(dataFileUrl)
        .then(response => {
            return response.text();
        })
        .then(response => {
            response = stripLineSeparatorTags(response);
            response = stripDamageTypeTags(response);
            return JSON.parse(response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function stripDamageTypeTags(data) {
    const regex = /<DT_([a-z]*)>/gi
    return data.replace(regex, '');
}


export function useItemsData(category) {
    let [itemCount, setItemCount] = useState(0);
    const [items, setItems] = useState([]);

    // Can't perform a React state update on an unmounted component
    // https://stackoverflow.com/a/60907638
    useEffect(() => {
        if (!category) {
            return;
        }

        let isMounted = true;
        axios.get(`/warframe-dashboard/data/${category}.json`)
            .then(response => {
                if (isMounted) {
                    let itemData = JSON.stringify(response.data);
                    itemData = stripDamageTypeTags(itemData);
                    itemData = stripLineSeparatorTags(itemData);
                    itemData = JSON.parse(itemData);
                    setItems(itemData);
                    setItemCount(itemData.length);
                }
            })

            return () => { isMounted = false };
    }, [itemCount, category]);

    return items;
}