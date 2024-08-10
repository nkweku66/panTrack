import styled from '@emotion/styled'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'

const StyledModal = styled(Modal)`
    position: absolute;
    top: 56%;
    left: 75.2%;
    transform: translate(-50%, -50%);
    background-color: #1a262d;
    width: 550px;
    height: 70vh;
    padding: 20px 50px;
    border-radius: 10px;
    color: #647171;
    font-family: 'Bicyclette'
`

const StyledBox = styled(Box)`
    position: relative;
    color: #647171;
    font-family: 'Bicyclette' !important;
`

const TextInput = styled(TextField)`
    .MuiInputBase-root {
        background-color: #0f171d;
        height: 55px;
        margin-bottom: 20px;
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

const StyledButton = styled(Button)`
    background-color: #39db7d;
    color: #000;
    padding: 10px 20px;

    &:hover {
        color: #fff;
        background-color: #1c9c52;
    }
`

const StyledTypography = styled(Typography)`
    font-family: "Bicyclette";
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 0.5em; 
`

export { 
    StyledModal, 
    StyledBox, 
    TextInput, 
    StyledButton,
    StyledTypography
}