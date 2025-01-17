import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RentPaymentType } from "../@types/rentPaymantType";
import rentPaymenService from "../services/rentPaymentService";
import { rentControlType } from "../@types/rentControlType";

type RentPaymentState = {
  rentPayments: RentPaymentType[];
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

const initialState: RentPaymentState = {
  rentPayments: [],
  loading: false,
  error: false,
  success: false,
  message: null,
  totalPages: 1,
  currentPage: 1,
  totalCount: 0,
};

export const generatePayments = createAsyncThunk(
  "rentPayment/insert",
  async (contractId: string, thunkAPI) => {
    try {
      const res = await rentPaymenService.generatePayments(contractId);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(
          res.message || "Erro ao gerar periodos de pagamentos"
        );
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const getRentPayments = createAsyncThunk(
  "rentPayments/get",
  async (contractId: string, thunkAPI) => {
    try {
      const res = await rentPaymenService.getRentPayments(contractId);

      if (res.error) {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro desconhecido.");
    }
  }
);

export const updatePayments = createAsyncThunk(
  "payments/update",
  async (data: RentPaymentType, thunkAPI) => {
    try {
      const res = await rentPaymenService.updatePayments(data);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(
          res.message || "Erro ao atualizar pagamento"
        );
      }

      // Retorna a resposta completa da API
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Erro inesperado");
    }
  }
);

export const rentPaymentSlice = createSlice({
  name: "rentPayment",
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
      .addCase(generatePayments.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(generatePayments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.rentPayments = action.payload;
        state.message = "Periodos de pagamentos gerados";
      })
      .addCase(generatePayments.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(getRentPayments.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getRentPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.rentPayments = action.payload;
      })
      .addCase(getRentPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      })
      .addCase(updatePayments.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(updatePayments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = action.payload.message;
        const updatedPayment = action.payload.data;

        // Atualiza o estado global com o pagamento atualizado
        const paymentIndex = state.rentPayments.findIndex(
          (p) => p.pagamentoAluguelId === updatedPayment.pagamentoAluguelId
        );
        if (paymentIndex !== -1) {
          state.rentPayments[paymentIndex] = updatedPayment;
        }
      })
      .addCase(updatePayments.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = rentPaymentSlice.actions;
export default rentPaymentSlice.reducer;
