import { MyContext } from "/app/page";
import { useContext } from "react";
import { Stack, MenuItem } from "@mui/material";
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
        handleAddPantryItem
    } = useContext(MyContext);

    const maxChars = 200;

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddPantryItem();
    };

    const categories = [
        { value: 1, label: "Staples" },
        { value: 2, label: "Canned" },
        { value: 3, label: "Snacks" },
        { value: 4, label: "Meat / Fish" },
        { value: 5, label: "Dairy" },
        { value: 6, label: "Dry Goods" },
        { value: 7, label: "Frozen" },
        { value: 8, label: "Bakery" },
        { value: 9, label: "Beverages" },
    ];

    return (
        <S.StyledModal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack>
                <S.StyledTypography textAlign="center">Add new Items</S.StyledTypography>
                <S.StyledForm onSubmit={handleSubmit}>
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
                        >
                            {categories.map((category) => (
                                <MenuItem  
                                    key={category.value} 
                                    value={category.value}
                                    sx={{ height: "30px" }}
                                >
                                    {category.label}
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
                        />
                        <S.TextInput 
                            id="modal-modal-upload-image" 
                            label="Upload Image" 
                            variant="outlined"
                            // Uncomment and handle file upload if needed
                            // value={name}
                            // onChange={onChange}

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
                        <S.StyledButton type="submit">Add</S.StyledButton>
                        <S.StyledButton onClick={handleClose}>Close</S.StyledButton>
                    </Stack>
                </S.StyledForm>
            </Stack>
        </S.StyledModal>
    );
}
