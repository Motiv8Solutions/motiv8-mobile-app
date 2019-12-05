import * as React from 'react';
import styled from 'styled-components';
import { Carousel, Slide, IconButton, Textbox, Label, PrimaryButton } from 'motiv8-atoms';
import  { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import UserService from './../Services/UserService';
import BiometricService from './../Services/BiometricService';

class MobileNumberEntry extends React.Component<any, any> {
    countryCode: string = null;
    mobileNumber: string = null;
    userService: UserService = null;

    constructor (props: any) {
        super(props);
        this.state = {
            countryCode: '',
            mobileNumber: ''
        };
        this.userService = new UserService();
        this.handleCountryCode = this.handleCountryCode.bind(this);
        this.handleMobileNumber = this.handleMobileNumber.bind(this);
        this.submitMobileNumber = this.submitMobileNumber.bind(this);
    }
    render () {
        return (
            <div className={this.props.className}>
                <div>
                    <Label type='heading1' content={this.props.intl.formatMessage({id: 'COMPANY_TITLE'})} alternate={true}/>
                    <div className='content'>
                        <Textbox placeholder='+1' value={this.state.countryCode} charSize={3} maxLength={3} onChange={this.handleCountryCode}/>
                        <Textbox className='mobileNumber' value={this.state.mobileNumber} placeholder='mobile number' type='tel' size='full' onChange={this.handleMobileNumber} />
                        <IconButton className='arrow' icon={faArrowRight} clickHandler={this.submitMobileNumber}/>
                    </div>
                </div>
            </div>
        );
    }

    handleCountryCode (value: string) {
        this.setState({
            countryCode: value
        }, () => {
            if (typeof this.props.onCountryCodeChange === 'function') {
                this.props.onCountryCodeChange(value);
            }
        });
    }

    handleMobileNumber (value: string) {
        this.setState({
            mobileNumber: value
        }, () => {
            if (typeof this.props.onMobileNumberChange === 'function') {
                this.props.onMobileNumberChange(value);
            }
        });
    }

    async submitMobileNumber () {
        let orgResponse: any = await this.userService.lookupMobileNumber(this.state.countryCode, this.state.mobileNumber);
        if (orgResponse.status === 200) {
            console.info(`orgs = ${JSON.stringify(orgResponse.data)}`);

            // // store the phone number in local storage because it has been validated
            // window.localStorage.setItem('phoneNumber', `${this.state.countryCode}-${this.state.mobileNumber}`);

            if (typeof this.props.onOrgsChange === 'function') {
                this.props.onOrgsChange(orgResponse.data);
            }
            this.props.carousal.current.onRightNavClick();
        } else {
            // TODO: handle the error case
        }
    }
};

const MobileNumberEntryStyled = styled(injectIntl(MobileNumberEntry))`
    display: flex;
    flex-direction: column;
    flex: auto;
    justify-content: center;

    div.content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 56px;
        width: 100%;

        input.mobileNumber {
            margin-left: 12px;
        }

        .arrow {
            margin-left: 12px;
            color: #FFFFFF;
        }
    }
`;

class OrganizationEntry extends React.Component<any, any> {
    userService: UserService = null;

    constructor (props: any) {
        super(props);
        this.userService = new UserService();
        this.submitOrganization = this.submitOrganization.bind(this);
    }

    render () {
        let organization = this.props.organizations ? this.props.organizations[0] : null;
        let orgName = organization ? organization.orgName : null;
        return (
            <div className={this.props.className}>
                <div>
                    <Label type='heading1' content={this.props.intl.formatMessage({id: 'COMPANY_TITLE'})} alternate={true}/>
                    <div className='content firstLine'>
                        <Textbox charSize={3} value={this.props.countryCode} disabled={true} />
                        <Textbox className='mobileNumber' size='full' value={this.props.mobileNumber} disabled={true} />
                    </div>
                    <div className='content secondLine'>
                        <Textbox className='org' size='full' value={orgName} disabled={true} />
                        <IconButton className='arrow' icon={faArrowRight} clickHandler={this.submitOrganization}/>
                    </div>
                </div>
            </div>
        );
    }

    async submitOrganization () {
        let response: any = await this.userService.confirmOrganization(this.props.countryCode, this.props.mobileNumber, this.props.organizations[0].tenantID);
        if (!response || !response.data || !response.data.token) {
            throw new Error(`Error in response from call to confirm organization`);
        }
        if (typeof this.props.onOrganizationConfirm === 'function') {
            this.props.onOrganizationConfirm(response.data.token);
        }
        this.props.carousal.current.onRightNavClick();
    }
};

const OrganizationEntryStyled = styled(injectIntl(OrganizationEntry))`
    display: flex;
    flex-direction: column;
    flex: auto;
    justify-content: center;

    div.content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;

        input.mobileNumber {
            margin-left: 12px;
        }
    }

    div.firstLine {
        margin-top: 56px;
    }

    div.secondLine {
        margin-top: 16px;

        .arrow {
            margin-left: 12px;
            color: #FFFFFF;
        }
    }
`;

class CodeEntry extends React.Component<any, any> {
    userService: UserService = null;

    constructor (props: any) {
        super(props);
        this.userService = new UserService();
        this.submitCode = this.submitCode.bind(this);
        this.renderCodeTextbox = this.renderCodeTextbox.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.showMobileNumber = this.showMobileNumber.bind(this);
        this.state = {
            code: ['', '', '', '', '', '']
        };
    }

    render () {
        return (
            <div className={this.props.className}>
                <div>
                    <Label type='heading1' content={this.props.intl.formatMessage({id: 'COMPANY_TITLE'})} alternate={true}/>
                    <Label type='heading3' content={this.props.intl.formatMessage({id: 'VERIFICATION_TITLE'})} alternate={true}/>
                    <Label type='body2' content={this.props.intl.formatMessage({id: 'VERIFICATION_MESSAGE'}, {mobileNumber: this.showMobileNumber()})} alternate={true}/>
                    <div className='content firstLine'>
                        {this.renderCodeTextbox()}
                        <IconButton className='arrow' icon={faArrowRight} clickHandler={this.submitCode}/>
                    </div>
                </div>
            </div>
        );
    }

    showMobileNumber () {
        let mobileNumber = this.props.mobileNumber;
        console.log(`showMobileNumber: ${mobileNumber}`);
        return mobileNumber;
    }

    renderCodeTextbox () {
        let textboxComps = [];
        for (let i = 0; i < 6; i++) {
            textboxComps.push(<Textbox key={`codebox${i}`} value={this.state.code[i]} charSize={1} onChange={(value: any) => this.handleCodeChange(i, value)} />)
        }
        return textboxComps;
    }

    handleCodeChange (index: number, value: string) {
        console.log(`handleCodeChange: index = ${index}, value = ${value}`);
        let code = this.state.code;
        code[index] = value;
        this.setState({
            code: code
        });
    }

    async submitCode () {
        let tenantID = this.props.organizations[0].tenantID;
        console.log(`submitCode: tempToken: ${this.props.tempToken}, code: ${this.state.code.join('')}`);
        let response: any = await this.userService.confirmCode(tenantID, this.props.tempToken, this.state.code.join(''));
        if (!response || !response.data || !response.data.token) {
            throw new Error(`Error in response from call to submit code.`);
        }
        if (typeof this.props.onCodeConfirm === 'function') {
            this.props.onCodeConfirm(response.data.token);
        }
        this.props.carousal.current.onRightNavClick();
    }
}

const CodeEntryStyled = styled(injectIntl(CodeEntry))`
    display: flex;
    flex-direction: column;
    flex: auto;
    justify-content: center;

    div.content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;

        input[type='text'] {
            margin-right: 16px;
        }

        .arrow {
            color: #FFFFFF;
        }
    }
`;


class BiometricScreen extends React.Component<any, any> {
    biometricService: BiometricService = null;
    constructor (props: any) {
        super(props);
        this.state = {
            biometricsSupported: false,
            biometricType: null,
            deviceType: null
        };
        this.biometricService = new BiometricService();
        this.handleBiometricUnavailable = this.handleBiometricUnavailable.bind(this);
        this.registerBiometrics = this.registerBiometrics.bind(this);
    }

    /**
     * Check for device support for biometric authentication.
     * First launch the correct plugin based on the type of device, iOS or Andriod. We do not support anything else, right now.
     */
    async componentDidMount () {
        let biometricResult: any = await this.biometricService.checkBiometricSupport();
        this.setState({
            biometricsSupported: biometricResult.biometricsSupported,
            biometricType: biometricResult.biometricType,
            deviceType: biometricResult.deviceType
        }, () => {
            window.localStorage.setItem('deviceType', this.state.deviceType);
            window.localStorage.setItem('biometricsSupported', this.state.biometricsSupported);    
        });
    }

    render () {
        return (
            <div className={this.props.className}>
                <Label type='heading1' content={this.props.intl.formatMessage({id: 'COMPANY_TITLE'})} alternate={true}/>
                {this.renderAuthentication()}
            </div>
        )
    }

    renderAuthentication () {
        let that = this;
        function getTypeMessage () {
            if (that.state.biometricType === 'face') {
                return that.props.intl.formatMessage({id: 'FACE_ID'});
            } else if (that.state.biometricType === 'touch') {
                return that.props.intl.formatMessage({id: 'TOUCH_ID'});
            } else {
                return that.props.intl.formatMessage({id: 'FINGERPRINT'});
            }
        }

        if (this.state.biometricsSupported) {
            return (
                <>
                    <Label type='body1' content={this.props.intl.formatMessage({id: 'BIOMETRIC_MESSAGE_OPT_IN'})} alternate={true}/>
                    <div className='button'>
                        <PrimaryButton text={this.props.intl.formatMessage({id: 'SET_UP_BIOMETRIC_AUTH'}, {type: getTypeMessage()})}
                            clickHandler={this.registerBiometrics}/>
                    </div>
                    <Label type='body1' content={this.props.intl.formatMessage({id: 'BIOMETRIC_MESSAGE_OPT_OUT'})} alternate={true}/>
                    <div className='button'>
                        <PrimaryButton text={this.props.intl.formatMessage({id: 'OPT_OUT'})} clickHandler={this.handleBiometricsOptOut}/>
                    </div>
                </>
            );
        }
        return (
            <>
                <Label type='body1' content={this.props.intl.formatMessage({id: 'BIOMETRIC_MESSAGE_UNAVAILABLE'})} alternate={true}/>
                <div className='button'>
                    <PrimaryButton text={this.props.intl.formatMessage({id: 'OK'})} clickHandler={this.handleBiometricUnavailable}/>
                </div>
            </>
        );
    }

    /**
     * Function called when the OK button acknowledging the unavailability of the biometric screen is clicked.
     * The user has 'logged in' using the code, take them to the HOME screen.
     */
    handleBiometricUnavailable () {
        console.info('Biometrics unavailablility acknowledged, taking the user home.');
        this.props.history.push('/home');
    }

    /**
     * Function called when the user opts out of biometric authentication and the Opt out button is clicked.
     * The user has 'logged in' using the code, take them home.
     */
    handleBiometricsOptOut () {
        console.info('Biometrics opt out acknowledged, taking the user home.');
        this.props.history.push('/home');
    }

    /**
     * Function called when the user wants to register for biometric authentication.
     * Call the Cordova plugin that launches the biometric registration UI.
     */
    registerBiometrics () {
        let that = this;
        let scanMessage = (this.state.biometricType === 'face' ? 'SCAN_FACE_MESSAGE' : 'SCAN_FINGERPRINT_MESSAGE');
        if (this.state.deviceType === 'ios') {
            console.info(`BiometricsScreen.registerBiometrics: iOS verifying fingerprint and storing the token.`);
            // ios
            window.plugins.touchid.verifyFingerprintWithCustomPasswordFallback(
                this.props.intl.formatMessage({id: scanMessage}),
                function () {
                    // success handler, fingerprint accepted
                    // store the phone number and the bearer token in local storage
                    // TODO: Can we store the bearer token encrypted? Is it required?
                    if (typeof that.props.onBiometricsConfirmed === 'function') {
                        that.props.onBiometricsConfirmed(that.props.bearerToken);
                    }
                    that.props.history.push('/home');
                },
                function (msg: string) {
                    // error handler, with error code and localized reason
                    // TODO: What do we do here?
                    console.error(`BiometricScreen.registerBiometrics: iOS error in registering biometric authentication, message: ${JSON.stringify(msg)}`);
                }
            );
        } else {
            // android
            console.info(`BiometricsScreen.registerBiometrics: android verifying fingerprint, encrypting and storing the token.`);
            let that = this;
            let config = {
                clientId: 'com.motiv8solutions.mobileapp',
                username: `${that.props.countryCode}-${that.props.phoneNumber}`,
                password: that.props.bearerToken,
                disableBackup: true,
                dialogMessage: that.props.intl.formatMessage({id: scanMessage})
            };
            FingerprintAuth.encrypt(
                config,
                function (result: any) {
                    console.info(`BiometricScreen.registerBiometrics: Fingerprint verified, result: ${JSON.stringify(result)}`);
                    if (result.withFingerprint) {
                        console.info(`BiometricScreen.registerBiometrics: Successfully encrypted credentials, encrypted token: ${result.token}`);
                        // store the phone number and the encrypted token in local storage
                        if (typeof that.props.onBiometricsConfirmed === 'function') {
                            that.props.onBiometricsConfirmed(result.token);
                        }    
                        that.props.history.push('/home');
                    }
                },
                function (error: any) {
                    // error handler, with error code and localized reason
                    // TODO: What do we do here?
                    console.error(`BiometricScreen.registerBiometrics: android error in registering biometric authentication, message: ${JSON.stringify(error)}`);
                }
            );
        }
    }
}

const BiometricScreenStyled = styled(injectIntl(withRouter(BiometricScreen)))`
    display: flex;
    flex-direction: column;
    flex: auto;
    justify-content: center;

    div.button {
        display: flex;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 32px;
    }

`;

class SignupScreen extends React.Component<any, any> {
    carousalRef: any = React.createRef();
    biometricService: BiometricService = null;

    constructor (props: any) {
        super(props);
        this.state = {
            countryCode: null,
            mobileNumber: null,
            organizations: [],
            tempToken: null,
            bearerToken: null
        };
        this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
        this.handleMobileNumberChange = this.handleMobileNumberChange.bind(this);
        this.handleOrgsChange = this.handleOrgsChange.bind(this);
        this.handleConfirmOrganizationResponse = this.handleConfirmOrganizationResponse.bind(this);
        this.handleSubmitCodeResponse = this.handleSubmitCodeResponse.bind(this);
        this.handleBiometricsConfirmation = this.handleBiometricsConfirmation.bind(this);
        this.biometricService = new BiometricService();
    }

    render () {
        return (
            <div className={this.props.className}>
                <Carousel hideNavButtons={true} ref={this.carousalRef}>
                    <Slide>
                        <MobileNumberEntryStyled carousal={this.carousalRef} onCountryCodeChange={this.handleCountryCodeChange}
                            onMobileNumberChange={this.handleMobileNumberChange} onOrgsChange={this.handleOrgsChange}/>
                    </Slide>
                    <Slide>
                        <OrganizationEntryStyled carousal={this.carousalRef} countryCode={this.state.countryCode} mobileNumber={this.state.mobileNumber}
                            organizations={this.state.organizations} onOrganizationConfirm={this.handleConfirmOrganizationResponse}/>
                    </Slide>
                    <Slide>
                        <CodeEntryStyled tempToken={this.state.tempToken} carousal={this.carousalRef} onCodeConfirm={this.handleSubmitCodeResponse}
                            organizations={this.state.organizations} mobileNumber={this.state.mobileNumber}/>
                    </Slide>
                    <Slide>
                        <BiometricScreenStyled countryCode={this.state.countryCode} phoneNumber={this.state.phoneNumber} bearerToken={this.state.bearerToken}
                            onBiometricsConfirmed={this.handleBiometricsConfirmation} />
                    </Slide>
                </Carousel>
            </div>
        );
    }

    handleCountryCodeChange (value: string) {
        this.setState({
            countryCode: value
        });
    }

    handleMobileNumberChange (value: string) {
        this.setState({
            mobileNumber: value
        });
    }

    handleOrgsChange (value: string) {
        this.setState({
            organizations: value
        });
    }

    handleConfirmOrganizationResponse (value: string) {
        this.setState({
            tempToken: value
        });
    }

    handleSubmitCodeResponse (value: string) {
        this.setState({
            bearerToken: value
        }, () => {
            console.log(`handleSubmitCodeResponse: bearerToken: ${this.state.bearerToken}`);
            window.localStorage.setItem('countryCode', this.state.countryCode.toString());
            window.localStorage.setItem('mobileNumber', this.state.mobileNumber.toString());
            window.localStorage.setItem('organizations', JSON.stringify(this.state.organizations));
        });
    }

    /**
     * This handler is called when the biometrics succeed. We will store all important data to local storage.
     * @param {string} value If the device is iOS the bearer token, if andriod the encrypted token
     */
    handleBiometricsConfirmation (value: string) {
        // this value is the bearer token if the device is iOS, else it is an encrypted token if Andriod.
        window.localStorage.setItem('bearerToken', value);
    }
};

export default styled(injectIntl(withRouter(SignupScreen)))`
    display: flex;
    flex-direction: column;
    flex: auto;    
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.secondaryBackground};
`;