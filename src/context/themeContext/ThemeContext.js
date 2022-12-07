import { createContext, useState, useEffect } from "react";
import localService from "../../services/localService";
import styles from './Theme.module.scss'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localService.theme.get() || "light-theme")
    localService.theme.set(theme)

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            <div className={`${styles.theme} ${styles[theme]}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeContext