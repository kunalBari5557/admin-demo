import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  products: Product[];
  product: Product | null;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: any;
}

const initialState: ProductsState = {
  products: [],
  product: null,
  loading: 'idle',
  error: null,
};

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct: Product) => {
  const response = await axios.post('https://fakestoreapi.com/products', newProduct);
  return response.data;
});


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

export const updateProductById = createAsyncThunk<void, { productId: number, updatedProduct: Product }, { rejectValue: string }>(
  'products/updateProductById',
  async ({ productId, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, updatedProduct, {
        headers: { token: `${localStorage.getItem("Token")}` },
      });

      if (response.status === 200) {
        return;
      } else {
        return rejectWithValue('Failed to update the product.');
      }
    } catch (error) {
      return rejectWithValue('Failed to update the product.');
    }
  }
);

export const deleteProductById = createAsyncThunk<void, number, { rejectValue: string }>(
    'products/deleteProductById',
    async (productId: number, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`https://fakestoreapi.com/products/${productId}`, {
          headers: { token: `${localStorage.getItem("Token")}` },
        });
        if (response.status === 200) {
          return;
        } else {
          return rejectWithValue('Failed to delete product.');
        }
      } catch (error) {
        return rejectWithValue('Failed to delete product.');
      }
    }
  );
  

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(createProduct.pending, (state) => {
       state.loading = 'pending';
      })
     .addCase(createProduct.fulfilled, (state, action) => {
       state.loading = 'fulfilled';
       state.products.push(action.payload); 
       state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
       state.loading = 'rejected';
       state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(deleteProductById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(updateProductById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateProductById.fulfilled, (state) => {
        state.loading = 'fulfilled';
        state.error = null;
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.loading = 'rejected';
      });
  },
});

export default productsSlice.reducer;
