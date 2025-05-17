import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { createNewProductService, fetchAllProductsService, fetchProductsByUserService } from '../../services/product/product.service';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  userId: string;
  sku: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  successMessage: any;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  successMessage: ""
};

export const fetchProductsThunk = createAsyncThunk(
  'product/fetchAll',
  async (
    filters: {
      search?: string;
      minPrice?: number;
      maxPrice?: number;
      sellerId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const products = await fetchAllProductsService(
        filters.sellerId
          ? { sellerId: filters.sellerId }
          : {
            search: filters.search,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          }
      );

      return products;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Error al obtener productos');
    }
  }
);



export const fetchProductsByUserIdThunk = createAsyncThunk(
  'product/fetchByUser',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProductsByUserService();
      console.log("Products by user", products);

      return products;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Error al obtener productos del usuario');
    }
  }
);

export const createProductThunk = createAsyncThunk(
  'product/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const newProduct = await createNewProductService(data);
      console.log("New product", newProduct);

      return newProduct;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Error al crear producto');
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByUserIdThunk.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = null;
      })
      .addCase(fetchProductsByUserIdThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByUserIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";

      })
      .addCase(fetchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(createProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.successMessage = "";
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;