import React, { useEffect, useState } from 'react';
import { Box, Center, Heading, Image } from '@chakra-ui/react';

const Fav = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch the user's favorite recipes
        fetch('https://easy-pink-walkingstick-tam.cyclic.cloud/fav/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the user's token for authentication
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFavorites(data.favorites);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Center mt={'30px'}>
                <Heading>Favorite Recipes</Heading>
            </Center>
            <Center mt={'30px'}>
                <Box
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                        gap: '20px',
                        width: '90%',
                    }}
                >
                    {favorites.map((ele, index) => (
                        <Center key={index}>
                            <Box style={{ border: '1px solid black' }}>
                                <Image w={'100%'} src={ele.recipe.image} />
                                <Heading
                                    size="sm"
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        width: '30ch',
                                        paddingLeft: '40px',
                                    }}
                                >
                                    {ele.recipe.title}
                                </Heading>
                                {/* Add a button to remove from favorites if needed */}
                            </Box>
                        </Center>
                    ))}
                </Box>
            </Center>
        </div>
    );
};

export default Fav;
