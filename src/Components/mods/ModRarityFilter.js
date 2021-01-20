const ModRarityFilter = (props) => {
    const options = props.options.map((rarity) => {
      return <option key={rarity} value={rarity}>{rarity}</option>;
    });
    return (
      <select name="modRarityFilter" value={props.value} onChange={props.onChange}>
        <option key="default" value="">-- Rarity --</option>;
        {options}
      </select>
    )
}

export default ModRarityFilter;
