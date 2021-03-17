const PolaritiesFilter = (props) => {
    const options = props.options.map((polarity) => {
      return <option key={polarity} value={polarity}>{polarity}</option>;
    });

    return (
      <select name="polarityFilter" value={props.value} onChange={props.onChange}>
        <option key="default" value="">-- Polarity --</option>;
        {options}
      </select>
    )
}

export default PolaritiesFilter;
