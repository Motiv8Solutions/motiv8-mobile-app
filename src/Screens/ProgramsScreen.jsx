import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

export class ProgramsScreen extends React.Component {
    render () {
        return (
            <div className={this.props.className}>
                <div className='programCard' onClick={this.handleClick.bind(this, 'announcement')}>{this.props.intl.formatMessage({ id: 'ANNOUNCEMENT' })}</div>
                <div className='programCard' onClick={this.handleClick.bind(this, 'contest')}>{this.props.intl.formatMessage({ id: 'CONTEST' })}</div>
                <div className='programCard' onClick={this.handleClick.bind(this, 'bonus')}>{this.props.intl.formatMessage({ id: 'BONUS' })}</div>
                <div className='programCard' onClick={this.handleClick.bind(this, 'commission')}>{this.props.intl.formatMessage({ id: 'COMMISSION' })}</div>
            </div>
        );
    }

    handleClick (program) {
        console.log(`program = ${program}`);
        this.props.history.push(`/${program}`);
    }
};

export default styled(injectIntl(withRouter(ProgramsScreen)))`
    display: flex;
    flex-direction: column;

    div.programCard {
        cursor: pointer;
    }
`;