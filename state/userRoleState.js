import { createSlice } from "@reduxjs/toolkit";

// Initial state of slice
const initialState = {
  value: "user",
};

export const userRoleSlice = createSlice({
  name: "userRole",
  initialState: initialState,
  reducers: {
    // All reducers go here
    user: (state, action) => {
      state.value = action.role;
    },
    admin: (state, action) => {
      state.value = action.role;
    },
  },
});

// Action creators are generated for each case reducer function
export const { user, admin } = userRoleSlice.actions;

// We export the reducer function so that it can be added to the store
export default userRoleSlice.reducer;
