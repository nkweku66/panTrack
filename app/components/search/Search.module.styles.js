'use client'
import { Box, Button, Typography, Chip, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { CameraAlt } from '@mui/icons-material'

const SearchArea = styled(Box)`
    // border: 1px solid yellow;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    gap: 5rem;
`

const Text = styled(Typography)`
    font-family: "Bicyclette";
    font-weight: 600;
    font-size: 1.2rem;
`

const SearchInput = styled(TextField)`
    .MuiInputBase-root {
        background-color: #0f171d;
        height: 40px;
        font-family: 'Bicyclette';
        font-size: 1rem;
        color: #647171;
    }

    .MuiOutlinedInput-notchedOutline {
        border-color: #647171;
        border-radius: 10px;
    }
    
    .Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #39db7d;
    }
    
    .MuiInputLabel-root {
        color: #647171;
    }
    width: 100%;
`

const AddButton = styled(Button)`
    background-color: #39db7d;
    color: #000;
    // padding: 5px;
    width: 150px;
    height: 40px;
    border-radius: 10px;
    transition: color .2 ease-in-out, outline .2s ease-in-out;
    font-family: inherit;
    font-weight: 600;

    &:hover {
        color: #fff;
        outline: 1px solid #39db7d;
    }
`

const Camera = styled(CameraAlt)`
    background-color: #1a262d;
    border: 2px solid rgba(255, 255, 255, 0.2);
    width: 50px;
    height: 40px;
    border-radius: 10%;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &:hover {
        background-color: #39db7d;
        color: #000;
    }
`

const StyledChip = styled(Chip)`
    border: none;
    font-weight: bold;
    outline: 2px solid #202d33;
    color: #fff;
`

export {SearchArea, SearchInput, AddButton, Camera, Text, StyledChip}