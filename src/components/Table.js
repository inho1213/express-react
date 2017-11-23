import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow'
import Pagination from 'react-js-pagination';

import './Table.css';

class Table extends React.Component {
    render() {
        const { title, header, items = [], pagination, rowClassName, columnClassName, onRowClick, onColumnClick, decorateColumn, onPageChange } = this.props;
        const columns = Object.keys(header);

        return (
            <div className="card mt-4">
                { title &&
                <div className="card-header">
                    <i className="fa fa-align-justify"></i> {title}
                </div>
                }
                <div className="card-block">
                    <div className="mb-4">{this.props.children}</div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {columns.map((column, index) => <th key={index}>{header[column]}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => 
                                <TableRow 
                                    key={index} 
                                    columns={columns} 
                                    item={item} 
                                    rowClassName={rowClassName}
                                    columnClassName={columnClassName}
                                    onRowClick={(item, columns, e) => {
                                        if (onRowClick) {
                                            onRowClick(item, columns, e);
                                        }
                                    }}
                                    onColumnClick={(key, value, e) => {
                                        if (onColumnClick) {
                                            onColumnClick(key, value, e);
                                        }
                                    }}
                                    decorateColumn={(key, value, item) => {
                                        if (decorateColumn) {
                                            return decorateColumn(key, value, item)
                                        }
                                        
                                        return value;
                                    }}
                                />)}
                        </tbody>
                    </table>
                    { pagination &&
                    <div className="row justify-content-center">
                        <Pagination
                            activePage={pagination.page * 1}
                            itemsCountPerPage={pagination.size * 1}
                            totalItemsCount={pagination.totalCount * 1}
                            pageRangeDisplayed={10}
                            itemClass="page-item"
                            linkClass="page-link"
                            onChange={(page) => {
                                if (onPageChange) {
                                    onPageChange(page);
                                }
                            }}
                        />
                    </div>
                    }
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    title: PropTypes.string,
    header: PropTypes.object.isRequired,
    items: PropTypes.array, 
    pagination: PropTypes.object,
    rowClassName: PropTypes.func,
    columnClassName: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowClick: PropTypes.func,
    onColumnClick: PropTypes.func,
}

export default Table;