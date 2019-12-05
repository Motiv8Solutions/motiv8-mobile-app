import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'motiv8-atoms';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

class SplashScreen extends React.Component<any, any> {
    countdownTimer: any = null;
    
    constructor (props: any) {
        super(props);
        this.countdownTimer = null;
    }

    componentDidMount () {
        this.countdownTimer = window.setTimeout(() => {
            // check if there is a phone number stored in local storage.
            let mobileNumber = window.localStorage.getItem('mobileNumber');
            console.log(`SplashScreen.componentDidMount: mobile number: ${mobileNumber}`);
            // this.props.history.push('/home');
            if (!mobileNumber) {
                console.log(`SplashScreen.componentDidMount: phone number not found, directing to sign up.`);
                this.props.history.push('/signup');
            } else {
                console.log(`SplashScreen.componentDidMount: phone number found, directing to sign in.`);
                this.props.history.push('/signin');
            }
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