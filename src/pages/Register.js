import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
//import toast from "react-hot-toast";
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    //handle input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/v1/user/register`, {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                toast.success("user registered successfully");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={450}
                    display="flex"
                    flexDirection={'column'}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    borderRadius={5}
                >
                    <Typography variant='h5' padding={2} textAlign="center" color={'mediumorchid'} fontWeight={'bold'}>REGISTER HERE</Typography>
                    <TextField
                        placeholder="Enter your Username"
                        value={inputs.name}
                        onChange={handleChange}
                        name="name"
                        margin="normal"
                        type={"text"}
                        //id="outlined-required"
                        //label="Username"
                        required />
                    <TextField
                        placeholder="Enter your email"
                        value={inputs.email}
                        onChange={handleChange}
                        name="email"
                        margin="normal"
                        type={"email"}
                        //id="outlined-required"
                        //label="E-mail"
                        required />
                    <TextField
                        placeholder="Enter your password"
                        value={inputs.password}
                        onChange={handleChange}
                        name="password"
                        margin="normal"
                        type={"password"}
                        //id="outlined-required"
                        //label="Password"
                        required />
                    <Button
                        type="submit"
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        variant="contained"
                        color="secondary"
                        margin="normal"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => navigate("/login")}
                        type="submit"
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        color="secondary"

                    >
                        Already Registered? Please Login
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default Register