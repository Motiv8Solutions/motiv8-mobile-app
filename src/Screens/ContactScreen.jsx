import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { Textbox } from 'motiv8-atoms';

/**
 * Screen to display a form that allows a user to send feedback with support for attaching screenshots.
 */
class ContactScreen extends React.Component {
    render () {
        return (
            <div className={this.props.className}>
                <form>
                    <Textbox placeholder={this.props.intl.formatMessage({ id: 'SUBJECT_PLACEHOLDER' })} type='text' size='F'/>
                    <Textbox placeholder={this.props.intl.formatMessage({ id: 'DETAILS_PLACEHOLDER' })} type='text' multiline={true} size='F' rows={5}/>
                </form>
            </div>
        );
    }
}

export default styled(injectIntl(ContactScreen))`
    form {
        height: 100%;
        width: 100%;
    }

    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
`;
