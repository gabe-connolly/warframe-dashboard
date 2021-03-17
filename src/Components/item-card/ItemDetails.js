import React from 'react';

export default class ItemDetails extends React.Component {
    render() {
        const details = [...this.props.details];

        return (
            {details}
        )
    }
}