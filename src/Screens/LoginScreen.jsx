import React from 'react';
import styled from 'styled-components';
import { Label, Textbox, PrimaryButton } from 'motiv8-atoms';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

/**
 * Screen to display the login form to the user for signing into the application.
 */
class LoginScreen extends React.Component {
    constructor (props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    render () {
        let legalContent = <span>By signing up, you agree to the <a href='https://www.motiv8solutions.com' target='_blank'>Company Terms of Use</a> and license 
        agreements which can be found on the company website.</span>;
        return (
            <div className={this.props.className}>
                <div className='titleContainer'>
                    <Label type='heading1' content='Motiv8' alternate={true}/>
                </div>
                <div className='loginContainer'>
                    <Textbox id='username' placeholder={this.props.intl.formatMessage({ id: 'USERNAME_PLACEHOLDER' })} size='M'/>
                    <Textbox id='password' type='password' placeholder={this.props.intl.formatMessage({ id: 'PASSWORD_PLACEHOLDER' })} size='M'/>
                    <PrimaryButton id='signInButton' text={this.props.intl.formatMessage({ id: 'SIGN_IN_BUTTON' })} clickHandler={this.signIn} />
                </div>
                <div className='legalContainer'>
                    <Label id='legal' type='body5' content={legalContent} alternate={true}/>
                </div>
            </div>
        );
    }

    signIn () {
        console.log('sign in clicked');
        this.props.history.push('/home');
    }
}

LoginScreen.displayName = 'LoginScreen';

export default styled(injectIntl(withRouter(LoginScreen)))`
    align-items: center;
    background-color: ${props => props.theme.colors.secondaryBackground};
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;

    .titleContainer, .loginContainer, .legalContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input#password {
        margin-top: 1px;
    }

    button#signInButton {
        min-width: 232px;
        margin-top: 44px;
    }

    p#legal {
        a {
            color: ${props => props.theme.colors.linkText};
            text-decoration: none;
        }
    }
`;