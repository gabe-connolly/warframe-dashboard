const CDNBase = 'https://cdn.warframestat.us/img/';

const validItemsList = (items, category) => {
    return items.length && items[0].category.toLowerCase() === category;
}

export { CDNBase, validItemsList };


