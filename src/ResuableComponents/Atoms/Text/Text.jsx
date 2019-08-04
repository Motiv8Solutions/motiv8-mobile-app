import React from 'react';
import styled from 'styled-components';

/**
 * Component that displays a text box. The textbox can be used to input text, date, time, number etc.
 */
export class Text extends React.Component {
    constructor () {
        super();
        this.changeHandler = this.changeHandler.bind(this);
    }
    
    render () {
        const { type, value, name, onChange, ...rest } = this.props;
        return (
            <input name={name} type={type} value={value} onChange={this.changeHandler.bind(this, name)} {...rest}/>
        );
    }

    changeHandler (name, e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(name, e.target.value);
        }
    }
}

export default styled(Text)`
    width: 100%;
`;