import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from 'react-hot-toast';

const CreateBlog = () => {
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: '',
    });

    //input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    //form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/v1/blog/create-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            });
            if (data?.success) {
                toast.success('Blog Created');
                navigate('/my-blogs');
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
                    <Typography variant='h4' textAlign={'center'} fontWeight={'bold'} padding={3} color={'mediumorchid'} >
                        CREATE A BLOG
                    </Typography>

                    <TextField placeholder="Enter your blog title" name="title" value={inputs.title} onChange={handleChange} margin='normal' required />

                    <TextField placeholder="Enter blog description" name="description" value={inputs.description} onChange={handleChange} margin='normal' required />

                    <TextField placeholder="Enter blog image url" name="image" value={inputs.image} onChange={handleChange} margin='normal' required />

                    <Button type='submit' color='secondary' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }}>SUBMIT</Button>
                </Box>
            </form>
        </>
    );
};

export default CreateBlog;