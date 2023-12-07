import React, { useContext } from 'react'
import "./header.css"
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './context/context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';


export const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://localhost:8000/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
           
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("*")
    }

    return (
        <>
            <header>
                <nav><h1> Jayanth K</h1>
                    <div className='avtar'>

                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "grey", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.ValidUserOne.name[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logout()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }
                    </Menu>
                </nav>
            </header>


        </>
    )
}