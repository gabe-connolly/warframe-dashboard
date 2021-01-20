import React from 'react';

import Archwing  from './Archwing';
import Arcane  from './Arcanes';
import Fish  from './Fish';
import GenericItem from './GenericItem';
import ItemList from './ItemList';
import Mods from './mods/Mods';
import Sentinel  from './Sentinels';

class SearchResults extends React.Component {
    render() {
      const keyword = this.props.keyword;
      const category = this.props.category;
  
      if (!keyword && !category) {
        return null;
      }
  
      const Components = {
        Archwing,
        'Arcanes': Arcane,
        Fish,
        'Mods': Mods,
        'Sentinels': Sentinel,
      }
  
      const ItemComponent = Components[category] !== undefined ? Components[category] : GenericItem;
      const items = this.props.items;
    
      return (
        <ItemList key='ResultList' keyword={keyword} items={items} itemSingleComponent={ItemComponent} />
      )
    }
}

export default SearchResults;
