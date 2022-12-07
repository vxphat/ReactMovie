import './styles.scss'
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

const GlobalStyles = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    )
}

export default GlobalStyles