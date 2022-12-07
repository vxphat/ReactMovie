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
import ticketAPI from '../../../services/ticketAPI'
import theaterAPI from '../../../services/theaterAPI'
import { getMovieDetail } from '../../../slices/movieSlice'

import styles from './MovieScheduleFormModal.module.scss'

const MovieScheduleFormModal = ({ open = false, onClose }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { selectedMovie } = useSelector(state => state.movie)

    const createSchedule = useRequest(ticketAPI.createSchedule, { manual: true })
    const getCenters = useRequest(theaterAPI.getCenters, { manual: true })
    const getTheaters = useRequest(theaterAPI.getTheaters, { manual: true })
    const [selectedTheaterGroup, setSelectedTheaterGroup] = useState({})

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
            maPhim: "",
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: "",
            maHeThongRap: "",
            maCumRap: "",
        },
    })

    useEffect(() => {
        if (!open) return
        setValue("maPhim", selectedMovie.maPhim)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    useEffect(() => {
        if (!open) return
        getCenters.runAsync()
            .catch(() => { })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const handleSelectCenter = () => {
        setValue("maCumRap", "")
        setValue("maRap", "")

        const centerID = getValues("maHeThongRap")
        getTheaters.runAsync(centerID)
            .then(data => {
                console.log(data)
            })
            .catch(() => { })
    }

    const handleSelectTheaterGroup = () => {
        setValue("maRap", "")

        const theaterGroupID = getValues("maCumRap")
        if (!theaterGroupID) return

        const theaterGroup = getTheaters.data?.find(item => item.maCumRap === theaterGroupID)
        setSelectedTheaterGroup(theaterGroup)
    }

    const onSubmit = async (values) => {
        const { maHeThongRap, maCumRap, ...info } = values
        info.maRap = maCumRap
        createSchedule.runAsync(info)
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
            title="Movie Schedule"
            onClose={handleCloseForm}
            footer={(
                <>
                    <div className={styles.control}>
                        <Button
                            solid
                            onClick={handleSubmit(onSubmit)}
                            disable={createSchedule.loading}
                        >
                            Confirm
                        </Button>
                        <Button
                            solid
                            onClick={handleCloseForm}
                        >
                            Cancel
                        </Button>
                    </div>
                    {createSchedule.error &&
                        <p className={styles.errorMess}>{createSchedule.error}</p>}
                </>
            )}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4} disableEqualOverflow alignItems="flex-start">
                    <Grid xs={12} md={4} display="flex" justifyContent="center" alignItems="flex-start">
                        <div className={styles.image}>
                            <img src={selectedMovie.hinhAnh} alt="" />
                        </div>
                    </Grid>
                    <Grid xs={12} md={8} container spacing={4}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                readOnly
                                label="Movie ID"
                                {...register('maPhim', {
                                    required: {
                                        value: true,
                                        message: "Movie ID is required"
                                    }
                                })}
                                error={errors.maPhim?.message}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                label="Ticket Price"
                                type='number'
                                {...register('giaVe', {
                                    required: {
                                        value: true,
                                        message: "Ticket Price is required"
                                    }
                                })}
                                error={errors.giaVe?.message}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                label="Schedule time"
                                {...register('ngayChieuGioChieu', {
                                    required: {
                                        value: true,
                                        message: "Schedule time is required"
                                    }
                                })}
                                error={errors.ngayChieuGioChieu?.message}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Controller
                                name='maHeThongRap'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Cinema center is required"
                                    },
                                    onChange: () => handleSelectCenter()
                                }}
                                render={({ field }) => (
                                    <StyledSelect
                                        formRegister={field}
                                        loading={getCenters.loading}
                                        options={
                                            getCenters.data?.map(center => (
                                                {
                                                    label: center.tenHeThongRap,
                                                    value: center.maHeThongRap
                                                }
                                            )) || []}
                                        label="Cinema center"
                                        error={errors.maHeThongRap?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Controller
                                name='maCumRap'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Theater group is required"
                                    },
                                    onChange: () => handleSelectTheaterGroup()
                                }}
                                render={({ field }) => (
                                    <StyledSelect
                                        formRegister={field}
                                        label="Theater group"
                                        loading={getTheaters.loading}
                                        options={
                                            getTheaters.data?.map(theater => (
                                                {
                                                    label: theater.tenCumRap,
                                                    value: theater.maCumRap
                                                })) || []}
                                        error={errors.maCumRap?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Controller
                                name='maRap'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Theater ID is required"
                                    }
                                }}
                                render={({ field }) => (
                                    <StyledSelect
                                        formRegister={field}
                                        label="Theater ID"
                                        options={selectedTheaterGroup.danhSachRap?.map(item => ({
                                            label: item.tenRap,
                                            value: item.maRap
                                        }))}
                                        error={errors.maRap?.message}
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

export default MovieScheduleFormModal