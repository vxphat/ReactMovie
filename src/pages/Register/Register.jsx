import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Grid from '@mui/material/Unstable_Grid2';

import styles from './Register.module.scss'
import { Logo } from '../../components/SVG'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

import authAPI from '../../services/authAPI'
import useRequest from '../../hooks/useRequest';

const Register = () => {
    const navigate = useNavigate()
    const registerRequest = useRequest(authAPI.register, { manual: true })
    const [isAccept, setIsAccept] = useState(false)

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: { taiKhoan: "", matKhau: "", email: "", soDt: "", fisrtName: "", lastName: "", confirmPass: "" }
    })

    const onSubmit = async (values) => {
        registerRequest.runAsync({ ...values, hoTen: values.fisrtName + " " + values.lastName })
            .then(() => {
                toast.success("Register successfully")
                navigate("/login", {
                    state: {
                        taiKhoan: values.taiKhoan,
                        matKhau: values.matKhau
                    }
                })
            })
            .catch((error) => {
                toast.error("Error: " + error)
            })
    }

    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <Logo width={50} height={50} />
                    <h1>Welcome</h1>
                </div>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <h3>Register</h3>
                        <span>
                            or <Link to="/login" className={styles.link}>Already have an account?</Link>
                        </span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6} display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="Fisrt name"
                                    {...register("fisrtName", {
                                        required: {
                                            value: true,
                                            message: "Fisrt name is required"
                                        }
                                    })}
                                    error={errors.fisrtName && errors.fisrtName.message}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="Last Name"
                                    {...register("lastName", {
                                        required: {
                                            value: true,
                                            message: "Last name is required"
                                        }
                                    })}
                                    error={errors.lastName && errors.lastName.message}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            label="Username"
                            {...register("taiKhoan", {
                                required: {
                                    value: true,
                                    message: "Username is required"
                                }
                            })}
                            error={errors.taiKhoan && errors.taiKhoan.message}
                        />
                        <TextField
                            type='password'
                            label="Password"
                            {...register("matKhau", {
                                required: {
                                    value: true,
                                    message: "password is required"
                                }
                            })}
                            error={errors.matKhau && errors.matKhau.message}
                        />
                        <TextField
                            label="Email address"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email address is required"
                                },
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Your email is not match format xxx@xxx.xxx"
                                }
                            })}
                            error={errors.email && errors.email.message}
                        />
                        <TextField
                            type='password'
                            label="Confirm Password"
                            {...register("confirmPass", {
                                validate: (value) => {
                                    if (value !== watch("matKhau")) {
                                        return "Your passwords do no match"
                                    }
                                }
                            })}
                            error={errors.confirmPass && errors.confirmPass.message}
                        />
                        <div className={styles.control}>
                            <div className={styles.accept}>
                                <input
                                    type="checkbox"
                                    id={styles.accept}
                                    onChange={() => setIsAccept(prev => !prev)}
                                />
                                <label htmlFor={styles.accept}>
                                    I agree with
                                    <Link to="/contract-lience" className={styles.link}>Terms & Conditions</Link>
                                    and have understood
                                    <Link to='/policy' className={styles.link}>Privacy Policy </Link>
                                </label>
                            </div>
                        </div>
                        {registerRequest.error && <p className={styles.errorMess}>{registerRequest.error}</p>}
                        <Button
                            solid
                            primary
                            large
                            disable={registerRequest.loading || !isAccept}
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register