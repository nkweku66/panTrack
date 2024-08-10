// lib/imageUpload.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
};
