import { auth, db } from '/firebaseConfig';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

export const createUserDocument = async (user) => {
    try {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                createdAt: new Date(),
                // other fields
            });
        }
    } catch (error) {
        console.error("Error creating user document: ", error.message);
    }
};

export const addPantryItem = async (userId, item) => {
    try {
        const userRef = doc(db, 'users', userId);
        const itemsRef = collection(userRef, 'pantryItems');
        const docRef = doc(itemsRef, item.name); // Use a unique identifier if needed

        await setDoc(docRef, {
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            shelfLife: item.shelfLife,
            uploadImage: item.uploadImage, // Store the URL or reference of the image
            info: item.info
        }, { merge: true });
    } catch (error) {
        console.error("Error adding pantry item: ", error.message);
    }
};


export const getPantryItems = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const itemsRef = collection(userRef, 'pantryItems');
        const snapshot = await getDocs(itemsRef);

        if (snapshot.empty) {
            console.log('No pantry items found.');
            return [];
        }
        
        const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log('Fetched pantry items:', items);
        return items;
    } catch (error) {
        console.error("Error fetching pantry items: ", error.message);
        return [];
    }
};
