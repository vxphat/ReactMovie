import PropTypes from 'prop-types';
import classnames from 'classnames/bind'

import styles from './Divider.module.scss'
const cx = classnames.bind(styles)

const Divider = ({
    children,
    orientation = 'horizontal',
    textAlign = 'center',
    variant = 'fullWidth',

}) => {
    const customClass = cx("divider", {
        [orientation]: orientation,
        [textAlign]: textAlign,
        [variant]: variant,
        content: children
    })

    return children ? (
        <div className={customClass}>
            <span>
                {children}
            </span>
        </div>
    ) : (
        <hr className={customClass} />
    )
}

Divider.propTypes = {
    children: PropTypes.node,
    orientation: PropTypes.string,
    textAlign: PropTypes.string,
    variant: PropTypes.string,
}


export default Divider