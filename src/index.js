/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
import { render } from '@testing-library/react';
import ArchwingsList from './Components/archwing';
import FishList from './Components/fish';
import ItemCard from './Components/item-card';

// const Items = require('warframe-items')
const React = require('react');
const ReactDOM = require('react-dom');
const itemCategories = [
  'All',
  'Arcanes',
  'Archwing',
  'Arch-Gun',
  'Arch-Melee',
  'Corpus',
  'Enemy',
  'Fish',
  'Gear',
  'Glyphs',
  'Melee',
  'Misc',
  'Mods',
  'Pets',
  'Primary',
  'Quests',
  'Relics',
  'Resources',
  'Secondary',
  'Sentinels',
  'Skins',
  'Warframes'
]

const CategorySelectOptions = () => {
  const categoryOptions = itemCategories.map(category => {
    return <option key={category} value={category}>{category}</option>
  })

  return categoryOptions;
}

class ItemSearch extends React.Component {
  render() {
    return (
      <ItemCard>
        <input type="text" name="searchText" value={this.props.searchText} onChange={this.props.handleInputChange}/>
        <select name="searchCategory" value={this.props.searchCategory} onChange={this.props.handleInputChange}>
          <CategorySelectOptions/>
        </select>
      </ItemCard>
    )
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCategory: '',
      searchText: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return [
      <ItemSearch
        key="SearchBox"
        searchCategory={this.searchCategory}
        searchText={this.searchText}
        handleInputChange={this.handleInputChange}/>,
      //<FishList key="FishList"/>,
      //<ArchwingsList key="ArchwingsList" />
    ]
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
