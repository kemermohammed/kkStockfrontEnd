import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const BASE_URL = 'http://localhost:5000/api/product';

// Helper function to get the token from the state
const getToken = (getState) => {
  const token = getState().auth?.token;
  if (!token) {
    console.error('Token is missing or undefined.');
    throw new Error('Authorization token is missing.');
  }
  return token;
};

// Async Thunks

// Buy a product
export const buyProduct = createAsyncThunk(
  'transactions/buyProduct',
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await fetch(`${BASE_URL}/${id}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      console.log('Request URL:', `${BASE_URL}/${id}/buy`);
      console.log('Request Body:', JSON.stringify({ quantity }));

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('API Response Error:', errorDetails);
        throw new Error(errorDetails.message || 'Failed to buy product');
      }
     
      const data = await response.json();
      toast.success(`${quantity} unit(s) purchased successfully!`);
      return { transaction: { ...data.data, type: 'buy' }, id, quantity };
      toast.success(data.message)
    } catch (error) {
      console.error('Buy Product Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Sell a product
export const sellProduct = createAsyncThunk(
  'transactions/sellProduct',
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await fetch(`${BASE_URL}/${id}/sell`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      console.log('Request URL:', `${BASE_URL}/${id}/sell`);
      console.log('Request Body:', JSON.stringify({ quantity }));

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('API Response Error:', errorDetails);
        throw new Error(errorDetails.message || 'Failed to sell product');
      }

      const data = await response.json();
      toast.success(data.message);
      return { transaction: { ...data.data, type: 'sell' }, id, quantity };
    } catch (error) {
      console.error('Sell Product Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Transaction Slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [], // List of transactions
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Buy Product
      .addCase(buyProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(buyProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions.unshift(action.payload.transaction);
      })
      .addCase(buyProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Sell Product
      .addCase(sellProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sellProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions.unshift(action.payload.transaction);
      })
      .addCase(sellProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
