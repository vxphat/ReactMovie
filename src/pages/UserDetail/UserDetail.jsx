import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import Grid from '@mui/material/Unstable_Grid2';

import styles from './UserDetail.module.scss'
import Box from '../../components/Box';
import TableData from '../../components/TableData';
import Button from '../../components/Button';
import CustomLoadingOverlay from '../../components/TableData/CustomLoadingOverlay';
import CustomErrorOverLay from '../../components/TableData/CustomErrorOverLay';
import avatarDefault from '../../assets/images/avatar-default.png'

import { getUserInfo, deleteUser } from '../../slices/userSlice'
import UserEditFormModal from './UserEditFormModal';

const UserDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { selectedUser, loading, error } = useSelector(state => state.user)

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        dispatch(getUserInfo(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    const handleDelete = async () => {
        dispatch(deleteUser(id))
            .unwrap()
            .then(() => {
                toast.success("Delete user successfully")
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    if (loading) {
        return <CustomLoadingOverlay />
    }

    if (error) {
        return <CustomErrorOverLay />
    }

    const columns = [
        {
            field: "maVe",
            headerName: "Ticket ID",
            flex: 1,
            minWidth: 120
        },
        {
            field: "tenPhim",
            headerName: "Movie Name",
            flex: 2,
            minWidth: 260
        },
        {
            field: "thoiLuongPhim",
            headerName: "Range",
            flex: 1,
            minWidth: 80,
            valueGetter: (params) => params.row.thoiLuongPhim + "'"
        },
        {
            field: "giaVe",
            headerName: "Price",
            valueGetter: (params) => params.row?.giaVe?.toLocaleString("vn-VN") + ' VND',
            flex: 1,
            minWidth: 150
        },
        {
            field: "ngayDat",
            headerName: "Booking day",
            flex: 2,
            minWidth: 240
        }
    ];

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h2>User</h2>
            </header>
            {/******** User information /********/}
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Box className={styles.container}>
                        <h3>Basic Infomation</h3>
                        <Grid container spacing={2}>
                            <Button solid className={styles.editBtn} onClick={() => setIsOpen(!isOpen)}>Edit</Button>
                            <Button solid className={styles.deleteBtn} onClick={handleDelete}>Delete</Button>
                            <Grid xs={12} md={4} display='flex' alignItems="flex-start" justifyContent="center">
                                <div className={styles.avatar}>
                                    <img src={selectedUser.hinhAnh || avatarDefault} alt="" />
                                </div>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <div className={styles.infoWrapper}>
                                    <div className={styles.info}>
                                        <p>Name:</p>
                                        <span>{selectedUser.hoTen}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <p>Username:</p>
                                        <span>{selectedUser.taiKhoan}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <p>Email:</p>
                                        <span>{selectedUser.email}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <p>Phone Number:</p>
                                        <span>{selectedUser.soDT}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <p>Role:</p>
                                        <span>{selectedUser.maLoaiNguoiDung}</span>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid >
                <Grid xs={12}>
                    <Box className={styles.container}>
                        <h3>Advandce Infomation</h3>
                        <TableData
                            rows={selectedUser.thongTinDatVe || []}
                            columns={columns}
                            getRowId={(row) => row.maVe}
                            rowsPerPageOptions={[10]}
                            pageSize={10}
                            loading={loading}
                            error={error ? error : null}
                            autoHeight
                        />
                    </Box>
                </Grid>
            </Grid>
            {/******** Modal edit user **********/}
            <UserEditFormModal open={isOpen} onClose={() => setIsOpen(!isOpen)} />
        </div >
    )
}

export default UserDetail