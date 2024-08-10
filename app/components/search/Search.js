'use client'
import { Typography, Stack } from '@mui/material';
import * as S from './Search.module.styles'
import { useState, useContext, useCallback } from 'react';
import ModalMenu from '../modal/ModalMenu'
import { MyContext } from '/app/page';  // Adjust the import path as necessary
import debounce from 'lodash/debounce';

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { pantryItems, handleSearch, setItems } = useContext(MyContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const debouncedSearch = useCallback(
        debounce((term) => {
            handleSearch(term, setItems);
        }, 300),
        [handleSearch, setItems]
    );
    
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
                    <S.StyledChip label={`${pantryItems?.length || 0} Items in total`} />
                </Stack>
                <S.SearchInput 
                    placeholder='Search for an item...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Stack direction="row" spacing={2} alignItems="center">
                    <S.Camera />
                    <S.AddButton onClick={handleOpen}>
                        <Typography variant="h1" fontSize={15} fontWeight={900}>Add Item</Typography>
                    </S.AddButton>
                </Stack>
            </S.SearchArea>
            <ModalMenu
                open={open}
                handleClose={handleClose}
            />
        </>
    );
}