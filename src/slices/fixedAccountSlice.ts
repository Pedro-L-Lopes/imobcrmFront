import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FixedAccountService from "../services/fixedAccountService";
import { FixedAccountType } from "../types/fixedAccount";

type FixedAccountState = {
  fixedAccounts: FixedAccountType[];
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

const initialState: FixedAccountState = {
  fixedAccounts: [],
  loading: false,
  error: false,
  success: false,
  message: null,
  totalPages: 1,
  currentPage: 1,
  totalCount: 0,
};

export const insertFixedAccount = createAsyncThunk(
  "fixedAccount/insert",
  async (data: FixedAccountType, thunkAPI) => {
    try {
      const res = await FixedAccountService.insertFixedAccount(data);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(
          res.message || "Erro ao inserir conta fixa"
        );
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const getFixedAccountByPropertyId = createAsyncThunk(
  "fixedAccount/getByPropertyId",
  async (propertyId: string, thunkAPI) => {
    try {
      const res = await FixedAccountService.getFixedAccountByPropertyId(
        propertyId
      );

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const fixedAccountSlice = createSlice({
  name: "fixedAccount",
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
      .addCase(insertFixedAccount.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(insertFixedAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.fixedAccounts.unshift(action.payload);
        state.message = "Conta fixa adicionada";
      })
      .addCase(insertFixedAccount.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getFixedAccountByPropertyId.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getFixedAccountByPropertyId.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.fixedAccounts = action.payload;
      })
      .addCase(getFixedAccountByPropertyId.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = fixedAccountSlice.actions;
export default fixedAccountSlice.reducer;
