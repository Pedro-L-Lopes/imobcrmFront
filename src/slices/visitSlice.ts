import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import visitService from "../services/visitService";
import { visitType } from "../types/visit";

type VisitState = {
  visits: visitType[];
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
  totalPages: number;
  currentPage: number;
};

const initialState: VisitState = {
  visits: [],
  loading: false,
  error: false,
  success: false,
  message: null,
  totalPages: 1,
  currentPage: 1,
};

interface GetvisitsParams {
  currentPage: number;
  orderBy: string;
  sortDirection: string;
  searchTerm: string;
}

export const insertVisit = createAsyncThunk(
  "visit/insert",
  async (data: visitType, thunkAPI) => {
    try {
      const res = await visitService.insertVisit(data);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(
          res.message || "Erro ao inserir visita"
        );
      }

      return res.message || "Visita adicionada com sucesso";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const getVisits = createAsyncThunk(
  "visit/get",
  async (
    { currentPage, orderBy, sortDirection, searchTerm }: GetvisitsParams,
    thunkAPI
  ) => {
    try {
      const res = await visitService.getVisits(
        currentPage,
        orderBy,
        sortDirection,
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

export const visitSlice = createSlice({
  name: "visit",
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
      .addCase(insertVisit.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(insertVisit.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = "Visita adicionada";
      })
      .addCase(insertVisit.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getVisits.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getVisits.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.visits = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = visitSlice.actions;
export default visitSlice.reducer;
