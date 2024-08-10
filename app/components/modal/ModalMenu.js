import { MyContext } from "/app/page";
import { useContext, useState } from "react";
import { Stack, MenuItem, Snackbar } from "@mui/material";
import * as S from './Modal.styles'

export default function ModalMenu({ open, handleClose }) {
    const { 
        name,
        onChangeName,
        category,
        onChangeCategory,
        quantity,
        onChangeQuantity,
        shelfLife,
        onChangeShelfLife,
        info,
        onChangeInfo,
        handleAddPantryItem,
        setImageFile,
        handleImageUpload
    } = useContext(MyContext);

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [imageUrl, setImageUrl] = useState('');

    const maxChars = 200;

    const resetForm = () => {
        onChangeName({ target: { value: '' } });
        onChangeCategory({ target: { value: '' } });
        onChangeQuantity({ target: { value: 0 } });
        onChangeShelfLife({ target: { value: 0 } });
        onChangeInfo({ target: { value: '' } });
        setImageUrl('');
        setImageFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit started');

        if (!name || !category || !quantity || !shelfLife) {
            setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'error' });
            return;
        }

        try {
            console.log('Calling handleAddPantryItem');
            const itemData = {
                name,
                category,
                quantity,
                shelfLife,
                info,
                uploadImage: imageUrl
            };
            await handleAddPantryItem(itemData);
            console.log('handleAddPantryItem completed');
            setSnackbar({ open: true, message: 'Item added successfully!', severity: 'success' });
            resetForm();
            handleClose();
        } catch (error) {
            console.log('Error caught:', error);
            setSnackbar({ open: true, message: 'Error adding item. Please try again.', severity: 'error' });
        }
    };
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            try {
                const url = await handleImageUpload(file);
                setImageUrl(url);
            } catch (error) {
                setSnackbar({ open: true, messages: 'Error uploading image. Please try again.', severity: 'error' });
            }
        }
    };

    const categories = [
        { value: "Staples", label: "Staples" },
        { value: "Canned", label: "Canned" },
        { value: "Snacks", label: "Snacks" },
        { value: "Meat / Fish", label: "Meat / Fish" },
        { value: "Dairy", label: "Dairy" },
        { value: "Dry Goods", label: "Dry Goods" },
        { value: "Frozen", label: "Frozen" },
        { value: "Bakery", label: "Bakery" },
        { value: "Beverages", label: "Beverages" },
        { value: "Others", label: "Others" },
    ];

    return (
        <>
            <S.StyledModal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack>
                    <S.StyledTypography textAlign="center">Add new Items</S.StyledTypography>
                    <S.StyledBox>
                        <S.TextInput 
                            id="modal-modal-title" 
                            label="Item Name" 
                            value={name}
                            onChange={onChangeName}
                            variant="outlined" 
                            required 
                        />
                        <Stack direction="row" spacing={3}>
                            <S.TextInput 
                                id="modal-modal-category" 
                                label="Category" 
                                variant="outlined"
                                value={category}
                                onChange={onChangeCategory}
                                select
                                required
                            >
                                {categories.map((cat) => (
                                    <MenuItem  
                                        key={cat.value} 
                                        value={cat.value}
                                        sx={{ height: "30px" }}
                                    >
                                        {cat.label}
                                    </MenuItem>
                                ))}
                            </S.TextInput>
                            <S.TextInput  
                                label="Quantity" 
                                variant="outlined"
                                id="outlined-number"
                                type="number"
                                value={quantity}
                                onChange={onChangeQuantity}
                                InputLabelProps={{ shrink: true }} 
                                required
                            />
                        </Stack>
                        <Stack direction="row" spacing={3}>
                            <S.TextInput 
                                id="modal-modal-shelf-life" 
                                variant="outlined"
                                label='Shelf Life'
                                type="number"
                                value={shelfLife}
                                onChange={onChangeShelfLife}
                                required
                            />
                            <S.TextInput 
                                id="modal-modal-image" 
                                type="file"
                                inputProps={{
                                    accept: "image/*"
                                }}
                                onChange={handleImageChange}
                            />
                        </Stack>
                        <S.TextInput 
                            id="modal-modal-info" 
                            label="Info" 
                            variant="outlined" 
                            multiline
                            value={info}
                            onChange={onChangeInfo}
                            fullWidth
                            maxRows={1}
                            inputProps={{
                                maxLength: maxChars,
                                style: { height: "50px", overflowY: "auto" }
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": { height: "50px" }
                            }}
                        />
                        <Stack direction="row" spacing={3} width="100%" justifyContent="flex-end">
                            <S.StyledButton onClick={handleSubmit}>Add</S.StyledButton>
                            <S.StyledButton onClick={handleClose}>Close</S.StyledButton>
                        </Stack>
                    </S.StyledBox>
                </Stack>
            </S.StyledModal>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </>
    );
}