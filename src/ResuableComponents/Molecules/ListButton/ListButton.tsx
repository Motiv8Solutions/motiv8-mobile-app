import * as React from 'react';
import styled from 'styled-components';
import Button from './../../Atoms/Button/Button';
import Modal from './../Modal/Modal';
import ListContainer from './../List/ListContainer';

export class ListButton extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
        this.state = {
            showModal: false
        };
        this.listButtonClickHandler = this.listButtonClickHandler.bind(this);
        this.listCloseButtonClickHandler = this.listCloseButtonClickHandler.bind(this);
    }

    render () {
        return (
            <div className={this.props.className}>
                <Button label={this.props.label} onClick={this.listButtonClickHandler}/>
                <Modal isOpen={this.state.showModal}>
                    <ListContainer label={this.props.label} content={this.props.content} onClose={this.listCloseButtonClickHandler}/>
                </Modal>
            </div>
        );
    }

    listButtonClickHandler () {
        this.setState({
            showModal: true
        });
    }

    listCloseButtonClickHandler () {
        this.setState({
            showModal: false
        });
    }
}

export default styled(ListButton)`
`;