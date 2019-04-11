import React from 'react';
import styled from 'styled-components';
import { Form } from 'motiv8-atoms';
import { injectIntl } from 'react-intl';

export class ContestScreen extends React.Component {
    render () {
        const formSchema = {
            "component": "com.motiv8solutions.components.form",
            "title": "Create Contest",
            "schemaVersion": "1.0",
            "formVersion": "1.0",
            "sections": [
                {
                    "rows": [
                        {
                            "label": null,
                            "components": [
                                {
                                    "type": "com.motiv8solutions.components.textbox",
                                    "name": "contestName",
                                    "properties": {
                                        "type": "text",
                                        "size": "medium",
                                        "disabled": false,
                                        "placeholder": "Username",
                                        "initialValue": "Fictional user"
                                    }
                                }
                            ]
                        },
                        {
                            "label": null,
                            "components": [
                                {
                                    "type": "com.motiv8solutions.components.datepicker",
                                    "name": "startDate",
                                    "properties": {
                                        "confirmText": "OK",
                                        "cancelText": "Cancel",
                                        "locale": "en-us",
                                        "platform": "ios"
                                    }
                                }
                            ]
                        },
                        {
                            "label": null,
                            "components": [
                                {
                                    "type": "com.motiv8solutions.components.datepicker",
                                    "name": "endDate",
                                    "properties": {
                                        "confirmText": "OK",
                                        "cancelText": "Cancel",
                                        "initialDate": "2019-09-09T09:00",
                                        "locale": "en-us",
                                        "platform": "ios"
                                    }
                                }
                            ]
                        },
                        {
                            "label": null,
                            "components": [
                                {
                                    "type": "com.motiv8solutions.components.mobilepicker",
                                    "name": "repeat",
                                    "properties": {
                                        "buttonLabel": "OK",
                                        "initialValue": {"repeat": "Never"},
                                        "label": "Repeat",
                                        "options": {"repeat": ["Never", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"]},
                                        "title": "Choose the interval"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    
        return (
            <div className={this.props.className}>
                <Form schema={formSchema} onChange={this.handleChange} />
            </div>
        );
    }

    handleChange (name, type, value) {
        console.log(`name = ${name}, type = ${type}, value = ${value}`);
    }
};

export default styled(ContestScreen)`
    display: flex;
`;