import PropTypes from 'prop-types';

import styles from './Box.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
const Box = ({ children, className, ...passProp }) => {
    return (
        <div
            {...passProp}
            className={cx("wrapper", { [className]: className })}
        >
            {children}
        </div>
    )
}

Box.propType = {
    children: PropTypes.node,
    className: PropTypes.string
}

export default Box