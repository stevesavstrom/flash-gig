import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

// Material-UI
//
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// Material-UI Icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';

import './AppBar.css';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    maxWidth: '300px',
    padding: '10px',
  },
  logoHorizontallyCenter: {
    position: 'absolute', 
    left: '50%', 
    top: '52%',
    transform: 'translate(-50%, -50%)'
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

// Handles login/logout nav coniditional
const user = useSelector((store) => store.user);

let loginLinkData = {
  path: '/login',
  text: 'Login / Register',
};

if (user.id != null) {
  loginLinkData.path = '/user';
  loginLinkData.text = 'Home';
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
		style={{ background: '#172536' }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoHorizontallyCenter}>
          <Link to="/home">
		        <img className={classes.logo} src="/images/logo.png"></img>
		      </Link>
          </div>

          {/* <Typography variant="h5" noWrap>
		  Flash Gig
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <Link className="drawerLink" to="/">Home</Link>
              <ListItemText/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <Link className="drawerLink"  to="/job">Job Board</Link>
              <ListItemText/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><PostAddIcon /></ListItemIcon>
              <Link className="drawerLink" to="/post">Post Job</Link>
              <ListItemText/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <Link className="drawerLink" to="/about">About</Link>
              <ListItemText/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <Link className="drawerLink" to="/">Edit Profile</Link>
              <ListItemText/>
            </ListItem>
        </List>
		<Divider />
		<LogOutButton className="navLink" />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}