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
      category: '',
      filterText: '',
      items: {},
      filteredItems: [],
      jsonLoaded: false,
      modPolarities: [],
      modRarities: [],
      modTypes: [],
      modTypeFilter: '',
      polarityFilter: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getItemsByCategory = this.getItemsByCategory.bind(this);
    this.setFilteredResults = this.setFilteredResults.bind(this);
    this.updateState = this.updateState.bind(this);
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
    if (this.state.modPolarities.includes(polarity)) {
      return;
    }

    let polarities = [...this.state.modPolarities];
    polarities.push(polarity);
    this.setState({
      modPolarities: polarities
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
      currentState.modTypes = modTypes;
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
      let items = currentState.items[currentState.category];
      items = this.deDupeItems(items);
      const filterText = currentState.filterText;
      const filterPolarity = currentState.polarityFilter;

      if (filterText) {
          items = items.filter(item => {
              return item.name.toLowerCase().includes(filterText)
          })
      }

      if (currentState.category === 'Mods' && filterPolarity) {
        items = items.filter(item => {
          return item.polarity === filterPolarity
        })
      }

      currentState.filteredItems = items;

      return currentState;
    })
  };

  render() {
    const categoryOptions = itemCategories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })

    let subFilters;
    if (this.state.category === 'Mods') {
      subFilters = <SubFilters
      modTypes={this.state.modTypes}
      modTypeFilter={this.state.modTypeFilter}
      modPolarities={this.state.modPolarities}
      polarityFilter={this.state.polarityFilter}
      onChange={this.handleInputChange}
      />
    }

    return (
      <main>
        <StyledFilters>
            <input type="text" name="filterText" value={this.state.filterText} onChange={this.handleInputChange}/>
            <select name="category" value={this.state.category} onChange={this.handleInputChange}>
              {categoryOptions}
            </select>
        </StyledFilters>
        {subFilters}
        <div>
          <SearchResults
            className="clearfix"
            category={this.state.category}
            filterText={this.state.filterText}
            items={this.state.filteredItems}/>
        </div>
      </main>
    )
  }
}

const SubFilters = (props) => {
  return (
      <ModFilters
        polarityFilter={props.polarityFilter}
        modTypes={props.modTypes}
        modTypeFilter={props.modTypeFilter}
        modPolarities={props.modPolarities}
        onChange={props.onChange}
      />
  )
}

const ModFilters = (props) => {
  return (
    <StyledFilters>
      <label>Filter mods by:</label>
      <PolaritiesFilter
        polarityFilter={props.polarityFilter}
        modPolarities={props.modPolarities}
        onChange={props.onChange}/>
      <ModTypesFilter
        modTypes={props.modTypes}
        modTypeFilter={props.modTypeFilter}
        onChange={props.onChange}/>
    </StyledFilters>
  )
}

const ModTypesFilter = (props) => {
  const options = props.modTypes.map((type) => {
    return <option key={type} value={type}>{type}</option>;
  });
  return (
    <select name="modTypeFilter" value={props.modTypeFilter} onChange={props.onChange}>
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
    <select name="polarityFilter" value={props.polarityFilter} onChange={props.onChange}>
      <option key="default" value="">-- Polarity --</option>;
      {options}
    </select>
  )
}

class SearchResults extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const category = this.props.category;

    if (!filterText && !category) {
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
      <ItemList key='ResultList' filterText={filterText} items={items} itemSingleComponent={ItemComponent} />
    )
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
