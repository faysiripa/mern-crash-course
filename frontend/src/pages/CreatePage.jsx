import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product';
import { Button, Container, VStack, Heading, Box, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toaster } from "@/components/ui/toaster";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const { createProduct } = useProductStore();
    const headingColor = useColorModeValue("gray.600", "gray.400");
    const bgAddProduct = useColorModeValue("blue.400", "blue.300");
    const addProductColor = useColorModeValue("white", "gray.700");
    const cardColor = useColorModeValue("white", "gray.700");

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct)
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
                closable: true,
            })
        } else {
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
                closable: true,
            })
        };
        setNewProduct({ name: "", price: "", image: "" })
    };
    return (
        <Container maxW={"sm"}>
            <VStack gap={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} color={headingColor}>
                    Create New Product
                </Heading>

                <Box w={"full"} bg={cardColor} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack gap={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <Button onClick={handleAddProduct} w="full" bg={bgAddProduct} color={addProductColor}>
                            Add Product
                        </Button>

                    </VStack>
                </Box>

            </VStack>
        </Container>
    )
}

export default CreatePage