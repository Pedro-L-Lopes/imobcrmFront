import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "../services/clientService";
import { rentControlType } from "../@types/rentControlType";
import rentControlService from "../services/rentControlService";

type RentControlState = {
  rentControls: rentControlType[];
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

const initialState: RentControlState = {
  rentControls: [],
  loading: false,
  error: false,
  success: false,
  message: null,
  totalPages: 1,
  currentPage: 1,
  totalCount: 0,
};

interface GetRentControlParams {
  currentPage: number;
  orderBy: string;
  sortDirection: string;
  searchTerm?: string;
}

export const getRentControl = createAsyncThunk(
  "rentControl/get",
  async (
    { currentPage, orderBy, sortDirection }: GetRentControlParams,
    thunkAPI
  ) => {
    try {
      const res = await rentControlService.getRentControl(
        currentPage,
        orderBy,
        sortDirection
      );

      if (res.error) {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro desconhecido.");
    }
  }
);

export const rentControlSlice = createSlice({
  name: "rentControl",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.message = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRentControl.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getRentControl.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.rentControls = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getRentControl.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = rentControlSlice.actions;
export default rentControlSlice.reducer;
