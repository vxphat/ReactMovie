import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import TreeView from '../../../components/TreeView'
import { Logo } from '../../../components/SVG'
import sidebarConfig from './sidebar-config'

import useToggle from '../../../hooks/useToggle'

import styles from './Sidebar.module.scss'
const cx = classNames.bind(styles)

const Sidebar = () => {
    const [isExpand, toggleIsExpand] = useToggle(false)

    return (
        <div className={cx(
            "wrapper",
            { expand: isExpand }
        )}>
            <Link to='/admin' className={cx("logoWrapper")}>
                {/* <div className={cx("logo")}>
                    <Logo width={40} height={40} />
                </div> */}
                <p><strong>WATCH</strong>TRAILER</p>
            </Link>
            <div
                className={cx("sidebarToggleBtn", {
                    active: isExpand
                })}
                onClick={toggleIsExpand}
            />
            <div className={cx("menu")}>
                <TreeView data={sidebarConfig} />
            </div>
        </div>
    )
}

export default Sidebar