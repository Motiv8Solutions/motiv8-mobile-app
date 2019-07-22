import React from 'react';
import styled from 'styled-components';
import FormService from '../Services/FormService';
import Form from './../ResuableComponents/Organisms/Form/Form';
import ContestForm from './../MockData/ContestForm.json';

const MOCK = true;

/**
 * This component gets the form json for a given form type, tenant id and form id and renders the form using the Form component.
 */
export class FormScreen extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            formIndex: null,
            formStack: []
        };
        this.formService = new FormService();
        this.addFormToStackHandler = this.addFormToStackHandler.bind(this);
        this.renderBackButton = this.renderBackButton.bind(this);
        this.backButtonClickHandler = this.backButtonClickHandler.bind(this);
    }

    async componentDidMount () {
        let id = this.props.id;
        if (id === 'new') {
            id = null;
        }
        let type = this.props.type;
        let formData = null;
        if (MOCK === true) {
            formData = ContestForm;
        } else {
            let formResponse = await this.formService.getForm(type, this.props.tenantId, id);
            if (formResponse.status === 200) {
                formData = formResponse.data;
            } else {
                // TODO: Handle the error case
            }
        }
        console.info(`form = ${JSON.stringify(formData)}`);
        let formStack = this.state.formStack;
        let formIndex = this.state.formIndex;
        formStack.push(formData);
        formIndex = formIndex === null ? -1: formIndex;
        formIndex++;
        this.setState({
            formStack: formStack,
            formIndex: formIndex
        });
    }

    render () {
        let formStack = this.state.formStack || [];
        let formIndex = this.state.formIndex;
        if (formStack.length > 0 && formIndex > -1) {
            let form = formStack[formIndex];
            let type = form.type ? form.type.component : null;
            if (type && type.toUpperCase() === 'FORM') {
                return (
                    <div className={this.props.className}>
                        <div className='header'>
                            <div className='left'>
                                {this.renderBackButton()}
                            </div>
                            <div className='center'>
                                {form.label}
                            </div>
                            <div className='right'>
                            </div>
                        </div>
                        <Form id={this.props.id} type={this.props.type} tenantId={this.props.tenantId} content={form.type.content}
                            addFormToStack={this.addFormToStackHandler}/>
                    </div>
                );
            }
        } else {
            return (
                <div className='error'>Component type was not 'FORM'</div>
            )
        }
    }

    addFormToStackHandler (form) {
        let formStack = this.state.formStack;
        let formIndex = this.state.formIndex;
        formStack.push(form);
        formIndex = formIndex === null ? -1 : formIndex;
        formIndex++;
        this.setState({
            formStack: formStack,
            formIndex: formIndex
        });
    }

    renderBackButton () {
        let formIndex = this.state.formIndex;
        if (formIndex > 0) {
            return (
                <button onClick={this.backButtonClickHandler}>{`<`}</button>
            );
        } else {
            return null;
        }
    }

    backButtonClickHandler () {
        let formIndex = this.state.formIndex;
        let formStack = this.state.formStack;
        if (formIndex > 0) {
            formIndex--;
            formStack.pop();
        }
        this.setState({
            formIndex: formIndex,
            formStack: formStack
        });
    }
};

export default styled(FormScreen)`
    display: flex;
    flex-direction: column;

    div.header {
        background-color: rebeccapurple;
        color: #FFFFFF;
        display: flex;
        flex-direction: row;
        // flex: 1;
        align-items: center;
        justify-content: center;

        .left, .center, .right {
            display: flex;
        }

        .left: {
            justify-content: flex-start;
            width: 25%;
        }

        .center {
            flex: 1;
            justify-content: center;
            width: 50%;
        }

        .right: {
            justify-content: flex-end;
            width: 25%;
        }
    }
`;