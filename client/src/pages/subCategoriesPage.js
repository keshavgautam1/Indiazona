import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

const SubCategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]); // Dynamically fetched categories
  const [openDialog, setOpenDialog] = useState(false);
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subcategories");
      setSubCategories(response.data);

      // Extract unique categories from sub-categories
      const uniqueCategories = [
        ...new Set(response.data.map((subCategory) => subCategory.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch sub-categories:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddSubCategory = () => {
    setOpenDialog(true);
    setIsEditMode(false);
    setNewSubCategoryName("");
    setSelectedCategory("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSubCategoryName("");
    setSelectedCategory("");
    setIsEditMode(false);
    setEditId(null);
  };

  const handleSaveSubCategory = async () => {
    if (selectedCategory && newSubCategoryName) {
      try {
        if (isEditMode) {
          await axios.put(`http://localhost:5000/subcategories/${editId}`, {
            name: newSubCategoryName,
            category: selectedCategory,
          });

          setSubCategories(
            subCategories.map((subCategory) =>
              subCategory.id === editId
                ? {
                    ...subCategory,
                    name: newSubCategoryName,
                    category: selectedCategory,
                  }
                : subCategory
            )
          );
        } else {
          const response = await axios.post(
            "http://localhost:5000/subcategories",
            {
              name: newSubCategoryName,
              category: selectedCategory,
            }
          );

          setSubCategories([...subCategories, response.data]);
        }

        handleCloseDialog();
      } catch (error) {
        console.error("Failed to save sub-category:", error);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/subcategories/${id}`);
      setSubCategories(
        subCategories.filter((subCategory) => subCategory.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete sub-category:", error);
    }
  };

  const handleEdit = (id) => {
    const subCategoryToEdit = subCategories.find(
      (subCategory) => subCategory.id === id
    );
    setNewSubCategoryName(subCategoryToEdit.name);
    setSelectedCategory(subCategoryToEdit.category);
    setEditId(id);
    setIsEditMode(true);
    setOpenDialog(true);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <TextField
          label="Search by Sub-category Name"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSubCategory}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Add New Sub-category
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Sub-Categories</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Sub-category Name</TableCell>
                  <TableCell>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubCategories.length > 0 ? (
                  filteredSubCategories.map((subCategory, index) => (
                    <TableRow key={subCategory.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{subCategory.category}</TableCell>
                      <TableCell>{subCategory.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(subCategory.id)}
                          sx={{ marginRight: 1 }}
                        >
                          <BorderColorIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDelete(subCategory.id)}
                        >
                          <DeleteForeverIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="textSecondary">
                        No sub-categories found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditMode ? "Edit Sub-category" : "Add New Sub-category"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Sub-category Name"
            variant="outlined"
            fullWidth
            value={newSubCategoryName}
            onChange={(e) => setNewSubCategoryName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveSubCategory} color="primary">
            {isEditMode ? "Save Changes" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SubCategoriesPage;
