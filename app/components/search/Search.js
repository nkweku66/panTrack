'use client'
import { Typography, Stack } from '@mui/material';
import * as S from './Search.module.styles'
import { useState, useContext, useCallback } from 'react';
import ModalMenu from '../modal/ModalMenu'
import { MyContext } from '/app/page';  // Adjust the import path as necessary
import debounce from 'lodash/debounce';
import CameraCapture from '../Camera.js/Camera'; 

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [cameraOpen, setCameraOpen] = useState(false);
    const { items, handleSearch, setItems } = useContext(MyContext);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCameraOpen = () => setCameraOpen(true);
    const handleCameraClose = () => setCameraOpen(false);
    
    const debouncedSearch = useCallback(
        debounce((term) => {
            handleSearch(term, setItems);
        }, 300),
        [handleSearch, setItems]
    );

    const handleImageCapture = async (imageData) => {
        // Here you would typically send the image to your backend for processing
        // For now, let's just log it
        console.log('Captured image:', imageData);

        // You could then use the results to update your form or search
        // For example:
        // setSearchTerm('Captured Object');
        // debouncedSearch('Captured Object');
    };
    
    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        debouncedSearch(newSearchTerm);
    };
    
    return (
        <>
            <S.SearchArea>
                <Stack direction="row" spacing={4} alignItems="center">
                    <S.Text>ITEMS</S.Text>
                    <S.StyledChip label={`${items?.length || 0} Items in total`} />
                </Stack>
                <S.SearchInput 
                    placeholder='Search for an item...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Stack direction="row" spacing={2} alignItems="center">
                    <S.Camera onClick={handleCameraOpen} style={{ cursor: 'pointer' }} />
                    <S.AddButton onClick={handleOpen}>
                        <Typography variant="h1" fontSize={15} fontWeight={900}>Add Item</Typography>
                    </S.AddButton>
                </Stack>
            </S.SearchArea>
            <ModalMenu
                open={open}
                handleClose={handleClose}
            />
            <CameraCapture
                open={cameraOpen}
                onClose={handleCameraClose}
                onCapture={handleImageCapture}
            />
        </>
    );
}