'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '../../firebaseConfig';
import { Box, Stack } from '@mui/material';
import pantryImage from '/public/images/pantryImage.jpg'
import * as S from './page.styles'

export default function SignIn() {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSignIn = async () => {
        try {
        await signInWithGoogle();
        router.push('/'); 
        } catch (error) {
        setError(error.message);
        }
    };
    
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={5}
            bgcolor="#141e22"
            height="100vh"
        >
        <Stack marginLeft={10}>
            <S.StyledTypography>Sign In</S.StyledTypography>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <S.StyledButton onClick={handleSignIn} >Sign in with Google</S.StyledButton>
        </Stack>
        <Stack width="60%" height="90vh">
            <S.StyledImage
                alt="Carrots"
                src={pantryImage}
            />
        </Stack>
        </Box>
    );
}