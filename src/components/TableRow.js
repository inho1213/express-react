import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import './Table.css';

class TableRow extends React.Component {
    render() {
        const { columns, item, rowClassName, columnClassName } = this.props;
        
        return (
            <tr 
                className={classnames(rowClassName && rowClassName(item))}
                onClick={(e) => {
                    this.props.onRowClick(item, columns, e);
                }}>
                {columns.map((column, index) => 
                    <td 
                        key={index} 
                        className={classnames("break-word", columnClassName && columnClassName(column, index, item))}
                        onClick={(e) => {
                            this.props.onColumnClick(column, item[column], e);
                        }}>
                        {this.props.decorateColumn(column, item[column], item)}
                    </td>)}
            </tr>
        );
    }
}

TableRow.propTypes = {
    rowClassName: PropTypes.func,
    columnClassName: PropTypes.func,
    columns: PropTypes.array.isRequired,
    item: PropTypes.object.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onColumnClick: PropTypes.func.isRequired,
    decorateColumn: PropTypes.func.isRequired
}

export default TableRow;