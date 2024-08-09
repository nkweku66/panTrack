import { Box, Stack, Typography, Chip } from '@mui/material'
import styled from '@emotion/styled'

const StyledContainer = styled(Stack)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
    font-family: "Bicyclette";
`
const StyledChip = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    color: #fff;
    background-color: #1a262d;
    border: 2px solid #627171;
    border-radius: 5px;
    gap: 10px;
    cursor: pointer;
    
    // & :hover { 
    //     background-color: #0f171d; 
    //     border: none; 
    //     outline: 2px solid #39db7d;
    // }

`
const StyledTypography = styled(Typography)`
    font-family: "Bicyclette";
    color: #fff;
    font-weight: 600;

`
const StyledText = styled(StyledTypography)`
    padding: 2px 10px;
    font-size: 12px;
    border-radius: 3px;
    background-color: rgba(57, 219, 125, .1);
`

export { StyledContainer, StyledText, StyledTypography, StyledChip }