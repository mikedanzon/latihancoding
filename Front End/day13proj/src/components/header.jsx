import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { Link, NavLink } from 'react-router-dom';
import './css/header.css';
import { connect } from 'react-redux';
import { FaUserAstronaut } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar>
            <NavLink to="/" style={{textDecoration:'none', color:'white'}}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <FlightTakeoffIcon />
                </IconButton>
            </NavLink>
            <Typography variant="h6" className={classes.title}>
                Wild Trip
            </Typography>
            <Link to='/manageAdmin' style={{textDecoration:'none', color:'white'}}>
                <Button color="inherit">Admin</Button>
            </Link>
            {
              props.isLogin ? 
              <Button color="inherit"><FaUserAstronaut/>&nbsp;{props.username}</Button>
              :
              <Link to='/login' style={{textDecoration:'none', color:'white'}}>
                  <Button color="inherit">Login</Button>
              </Link>

            }
            </Toolbar>
      </AppBar>
    </div>
  );
}

const Mapstatetoprops=({Auth})=>{
  return {
    ...Auth // cara cepet gaperlu pake cara bawah langsung keambil semua yang ada di Auth
    // username: Auth.username,
    // isLogin: Auth.isLogin
  }
}

export default connect(Mapstatetoprops) (ButtonAppBar);