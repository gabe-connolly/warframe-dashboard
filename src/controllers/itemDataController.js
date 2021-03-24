import axios from 'axios';

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
