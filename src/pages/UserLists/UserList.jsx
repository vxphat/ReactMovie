import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import styles from './UserList.module.scss'
import Button from '../../components/Button'
import SearchBar from '../../components/SearchBar'
import MoreMenu from '../../components/MoreMenu'
import TableData from '../../components/TableData'

import { getUsers, deleteUser } from '../../slices/userSlice'
import useDebounce from "../../hooks/useDebounce"

const UserList = () => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector(state => state.user)
    const [searchParams, setSearchParams] = useSearchParams({ tuKhoa: "" })
    const searchValue = useDebounce(searchParams.get("tuKhoa"), 300)
    const naigate = useNavigate()

    const handleSelect = (action, id) => {
        switch (action) {
            case "delete": {
                dispatch(deleteUser(id))
                    .unwrap()
                    .then((data) => {
                        toast.success(data)
                        dispatch(getUsers())
                    })
                    .catch((error) => {
                        toast.error(error.message)
                    })

                break
            }

            case "edit": {
                naigate("/admin/users/" + id)
                break
            }

            default:
                break
        }

    }

    useEffect(() => {
        dispatch(getUsers(searchValue))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])

    // menu dropdown cho table
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

    // menu dropdown cho mỗi table row
    const actionsMenu = [
        {
            title: "Edit",
            icon: <EditOutlinedIcon />,
            action: 'edit'
        },
        {
            title: "Delete",
            icon: <DeleteOutline />,
            action: 'delete'
        },
    ]

    // columns,các cột hiển thị trên table
    const columns = useMemo(() => [
        {
            field: "hoTen",
            headerName: "Fullname",
            flex: 2,
            minWidth: 150
        },
        {
            field: "taiKhoan",
            headerName: "User",
            flex: 2,
            minWidth: 150
        },
        {
            field: "email",
            headerName: "Email",
            flex: 2,
            minWidth: 260
        },
        {
            field: "soDT",
            headerName: "Phone",
            flex: 2,
            minWidth: 150
        },
        {
            field: "maLoaiNguoiDung",
            headerName: "Role",
            flex: 1,
            minWidth: 150
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
                    <MoreMenu
                        items={actionsMenu}
                        placement='bottom-end'
                        onChange={(item) => handleSelect(item.action, params.row.taiKhoan)}
                    >
                        <MoreHorizOutlinedIcon />
                    </MoreMenu>
                )
            },
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [])
    const handleRowId = useCallback((row) => {
        return row.taiKhoan
    }, [])
    // console.log(users)

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h2>Users</h2>
                <div className={styles.controlWrapper}>
                    <SearchBar
                        outline
                        placeholder="Find User"
                        value={searchParams.get("tuKhoa")}
                        onChange={(e) => setSearchParams({ tuKhoa: e.target.value })}
                        onClearValue={() => setSearchParams()}
                    />
                    <div className={styles.control}>
                        <Button
                            to='/admin/users/new'
                            solid
                            leftIcon={<AddOutlinedIcon />}
                        >
                            Add User
                        </Button>
                        <MoreMenu items={menu} placement='bottom-end'>
                            <MoreVertOutlinedIcon fontSize='inherit' />
                        </MoreMenu>
                    </div>
                </div>
            </header>
            <TableData
                rows={users}
                columns={columns}
                getRowId={handleRowId}
                loading={loading}
                error={error ? error : null}
            />
        </div>
    )
}

export default UserList