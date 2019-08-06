import React from 'react';
import styled from 'styled-components';
import jsonLogic from 'json-logic-js';
import Modal from './../../Molecules/Modal/Modal';
import Text from './../../Atoms/Text/Text';
import Select from './../../Atoms/Select/Select';
import Button from './../../Atoms/Button/Button';

export class Form extends React.Component {
    constructor () {
        super();
        this.renderContent = this.renderContent.bind(this);
        this.formButtonClickHandler = this.formButtonClickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.listButtonClickHandler = this.listButtonClickHandler.bind(this);
        this.state = {
            showModal: false
        };
    }

    render () {
        let content = this.props.content || [];
        return (
            <div className={this.props.className}>
                {this.renderContent(content)}
                <Modal isOpen={this.state.showModal}>
                    <button onClick={this.handleCloseModal}>Close</button>
                </Modal>
            </div>
        );
    }

    /**
     * Renders the form from the JSON.
     * @param {object} content The content object contains the form rows. Each row is an object with the key as the unique identifier for the row.
     */
    renderContent (content) {
        let contentKeys = Object.keys(content);
        return contentKeys.map((key, keyIndex, contentKeys) => {
            let component = content[key];
            if (component) {
                let visibility = component.visibility;
                if (visibility) {
                    // if the visibility rule matches the data value, show the component.
                    if (jsonLogic.apply(visibility, content)) {
                        return (
                            <div key={`formRow${keyIndex}`} className='formRow'>
                                <div className='label'>{component.label}</div>
                                <div className='component'>{this.renderComponent(component, key)}</div>
                            </div>
                        );
                    }
                    // The visibility rule did not match the data, dont render the component.
                    return null;
                }
                // render the component since there is no visibility rule to apply.
                return (
                    <div key={`formRow${keyIndex}`} className='formRow'>
                        <div className='label'>{component.label}</div>
                        <div className='component'>{this.renderComponent(component, key)}</div>
                    </div>
                );
            } else {
                throw new Error(`component JSON not found for key: ${key}`);
            }
        });
    }

    /**
     * Renders a single component from the form JSON.
     * @param {object} component The JSON corresponding to the component.
     * @param {*} key The name of the component in the form JSON.
     */
    renderComponent (component, key) {
        let componentType = component.type.component;
        let componentName = key;
        let componentValue = component.value || '';
        switch (componentType.toUpperCase()) {
            case 'TEXT':
                return (
                    <Text type='text' value={componentValue} name={componentName} onChange={this.changeHandler}/>
                );
            case 'DATE':
                return (
                    <Text type='date' value={componentValue} name={componentName} onChange={this.changeHandler}/>
                );
            case 'TIME':
                return (
                    <Text type='time' value={componentValue} name={componentName} onChange={this.changeHandler}/>
                );
            case 'AUDIENCE':
                return (
                    <div>AUDIENCE Component</div>
                );
            case 'NUMBER':
                return (
                    <Text type='number' value={componentValue} name={componentName} onChange={this.changeHandler}/>
                );
            case 'FORM':
                return (
                    <Button content={component} label={component.label} onClick={this.formButtonClickHandler}/>
                );
            case 'SINGLESELECT':
                return (
                    <Select value={componentValue} name={componentName} options={component.type.content} onChange={this.changeHandler}/>
                );
            case 'RICHTEXT':
                return (
                    <div>RICHTEXT Component</div>
                );
            case 'LIST':
                return (
                    <Button content={component.type.content} label={component.label} onClick={this.listButtonClickHandler}/>
                );
            default:
                return (
                    <div>{`Unknown component type: ${componentType}`}</div>
                );
        }
    }

    /**
     * When there is a change in the value of the component this function is called.
     * @param {string} name The name of the component which corresponds to the name in the form JSON.
     * @param {string} value Value of the component.
     */
    changeHandler (name, value) {
        if (typeof this.props.onFormRowChange === 'function') {
            this.props.onFormRowChange(name, value);
        }
    }

    /**
     * Temporary function called when there is a change in the <select> component.
     * @param {string} name The name of the component in the form JSON.
     * @param {object} e The event object.
     */
    handleChange (name, e) {
        if (typeof this.props.onFormRowChange === 'function') {
            this.props.onFormRowChange(name, e.target.value);
        }
    }

    /**
     * This function is called when a sub form button is clicked.
     * @param {object} content The content of the form.
     */
    formButtonClickHandler (content) {
        if (typeof this.props.addFormToStack === 'function') {
            this.props.addFormToStack(content);
        }
    }

    listButtonClickHandler (content) {
        this.setState({
            showModal: true
        });
    }

    handleCloseModal () {
        this.setState({
            showModal: false
        });
    }
};

export default styled(Form)`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;

    .formRow {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 12px;

        .label, .component {
            display: flex;
            align-items: center;
        }

        .label {
            justify-content: flex-start;
        }

        .component {
            flex: 1;
            justify-content: flex-end;
        }
    }
`;