const ModTypesFilter = (props) => {
    const options = props.options.map((type) => {
        return <option key={type} value={type}>{type}</option>;
    });
    return (
        <select name="modTypeFilter" value={props.value} onChange={props.onChange}>
            <option key="default" value="">-- Type --</option>;
            {options}
        </select>
    )
}

export default ModTypesFilter
