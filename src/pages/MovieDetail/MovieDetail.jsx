import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import Grid from '@mui/material/Unstable_Grid2';

import Box from '../../components/Box';
import Button from '../../components/Button';
import TableData from '../../components/TableData';
import CustomLoadingOverlay from '../../components/TableData/CustomLoadingOverlay';
import CustomErrorOverLay from '../../components/TableData/CustomErrorOverLay';

import { getMovieDetail, deleteMovie } from '../../slices/movieSlice'
import Paragraph from '../../components/Paragraph';
import MovieEditFormModal from './MovieEditFormModal';
import MovieScheduleFormModal from './MovieScheduleFormModal';

import styles from './MovieDetail.module.scss'

const MovieDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { selectedMovie, loading, error } = useSelector(state => state.movie)

    const [isOpenEditForm, setIsOpenEditForm] = useState(false)
    const [isOpenScheduleForm, setIsOpenScheduleForm] = useState(false)

    useEffect(() => {
        dispatch(getMovieDetail(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleDelete = async () => {
        dispatch(deleteMovie(id))
            .unwrap()
            .then(() => {
                toast.success("Delete movie successfully")
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
            field: "maHeThongRap",
            headerName: "Center ID",
            flex: 1,
            minWidth: 100
        },
        {
            field: "tenHeThongRap",
            headerName: "Center name",
            renderCell: (params) => (
                <div className={styles.centerName}>
                    <img src={params.row.logo} alt="" />
                    <span>{params.row.tenHeThongRap}</span>
                </div>
            ),
            flex: 2,
            minWidth: 200
        },
        {
            field: "heThongRapChieu",
            headerName: "Number of Schedule",
            flex: 1,
            minWidth: 80,
            valueGetter: (params) => params.row.cumRapChieu.length
        }
    ];

    // <Collapse in={open} timeout="auto" unmountOnExit>
    //     <Box sx={{ margin: 1 }}>

    //     </Box>
    // </Collapse>
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h2>Movie</h2>
            </header>
            {/******** Movie Information ***********/}
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Box className={styles.container}>
                        <h3>Basic Infomation</h3>
                        <Grid container spacing={2}>
                            <Button solid className={styles.editBtn} onClick={() => setIsOpenEditForm(!isOpenEditForm)}>Edit</Button>
                            <Button solid className={styles.scheduleBtn} onClick={() => setIsOpenScheduleForm(!isOpenScheduleForm)}>Schedule</Button>
                            <Button solid className={styles.deleteBtn} onClick={handleDelete}>Delete</Button>
                            <Grid xs={12} md={4} display='flex' alignItems="flex-start" justifyContent="center">
                                <div className={styles.image}>
                                    <img src={selectedMovie.hinhAnh} alt="" />
                                </div>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <div className={styles.infoWrapper}>
                                    <div className={styles.info}>
                                        <h5>Movie ID:</h5>
                                        <span>{selectedMovie.maPhim}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <h5>Name:</h5>
                                        <span>{selectedMovie.tenPhim}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <h5>Trailer:</h5>
                                        <span>{selectedMovie.trailer}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <h5>Rating:</h5>
                                        <span>{selectedMovie.danhGia}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <h5>Show day</h5>
                                        <span>{selectedMovie.ngayKhoiChieu}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <h5>Status:</h5>
                                        <span className={styles.status}>
                                            {selectedMovie.hot &&
                                                <p className={styles.statusError}>Hot</p>}
                                            {selectedMovie.sapChieu &&
                                                <p className={styles.statusWarning}>Comming</p>}
                                            {selectedMovie.dangChieu &&
                                                <p className={styles.statusSuccess}>Showing</p>}
                                        </span>
                                    </div>
                                    <div className={styles.info}>
                                        <h5>Description:</h5>
                                        <Paragraph maxCharacters={130}>{selectedMovie.moTa}</Paragraph>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid xs={12}>
                    <Box className={styles.container}>
                        <h3>Advance Infomation</h3>
                        <TableData
                            rows={selectedMovie.schedule?.heThongRapChieu || []}
                            columns={columns}
                            getRowId={(row) => row.maHeThongRap}
                            rowsPerPageOptions={[10]}
                            pageSize={10}
                            loading={loading}
                            error={error ? error : null}
                            autoHeight
                        />
                    </Box>
                </Grid>
            </Grid>
            {/******** Movie edit modal ***********/}
            <MovieEditFormModal open={isOpenEditForm} onClose={() => setIsOpenEditForm(!isOpenEditForm)} />
            {/******** Movie Schedule modal ***********/}
            <MovieScheduleFormModal open={isOpenScheduleForm} onClose={() => setIsOpenScheduleForm(!isOpenScheduleForm)} />
        </div >
    )
}

export default MovieDetail