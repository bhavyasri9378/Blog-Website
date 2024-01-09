import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    //get blog details
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
            if (data?.success) {
                setBlog(data?.blog);
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlogDetail();
    }, [id]);

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
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            });
            if (data?.success) {
                toast.success('Blog Updated');
                navigate('/blogs');
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(blog);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={450}
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
                        UPDATE A BLOG
                    </Typography>

                    <TextField name="title" value={inputs.title} onChange={handleChange} margin='normal' required />

                    <TextField name="description" value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required />

                    <TextField name="image" value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required />

                    <Button type='submit' color='secondary' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }}>UPDATE</Button>
                </Box>
            </form>
        </>
    )
}

export default BlogDetails;