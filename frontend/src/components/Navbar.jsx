import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsPlusSquare } from "react-icons/bs";
import { IconButton } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import { LuMoon, LuSun } from "react-icons/lu"

const Navbar = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    // const toggleColor = useColorModeValue("black", "white");

    return (
        <Container maxW={"1440px"} px={"4"} >
            <Flex
                h={"16"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    // bgGradient="to-r" gradientFrom="cyan.400" gradientTo="blue.500"
                    bgGradient='linear(to-r, cyan.400, blue.500)'
                    bgClip={"text"}
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>

                <HStack gap={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button colorScheme='blue' variant="outline" size={20} w={10} h={10} >
                            <BsPlusSquare size={20} colorScheme='blue' />
                        </Button>
                    </Link>

                    <IconButton onClick={toggleColorMode} colorScheme='blue' variant="outline" fontSize={20} >
                        {colorMode === "light" ? <LuMoon /> : <LuSun />}
                    </IconButton>

                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar