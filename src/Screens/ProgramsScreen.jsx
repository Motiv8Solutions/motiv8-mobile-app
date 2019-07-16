import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { Label } from 'motiv8-atoms';
import { faBullhorn, faStar, faWallet, faMoneyBillAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ProgramsScreen extends React.Component {
    render () {
        let tenantID = 3432; // get the tenantID from local storage
        return (
            <div className={this.props.className}>
                <div className='programCard' onClick={this.handleClick.bind(this, 'announcement')}>
                    <FontAwesomeIcon className='icon announcementIcon' icon={faBullhorn} size='3x'/>
                    <Label type='body2' content={this.props.intl.formatMessage({ id: 'ANNOUNCEMENT' })}/>
                </div>
                <div className='programCard' onClick={this.handleClick.bind(this, 'contest')}>
                    <FontAwesomeIcon className='icon contestIcon' icon={faStar} size='3x'/>
                    <Label type='body2' content={this.props.intl.formatMessage({ id: 'CONTEST' })}/>
                </div>
                <div className='programCard' onClick={this.handleClick.bind(this, 'bonus')}>
                    <FontAwesomeIcon className='icon bonusIcon' icon={faWallet} size='3x'/>
                    <Label type='body2' content={this.props.intl.formatMessage({ id: 'BONUS' })}/>
                </div>
                <div className='programCard' onClick={this.handleClick.bind(this, 'commission')}>
                    <FontAwesomeIcon className='icon commissionIcon' icon={faMoneyBillAlt} size='3x'/>
                    <Label type='body2' content={this.props.intl.formatMessage({ id: 'COMMISSION' })}/>
                </div>
                <div className='programCard' onClick={this.handleClick.bind(this, `${tenantID}/users`)}>
                    <FontAwesomeIcon className='icon usersIcon' icon={faUsers} size='3x'/>
                    <Label type='body2' content={this.props.intl.formatMessage({ id: 'USERS' })}/>
                </div>
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
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;

    div.programCard {
        cursor: pointer;
        min-width: 156px;
        max-width: 156px;
        min-height: 156px;
        max-height: 156px;
        border: solid 1px ${props => props.theme.colors.borderColor1};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .icon {
        margin-bottom: 36px;
    }

    .announcementIcon {
        color: ${props => props.theme.colors.magenta400};
    }

    .contestIcon {
        color: ${props => props.theme.colors.blue400};
    }

    .bonusIcon {
        color: ${props => props.theme.colors.cyan400};
    }

    .commissionIcon {
        color: ${props => props.theme.colors.green400};
    }

    .usersIcon {
        color: ${props => props.theme.colors.borderGrey300};
    }
`;