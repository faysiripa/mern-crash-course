import { useColorModeValue } from './ui/color-mode'
import { MdEdit, MdDelete } from "react-icons/md"
import { useProductStore } from '@/store/product';
import { toaster } from './ui/toaster';
import {
    Box,
    Button,
    Heading,
    HStack,
    Image,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    Input,
} from '@chakra-ui/react'
import { useState } from 'react';

const ProductCart = ({ product }) => {
    const nameColor = useColorModeValue("black", "white");
    const priceColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const bgEditIcon = useColorModeValue("blue.500", "blue.400");
    const bgDeleteIcon = useColorModeValue("red.500", "red.400");
    const cardColor = useColorModeValue("white", "gray.700");
    const modalHeaderColor = useColorModeValue("gray.600", "gray.400");
    const updateColor = useColorModeValue("white", "gray.800");
    const bgUpdate = useColorModeValue("blue.400", "blue.300");

    const { deleteProduct, updateProduct } = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
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
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success } = await updateProduct(pid, updatedProduct);
        onClose();

        if (!success) {
            toaster.create({
                title: "Error",
                description: "Server Error",
                type: "error",
                closable: true,
            })
        } else {
            toaster.create({
                title: "Success",
                description: "Product updated successfully",
                type: "success",
                closable: true,
            })
        };
    }

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={'cover'} />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2} color={nameColor}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' mb={4} color={priceColor}>
                    ${product.price}
                </Text>

                <HStack gap={2}>
                    {/* <IconButton icon={<MdEdit />}  colorScheme='blue' /> */}
                    <Button bg={bgEditIcon} size={20} h={10} w={10}>
                        <MdEdit onClick={onOpen} />
                    </Button>

                    {/* <IconButton icon={<MdDelete />}  colorScheme='red' /> */}
                    <Button bg={bgDeleteIcon} size={20} h={10} w={10} onClick={() => handleDeleteProduct(product._id)}>
                        <MdDelete />
                    </Button>

                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent bg={cardColor}>
                    <ModalHeader color={modalHeaderColor}>Update Product</ModalHeader>
                    <ModalCloseButton color={modalHeaderColor} />
                    <ModalBody>
                        <VStack gap={4} color={'gray.400'}>
                            <Input placeholder='Product Name' name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input placeholder='Price' name='price' type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input placeholder='Image URL' name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} color={updateColor} bg={bgUpdate} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose} color={modalHeaderColor}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default ProductCart