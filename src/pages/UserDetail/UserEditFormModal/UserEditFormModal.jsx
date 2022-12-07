import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify';

import Grid from '@mui/material/Unstable_Grid2';

import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import TextField from '../../../components/TextField';
import StyledSelect from '../../../components/Select';
import avatarDefault from '../../../assets/images/avatar-default.png'

import { getUserInfo } from '../../../slices/userSlice'
import useRequest from '../../../hooks/useRequest'
import userAPI from '../../../services/userAPI'

import styles from './UserEditFormModal.module.scss'

const UserEditFormModal = ({ open, onClose }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.user)

    const updateUser = useRequest(userAPI.updateUser, { manual: true })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control
    } = useForm({
        defaultValues: {
            taiKhoan: "",
            hoTen: "",
            matKhau: "",
            email: "",
            soDT: "",
            maLoaiNguoiDung: ""
        }
    })

    const handleToggle = (evt) => {
        evt.preventDefault()
        reset()
        onClose()
    }

    useEffect(() => {
        if (!open) return
        for (const [key, value] of Object.entries(selectedUser)) {
            setValue(key, value)
        }
        console.log("render")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const onSubmit = async (values) => {
        updateUser.runAsync(values)
            .then(() => {
                toast.success("Update user successfully")
                onClose()
                dispatch(getUserInfo(id))
            })
            .catch(error => {
                toast.error(error)
            })
    }

    return (
        <Modal
            open={open}
            title="Edit User"
            onClose={handleToggle}
            footer={(
                <>
                    <div className={styles.control}>
                        <Button
                            solid
                            onClick={handleSubmit(onSubmit)}
                            disable={updateUser.loading}
                        >
                            Update
                        </Button>
                        <Button
                            solid
                            onClick={handleToggle}
                        >
                            Cancel
                        </Button>
                    </div>
                    {updateUser.error &&
                        <p className={styles.errorMess}>{updateUser.error}</p>}
                </>
            )}
        >
            <form >
                <Grid container spacing={4} disableEqualOverflow>
                    <Grid xs={12} display="flex" justifyContent="center">
                        <div className={styles.avatar}>
                            <img src={selectedUser.hinhAnh || avatarDefault} alt="" />
                            <span>No Images</span>
                        </div>
                    </Grid>
                    <Grid xs={12} container spacing={4}>
                        <Grid xs={12}>
                            <input type="file" />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Username"
                                {...register("taiKhoan", {
                                    required: {
                                        value: true,
                                        message: "username is required"
                                    }
                                })}
                                error={errors.taiKhoan && errors.taiKhoan.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Full Name"
                                {...register("hoTen", {
                                    required: {
                                        value: true,
                                        message: "Full Name is required"
                                    }
                                })}
                                error={errors.hoTen && errors.hoTen.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    }
                                })}
                                error={errors.email && errors.email.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                {...register("soDT", {
                                    required: {
                                        value: true,
                                        message: "Phone Number is required"
                                    }
                                })}
                                error={errors.soDT && errors.soDT.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Password"
                                {...register("matKhau", {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    }
                                })}
                                error={errors.matKhau && errors.matKhau.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Controller
                                control={control}
                                name="maLoaiNguoiDung"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Role is required"
                                    }
                                }}
                                render={({ field }) => (
                                    <StyledSelect
                                        formRegister={field}
                                        options={[
                                            { label: "Admin", value: "QuanTri" },
                                            { label: "Customer", value: "KhachHang" }
                                        ]}
                                        label='Role'
                                        error={errors.maLoaiNguoiDung && errors.maLoaiNguoiDung.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Modal>
    )
}

export default UserEditFormModal