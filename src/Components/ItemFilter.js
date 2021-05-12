const ItemFilter = (props) => {
    return (
        <select name={props.name} value={props.value} onChange={props.onChange}>
            <option key="default" value="">-- {props.defaultOption} --</option>;
            {
                props.options.map((option) => <option key={option} value={option}>{option}</option>)
            }
        </select>
    )
}

export default ItemFilter
