import React from 'react';
import styled from 'styled-components';

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

    renderContent (content) {
        return content.map((formRow, index) => {
            return (
                <div key={`formRow${index}`} className='formRow'>
                    <div className='label'>{formRow.label}</div>
                    <div className='component'>{this.renderComponent(formRow)}</div>
                </div>
            )
        });
    }

    renderComponent (formRow) {
        let componentType = formRow.type.component;
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
                    <button onClick={this.formButtonClickHandler.bind(this, formRow)}>{`${formRow.label} >`}</button>
                );
            case 'SINGLESELECT':
                return (
                    <select></select>
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