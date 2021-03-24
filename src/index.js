/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
import React from 'react';
import ReactDOM  from 'react-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import './index.css';
import { itemCategories } from './Components/item-categories';
import StyledFilters from './Components/StyledSubFilters';
import Mods from './Components/mod/Mods';
import GenericItemsList from './Components/GenericItem';
import Archwings from './Components/archwing/Archwing';
import Arcanes from './Components/arcane/Arcane';
import Fish  from './Components/fish/Fish';
import Sentinels from './Components/sentinel/Sentinels';
import SecondaryWeapons from './Components/secondary/SecondaryWeapons';

const routes = [

  {
    'path': '/arcanes',
    'component': Arcanes,
  },
  /*
  {
    'path': '/archwing',
    'component': Archwings,
  },
  {
    'path': '/fish',
    'component': Fish,
  },
  */
  {
    'path': '/mods',
    'component': Mods,
  },
  /*
  {
    'path': '/secondary',
    'component': SecondaryWeapons,
  },
  {
    'path': '/sentinels',
    'component': Sentinels,
  },
  {
    'path': '/',
    'component': Homepage,
    'exact': true,
  },
  {
    'path': '/:generic',
    'component': GenericItemsList,
  }*/
]

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

    /*
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getItemsByCategory = this.getItemDataByCategory.bind(this);
    this.setFilteredResults = this.setFilteredResults.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleModFilterChange = this.handleModFilterChange.bind(this);
    */
  }

  getAllItems() {
    this.state.filterProps.categories.forEach(category => {
      this.getItemDataByCategory(category)
    })

    this.setState({
      jsonLoaded: true,
    })
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

  componentDidMount() {
    if (!this.state.jsonLoaded) {
      //this.getAllItems();
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

  render() {
    let {
      filteredItems,
      filterProps,
      filters,
    } = this.state;

    const {
      keyword,
      category,
    } = filters;

    const categoryOptions = itemCategories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })

    return (
      <Router basename="/warframe-dashboard">
        <main>
          <StyledFilters>
              <input type="text" name="keyword" value={keyword} onChange={this.handleFilterChange('keyword')}/>
              <select name="category" value={category} onChange={this.handleFilterChange('category')}>
                <option value=''>-- Category --</option>
                {categoryOptions}
              </select>
              <Redirect to={category.toLowerCase()} />
          </StyledFilters>

          <Switch>
            {
              routes.map((route) => {
                return <RouteWithSubRoutes {...route} key={category.toLowerCase()} />
              })
            }
          </Switch>
        </main>
      </Router>
    )
  }
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={
        props => {
          return (
            // pass the sub-routes down to keep nesting
            <route.component {...props} {...route} />
          )
        }
      }
    />
  )
}

function Homepage() {
  return (
    <>
      <h2>Homepage</h2>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
