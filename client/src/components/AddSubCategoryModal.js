import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const AddSubCategoryModal = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    console.log({ category, subCategory });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Sub-category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Sub-category</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            sx={{ marginBottom: "16px" }}
          >
            <MenuItem value="" disabled>
              Select from dropdown
            </MenuItem>
            <MenuItem value="Automotive">Automotive</MenuItem>
            <MenuItem value="Beauty">Beauty</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Sub-category Name"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSubCategoryModal;
