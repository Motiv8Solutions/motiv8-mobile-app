import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export class Modal extends React.Component {
    render () {
        return (
            <ReactModal className={this.props.className} {...this.props}/>
        );
    }
}

export default styled(Modal)`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: papayawhip;
`;