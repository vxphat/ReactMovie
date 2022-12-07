import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Unstable_Grid2';


import styles from './MovieNew.module.scss'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import StyledSelect from '../../components/Select/CustomSelect';

import cameraImg from '../../assets/images/camera.png'

import useRequest from '../../hooks/useRequest'
import movieAPI from '../../services/movieAPI'
import { useState } from 'react';

const MovieNew = () => {
    const [previewImage, setPreviewImage] = useState("")
    const createMovie = useRequest(movieAPI.createMovie, { manual: true })
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        getValues,
        control
    } = useForm({
        defaultValues: {
            tenPhim: "",
            biDanh: "",
            trailer: "",
            hinhAnh: "",
            moTa: "",
            ngayKhoiChieu: "",
            danhGia: "",
            dangChieu: "",
            sapChieu: "",
            hot: ""
        }
    })

    const onSubmit = async (values) => {
        const formData = new FormData()
        values.hinhAnh = values.hinhAnh[0]
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value)
        }

        createMovie.runAsync(formData)
            .then(() => {
                toast.success("Create a new Movie successfully")
                setPreviewImage("")
                reset()
            })
            .catch((error) => {
                toast.error(error)
            })
    }

    const handlePreviewImage = () => {
        URL.revokeObjectURL(previewImage)
        const file = getValues("hinhAnh")[0]
        if (file) {
            const imageURL = URL.createObjectURL(file)
            setPreviewImage(imageURL)
        }
    }


    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4} disableEqualOverflow>
                    <Grid xs={12} md={4} display="flex" justifyContent="center" alignItems="flex-start">
                        <div className={`${styles.image} ${previewImage ? "" : styles.noImage}`}>
                            <img src={previewImage || cameraImg} alt="" />
                        </div>
                    </Grid>
                    <Grid xs={12} md={8} container spacing={4}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                type="file"
                                {...register('hinhAnh', {
                                    required: {
                                        value: true,
                                        message: "Image is required"
                                    },
                                    onChange: () => handlePreviewImage()
                                })}
                                error={errors.hinhAnh?.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Film Trailer url"
                                {...register('trailer', {
                                    required: {
                                        value: true,
                                        message: "Film Trailer url is required"
                                    }
                                })}
                                error={errors.trailer?.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Movie Name"
                                {...register('tenPhim', {
                                    required: {
                                        value: true,
                                        message: "Movie Name is required"
                                    }
                                })}
                                error={errors.tenPhim?.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Alias Name"
                                {...register('biDanh', {
                                    required: {
                                        value: true,
                                        message: "Alias Name is required"
                                    }
                                })}
                                error={errors.biDanh?.message}
                            />
                        </Grid>
                        <Grid xs={12} >
                            <TextField
                                type='textarea'
                                rows={3}
                                label="Description"
                                {...register('moTa', {
                                    required: {
                                        value: true,
                                        message: "Description is required"
                                    }
                                })}
                                error={errors.moTa?.message}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                label="Show Time Day"
                                {...register('ngayKhoiChieu', {
                                    required: {
                                        value: true,
                                        message: "Show Time Day is required"
                                    }
                                })}
                                error={errors.ngayKhoiChieu?.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Rating"
                                type='number'
                                min='0'
                                max='10'
                                {...register('danhGia')}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Controller
                                control={control}
                                name="hot"
                                render={({ field }) => (
                                    <StyledSelect
                                        formRegister={field}
                                        options={[
                                            { label: "Hot", value: true },
                                            { label: "Normal", value: false }
                                        ]}
                                        label='Hot'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Controller
                                control={control}
                                name="dangChieu"
                                render={({ field }) => (
                                    <StyledSelect
                                        formRegister={field}
                                        options={[
                                            { label: "Show", value: true },
                                            { label: "Not Show", value: false }
                                        ]}
                                        label='Show'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Controller
                                control={control}
                                name="sapChieu"
                                render={({ field }) => (
                                    <StyledSelect
                                        formRegister={field}
                                        options={[
                                            { label: "Comming", value: true },
                                            { label: "Not Comming", value: false }
                                        ]}
                                        label='Comming'
                                    />
                                )}
                            />
                        </Grid>
                        <div className={styles.control}>
                            <Button
                                solid
                                primary
                                disable={createMovie.loading}
                            >
                                Create
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                {createMovie.error && <p className={styles.errorMess}>{createMovie.error}</p>}
            </form>
        </div>
    )
}

export default MovieNew