import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import MoreMenu from '../../../../components/MoreMenu'
import Button from '../../../../components/Button'
import styles from './AccountMenu.module.scss'
import { logout } from '../../../../slices/authSlice'

const AccountMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    // console.log("AccountMenu route")

    const menu = [
        { title: "Profile", action: "get-profile" },
        { title: "Setting" },
        { title: "Logout", action: 'logout', seperate: true },
    ]

    const handleChange = (item) => {
        if (item.action === 'logout') {
            dispatch(logout())
        }
        if (item.action === 'get-profile') {
            navigate('/admin/users/' + user.taiKhoan)
        }
    }


    return (
        <MoreMenu items={menu} onChange={handleChange}>
            <Button className={styles.wrapper}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR57ONPNiLaFeSnCQtaE88VndhSSNq9yEphQ&usqp=CAU" alt="" />
            </Button>
        </MoreMenu>
    )
}

export default AccountMenu