import { configureStore } from "@reduxjs/toolkit";

import { clientSlice as clientReducer } from "./slices/clientSlice";
import { locationSlice as locationReducer } from "./slices/locationSlice";
import { propertySlice as propertyReducer } from "./slices/propertySlice";
import { visitSlice as visitReducer } from "./slices/visitSlice";
import { rentalContractSlice as rentalContractReducer } from "./slices/rentalContractSlice";
import { fixedAccountSlice as fixedAccountReducer } from "./slices/fixedAccountSlice";
import { rentPaymentSlice as rentPaymentReducer } from "./slices/rentPaymentSlice";
import { rentControlSlice as rentControlReducer } from "./slices/rentControlSlice";

export const store = configureStore({
  reducer: {
    client: clientReducer.reducer,
    location: locationReducer.reducer,
    property: propertyReducer.reducer,
    visit: visitReducer.reducer,
    rentalContract: rentalContractReducer.reducer,
    fixedAccount: fixedAccountReducer.reducer,
    rentPayment: rentPaymentReducer.reducer,
    rentControl: rentControlReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
