/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
import ArchwingsList from './Components/archwing';
import FishList from './Components/fish';

// const Items = require('warframe-items')
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  [<FishList key="FishList"/>, <ArchwingsList key="ArchwingsList" />],
  document.getElementById('root')
);
