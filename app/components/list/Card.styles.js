'use client'
import styled from '@emotion/styled'
import { Add, Delete, Remove } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import Image from 'next/image'

const Card = styled(Stack)`
    padding: 0;
    display: flex;
    max-width: 100%;
    // height: 10vh;
    border: 2px solid #647171;
    background-color: #1a262d;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.3s ease-in-out;
    font-family: 'Bicyclette' !important;

    &:hover {
        background-color: #141e22;
        border-color: #39db7d;
    }
`
const StyledStack = styled(Stack)`
    padding: 10px;
`

const StyledAdd = styled(Add)`
    background-color: #1a2629;
    border: 1px solid #0f171d;
    border-radius: 5px;
    color: #fff;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #39db7d;
    }
`
const StyledRemove = styled(Remove)`
    background-color: #1a2629;    
    border: 1px solid #0f171d;
    border-radius: 5px;
    color: #fff;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #39db7d;
    }

`
const StyledDelete = styled(Delete)`
    background-color: #1a2629;
    border: 1px solid #0f171d;
    border-radius: 5px;
    color: #fff;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #39db7d;
    }

`

const StyledImage = styled(Image)`
    width: 50%;
    height: 150px;
    objectFit: cover;
    border-radius: 10px 0 0 10px;
` 
const StyledTypography = styled(Typography)`
    font-family: "Bicyclette";
    font-size: 1.1rem;
    color: #fff;
`
const CardWrapper = styled(Stack)`
    height: 60vh;
    overflow: auto;
    padding: 25px 0 20px 0;
    gap: 10px;
`

export { 
    Card, 
    StyledStack, 
    StyledAdd, 
    StyledRemove, 
    StyledDelete, 
    StyledImage, 
    StyledTypography,
    CardWrapper
}