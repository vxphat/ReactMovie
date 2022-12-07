import fetcher from './fetcher'

const authAPI = {
    login: (values) => {
        return fetcher.post("/QuanLyNguoiDung/DangNhap", values)
    },
    register: (values) => {
        return fetcher.post("/QuanLyNguoiDung/DangKy", { ...values, maNhom: "GP15" })
    },
}


export default authAPI
