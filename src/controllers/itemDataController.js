import axios from 'axios';
import React, {useEffect, useState} from 'react';

export const CDNBase = 'https://cdn.warframestat.us/img/';

/**
 * Some categories of item (e.g. Fish) have multiple entries for a single type of item to accomodate
 * for item size variations.  This would clutter up the search results, so there needs to be a method
 * for removing duplicate items.
 *
 * @param {array} items
 */
function deDupeItems(items) {
    let deDupedItems = {};
    // TODO: Change from an array search to a hashmap.
    items.forEach((item) => {
        if (!deDupeItems.hasOwnProperty(item.name)) {
            deDupedItems[item.name] = item;
        }
    })
    return Object.values(deDupedItems);
}

export function listItems(items, componentName, itemKey = 'uniqueName') {
    if (!items) {
        return [];
    }

    return items.map(item => {
        const Component = componentName;
        return (
            <Component key={item[itemKey]} {...item}/>
        )
    })
}

export function stripPhTag(string) {
    return string.replace(/\[Ph\]/gi, '');
}

export function stripLineSeparatorTags(string) {
    const regex = /<LINE_SEPARATOR>/gi
    return string.replace(regex, '');
}

export function filterItemsByProp(items, propName, targetValue) {
    return items.filter(item => {
        switch (typeof item[propName]) {
            case 'string':
                return item[propName].toLowerCase() === targetValue.toLowerCase();
            case 'number':
                return item[propName] === targetValue;
            default:
                return false;
        }
    })
}

export function filterItemsByKeyword(items, keyword) {
    return items.filter(item => {
        return item.name.toLowerCase().includes(keyword.toLowerCase());
    })
}

/**
 * Populate an array of properties than can be used to filter Mods.
 *
 * @param {array} mods
 * @param {string} propName
 */
export function getFilterProps(items, propName) {
    if (!items || !items.length) {
        return [];
    }

    let propsList = new Set();

    items.forEach(item => {
        switch(typeof item[propName]) {
            case 'string':
                if (item[propName].length) {
                    propsList.add(item[propName])
                }
                break;
            default:
                propsList.add(item[propName])
                break;
        }
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

function scrubItemData(items) {
    let scrubbedItems = {};
    items.forEach((item) => {
        if (!item.name.match(/\/Lotus\/Language\//gi)) {
            scrubbedItems[item.name] = item;
        }
    })
    return Object.values(scrubbedItems);

}

export function useItemsData(category, processingFunctions = []) {

    const [itemCount, setItemCount] = useState(0);
    const [items, setItems] = useState([]);
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
                    itemData = stripPhTag(itemData);
                    itemData = JSON.parse(itemData);
                    itemData = deDupeItems(itemData);
                    itemData = scrubItemData(itemData);

                    if (processingFunctions) {
                        processingFunctions.forEach(fn => {
                            itemData = fn(itemData)
                        })
                    }

                    setItems(itemData);
                    setItemCount(itemData.length);
                }
            })

            return () => { isMounted = false };
    }, [itemCount]);

    return items;
}

export function validItemsList(items, category) {
    return items.length && items[0].category.toLowerCase() === category;
}
