import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 
import { type UserState, initialUserState } from '../types/User.ts';

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    login(state, action: PayloadAction<Omit<UserState, "isLoggedIn">>) {
      return {
        ...action.payload,
        isLoggedIn: true,
      };
    },
    logout() {
      return initialUserState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
