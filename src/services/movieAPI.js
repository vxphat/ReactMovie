import fetcher from './fetcher'


const movieAPI = {
    getBanners: () => {
        return fetcher("/QuanLyPhim/LayDanhSachBanner")
    },

    getMovieDetail: (MaPhim) => {
        return fetcher("/QuanLyPhim/LayThongTinPhim", {
            params: {
                maNhom: "GP15",
                MaPhim
            }
        })
    },

    getMovies: (tenPhim) => {
        // tenPhim là falsy thì data trả về là string "không tìm thấy" không phải mảng rỗng []
        //  làm render gây lỗi ,vậy nên kiểm tra điều kiện
        if (tenPhim) {
            return fetcher("/QuanLyPhim/LayDanhSachPhim", {
                params: {
                    maNhom: "GP15",
                    tenPhim
                }
            })
        }
        return fetcher("/QuanLyPhim/LayDanhSachPhim", {
            params: {
                maNhom: "GP15",
            }
        })
    },

    getMoviesPagination: (values) => {
        return fetcher("/QuanLyPhim/LayDanhSachPhimPhanTrang", {
            params: {
                maNhom: "GP15",
                ...values
            }
        })
    },

    getMovieByDay: (values) => {
        return fetcher("/QuanLyPhim/LayDanhSachPhimTheoNgay", {
            params: {
                maNhom: "GP15",
                ...values
            }
        })
    },

    createMovie: (values) => {
        values.append("maNhom", "GP15")
        return fetcher.post("/QuanLyPhim/ThemPhimUploadHinh", values)
    },

    updateMovie: (values) => {
        return fetcher.post("/QuanLyPhim/CapNhatPhimUpload", values)
    },

    deleteMovie: (maPhim) => {
        return fetcher.delete("/QuanLyPhim/XoaPhim", {
            params: {
                maPhim
            }
        })
    },
}

export default movieAPI