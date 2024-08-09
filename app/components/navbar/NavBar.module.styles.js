import { Chip, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'

const Navbar = styled(Stack)`
    width: 100%;
    // border: 1px solid blue;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    padding: 10px;
    z-index: 99;
    background-color: #141e22;
`

const StyledChip = styled(Chip)`
    border: none;
    outline: 2px solid #202d33;
    font-size: 1.1rem;
    color: #fff;
    &:hover { outline: 2px solid #39db7d};
`
const StyledHeading = styled(Typography)`
    font-weight: 900;
    font-size: 1.3rem;
    color: #fff;
`
const ColoredHeading = styled('span')`
    color: #39db7d;
    font-weight: bold;
    font-size: 1.25rem;
`
export { Navbar, StyledChip, StyledHeading, ColoredHeading }