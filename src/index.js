/**
 * Huge credit and thanks to the Warframe community
 * https://github.com/WFCD/warframe-items
 */
const Items = require('warframe-items')
const React = require('react');
const ReactDOM = require('react-dom');
const archwings = new Items({category: ['Archwing']})

console.log(archwings);

const getCDNBase = () => {
  return 'https://cdn.warframestat.us/img/';
}


class Archwing extends React.Component {
  render() {
    return (
      <div data-name={this.props.name}>
        {this.props.name}
        <img src="{getCDNBase() + this.props.imageUrl}"/>
      </div>
    )
  }
}


const Archwings = (props) => {
    const list = props.items.map(archwing => {
      return (
        <Archwing/>
      )
    })
    return list;
}

ReactDOM.render(
  <Archwings items={archwings}/>,
  document.getElementById('root')
);


archwings.forEach(archwing => {
  let elements;
  for(const key in archwing) {
    ReactDOM.render(
      elements,
      document.getElementById('root')
    );

    //attr.innerText = `${key}: ${archwing[key]}`;
  }
});
