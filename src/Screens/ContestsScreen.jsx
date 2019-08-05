import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { PrimaryButton } from 'motiv8-atoms';

export class ContestsScreen extends React.Component {
    render () {
        let tenantID = 3432; // get this tenantID from local storage
        return (
            <div className={this.props.className}>
                <div>Contests</div>
                <div>
                    <PrimaryButton text='New Contest' clickHandler={() => {this.props.history.push(`/${tenantID}/contests/new`)}}/>
                </div>
                <div>
                    <PrimaryButton text='Existing Contest' clickHandler={() => {this.props.history.push(`/${tenantID}/contests/3`)}}/>
                </div>
            </div>
        );
    }
};

export default styled(injectIntl(withRouter(ContestsScreen)))`
    display: flex;
    flex-direction: column;
`;