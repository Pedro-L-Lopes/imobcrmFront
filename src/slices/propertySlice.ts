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
  currentPage?: number;
  purpose?: string;
  typeProperty?: string;
  situation?: string;
  avaliation?: string;
  withPlate?: string;
  autorizationType?: string;
  orderBy?: string;
  sortDirection?: string;
  searchTerm?: string;
}

export const insertProperty = createAsyncThunk(
  "property/insert",
  async (data: PropertyType, thunkAPI) => {
    try {
      const res = await propertyService.insertProperty(data);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(
          res.message || "Erro ao inserir imóvel"
        );
      }

      return res.message || "Imóvel inserido com sucesso";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const getPropertys = createAsyncThunk(
  "property/get",
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
        currentPage!,
        purpose!,
        typeProperty!,
        situation!,
        avaliation!,
        withPlate!,
        autorizationType!,
        orderBy!,
        sortDirection!,
        searchTerm!
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

export const searchproperties = createAsyncThunk(
  "property/search",
  async (
    { purpose, orderBy, sortDirection, searchTerm }: GetPropertysParams,
    thunkAPI
  ) => {
    try {
      const response = await propertyService.searchproperties(
        purpose!,
        orderBy!,
        sortDirection!,
        searchTerm!
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
      .addCase(insertProperty.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(insertProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = "Imóvel adicionado";
      })
      .addCase(insertProperty.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      })
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
      })
      .addCase(searchproperties.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(searchproperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.propertys = action.payload;
      })
      .addCase(searchproperties.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = propertySlice.actions;
export default propertySlice.reducer;
