'use client'
import { Avatar, Chip, Stack } from '@mui/material'
import * as S from './NavBar.module.styles'

export default function Navbar ({navs, source}) {
    
    const navigation = navs.map((nav, index) => {
        return (
            <S.StyledChip key={index} label={nav} variant='outlined'/>
        );
    });
    
    return (
        <>
            <S.Navbar direction="row" gap={2}>
                <Stack direction="row">
                    <S.StyledHeading>
                        PAN
                        <S.ColoredHeading variant="h5">Track</S.ColoredHeading>
                    </S.StyledHeading>
                </Stack>
                <Stack direction='row' gap={4}>
                    {navigation}
                </Stack>
                <Stack>
                    <Avatar variant='outlined' src={source} />
                </Stack>
            </S.Navbar>
        </>
    );
}