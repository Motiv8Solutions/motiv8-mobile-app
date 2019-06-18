import React from 'react';
import styled from 'styled-components';
import { Label } from 'motiv8-atoms';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

class SplashScreen extends React.Component {
    constructor (props) {
        super(props);
        this.countdownTimer = null;
    }

    componentDidMount () {
        this.countdownTimer = window.setTimeout(() => {
            this.props.history.push('/signup');
        }, 2000);
    }

    componentWillUnmount () {
        window.clearTimeout(this.countdownTimer);
    }

    render () {
        return (
            <div className={this.props.className}>
                <Label type='heading1' content={this.props.intl.formatMessage({id: 'COMPANY_TITLE'})} alternate={true}/>
                <div className='tagLine'>
                    <Label type='heading3' content={this.props.intl.formatMessage({id: 'COMPANY_TAGLINE'})} alternate={true}/>
                </div>
            </div>
        )
    }
}

export default styled(injectIntl(withRouter(SplashScreen)))`
    display: flex;
    flex-direction: column;
    flex: auto;
    justify-content: center;
    background-color: ${props => props.theme.colors.secondaryBackground};
    
    .tagLine {
        margin-top: 36px;
    }
`;