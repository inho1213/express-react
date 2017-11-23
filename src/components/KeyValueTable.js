import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

class KeyValueTable extends React.Component {
    render() {
        const { header, item, rowClassName, columnClassName } = this.props;
        
        return (
            <table className="table table-bordered">
                <tbody>
                {Object.keys(header).map((key, index) =>
                    <tr key={index} className={rowClassName && rowClassName(item)}>
                        <th scope="row">{header[key]}</th>
                        <td className={classnames('break-word', columnClassName && columnClassName(key, index, item))}>
                            {this.props.decorateColumn(key, item[key])}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}

KeyValueTable.propTypes = {
    header: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    decorateColumn: PropTypes.func.isRequired,
    rowClassName: PropTypes.func,
    columnClassName: PropTypes.func
}

export default KeyValueTable;