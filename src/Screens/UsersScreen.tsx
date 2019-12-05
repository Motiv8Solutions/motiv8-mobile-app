import * as React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { PrimaryButton } from 'motiv8-atoms';

export class UsersScreen extends React.Component<any, any> {
    render () {
        let tenantID = 3432; // get this tenantID from local storage
        return (
            <div className={this.props.className}>
                <div>Users</div>
                <div>
                    <PrimaryButton text='New User' clickHandler={() => {this.props.history.push(`/${tenantID}/users/new`)}}/>
                </div>
                <div>
                    <PrimaryButton text='Existing User' clickHandler={() => {this.props.history.push(`/${tenantID}/users/3`)}}/>
                </div>
            </div>
        );
    }
};

export default styled(injectIntl(withRouter(UsersScreen)))`
    display: flex;
    flex-direction: column;
`;