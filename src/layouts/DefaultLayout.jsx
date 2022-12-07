import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import styles from './defaultLayout.module.scss'

const DefaultLayout = () => {

    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default DefaultLayout