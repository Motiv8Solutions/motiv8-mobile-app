import React from 'react';
import styled from 'styled-components';

export class Form extends React.Component {
    render () {
        return (
            <div className={this.props.className}>Form</div>
        );
    }
};

export default styled(Form)`
    display: flex;
`;