/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
 import React, {useState} from 'react';
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

const CategoryOptions = () => {
  return (
    <>
    <option value=''>-- Category --</option>
    {
      itemCategories.map(itemCategory => {
        return <option key={itemCategory} value={itemCategory}>{itemCategory}</option>
      })
    }
    </>
  )
}

const App = () => {
  const [category, setCategory] = useState('');

  return (
    <Router basename="/warframe-dashboard">
      <main>
        <StyledFilters>
            <label htmlFor="category">Select an item category</label>
            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <CategoryOptions/>
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
