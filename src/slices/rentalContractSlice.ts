import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rentalContractService from "../services/rentalContractService";
import { RentalContractType } from "../types/rentalContract";

type RentalContractState = {
  rentalContracts: RentalContractType[];
  rentalContract: RentalContractType;
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

const initialState: RentalContractState = {
  rentalContracts: [],
  rentalContract: {},
  loading: false,
  error: false,
  success: false,
  message: null,
  totalPages: 1,
  currentPage: 1,
  totalCount: 0,
};

interface GetRentalContractsParams {
  currentPage: number;
  orderBy: string;
  sortDirection: string;
  status: string;
  startDate: string;
  endDate: string;
  searchTerm: string;
}

export const insertRentalContract = createAsyncThunk(
  "rentalContract/insert",
  async (data: RentalContractType, thunkAPI) => {
    try {
      const res = await rentalContractService.insertRentalContract(data);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(
          res.message || "Erro ao inserir cliente"
        );
      }

      return res.contratoId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const getRentalContracts = createAsyncThunk(
  "rentalContracts/get",
  async (
    {
      currentPage,
      orderBy,
      sortDirection,
      status,
      startDate,
      endDate,
      searchTerm,
    }: GetRentalContractsParams,
    thunkAPI
  ) => {
    try {
      const res = await rentalContractService.getRentalContracts(
        currentPage,
        orderBy,
        sortDirection,
        status,
        startDate,
        endDate,
        searchTerm
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

export const getRentalContractDetails = createAsyncThunk(
  "rentalContractDetails/get",
  async (id: string, thunkAPI) => {
    try {
      const res = await rentalContractService.getRentalContractDetails(id);

      if (res.error) {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro desconhecido.");
    }
  }
);

export const rentalContractSlice = createSlice({
  name: "rentalContract",
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
      .addCase(insertRentalContract.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(insertRentalContract.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = "Contrato de aluguel adicionado";
      })
      .addCase(insertRentalContract.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getRentalContracts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getRentalContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.rentalContracts = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getRentalContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getRentalContractDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getRentalContractDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.rentalContract = action.payload;
      })
      .addCase(getRentalContractDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = rentalContractSlice.actions;
export default rentalContractSlice.reducer;
