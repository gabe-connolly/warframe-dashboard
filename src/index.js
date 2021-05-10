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
import { routes } from './controllers/routesController';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      filters: {
        category: '',
      },
      filterProps: {
        categories: itemCategories,
      },
      jsonLoaded: false,
    }
  }

  handleFilterChange = filterType => (event) => {
    let filters = this.state.filters;
    filters[filterType] = event.target.value;
    this.setState({
      filters
    });
  }

  render() {
    let { filters } = this.state;
    const { category } = filters;

    const categoryOptions = itemCategories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })

    return (
      <Router basename="/warframe-dashboard">
        <main>
          <StyledFilters>
              <label for="category">Select an item category</label>
              <select name="category" value={category} onChange={this.handleFilterChange('category')}>
                <option value=''>-- Category --</option>
                {categoryOptions}
              </select>
              <Redirect to={category.toLowerCase()} />
          </StyledFilters>

          <Switch>
            {
              routes.map((route) => {
                return <RouteWithSubRoutes {...route} key={category.toLowerCase()} category={category} />
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
