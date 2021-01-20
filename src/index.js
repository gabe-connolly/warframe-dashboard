/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
import React from 'react';
import ReactDOM  from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './index.css';
import { itemCategories } from './Components/item-categories';

import ModTypesFilter from './Components/mods/ModTypesFilter';
import ModRarityFilter from './Components/mods/ModRarityFilter';
import StyledFilters from './Components/StyledSubFilters';
import PolaritiesFilter from './Components/mods/PolaritiesFilter';
import SearchResults from './Components/SearchResults';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      filters: {
        category: '',
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
    this.getItemsByCategory = this.getItemDataByCategory.bind(this);
    this.setFilteredResults = this.setFilteredResults.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleModFilterChange = this.handleModFilterChange.bind(this);
  }

  getAllItems() {
    this.state.filterProps.categories.forEach(category => {
      this.getItemDataByCategory(category)
    })

    this.setState({
      jsonLoaded: true,
    })
  }

  stripLineSeparatorTags(string) {
    const regex = /<LINE_SEPARATOR>/gi
    return string.replace(regex, '');
  }

  getItemDataByCategory(category) {
    const dataFileUrl = `${window.location.href}/data/${category}.json`;
    fetch(dataFileUrl)
      .then(response => {
        return response.text();
      })
      .then(response => {
        response = this.stripLineSeparatorTags(response);
        response = this.stripDamageTypeTags(response);
        return JSON.parse(response);
      })
      .then(
        (response) => {
          switch (category) {
            case 'Mods':
              this.setFilterProp('mods', response, 'type');
              this.setFilterProp('mods', response, 'polarity');
              this.setFilterProp('mods', response, 'rarity');
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
    this.setState( (currentState) => {
      currentState.items[category] = data;
      return currentState;
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
  setFilterProp(category, mods, propName) {
    this.setState( (currentState) => {
      let propsList = [];
      mods.forEach(mod => {
        propsList.push(mod[propName])
      });

      // Create a new array with only unique values
      propsList = [...new Set(propsList)];
      
      currentState.filterProps[category][propName] = propsList;
      return currentState
    })
  }

  componentDidMount() {
    if (!this.state.jsonLoaded) {
      this.getAllItems();
    }
  }

  /**
   * Some categories of item (e.g. Fish) have multiple entries for a single type of item to accomodate
   * for item size variations.  This would clutter up the search results, so there needs to be a method
   * for removing duplicate items.
   * 
   * @param {array} items 
   */
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

      let items = currentState.items[category];
      if (items === undefined) {
        currentState.filteredItems = [];
        return currentState;
      }

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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
