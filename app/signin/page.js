'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '../../firebaseConfig';
import { Box, Stack } from '@mui/material';
import pantryImage from '/public/images/pantryImage.jpg'
import * as S from './page.styles'
import { StyledTypography } from '../components/modal/Modal.styles';
import Lottie from 'lottie-react';
import Login from '../../public/loginPageAnimation.json'

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
        <Stack 
            marginLeft={10} 
            spacing={2}  
            height="100%" 
            width="30%"
            // alignItems="center"
            justifyContent="center"
        >
            <Stack height={100} >
                <S.StyledTypography lineHeight={0} marginBottom={-8}>WELCOME</S.StyledTypography>
                <StyledTypography lineHeight={0} color="#39db7d">To PANTrack</StyledTypography>
            </Stack>
            <Lottie animationData={Login} loop={true} style={{ width: 200, height: 200, margin: "0 auto", }} />
            <Stack height={100}>
                <StyledTypography color="#fff">Sign In</StyledTypography>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <S.StyledButton onClick={handleSignIn} >Sign in with Google</S.StyledButton>
            </Stack>
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