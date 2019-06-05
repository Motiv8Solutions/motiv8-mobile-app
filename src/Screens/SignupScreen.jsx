import React from 'react';
import styled from 'styled-components';
import { Carousel, Slide, IconButton, Textbox, Label, PrimaryButton } from 'motiv8-atoms';
import  { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import UserService from './../Services/UserService';

class MobileNumberEntry extends React.Component {
    countryCode = null;
    mobileNumber = null;

    constructor (props) {
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
                        <Textbox className='mobileNumber' value={this.state.mobileNumber} placeholder='mobile number' type='tel' size='medium' onChange={this.handleMobileNumber} />
                        <IconButton className='arrow' icon={faArrowRight} clickHandler={this.submitMobileNumber}/>
                    </div>
                </div>
            </div>
        );
    }

    handleCountryCode (value) {
        this.setState({
            countryCode: value
        }, () => {
            if (typeof this.props.onCountryCodeChange === 'function') {
                this.props.onCountryCodeChange(value);
            }
        });
    }

    handleMobileNumber (value) {
        this.setState({
            mobileNumber: value
        }, () => {
            if (typeof this.props.onMobileNumberChange === 'function') {
                this.props.onMobileNumberChange(value);
            }
        });
    }

    async submitMobileNumber () {
        let orgResponse = await this.userService.lookupMobileNumber(this.state.countryCode, this.state.mobileNumber);
        console.info(`orgs = ${JSON.stringify(orgResponse.data)}`);
        if (typeof this.props.onOrgsChange === 'function') {
            this.props.onOrgsChange(orgResponse.data);
        }
        this.props.carousal.current.onRightNavClick();
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

class OrganizationEntry extends React.Component {
    constructor (props) {
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
                        <Textbox className='mobileNumber' size='medium' value={this.props.mobileNumber} disabled={true} />
                    </div>
                    <div className='content secondLine'>
                        <Textbox className='org' size='medium' value={orgName} disabled={true} />
                        <IconButton className='arrow' icon={faArrowRight} clickHandler={this.submitOrganization}/>
                    </div>
                </div>
            </div>
        );
    }

    async submitOrganization () {
        let response = await this.userService.confirmOrganization(this.props.countryCode, this.props.mobileNumber, this.props.organizations[0].tenantID);
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

class CodeEntry extends React.Component {
    constructor (props) {
        super(props);
        this.userService = new UserService();
        this.submitCode = this.submitCode.bind(this);
        this.renderCodeTextbox = this.renderCodeTextbox.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
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
                    <Label type='body2' content={this.props.intl.formatMessage({id: 'VERIFICATION_MESSAGE'})} alternate={true}/>
                    <div className='content firstLine'>
                        {this.renderCodeTextbox()}
                        <IconButton className='arrow' icon={faArrowRight} clickHandler={this.submitCode}/>
                    </div>
                </div>
            </div>
        );
    }

    renderCodeTextbox () {
        let textboxComps = [];
        for (let i = 0; i < 6; i++) {
            textboxComps.push(<Textbox key={`codebox${i}`} value={this.state.code[i]} charSize={1} onChange={(value) => this.handleCodeChange(i, value)} />)
        }
        return textboxComps;
    }

    handleCodeChange (index, value) {
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
        let response = await this.userService.confirmCode(tenantID, this.props.tempToken, this.state.code.join(''));
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

class PasswordEntry extends React.Component {
    constructor (props) {
        super(props);
        this.userService = new UserService();
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
                        <Textbox className='mobileNumber' size='medium' value={this.props.mobileNumber} disabled={true} />
                    </div>
                    <div className='content secondLine'>
                        <Textbox className='org' size='medium' value={orgName} disabled={true} />
                    </div>
                    <div className='content thirdLine'>
                        <Textbox type='password' className='pwd' size='medium' />
                    </div>
                    <div className='content fourthLine'>
                        <Textbox type='password' className='pwd' size='medium' />
                    </div>
                    <div className='content fifthLine'>
                        <PrimaryButton text={this.props.intl.formatMessage({id: 'SIGN_UP'})}/>
                    </div>
                </div>
            </div>
        )
    }
}

const PasswordEntryStyled = styled(injectIntl(PasswordEntry))`
    display: flex;
    flex-direction: column;
    flex: auto;
    justify-content: center;

    div.content {
        input.mobileNumber {
            margin-left: 12px;
        }
    }

    div.firstLine {
        display: flex;
        flex-direction: row;
    }
`;

class SignupScreen extends React.Component {
    carousalRef = React.createRef();

    constructor (props) {
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
        this.handleSubmitPasswordResponse = this.handleSubmitPasswordResponse.bind(this);
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
                            organizations={this.state.organizations}/>
                    </Slide>
                    <Slide>
                        <PasswordEntryStyled bearerToken={this.state.bearerToken} carousal={this.carousalRef} onPasswordConfirm={this.handleSubmitPasswordResponse}
                            countryCode={this.state.countryCode} mobileNumber={this.state.mobileNumber} organizations={this.state.organizations}/>
                    </Slide>
                </Carousel>
            </div>
        );
    }

    handleCountryCodeChange (value) {
        this.setState({
            countryCode: value
        });
    }

    handleMobileNumberChange (value) {
        this.setState({
            mobileNumber: value
        })
    }

    handleOrgsChange (value) {
        this.setState({
            organizations: value
        })
    }

    handleConfirmOrganizationResponse (value) {
        this.setState({
            tempToken: value
        });
    }

    handleSubmitCodeResponse (value) {
        this.setState({
            bearerToken: value
        }, () => {
            console.log(`handleSubmitCodeResponse: bearerToken: ${this.state.bearerToken}`);
        });
    }

    handleSubmitPasswordResponse (value) {

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
