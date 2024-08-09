'use client'
import { Box, Stack } from "@mui/material";
import Navbar from "./components/navbar/NavBar";
import Search from "./components/search/Search";
import Card from "./components/list/Card";
import Lottie from "lottie-react";
import Settings from '/public/settings.json'
import Loading from  '/public/loading.json'
import Category from "./components/category/Category";
import Recipie from "./components/recipie/Recipie";
import { createContext } from "react";

import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '/firebaseConfig'
import { addPantryItem, getPantryItems, createUserDocument } from '../lib/db'
import { useRouter } from "next/navigation";
import { uploadImage } from '../lib/imageUpload'


export const MyContext = createContext(null);

export default function Home() {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  
  const router = useRouter();
  
  const fetchPantryItems = useCallback(async () => {
    if (user) {
      try {
        const items = await getPantryItems(user.uid);
        setPantryItems(items);
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      }
    }
  }, [user]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setLoading(false);
      if (authUser) {
        setUser(authUser);
        await createUserDocument(authUser); // Ensure user document creation
        fetchPantryItems();
      } else {
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
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleAddPantryItem = async () => {
    if (user) {
      try {
        if (imageFile) {
          await handleImageUpload(imageFile);
          console.log('Image uploaded:', newItem.uploadImage); // Correct logging
        }

        // Use newItem state for item data
        console.log('Adding pantry item:', newItem);
        await addPantryItem(user.uid, newItem);

        // Reset state and fetch updated items
        setImageFile(null); // Reset file input
        setNewItem({
          name: '',
          quantity: 0,
          category: '',
          info: '',
          shelfLife: 0,
          uploadImage: ''
        }); // Reset item fields
        await fetchPantryItems(); // Refresh pantry items
      } catch (error) {
        console.error('Error adding pantry item:', error);
      }
    }
  };
  
  
  
  if (loading) {
    return (
      <Box bgcolor="#141e22">
        <Lottie
          animationData={Loading} 
          loop={true} 
        />
      </Box>
    );
  }

  if (!user) {
    return null;
  }
  

  return (
    <>
      <Box
        padding='10px 50px 0 50px'
        bgcolor="#141e22"
        color="#fff"
      >
        <Navbar
        navs={[
          "Dashboard",
          "Inventory",
          "Category",
          "Reports"
        ]}
          source={user.photoURL}
          // logOut={logOut}
        />
        <MyContext.Provider
          value = {{
            name: newItem.name,
            onChangeName: (e) => setNewItem({ ...newItem, name: e.target.value }),
            category: newItem.category,
            onChangeCategory: (e) => setNewItem({ ...newItem, category: e.target.value }),
            quantity: newItem.quantity,
            onChangeQuantity: (e) => {
              const value = parseInt(e.target.value, 10);
              setNewItem({ ...newItem, quantity: isNaN(value) ? 0 : value });
            },
            shelfLife: newItem.shelfLife,
            onChangeShelfLife: (e) => {
              // Convert value to number
              const numberValue = parseInt(e.target.value, 10);
              setNewItem({ ...newItem, shelfLife: isNaN(numberValue) ? 0 : numberValue });
            },
            info: newItem.info,
            onChangeInfo: (e) => setNewItem({ ...newItem, info: e.target.value }),
            handleAddPantryItem,
          }}
        >
          <Search />
        </MyContext.Provider>
        <Box
          marginTop={2}
          // width="100%"
          display = "grid"
          gridTemplateColumns="1fr 2fr"
          // border = "1px solid red"
          height = "100%"
          gap={5}
        
        >
          <Box>
            <Box
              // border = "1px solid green"
              display="flex"
              // gridTemplateColumns="repeat(2, 1fr)"
              alignItems="center"
              justifyContent="center"
            >
              <Lottie animationData={Settings} loop={true} />
            </Box>
            <Box
              // width="100%"
              height="50%"
              // border = "1px solid green"
              // padding= "20px"
            >
              <Recipie />
              <Lottie 
                animationData={Settings} 
                loop={true}
                width={10}
                height={10}
              />
            </Box>
          </Box>
          <Box>
            <Box
              // border = "1px solid green"
              borderBottom = "2px solid #647171"
              borderRadius='0 3px 0 3px '
              padding={2}
            >
              <Category />
            </Box>
            <Stack
              height="55vh"
              overflow="auto"
              // border = "1px solid green"
              padding= "25px 0 20px 0"
              spacing={2}

              sx = {{
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
              {pantryItems.map((item) => (
                <Card
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                  info={item.info}
                  shelfLife={item.shelfLife}
                />
            ))}
              <Card />
              {/* <Card /> */}
              {/* <Card /> */}
              {/* <Card /> */}
              {/* <Card /> */}
              {/* <Card /> */}
              {/* <Card /> */}

            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
