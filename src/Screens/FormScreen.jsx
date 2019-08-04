import React from 'react';
import styled from 'styled-components';
import FormService from '../Services/FormService';
import Form from './../ResuableComponents/Organisms/Form/Form';

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
        this.formRowChangeHandler = this.formRowChangeHandler.bind(this);
    }

    async componentDidMount () {
        let id = this.props.id;
        if (id === 'new') {
            id = null;
        }
        let type = this.props.type;
        let formResponse = await this.formService.getForm(type, this.props.tenantId, id);
        if (formResponse.status === 200) {
            let formStack = this.state.formStack;
            let formIndex = this.state.formIndex;
            formStack.push(formResponse.data);
            formIndex = formIndex === null ? -1: formIndex;
            formIndex++;
            this.setState({
                formStack: formStack,
                formIndex: formIndex
            });
        } else {
            // TODO: Handle the error case
        }
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
                            addFormToStack={this.addFormToStackHandler} onFormRowChange={this.formRowChangeHandler}/>
                    </div>
                );
            }
        } else {
            return (
                <div className={this.props.className}>Component type was not 'FORM'</div>
            )
        }
    }

    /**
     * The stack keeps track of nested forms.
     * @param {object} form The form being added to the stack.
     */
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

    /**
     * Renders the form back button if nested forms are being displayed.
     */
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

    /**
     * When the back button is clicked pop the current form from the stack.
     */
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

    /**
     * This function is passed into the Form component. Whenever there is a change in the value of any of the form rows or components,
     * this function will be called with the updated value. We will update the form content with the value.
     * @param {string} name The name of the form row or component. 
     * @param {string} value The value of the form row/component.
     */
    formRowChangeHandler (name, value) {
        let formStack = this.state.formStack;
        let currentForm = formStack[this.state.formIndex];
        let content = currentForm.type.content;
        content[name].value = value;
        this.setState({
            formStack: formStack
        }, () => {
            console.log(`complete form: ${JSON.stringify(this.state.formStack[0], null, 4)}`);
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