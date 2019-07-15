import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

export class UsersScreen extends React.Component {
    render () {
        return (
            <div className={this.props.className}>Users</div>
        );
    }
};

export default styled(injectIntl(UsersScreen))`
    display: flex;
`;