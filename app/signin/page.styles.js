import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
`

const StyledButton = styled(Button)`
    background-color: #39db7d;
    color: #fff;
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 10px;
    transition: background-color 0.2s ease-in-out;
    font-family: inherit;

    &:hover {
        background-color: #1c9c52;
    }
`

const StyledTypography = styled(Typography)`
    font-family: inherit;
    font-weight: 600;
    font-size: 4rem;
    margin-bottom: 1em;
    color: #fff;
`

export { StyledImage, StyledButton, StyledTypography }