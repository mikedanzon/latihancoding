import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { Link, NavLink } from 'react-router-dom';
import './css/header.css';
import { connect } from 'react-redux';
import { FaUserAstronaut } from 'react-icons/fa';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Swal from 'sweetalert2';
import { URL_LOCALHOST } from '../helpers/url';

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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

function ButtonAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const onLogoutClick=()=>{
    setAnchorEl(null)
    Swal.fire({
      title: `Are you sure to logout ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes !'
    }).then((result) => {
      if (result.isConfirmed) {
          localStorage.removeItem('id')
          window.location = "//localhost:3000"
      }
    })
  }

  const onChangePassClick=()=>{
      window.location = `//localhost:3000/changepass`
  }

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
            {
              props.role === 'admin' ?
              <Link to='/managePayment' style={{textDecoration:'none', color:'white'}}>
                  <Button color="inherit">Manage Payment</Button>
              </Link>
              :
              props.role === 'user' ?
              <Link to='/history' style={{textDecoration:'none', color:'white'}}>
                  <Button className="mr-3" color="inherit">History</Button>
              </Link>
              :
              null
            }
            {
              props.role === 'admin' ?
              <Link to='/manageAdmin' style={{textDecoration:'none', color:'white'}}>
                  <Button color="inherit">Admin</Button>
              </Link>
              :
              props.role === 'user' ?
              <Link to='/cart' style={{textDecoration:'none', color:'white'}}>
                  <StyledBadge className="mr-3" badgeContent={props.cart.length} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
              </Link>
              :
              null
            }
            {
              props.isLogin ? 
              <>
                <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <FaUserAstronaut/>&nbsp;{props.username}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={onChangePassClick}>Change Password</MenuItem>
                  <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                </Menu>
              </>
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