import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import locationService from "../services/locationService";
import { LocationType } from "../types/location";

type LocationState = {
  locations: LocationType[];
  location: LocationType;
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
};

const initialState: LocationState = {
  locations: [],
  location: {
    cidade: "",
    estado: "",
  },
  loading: false,
  error: false,
  success: false,
  message: null,
};

interface GetLocationsParams {
  searchTerm1: string;
  searchTerm2: string;
}

export const insertLocation = createAsyncThunk(
  "location/insert",
  async (data: LocationType, thunkAPI) => {
    try {
      const res = await locationService.insertLocation(data);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(
          res.message || "Erro ao inserir localização"
        );
      }

      return res.message || "Localização inserida com sucesso";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const getLocationsByOneTerm = createAsyncThunk(
  "client/getLocationsByOneTerm",
  async (term: string, thunkAPI) => {
    try {
      const res = await locationService.getLocationsByOneTerm(term);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const getLocations = createAsyncThunk(
  "location/get",
  async ({ searchTerm1, searchTerm2 }: GetLocationsParams, thunkAPI) => {
    try {
      const res = await locationService.getLocations(searchTerm1, searchTerm2);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
      state.success = false;
      state.error = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertLocation.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(insertLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = "Localização adicionada";
      })
      .addCase(insertLocation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getLocationsByOneTerm.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getLocationsByOneTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.locations = action.payload;
      })
      .addCase(getLocationsByOneTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getLocations.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.locations = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = locationSlice.actions;
export default locationSlice.reducer;
