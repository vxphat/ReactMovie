import { useContext } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import themeContext from '../../../../context/themeContext'

import styles from './ThemeToggle.module.scss'
import classname from 'classnames/bind'
const cx = classname.bind(styles)


const ThemeToggle = () => {
    const [theme, setTheme] = useContext(themeContext)
    return (
        <div className={cx("theme", { [theme]: theme })} onClick={() => {

            setTheme(theme => {
                if (theme === 'light-theme') return 'dark-theme'
                if (theme === 'dark-theme') return 'light-theme'
                return theme
            })
        }}>
            <LightModeOutlinedIcon fontSize='inherit' color='inherit' />
            <DarkModeIcon fontSize='inherit' color='inherit' />
        </div>
    )
}

export default ThemeToggle