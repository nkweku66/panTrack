import * as S from './Category.styles'
import { MyContext } from '/app/page'; 
import { useContext } from'react'; 
export default function Category (){
    const { items } = useContext(MyContext);
    return (
        <S.StyledContainer>
            <S.StyledChip>
                <S.StyledTypography>All</S.StyledTypography>
                <S.StyledText>{items?.length || 0}</S.StyledText>
            </S.StyledChip>
            <S.StyledChip>
                <S.StyledTypography>Canned</S.StyledTypography>
                <S.StyledText>0</S.StyledText>
            </S.StyledChip>
            <S.StyledChip>
                <S.StyledTypography>Condiments</S.StyledTypography>
                <S.StyledText>0</S.StyledText>
            </S.StyledChip>
            <S.StyledChip>
                <S.StyledTypography>Snacks</S.StyledTypography>
                <S.StyledText>0</S.StyledText>
            </S.StyledChip>
            <S.StyledChip>
                <S.StyledTypography>Beverages</S.StyledTypography>
                <S.StyledText>0</S.StyledText>
            </S.StyledChip>
            <S.StyledChip>
                <S.StyledTypography>Dry Goods</S.StyledTypography>
                <S.StyledText>0</S.StyledText>
            </S.StyledChip>
            <S.StyledChip>
                <S.StyledTypography>Frozen Foods</S.StyledTypography>
                <S.StyledText>0</S.StyledText>
            </S.StyledChip>
            <S.StyledChip>
                <S.StyledTypography>Msc.</S.StyledTypography>
                <S.StyledText>0</S.StyledText>
            </S.StyledChip>
        </S.StyledContainer>
    )
}