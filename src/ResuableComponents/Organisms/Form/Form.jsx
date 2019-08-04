import React from 'react';
import styled from 'styled-components';
import jsonLogic from 'json-logic-js';

export class Form extends React.Component {
    constructor () {
        super();
        this.renderContent = this.renderContent.bind(this);
        this.formButtonClickHandler = this.formButtonClickHandler.bind(this);
    }

    render () {
        let content = this.props.content || [];
        return (
            <div className={this.props.className}>
                {this.renderContent(content)}
            </div>
        );
    }

    /**
     * Renders the form.
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

    renderComponent (component, key) {
        let componentType = component.type.component;
        let componentName = key;
        let componentValue = component.value || '';
        switch (componentType.toUpperCase()) {
            case 'TEXT':
                return (
                    <input type='text'/>
                );
            case 'DATE':
                return (
                    <input type='date'/>
                );
            case 'TIME':
                return (
                    <input type='time'/>
                );
            case 'AUDIENCE':
                return (
                    <div>AUDIENCE Component</div>
                );
            case 'NUMBER':
                return (
                    <input type='number'/>
                );
            case 'FORM':
                return (
                    <button onClick={this.formButtonClickHandler.bind(this, component)}>{`${component.label} >`}</button>
                );
            case 'SINGLESELECT':
                return (
                    <select value={componentValue} onChange={this.handleChange.bind(this, componentName)}>
                        {
                            component.type.content.map((option, index) => {
                                return (
                                    <option key={`option${index}`} value={option.value}>{option.label}</option>
                                )
                            })
                        }
                    </select>
                );
            case 'RICHTEXT':
                return (
                    <div>RICHTEXT Component</div>
                );
            default:
                return (
                    <div>{`Unknown component type: ${componentType}`}</div>
                );
        }
    }

    handleChange (name, e) {
        if (typeof this.props.onFormRowChange === 'function') {
            this.props.onFormRowChange(name, e.target.value);
        }
    }

    formButtonClickHandler (content) {
        if (typeof this.props.addFormToStack === 'function') {
            this.props.addFormToStack(content);
        }
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