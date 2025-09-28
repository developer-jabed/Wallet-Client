// features/auth/authSlice.ts
import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { TRole } from "@/types";

interface AuthState {
  role: TRole | null;
  user: { id: string; email: string } | null;
}

const initialState: AuthState = {
  role: (localStorage.getItem("role") as TRole) || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        role: TRole;
        user: { id: string; email: string };
      }>
    ) => {
      state.role = action.payload.role;
      state.user = action.payload.user;

      // Persist to localStorage
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.role = null;
      state.user = null;

      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
