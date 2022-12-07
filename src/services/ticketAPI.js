import fetcher from './fetcher'


const ticketAPI = {
    getListTicket: (MaLichChieu) => {
        return fetcher('/QuanLyDatVe/LayDanhSachPhongVe', {
            params: {
                MaLichChieu
            }
        })
    },

    createSchedule: (values) => {
        return fetcher.post("/QuanLyDatVe/TaoLichChieu", values)
    },

    bookTicket: (values) => {
        return fetcher.post("/QuanLyDatVe/DatVe", values)
    }
}

export default ticketAPI