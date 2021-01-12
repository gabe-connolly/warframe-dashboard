/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
import './index.css';
import { itemCategories } from './Components/item-categories';
import Archwing  from './Components/Archwing';
import Arcane  from './Components/Arcanes';
import Fish  from './Components/Fish';
import GenericItem from './Components/GenericItem';
import ItemList from './Components/ItemList';
import Mods from './Components/Mods';
import Sentinel  from './Components/Sentinels';
import StyledFilters from './Components/StyledSubFilters';

const React = require('react');
const ReactDOM = require('react-dom');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      filters: {
        category: 'Mods',
        keyword: '',
        mods: {
          type: '',
          polarity: '',
          rarity: '',
        }
      },
      filterProps: {
        categories: itemCategories,
        mods: {
          type: [],
          polarity: [],
          rarity: [],
        }
      },
      filteredItems: [],
      jsonLoaded: false,
    }
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getItemsByCategory = this.getItemsByCategory.bind(this);
    this.setFilteredResults = this.setFilteredResults.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleModFilterChange = this.handleModFilterChange.bind(this);
  }

  getAllItems() {
    this.state.filterProps.categories.forEach(category => {
      this.getItemsByCategory(category)
    })

    this.setState({
      jsonLoaded: true,
    })
  }

  stripLineSeparatorTags(string) {
    const regex = /<LINE_SEPARATOR>/gi
    return string.replace(regex, '');
  }

  getItemsByCategory(category) {
    const dataFileUrl = `${window.location.href}/data/${category}.json`;
    fetch(dataFileUrl)
      .then(response => {
        return response.text();
      })
      .then(response => {
        response = this.stripLineSeparatorTags(response);
        
        if (category === 'Mods') {
          response = this.stripDamageTypeTags(response);
        }

        return JSON.parse(response);
      })
      .then(
        (response) => {
          switch (category) {
            case 'Mods':
              this.setModFilterProp(response, 'type');
              this.setModFilterProp(response, 'polarity');
              this.setModFilterProp(response, 'rarity');
              break;
            default:
              break;
          }

          this.setItems(category, response);
        }
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  stripDamageTypeTags(data) {
    const regex = /<DT_([a-z]*)>/gi
    return data.replace(regex, '');
  }

  setItems(category, data) {
    let items = {...this.state.items}
    items[category] = data;
    this.setState({
      items
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });

    this.setFilteredResults();
  }

  /**
   * Populate an array of properties than can be used to filter Mods.
   * 
   * @param {array} mods 
   * @param {string} propName 
   */
  setModFilterProp(mods, propName) {
    this.setState( (currentState) => {
      let propsList = [];
      mods.forEach(mod => {
        propsList.push(mod[propName])
      });

      // Create a new array with only unique values
      propsList = [...new Set(propsList)];
      
      currentState.filterProps.mods[propName] = propsList;
      return currentState
    })
  }

  componentDidMount() {
    if (!this.state.jsonLoaded) {
      this.getAllItems();
    }
  }

  deDupeItems(items) {
    let uniqueItems = [];
    let deDupedItems = [];
    items.forEach((item) => {
        if (!uniqueItems.includes(item.name)) {
            uniqueItems.push(item.name);
            deDupedItems.push(item);
        }
    })
    return deDupedItems;
  }

  setFilteredResults() {
    this.setState( (currentState) => {
      const category = currentState.filters.category;
      const keyword = currentState.filters.keyword;
      const filterPolarity = currentState.filters.mods.polarity;
      const filteredModtype = currentState.filters.mods.type;
      const filteredRarity = currentState.filters.mods.rarity;

      if (!category) {
        currentState.filteredItems = []
        return currentState;
      }

      let items = currentState.items[category];
      items = this.deDupeItems(items);

      if (keyword) {
          items = items.filter(item => {
              return item.name.toLowerCase().includes(keyword.toLowerCase())
          })
      }

      if (category === 'Mods') {
        if (filterPolarity) {
          items = items.filter(item => {
            return item.polarity === filterPolarity
          })
        }

        if (filteredModtype) {
          items = items.filter(item => {
            return item.type === filteredModtype
          })
        }

        if (filteredRarity) {
          items = items.filter(item => {
            return item.rarity === filteredRarity
          })
        }
      }

      currentState.filteredItems = items;

      return currentState;
    })
  };

  render() {
    const filterProps = this.state.filterProps;
    const filters = this.state.filters;
    const keyword = filters.keyword;
    const filterCategory = filters.category;
    const categoryOptions = itemCategories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })

    let subFilters;
    if (filters.category === 'Mods') {
      subFilters = (
        <StyledFilters>
          <label>Filter mods by:</label>
          <PolaritiesFilter
            value={filters.mods.polarity}
            options={filterProps.mods.polarity}
            onChange={this.handleModFilterChange('polarity')}/>
          <ModTypesFilter
            value={filters.mods.type}
            options={filterProps.mods.type}
            onChange={this.handleModFilterChange('type')}/>
          <ModRarityFilter
            value={filters.mods.rarity}
            options={filterProps.mods.rarity}
            onChange={this.handleModFilterChange('rarity')}/>
      </StyledFilters>
      )
    }

    return (
      <main>
        <StyledFilters>
            <input type="text" name="keyword" value={keyword} onChange={this.handleFilterChange('keyword')}/>
            <select name="category" value={filterCategory} onChange={this.handleFilterChange('category')}>
              <option value=''>-- Category --</option>
              {categoryOptions}
            </select>
        </StyledFilters>

        {subFilters}

        <div>
          <SearchResults
            className="clearfix"
            category={filterCategory}
            keyword={keyword}
            items={this.state.filteredItems}/>
        </div>
      </main>
    )
  }

  handleModFilterChange = filterType => (event) => {
    let filters = this.state.filters;
    filters.mods[filterType] = event.target.value;
    this.setState({
      filters
    });

    this.setFilteredResults();
  }

  handleFilterChange = filterType => (event) => {
    let filters = this.state.filters;
    filters[filterType] = event.target.value;
    this.setState({
      filters
    });

    this.setFilteredResults();
  }
}

const ModTypesFilter = (props) => {
  const options = props.options.map((type) => {
    return <option key={type} value={type}>{type}</option>;
  });
  return (
    <select name="modTypeFilter" value={props.value} onChange={props.onChange}>
      <option key="default" value="">-- Type --</option>;
      {options}
    </select>
  )
}


const ModRarityFilter = (props) => {
  const options = props.options.map((rarity) => {
    return <option key={rarity} value={rarity}>{rarity}</option>;
  });
  return (
    <select name="modRarityFilter" value={props.value} onChange={props.onChange}>
      <option key="default" value="">-- Rarity --</option>;
      {options}
    </select>
  )
}

const PolaritiesFilter = (props) => {
  const options = props.options.map((polarity) => {
    return <option key={polarity} value={polarity}>{polarity}</option>;
  });
  return (
    <select name="polarityFilter" value={props.value} onChange={props.onChange}>
      <option key="default" value="">-- Polarity --</option>;
      {options}
    </select>
  )
}

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

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
