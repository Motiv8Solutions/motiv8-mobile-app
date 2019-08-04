import React from 'react';
import styled from 'styled-components';

/**
 * Renders a single select component.
 */
export class Select extends React.Component {
    constructor () {
        super();
        this.changeHandler = this.changeHandler.bind(this);
    }

    render () {
        const {value, name, options, onChange, ...rest} = this.props;
        return (
            <select name={name} value={value} {...rest} onChange={this.changeHandler.bind(this, name)}>
                {
                    options.map((option, optionIndex) => {
                        return (
                            <option key={`option${optionIndex}`} value={option.value}>{option.label}</option>
                        )
                    })
                }
            </select>
        );
    }

    changeHandler (name, e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(name, e.target.value);
        }
    }
}

export default styled(Select)`
`;