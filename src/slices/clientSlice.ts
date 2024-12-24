import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "../services/clientService";
import { ClientType } from "../types/client";

type ClientState = {
  clients: ClientType[];
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: false,
  success: false,
  message: null,
  totalPages: 1,
  currentPage: 1,
  totalCount: 0,
};

interface GetClientsParams {
  currentPage: number;
  orderBy: string;
  sortDirection: string;
  searchTerm: string;
}

export const insertClient = createAsyncThunk(
  "client/insert",
  async (data: ClientType, thunkAPI) => {
    try {
      const res = await clientService.insertClient(data);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(
          res.message || "Erro ao inserir cliente"
        );
      }

      return res.message || "Cliente inserido com sucesso";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const getClients = createAsyncThunk(
  "client/get",
  async (
    { currentPage, orderBy, sortDirection, searchTerm }: GetClientsParams,
    thunkAPI
  ) => {
    try {
      const res = await clientService.getClients(
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

export const getClientsByNameAndDocument = createAsyncThunk(
  "client/getByNameAndDocument",
  async (term: string, thunkAPI) => {
    try {
      const res = await clientService.getClientsByNameAndDocument(term);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const clientSlice = createSlice({
  name: "client",
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
      .addCase(insertClient.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(insertClient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = "Cliente adicionado";
      })
      .addCase(insertClient.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getClients.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clients = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getClientsByNameAndDocument.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getClientsByNameAndDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clients = action.payload;
      })
      .addCase(getClientsByNameAndDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;
