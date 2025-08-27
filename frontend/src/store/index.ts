import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import agreementReducer from './agreementSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    agreement: agreementReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
