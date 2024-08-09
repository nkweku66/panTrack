'use client'
import { Typography, Stack } from '@mui/material';
import * as S from './Search.module.styles'
import { useState } from 'react';
import ModalMenu from '../modal/ModalMenu'

export default function SearchBar({ name, category, quantity, shelfLife, info }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <>
            <S.SearchArea>
                <Stack direction="row" spacing={4} alignItems="center">
                    <S.Text>ITEMS</S.Text>
                    <S.StyledChip label="10 Items in total" />
                </Stack>
                <S.SearchInput placeholder='Search for an item...'/>
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