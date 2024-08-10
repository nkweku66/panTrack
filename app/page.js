'use client'
import { Box, Stack, Typography } from "@mui/material";
import Navbar from "./components/navbar/NavBar";
import Search from "./components/search/Search";
import Card from "./components/list/Card";
import Lottie from "lottie-react";
import Settings from '/public/settings.json'
import Loading from  '/public/loading.json'
import Category from "./components/category/Category";
import Recipie from "./components/recipie/Recipie";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { query } from "firebase/firestore";
import { auth } from '../firebaseConfig'
import { 
  addPantryItem, 
  getPantryItems, 
  createUserDocument, 
  searchPantryItems
} from '../lib/db'
import { useRouter } from "next/navigation";
import { uploadImage } from '../lib/imageUpload'
import { getFirebaseAuth } from '/firebaseConfig'

export const MyContext = createContext(null);

export const useMyContext = () => useContext(MyContext);

function PantryItemsList({ items }) {
  return (
    <Stack
      height="55vh"
      overflow="auto"
      padding="25px 0 20px 0"
      spacing={2}
      sx={{
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#39db7d',
          borderRadius: '10px'
        },
      }}
    >
      {items && items.length > 0 ? (
        items.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            info={item.info}
            shelfLife={item.shelfLife}
            uploadImage={item.uploadImage}
          />
        ))
      ) : (
        <Typography>No items to display</Typography>
      )}
    </Stack>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
  const [newItem, setNewItem] = useState({ 
    name: '',
    quantity: 0, 
    category: '', 
    info: '', 
    shelfLife: 0,
    uploadImage: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchPantryItems = useCallback(async () => {
    console.log('Fetching pantry items for user:', user?.uid);
    if (user) {
      try {
        const items = await getPantryItems(user.uid);
        console.log('Fetched items:', items);
        setPantryItems(items);
        setItems(items);
      } catch (error) {
        console.error('Error fetching pantry items:', error);
        setError('Error fetching pantry items. Please try again.');
      }
    }
  }, [user]);

  const handleSearch = async (searchTerm, setItems) => {
    console.log(`Handling search for term: ${searchTerm}`);
    if (user) {
      try {
        if (searchTerm.trim() === '') {
          // If search term is empty, fetch all items
          const allItems = await getPantryItems(user.uid);
          setItems(allItems);
        } else {
          const searchResults = await searchPantryItems(user.uid, searchTerm);
          console.log('Search results:', searchResults);
          setItems(searchResults);
        }
      } catch (error) {
        console.error('Error in handleSearch:', error);
        // Optionally set an error state here
      }
    } else {
      console.log('No user logged in');
    }
};
  
  
  const router = useRouter();
  
  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setLoading(false);
      if (authUser) {
        console.log('User authenticated:', authUser.uid);
        setUser(authUser);
        await createUserDocument(authUser);
        fetchPantryItems();
      } else {
        console.log('No user authenticated');
        router.push('/signin');
      }
    });

    return () => unsubscribe();
  }, [router, fetchPantryItems]);

  const handleImageUpload = async (file) => {
    try {
      const url = await uploadImage(file);
      setNewItem(prevItem => ({
        ...prevItem,
        uploadImage: url
      }));
      return url;
    } catch (error) {
      setError('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  const handleAddPantryItem = async (itemData) => {
    if (user) {
      try {
        setLoading(true);
        let imageUrl = itemData.uploadImage || '';
        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
        }
        const newItemWithImage = { ...itemData, uploadImage: imageUrl };
        await addPantryItem(user.uid, newItemWithImage);

        setImageFile(null);
        setNewItem({
          name: '',
          quantity: 0,
          category: '',
          info: '',
          shelfLife: 0,
          uploadImage: ''
        });
        await fetchPantryItems();
        setLoading(false);
      } catch (error) {
        setError('Error adding pantry item. Please try again.');
        console.error('Error adding pantry item:', error);
        setLoading(false);
        throw error;
      }
    }
  };
  


  useEffect(() => {
    console.log('PantryItemsList re-rendered with items:', pantryItems);
  }, [pantryItems]);
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: name === 'quantity' || name === 'shelfLife' ? parseInt(value, 10) || 0 : value
    }));
  };
  
  if (loading) {
    return (
      <Box bgcolor="#141e22" display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Lottie animationData={Loading} loop={true} style={{ width: 200, height: 200 }} />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box bgcolor="#141e22" color="#fff" display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5">Please sign in to access your pantry.</Typography>
      </Box>
    );
  }

  return (
    <Box padding='10px 50px 0 50px' bgcolor="#141e22" color="#fff" minHeight="100vh">
      <Navbar
        navs={["Dashboard", "Inventory", "Category", "Reports"]}
        source={user.photoURL}
      />
      <MyContext.Provider
        value={{
          ...newItem,
          onChangeName: (e) => setNewItem(prev => ({ ...prev, name: e.target.value })),
          onChangeCategory: (e) => setNewItem(prev => ({ ...prev, category: e.target.value })),
          onChangeQuantity: (e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 })),
          onChangeShelfLife: (e) => setNewItem(prev => ({ ...prev, shelfLife: parseInt(e.target.value) || 0 })),
          onChangeInfo: (e) => setNewItem(prev => ({ ...prev, info: e.target.value })),
          handleAddPantryItem,
          setImageFile,
          handleImageUpload,
          items,
          uploadImage,
          setItems
        }}
      >
        <Search />
      </MyContext.Provider>
      {error && <Typography color="error">{error}</Typography>}
      <Box marginTop={2} display="grid" gridTemplateColumns="1fr 2fr" gap={5}>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Lottie animationData={Settings} loop={true} style={{ width: 200, height: 200 }} />
          </Box>
          <Box height="50%">
            <Recipie />
          </Box>
        </Box>
        <Box>
          <Box borderBottom="2px solid #647171" borderRadius='0 3px 0 3px' padding={2}>
            <Category />
          </Box>
          <PantryItemsList items={items} />
        </Box>
      </Box>
    </Box>
  );
}