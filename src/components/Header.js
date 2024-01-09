import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Typography, Tab, Tabs } from '@mui/material';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../redux/store";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
    //global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState();

    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            toast.success('logout successful');
            navigate("/login");
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <AppBar position='sticky' color='secondary'>
                <Toolbar>
                    <Typography variant='h5' fontWeight={'bold'}>
                        MY BLOG WEBSITE
                    </Typography>
                    {isLogin && (
                        <Box display={'flex'} marginLeft='auto' marginRight={'auto'}>
                            <Tabs textColor="inherit" fontWeight="bold" value={value} onChange={(e, val) => setValue(val)}>
                                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />

                            </Tabs>
                        </Box>
                    )}
                    <Box display={'flex'} marginLeft="auto">
                        {!isLogin && (
                            <>
                                <Button sx={{ margin: 1, color: 'white', fontWeight: 'bold' }} LinkComponent={Link} to="/login">Login</Button>
                                <Button sx={{ margin: 1, color: 'white', fontWeight: 'bold' }} LinkComponent={Link} to="/register">Register</Button>
                            </>
                        )}

                        {isLogin && (
                            <Button onClick={handleLogout} sx={{ margin: 1, color: 'white', fontWeight: 'bold' }}>Logout</Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;