import { db } from '/firebaseConfig';
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

// search function
export const searchPantryItems = async (userId, searchTerm) => {
    console.log(`Searching pantry items for user ${userId} with term: ${searchTerm}`);
    try {
        const pantryRef = collection(db, 'users', userId, 'pantryItems');
        const q = query(
        pantryRef,
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        console.log(`Search returned ${querySnapshot.size} results`);
        const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        }));
        console.log('Searched items:', items);
        return items;
    } catch (error) {
        console.error('Error searching pantry items: ', error);
        throw error;
    }
};
export async function addPantryItem(userId, itemData) {
    try {
        console.log('Item data:', itemData); // This should now log an object, not a string
        if (typeof itemData !== 'object' || !itemData.name) {
        console.error('Invalid item data: Expected an object with a name property');
        return;
        }
        const docRef = doc(db, 'users', userId, 'pantryItems', itemData.name);
        await setDoc(docRef, {
        name: itemData.name,
        category: itemData.category || '',
        quantity: itemData.quantity || 0,
        shelfLife: itemData.shelfLife || '',
        info: itemData.info || '',
        uploadImage: itemData.uploadImage || ''
        });
        console.log('Pantry item added successfully');
    } catch (error) {
        console.error('Error adding pantry item:', error);
        throw error;
    }
}


// export const addPantryItem = async (userId, item) => {
//     try {
//         const userRef = doc(db, 'users', userId);
//         const itemsRef = collection(userRef, 'pantryItems');
//         const docRef = doc(itemsRef, item.name); // Use a unique identifier if needed

//         await setDoc(docRef, {
//             name: item.name,
//             category: item.category,
//             quantity: item.quantity,
//             shelfLife: item.shelfLife,
//             uploadImage: item.uploadImage, // Store the URL or reference of the image
//             info: item.info
//         }, { merge: true });
//     } catch (error) {
//         console.error("Error adding pantry item: ", error.message);
//     }
// };

// 

export const getPantryItems = async (userId) => {
    console.log('Getting pantry items for user:', userId);
    try {
        const userRef = doc(db, 'users', userId);
        const itemsRef = collection(userRef, 'pantryItems');
        const snapshot = await getDocs(itemsRef);

        console.log('Snapshot:', snapshot);

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
        console.error("Error fetching pantry items: ", error);
        throw error; // Rethrow the error so it can be caught in the component
    }
};

