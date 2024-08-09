
import * as S from './Card.styles'
import { Typography, Stack } from '@mui/material'
import Carrot from '/public/images/carrot.jpg'


export default function Card ({name, quantity, category, info, shelfLife }) {
    return (
        <S.Card direction='row'>
            <Stack direction="row" spacing={2}>
                <S.StyledImage alt='item image' src={Carrot} priority/>
                <S.StyledStack>
                    <S.StyledTypography >NAME: { name } </S.StyledTypography>
                    <S.StyledTypography >INFO: { info } </S.StyledTypography>
                    <S.StyledTypography >CATEGORY: { category } </S.StyledTypography>
                    <S.StyledTypography >SHELF-LIFE: { shelfLife } </S.StyledTypography>
                </S.StyledStack>
            </Stack>
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                paddingRight={2}
                // border="1px solid red"
                spacing={2}
            >
                <Stack>
                    <Typography fontWeight={700} textAlign="right" letterSpacing={2}>QUANTITY</Typography>
                    <Typography variant='h1' fontWeight={700} fontSize={120} lineHeight={1}>{ quantity }</Typography>
                </Stack>
                <Stack
                    // border="1px solid red"
                    spacing={1}
                    paddingBottom={2}
                >
                    <S.StyledAdd />
                    <S.StyledRemove />
                    <S.StyledDelete />
                </Stack>
            </Stack>
        </S.Card>
    )
}