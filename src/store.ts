import { configureStore } from "@reduxjs/toolkit";

import { clientSlice as clientReducer } from "./slices/clientSlice";
import { locationSlice as locationReducer } from "./slices/locationSlice";
import { propertySlice as propertyReducer } from "./slices/propertySlice";
import { visitSlice as visitReducer } from "./slices/visitSlice";

export const store = configureStore({
  reducer: {
    client: clientReducer.reducer,
    location: locationReducer.reducer,
    property: propertyReducer.reducer,
    visit: visitReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
