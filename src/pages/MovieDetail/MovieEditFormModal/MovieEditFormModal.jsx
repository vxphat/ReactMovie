import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify';

import Grid from '@mui/material/Unstable_Grid2';

import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import TextField from '../../../components/TextField';
import StyledSelect from '../../../components/Select';

import useRequest from '../../../hooks/useRequest'
import movieAPI from '../../../services/movieAPI'
import { getMovieDetail } from '../../../slices/movieSlice'

import styles from './MovieEditFormModal.module.scss'

const MovieEditFormModal = ({ open = false, onClose }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [previewImage, setPreviewImage] = useState("")
    const { selectedMovie } = useSelector(state => state.movie)

    const updateMovie = useRequest(movieAPI.updateMovie, { manual: true })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue,
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
        },
    })

    const handlePreviewImage = () => {
        URL.revokeObjectURL(previewImage)
        const file = getValues("hinhAnh")[0]
        if (file && file instanceof File) {
            const imageURL = URL.createObjectURL(file)
            setPreviewImage(imageURL)
        }
    }

    useEffect(() => {
        if (!open) return
        for (const [key, value] of Object.entries(selectedMovie)) {
            setValue(key, value)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const onSubmit = async (values) => {
        const formData = new FormData()
        console.log(values)

        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value)
        }

        updateMovie.runAsync(formData)
            .then(() => {
                toast.success("Update film successfully")
                console.log("asdas")
                onClose()
                dispatch(getMovieDetail(id))
            })
            .catch(error => {
                toast.error(error)
            })
    }

    const handleCloseForm = () => {
        onClose()
        reset()
    }
    return (
        <Modal
            open={open}
            title="Edit User"
            onClose={handleCloseForm}
            footer={(
                <>
                    <div className={styles.control}>
                        <Button
                            solid
                            onClick={handleSubmit(onSubmit)}
                            disable={updateMovie.loading}
                        >
                            Update
                        </Button>
                        <Button
                            solid
                            onClick={handleCloseForm}
                        >
                            Cancel
                        </Button>
                    </div>
                    {updateMovie.error &&
                        <p className={styles.errorMess}>{updateMovie.error}</p>}
                </>
            )}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4} disableEqualOverflow>
                    <Grid xs={12} md={4} display="flex" justifyContent="center" alignItems="flex-start">
                        <div className={styles.image}>
                            <img src={previewImage || selectedMovie.hinhAnh} alt="" />
                        </div>
                    </Grid>
                    <Grid xs={12} md={8} container spacing={4}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                type="file"
                                {...register('hinhAnh', {
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
                                {...register('danhGia', {
                                    valueAsNumber: true,
                                    min: 0,
                                    max: 10
                                })}
                                error={errors.danhGia && "Rating Point in range 0-10"}
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
                    </Grid>
                </Grid>
            </form>
        </Modal>
    )
}

export default MovieEditFormModal