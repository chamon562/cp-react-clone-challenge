// creating a javascript object that will contain all the icons 
// this is temporary will have a database like firebase for day 3
import MessageIcon from '@material-ui/icons/Message';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleIcon from '@material-ui/icons/People';
import AppsIcon from '@material-ui/icons/Apps';
// export an array of objects
export const sidebarItems = [
    {
        icon: <MessageIcon />,
        text: "Thread"
    },
    {
        icon: <InboxIcon />,
        text: "All DMs"
    },
    {
        icon: <DraftsIcon />,
        text: "Mentions & Reactions"
    },
    {
        icon: <BookmarkBorderIcon />,
        text: "Save items"
    },
    {
        icon: <PeopleIcon />,
        text: "People & Group"
    },
    {
        icon: <AppsIcon />,
        text: "More"
    }
]