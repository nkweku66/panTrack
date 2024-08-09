import { useAuthState } from 'react-firebase-hooks'
import { auth } from '/firebaseConfig'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

export default function Auth() {
    const [user, loading, error] = useAuthState(auth);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    if (loading) { return <p>Loading...</p> };
    if (error) { return <p>Error: {error.message}</p> };

    if (user) {
        return (
            <div>
                <p>Welcome, {user.displayName}</p>
                <button onClick={logOut}>Sign Out</button>
            </div> 
        );
    }

    return (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    );
}