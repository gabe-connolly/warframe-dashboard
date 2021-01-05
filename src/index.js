/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD
 * https://github.com/WFCD/warframe-items
 */
import { itemCategories } from './Components/item-categories';
import ItemCard from './Components/ItemCard';
import ArchwingList  from './Components/Archwing';
import ArcanesList  from './Components/Arcanes';
import FishList  from './Components/Fish';

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
    console.log()
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
          let items = {...this.state.items}
          items[category] = response;
          this.setState({
            items
          })
        }
      )
      .catch((error) => {
        console.error('Error:', error);
      });
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
      if (filterText) {
          items = items.filter(item => {
              return item.name.toLowerCase().includes(filterText)
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

    return (
      <div>
        <ItemCard>
          <input type="text" name="filterText" value={this.state.filterText} onChange={this.handleInputChange}/>
          <select name="category" value={this.state.category} onChange={this.handleInputChange}>
            {categoryOptions}
          </select>
        </ItemCard>
        <SearchResults
          category={this.state.category}
          filterText={this.state.filterText}
          items={this.state.filteredItems}/>
      </div>
    )
  }
}

class SearchResults extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const category = this.props.category;

    if (!filterText && !category) {
      return null;
    }

    const ListComponents = {
      ArchwingList,
      ArcanesList,
      FishList,
    }

    const ResultsList = ListComponents[category + 'List'];
    const items = this.props.items;

    return (
      <ItemCard>
        <ResultsList key='ResultList' filterText={filterText} items={items} />
      </ItemCard>
    )
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
