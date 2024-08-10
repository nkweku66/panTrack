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
        setImageFile
    } = useContext(MyContext);

    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const maxChars = 200;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit started');
        try {
            console.log('Calling handleAddPantryItem');
            await handleAddPantryItem();
            console.log('handleAddPantryItem completed');
            setSnackbar({ open: true, message: 'Item added successfully!' });
            console.log('Calling handleClose');
            handleClose();
            console.log('handleClose called');
        } catch (error) {
            console.log('Error caught:', error);
            setSnackbar({ open: true, message: 'Error adding item. Please try again.' });
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
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
                                id="modal-modal-upload-image" 
                                label="Upload Image" 
                                variant="outlined"
                                type="file"
                                onChange={handleImageChange}
                                InputLabelProps={{ shrink: true }}
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