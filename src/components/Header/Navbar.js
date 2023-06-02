import {React,useContext , useEffect, useState } from 'react'
import "./Navbar.css"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { LoginContext } from "../context/ContextProvider";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import Rightheader from './Rightheader';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
const Navbar = () => {
    
  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  const [dropen, setDropen] = useState(false);
  const { products } = useSelector(state => state.getproductsdata);
  const [text, setText] = useState("");
  const [liopen, setLiopen] = useState(true);



  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const getdetailsvaliduser = async () => {
    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
        console.log("first login");
    } else {
        console.log("cart add ho gya hain");
        setAccount(data);
    }
}

 // for logout
 const logoutuser = async () => {
    const res2 = await fetch("/logout", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data2 = await res2.json();
    // console.log(data2);

    if (!res2.status === 201) {
        const error = new Error(res2.error);
        throw error;
    } else {
        history("/");
        setAccount(false);
        // setOpen(false)
        toast.success("user Logout 😃!", {
            position: "top-center"
        });
        
    }
}




const handelopen = () => {
    setDropen(true);
}
const handleClosedr = () => {
    setDropen(false)
}
const getText = (text) => {
    setText(text)
    setLiopen(false)
}

  return (
    <header>
        <nav>
            <div className="left">

                    <IconButton className="hamburgur" onClick={handelopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer open={dropen} onClose={handleClosedr} >
                        <Rightheader  logclose={handleClosedr} logoutuser={logoutuser}/>
                    </Drawer>

                <div className='navlogo'>
                   <NavLink to="/"> <img src='./amazon_PNG25.png' alt='amazon_icon' /> </NavLink>
                </div>
                <div className='nav_searchbaar'>
                    <input type='text' name='' id='' onChange={(e) => getText(e.target.value)} placeholder='Search Your Product'/>
                    <div className='search_icon'>
                        <SearchIcon id="search" />
                    </div>
                    {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    


                </div>
            </div>
            <div className="right">
                <div className="nav_btn">
                    <NavLink to="/login">Sign in</NavLink>
                </div>
                <div className="cart_btn">
                    {
                        account ? <NavLink to="/buynow"> 
                        <Badge badgeContent={account.carts.length} color="primary">
                            <ShoppingCartSharpIcon id="icon" />
                        </Badge>
                         </NavLink> : <NavLink to="/login"> 
                    <Badge badgeContent={0} color="primary">
                        <ShoppingCartSharpIcon id="icon" />
                    </Badge>
                     </NavLink>
                    }
                    <ToastContainer />
                    <p>Cart</p>
                </div>
                
                {
                    account ? <Avatar className='avatar2'  id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar>:
                    <Avatar className='avatar'  id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}></Avatar>
                }

    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {
            account ? <MenuItem  onClick={logoutuser} ><LogoutIcon style={{ fontSize: 16, marginRight: 3 }}/>Logout</MenuItem> : ""
        }
        
      </Menu>
                
            </div>
        </nav>
    </header>
  )
}

export default Navbar