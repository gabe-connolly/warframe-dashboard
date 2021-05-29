/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
 import React, {useEffect, useState} from 'react';
import ReactDOM  from 'react-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";


import './index.css';
import { itemCategories } from './Components/item-categories';
import StyledFilters from './Components/StyledSubFilters';
import { pages } from './controllers/pagesController';

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
      <Redirect to={category.toLowerCase()} />
      <StyledFilters>
          <label htmlFor="category">Select an item category</label>
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <CategoryOptions/>
          </select>

      </StyledFilters>

      <Switch>
        {
          pages.map((route) => {
            return <RouteWithSubRoutes {...route} key={category.toLowerCase()} category={category} />
          })
        }
      </Switch>
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
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} {...route} />
      )}
    />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
