import { useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getMovies } from "../../slices/movieSlice";
import { toast } from 'react-toastify'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

import styles from './MovieList.module.scss'
import Button from '../../components/Button'
import MoreMenu from '../../components/MoreMenu'
import TableData from '../../components/TableData'

import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../../components/SearchBar";

const MovieList = () => {
    const naigate = useNavigate()
    const dispatch = useDispatch()
    const { movies, loading, error } = useSelector(state => state.movie)
    const [searchParams, setSearchParams] = useSearchParams({ tenPhim: "" })
    const searchValue = useDebounce(searchParams.get("tenPhim"), 300)

    const handleSelect = (action, id) => {
        switch (action) {
            case "delete": {
                dispatch(deleteMovie(id))
                    .unwrap()
                    .then(() => {
                        toast.success("Delete Movie successfully")
                        dispatch(getMovies())
                    })
                    .catch((error) => {
                        toast.error(error.message)
                    })
                break
            }

            case "edit": {
                naigate("/admin/movies/" + id)
                break
            }

            case "add-schedule": {
                naigate("/admin/movies/" + id)
                break
            }

            default:
                break
        }

    }

    const actions = [

        {
            title: "Edit",
            icon: <EditOutlinedIcon />,
            action: 'edit'
        },
        {
            title: "Schedule",
            icon: <CalendarMonthOutlinedIcon />,
            action: 'add-schedule'
        },
        {
            title: "Delete",
            icon: <DeleteOutline />,
            action: 'delete'
        }
    ]

    const menu = [
        {
            title: "Export report",
            icon: <LocalPrintshopOutlinedIcon />
        },
        {
            title: "Share",
            icon: <ShareOutlinedIcon />
        },
        {
            title: "Actions",
            icon: <UnfoldMoreOutlinedIcon />
        },
    ]

    const columns = useMemo(() => [
        {
            field: "hinhAnh",
            headerName: "Image",
            flex: 2,
            minWidth: 80,
            renderCell: (params) => {
                return (<img src={params.value} className={styles.movieImg} alt="" />)
            }
        },
        {
            field: "tenPhim",
            headerName: "Name",
            flex: 4,
            minWidth: 200
        },

        {
            field: "moTa",
            headerName: "Desciption",
            flex: 4,
            minWidth: 260
        },
        {
            field: "ngayKhoiChieu",
            headerName: "Showtime",
            flex: 3,
            minWidth: 220
        },
        {
            field: "action",
            headerName: "More",
            description: "Do more action with this",
            sortable: false,
            flex: 1,
            minWidth: 80,
            renderCell: (params) => {
                return (
                    <MoreMenu items={actions} placement='bottom-end' onChange={({ action }) => { handleSelect(action, params.row.maPhim) }}>
                        <MoreHorizOutlinedIcon />
                    </MoreMenu>
                );
            },
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [])

    const handleGetRowID = useCallback((row) => row.maPhim, [])

    useEffect(() => {
        dispatch(getMovies(searchValue))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])

    // console.log(movies)
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h2>Movies</h2>
                <div className={styles.controlWrapper}>
                    <SearchBar
                        outline
                        placeholder="Find movie"
                        value={searchParams.get("tenPhim")}
                        onChange={(e) => setSearchParams({ tenPhim: e.target.value })}
                        onClearValue={() => setSearchParams()}
                    />
                    <div className={styles.control}>
                        <Button
                            to='/admin/movies/new'
                            solid
                            leftIcon={<AddOutlinedIcon />}
                        >
                            Add Movie
                        </Button>
                        <MoreMenu items={menu} placement='bottom-end'>
                            <MoreVertOutlinedIcon fontSize='inherit' />
                        </MoreMenu>
                    </div>
                </div>
            </header>
            <TableData
                rows={movies}
                columns={columns}
                getRowId={handleGetRowID}
                autoRowHeight
                loading={loading}
                error={error ? error : null}
            />
        </div>
    )
}

export default MovieList