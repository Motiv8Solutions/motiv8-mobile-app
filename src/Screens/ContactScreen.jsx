import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { Textbox, PrimaryButton } from 'motiv8-atoms';
import { faHandsHelping, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Screen to display a form that allows a user to send feedback with support for attaching screenshots.
 */
class ContactScreen extends React.Component {
    constructor () {
        super();
        this.openPhotoLibrary = this.openPhotoLibrary.bind(this);
    }

    render () {
        return (
            <div className={this.props.className}>
                <div className='iconContainer'>
                    <FontAwesomeIcon icon={faHandsHelping} size='3x'/>
                </div>
                <form>
                    <Textbox className='subjectInput' placeholder={this.props.intl.formatMessage({ id: 'SUBJECT_PLACEHOLDER' })} type='text' size='F'/>
                    <Textbox className='detailsInput' placeholder={this.props.intl.formatMessage({ id: 'DETAILS_PLACEHOLDER' })} type='text'
                        multiline={true} size='F' rows={8}/>
                    <div className='toolbar'>
                        <div className='left'>
                            <div className='selectImage' onClick={this.openPhotoLibrary}>
                                <FontAwesomeIcon icon={faImage} size='2x'/>
                            </div>
                        </div>
                        <div className='right'>
                            <PrimaryButton text='Send'/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    openPhotoLibrary () {
        if (navigator && navigator.camera && typeof navigator.camera.getPicture === 'function') {
            navigator.camera.getPicture(this.onCaptureSuccess, this.onCaptureFail, {
                allowEdit: true,
                correctOrientation: true,
                destination: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                targetHeight: 316,
                targetWidth: 320
            });
        } else {
            console.log(`no support for navigator.camera.getPicture function`);
        }
    }

    onCaptureSuccess () {
        console.log(`on capture success`);
    }

    onCaptureFail () {
        console.log(`on capture fail`);
    }
}

export default styled(injectIntl(ContactScreen))`
    display: flex;
    flex-direction: column;
    flex: 1;

    form {
        height: 100%;
        width: 100%;
    }

    .iconContainer {
        color: #CCCCCC;
        display: flex;
        width: 100%;
        padding: 20px 0px;
        align-items: center;
        justify-content: center;
    }

    .subjectInput, .detailsInput {
        border-top: solid 1px ${props => props.theme.colors.graphColor4};
    }

    .toolbar {
        border-top: solid 1px ${props => props.theme.colors.graphColor4};
        display: flex;
        width: 100%;
        flex: 1;
        flex-direction: row;
        padding: 16px;

        .left {
            display: flex;
            flex: 1;
            align-items: flex-start;
            justify-content: flex-start;

            .selectImage {
                cursor: pointer;
            }
        }
        .right {
            display: flex;
            flex: 1;
            align-items: flex-start;
            justify-content: flex-end;
        }
    }
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
`;
