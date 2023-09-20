import { Box, Button, Center, HStack, Heading, Image, Input, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';

const Recipes = () => {
    const navigate = useNavigate()

    const [recipes, setRecipes] = useState([]);
    const [searchedData, setSearchedData] = useState();
    const [search, setSearch] = useState("");
    const [recipeDetails, setRecipeDetails] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const token = localStorage.getItem('token');

    const toast = useToast()

    const fetchData = async () => {
        await fetch("https://easy-pink-walkingstick-tam.cyclic.cloud/recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.recipes);
                console.log(data.recipes);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSearch = () => {

        const requestData = { query: search };

        fetch("https://easy-pink-walkingstick-tam.cyclic.cloud/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((res) => res.json())
            .then((data) => {
                setRecipes([]);
                setSearchedData(data.results);
                // console.log(data.results);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDetails = (recipe) => {
        setRecipeDetails(recipe);
        onOpen();
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Redirect to the login page after logout
        navigate("/")
    };


    const handleAddToFavorites = (recipe) => {
        // Make a POST request to add the recipe to favorites
        fetch('https://easy-pink-walkingstick-tam.cyclic.cloud/fav/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the user's token for authentication
            },
            body: JSON.stringify({ recipe }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message);
                toast({
                    title: 'Added to Fav.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <div>
            <Center mt={"30px"}>
                <HStack w={"80%"}>
                    <Input onChange={(e) => { setSearch(e.target.value) }} value={search} placeholder='Search recipe' size='lg' />
                    <Button w={"20%"} onClick={handleSearch} size='lg' colorScheme='blue'>Search</Button>
                    <HStack pl={"250px"}>
                        <Link to={"/fav"}>
                            <Button size='lg'>Favourites</Button>
                        </Link>
                        {!token && ( // Check if the user is not logged in
                            <Link to={"/signup"}>
                                <Button size='lg' colorScheme='green'>Sign up</Button>
                            </Link>
                        )}
                        {token && (
                            <Button size='lg' variant='outline' onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </HStack>
                </HStack>
            </Center>
            <Heading mt={"30px"}>Recipes</Heading>
            <Center mt={"30px"}>

                <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", width: "90%", }}>
                    {
                        recipes.map((ele, index) => (
                            <Center key={index}>
                                <Box style={{ border: "1px solid black" }}>
                                    <Image w={"100%"} src={ele.image} />
                                    <Heading size='sm' style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        width: "30ch",
                                        paddingLeft: "40px"
                                    }}>{ele.title}</Heading>
                                    <Button onClick={() => handleDetails(ele)}>Details</Button>
                                    <Button onClick={() => handleAddToFavorites(ele)}>Add to Fav</Button>
                                </Box>
                            </Center>
                        ))
                    }
                </Box>
            </Center >

            {
                recipeDetails && (
                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={"3xl"}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader><Heading>{recipeDetails.title}</Heading></ModalHeader>
                            <ModalCloseButton />

                            <ModalBody>
                                <HStack alignItems={"flex-start"}>
                                    <Image w={"50%"} src={recipeDetails.image} />
                                    <VStack>
                                        <Heading size={'md'}>Summary</Heading>
                                        <Text>{recipeDetails.summary}</Text>
                                    </VStack>
                                </HStack>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button variant='ghost'>Add to Fav</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )
            }
            <Center mt={"30px"}>
                <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", width: "90%", }}>
                    {
                        searchedData && searchedData.map((ele, index) => (
                            <Center key={index}>
                                <Box style={{ border: "1px solid black" }}>
                                    <Image w={"100%"} src={ele.image} />
                                    <Heading size='sm' style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        width: "30ch",
                                        paddingLeft: "40px"
                                    }}>{ele.title}</Heading>
                                    <Button>Add to Fav</Button>
                                </Box>
                            </Center>
                        ))
                    }
                </Box>
            </Center >
        </div >
    )
}

export default Recipes;
