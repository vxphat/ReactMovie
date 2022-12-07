import HomeIcon from '@mui/icons-material/Home';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';

const config = [
    {
        root: true,
        title: "Dashboard",
        icon: <HomeIcon fontSize='inherit' color='inherit' />,
        to: "/admin",
    },
    {
        root: true,
        title: "User Manage",
        separate: true,
        expanded: true,
        icon: <ManageAccountsOutlinedIcon fontSize='inherit' color='inherit' />,
        children: [
            {
                title: "Users",
                to: '/admin/users'
            },
            {
                title: "Add User",
                to: '/admin/users/new'
            }
        ]
    },
    {
        root: true,
        title: "Movies Manage",
        separate: true,
        icon: <LiveTvOutlinedIcon fontSize='inherit' color='inherit' />,
        expanded: true,
        children: [
            {
                title: "Movies",
                to: '/admin/movies'
            },
            {
                title: "Add Movie",
                to: '/admin/movies/new'
            }
        ]
    },
    {
        root: true,
        title: "Quick Menu",
        icon: <AppsOutlinedIcon fontSize='inherit' color='inherit' />,
        separate: true,
        children: [
            {
                title: "Users",
                to: '/admin/users'
            },
            {
                title: "Add User",
                to: '/admin/users/new'

            },
            {
                title: "Movies",
                to: '/admin/movies'
            },
            {
                title: "Add Movie",
                to: '/admin/movies/new'
            },
            {
                title: "Cimema",
                to: '/admin/cinema'
            }
        ]
    },
    {
        root: true,
        title: "Notificate",
        separate: true,
        icon: <MarkEmailUnreadOutlinedIcon fontSize='inherit' color='inherit' />,
        children: [
            {
                title: "Email",
                to: '/admin/email'
            },
            {
                title: "Feedback",
                to: '/admin/feedback'
            },
            {
                title: "Message",
                to: '/admin/message'
            }
        ]
    },
    {
        root: true,
        separate: true,
        title: "Documentation",
        icon: <TextSnippetOutlinedIcon fontSize='inherit' color='inherit' />,
        to: '/admin/documentation'
    },
]

export default config