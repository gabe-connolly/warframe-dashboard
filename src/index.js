/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
import { itemCategories } from './Components/item-categories';
import { ItemCard } from './Components/item-card';
import ArchwingsList  from './Components/archwing';
import FishList  from './Components/fish';

const React = require('react');
const ReactDOM = require('react-dom');

class SearchResults extends React.Component {
  render() {
    const filterText = this.props.filterText;

    if (!this.props.filterText && !this.props.filterCategory) {
      return null;
    }

    let results;
    switch (this.props.filterCategory) {
      case 'Fish':
        results = <FishList key="FishList" filterText={filterText}/>
        break;
      case 'Archwing':
        results = <ArchwingsList key="ArchwingsList" filterText={filterText}/>
        break;
      default:
        results = <p>No results found for {this.props.filterCategory}</p>
        break;
    }

    return (
      <ItemCard>
        {results}
      </ItemCard>
    )
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterCategory: '',
      filterText: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
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
    const categoryOptions = itemCategories.map(category => {
      return <option key={category} value={category}>{category}</option>
    })
  
    return (
      <div>
        <ItemCard>
          <input type="text" name="filterText" value={this.state.filterText} onChange={this.handleInputChange}/>
          <select name="filterCategory" value={this.state.filterCategory} onChange={this.handleInputChange}>
            {categoryOptions}
          </select>
        </ItemCard>
        <SearchResults filterCategory={this.state.filterCategory} filterText={this.state.filterText}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
