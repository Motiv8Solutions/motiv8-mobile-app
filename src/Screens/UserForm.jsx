import React from 'react';
import styled from 'styled-components';
import UserService from '../Services/UserService';

/**
 * UserForm component gets the form json for a user (either new or existing) and renders the form using the Form component.
 */
export class UserForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            content: null
        };
        this.userService = new UserService();
    }

    async componentDidMount () {
        let id = this.props.id;
        if (id === 'new') {
            id = null;
        }
        let userFormResponse = await this.userService.getUserForm(this.props.tenantID, id);
        if (userFormResponse.status === 200) {
            console.info(`userForm = ${JSON.stringify(userFormResponse.data)}`);
            this.setState({
                content: userFormResponse.data
            });
        } else {
            // TODO: Handle the error case
        }
    }

    render () {
        return (
            <div className={this.props.className}>
                <div>User Form</div>
                <pre>
                    {JSON.stringify(this.state.content, null, 4)}
                </pre>
            </div>
        );
    }
};

export default styled(UserForm)`
    display: flex;
    flex-direction: column;
`;