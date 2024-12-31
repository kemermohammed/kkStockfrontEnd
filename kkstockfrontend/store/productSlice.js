import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base API URL
const BASE_URL = 'https://kkstock.onrender.com/api/product';

// Helper function to get the token from the state
const getToken = (getState) => getState().auth.token;

// Async Thunks for API Calls

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState); // Get token from state
      const response = await fetch(BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add authorization header
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
      const data = await response.json();
      return data.data || data.products; // Adjust based on your backend response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a new product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState); // Get token from state
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error(`Failed to create product: ${response.statusText}`);
      const data = await response.json();
      return data.data || data.product; // Adjust based on your backend response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState); // Get token from state
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);
      const data = await response.json();
      return data.data || data.product; // Adjust based on your backend response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState); // Get token from state
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);
      return id; // Return the deleted product's ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Product Slice
const inventorySlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default inventorySlice.reducer;
