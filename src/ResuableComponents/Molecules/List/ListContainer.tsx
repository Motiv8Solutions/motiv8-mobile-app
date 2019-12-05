import * as React from 'react';
import styled from 'styled-components';
import List from './List';
import ListService from './../../../Services/ListService';

/**
 * This component is a container for the List. The component
 * is passed the content of the ListButton form.
 * The content contains the URL to get the list data.
 * The label contains the name of the list to display.
 */
export class ListContainer extends React.Component<any, any> {
    listService: ListService = null;
    constructor (props: any) {
        super(props);
        this.state = {
            columns: [],
            data: []
        };
        this.listService = new ListService();
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    async componentDidMount () {
        let list = this.props.content.list;
        console.log(`content url: ${list}`);
        let listResponse: any = await this.listService.getList(list, this.props.tenantId);
        if (listResponse.status === 200) {
            this.setState({
                columns: listResponse.data.columns,
                data: listResponse.data.data
            });
        } else {
            throw new Error(`The ListService.getList method returned a status other than 200. Status returned: ${listResponse.status}`);
        }
    }

    render () {
        return (
            <div className={this.props.className}>
                <div className='header'>
                    <div className='left'></div>
                    <div className='center'>
                        {this.props.label}
                    </div>
                    <div className='right'>
                        <button onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
                <div className='body'>
                    <List columns={this.state.columns} data={this.state.data} onClick={this.handleRowClick}/>
                </div>
            </div>
        );
    }

    handleRowClick () {

    }
}

export default styled(ListContainer)`
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        flex-direction: row;
        flex: 1;
        min-height: 48px;
        max-height: 48px;
        border-bottom: solid 1px #cccccc;
        align-items: center;
        
        .left {

        }

        .center {
            display: flex;
            flex: 1;
            justify-content: center;
        }

        .right {

        }
    }

    .body {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
`;