const USER = 'user'
const THEME = 'theme'
const localService = {

    user: {
        set: (data) => {
            localStorage.setItem(USER, JSON.stringify(data))
        },
        get: () => {
            return JSON.parse(localStorage.getItem(USER))
        },
        remove: () => {
            localStorage.removeItem(USER)
        }
    },

    theme: {
        set: (data) => {
            localStorage.setItem(THEME, JSON.stringify(data))
        },
        get: () => {
            return JSON.parse(localStorage.getItem(THEME))
        },
        remove: () => {
            localStorage.removeItem(THEME)
        }
    }
}

export default localService