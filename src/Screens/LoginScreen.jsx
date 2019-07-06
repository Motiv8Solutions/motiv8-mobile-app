import React from 'react';
import styled from 'styled-components';
import { Label, Textbox, PrimaryButton, Select, MobilePicker } from 'motiv8-atoms';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import BiometricService from '../Services/BiometricService';

/**
 * Screen to display the login form to the user for signing into the application.
 */
class LoginScreen extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            countryCode: null,
            mobileNumber: null
        };
        this.signIn = this.signIn.bind(this);
        this.handleCountryCode = this.handleCountryCode.bind(this);
        this.showTouchId = this.showTouchId.bind(this);
        this.biometricService = new BiometricService();
    }

    async componentDidMount () {
        // get the mobile number and country code from local storage if they exist
        let countryCode = window.localStorage.getItem('countryCode');
        let mobileNumber = window.localStorage.getItem('mobileNumber');
        let bearerToken = window.localStorage.getItem('bearerToken');
        // we are here in the login screen because local storage has country code and phone number,
        // otherwise the user would be on the sign up screen.
        if (bearerToken !== null) { // biometrics enrolled
            let biometricResult = await this.biometricService.checkBiometricSupport();
            this.setState({
                countryCode: countryCode,
                mobileNumber: mobileNumber,
                biometricsSupported: biometricResult.biometricsSupported,
                biometricType: biometricResult.biometricType,
                deviceType: biometricResult.deviceType
            });
        }
    }

    render () {
        let legalContent = <span>By signing up, you agree to the <a href='https://www.motiv8solutions.com' target='_blank'>Company Terms of Use</a> and license 
        agreements which can be found on the company website.</span>;
        return (
            <div className={this.props.className}>
                <form id='loginForm' onSubmit={this.signIn}>
                    <div className='titleContainer'>
                        <Label type='heading1' content='Motiv8' alternate={true}/>
                    </div>
                    <div className='loginContainer'>
                        <div className='mobileNumberContainer'>
                            <Textbox id='countryCode' value={this.state.countryCode} placeholder='+1' charSize={3} onChange={this.handleCountryCode} />
                            <Textbox id='mobileNumber' value={this.state.mobileNumber} placeholder={this.props.intl.formatMessage({ id: 'MOBILE_PLACEHOLDER' })} size='medium' />
                        </div>
                        {this.renderOrgs()}
                        <div className='codeContainer'>
                            <Textbox id='code' placeholder={this.props.intl.formatMessage({ id: 'CODE' })} charSize={6} />
                            {this.state.biometricsSupported === true ? <PrimaryButton id='touchIdButton' text={this.props.intl.formatMessage({ id: 'TOUCH_ID_BUTTON' })} clickHandler={this.showTouchId} quiet={true} /> : null}
                        </div>
                        <PrimaryButton id='signInButton' text={this.props.intl.formatMessage({ id: 'SIGN_IN_BUTTON' })} type='submit' />
                    </div>
                    <div className='legalContainer'>
                        <Label id='legal' type='body5' content={legalContent} alternate={true}/>
                    </div>
                </form>
            </div>
        );
    }

    showTouchId () {
        console.info(`Sign in with Touch ID clicked`);
        let that = this;
        let scanMessage = (that.state.biometricType === 'face' ? 'SCAN_FACE_MESSAGE': 'SCAN_FINGERPRINT_MESSAGE');
        if (that.state.deviceType === 'ios') {
            console.info(`LoginScreen.showTouchId: iOS verifying fingerprint and storing the token.`);
            // iOS
            window.plugins.touchid.verifyFingerprintWithCustomPasswordFallback(
                that.props.intl.formatMessage({id: scanMessage}),
                function () {
                    // success handler, fingerprint accepted
                    // take the user to the home screen
                    console.info(`LoginScreen.showTouchId: iOS touch ID verified`);
                    that.props.history.push('/home');
                },
                function (msg) {
                    // error handler, with error code and localized reason
                    // TODO: what do we do here?
                    console.error(`LoginScreen.showTouchId: iOS error in verifying fingerprint, message: ${JSON.stringify(msg)}`);
                }
            )
        } else {
            // android
            console.info(`LoginScreen.showTouchId: android verifying fingerprint`);
            let that = this;
            let config = {
                clientId: 'com.motiv8solutions.mobileapp',
                disableBackup: true,
                dialogMessage: that.props.intl.formatMessage({id: scanMessage})
            };
            FingerprintAuth.encrypt(
                config,
                function (result) {
                    // success handler, fingerprint accepted
                    // take the user home
                    console.info(`LoginScreen.showTouchId: android fingerprint verified`);
                    that.props.history.push('/home');
                },
                function (error) {
                    // error handler, with error code and localized reason
                    console.error(`LoginScreen.showTouchId: android fingerprint error, message: ${JSON.stringify(error)}`);
                }
            )
        }
    }

    handleCountryCode (value) {
        this.setState({
            countryCode: value
        });
    }

    /**
     * Render the orgs. Look up the orgs from local storage.
     * If a single org is found, show the textbox pre-filled with the org.
     * If multiple orgs are found show it as a single select.
     */
    renderOrgs () {
        console.log(`Rendering orgs....`);
        let orgs = window.localStorage.getItem('organizations');
        console.log(`local storage: orgs = ${orgs}`);
        let mobileNumber = window.localStorage.getItem('mobileNumber');
        console.log(`local storage mobile number: ${mobileNumber}`);
        if (orgs) {
            orgs = JSON.parse(orgs);
        }
        console.log(`renderOrgs: orgs length: ${orgs.length}`);
        if (orgs.length > 0) {
            let orgOptions = orgs.map((org) => {
                return { label: org.orgName, value: org.tenantID };
            });
            return (
                <select defaultValue={orgOptions[0].value} onChange={this.handleOrgChange}>
                    {
                        orgOptions.map((option, index) => {
                            return (
                                <option key={`org${index}`} value={option.value}>{option.label}</option>
                            )
                        })
                    }
                </select>
            );
        } else {
            throw new Error(`No organizations found in local storage for mobile number ${mobileNumber}`);
        }
    }

    /**
     * When the user changes the organization we will need to store the current used org in local storage
     * for further use.
     */
    handleOrgChange (event) {
        console.log(`org change handler: value = ${JSON.stringify(event.target.value)}`);
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
    padding: 16px;
    display: flex;
    flex: 1;
    flex-direction: column;

    form {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
    }

    .titleContainer, .loginContainer, .legalContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .codeContainer, .mobileNumberContainer {
        display: flex;
        flex-direction: row;

        input:last-child {
            margin-left: 12px;
        }
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