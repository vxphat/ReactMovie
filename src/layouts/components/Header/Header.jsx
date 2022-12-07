import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import classNames from 'classnames/bind';

import Button from '../../../components/Button'
import ThemeToggle from './ThemeToggle';
import AccountMenu from './AccountMenu';
import SearchBar from '../../../components/SearchBar';

import styles from './Header.module.scss'
const cx = classNames.bind(styles)

const Header = () => {
    return (
        <div className={cx("wrapper")}>
            <SearchBar />
            <div className={cx("control")}>
                <ThemeToggle />
                <Button className={cx("notificates")}>
                    <NotificationsNoneOutlinedIcon fontSize='inherit' />
                </Button>
                <AccountMenu />
            </div>
        </div>
    )
}

export default Header