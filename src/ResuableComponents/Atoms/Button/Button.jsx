import React from 'react';
import styled from 'styled-components';

/**
 * Renders a button component.
 */
export class Button extends React.Component {
    constructor () {
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }

    render () {
        const {label, onClick, ...rest} = this.props;
        return (
            <button onClick={this.clickHandler} {...rest}>{label}</button>
        );
    }

    clickHandler () {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.content);
        }
    }
}

export default styled(Button)`
`;