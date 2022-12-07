import PropTypes from 'prop-types';
import { memo } from 'react'
import classnames from 'classnames/bind'
import styles from './Tree.module.scss'

import TreeItem from './TreeItem'
const cx = classnames.bind(styles)

const TreeView = ({ data = [], visible = true, children }) => {

    return (
        <ul className={cx("list", { visible })} >
            {data.map((node, index) => (
                <TreeItem node={node} key={index} />
            ))}
            {children}
        </ul>
    )
}

TreeView.propTypes = {
    data: PropTypes.array.isRequired,
    children: PropTypes.node,
    visible: PropTypes.bool
}

export default memo(TreeView)