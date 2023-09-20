import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changePage = () => {
        navigate("/signup");
    }

    const navigate = useNavigate();
    const toast = useToast()

    const handleLogin = () => {
        const user = { email, password }
        fetch("https://easy-pink-walkingstick-tam.cyclic.cloud/user/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    toast({
                        title: 'Login Successful!.',
                        description: "Welcome to SkyGoal.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    navigate("/");
                } else {
                    toast({
                        title: "Wrong password. Please try again.",
                        status: 'error',
                        isClosable: true,
                    })
                }
            })
            .catch((err) =>
                console.log(err)
            )
    }
    return (
        <div>
            <Center mt={"40px"}>
                <Box backgroundColor={"gray.50"} p={"15px"} borderWidth='1px' overflow='hidden' w={"30%"} borderRadius={"10px"}>
                    <Heading>LOG IN</Heading>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input id='email' type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                        <FormLabel>Password</FormLabel>
                        <Input id='password' placeholder='Password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <Button colorScheme='yellow' borderRadius={"25px"} size='md' mt={"20px"} onClick={handleLogin}>LOGIN</Button>
                    </FormControl>
                    <Text mt={"10px"}>
                        New to here? &nbsp;
                        <Button color="teal.500" onClick={changePage}>
                            SIGN UP
                        </Button>
                    </Text>
                </Box>
            </Center>
        </div>
    );
};

export default Login;