import React from 'react';
import styled from 'styled-components';

/**
 * Displays a table with data in rows and columns.
 * Props are:
 * - Array of data
 * - Columns to display
 * - Row click handler
 * E.g.
 *      columns: [
 *          { value: 'lastName', label: 'LAST_NAME' },
 *          { value: 'firstName', label: 'FIRST_NAME' }
 *      ]
 * 
 *      data: [
 *          { firstName: 'John', lastName: 'Lassiter', position: 'Vice President' },
 *          { firstName: 'Amber', lastName: 'Smith', position: 'President' },
 *          { firstName: 'Tim', lastName: 'Tess', position: 'CTO' },
 *          { firstName: 'Jess', lastName: 'Track', position: 'VP, Finance' },
 *          { firstName: 'Stark', lastName: 'Man', position: 'VP, Research' },
 *          { firstName: 'Bing', lastName: 'Ler', position: 'VP, Entertainment' },
 *          { firstName: 'Brad', lastName: 'Tip', position: 'President, Marketing' },
 *          { firstName: 'Sam', lastName: 'Rock', position: 'CEO' }
 *      ]
 * 
 *      onClick (rowData)
 */
export class List extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className={this.props.className}>
                {this.renderTable()}
            </div>
        );
    }

    renderTable () {
        if (this.props.data && this.props.data.length > 0) {
            return (
                <table>
                    {this.renderHeader()}
                    {this.renderData()}
                </table>
            )
        }
    }

    renderHeader () {
        if (this.props.columns && this.props.columns.length > 0) {
            return (
                <thead>
                    <tr>
                        {
                            this.props.columns.map((column, columnIndex) => {
                                return (
                                    <th key={`header${columnIndex}`}>{column.label}</th>
                                );
                            })
                        }
                    </tr>
                </thead>
            )
        }
    }

    renderData () {
        if (this.props.data && this.props.data.length > 0) {
            return (
                <tbody>
                    {
                        this.props.data.map((row, rowIndex) => {
                            return (
                                <tr key={`row${rowIndex}`}>
                                    {
                                        Object.keys(row).map((rowKey, rowKeyIndex) => {
                                            return (
                                                <td key={`column${rowKeyIndex}`}>{row[rowKey]}</td>
                                            );
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            )
        }
    }
}

export default styled(List)`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;

    table {
        th {
            text-align: left;
        }

        td {
            cursor: pointer;
        }
        
        width: 100%;
    }
`;