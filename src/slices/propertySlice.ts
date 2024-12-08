import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "../services/propertyService";
import { PropertyType } from "../types/property";

type PropertyState = {
  propertys: PropertyType[];
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

const initialState: PropertyState = {
  propertys: [],
  loading: false,
  error: false,
  success: false,
  message: null,
  totalPages: 1,
  currentPage: 1,
  totalCount: 0,
};

interface GetPropertysParams {
  currentPage: number;
  purpose: string;
  typeProperty: string;
  situation: string;
  avaliation: string;
  withPlate: string;
  autorizationType: string;
  orderBy: string;
  sortDirection: string;
  searchTerm: string;
}

export const getPropertys = createAsyncThunk(
  "propertys/get",
  async (
    {
      currentPage,
      purpose,
      typeProperty,
      situation,
      avaliation,
      withPlate,
      autorizationType,
      orderBy,
      sortDirection,
      searchTerm,
    }: GetPropertysParams,
    thunkAPI
  ) => {
    try {
      const response = await propertyService.getPropertys(
        currentPage,
        purpose,
        typeProperty,
        situation,
        avaliation,
        withPlate,
        autorizationType,
        orderBy,
        sortDirection,
        searchTerm
      );

      if (response.error) {
        return thunkAPI.rejectWithValue(response.message);
      }

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro desconhecido.");
    }
  }
);

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
      state.success = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertys.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getPropertys.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.propertys = action.payload.items || [];
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(getPropertys.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = propertySlice.actions;
export default propertySlice.reducer;
