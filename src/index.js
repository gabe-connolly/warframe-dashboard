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
        category: '',
        keyword: '',
        mods: {
          type: '',
          polarity: '',
        }
      },
      filterProps: {
        mods: {
          types: [],
          polarities: [],
          rarities: [],
        }
      },
      filteredItems: [],
      jsonLoaded: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getItemsByCategory = this.getItemsByCategory.bind(this);
    this.setFilteredResults = this.setFilteredResults.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  getAllItems() {
    itemCategories.forEach(category => {
      if (category.toLowerCase() !== 'all') {
        this.getItemsByCategory(category)
      }
    })

    this.setState({
      jsonLoaded: true,
    })
  }

  getItemsByCategory(category) {
    const dataFileUrl = `${window.location.href}/data/${category}.json`;
    fetch(dataFileUrl)
      .then(response => {
        try {
          const parsedJson = response.json();
          if (parsedJson && typeof parsedJson === 'object') {
            return parsedJson;
          }
        } catch (e) {
          console.log(e);
        }
      })
      .then(
        (response) => {
          this.setItems(category, response);

          if (category === 'Mods') {
            response.forEach((mod) => {
              this.setModPolarity(mod.polarity);
              this.setModTypes(mod.type);
            })
          }
        }
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  setItems(category, data) {
    let items = {...this.state.items}
    items[category] = data;
    this.setState({
      items
    })
  }

  setModPolarity(polarity) {
    // Make sure we don't create duplicates in the mod polarities array.
    if (this.state.filterProps.mods.polarities.includes(polarity)) {
      return;
    }

    let polarities = [...this.state.filterProps.mods.polarities];
    polarities.push(polarity);

    this.setState({
      filterProps: {
        mods: {
          polarities
        }
      }
    })
  }

  updateState(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });

    this.setFilteredResults();
  }

  handleInputChange(event) {
    this.updateState(event);
  }

  // TODO: setModPolarities and setModTypes are too similar.  Keep it DRY by abstracting their logic to a helper method.
  setModPolarities() {
    this.setState( (currentState) => {
      let modPolarities = [];
      currentState.items['Mods'].forEach(mod => {
        modPolarities.push(mod.polarity)
      });
      currentState.modPolarities = modPolarities;
      return currentState
    })
  }

  setModTypes() {
    this.setState( (currentState) => {
      let modTypes = [];
      currentState.items['Mods'].forEach(mod => {
        if (!modTypes.includes(mod.type)) {
          modTypes.push(mod.type)
        }
      });
      currentState.filterProps.mods.types = modTypes;
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

      let items = currentState.items[category];
      items = this.deDupeItems(items);

      if (keyword) {
          items = items.filter(item => {
              return item.name.toLowerCase().includes(keyword)
          })
      }

      if (category === 'Mods' && filterPolarity) {
        items = items.filter(item => {
          return item.polarity === filterPolarity
        })
      }

      currentState.filteredItems = items;

      return currentState;
    })
  };

  render() {
    const filterProps = this.state.filterProps;
    const filters = this.state.filters;
    const categoryOptions = itemCategories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })

    let subFilters;
    if (filters.category === 'Mods') {
      subFilters = <ModFilters
      modTypes={filterProps.mods.types}
      modPolarities={filterProps.mods.polarities}
      modTypeFilter={filters.mods.type}
      polarityFilter={filters.mods.polarity}
      onChange={this.handleFilterChange}
      />
    }

    const keyword = this.state.filters.keyword;
    const filterCategory = this.state.filters.category;

    return (
      <main>
        <StyledFilters>
            <input type="text" name="keyword" value={keyword} onChange={this.handleFilterChange('keyword')}/>
            <select name="category" value={filterCategory} onChange={this.handleFilterChange('category')}>
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

  handleFilterChange = filterType => (event) => {
    let filters = this.state.filters;
    filters[filterType] = event.target.value;
    this.setState({
      filters
    });

    this.setFilteredResults();
  }
}

const ModFilters = (props) => {
  return (
    <StyledFilters>
      <label>Filter mods by:</label>
      <PolaritiesFilter
        polarityFilter={props.polarityFilter}
        modPolarities={props.modPolarities}
        handleFilterChange={props.onChange}/>
      <ModTypesFilter
        modTypes={props.modTypes}
        modTypeFilter={props.modTypeFilter}
        handleFilterChange={props.onChange}/>
    </StyledFilters>
  )
}

const ModTypesFilter = (props) => {
  const options = props.modTypes.map((type) => {
    return <option key={type} value={type}>{type}</option>;
  });
  return (
    <select name="modTypeFilter" value={props.modTypeFilter} onChange={props.handleFilterChange('mods.type')}>
      <option key="default" value="">-- Type --</option>;
      {options}
    </select>
  )
}

const PolaritiesFilter = (props) => {
  const options = props.modPolarities.map((polarity) => {
    return <option key={polarity} value={polarity}>{polarity}</option>;
  });
  return (
    <select name="polarityFilter" value={props.polarityFilter} onChange={props.handleFilterChange}>
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
